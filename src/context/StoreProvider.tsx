import { ReactNode, useEffect, useState } from 'react';
import { City, StoreContext } from './storeContext.ts';

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
  const [favorites, setFavorites] = useState<City[]>(
    JSON.parse(localStorage.getItem('favorites') || '[]') || [],
  );
  const [conditions, setConditionsState] = useState('Clear');
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'imperial' ? 'metric' : 'imperial'));
  };

  const toggleFavorite = (city: City) => {
    setFavorites((prevFavorites) => {
      console.log(prevFavorites);
      if (!prevFavorites.find((favCity) => favCity.name === city.name)) {
        console.log(city);
        return [...prevFavorites, city];
      }

      return prevFavorites.filter((item) => item.name !== city.name);
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
        favorites,
        toggleFavorite,
        conditions,
        setConditions,
        currentCity: currentCity as City,
        setCurrentCity,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
