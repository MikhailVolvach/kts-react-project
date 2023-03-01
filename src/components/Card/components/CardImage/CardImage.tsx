import React from "react";

import styles from "./CardImage.module.scss";

export type CardImageComponentProps = {
  src: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

const CardImage: React.FC<CardImageComponentProps> = ({ src, ...props }) => {
  return (
    <div className={styles.card__image}>
      <img src={src} {...props} alt="img" />
    </div>
  );
};

export default React.memo(CardImage);
