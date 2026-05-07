import { normalizerData } from "../utilities/normalizer";

export async function searchDataDrinks(name: string) {
    if (name.length < 4) return;
    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
        const parsedData = await response.json();
        if (parsedData.drinks == null) {
            return "No se encontraron resultados";
        } else {
            return normalizerData(parsedData.drinks);
        }
    } catch (error) {
        console.error(error);
    }
}
