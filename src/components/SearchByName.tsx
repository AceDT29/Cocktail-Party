import type { ReactNode } from "react";
import type { searchState } from "../types/globalStateTypes";
import { Link } from "react-router";
import { useSearchContext } from "../customHooks/useSearchContext";
import searchBg from "../assets/search-bg.jpg";
import likeIcon from "../assets/like-svgrepo-com.svg";
import searchIcon from "../assets/search-alt-2-svgrepo-com.svg";

export function SearchByName({ placeHolder }: { placeHolder: ReactNode }) {
    const { setEntries, firstResult, otherResults, entries, isLoading, setNextFirstResult } = useSearchContext();
    const isTyping = entries.length > 0 && isLoading;

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
                        {typeof firstResult === "string" ? (
                            <div className="w-full h-auto flex flex-col justify-start p-4 items-start transition-all">
                                <h2 className="text-2xl my-4 italic font-semibold">{firstResult}</h2>
                            </div>
                        ) : (
                            <>
                                {firstResult && (
                                    <ul className="flex flex-col justify-start p-4 items-center transition-all">
                                        <Link to={`/cocktail/${firstResult?.strDrink}`}>
                                            <li className={`${firstResult?.strDrink ? 'CardsItemSearch' : 'hidden'}`}>
                                                <figure className='CardsItem-figure'>
                                                    <img className='w-full h-full block rounded-md' loading="lazy" src={firstResult?.strDrinkThumb} alt={firstResult.strDrink} />
                                                </figure>
                                                <p className="font-extralight self-center text-lg inner-shadow lg:text-2xl">{firstResult?.strDrink}</p>
                                            </li>
                                        </Link>
                                    </ul>
                                )}
                                {otherResults.length > 0 ? (
                                    <div className="w-full h-auto flex flex-col justify-start p-4 items-start transition-all">
                                        <h2 className="text-2xl my-4 italic font-semibold">Tambien se busco:</h2>
                                        <ul className="flex flex-col justify-start p-2 items-start transition-all">
                                            {otherResults.map((item: searchState) => (
                                                <button onClick={() => setNextFirstResult(item)} className="w-auto h-auto p-2 cursor-pointer">
                                                    <li key={item?.idDrink} className="w-auto h-auto p-2">
                                                        <p className="font-extralight hover:text-blue-500 self-start text-lg inner-shadow lg:text-2xl">{item?.strDrink}</p>
                                                    </li>
                                                </button>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    <p>Sin resultados</p>
                                )}
                            </>
                        )}
                    </>
                )}
            </article>
        </section>
    )
}
