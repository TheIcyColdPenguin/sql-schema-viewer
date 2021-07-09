import { FC, useContext } from 'react';
import { SQLTable } from '../../others/constants';

import styles from '../../styles/table.module.css';
import { AllTablesContext } from '../contexts/allTablesContext';
import { SelectedTableContext } from '../contexts/selectedTableContext';
import { EditingTableContext } from '../contexts/editingTableContext';

const Table: FC<{ table: SQLTable }> = ({ table }) => {
    const [selectedTable, setSelectedTable] = useContext(SelectedTableContext);
    const [, setEditingTable] = useContext(EditingTableContext);
    const [, setAllTables] = useContext(AllTablesContext);

    return (
        <div
            style={{ left: table.pos.x, top: table.pos.y }}
            className={styles.table}
            onClick={e => e.stopPropagation()}
            onMouseDown={e => {
                e.stopPropagation();
                setSelectedTable(table);
            }}
            onMouseUp={() => {
                if (selectedTable?.id === table.id) setSelectedTable(null);
            }}
            onContextMenu={e => {
                e.preventDefault();
                if (e.shiftKey) {
                    setAllTables(prevAllTables => prevAllTables.filter(eachOldTable => eachOldTable.id !== table.id));
                    setSelectedTable(null);
                }
            }}
            onDoubleClick={e => {
                e.stopPropagation();
                setEditingTable(table);
            }}
        >
            <div className={styles.title}>{table.name}</div>
            <div className={styles.body}>
                {table.columns.map((column, i) => {
                    return (
                        <div key={i} className={styles.column}>
                            <span className={styles.columnname}>{column.name}</span>
                            <span className={styles.columntype}>{column.type}</span>
                            <span className={styles.columnmodifier}>{column.modifier}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Table;
