import { View, Text, useWindowDimensions, FlatList } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { NavParamList } from '../../App';
import { LandlordComponent } from '../components/ListComponents/LandlordListComponent';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MainContainer from '../components/mainContainer';
import { Query } from '../../graphql/generated';
import pageStyles from '../Styles/styles-page';
import widthDepStyles from '../Styles/styles-width-dep';
import { AddButton } from '../components/AddButton'

type Props = NativeStackScreenProps<NavParamList, "Home">;

const ALLLANDLORDS = gql`
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
  const { loading, error, data } = useQuery<Query>(ALLLANDLORDS);

  return (
    <MainContainer windowWidth={windowWidth} >
      <>
        <View style={widthDepStyles(windowWidth).listContainer}>
          <View style={widthDepStyles(windowWidth).reviewsPageHeader}>
            <Text style={pageStyles.whiteHeaderText}>Landlords in 05401</Text>
          </View>
          <FlatList style={pageStyles.flatList}
            data={data?.AllLandlords.landlords}
            keyExtractor={item => item!!.id}
            renderItem={({ item }) => (
              <LandlordComponent name={item?.firstName + " " + item?.lastName} rating={item?.overallRating} />
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={widthDepStyles(windowWidth).listControlContainer}>
          <AddButton text={"Add Landlord"} link={'Reviews'}/>
        </View>
      </>
    </MainContainer>
  );
};

export default HomeScreen;