import { createContext, FC, useState, Dispatch, SetStateAction } from 'react';

type maybeTable = number | null;
type selectedTableType = [maybeTable, Dispatch<SetStateAction<maybeTable>>];
export const SelectedTableContext = createContext<selectedTableType>({} as selectedTableType);

export const SelectedTableProvider: FC = props => {
    const [selected, setSelected] = useState<maybeTable>(null);

    return (
        <SelectedTableContext.Provider value={[selected, setSelected]}>{props.children}</SelectedTableContext.Provider>
    );
};
