import { CSSProperties, FC, useContext } from 'react';

import { AllTablesContext } from '../contexts/allTablesContext';
import { SelectedTableContext } from '../contexts/selectedTableContext';
import { EditingTableContext } from '../contexts/editingTableContext';

import { SQLTable } from '../../others/constants';
import { findIndex } from '../../others/helpers';

import styles from '../../styles/table.module.css';

const Table: FC<{ table: SQLTable; index: number }> = ({ table, index }) => {
    const [selectedTable, setSelectedTable] = useContext(SelectedTableContext);
    const [, setEditingTable] = useContext(EditingTableContext);
    const [allTables, setAllTables] = useContext(AllTablesContext);

    const style: CSSProperties = { left: table.pos.x, top: table.pos.y };

    if (selectedTable !== null && allTables[selectedTable]?.id === table.id) {
        style.transform = 'scale(1.05)';
        style.filter = 'brightness(1.05)';
    }

    return (
        <div
            style={style}
            className={styles.table}
            onClick={e => e.stopPropagation()}
            onMouseDown={e => {
                e.stopPropagation();
                setSelectedTable(index);
            }}
            onMouseUp={() => {
                if (selectedTable !== null) {
                    if (allTables[selectedTable]?.id === table.id) setSelectedTable(null);
                }
            }}
            onContextMenu={e => {
                e.preventDefault();
                if (e.shiftKey) {
                    setAllTables(prevAllTables => {
                        const tableIndex = findIndex(prevAllTables, table);

                        return prevAllTables
                            .filter(eachOldTable => eachOldTable.id !== table.id)
                            .map(eachOldTable => {
                                return {
                                    ...eachOldTable, // same old tables
                                    columns: eachOldTable.columns.map(eachOldColumn => ({
                                        ...eachOldColumn, // same old columns
                                        // only updating reference and modifier
                                        reference:
                                            eachOldColumn.reference === tableIndex ? null : eachOldColumn.reference,
                                        modifier: eachOldColumn.reference === tableIndex ? '' : eachOldColumn.modifier,
                                    })),
                                };
                            });
                    });

                    setSelectedTable(null);
                    setEditingTable(null);
                }
            }}
            onDoubleClick={e => {
                e.stopPropagation();
                setEditingTable(findIndex(allTables, table));
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
