import React from "react";

import WithLoader from "@components/WithLoader";
import RecipesStore from "@store/RecipesStore";
import { Meta } from "@utils/meta";
import { recipeListParams } from "@utils/types";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

import RecipeListPageBody from "./components/RecipeListPageBody";
import RecipeListPageHeader from "./components/RecipeListPageHeader";
import styles from "./RecipListPage.module.scss";

const RecipeListPage = () => {
  const [inputValue] = useSearchParams();

  const recipeListStore = useLocalStore(() => new RecipesStore());
  const [requestOptions, setRequestOptions] = React.useState<recipeListParams>({
    path: "complexSearch",
    queryParams: [
      { paramName: "addRecipeNutrition", paramValue: true },
      {
        paramName: "titleMatch",
        paramValue: inputValue.get("search"),
      },
    ],
  });

  const handleSearch = React.useCallback(() => {
    setRequestOptions({
      path: "complexSearch",
      queryParams: [
        { paramName: "addRecipeNutrition", paramValue: true },
        { paramName: "titleMatch", paramValue: inputValue.get("search") },
      ],
    });
  }, [inputValue]);

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
