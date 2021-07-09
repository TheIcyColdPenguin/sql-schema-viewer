import { createContext, FC, useState, Dispatch, SetStateAction } from 'react';
import { SQLTable } from '../../others/constants';

type maybeTables = SQLTable[];
type allTablesType = [maybeTables, Dispatch<SetStateAction<maybeTables>>];
export const AllTablesContext = createContext<allTablesType>({} as allTablesType);

export const AllTablesProvider: FC = props => {
    const [allTables, setAllTables] = useState<maybeTables>([]);

    return <AllTablesContext.Provider value={[allTables, setAllTables]}>{props.children}</AllTablesContext.Provider>;

};
