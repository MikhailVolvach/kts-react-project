import React from "react";

import styles from "./Card.module.scss";

type CardProps = {
  image: string;
  category?: React.ReactNode;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  content?: React.ReactNode;
  onClick?: React.MouseEventHandler;
};

const Card: React.FC<CardProps> = ({
  image,
  category,
  title,
  subtitle,
  content,
  onClick,
}) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.card__top}>
        <div className={styles.card__image}>
          <img src={image} alt="Card" />
        </div>
        <h5 className={styles.card__category}>{category}</h5>
        <h3 className={styles.card__title}>{title}</h3>
      </div>
      <div className={styles.card__bottom}>
        <p className={styles.card__subtitle}>{subtitle}</p>
        <h3 className={styles.card__content}>${content}</h3>
      </div>
    </div>
  );
};

export default Card;
