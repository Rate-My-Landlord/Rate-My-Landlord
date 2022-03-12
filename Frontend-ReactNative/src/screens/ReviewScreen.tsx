import { StyleSheet, View, Text, Platform, useWindowDimensions, FlatList } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { NavParamList } from '../../App';
import { ReviewComponent } from '../components/ListComponents/ReviewListComponent';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { screenChangePoint } from '../constants/Layout';
import MainContainer from '../components/mainContainer';
import { Query } from '../../graphql/generated';
import pageStyles from '../Styles/styles-page';
import widthDepStyles from '../Styles/styles-width-dep';
import { AddButton } from '../components/AddButton';

type Props = NativeStackScreenProps<NavParamList, "Reviews">;

const ALLREVIEWS = gql`
query ReviewsByLandlordId($landlordId: ID = 13){
    ReviewsByLandlordId(landlordId: $landlordId) {
        success,
        errors,
        reviews {
          id,
          overallStarRating,
          text,
        }
    }
}
`

const ReviewsScreen = ({ route, navigation }: Props) => {
  const windowWidth = useWindowDimensions().width;
  // const [landlords, setLandlords] = useState<ILandlord[]>([]);
  const { loading, error, data } = useQuery<Query>(ALLREVIEWS);

  console.log(data?.ReviewsByLandlordId.reviews)

  return (
    <MainContainer windowWidth={windowWidth} >
      <>
        <View style={widthDepStyles(windowWidth).listContainer}>
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
          <AddButton text={"Add Review"} link={'Reviews'}/>
          <AddButton text={"Go Back"} link={'Home'}/>
        </View>
      </>
    </MainContainer>
  );
};

export default ReviewsScreen;