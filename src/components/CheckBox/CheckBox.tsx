import React from "react";

import classNames from "classnames";

import { CheckBoxProps } from "./";
import styles from "./CheckBox.module.scss";

const CheckBox: React.FC<CheckBoxProps> = ({
  onChange,
  disabled = false,
  checked = false,
  text = "",
  ...props
}) => {
  if (disabled === undefined) {
    disabled = false;
  }
  if (checked === undefined) {
    checked = false;
  }

  const [status, setStatus] = React.useState(checked);

  const handleChange = () => {
    if (disabled) {
      return;
    }
    setStatus(!status);
    onChange(!status);
  };

  return (
    <label
      className={classNames(
        styles.checkbox,
        disabled && styles.checkbox_disabled
      )}
      onClick={handleChange}
    >
      <input
        className={styles.checkbox__input}
        disabled={disabled || false}
        checked={status}
        onChange={handleChange}
        type="checkbox"
        {...props}
      />
      <span className={styles.checkbox__box}>
        <span></span>
      </span>
      {/*{text}*/}
    </label>
  );
};

export default React.memo(CheckBox);
