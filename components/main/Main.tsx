import { FC, useContext, MouseEvent, useState } from 'react';

import { AllTablesContext } from '../contexts/allTablesContext';
import { SelectedTableContext } from '../contexts/selectedTableContext';
import { EditingTableContext } from '../contexts/editingTableContext';

import { makeColumn, makeTable, newTableSetterFactory } from '../../others/helpers';

import Table from '../table/Table';

import styles from '../../styles/main.module.css';

const Main: FC = props => {
    const [allTables, setAllTables] = useContext(AllTablesContext);
    const [selectedTable, setSelectedTable] = useContext(SelectedTableContext);
    const [editingTable, setEditingTable] = useContext(EditingTableContext);

    const [prevMouseX, setPrevMouseX] = useState(1);
    const [prevMouseY, setPrevMouseY] = useState(1);

    const selectedIndex = allTables.findIndex(eachTable => eachTable.id === selectedTable?.id);

    const setNewTable = newTableSetterFactory(setSelectedTable, setAllTables, selectedIndex);

    const onClick = (e: MouseEvent<HTMLDivElement>) => {
        if (!e.shiftKey) return;
        const newTable = makeTable('new_table', e.pageX - 5, e.pageY - 5);
        const newColumn = makeColumn('new_column', 'INT', '');
        newTable.columns.push(newColumn);

        setAllTables(prevAllTables => [...prevAllTables, newTable]);
    };

    const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (selectedTable) {
            const prevTablePos = { ...selectedTable.pos };

            const newTable = {
                ...selectedTable,
                pos: {
                    x: prevTablePos.x + (e.pageX - prevMouseX),
                    y: prevTablePos.y + (e.pageY - prevMouseY),
                },
            };

            setNewTable(newTable);
            if (newTable.id === editingTable?.id) {
                setEditingTable(newTable);
            }
        }

        setPrevMouseX(e.pageX);
        setPrevMouseY(e.pageY);
    };

    return (
        <div className={styles.main} onClick={onClick} onMouseMove={onMouseMove}>
            {allTables.map((eachTable, i) => {
                return <Table key={i} table={eachTable} />;
            })}
        </div>
    );
};

export default Main;
