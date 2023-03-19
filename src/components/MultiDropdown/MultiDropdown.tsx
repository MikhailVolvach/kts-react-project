import React from "react";

import classNames from "classnames";

import MultiDropdownOptions, { MultiDropdownOptionsProps } from "./components/MultiDropdownOptions";
import styles from "./MultiDropdown.module.scss";

export type MultiDropdownProps = MultiDropdownOptionsProps & {
    disabled?: boolean;
    className?: string;
    placeholder?: string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
    options,
    value,
    onChange,
    disabled = false,
    placeholder = "Pick something",
    className,
}) => {
    const MultiDropdownClass = classNames(
        styles["multi-dropdown"],
        styles["multi-dropdown_picked"] && value,
        styles["multi-dropdown_disabled"] && disabled,
        className,
    );

    const [isVisible, setIsVisible] = React.useState<boolean>(false);

    const handleChange = React.useCallback((value: string) => {
        onChange(value);
    }, []);

    const handleClick = React.useCallback(() => {
        setIsVisible(!isVisible);
    }, [isVisible, setIsVisible]);

    return (
        <div className={MultiDropdownClass}>
            <div
                className={classNames(
                    styles["multi-dropdown__selected"],
                    !value && styles["multi-dropdown__selected_empty"],
                )}
                onClick={handleClick}
            >
                {value ? value : placeholder}
            </div>
            {isVisible && !disabled && <MultiDropdownOptions options={options} value={value} onChange={handleChange} />}
        </div>
    );
};

export default React.memo(MultiDropdown);
