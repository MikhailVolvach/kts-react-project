import React from "react";

import { CardImageComponentProps } from "./";
import styles from "./CardImageComponent.module.scss";

const CardImageComponent: React.FC<CardImageComponentProps> = ({
  src,
  ...props
}) => {
  return (
    <div className={styles.card__image}>
      <img src={src} {...props} alt="img" />
    </div>
  );
};

export default React.memo(CardImageComponent);
