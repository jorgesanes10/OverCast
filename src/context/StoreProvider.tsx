import { ReactNode, useState } from 'react';
import { StoreContext } from './storeContext.ts';

export default function StoreProvider({ children }: { children: ReactNode }) {
  const [unit, setUnit] = useState('imperial');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'imperial' ? 'metric' : 'imperial'));
  };

  const addToSearchHistory = (term: string) => {
    setSearchHistory((prevSearchHistory) => {
      if (!prevSearchHistory.includes(term)) {
        return [...prevSearchHistory, term];
      }

      return [...prevSearchHistory];
    });
  };

  const toggleFavorite = (city: string) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.includes(city)) {
        return [...prevFavorites, city];
      }

      return prevFavorites.filter((item) => item !== city);
    });
  };

  return (
    <StoreContext.Provider
      value={{
        unit,
        toggleUnit,
        searchHistory,
        addToSearchHistory,
        favorites,
        toggleFavorite,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
