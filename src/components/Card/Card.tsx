import React from "react";

import styles from "./Card.module.scss";
import CardFooterComponent from "./components/CardFooter/CardFooter";
import CardImageComponent from "./components/CardImage/CardImage";
import CardInfoComponent from "./components/CardInfo/CardInfo";

// export type subtitleType = {};

export type CardProps = {
  image: string;
  title: React.ReactNode;
  subtitle: object[];
  caloriesAmount: number;
  caloriesUnit: string;
  onClick?: React.MouseEventHandler;
};

const Card: React.FC<CardProps> = ({
  image,
  title,
  subtitle,
  caloriesAmount,
  caloriesUnit,
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
      <CardFooterComponent
        caloriesAmount={caloriesAmount}
        caloriesUnit={caloriesUnit}
        className={styles.card__footer}
      />
    </div>
  );
};

export default React.memo(Card);
