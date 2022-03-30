import { Text, View, StyleSheet, useWindowDimensions, FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useSearchContext } from '../global/searchContext';
import MainContainer from '../components/mainContainer';
import { gql, useLazyQuery } from '@apollo/client';
import { Query, QuerySearchArgs, SearchResult } from '../../graphql/generated';
import widthDepStyles from '../Styles/styles-width-dep';
import pageStyles from '../Styles/styles-page';
import { useEffect } from 'react';
import { ThemeColors } from '../constants/Colors';
import { isMobileScreen } from '../utils';
import { LandlordComponent } from '../components/ListComponents/LandlordListComponent';
import { PropertyComponent } from '../components/ListComponents/propertyListComponent';


const SEARCH_QUERY = gql`
    query Search($zipCode: String!, $searchTerm: String!) {
        Search(zipCode: $zipCode, searchTerm: $searchTerm) {
            success,
            errors,
            landlords {
                firstName,
                lastName,
                overallRating
                reviews {
                    id
                }
            }
            properties {
                address1,
                city,
                state,
                zipCode,
                landlord {
                    id
                }
            }
        }
    }
`

const SearchResults = () => {
    const windowWidth = useWindowDimensions().width;
    const isFocused = useIsFocused();
    const { searchTerm, zipCode } = useSearchContext();
    const [search, { loading, data, error }] = useLazyQuery<Query, QuerySearchArgs>(SEARCH_QUERY);

    // We only want to get the search results when the user is on this screen.
    useEffect(() => {
        isFocused && search({ variables: { zipCode: zipCode, searchTerm: searchTerm } })
    }, [isFocused, searchTerm])

    console.log(data);

    return (
        <MainContainer >
            {searchTerm === '' ? <Text>Enter a search term</Text>
                :
                <View style={[widthDepStyles(windowWidth).listContainer, { alignSelf: 'flex-start' }]}>
                    <View style={widthDepStyles(windowWidth).reviewsPageHeader}>
                        <Text style={pageStyles.whiteHeaderText}>Landlords</Text>
                    </View>
                    {data?.Search.landlords?.length! > 0 ?
                        <FlatList style={pageStyles.flatList}
                            data={data?.Search.landlords}
                            keyExtractor={item => item!!.id}
                            renderItem={({ item }) => (
                                <LandlordComponent
                                    id={item?.id!}
                                    firstName={item?.firstName!}
                                    lastName={item?.lastName!}
                                    overallRating={item?.overallRating!}
                                    totalReviews={item?.reviews!.length!}
                                />
                            )}
                        />
                        :
                        <Text>No results found</Text>
                    }
                    <View style={widthDepStyles(windowWidth).reviewsPageHeader}>
                        <Text style={pageStyles.whiteHeaderText}>Properties</Text>
                    </View>
                    {/* {data?.Search.properties?.length! > 0 ?
                        <FlatList style={pageStyles.flatList}
                            data={data?.Search.properties}
                            keyExtractor={item => item!!.id}
                            renderItem={({ item }) => (<PropertyComponent property={item!} />)}
                        />
                        :
                        <Text>No results found</Text>
                    } */}
                </View>
            }
        </MainContainer>

    )
}

const styles = StyleSheet.create({
})



export default SearchResults;