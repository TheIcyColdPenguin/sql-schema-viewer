import { FC, useContext } from 'react';

import styles from '../../styles/sidebar.module.css';
import { AllTablesContext } from '../contexts/allTablesContext';
import { EditingTableContext } from '../contexts/editingTableContext';

import EditableGroup from './EditableContainer';
import { OrdinaryEditable } from './Editable';
import { SQLTable } from '../../others/constants';
import { makeColumn , newTableSetterFactory} from '../../others/helpers';

const Sidebar: FC = () => {
    const [allTables, setAllTables] = useContext(AllTablesContext);
    const [editingTable, setEditingTable] = useContext(EditingTableContext);

    const tableIndex = allTables.findIndex(eachTable => eachTable.id == editingTable?.id);

    const setNewTable = newTableSetterFactory(setEditingTable, setAllTables, tableIndex);

    const onColumnDelete = (i: number) => {
        if (!editingTable) return;

        const newTable: SQLTable = { ...editingTable };

        newTable.columns.splice(i, 1);

        setNewTable(newTable);
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
                                        setNewTable(newTable);
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

                            setNewTable(newTable);
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

                                                setNewTable(newTable);
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

                                                setNewTable(newTable);
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

                                                setNewTable(newTable);
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
