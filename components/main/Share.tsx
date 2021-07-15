import { FC, useContext, useEffect, useRef, useState } from 'react';

import { AllTablesContext } from '../contexts/allTablesContext';

import { asyncSleep } from '../../others/helpers';

import styles from '../../styles/share.module.css';

export const ShareButton: FC = () => {
    const [clicked, setClicked] = useState(false);
    const [allTables] = useContext(AllTablesContext);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!clicked) return;

        const urlQuery = encodeURIComponent(btoa(JSON.stringify(allTables)));
        navigator.clipboard
            .writeText(window.location.href + '?data=' + urlQuery)
            .then(() => asyncSleep(3000))
            .then(() => {
                if (ref.current) {
                    ref.current.className = styles.popup + ' ' + styles.fadeout;
                }
                return asyncSleep(1000);
            })
            .then(() => setClicked(false));
    }, [clicked]);

    return (
        <div
            onClick={() => {
                setClicked(true);
            }}
            className={styles.container}
        >
            <img src={'share.svg'} />
            {clicked && (
                <div ref={ref} className={styles.popup}>
                    URL Copied to clipboard!
                </div>
            )}
        </div>
    );
};
