import { useState, createContext, useEffect, useMemo } from 'react'
import { getRandomDrinks } from "../services/getRandomDrinks";
import { getRandomUniqueLetters } from "../utilities/generateRandom";
import { normalizerData } from "../utilities/normalizer"
import type { propChilds, searchState } from "../types/globalStateTypes"
import type { Dispatch, SetStateAction } from "react";

type DrinksContextType = {
    dataDrinks: searchState[];
    loading: boolean;
    letters: string[];
    setLoading: Dispatch<SetStateAction<boolean>>;
    setDataDrinks: Dispatch<SetStateAction<searchState[]>>;
}

export const DrinksContext = createContext<DrinksContextType | null>(null);

export function DrinksProvider({ children }: propChilds) {
    const [loading, setLoading] = useState(true);
    const [dataDrinks, setDataDrinks] = useState<searchState[] | []>([]);
    const letters = useMemo(() => getRandomUniqueLetters(8), []);

    useEffect(() => {
        const fetchDrinks = async () => {
            const drinks = await getRandomDrinks(letters);
            const normalizeDrinks = normalizerData(drinks);
            setDataDrinks(normalizeDrinks);
            setLoading(false);
        };
        fetchDrinks();
    }, [letters])

    return (
        <DrinksContext.Provider value={{ dataDrinks, loading, letters, setLoading, setDataDrinks }}>
            {children}
        </DrinksContext.Provider>
    )

}
