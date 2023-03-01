import React from "react";

import Button from "@components/Button";
import classNames from "classnames";

import styles from "./CardFooter.module.scss";

export type CardFooterComponentProps = {
  caloriesAmount?: number;
  caloriesUnit?: string;
  className?: string;
};

const CardFooter: React.FC<CardFooterComponentProps> = ({
  caloriesAmount,
  caloriesUnit,
  className,
}) => {
  return (
    <div className={classNames(styles.card__footer, className)}>
      {caloriesAmount && caloriesUnit && (
        <div className={styles.card__content}>
          {caloriesAmount} {caloriesUnit}
        </div>
      )}
      <Button className={styles["card__add-button"]}>
        <span></span>
        <span></span>
      </Button>
    </div>
  );
};

export default React.memo(CardFooter);
