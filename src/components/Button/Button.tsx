import React from "react";

import Loader, { LoaderSize } from "@components/Loader";
import classNames from "classnames";

import styles from "./Button.module.scss";

export enum ButtonColor {
  primary = "primary",
  secondary = "secondary",
}

export type ButtonProps = React.PropsWithChildren<{
  loading?: boolean;
  color?: ButtonColor;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  loading,
  color = ButtonColor.primary,
  children,
  onClick,
  onMouseOver,
  className,
  disabled = "",
  ...rest
}) => {
  if (loading) disabled = true;
  const buttonClass = classNames(
    styles.button,
    `${color === ButtonColor.primary ? styles["button_color-primary"] : ""}`,
    `${
      color === ButtonColor.secondary ? styles["button_color-secondary"] : ""
    }`,
    `${disabled ? styles.button_disabled : ""}`,
    className
  );

  return (
    <button
      {...rest}
      onClick={() => {}}
      onMouseOver={onMouseOver}
      className={buttonClass}
    >
      {loading && <Loader size={LoaderSize.s} loading />}
      {children}
    </button>
  );
};

export default Button;
