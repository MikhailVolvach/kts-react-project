import React from "react";

import WithLoader from "@components/WithLoader";
import RecipesStore from "@store/RecipesStore";
import { Log } from "@utils/log";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";

import RecipeListPageBody from "./components/RecipeListPageBody";
import RecipeListPageHeader from "./components/RecipeListPageHeader";
import styles from "./RecipListPage.module.scss";

const RecipeListPage = () => {
  const recipeListStore = useLocalStore(() => new RecipesStore());
  const [requestOptions, setRequestOptions] = React.useState({
    path: "complexSearch",
    queryParams: ["addRecipeNutrition=true"],
  });

  const handleSearch = React.useCallback((value: string) => {
    setRequestOptions({
      path: "complexSearch",
      queryParams: ["addRecipeNutrition=true", `titleMatch=${value}`],
    });
  }, []);

  React.useEffect(() => {
    recipeListStore.getRecipeList(requestOptions);
  }, [recipeListStore, requestOptions]);

  return (
    <div className={styles.recipe}>
      <WithLoader
        loading={recipeListStore.meta === Meta.loading}
        className={styles.recipe__loader}
      >
        <div className={styles.recipe__container}>
          <RecipeListPageHeader onSearchButtonClick={handleSearch} />
          <RecipeListPageBody recipes={recipeListStore?.list} />
        </div>
      </WithLoader>
    </div>
  );
};

export default observer(RecipeListPage);
