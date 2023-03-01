import React from "react";

import Card from "@components/Card/Card";
import { Log } from "@utils/log";
import { RecipeCardDataType } from "@utils/types";
import { Link } from "react-router-dom";

import styles from "./RecipeListPageBody.module.scss";

export type RecipeListPageBodyProps = {
  recipes?: RecipeCardDataType[] | null;
};

const RecipeListPageBody: React.FC<RecipeListPageBodyProps> = ({ recipes }) => {
  Log(styles);
  return (
    <div className={styles.recipe__body}>
      {recipes?.map((recipe) => (
        <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
          <Card
            key={recipe.id}
            image={recipe.image}
            title={recipe.title}
            subtitle={recipe.ingredients.map(
              (ingredient: any) => ingredient?.name
            )}
            caloriesAmount={recipe.calories.amount}
            caloriesUnit={recipe.calories.unit}
          />
        </Link>
      ))}
    </div>
  );
};

export default React.memo(RecipeListPageBody);
