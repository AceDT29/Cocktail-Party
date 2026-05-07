import { useEffect, useState, useRef } from "react";
import type { ReactNode } from "react";
import { searchDataDrinks } from "../services/getSearcheableDrinks";
import { Link } from "react-router";
import { useCocktail } from "../customHooks/useCocktail";
import { useSearchContext } from "../customHooks/useSearchContext";
import type { searchState } from "../types/globalStateTypes";
import searchBg from "../assets/search-bg.jpg";
import likeIcon from "../assets/like-svgrepo-com.svg";
import searchIcon from "../assets/search-alt-2-svgrepo-com.svg";

export function SearchByName({ placeHolder }: { placeHolder: ReactNode }) {
    const { searchState, searchDispatch } = useSearchContext();
    const { dispatch } = useCocktail();
    const [entries, setEntries] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const debounceRef = useRef(null)

    const handleSearch = async () => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current)
        }
        debounceRef.current = setTimeout(async () => {
            const result = await searchDataDrinks(entries)
            if (typeof result === "string") {
                setIsTyping(false);
                searchDispatch({
                    type: "GET_NULL_RESULT",
                    payload: result
                })
                return;
            } else if (typeof result === "object") {
                setIsTyping(false);
                const [first, ...rest] = result;
                searchDispatch({
                    type: "GET_FIRST_RESULT",
                    payload: first
                })
                searchDispatch({
                    type: "GET_OTHER_RESULTS",
                    payload: rest
                })
                return;
            }
        }, 600)
    }

    useEffect(() => {
        if (entries.length > 0) {
            setIsTyping(true);
            handleSearch()
        } else {
            searchDispatch({
                type: "CLEAR_RESULTS"
            });
            setIsTyping(false);
        }
    }, [entries])

    return (
        <section className="mainContainer">
            <figure className="absolute top-0 left-0 w-full h-full -z-10">
                <img loading="lazy" className="w-full h-full object-cover rounded-md" src={searchBg} alt="Search Background" />
            </figure>
            <div className="currentTab -top-14">
                Busqueda
                <img className="block w-7 h-7" src={searchIcon} alt="" />
            </div>
            <Link to={"/"}>
                <div className="navTab w-auto -top-12 hover:-top-16">
                    Recomendados
                    <img className="block w-7 h-7" src={likeIcon} alt="" />
                </div>
            </Link>
            <div className="flex justify-start items-center gap-4 mb-4">
                <h2 className="text-3xl my-4 italic font-semibold">Busqueda por nombre:</h2>
                <div className="flex flex-col justify-center gap-y-1 items-center">
                    <label className="text-lg text-center font-semibold" htmlFor="search"></label>
                    <input
                        className="w-40 md:w-60 h-10 px-4 py-2 border-2 border-pink-200 focus:border-pink-400 bg-pink-50/60 rounded-lg shadow-sm focus:outline-none transition-all duration-200 text-gray-700 placeholder:text-pink-300 font-lexend font-light text-base"
                        type="text"
                        id="search"
                        value={entries}
                        placeholder="Ej, Mojito, Vodka..."
                        onInput={(e) => setEntries((e.target as HTMLInputElement).value)}
                    />
                </div>
            </div>
            <article>
                {isTyping ? placeHolder : (
                    <>
                        {typeof searchState.firstResult === "string" ? (
                            <div className="w-full h-auto flex flex-col justify-start p-4 items-start transition-all">
                                <h2 className="text-2xl my-4 italic font-semibold">{searchState.firstResult}</h2>
                            </div>
                        ) : (
                            <>
                                {searchState.firstResult && (
                                    <ul className="flex flex-col justify-start p-4 items-center transition-all">
                                        <Link to={`/cocktail/${searchState.firstResult?.strDrink}`}>
                                            <li onClick={() => dispatch({ type: "GET_COCKTAIL", payload: searchState.firstResult })} key={searchState.firstResult?.idDrink} className={`${searchState.firstResult?.strDrink ? 'CardsItemSearch' : 'hidden'}`}>
                                                <figure className='CardsItem-figure'>
                                                    <img className='w-full h-full block rounded-md' loading="lazy" src={searchState.firstResult?.strDrinkThumb} alt={searchState.firstResult.strDrink} />
                                                </figure>
                                                <p className="font-extralight self-center text-lg inner-shadow lg:text-2xl">{searchState.firstResult?.strDrink}</p>
                                            </li>
                                        </Link>
                                    </ul>
                                )}
                                {searchState.otherResults.length > 1 && (
                                    <div className="w-full h-auto flex flex-col justify-start p-4 items-start transition-all">
                                        <h2 className="text-2xl my-4 italic font-semibold">Tambien se busco:</h2>
                                        <ul className="flex flex-col justify-start p-2 items-start transition-all">
                                            {searchState.otherResults.map((item: searchState) => (
                                                <button className="w-auto h-auto p-2 cursor-pointer" onClick={() => searchDispatch({ type: "GET_FIRST_RESULT", payload: item })}>
                                                    <li key={item?.idDrink} className="w-auto h-auto p-2">
                                                        <p className="font-extralight hover:text-blue-500 self-start text-lg inner-shadow lg:text-2xl">{item?.strDrink}</p>
                                                    </li>
                                                </button>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}
            </article>
        </section>
    )
}
