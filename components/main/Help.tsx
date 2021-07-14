import { FC, useState } from 'react';

import styles from '../../styles/help.module.css';

export const HelpButton: FC = () => {
    const [helpDisplay, setHelpDisplay] = useState(false);

    return (
        <div
            onMouseOver={() => setHelpDisplay(true)}
            onMouseOut={() => setHelpDisplay(false)}
            className={styles.container}
        >
            <img src={'/help.svg'} />
            {helpDisplay && <div className={styles.popup}>
                <ul>
                    <li>New Table - Shift + Click</li>
                    <li>Delete Table - Shift + Right click</li>
                    <li>Edit Table - Double click</li>
                </ul>
                </div>}
        </div>
    );
};
