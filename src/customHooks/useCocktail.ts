import { CocktailContext } from "../Context/CocktailCardContext";
import { useContext } from "react";

export function useCocktail() {
    const context = useContext(CocktailContext);
    if (context === undefined) {
        throw new Error("useCocktail must be used within a CocktailProvider");
    }
    const { state, dispatch } = context;
    return { state, dispatch };
}
