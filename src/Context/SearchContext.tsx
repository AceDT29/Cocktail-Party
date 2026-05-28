import { createContext, useState, useEffect } from "react";
import type { propChilds, searchState } from "../types/globalStateTypes"
import { useQuery } from "@tanstack/react-query"
import { searchDataDrinks } from "../services/getSearcheableDrinks";

export type ContextType = {
    setEntries: (entries: string) => void;
    firstResult: searchState | string;
    otherResults: searchState[];
    isLoading: boolean;
    isError: boolean;
    entries: string;
    setNextFirstResult: (item: searchState) => void;
}

export const SearchContext = createContext<ContextType | null>(null);

export function SearchProvider({ children }: propChilds) {
    const [entries, setEntries] = useState("");
    const [pinnedIndex, setPinnedIndex] = useState(0);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["drinks", entries],
        queryFn: () => searchDataDrinks(entries),
        retry: true,
        enabled: entries.length > 3,
    })

    // Resetear selección cuando llegan datos nuevos (nueva búsqueda)
    useEffect(() => {
        setPinnedIndex(0);
    }, [data]);

    const allResults = entries.length > 3 && data && typeof data !== "string" ? data : null;

    const firstResult: searchState | string = allResults
        ? allResults[pinnedIndex]
        : (entries.length > 0 && typeof data === "string" ? data : "");

    const otherResults: searchState[] = allResults
        ? allResults.filter((_, i) => i !== pinnedIndex)
        : [];

    const setNextFirstResult = (item: searchState) => {
        if (!allResults) return;
        const idx = allResults.findIndex(r => r.idDrink === item.idDrink);
        if (idx !== -1 && idx !== pinnedIndex) setPinnedIndex(idx);
    };

    return (
        <SearchContext.Provider value={{ setEntries, firstResult, otherResults, isLoading, isError, entries, setNextFirstResult }}>
            {children}
        </SearchContext.Provider>
    )
}
