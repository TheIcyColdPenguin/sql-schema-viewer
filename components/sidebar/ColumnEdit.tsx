import { FC, ChangeEvent, useContext } from 'react';

import { AllTablesContext } from '../contexts/allTablesContext';
import { EditingTableContext } from '../contexts/editingTableContext';

import EditableGroup from './EditableContainer';
import { OrdinaryEditable } from './Editable';

import { SQLKeyModifier, SQLKeyModifierArray, SQLTable } from '../../others/constants';
import { makeColumn, setNewTable } from '../../others/helpers';

interface ColumnEditProps {
    onColumnDelete: (i: number) => void;
}

type onInputType<T = HTMLInputElement> = ChangeEvent<T>;

export const ColumnEdit: FC<ColumnEditProps> = ({ onColumnDelete }) => {
    const [editingTable] = useContext(EditingTableContext);
    const [allTables, setAllTables] = useContext(AllTablesContext);

    return (
        <EditableGroup
            title="Edit Columns"
            addNew={() => {
                if (editingTable === null) return;

                const newTable: SQLTable = { ...allTables[editingTable] };
                newTable.columns.push(makeColumn('new_column', 'INT', ''));

                setNewTable(setAllTables, newTable);
            }}
        >
            {editingTable !== null &&
                allTables[editingTable].columns.map((eachColumn, i) => {
                    return (
                        <OrdinaryEditable
                            onDelete={() => onColumnDelete(i)}
                            key={i}
                            subtitle={'Column ' + (i + 1)}
                            inputs={[
                                {
                                    placeholder: 'Enter a column name',
                                    inputType: 'text',
                                    value: eachColumn.name,
                                    onInput: (e: onInputType) => {
                                        const newTable: SQLTable = { ...allTables[editingTable] };
                                        newTable.columns[i].name = e.target.value;

                                        setNewTable(setAllTables, newTable);
                                    },
                                },
                                {
                                    placeholder: 'Enter a column type',
                                    inputType: 'text',
                                    value: eachColumn.type,
                                    onInput: (e: onInputType) => {
                                        const newTable: SQLTable = { ...allTables[editingTable] };
                                        // HACK
                                        // @ts-ignore
                                        newTable.columns[i].type = e.target.value;

                                        setNewTable(setAllTables, newTable);
                                    },
                                },
                                {
                                    placeholder: 'Enter an optional column modifier',
                                    value: eachColumn.modifier,
                                    inputType: 'select',
                                    selectOptions: SQLKeyModifierArray,
                                    onInput: (e: onInputType<HTMLSelectElement>) => {
                                        const newTable: SQLTable = { ...allTables[editingTable] };

                                        // safe to typecast because it's guaranteed to be valid
                                        const enteredText = e.target.value.toUpperCase() as SQLKeyModifier;

                                        newTable.columns[i].modifier = enteredText;

                                        setNewTable(setAllTables, newTable);
                                    },
                                },
                            ]}
                        />
                    );
                })}
        </EditableGroup>
    );
};

export default ColumnEdit;
