import React from "react";

import { Color } from "@configs/.";
import Loader, { LoaderSize } from "@ui/Loader";
import cn from "classnames";

import { WithLoaderProps } from "./";
import s from "./WithLoader.module.scss";

const WithLoader: React.FC<WithLoaderProps> = ({
  loading = true,
  size = LoaderSize.m,
  children,
  loaderColor = Color.primaryInverted,
}) => {
  return (
    <div className={cn(s.withloader, loading && s.withloader_loading)}>
      {loading && <Loader loaderColor={loaderColor} size={size} loading />}
      <div>{children}</div>
    </div>
  );
};

export default React.memo(WithLoader);
