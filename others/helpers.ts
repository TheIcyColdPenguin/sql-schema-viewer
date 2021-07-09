import { SQLColumn, SQLKeyModifier, SQLTable, SQLType } from './constants';

export const makeColumn = (name: string, type?: SQLType, flag?: SQLKeyModifier): SQLColumn => {
    return { name, type: type || 'INT', modifier: flag || '' };
};

export const makeTable = (() => {
    let id = 0;

    return (name: string, x: number, y: number): SQLTable => {
        return { name, pos: { x: x < 1 ? 1 : x, y: y < 1 ? 1 : y }, columns: [], id: id++ };
    };
})();
