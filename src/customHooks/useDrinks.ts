import { DrinksContext } from "../Context/QueryDrinksContext";
import { useContext } from "react";

export function useDrinks() {
    const { dataDrinks, loading, setLoading, setDataDrinks } = useContext(DrinksContext);
    return { dataDrinks, loading, setLoading, setDataDrinks };
}
