import { FC, ChangeEvent, MouseEventHandler } from 'react';

import styles from '../../styles/sidebar.module.css';

interface OrdinaryEditableProps {
    subtitle: string;
    onDelete?: MouseEventHandler<HTMLSpanElement>;

    inputs: { value: string; placeholder?: string; onInput: (e: ChangeEvent<HTMLInputElement>) => void }[];
}

export const OrdinaryEditable: FC<OrdinaryEditableProps> = ({ subtitle, inputs, onDelete }) => {
    return (
        <div className={styles.editablecontainer}>
            <div>
                {onDelete && <span onClick={onDelete}>x</span>}
                <span>{subtitle}</span>
            </div>
            {inputs.map((eachInput, i) => {
                return (
                    <input
                        key={i}
                        value={eachInput.value}
                        placeholder={eachInput.placeholder || 'Enter a value'}
                        onInput={eachInput.onInput}
                    />
                );
            })}
        </div>
    );
};
