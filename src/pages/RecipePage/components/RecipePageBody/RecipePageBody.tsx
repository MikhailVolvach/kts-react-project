import React from "react";

import ClockIcon from "svg/Clock.svg";
import HeartIcon from "svg/Heart.svg";

import styles from "./RecipePageBody.module.scss";

export type RecipePageBodyProps = {
    title?: string;
    readyInMinutes?: number;
    aggregateLikes?: number;
    summary?: string;
};

const RecipePageBody: React.FC<RecipePageBodyProps> = ({
    title = "",
    readyInMinutes = 0,
    aggregateLikes = 0,
    summary = "",
}) => {
    return (
        <div className={styles.recipe__body}>
            <h1 className={styles.recipe__title}>{title}</h1>
            <div className={styles.recipe__info}>
                <div className={styles.recipe__time}>
                    <img className={styles.recipe__icon} src={ClockIcon} alt="" /> {readyInMinutes} minutes
                </div>
                <div className={styles.recipe__rating}>
                    <img className={styles.recipe__icon} src={HeartIcon} alt="" /> {aggregateLikes} like
                    {aggregateLikes === 1 ? "" : "s"}
                </div>
            </div>
            <div className={styles.recipe__description}>
                <ul className={styles["recipe__summary"]}>
                    <div dangerouslySetInnerHTML={{ __html: summary }} />
                </ul>
            </div>
        </div>
    );
};

export default React.memo(RecipePageBody);
