import { createContext, useContext, useReducer, type ReactNode } from "react";

interface SelectionState { selectedIds: Set<string>; }

type Action =
  | { type: 'TOGGLE'; id: string | number}
  | { type: 'SELECT_ALL'; ids: string[] }
  | { type: 'CLEAR' };

function reducer(state: SelectionState, action: Action): SelectionState {
  switch (action.type) {
    case 'TOGGLE': {
      const next = new Set(state.selectedIds);
      if (next.has(action.id)) {
    next.delete(action.id);
  } else {
    next.add(action.id);
  }

  return { selectedIds: next };
    }
    case 'SELECT_ALL': return { selectedIds: new Set(action.ids) };
    case 'CLEAR':      return { selectedIds: new Set() };
    default:           return state;
  }
}

interface Ctx{
    selectedIds: Set<string>,
    toggle: (id:string)=> void;
    selectAll : (ids: string[]) => void;
    clear: ()=> void;
    count: number;
    isSelected: (id: string | number) => boolean
}

const SelectionContext = createContext<Ctx | null>(null)

export const SelectionProvider = ({children}: {children: ReactNode})=>{

    const [state, dispatch] = useReducer(reducer, {selectedIds : new Set<string>()})

    
  const value: Ctx = {
    selectedIds: state.selectedIds,
    toggle:     (id)  => dispatch({ type: 'TOGGLE', id }),
    selectAll:  (ids) => dispatch({ type: 'SELECT_ALL', ids }),
    clear:      ()    => dispatch({ type: 'CLEAR' }),
    count:      state.selectedIds.size,
    isSelected: (id)  => state.selectedIds.has(id),
  };

    return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>

}



export function useSelection(){
  const ctx = useContext(SelectionContext);
  if (!ctx) throw new Error('useSelection must be inside SelectionProvider');
  return ctx;
}
