import React from "react";

import Loader from "@components/Loader";
import { LoaderSize } from "@components/Loader";
import classNames from "classnames";

import { ButtonProps } from "./";
import styles from "./Button.module.scss";
const Button: React.FC<ButtonProps> = ({
  loading = false,
  children,
  onClick,
  onMouseOver,
  disabled = false,
  className = "",
  ...ButtonProps
}) => {
  if (loading) {
    disabled = true;
  }
  const buttonClass = classNames(
    styles.button,
    disabled && styles.button_disabled,
    className
  );
  return (
    <button
      className={buttonClass}
      onClick={onClick}
      onMouseOver={onMouseOver}
      disabled={disabled}
      {...ButtonProps}
    >
      {loading && <Loader loading={loading} size={LoaderSize.s} />}
      {children}
    </button>
  );
};

export default React.memo(Button);
