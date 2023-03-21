import React from "react";

import classNames from "classnames";

import styles from "./CheckBox.module.scss";

export type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
    disabled?: boolean;
    checked?: boolean;
    onChange: (value: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({ onChange, disabled = false, checked = false, ...props }) => {
    const handleChange = React.useCallback(() => {
        if (disabled) {
            return;
        }
        onChange(!checked);
    }, [disabled, onChange]);

    return (
        <label className={classNames(styles.checkbox, disabled && styles.checkbox_disabled)} onClick={handleChange}>
            <input
                className={styles.checkbox__input}
                disabled={disabled}
                checked={checked}
                onChange={handleChange}
                type="checkbox"
                {...props}
            />
            <span className={styles.checkbox__box}>
                <span className={styles.checkbox__flag}></span>
            </span>
        </label>
    );
};

export default React.memo(CheckBox);
