import React from "react";

import classNames from "classnames";

import MultiDropdownOptions, { MultiDropdownOptionsProps } from "./components/MultiDropdownOptions";
import styles from "./MultiDropdown.module.scss";
import useDelayUnmount from "utils/useDelayUnmount";

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
    const [isVisible, setIsVisible] = React.useState<boolean>(false);
    const show = useDelayUnmount(isVisible, 350);

    const MultiDropdownClass = classNames(
        styles["multi-dropdown"],
        value && styles["multi-dropdown_picked"],
        disabled && styles["multi-dropdown_disabled"],
        className,
    );

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
            {show && !disabled && <MultiDropdownOptions className={isVisible ? styles["multi-dropdown__options_visible"] : styles["multi-dropdown__options_invisible"]} options={options} value={value} onChange={handleChange} />}
        </div>
    );
};

export default React.memo(MultiDropdown);
