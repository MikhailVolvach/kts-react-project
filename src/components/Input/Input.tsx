import React, { ChangeEvent } from "react";

import classNames from "classnames";

import { InputProps } from "./";
import styles from "./Input.module.scss";

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  disabled,
  className,
  ...props
}) => {
  const inputClass = classNames(
    styles.input,
    disabled && styles.input_disabled,
    className
  );

  const [newValue, setNewValue] = React.useState<string>(value);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <input
      className={inputClass}
      onChange={handleChange}
      type="text"
      value={value || newValue}
      disabled={disabled}
      {...props}
    />
  );
};

export default React.memo(Input);
