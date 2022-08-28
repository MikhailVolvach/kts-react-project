import React, { ChangeEvent } from "react";

import classNames from "classnames";

import styles from "./Input.module.scss";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  className,
  ...rest
}) => {
  const [inputValue, setValue] = React.useState<string>(value);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  let inputClass = classNames(
    styles.input,
    `${rest.disabled ? styles.input_disabled : ""}`,
    className
  );

  return (
    <input
      className={inputClass}
      type="text"
      value={value || inputValue}
      onChange={handleChange}
      {...rest}
    />
  );
};

export default Input;
