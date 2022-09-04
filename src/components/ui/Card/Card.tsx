import React, { FC, memo } from "react";

import s from "./Card.module.scss";
import { CardProps } from "./config";

const Card: FC<CardProps> = ({
  image,
  category,
  title,
  description,
  price,
}) => {
  return (
    <article className={s.card}>
      <div className={s.card__top}>
        <picture className={s.card__image}>
          <img src={image} alt="Card" />
        </picture>
        <span className={[s.card__category, "h5"].join(" ")}>{category}</span>
        <h3 className={s.card__title}>{title}</h3>
      </div>
      <div className={s.card__bottom}>
        <p className={s.card__description}>{description}</p>
        <span className={[s.card__price, "h3"].join(" ")}>${price}</span>
      </div>
    </article>
  );
};

export default memo(Card);
