import React from "react";

import classNames from "classnames";
import Card from "components/Card/Card";
import Pagination from "components/Pagination/Pagination";
import WithLoader from "components/WithLoader";
import { projectConfig } from "config/projectConfig";
import { observer } from "mobx-react-lite";
import RecipesListPageStore from "store/RecipesListPageStore";
import { useQueryParamsStore } from "store/RootStore/hooks/useQueryParamsStore";
import { Meta } from "utils/meta";
import { useLocalStore } from "utils/useLocalStore";

import styles from "./RecipeListPageBody.module.scss";

export type RecipeListPageBodyProps = {
    searchValue: string;
    typeValue: string;
};

const RecipeListPageBody: React.FC<RecipeListPageBodyProps> = ({ searchValue, typeValue }) => {
    const [searchParams, setSearchParams] = useQueryParamsStore();
    const currentPageStore = useLocalStore(() => new RecipesListPageStore("complexSearch", +searchParams.page));

    const handlePaginationClick = React.useCallback(
        (pageNumber: number) => {
            currentPageStore.setCurrentPage(pageNumber);
            currentPageStore.setOffset(projectConfig.ELEMS_PER_PAGE * (pageNumber - 1));
            setSearchParams(
                new URLSearchParams([
                    ["search", `${searchValue}`],
                    ["page", `${pageNumber}`],
                    ["type", `${searchParams.type}`],
                ]),
            );
        },
        [searchParams, currentPageStore.offset, currentPageStore.currentPage, searchValue],
    );

    React.useEffect(() => {
        currentPageStore.setCurrentPage(+searchParams.page.toString());
        currentPageStore.getRecipeList(searchValue, typeValue);
    }, [currentPageStore, currentPageStore.currentPage, searchValue, typeValue]);

    return (
        <div className={classNames(styles.recipe__body, "recipe-body")}>
              <WithLoader loading={currentPageStore.meta === Meta.loading} className={styles.recipe__loader}>
                {currentPageStore.numberOfItems ? (
                    <div className={styles["recipe-body__container"]}>
                        {currentPageStore.list?.map((recipe) => (
                            <Card
                                key={recipe.id + recipe.title}
                                type="recipe"
                                id={recipe.id}
                                image={recipe.image}
                                title={recipe.title}
                                subtitle={recipe.ingredients?.map((ingredient: any) => ingredient?.name)}
                                caloriesAmount={recipe.calories?.amount}
                                caloriesUnit={recipe.calories?.unit}
                            />
                        ))}
                    </div>
                ) : (
                    <p className={styles["recipe-body__not-found-text"]}>Ничего не найдено</p>
                )}
                {currentPageStore.numberOfItems > projectConfig.ELEMS_PER_PAGE && (
                    <Pagination
                        callback={handlePaginationClick}
                        totalPages={Math.ceil(currentPageStore.numberOfItems / projectConfig.ELEMS_PER_PAGE)}
                        currentPage={+searchParams.page.toString()}
                    />
                )}
            </WithLoader>
        </div>
    );
};

export default observer(RecipeListPageBody);
