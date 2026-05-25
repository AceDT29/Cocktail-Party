import { useDrinks } from "../customHooks/useDrinks";
import { Link } from "react-router";
import { useDebounce } from "../customHooks/useDebouncing";
import { useCocktail } from "../customHooks/useCocktail";
import type { searchState } from "../types/globalStateTypes";
import type { ReactNode } from "react";
import likeIcon from "../assets/like-svgrepo-com.svg";
import searchIcon from "../assets/search-alt-2-svgrepo-com.svg";
import searchBg from "../assets/search-bg.jpg";

export function DailyRandomRecommended({ placeHolder }: { placeHolder: ReactNode }) {
  const { dataDrinks, loading, fetchMoreResults } = useDrinks();
  const handlerDebouncer = useDebounce;
  const { dispatch } = useCocktail();

  const handleMoreResults = handlerDebouncer({ fn: fetchMoreResults, wait: 1500 });

  return (
    <>
      <section className="mainContainer">
        <figure className="absolute top-0 left-0 w-full h-full -z-10">
          <img className="w-full h-full object-cover rounded-md" src={searchBg} alt="Search Background" />
        </figure>
        <div className="currentTab">
          Recomendados
          <img className="block w-7 h-7" src={likeIcon} alt="" />
        </div>
        <Link to={"/search"}>
          <div className="navTab">
            Busqueda
            <img className="block w-7 h-7" src={searchIcon} alt="" />
          </div>
        </Link>
        <h2 className="text-3xl my-4 italic font-semibold">Recomendados de hoy</h2>
        <div>
        </div>
        <ul className="flex flex-wrap justify-center gap-8 p-4 items-center ">
          {loading ? placeHolder :
            dataDrinks.map((item: searchState) => (
              <Link to={`/cocktail/${item?.strDrink}`} key={item?.idDrink}>
                <li onClick={() => dispatch({ type: "GET_COCKTAIL", payload: item })} key={item?.idDrink} className="CardsItem">
                  <figure className='w-[90%] h-[90%] flex justify-center items-center rounded-md border-yellow-900/50 border-2'>
                    <img className='w-[90%] h-[90%] object-cover rounded-md' src={item?.strDrinkThumb} alt={item?.strDrink} />
                  </figure>
                  <p className="font-extralight text-lg">{item?.strDrink}</p>
                </li>
              </Link>
            ))}
        </ul>
        <div className="flex mx-auto justify-center items-center">
          {loading ? <p>Cargando...</p> : null}
          <button className="w-auto cursor-pointer h-auto p-3 rounded-sm border bg-blue-300" onClick={handleMoreResults}>
            Ver mas
          </button>
        </div>
      </section>
    </>
  );
}
