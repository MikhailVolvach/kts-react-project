import React from "react";

import classNames from "classnames";
import { LoaderSize } from "components/Loader/config";

import styles from "./Loader.module.scss";

export type LoaderProps = {
    loading?: boolean;
    size?: LoaderSize;
    className?: string;
};

const Loader: React.FC<LoaderProps> = ({ loading = true, size = "m", className="" }) => {
    if (!loading) {
        return null;
    }

    const loaderCircleClass = classNames(
        styles.loader__circle,
        loading && styles["loader__circle--loading"],
        styles[`loader__circle_size-${size}`],
    );

    return (
        <div className={classNames(styles.loader, className)}>
            <div className={loaderCircleClass}></div>
        </div>
    );
};

export default React.memo(Loader);
