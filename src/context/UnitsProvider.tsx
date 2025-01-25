import { ReactNode, useState } from 'react';
import { UnitsContext } from './UnitsContext.ts';

export default function UnitsProvider({ children }: { children: ReactNode }) {
  const [unit, setUnit] = useState('imperial');

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'imperial' ? 'metric' : 'imperial'));
  };

  return (
    <UnitsContext.Provider value={{ unit, toggle: toggleUnit }}>
      {children}
    </UnitsContext.Provider>
  );
}
