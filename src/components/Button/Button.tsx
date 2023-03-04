import React from "react";

import Loader from "@components/Loader";
import { LoaderSize } from "@components/Loader";
import classNames from "classnames";

import styles from "./Button.module.scss";

export type ButtonProps = React.PropsWithChildren<{
  loading?: boolean;
  className?: string;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  loading = false,
  children,
  onClick,
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
      disabled={disabled}
      {...ButtonProps}
    >
      {loading && <Loader loading={loading} size={LoaderSize.s} />}
      {children}
    </button>
  );
};

export default React.memo(Button);
