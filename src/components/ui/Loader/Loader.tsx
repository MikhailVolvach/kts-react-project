import React from "react";

import { Color } from "@configs/.";
import cn from "classnames";

import { LoaderProps } from "./config";
import s from "./Loader.module.scss";

const Loader: React.FC<LoaderProps> = ({
  loading = true,
  size = "m",
  className,
  loaderColor = Color.primaryInverted,
  disabled = false,
}) => {
  if (!loading) {
    return null;
  }

  return (
    <div
      className={cn(
        s.loader,
        loading && s.loader_loading,
        !disabled && s[`loader_color-${loaderColor}`],
        s[`loader_size-${size}`],
        disabled && s.loader_disabled,
        className
      )}
    >
      <div className={s.loader__elem}></div>
    </div>
  );
};

export default React.memo(Loader);
