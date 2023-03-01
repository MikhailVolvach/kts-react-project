import React from "react";

import { ReactComponent as ClockIcon } from "@svg/Clock.svg";
import { ReactComponent as HeartIcon } from "@svg/Heart.svg";

import styles from "./RecipePageBody.module.scss";

export type ingredientsType = {
  name: string;
  id: number;
  [key: string]: any;
};

export type RecipePageBodyProps = {
  title?: string;
  readyInMinutes?: number;
  aggregateLikes?: number;
  extendedIngredients?: ingredientsType[];
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
          <ClockIcon /> {readyInMinutes} minutes
        </div>
        <div className={styles.recipe__rating}>
          <HeartIcon /> {aggregateLikes} likes
        </div>
      </div>
      <div className={styles.recipe__description}>
        <h3>Ingredients</h3>
        <ul>
          {extendedIngredients?.map((ingredient: any) => (
            <li key={ingredient.id}>{ingredient.name}</li>
          ))}
        </ul>
        <div dangerouslySetInnerHTML={{ __html: instructions }} />
      </div>
    </div>
  );
};

export default React.memo(RecipePageBody);
