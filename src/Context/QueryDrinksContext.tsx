import { useState, createContext, useEffect, useMemo } from 'react'
import { useQuery } from "@tanstack/react-query";
import { getRandomDrinks } from "../services/getRandomDrinks";
import { getRandomUniqueLetters } from "../utilities/generateRandom";
import { normalizerData } from "../utilities/normalizer"
import type { propChilds, searchState } from "../types/globalStateTypes"

type DrinksContextType = {
    dataDrinks: searchState[];
    loading: boolean;
    error: unknown;
    fetchMoreResults: () => Promise<void>;
}

export const DrinksContext = createContext<DrinksContextType | null>(null);

export function DrinksProvider({ children }: propChilds) {
    const [dataDrinks, setDataDrinks] = useState<searchState[] | []>([]);
    const letters = useMemo(() => getRandomUniqueLetters(8), []);
    const { data, isLoading: loading, isError: error } = useQuery({
        queryKey: ['drinks', letters],
        queryFn: () => getRandomDrinks(letters),
    });

    const fetchMoreResults = async () => {
        const newLetters = getRandomUniqueLetters(8);
        if (newLetters.length === 0) return;
        try {
            const moreDrinks = await getRandomDrinks(newLetters);
            setDataDrinks((prev: searchState[]) => prev.concat(moreDrinks));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (data) {
            const normalizeDrinks = normalizerData(data);
            setDataDrinks(normalizeDrinks);
        }
    }, [data]);

    return (
        <DrinksContext.Provider value={{ dataDrinks, loading, error, fetchMoreResults }}>
            {children}
        </DrinksContext.Provider>
    )

}
