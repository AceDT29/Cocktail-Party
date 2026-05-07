import { createContext, useReducer } from "react";
import { searchableDrinksReducer, initialState } from "../reducers/searchableDrinksReducer";
import type { propChilds } from "../types/globalStateTypes"

export const SearchContext = createContext(null);

export function SearchProvider({ children }: propChilds) {
    const [searchState, searchDispatch] = useReducer(searchableDrinksReducer, initialState);

    return (
        <SearchContext.Provider value={{ searchState, searchDispatch }}>
            {children}
        </SearchContext.Provider>
    )
}
