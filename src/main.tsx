import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DrinksProvider } from './Context/QueryDrinksContext.tsx'
import { CocktailCardProvider } from './Context/CocktailCardContext.tsx'
import { SearchProvider } from './Context/SearchContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <DrinksProvider>
        <CocktailCardProvider>
          <SearchProvider>
            <App />
          </SearchProvider>
        </CocktailCardProvider>
      </DrinksProvider>
    </QueryClientProvider>
  </StrictMode>
)
