import { StyleSheet, View, Text, Platform, useWindowDimensions, FlatList } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { NavParamList } from '../../App';
import { ReviewComponent } from '../components/ListComponents/ReviewListComponent';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { screenChangePoint } from '../constants/Layout';
import MainContainer from '../components/mainContainer';
import { ThemeColors } from '../constants/Colors';
import { Query } from '../../graphql/generated';

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
        <View style={styles(windowWidth).listContainer}>
          <FlatList style={styles(windowWidth).flatList}
            data={data?.ReviewsByLandlordId.reviews}
            keyExtractor={item => item!!.id}
            renderItem={({ item }) => (
              <ReviewComponent name={item?.author?.firstName} rating={item?.overallStarRating} reviewText={item?.text}/>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={styles(windowWidth).listControlContainer}>
          <Text style={styles(windowWidth).textColor}>Review Screen</Text>
        </View>
      </>
    </MainContainer>
  );
};

export default ReviewsScreen;


// Page Styles
const styles = (windowWidth: any) => StyleSheet.create({
  // Content Containers
  listContainer: {
    flex: windowWidth >= screenChangePoint ? 2 : 5,
    backgroundColor: ThemeColors.white,
    justifyContent: 'center',
    alignItems: 'center',

    // Top Right rounded only on Web when screen is big.
    borderTopRightRadius: (Platform.OS !== 'ios' && Platform.OS !== 'android') && windowWidth >= screenChangePoint ? 15 : 0,
  },
  // Contains Filter box, buttons, ect.
  listControlContainer: {
    flex: 1,
    backgroundColor: ThemeColors.grey,
    justifyContent: 'center',
    alignItems: 'center',

    // Top Right only rounded when on IOS or Screen is small
    borderTopRightRadius: (Platform.OS !== 'ios' && Platform.OS !== 'android') && windowWidth >= screenChangePoint ? 0 : 15,
    borderTopLeftRadius: 15,
  },

  // Temp
  textColor: {
    color: ThemeColors.darkBlue,
  },
  listTextColor: {
    color: ThemeColors.white,
  },
  flatList: {
    width: '100%',
    height: '100%',
    padding: 15,
  }
})