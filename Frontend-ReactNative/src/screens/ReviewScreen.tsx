import { useState, useEffect } from 'react';
import { View, Text, useWindowDimensions, FlatList } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { HomeParamList } from '../../App';
import { ReviewComponent } from '../components/ListComponents/ReviewListComponent';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MainContainer from '../components/mainContainer';
import { Query, QueryReviewsByLandlordIdArgs } from '../../graphql/generated';
import pageStyles from '../Styles/styles-page';
import widthDepStyles from '../Styles/styles-width-dep';
import { AddButton } from '../components/AddButton';

type Props = NativeStackScreenProps<HomeParamList, "Reviews">;

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
        }
    }
}
`

const ReviewsScreen = ({ route, navigation }: Props) => {
  const { loading, error, data } = useQuery<Query, QueryReviewsByLandlordIdArgs>(LANDLORD_REVIEWS, { variables: { landlordId: route.params.landlordId } });
  const [name, setName] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (data?.ReviewsByLandlordId) {
      setName(data.ReviewsByLandlordId!.reviews!.find(_ => true)?.landlord.firstName);
    }
  }, [data])


  const windowWidth = useWindowDimensions().width;

  return (
    <MainContainer windowWidth={windowWidth} >
      <>
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
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={widthDepStyles(windowWidth).listControlContainer}>
          <AddButton buttonText={"Add Review"} onPress={() => navigation.navigate('NewReview', { landlordId: route.params.landlordId })} />
          <AddButton buttonText={"Go Back"} onPress={() => navigation.navigate('Home')} />
        </View>
      </>
    </MainContainer>
  );
};

export default ReviewsScreen;