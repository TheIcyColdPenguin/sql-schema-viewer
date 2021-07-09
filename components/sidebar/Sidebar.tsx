import { FC, useContext } from 'react';

import styles from '../../styles/sidebar.module.css';
import { AllTablesContext } from '../contexts/allTablesContext';
import { EditingTableContext } from '../contexts/editingTableContext';

import EditableGroup from './EditableContainer';
import { OrdinaryEditable } from './Editable';
import { SQLTable } from '../../others/constants';
import { makeColumn } from '../../others/helpers';

const Sidebar: FC = () => {
    const [allTables, setAllTables] = useContext(AllTablesContext);
    const [editingTable, setEditingTable] = useContext(EditingTableContext);

    const tableIndex = allTables.findIndex(eachTable => eachTable.id == editingTable?.id);
    const onColumnDelete = (i: number) => {
        if (!editingTable) return;

        const newTable: SQLTable = { ...editingTable };

        newTable.columns.splice(i, 1);

        setEditingTable(newTable);
        setAllTables([...allTables.slice(0, tableIndex), ...allTables.slice(tableIndex + 1), newTable]);
    };

    return (
        <div className={styles.sidebar}>
            <div className={styles.heading}>SQL Database Schema Modeller</div>

            {editingTable && (
                <div>
                    <EditableGroup title="Edit Table">
                        <OrdinaryEditable
                            subtitle="Name"
                            inputs={[
                                {
                                    placeholder: 'Enter a table name',
                                    value: editingTable.name,
                                    onInput: e => {
                                        const newTable: SQLTable = { ...editingTable, name: e.target.value };

                                        setEditingTable(newTable);
                                        setAllTables([
                                            ...allTables.slice(0, tableIndex),
                                            ...allTables.slice(tableIndex + 1),
                                            newTable,
                                        ]);
                                    },
                                },
                            ]}
                        />
                    </EditableGroup>
                    <EditableGroup
                        title="Edit Columns"
                        addNew={() => {
                            const newTable: SQLTable = { ...editingTable };
                            newTable.columns.push(makeColumn('new_column', 'INT', ''));

                            setEditingTable(newTable);
                            setAllTables([
                                ...allTables.slice(0, tableIndex),
                                ...allTables.slice(tableIndex + 1),
                                newTable,
                            ]);
                        }}
                    >
                        {editingTable.columns.map((eachColumn, i) => {
                            return (
                                <OrdinaryEditable
                                    onDelete={() => onColumnDelete(i)}
                                    key={i}
                                    subtitle={'Column ' + (i + 1)}
                                    inputs={[
                                        {
                                            placeholder: 'Enter a column name',
                                            value: editingTable.columns[i].name,
                                            onInput: e => {
                                                const newTable: SQLTable = { ...editingTable };
                                                newTable.columns[i].name = e.target.value;

                                                setEditingTable(newTable);
                                                setAllTables([
                                                    ...allTables.slice(0, tableIndex),
                                                    ...allTables.slice(tableIndex + 1),
                                                    newTable,
                                                ]);
                                            },
                                        },
                                        {
                                            placeholder: 'Enter a column type',
                                            value: editingTable.columns[i].type,
                                            onInput: e => {
                                                const newTable: SQLTable = { ...editingTable };
                                                // HACK
                                                // @ts-ignore
                                                newTable.columns[i].type = e.target.value;

                                                setEditingTable(newTable);
                                                setAllTables([
                                                    ...allTables.slice(0, tableIndex),
                                                    ...allTables.slice(tableIndex + 1),
                                                    newTable,
                                                ]);
                                            },
                                        },
                                        {
                                            placeholder: 'Enter an optional column modifier',
                                            value: editingTable.columns[i].modifier,
                                            onInput: e => {
                                                const newTable: SQLTable = { ...editingTable };
                                                // HACK
                                                // @ts-ignore
                                                newTable.columns[i].modifier = e.target.value.toUpperCase();

                                                setEditingTable(newTable);
                                                setAllTables([
                                                    ...allTables.slice(0, tableIndex),
                                                    ...allTables.slice(tableIndex + 1),
                                                    newTable,
                                                ]);
                                            },
                                        },
                                    ]}
                                />
                            );
                        })}
                    </EditableGroup>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
