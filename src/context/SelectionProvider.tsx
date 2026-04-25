import { useReducer, type ReactNode } from "react";
import { SelectionContext, type SelectionContextType } from "./selectionContext";


interface SelectionState {
  selectedIds: Set<string>;
}

// All possible actions
type Action =
  | { type: "TOGGLE"; id: string }
  | { type: "SELECT_ALL"; ids: string[] }
  | { type: "CLEAR" };

// handles selection logic
function reducer(state: SelectionState, action: Action): SelectionState {
  switch (action.type) {
    case "TOGGLE": {
      const next = new Set(state.selectedIds);

      // Add/Remove ID depending on current states
      if (next.has(action.id)) {
        next.delete(action.id);
      } else {
        next.add(action.id);
      }

      return { selectedIds: next };
    }
    case "SELECT_ALL":
      return { selectedIds: new Set(action.ids) };
    case "CLEAR":
      return { selectedIds: new Set() };
    default:
      return state;
  }
}

export const SelectionProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    selectedIds: new Set<string>(),
  });

  const value: SelectionContextType = {
    selectedIds: state.selectedIds,
    toggle: (id) => dispatch({ type: "TOGGLE", id }),
    selectAll: (ids) => dispatch({ type: "SELECT_ALL", ids }),
    clear: () => dispatch({ type: "CLEAR" }),
    count: state.selectedIds.size,
    isSelected: (id) => state.selectedIds.has(id),
  };

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
};
