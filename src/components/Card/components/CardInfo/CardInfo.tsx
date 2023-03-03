import React from "react";

import classNames from "classnames";

import styles from "./CardInfo.module.scss";

export type CardInfoComponentProps = {
  title: React.ReactNode;
  subtitle: Array<string>;
  className?: string;
};

const CardInfo: React.FC<CardInfoComponentProps> = ({
  title,
  subtitle,
  className = "",
}) => {
  const ingredientsFlag = subtitle.length > 3;
  const subtitleSliced = subtitle.slice(0, 3).join(" + ");

  return (
    <div className={classNames(styles.card__info, className)}>
      <div className={styles.card__title}>{title}</div>
      <div className={styles.card__subtitle}>
        {subtitleSliced}
        {ingredientsFlag && " + more"}
      </div>
    </div>
  );
};

export default React.memo(CardInfo);
