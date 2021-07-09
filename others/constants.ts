export type SQLNumericTypes = 'INT' | 'TINYINT' | 'FLOAT';
export type SQLStringTypes = 'TEXT' | `CHAR(${number})` | `VARCHAR(${number})`;
export type SQLDateTimeTypes = 'DATE' | 'TIME' | 'DATETIME';

export type SQLType = 'NULL' | SQLDateTimeTypes | SQLNumericTypes | SQLStringTypes;
export type SQLKeyModifier = 'PRIMARY' | 'FOREIGN' | '';

export interface SQLColumn {
    name: string;
    modifier: SQLKeyModifier;
    type: SQLType;
}

export interface SQLTable {
    name: string;
    columns: SQLColumn[];
    id: number;
    pos: { x: number; y: number };
}
