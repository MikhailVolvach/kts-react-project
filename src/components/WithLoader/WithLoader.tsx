import React from "react";

import classNames from "classnames";
import Loader from "components/Loader";

import styles from "./WithLoader.module.scss";

export type WithLoaderProps = React.PropsWithChildren<{
    loading: boolean;
    className?: string;
}>;

const WithLoader: React.FC<WithLoaderProps> = ({ loading = true, className = "", children }) => {
    return (
        <div className={classNames(styles["with-loader"], className)}>
            {loading && <Loader className={styles["with-loader__loader"]} />}
            {!loading && children}
        </div>
    );
};

export default React.memo(WithLoader);
