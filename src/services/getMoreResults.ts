import { normalizerData } from "../utilities/normalizer";
    
async function getMoreDrinks() {
    try {
        const queryDrink = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${8}`);
        const response = await queryDrink.json();
        const moreDrinks = response.drinks;
        if (moreDrinks.length > 0) {
            return normalizerData(moreDrinks);
        }
    } catch (error) {
        console.error(error);
    }
}

export {
    getMoreDrinks
}
