import { Dispatch, SetStateAction } from 'react';

import { SQLColumn, SQLKeyModifier, SQLTable, SQLType } from './constants';

export const availableCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789()_ ';

export const makeColumn = (name: string, type?: SQLType, flag?: SQLKeyModifier): SQLColumn => {
    return { name, type: type || 'INT', modifier: flag || '', reference: null };
};

export const makeTable = (name: string, x: number, y: number): SQLTable => {
    const id = Array(15)
        .fill(null)
        .map(() => {
            return availableCharacters[Math.floor(Math.random() * availableCharacters.length)];
        })
        .join('');

    return { name, pos: { x: x < 1 ? 1 : x, y: y < 1 ? 1 : y }, columns: [], id };
};

export const setNewTable = (setAllTables: Dispatch<SetStateAction<SQLTable[]>>, newTable: SQLTable) => {
    setAllTables(prevAllTables => {
        const index = prevAllTables.findIndex(eachTable => eachTable.id === newTable.id);

        if (index === -1) {
            return [...prevAllTables, newTable];
        }

        return [...prevAllTables.slice(0, index), newTable, ...prevAllTables.slice(index + 1)];
    });
};

export const findIndex = (allTables: SQLTable[], table: SQLTable) => {
    const index = allTables.findIndex(eachTable => eachTable.id === table.id);
    if (index === -1) {
        return null;
    }
    return index;
};

export const convertRemToPixels = (rem: number) => {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};

export const asyncSleep = (ms: number): Promise<void> => {
    return new Promise(resolve => {
        setTimeout(() => resolve(), ms);
    });
};
