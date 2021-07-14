import { FC, useContext, MouseEvent, useState, useRef, useEffect } from 'react';

import { AllTablesContext } from '../contexts/allTablesContext';
import { SelectedTableContext } from '../contexts/selectedTableContext';

import { convertRemToPixels, makeColumn, makeTable, setNewTable } from '../../others/helpers';

import Table from '../table/Table';

import styles from '../../styles/main.module.css';

const Main: FC = () => {
    const [allTables, setAllTables] = useContext(AllTablesContext);
    const [selectedTable] = useContext(SelectedTableContext);

    const [prevMouseX, setPrevMouseX] = useState(1);
    const [prevMouseY, setPrevMouseY] = useState(1);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);

    const [canvasWidth, setCanvasWidth] = useState(0);
    const [canvasHeight, setCanvasHeight] = useState(0);

    const canvasContext = canvasRef.current?.getContext('2d');

    useEffect(() => {
        const updateCanvasSize = () => {
            setCanvasWidth(mainRef.current?.clientWidth || 0);
            setCanvasHeight(mainRef.current?.clientHeight || 0);

            draw();
        };

        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);

        return () => window.removeEventListener('resize', updateCanvasSize);
    });

    useEffect(() => {
        if (!canvasContext) return;

        draw();
    }, [allTables]);

    const draw = () => {
        if (!canvasContext) return;
        canvasContext.clearRect(0, 0, canvasRef.current?.width || 0, canvasRef.current?.height || 0);

        canvasContext.beginPath();
        canvasContext.strokeStyle = 'rgb(170, 170, 170)';
        canvasContext.lineWidth = 3;

        const initialOffset = convertRemToPixels(1);
        const divSize = convertRemToPixels(2.75);

        allTables.forEach(eachTable => {
            eachTable.columns.forEach((eachColumn, i) => {
                if (eachColumn.reference !== null) {
                    const referredTablePos = allTables[eachColumn.reference].pos;

                    const x1 = referredTablePos.x + 2 * initialOffset;
                    const y1 = referredTablePos.y + initialOffset;
                    const x2 = eachTable.pos.x + 2 * initialOffset;
                    const y2 = eachTable.pos.y + initialOffset + (i + 1) * divSize;

                    canvasContext.moveTo(x1, y1);
                    canvasContext.quadraticCurveTo(((x1 + x2) / 2) * 1.2, ((y1 + y2) / 2) * 0.99, x2, y2);
                }
            });
        });

        canvasContext.stroke();
    };

    const onClick = (e: MouseEvent<HTMLDivElement>) => {
        if (!e.shiftKey) return;
        const newTable = makeTable('new_table', e.pageX - 5, e.pageY - 5);
        const newColumn = makeColumn('new_column', 'INT', '');
        newTable.columns.push(newColumn);

        setAllTables(prevAllTables => [...prevAllTables, newTable]);
    };

    const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (selectedTable !== null) {
            const prevTablePos = { ...allTables[selectedTable].pos };

            const newTable = {
                ...allTables[selectedTable],
                pos: {
                    x: prevTablePos.x + (e.pageX - prevMouseX),
                    y: prevTablePos.y + (e.pageY - prevMouseY),
                },
            };

            setNewTable(setAllTables, newTable);
        }

        setPrevMouseX(e.pageX);
        setPrevMouseY(e.pageY);
    };

    return (
        <div ref={mainRef} className={styles.main} onClick={onClick} onMouseMove={onMouseMove}>
            <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight}></canvas>
            {allTables.map((eachTable, i) => {
                return <Table key={i} table={eachTable} index={i} />;
            })}
        </div>
    );
};

export default Main;
