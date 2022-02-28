import { StyleSheet, View, Text, Platform, useWindowDimensions, FlatList } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { NavParamList } from '../../App';
import { LandlordComponent } from '../components/LandlordListComponent';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { screenChangePoint } from '../constants/Layout';
import MainContainer from '../components/mainContainer';
import { ThemeColors } from '../constants/Colors';
import { Query } from '../../graphql/generated';

type Props = NativeStackScreenProps<NavParamList, "Reviews">;

const ALLREVIEWS = gql`
query {
    ReviewsByLandlordId {
        success,
        errors,
        review {
          id,
          overallStarRating,
          author,
        }
    }
}
`

const ReviewsScreen = ({ route, navigation }: Props) => {
  const windowWidth = useWindowDimensions().width;
  // const [landlords, setLandlords] = useState<ILandlord[]>([]);
  const { loading, error, data } = useQuery<Query>(ALLREVIEWS);

  return (
    <MainContainer windowWidth={windowWidth} >
      <>
        <View style={styles(windowWidth).listContainer}>
          <FlatList style={styles(windowWidth).flatList}
            data={data?.AllLandlords.landlords}
            keyExtractor={item => item!!.id}
            renderItem={({ item }) => (
              <LandlordComponent name={item?.firstName} rating={item?.overallRating} />
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
    backgroundColor: ThemeColors.darkGrey,
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