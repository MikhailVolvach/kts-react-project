import React from "react";

import { Log } from "@utils/log";
import classNames from "classnames";

import styles from "./CardInfo.module.scss";

export type CardInfoComponentProps = {
  title: React.ReactNode;
  subtitle: object[];
  className?: string;
};

const CardInfo: React.FC<CardInfoComponentProps> = ({
  title,
  subtitle,
  className = "",
}) => {
  Log(subtitle);

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
