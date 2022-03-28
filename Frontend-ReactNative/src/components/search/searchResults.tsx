import { Text, View } from 'react-native';
import { useSearchContext } from '../../global/searchContext';
import MainContainer from '../mainContainer';

const SearchResults = () => {
    const { searchTerm } = useSearchContext();

    return (
        <MainContainer >
            <Text>{searchTerm}</Text>
        </MainContainer>

    )
}

export default SearchResults;