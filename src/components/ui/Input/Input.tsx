import React, { ChangeEvent } from "react";

import classNames from "classnames";

import { InputProps } from "./config";
import styles from "./Input.module.scss";

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  className,
  ...rest
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  let inputClass = classNames(
    styles.input,
    rest.disabled && styles.input_disabled,
    className
  );

  return (
    <input
      className={inputClass}
      type="text"
      value={value}
      onChange={handleChange}
      {...rest}
    />
  );
};

export default React.memo(Input);
