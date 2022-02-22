/*
  Author: Hayden Stegman 
*/
import { StyleSheet, View, Text, Platform, useWindowDimensions, FlatList } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { NavParamList } from '../../App';
// Landlord List Component
import { LandlordComponent } from '../components/LandlordListComponent';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { screenChangePoint } from '../constants/Layout';
import MainContainer from '../components/mainContainer';

type Props = NativeStackScreenProps<NavParamList, "Home">;

const ALLREVIEWS = gql`
query {
    AllLandlords {
        success,
        errors,
        landlords {
          id,
          overallRating,
          firstName,
          lastName,
          zipCode
        }
    }
}
`

const HomeScreen = ({ route, navigation }: Props) => {
  const windowWidth = useWindowDimensions().width;
  // const [landlords, setLandlords] = useState<ILandlord[]>([]);
  const { loading, error, data } = useQuery(ALLREVIEWS);


  // Temp DATA for testing!

  return (
    <MainContainer windowWidth={windowWidth} >
      <View style={styles(windowWidth).bodyScreen}>
        {/* Main Content Container */}
        <View style={styles(windowWidth).mainContainer}>
          <View style={styles(windowWidth).listContainer}>
            <FlatList style={styles(windowWidth).flatList}
              data={data?.AllLandlords.landlords}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <LandlordComponent name={item.firstName} rating={item.overallRating} />
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>

          <View style={styles(windowWidth).listControlContainer}>
            <Text style={styles(windowWidth).textColor}>List Controler</Text>
          </View>
        </View>

        { // Right Container Only on Web and when screen is big
          (Platform.OS !== 'ios' && Platform.OS !== 'android') && windowWidth >= screenChangePoint ? (
            <View style={styles(windowWidth).rightContainer}>
              <Text style={styles(windowWidth).textColor}>Ad Space?</Text>
            </View>
          ) : (<></>)
        }
      </View>
    </MainContainer>
  );
};

export default HomeScreen;


// Page Styles
const styles = (windowWidth: any) => StyleSheet.create({
  bodyScreen: {
    flex: 10,
    flexDirection: windowWidth >= screenChangePoint ? "row" : "column-reverse",
    paddingTop: Platform.OS === 'ios' || Platform.OS === 'android' ? 10 : 15,
    paddingHorizontal: (Platform.OS === 'ios' || Platform.OS === 'android') ? 0 : '10%',
    backgroundColor: '#ffffff',
  },

  // Body Containers (Right Ad Space (Web Only) and Main Container)
  rightContainer: {
    flex: 1,
    marginHorizontal: 10,
    marginBottom: 10,

    //Temp for Visibility
    backgroundColor: '#E5E7EB',

    // Temp for Text Viewing
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 15,
  },
  mainContainer: {
    // Change FlexBox valuse based on screen size
    marginHorizontal: 10,

    // Flex Settings
    flex: 3,
    flexDirection: windowWidth >= screenChangePoint ? 'row-reverse' : 'column-reverse',
  },

  // Content Containers
  listContainer: {
    flex: windowWidth >= screenChangePoint ? 2 : 5,
    backgroundColor: "#D4D4D4",
    justifyContent: 'center',
    alignItems: 'center',

    // Top Right rounded only on Web when screen is big.
    borderTopRightRadius: (Platform.OS !== 'ios' && Platform.OS !== 'android') && windowWidth >= screenChangePoint ? 15 : 0,
  },
  // Contains Filter box, buttons, ect.
  listControlContainer: {
    flex: 1,
    backgroundColor: "#E5E7EB",
    justifyContent: 'center',
    alignItems: 'center',

    // Top Right only rounded when on IOS or Screen is small
    borderTopRightRadius: (Platform.OS !== 'ios' && Platform.OS !== 'android') && windowWidth >= screenChangePoint ? 0 : 15,
    borderTopLeftRadius: 15,
  },

  // Temp
  textColor: {
    color: '#1F2937',
  },
  listTextColor: {
    color: '#ffffff',
  },
  flatList: {
    width: '100%',
    height: '100%',
    padding: 15,
  }
})