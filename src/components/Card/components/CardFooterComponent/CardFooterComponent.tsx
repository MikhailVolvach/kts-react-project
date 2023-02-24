import React from "react";

import Button from "@components/Button";
import classNames from "classnames";

import { CardFooterComponentProps } from "./";
import styles from "./CardFooterComponent.module.scss";

const CardFooterComponent: React.FC<CardFooterComponentProps> = ({
  content,
  className = "",
}) => {
  return (
    <div className={classNames(styles.card__footer, className)}>
      {content && (
        <div className={styles.card__content}>
          {content.amount} {content.unit}
        </div>
      )}
      <Button className={styles["card__add-button"]}>
        <span></span>
        <span></span>
      </Button>
    </div>
  );
};

export default React.memo(CardFooterComponent);
