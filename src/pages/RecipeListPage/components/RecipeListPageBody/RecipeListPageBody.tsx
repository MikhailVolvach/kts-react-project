import React from "react";

import Card from "@components/Card/Card";
import { RecipeItemModel } from "@store/models";

import styles from "./RecipeListPageBody.module.scss";

export type RecipeListPageBodyProps = {
  recipes?: RecipeItemModel[] | null;
};

const RecipeListPageBody: React.FC<RecipeListPageBodyProps> = ({ recipes }) => {
  return (
    <div className={styles.recipe__body}>
      {recipes?.map((recipe) => (
        <Card
          key={recipe.id + recipe.title}
          type="recipe"
          id={recipe.id}
          image={recipe.image}
          title={recipe.title}
          subtitle={recipe.ingredients?.map(
            (ingredient: any) => ingredient?.name
          )}
          caloriesAmount={recipe.calories?.amount}
          caloriesUnit={recipe.calories?.unit}
        />
      ))}
    </div>
  );
};

export default React.memo(RecipeListPageBody);
