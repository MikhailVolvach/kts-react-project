import React from "react";

import Pagination from "components/Pagination/Pagination";
import WithLoader from "components/WithLoader";
import { Meta } from "utils/meta";
import { recipeListParams } from "utils/types";
import { useLocalStore } from "utils/useLocalStore";
import { observer } from "mobx-react-lite";

import RecipeListPageBody from "./components/RecipeListPageBody";
import RecipeListPageHeader from "./components/RecipeListPageHeader";
import styles from "./RecipListPage.module.scss";
import RecipesStore from "store/RecipesStore";
import {useQueryParamsStore} from "store/RootStore/hooks/useQueryParamsStore";

const RecipeListPage = () => {
  const [searchValue, setSearchValue] = React.useState("");

  const ELEMS_PER_PAGE = 6;

  const [searchParams, setSearchParams] = useQueryParamsStore();
  const currentPage = +searchParams.getPage();

  const [offset, setOffset] = React.useState((currentPage - 1) * ELEMS_PER_PAGE);

  const recipeListStore = useLocalStore(() => new RecipesStore());

  const [requestOptions] = React.useState<recipeListParams>({
    path: "complexSearch",
    queryParams: [
      { name: "addRecipeNutrition", value: "true" },
      { name: "query", value: searchParams.getSearch() || "" },
      { name: "offset", value: `${offset}`},
      { name: "number", value: `${offset + ELEMS_PER_PAGE}` }
    ],
  });

  const handleSearch = React.useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  React.useEffect(() => {
    recipeListStore.getRecipeList({path: requestOptions.path, queryParams: [
        { name: "addRecipeNutrition", value: "true" },
        { name: "query", value: searchValue },
        { name: "offset", value: `${offset}`},
        { name: "number", value: `${offset + ELEMS_PER_PAGE}` }
      ]});
  }, [recipeListStore, offset, searchValue]);

  const handlePaginationClick = React.useCallback(
    (pageNumber: number) => {
      setOffset(ELEMS_PER_PAGE * (pageNumber - 1));
      setSearchParams(new URLSearchParams([["search", `${searchValue}`], ["page", `${pageNumber}`]]))
    },
    [searchParams, offset]
  );

  return (
    <div className={styles.recipe}>
      <WithLoader
        loading={recipeListStore.meta === Meta.loading}
        className={styles.recipe__loader}
      >
        <div className={styles.recipe__container}>
          <RecipeListPageHeader
            onSearchButtonClick={handleSearch}
          />
          <RecipeListPageBody
            recipes={recipeListStore?.list.slice(
              (currentPage - 1) * ELEMS_PER_PAGE,
              currentPage * ELEMS_PER_PAGE
            )}
          />
            <Pagination
              callback={handlePaginationClick}
              // pages={pages(recipeListStore.numberOfItems, ELEMS_PER_PAGE)}
              totalPages={Math.ceil(recipeListStore.numberOfItems /ELEMS_PER_PAGE)}
              currentPage={currentPage}
            />
        </div>
      </WithLoader>
    </div>
  );
};

export default observer(RecipeListPage);
