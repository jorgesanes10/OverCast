import { ReactNode, useEffect, useState } from 'react';
import { StoreContext } from './storeContext.ts';

const formattedConditions: { [key: string]: string } = {
  Clear: 'Clear',
  Clouds: 'Cloudy',
  Rain: 'Rainy',
  Snow: 'Snowy',
};

const getFormattedCondition = (condition: string): string => {
  return formattedConditions[condition];
};

export default function StoreProvider({ children }: { children: ReactNode }) {
  const [unit, setUnit] = useState('imperial');
  const [searchHistory, setSearchHistory] = useState<string[]>(
    JSON.parse(localStorage.getItem('search-history') || '[]') || [],
  );
  const [favorites, setFavorites] = useState<string[]>(
    JSON.parse(localStorage.getItem('favorites') || '[]') || [],
  );
  const [conditions, setConditionsState] = useState('Clear');

  useEffect(() => {
    if (searchHistory.length > 0) {
      localStorage.setItem('search-history', JSON.stringify(searchHistory));
    }
  }, [searchHistory]);

  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

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

  const setConditions = (condition: string) => {
    setConditionsState(getFormattedCondition(condition));
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
        conditions,
        setConditions,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
