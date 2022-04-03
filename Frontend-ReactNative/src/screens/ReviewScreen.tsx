import { useState, useEffect } from 'react';
import { View, Text, useWindowDimensions, FlatList } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { NavParamList } from '../../App';
import { ReviewComponent } from '../components/ListComponents/ReviewListComponent';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MainContainer from '../components/containers/mainContainer';
import { Query, QueryReviewsByLandlordIdArgs } from '../../graphql/generated';
import pageStyles from '../Styles/styles-page';
import widthDepStyles from '../Styles/styles-width-dep';
import { AddButton } from '../components/AddButton';
import LeftContainer from '../components/containers/leftContainer';
import RightContainer from '../components/containers/rightContainer';
import { isMobileScreen } from '../utils';

type Props = NativeStackScreenProps<NavParamList, "Reviews">;

// Gets the Reviews for the Landlord
export const LANDLORD_REVIEWS = gql`
query ReviewsByLandlordId($landlordId: ID!){
    ReviewsByLandlordId(landlordId: $landlordId) {
        success,
        errors,
        reviews {
          id,
          overallStarRating,
          text,
          createdAt,
          landlord {
            firstName,
            lastName,
          }
          property {
            address1,
            city,
            state,
          }
        }
    }
}
`

const ReviewsScreen = ({ route, navigation }: Props) => {
  const { loading, error, data } = useQuery<Query, QueryReviewsByLandlordIdArgs>(LANDLORD_REVIEWS, { variables: { landlordId: route.params.landlordId } });
  const [name, setName] = useState<string | undefined>(undefined);

  useEffect(() => {
    let mounted = true;
    if (data?.ReviewsByLandlordId.success && mounted) {
      setName(data.ReviewsByLandlordId!.reviews!.find(_ => true)?.landlord.firstName);
    }
    return () => { mounted = false }
  }, [data])


  const windowWidth = useWindowDimensions().width;

  return (
    <MainContainer>
      <>
        <RightContainer>
          <View style={widthDepStyles(windowWidth).listContainer}>
            <View style={widthDepStyles(windowWidth).reviewsPageHeader}>
              <Text style={pageStyles.whiteHeaderText}>Reviews for {name}</Text>
            </View>
            <FlatList style={pageStyles.flatList}
              data={data?.ReviewsByLandlordId.reviews}
              keyExtractor={item => item!!.id}
              renderItem={({ item }) => (
                <ReviewComponent review={item!} />
              )}
            />
          </View>
        </RightContainer>
        <LeftContainer style={isMobileScreen(windowWidth) ? { flex: .9 } : undefined}>
          <View style={widthDepStyles(windowWidth).listControlContainer}>
            <AddButton buttonText={"Add Review"} onPress={() => navigation.navigate('NewReview', { landlordId: route.params.landlordId })} />
            <AddButton buttonText={"Add Property"} onPress={() => navigation.navigate('AddProperty', { landlordId: route.params.landlordId })} />
            <AddButton buttonText={"Go Back"} onPress={() => navigation.navigate('Home')} />
          </View>
        </LeftContainer>
      </>
    </MainContainer>
  );
};

export default ReviewsScreen;