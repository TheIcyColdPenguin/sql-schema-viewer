import { FC, MouseEventHandler } from 'react';

import styles from '../../styles/sidebar.module.css';

interface EditableGroupProps {
    title: string;
    addNew?: MouseEventHandler<HTMLSpanElement>;
}

const EditableGroup: FC<EditableGroupProps> = ({ title, children, addNew }) => {
    return (
        <div className={styles.container}>
            <div>
                <span className={styles.title}>{title}</span>
                {addNew && <span onClick={addNew}>+</span>}
            </div>
            {children}
        </div>
    );
};

export default EditableGroup;
