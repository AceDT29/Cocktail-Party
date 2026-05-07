import type { searchState } from "../types/globalStateTypes";
import type { SearchableDrinksState } from "../types/globalStateTypes";


// --- Action types (discriminated union) ---
type SearchableDrinksAction =
    | { type: "GET_DATA_DRINKS"; payload: SearchableDrinksState }
    | { type: "GET_FIRST_RESULT"; payload: searchState }
    | { type: "GET_OTHER_RESULTS"; payload: searchState[] }
    | { type: "GET_NULL_RESULT"; payload: "" }
    | { type: "CLEAR_RESULTS" };

// --- Initial state ---
export const initialState: SearchableDrinksState = {
    firstResult: "",
    otherResults: []
};

// --- Reducer ---
export function searchableDrinksReducer(
    state: SearchableDrinksState,
    action: SearchableDrinksAction
): SearchableDrinksState {
    switch (action.type) {
        case "GET_DATA_DRINKS":
            return action.payload;
        case "GET_FIRST_RESULT": {
            return { ...state, firstResult: action.payload };
        }
        case "GET_OTHER_RESULTS": {
            const filtered = action.payload.filter(
                (item) => item.idDrink !== (typeof state.firstResult === "object" ? state.firstResult.idDrink : undefined)
            );
            return { ...state, otherResults: filtered };
        }
        case "GET_NULL_RESULT": {
            return { ...state, firstResult: action.payload, otherResults: [] };
        }
        case "CLEAR_RESULTS":
            return initialState;
        default:
            return state;
    }
}
