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
import {projectConfig} from "config/projectConfig";

export type RecipeListPageBodyProps = {
  searchValue: string;
  typeValue: string;
};

const RecipeListPageBody: React.FC<RecipeListPageBodyProps> = ({
  searchValue,
  typeValue
}) => {

  const currentPageStore = useLocalStore(
    () => new RecipesListPageStore("complexSearch", +searchParams.page)
  );
  const [searchParams, setSearchParams] = useQueryParamsStore();

  const handlePaginationClick = React.useCallback(
    (pageNumber: number) => {
      currentPageStore.setOffset(projectConfig.ELEMS_PER_PAGE * (pageNumber - 1));
      setSearchParams(
        new URLSearchParams([
          ["search", `${searchValue}`],
          ["page", `${pageNumber}`],
          ["type", `${searchParams.type}`],
        ])
      );
    },
    [searchParams, currentPageStore.offset, searchValue]
  );

  React.useEffect(() => {
    currentPageStore.getRecipeList(searchValue, typeValue);
  }, [currentPageStore, currentPageStore.offset, searchValue, typeValue]);

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
                  currentPageStore.numberOfItems / projectConfig.ELEMS_PER_PAGE
                )}
                currentPage={currentPageStore.currentPage}
            />}

      </WithLoader>
    </div>
  );
};

export default observer(RecipeListPageBody);
