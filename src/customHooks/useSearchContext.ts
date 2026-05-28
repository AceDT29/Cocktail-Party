import { useContext } from "react";
import type { ContextType } from "../Context/SearchContext";
import { SearchContext } from "../Context/SearchContext";

export const useSearchContext = (): ContextType => {
    const context = useContext(SearchContext);
    if (context === null) {
        throw new Error("useSearchContext must be used within a SearchProvider");
    }
    const { setEntries, firstResult, otherResults, isLoading, isError, entries, setNextFirstResult } = context;
    return { setEntries, firstResult, otherResults, isLoading, isError, entries, setNextFirstResult };
}
