import type { ReactNode } from "react";

// Tipos para la drinkcard:

export type searchState = {
    idDrink: string,
    strDrink: string,
    strDrinkThumb: string,
    strGlass: string,
    strInstructionsES: string,
    ingredients?: string[] | null,
    [key: `strIngredient${number}`]: string | null | undefined,
}

// Tipos para el buscador:

export type SearchableDrinksState = {
    firstResult: searchState | string;
    otherResults: searchState[];
}

export type propChilds = {
    children: ReactNode;
    placeHolder?: ReactNode;
};