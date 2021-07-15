export type SQLNumericTypes = 'INT' | 'TINYINT' | 'FLOAT' | 'DOUBLE';
export type SQLStringTypes = 'TEXT' | `CHAR(${number})` | `VARCHAR(${number})`;
export type SQLDateTimeTypes = 'DATE' | 'TIME' | 'DATETIME';

export type SQLType = 'NULL' | SQLDateTimeTypes | SQLNumericTypes | SQLStringTypes;

export const SQLKeyModifierArray = ['', 'PRIMARY', 'FOREIGN'] as const;
export type SQLKeyModifier = typeof SQLKeyModifierArray[number];

export interface SQLColumn {
    name: string;
    modifier: SQLKeyModifier;
    reference: number | null;
    type: SQLType;
}

export interface SQLTable {
    name: string;
    columns: SQLColumn[];
    id: string;
    pos: { x: number; y: number };
}

export const isValidModifier = (modifier: string): modifier is SQLKeyModifier => {
    return ['', 'FOREIGN', 'PRIMARY'].includes(modifier);
};
