import { useContext } from 'react';
import { SelectionContext } from '../context/SelectionContext';
import type { SelectionContextType } from '../context/SelectionContext';


export function useSelection(): SelectionContextType {
  const ctx = useContext(SelectionContext);
  if (!ctx) throw new Error('useSelection must be inside SelectionProvider');
  return ctx;
}
