import { createContext } from "react";
import { cocktailReducer } from "../reducers/cocktailReducer";
import { useReducer } from "react";
import { initialState } from "../reducers/cocktailReducer";
import type { propChilds } from "../types/globalStateTypes";
import type { State } from "../reducers/cocktailReducer";

export const CocktailContext = createContext<State | null>(null);

export function CocktailCardProvider({ children }: propChilds) {
    const [state, dispatch] = useReducer(cocktailReducer, initialState);
    return (
        <CocktailContext.Provider value={{ state, dispatch }}>
            {children}
        </CocktailContext.Provider>
    );
}
