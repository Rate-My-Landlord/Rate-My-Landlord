import { createContext, useContext } from 'react'

export type searchContextContextContent = {
    zipCode: string,
    setZipCode: (zipCode: string) => void,
    searchTerm: string,
    setSearchTerm: (searchTerm: string) => void,
}

export const SearchContext = createContext<searchContextContextContent>({
    zipCode: '',
    setZipCode: () => { },
    searchTerm: '',
    setSearchTerm: () => { },
});

export const useSearchContext = () => useContext(SearchContext);

