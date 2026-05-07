import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DrinksProvider } from './Context/QueryDrinksContext.tsx'
import { CocktailCardProvider } from './Context/CocktailCardContext.tsx'
import { SearchProvider } from './Context/SearchContext.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DrinksProvider>
      <CocktailCardProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </CocktailCardProvider>
    </DrinksProvider>
  </StrictMode>
)
