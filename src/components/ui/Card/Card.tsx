import React, { FC, memo } from "react";

import s from "./Card.module.scss";
import { CardProps } from "./config";

const Card: FC<CardProps> = ({ image, category, title, subtitle, price }) => {
  return (
    <article className={s.card}>
      <div className={s.card__top}>
        <picture className={s.card__image}>
          <img src={image} alt="Card" />
        </picture>
        <span className={[s.card__category, "h3"].join(" ")}>{category}</span>
        <h3 className={s.card__title}>{title}</h3>
      </div>
      <div className={s.card__bottom}>
        <p className={s.card__subtitle}>{subtitle}</p>
        <span className={[s.card__price, "h3"].join(" ")}>${price}</span>
      </div>
    </article>
  );
};

export default memo(Card);
