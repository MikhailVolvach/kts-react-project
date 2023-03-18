import React, { ChangeEvent } from "react";

import classNames from "classnames";

import styles from "./Input.module.scss";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const Input: React.FC<InputProps> = ({
  value = "",
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

  const handleChange = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e);
    },
    [onChange]
  );

  return (
    <input
      className={inputClass}
      onChange={handleChange}
      type="text"
      value={value}
      disabled={disabled}
      {...props}
    />
  );
};

export default React.memo(Input);
