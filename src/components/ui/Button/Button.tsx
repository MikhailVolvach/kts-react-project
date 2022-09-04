import React from "react";

import { Color } from "@configs/.";
import { ButtonProps } from "@ui/Button/config";
import Loader, { LoaderSize } from "@ui/Loader";
import cn from "classnames";

import s from "./Button.module.scss";

const Button: React.FC<ButtonProps> = ({
  loading,
  color = Color.primary,
  children,
  className,
  disabled,
  onClick,
  ...rest
}) => {
  const handleClick = React.useCallback(() => {
    onClick?.(children);
  }, [onClick]);
  return (
    <button
      {...rest}
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        s.button,
        !disabled && s[`button_color-${color}`],
        disabled && s.button_disabled,
        className
      )}
    >
      {loading && (
        <Loader
          disabled={disabled}
          loaderColor={color}
          size={LoaderSize.s}
          loading
        />
      )}
      {children}
    </button>
  );
};

export default React.memo(Button);
