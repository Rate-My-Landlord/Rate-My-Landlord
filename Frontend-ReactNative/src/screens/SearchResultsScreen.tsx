import { Text, View } from 'react-native';
import { useSearchContext } from '../global/searchContext';
import MainContainer from '../components/mainContainer';
import { gql, useQuery } from '@apollo/client';
import { Query, QuerySearchArgs } from '../../graphql/generated';


const SEARCH_QUERY = gql`
    query Search($zipCode: String!, $searchTerm: String!) {
        Search(zipCode: $zipCode, searchTerm: $searchTerm) {
            success,
            errors,
            landlords {
                firstName
            }
            properties {
                address1
            }
        }
    }
`

const SearchResults = () => {
    const { searchTerm, zipCode } = useSearchContext();
    const { loading, data, error } = useQuery<Query, QuerySearchArgs>(SEARCH_QUERY, { variables: { zipCode: zipCode, searchTerm: searchTerm } });

    return (
        <MainContainer >
            <View>
                {data?.Search.landlords?.map(landlord => <Text>{landlord?.firstName}</Text>)}
                {data?.Search.properties?.map(properties => <Text>{properties?.address1}</Text>)}
            </View>
        </MainContainer>

    )
}

export default SearchResults;