import type { searchState } from "../types/globalStateTypes";

export function normalizerData(data: searchState[]) {
    return data.map((drink) => {
        const ingredients: string[] = [];
        for (let i = 1; i <= 15; i++) {
            const value = drink[`strIngredient${i}`];
            if (value) {
                ingredients.push(value);
            }
        }
        return {
            idDrink: drink.idDrink,
            strDrink: drink.strDrink,
            strDrinkThumb: drink.strDrinkThumb,
            strGlass: drink.strGlass,
            strInstructionsES: drink.strInstructionsES,
            ingredients: ingredients
        }
    })
}

