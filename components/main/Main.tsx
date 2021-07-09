import { FC, useContext, MouseEvent, useState } from 'react';

import { AllTablesContext } from '../contexts/allTablesContext';
import { SelectedTableContext } from '../contexts/selectedTableContext';
import { makeColumn, makeTable } from '../../others/helpers';

import Table from '../table/Table';

import styles from '../../styles/main.module.css';

const Main: FC = props => {
    const [allTables, setAllTables] = useContext(AllTablesContext);
    const [selectedTable, setSelectedTable] = useContext(SelectedTableContext);

    const [prevMouseX, setPrevMouseX] = useState(1);
    const [prevMouseY, setPrevMouseY] = useState(1);

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
            // make sure values aren't 0
            if (prevTablePos.x && prevTablePos.y) {
                const elementToChangeIndex = allTables.findIndex(singleTable => singleTable.id === selectedTable.id);

                const updatedTable = {
                    ...selectedTable,
                    pos: {
                        x: prevTablePos.x + (e.pageX - prevMouseX),
                        y: prevTablePos.y + (e.pageY - prevMouseY),
                    },
                };

                setAllTables([
                    ...allTables.slice(0, elementToChangeIndex),
                    ...allTables.slice(elementToChangeIndex + 1),
                    updatedTable,
                ]);

                setSelectedTable(updatedTable);
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
