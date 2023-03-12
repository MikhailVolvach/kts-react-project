import React from "react";

import ClockIcon from "svg/Clock.svg";
import HeartIcon from "svg/Heart.svg";
import { ingredientType } from "utils/types";

import styles from "./RecipePageBody.module.scss";

export type RecipePageBodyProps = {
  title?: string;
  readyInMinutes?: number;
  aggregateLikes?: number;
  extendedIngredients?: ingredientType[] | null;
  instructions?: string;
};

const RecipePageBody: React.FC<RecipePageBodyProps> = ({
  title = "",
  readyInMinutes = "",
  aggregateLikes = 0,
  extendedIngredients = null,
  instructions = "",
}) => {
  return (
    <div className={styles.recipe__body}>
      <h1 className={styles.recipe__title}>{title}</h1>
      <div className={styles.recipe__info}>
        <div className={styles.recipe__time}>
          <img src={ClockIcon} alt=""/> {readyInMinutes} minutes
        </div>
        <div className={styles.recipe__rating}>
          <img src={HeartIcon} alt=""/> {aggregateLikes} likes
        </div>
      </div>
      <div className={styles.recipe__description}>
        <h3 className={styles["recipe__ingredients-title"]}>Ingredients</h3>
        <ul className={styles["recipe__ingredients-list"]}>
          {extendedIngredients?.map((ingredient: any) => (
            <li className={styles.recipe__ingredient} key={ingredient.id}>
              {ingredient.name}
            </li>
          ))}
        </ul>
        <div dangerouslySetInnerHTML={{ __html: instructions }} />
      </div>
    </div>
  );
};

export default React.memo(RecipePageBody);
