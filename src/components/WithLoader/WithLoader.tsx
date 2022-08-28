import React from "react";

import Loader, { LoaderSize } from "@components/Loader";
import classNames from "classnames";

import styles from "./WithLoader.module.scss";

export type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean;
  size?: LoaderSize;
}>;

const WithLoader: React.FC<WithLoaderProps> = ({
  loading = true,
  size = LoaderSize.m,
  children,
}) => {
  const WithLoaderClass = classNames(
    styles.withloader,
    `${loading ? styles.withloader_loading : null}`
  );
  return (
    <div className={WithLoaderClass}>
      {loading && <Loader size={size} loading />}
      <div>{children}</div>
    </div>
  );
};

export default WithLoader;
