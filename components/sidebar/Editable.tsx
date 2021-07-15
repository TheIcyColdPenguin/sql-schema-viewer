import { FC, ChangeEvent, MouseEventHandler } from 'react';
import { availableCharacters } from '../../others/helpers';

import styles from '../../styles/sidebar.module.css';

interface OrdinaryEditableProps {
    subtitle: string;
    inputs: {
        inputType: 'text' | 'select';
        selectOptions?: readonly string[];
        value: string;
        placeholder?: string;
        onInput: (e: ChangeEvent<any>) => void;
    }[];
    onDelete?: MouseEventHandler<HTMLSpanElement>;
}

export const OrdinaryEditable: FC<OrdinaryEditableProps> = ({ subtitle, inputs, onDelete }) => {
    return (
        <div className={styles.editablecontainer}>
            <div>
                {onDelete && <span onClick={onDelete}>x</span>}
                <span>{subtitle}</span>
            </div>
            {inputs.map((eachInput, i) => {
                return eachInput.inputType === 'text' ? (
                    <input
                        key={i}
                        value={eachInput.value}
                        placeholder={eachInput.placeholder || 'Enter a value'}
                        onInput={(e: ChangeEvent<HTMLInputElement>) => {
                            if (
                                (e.nativeEvent as any).data === null ||
                                availableCharacters.split('').includes((e.nativeEvent as any).data)
                            ) {
                                (eachInput.onInput as (e: ChangeEvent<HTMLInputElement>) => void)(e);
                            }
                        }}
                    />
                ) : (
                    <select
                        key={i}
                        value={eachInput.value}
                        placeholder={eachInput.placeholder || 'Choose a values'}
                        onInput={eachInput.onInput as (e: ChangeEvent<HTMLSelectElement>) => void}
                    >
                        {eachInput.selectOptions?.map((eachOtion, j) => <option key={j}>{eachOtion}</option>) || []}
                    </select>
                );
            })}
        </div>
    );
};
