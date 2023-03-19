import React from "react";

import classNames from "classnames";

import styles from "./CardInfo.module.scss";

export type CardInfoComponentProps = {
    title: React.ReactNode;
    subtitle: Array<string>;
    className?: string;
};

const CardInfo: React.FC<CardInfoComponentProps> = ({ title, subtitle, className = "" }) => {
    const subtitleJoined = subtitle.join(" + ");

    return (
        <div className={classNames(styles.card__info, className)}>
            <div className={styles.card__title}>{title}</div>
            <div className={styles.card__subtitle}>{subtitleJoined}</div>
        </div>
    );
};

export default React.memo(CardInfo);
