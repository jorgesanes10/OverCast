import { createContext } from 'react';

export const StoreContext = createContext({
  unit: 'imperial',
  toggleUnit: () => {},
  searchHistory: [''],
  addToSearchHistory: (term: string) => {
    console.log(term);
  },
  favorites: [''],
  toggleFavorite: (city: string) => {
    console.log(city);
  },
  conditions: '',
  setConditions: (conditions: string) => {
    console.log(conditions);
  },
});
