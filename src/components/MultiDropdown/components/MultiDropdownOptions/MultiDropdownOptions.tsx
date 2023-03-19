import React from "react";

import styles from "./MultiDropdownOptions.module.scss";
import MultiDropdownOption from "../MultiDropdownOption";

export type MultiDropdownOptionsProps = {
    onChange: (value: string) => void;
    options: string[];
    value: string;
};

const MultiDropdownOptions: React.FC<MultiDropdownOptionsProps> = ({ options, value, onChange }) => {
    return (
        <div className={styles["multi-dropdown__options"]}>
            {options.map((option) => {
                const selected = value.includes(option);
                const handleClick = React.useCallback((option: string) => {
                    onChange(option);
                }, []);
                return <MultiDropdownOption key={option} value={option} onChange={handleClick} isSelected={selected} />;
            })}
        </div>
    );
};

export default React.memo(MultiDropdownOptions);
