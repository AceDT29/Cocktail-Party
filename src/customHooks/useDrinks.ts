import { DrinksContext } from "../Context/QueryDrinksContext";
import { useContext } from "react";

export function useDrinks() {
    const context = useContext(DrinksContext);
    if (!context) {
        throw new Error("useDrinks debe usarse dentro de un DrinksProvider");
    }
    return context;
}
