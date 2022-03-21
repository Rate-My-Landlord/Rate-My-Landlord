import { View, Text, useWindowDimensions, FlatList } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { NavParamList } from '../../App';
import { ReviewComponent } from '../components/ListComponents/ReviewListComponent';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MainContainer from '../components/mainContainer';
import { Query, QueryReviewsByLandlordIdArgs } from '../../graphql/generated';
import pageStyles from '../Styles/styles-page';
import widthDepStyles from '../Styles/styles-width-dep';
import { AddButton } from '../components/AddButton';

type Props = NativeStackScreenProps<NavParamList, "Reviews">;

// Gets the Reviews for the Landlord
const LANDLORDREVIEWS = gql`
query ReviewsByLandlordId($landlordId: ID!){
    ReviewsByLandlordId(landlordId: $landlordId) {
        success,
        errors,
        reviews {
          id,
          overallStarRating,
          text,
          landlord {
            firstName,
            lastName,
          }
        }
    }
}
`

const ReviewsScreen = ({ route, navigation }: Props) => {
  // route.params.landlordId
  const windowWidth = useWindowDimensions().width;
  // const [landlords, setLandlords] = useState<ILandlord[]>([]);
  const { loading, error, data } = useQuery<Query, QueryReviewsByLandlordIdArgs>(LANDLORDREVIEWS, { variables: {landlordId: route.params.landlordId.toString()}});
  // const [name, setName] = useState<string | undefined>(undefined);
  // useEffect(() => {
  //   if (data?.ReviewsByLandlordId) {
  //     setName(data!.ReviewsByLandlordId!.reviews?.)
  //   }
  // }, [data])

  return (
    <MainContainer windowWidth={windowWidth} >
      <>
        <View style={widthDepStyles(windowWidth).listContainer}>
          <View style={widthDepStyles(windowWidth).reviewsPageHeader}>
            <Text style={pageStyles.whiteHeaderText}>Reviews for 'Name'</Text>
          </View>
          <FlatList style={pageStyles.flatList}
            data={data?.ReviewsByLandlordId.reviews}
            keyExtractor={item => item!!.id}
            renderItem={({ item }) => (
              <ReviewComponent name={item?.author?.firstName} rating={item?.overallStarRating} reviewText={item?.text}/>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={widthDepStyles(windowWidth).listControlContainer}>
          <AddButton text={"Add Review"} link={'AddReviews'}/>
          <AddButton text={"Go Back"} link={'Home'}/>
        </View>
      </>
    </MainContainer>
  );
};

export default ReviewsScreen;