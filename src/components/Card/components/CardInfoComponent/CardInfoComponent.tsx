import React from "react";

import classNames from "classnames";

import { CardInfoComponentProps } from "./";
import styles from "./CardInfoComponent.module.scss";

const CardInfoComponent: React.FC<CardInfoComponentProps> = ({
  title,
  subtitle,
  className = "",
}) => {
  const ingredientsFlag = subtitle.length > 3;

  return (
    <div className={classNames(styles.card__info, className)}>
      <div className={styles.card__title}>{title}</div>
      <div className={styles.card__subtitle}>
        {subtitle.slice(0, 3).join(" + ")}
        {ingredientsFlag && " + more"}
      </div>
    </div>
  );
};

export default React.memo(CardInfoComponent);
