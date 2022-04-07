import { View, Text, useWindowDimensions, FlatList } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { NavParamList } from '../../App';
import { ReviewComponent } from '../components/ListComponents/ReviewListComponent';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MainContainer from '../components/containers/mainContainer';
import { Query, QueryLandlordByIdArgs } from '../../graphql/generated';
import pageStyles from '../Styles/styles-page';
import widthDepStyles from '../Styles/styles-width-dep';
import { AddButton } from '../components/AddButton';
import LeftContainer from '../components/containers/leftContainer';
import RightContainer from '../components/containers/rightContainer';
import { isMobileScreen } from '../utils';

type Props = NativeStackScreenProps<NavParamList, "Reviews">;

// Gets the Reviews for the Landlord
export const LANDLORD_BY_ID = gql`
query LandlordById($landlordId: ID!){
    LandlordById(landlordId: $landlordId) {
        success,
        errors,
        landlord {
          firstName,
          reviews {
            id,
            overallStarRating,
            text,
            createdAt,
            property {
              address1,
              city,
              state,
            }
        }
      }
    }
}
`

const ReviewsScreen = ({ route, navigation }: Props) => {
  const windowWidth = useWindowDimensions().width;
  const { loading, error, data } = useQuery<Query, QueryLandlordByIdArgs>(LANDLORD_BY_ID, { variables: { landlordId: route.params.landlordId } });


  return (
    <MainContainer>
      <>
        <RightContainer>
          <View style={widthDepStyles(windowWidth).listContainer}>
            <View style={widthDepStyles(windowWidth).reviewsPageHeader}>
              <Text style={pageStyles.whiteHeaderText}>Reviews for {data?.LandlordById.landlord?.firstName!}</Text>
            </View>
            <FlatList style={pageStyles.flatList}
              data={data?.LandlordById.landlord?.reviews}
              keyExtractor={item => item!!.id}
              renderItem={({ item }) => (
                <ReviewComponent review={item!} />
              )}
            />
          </View>
        </RightContainer>
        <LeftContainer style={isMobileScreen(windowWidth) ? { flex: .9 } : undefined}>
          <View style={widthDepStyles(windowWidth).listControlContainer}>
            <AddButton buttonText={"Add Review"} onPress={() => navigation.navigate('AddReview', { landlordId: route.params.landlordId })} />
            <AddButton buttonText={"Add Property"} onPress={() => navigation.navigate('AddProperty', { landlordId: route.params.landlordId })} />
            <AddButton buttonText={"Go Back"} onPress={() => navigation.navigate('Home')} />
          </View>
        </LeftContainer>
      </>
    </MainContainer>
  );
};

export default ReviewsScreen;