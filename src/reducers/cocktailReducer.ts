import type { searchState } from "../types/globalStateTypes"


export const initialState: searchState = {
    idDrink: "",
    strDrink: "",
    strDrinkThumb: "",
    strGlass: "",
    strInstructionsES: ""
}

export type Action = | { type: "GET_COCKTAIL"; payload: searchState }
    | { type: "OTHER_ACTION" };

export interface State {
    state: searchState;
    dispatch: (Action: Action) => void
}

export function cocktailReducer(state = initialState, action: Action) {
    switch (action.type) {
        case "GET_COCKTAIL":
            return action.payload;
        default:
            return state;
    }
}
