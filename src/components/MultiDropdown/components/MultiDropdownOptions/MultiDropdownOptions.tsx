import React from "react";

import styles from "./MultiDropdownOptions.module.scss";
import MultiDropdownOption from "../MultiDropdownOption";
import classNames from "classnames";

export type MultiDropdownOptionsProps = {
    onChange: (value: string) => void;
    options: string[];
    value: string;
    className?: string;
};

const MultiDropdownOptions: React.FC<MultiDropdownOptionsProps> = ({ options, value, onChange, className= ""}) => {
    return (
        <div className={classNames(styles["multi-dropdown__options"], className)}>
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
