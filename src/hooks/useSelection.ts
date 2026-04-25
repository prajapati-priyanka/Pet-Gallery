import { useContext } from 'react';
import { SelectionContext, type SelectionContextType } from '../context/selectionContext';


export function useSelection(): SelectionContextType {
  const ctx = useContext(SelectionContext);
  if (!ctx) throw new Error('useSelection must be inside SelectionProvider');
  return ctx;
}
