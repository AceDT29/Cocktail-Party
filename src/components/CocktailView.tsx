import { Link, useNavigate } from "react-router";
import type { ReactNode } from "react";
import homeIcon from "../assets/home.svg";
import searchBg from "../assets/search-bg.jpg";
import { useCocktail } from "../customHooks/useCocktail";
import { useEffect } from "react";

export function CocktailView({ placeHolder }: { placeHolder: ReactNode }) {
  const { state } = useCocktail();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.idDrink) {
      navigate("/");
    }
  }, [])

  if (!state?.idDrink) {
    return (
      <div className="mainContainer mt-20">
        <figure className="absolute top-0 left-0 w-full h-full -z-10">
          <img loading="lazy" className="w-full h-full object-cover rounded-md" src={searchBg} alt="Search Background" />
        </figure>
        {placeHolder}
      </div>
    )
  }

  return (
    <div className="mainContainer mt-20">
      <figure className="absolute top-0 left-0 w-full h-full -z-10">
        <img loading="lazy" className="w-full h-full object-cover rounded-md" src={searchBg} alt="Search Background" />
      </figure>
      <Link to={"/"}>
        <div className="currentTab w-auto hover:h-16 hover:-top-16 -left-0 bg-slate-100 cursor-pointer transition-all">
          Inicio
          <img className="block w-7 h-7" src={homeIcon} alt="" />
        </div>
      </Link>
      <div className="w-auto h-auto my-3 inner-shadow">
        <h2 className="text-3xl my-4 italic font-light">{state?.strDrink}</h2>
      </div>

      <ul className="">
        <li className="w-full h-full flex flex-wrap justify-evenly" key={state?.idDrink}>
          <figure className="w-80 h-80 rounded-md shadow-lg">
            <img className="block w-full h-full border rounded-md shadow-lg" src={state?.strDrinkThumb} alt={state?.strDrink} />
          </figure>
          <div className="w-72 h-72 flex flex-col justify-between">
            <h4 className="font-lexend font-extralight text-2xl my-2">Ingredientes</h4>
            {state?.ingredients.length > 1 ? (
              <ol>
                {state?.ingredients.map((item: string) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            ) : (
              <p>Sin datos de ingredientes para este coctel</p>
            )}
            <h4 className="font-lexend text-lg font-extralight">Tipo de vaso: {state?.strGlass}</h4>
          </div>
          {state?.strInstructionsES ?
            <article className="flex flex-col">
              <h4 className="italic font-extralight text-2xl my-2">Preparacion:</h4>
              <p className="text-lg font-extralight">{state?.strInstructionsES}</p>
            </article> :
            <div className="mx-16 my-16 font-lexend font-extralight text-2xl">
              <p>Sin datos de preparacion para este coctel</p>
            </div>
          }
        </li>
      </ul>
    </div>
  );
}
