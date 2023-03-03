import React, { ChangeEvent } from "react";

import classNames from "classnames";

import styles from "./Input.module.scss";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
};

const Input: React.FC<InputProps> = ({
  value = "",
  onChange,
  disabled,
  className,
  ...props
}) => {
  const [inputValue, setInputValue] = React.useState(value);

  const inputClass = classNames(
    styles.input,
    disabled && styles.input_disabled,
    className
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <input
      className={inputClass}
      onChange={handleChange}
      type="text"
      value={inputValue}
      disabled={disabled}
      {...props}
    />
  );
};

export default React.memo(Input);
