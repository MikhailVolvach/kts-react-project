import React from "react";

import Card from "components/Card/Card";

import styles from "./RecipeListPageBody.module.scss";
import { useLocalStore } from "utils/useLocalStore";
import RecipesListPageStore from "store/RecipesListPageStore";
import { Meta } from "utils/meta";
import WithLoader from "components/WithLoader";
import { observer } from "mobx-react-lite";
import Pagination from "components/Pagination/Pagination";
import { useQueryParamsStore } from "store/RootStore/hooks/useQueryParamsStore";
import classNames from "classnames";

export type RecipeListPageBodyProps = {
  searchValue: string;
  typeValue: string;
};

const RecipeListPageBody: React.FC<RecipeListPageBodyProps> = ({
  searchValue,
  typeValue
}) => {
  const ELEMS_PER_PAGE = 6;

  const currentPageStore = useLocalStore(
    () => new RecipesListPageStore("complexSearch")
  );
  const [searchParams, setSearchParams] = useQueryParamsStore();

  const currentPage = +searchParams.page;

  const [offset, setOffset] = React.useState(
    (currentPage - 1) * ELEMS_PER_PAGE
  );

  const handlePaginationClick = React.useCallback(
    (pageNumber: number) => {
      setOffset(ELEMS_PER_PAGE * (pageNumber - 1));
      setSearchParams(
        new URLSearchParams([
          ["search", `${searchValue}`],
          ["page", `${pageNumber}`],
          ["type", `${searchParams.type}`],
        ])
      );
    },
    [searchParams, offset]
  );

  React.useEffect(() => {
    currentPageStore.getRecipeList([
      { name: "addRecipeNutrition", value: "true" },
      { name: "query", value: searchValue },
      { name: "offset", value: `${offset}` },
      { name: "number", value: `${ELEMS_PER_PAGE}` },
      { name: "type", value: typeValue }
    ]);
  }, [currentPageStore, offset, searchValue, typeValue]);

  return (
    <div className={classNames(styles.recipe__body, "recipe-body")}>
      <WithLoader
        loading={currentPageStore.meta === Meta.loading}
        className={styles.recipe__loader}
      > {currentPageStore.numberOfItems ?
        <div className={styles["recipe-body__container"]}>
          {currentPageStore.list?.map((recipe) => (
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
        </div> : <p className={styles["recipe-body__not-found-text"]}>Ничего не найдено</p>}
        {currentPageStore.numberOfItems &&
            <Pagination
                callback={handlePaginationClick}
                totalPages={Math.ceil(
                  currentPageStore.numberOfItems / ELEMS_PER_PAGE
                )}
                currentPage={currentPage}
            />}

      </WithLoader>
    </div>
  );
};

export default observer(RecipeListPageBody);
