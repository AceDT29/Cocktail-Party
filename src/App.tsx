import { BrowserRouter, Routes, Route } from "react-router";
import { DailyRandomRecommended } from "./components/DailyRandomRecommended";
import { SearchByName } from "./components/SearchByName";
import { HolderComp } from "./components/CocktailPlaceHolder";
import { CocktailView } from "./components/CocktailView";
import holderDrinksIcon from "./assets/cocktail-holder.svg";

function App() {
  return (
    <>
      <BrowserRouter>
        <header className="sticky z-20 inset-0 w-full h-auto p-4 mx-auto border bg-amber-200/10 backdrop-blur-md mb-16">
          <h2 className="text-2xl text-center font-semibold italic">Cocktail party🍸</h2>
        </header>
        <article className="w-full h-auto mx-auto h-min-[80vh] rounded-md">
          <Routes>
            <Route path="/"
              element={<DailyRandomRecommended
                placeHolder={<HolderComp holders={3}
                  message="Recuperando datos..."
                  holderIcon={holderDrinksIcon}
                />}
              />}
            />
            <Route path="/search"
              element={<SearchByName
                placeHolder={<HolderComp
                  holders={1}
                  message="Buscando cócteles..."
                  holderIcon={holderDrinksIcon}
                />}
              />}
            />
            <Route path="/cocktail/:id" element={<CocktailView
              placeHolder={<HolderComp
                holders={1}
                message="No se encontro el coctel"
                holderIcon={holderDrinksIcon}
              />}
            />} />
          </Routes>
        </article>
        <footer className="w-full h-auto p-4 mx-auto border bg-amber-200/10 backdrop-blur-md mt-12">
          <h2 className="text-2xl text-center font-semibold italic">Cocktail party🍸</h2>
        </footer>
      </BrowserRouter>
    </>
  );
}

export default App
