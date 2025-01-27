import { createContext } from 'react';

export type City = { name: string; lat: number; lon: number };

export const StoreContext = createContext({
  unit: 'imperial',
  toggleUnit: () => {},
  currentCity: {} as City,
  setCurrentCity: (city: City) => {
    console.log(city);
  },
  favorites: [] as City[],
  toggleFavorite: (city: City) => {
    console.log(city);
  },
  conditions: '',
  setConditions: (conditions: string) => {
    console.log(conditions);
  },
});
