import { createContext } from 'react';

export const StoreContext = createContext({
  unit: 'imperial',
  toggleUnit: () => {},
  searchHistory: [''],
  addToSearchHistory: (term: string) => {
    console.log(term);
  },
});
