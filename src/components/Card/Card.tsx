import React from "react";

import { Link } from "react-router-dom";

import styles from "./Card.module.scss";
import CardFooterComponent from "./components/CardFooter/CardFooter";
import CardImageComponent from "./components/CardImage/CardImage";
import CardInfoComponent from "./components/CardInfo/CardInfo";

export type CardProps = {
  caloriesAmount?: number;
  caloriesUnit?: string;
  id: number;
  image: string;
  onClick?: React.MouseEventHandler;
  subtitle?: Array<string>;
  title: React.ReactNode;
  type: string;
};

const Card: React.FC<CardProps> = ({
  caloriesAmount = 0,
  caloriesUnit = "",
  id,
  image,
  onClick,
  subtitle = [""],
  title,
  type,
}) => {
  return (
    <Link to={`/${type}/${id}`} key={id}>
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
    </Link>
  );
};

export default React.memo(Card);
