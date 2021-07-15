import { createContext, FC, useState, Dispatch, SetStateAction, useEffect } from 'react';

import { SQLColumn, SQLKeyModifier, SQLKeyModifierArray, SQLTable } from '../../others/constants';

type maybeTables = SQLTable[];
type allTablesType = [maybeTables, Dispatch<SetStateAction<maybeTables>>];
export const AllTablesContext = createContext<allTablesType>({} as allTablesType);

const validateKeyModifier = (maybeModifier: any): maybeModifier is SQLKeyModifier => {
    if (typeof maybeModifier !== 'string') return false;
    return (SQLKeyModifierArray as ReadonlyArray<string>).includes(maybeModifier);
};

const validateColumns = (maybeAllColumns: any): maybeAllColumns is SQLColumn[] => {
    if (!maybeAllColumns) return false;
    if (!Array.isArray(maybeAllColumns)) return false;
    for (const column of maybeAllColumns) {
        if (typeof column.name !== 'string') return false;
        if (!validateKeyModifier(column.modifier)) return false;
        if (column.reference !== null || typeof column.reference !== 'number') return false;

        // TODO: Update to actually checking if column.type is a valid type
        if (typeof column.type !== 'string') return false;
    }

    return true;
};

const validateTables = (maybeAllTables: any): maybeAllTables is maybeTables => {
    if (!Array.isArray(maybeAllTables)) return false;
    maybeAllTables.forEach(eachTable => {
        if (typeof eachTable.type !== 'string') return false;
        if (typeof eachTable.id !== 'string') return false;
        if (!validateColumns(eachTable.columns)) return false;
        if (typeof eachTable.pos?.x !== 'number') return false;
        if (typeof eachTable.pos?.y !== 'number') return false;
    });

    return true;
};

export const AllTablesProvider: FC = props => {
    const [allTables, setAllTables] = useState<maybeTables>([]);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const data = searchParams.get('data');

        if (!data) return;
        try {
            const maybeAllTables = JSON.parse(atob(decodeURIComponent(data)));
            if (validateTables(maybeAllTables)) {
                setAllTables(maybeAllTables);
            }
        } catch {
            return;
        }
    }, []);

    return <AllTablesContext.Provider value={[allTables, setAllTables]}>{props.children}</AllTablesContext.Provider>;
};
