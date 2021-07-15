import { ChangeEvent, FC, useContext } from 'react';

import { AllTablesContext } from '../contexts/allTablesContext';
import { EditingTableContext } from '../contexts/editingTableContext';

import { EditableGroup } from './EditableContainer';
import { OrdinaryEditable } from './Editable';
import { ColumnEdit } from './ColumnEdit';

import { SQLTable } from '../../others/constants';
import { setNewTable } from '../../others/helpers';

import styles from '../../styles/sidebar.module.css';

type onInputType<T = HTMLInputElement> = ChangeEvent<T>;

const Sidebar: FC = () => {
    const [allTables, setAllTables] = useContext(AllTablesContext);
    const [editingTable] = useContext(EditingTableContext);

    const onColumnDelete = (i: number) => {
        if (editingTable === null) return;

        const newTable: SQLTable = { ...allTables[editingTable] };
        newTable.columns.splice(i, 1);

        setNewTable(setAllTables, newTable);
    };

    if (editingTable === null) {
        return (
            <div className={styles.sidebar}>
                <div className={styles.heading}>SQL Database Schema Modeller</div>
            </div>
        );
    }

    return (
        <div className={styles.sidebar}>
            <div className={styles.heading}>SQL Database Schema Modeller</div>
            <div>
                <EditableGroup title="Edit Table">
                    <OrdinaryEditable
                        subtitle="Name"
                        inputs={[
                            {
                                placeholder: 'Enter a table name',
                                value: allTables[editingTable].name,
                                inputType: 'text',
                                onInput: (e: onInputType) => {
                                    const newTable: SQLTable = { ...allTables[editingTable], name: e.target.value };
                                    setNewTable(setAllTables, newTable);
                                },
                            },
                        ]}
                    />
                </EditableGroup>
                <ColumnEdit onColumnDelete={onColumnDelete} />

                <EditableGroup title="Edit Relations">
                    {allTables[editingTable].columns
                        .map((column, i) => {
                            if (column.modifier !== 'FOREIGN') return null;
                            return (
                                <OrdinaryEditable
                                    key={i}
                                    subtitle={column.name}
                                    inputs={[
                                        {
                                            placeholder: 'Enter table referred to',
                                            value: allTables[column.reference!]?.name || allTables[0]?.name || '',
                                            inputType: 'select',
                                            selectOptions: allTables.map(table => table.name),
                                            onInput: (e: onInputType<HTMLSelectElement>) => {
                                                const newTable = { ...allTables[editingTable] };
                                                newTable.columns[i].reference = allTables.findIndex(
                                                    table => table.name === e.target.value
                                                );

                                                setNewTable(setAllTables, newTable);
                                            },
                                        },
                                    ]}
                                />
                            );
                        })
                        .filter(editables => editables)}
                </EditableGroup>
            </div>
        </div>
    );
};

export default Sidebar;
