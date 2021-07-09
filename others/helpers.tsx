import { SQLColumn, SQLKeyModifier, SQLTable, SQLType } from './constants';

import { Dispatch, SetStateAction } from 'react';

export const makeColumn = (name: string, type?: SQLType, flag?: SQLKeyModifier): SQLColumn => {
    return { name, type: type || 'INT', modifier: flag || '' };
};

export const makeTable = (() => {
    let id = 0;

    return (name: string, x: number, y: number): SQLTable => {
        return { name, pos: { x: x < 1 ? 1 : x, y: y < 1 ? 1 : y }, columns: [], id: id++ };
    };
})();

export const newTableSetterFactory = (
    setCurrentTable: Dispatch<SetStateAction<SQLTable | null>>,
    setAllTables: (value: SetStateAction<SQLTable[]>) => void,
    index: number
) => {
    return (newTable: SQLTable) => {
        if (index === -1) return;

        setCurrentTable(newTable);
        setAllTables(prevAllTables => [...prevAllTables.slice(0, index), ...prevAllTables.slice(index + 1), newTable]);
    };
};
