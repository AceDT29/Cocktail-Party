import { normalizerData } from "../utilities/normalizer";

export const getRandomDrinks = async (letters: string[]) => {
  if (!letters || letters.length === 0) return;
  try {
    const requests = letters.map(l =>
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${l}`)
        .then(res => res.json())
        .then(data => {
          if (data.drinks && data.drinks.length > 0) {
            return data.drinks[Math.floor(Math.random() * data.drinks.length)];
          }
          return null;
        })
    );
    const results = await Promise.all(requests);
    const validResults = results.filter((drink): drink is NonNullable<typeof drink> => drink !== null);
    return normalizerData(validResults);
  } catch (error) {
    console.error(error);
    return [];
  }
}
