import React from "react";

import { CardProps } from "./";
import styles from "./Card.module.scss";
import CardFooterComponent from "./components/CardFooterComponent/CardFooterComponent";
import CardImageComponent from "./components/CardImageComponent/CardImageComponent";
import CardInfoComponent from "./components/CardInfoComponent/CardInfoComponent";

const Card: React.FC<CardProps> = ({
  image,
  title,
  subtitle,
  content,
  onClick,
}) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <CardImageComponent src={image} />
      <CardInfoComponent
        title={title}
        subtitle={subtitle}
        className={styles.card__info}
      />
      <CardFooterComponent content={content} className={styles.card__footer} />
    </div>
  );
};

export default React.memo(Card);
