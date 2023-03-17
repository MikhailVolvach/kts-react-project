import React from "react";

import WithLoader from "components/WithLoader";
import { Meta } from "utils/meta";
import { useLocalStore } from "utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import RecipePageBody from "./components/RecipePageBody";
import RecipePageHeader from "./components/RecipePageHeader";
import RecipesStore from "store/RecipesStore";

const RecipePage = () => {
  const { id } = useParams();
  const recipePageStore = useLocalStore(
    () => new RecipesStore(`${id}/information`)
  );

  React.useEffect(() => {
    recipePageStore.getRecipeList([{
      name: "includeNutrition", value: "true"
    }]);
  }, [id, recipePageStore]);

  console.log(recipePageStore.list);

  return (
    <div className={"recipe"}>
      <WithLoader loading={recipePageStore?.meta === Meta.loading}>
        <div className={"recipe__container"}>
          <RecipePageHeader image={recipePageStore?.list[0]?.image} />
          <RecipePageBody
            title={recipePageStore?.list[0]?.title}
            readyInMinutes={recipePageStore?.list[0]?.readyInMinutes}
            aggregateLikes={recipePageStore?.list[0]?.aggregateLikes}
            summary={recipePageStore?.list[0]?.summary}
          />
        </div>
      </WithLoader>
    </div>
  );
};

export default observer(RecipePage);
