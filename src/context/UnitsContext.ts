import { createContext } from 'react';

export const UnitsContext = createContext({
  unit: 'imperial',
  toggle: () => {},
});
