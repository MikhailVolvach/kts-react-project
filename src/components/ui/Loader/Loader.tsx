import React from "react";

import classNames from "classnames";

import styles from "./Loader.module.scss";

export enum LoaderSize {
  s = "s",
  m = "m",
  l = "l",
}

type LoaderProps = {
  loading?: boolean;
  size?: LoaderSize;
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({
  loading = true,
  size = "m",
  className,
}) => {
  if (!loading) {
    return null;
  }

  let loaderClass = classNames(
    styles.loader,
    `${loading ? styles["loader_loading"] : ""}`,
    `${size === LoaderSize.l ? styles["loader_size-l"] : ""}`,
    `${size === LoaderSize.m ? styles["loader_size-m"] : ""}`,
    `${size === LoaderSize.s ? styles["loader_size-s"] : ""}`,
    className
  );

  return <div className={loaderClass}></div>;
};

export default Loader;
