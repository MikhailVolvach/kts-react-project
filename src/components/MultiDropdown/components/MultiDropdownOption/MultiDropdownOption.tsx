import React from "react";

import classNames from "classnames";

import styles from "./MultiDropdownOption.module.scss";

export type MultiDropdownOptionProps = {
    value: string;
    onChange?: (option: string) => void;
    isSelected: boolean;
};

const MultiDropdownOption: React.FC<MultiDropdownOptionProps> = ({ value, onChange, isSelected }) => {
    const handleClick = React.useCallback(() => {
        if (!onChange) {
            return;
        }
        onChange(value);
    }, [onChange]);

    return (
        <div
            className={classNames(
                styles["multi-dropdown__option"],
                isSelected && styles["multi-dropdown__option_selected"],
            )}
            onClick={handleClick}
        >
            {value}
        </div>
    );
};

export default React.memo(MultiDropdownOption);
