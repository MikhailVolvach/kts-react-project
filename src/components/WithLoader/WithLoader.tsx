import React from "react";

import Loader from "@components/Loader";
import classNames from "classnames";

import styles from "./WithLoader.module.scss";

export type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean;
  className?: string;
}>;

const WithLoader: React.FC<WithLoaderProps> = ({
  loading = true,
  className = "",
  children,
}) => {
  return (
    <div className={classNames(styles["with-loader"], className)}>
      {loading && <Loader className={styles["with-loader__loader"]} />}
      {!loading && children}
    </div>
  );
};

export default React.memo(WithLoader);
