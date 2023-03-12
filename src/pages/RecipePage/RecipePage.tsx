import React from "react";

import WithLoader from "components/WithLoader";
import { Meta } from "utils/meta";
import { useLocalStore } from "utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import RecipePageBody from "./components/RecipePageBody";
import RecipePageHeader from "./components/RecipePageHeader";
import styles from "./RecipePage.module.scss";
import RecipesStore from "store/RecipesStore";

const RecipePage = () => {
  const recipePageStore = useLocalStore(() => new RecipesStore());


  const { id } = useParams();

  React.useEffect(() => {
    recipePageStore.getRecipeList({
      path: `${id}/information`,
      queryParams: [],
    });
  }, [id, recipePageStore]);

  return (
    <div className={styles.recipe || "recipe"}>
      <WithLoader loading={recipePageStore?.meta === Meta.loading}>
        <div className={styles.recipe__container || "recipe__container"}>
          <RecipePageHeader image={recipePageStore?.list[0]?.image} />
          <RecipePageBody
            title={recipePageStore?.list[0]?.title}
            readyInMinutes={recipePageStore?.list[0]?.readyInMinutes}
            aggregateLikes={recipePageStore?.list[0]?.aggregateLikes}
            extendedIngredients={recipePageStore?.list[0]?.ingredients}
            instructions={recipePageStore?.list[0]?.instructions}
          />
        </div>
      </WithLoader>
    </div>
  );
};

export default observer(RecipePage);
