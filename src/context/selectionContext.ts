import { createContext} from "react";


export interface SelectionContextType{
    selectedIds: Set<string>,
    toggle: (id:string)=> void;
    selectAll : (ids: string[]) => void;
    clear: ()=> void;
    count: number;
    isSelected: (id: string) => boolean
}

export const SelectionContext = createContext<SelectionContextType | null>(null)





