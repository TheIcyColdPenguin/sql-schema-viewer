import { createContext, FC, useState, Dispatch, SetStateAction } from 'react';

type maybeTable = number | null;
type editingTableType = [maybeTable, Dispatch<SetStateAction<maybeTable>>];
export const EditingTableContext = createContext<editingTableType>({} as editingTableType);

export const EditingTableProvider: FC = props => {
    const [editing, setEditing] = useState<maybeTable>(null);

    return <EditingTableContext.Provider value={[editing, setEditing]}>{props.children}</EditingTableContext.Provider>;
};
