import React from "react";

import Pagination from "@components/Pagination/Pagination";
import WithLoader from "@components/WithLoader";
import RecipesStore from "@store/RecipesStore";
import { Meta } from "@utils/meta";
import { pagesArr } from "@utils/pagesArr";
import { recipeListParams } from "@utils/types";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

import RecipeListPageBody from "./components/RecipeListPageBody";
import RecipeListPageHeader from "./components/RecipeListPageHeader";
import styles from "./RecipListPage.module.scss";

const RecipeListPage = () => {
  const ELEMS_PER_PAGE = 6;

  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });
  const pageQuery = searchParams.get("page") || "";

  const [currentPage, setCurrentPage] = React.useState(+pageQuery || 1);

  const recipeListStore = useLocalStore(() => new RecipesStore());
  const [requestOptions, setRequestOptions] = React.useState<recipeListParams>({
    path: "complexSearch",
    queryParams: [
      { paramName: "addRecipeNutrition", paramValue: true },
      { paramName: "query", paramValue: searchParams.get("search") },
    ],
  });

  const handleSearch = React.useCallback(() => {
    setRequestOptions({
      path: requestOptions.path,
      queryParams: [
        { paramName: "addRecipeNutrition", paramValue: true },
        { paramName: "query", paramValue: searchParams.get("search") },
      ],
    });
  }, [searchParams]);

  React.useEffect(() => {
    recipeListStore.getRecipeList(requestOptions);
  }, [recipeListStore, requestOptions]);

  const handlePaginationClick = React.useCallback(
    (pageNumber: number) => {
      setCurrentPage(pageNumber);
      setSearchParams({ page: pageNumber.toString() });
    },
    [setSearchParams]
  );

  return (
    <div className={styles.recipe}>
      <WithLoader
        loading={recipeListStore.meta === Meta.loading}
        className={styles.recipe__loader}
      >
        <div className={styles.recipe__container}>
          <RecipeListPageHeader onSearchButtonClick={handleSearch} />
          <RecipeListPageBody
            recipes={recipeListStore?.list.slice(
              (currentPage - 1) * ELEMS_PER_PAGE,
              currentPage * ELEMS_PER_PAGE
            )}
          />
          {recipeListStore.list.length > ELEMS_PER_PAGE && (
            <Pagination
              callback={handlePaginationClick}
              pagesArr={pagesArr(recipeListStore.list.length, ELEMS_PER_PAGE)}
              currentPage={currentPage}
            />
          )}
        </div>
      </WithLoader>
    </div>
  );
};

export default observer(RecipeListPage);
