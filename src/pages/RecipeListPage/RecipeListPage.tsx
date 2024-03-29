import React from "react";

import { observer } from "mobx-react-lite";
import { useQueryParamsStore } from "store/RootStore/hooks/useQueryParamsStore";

import RecipeListPageBody from "./components/RecipeListPageBody";
import RecipeListPageHeader from "./components/RecipeListPageHeader";
import styles from "./RecipListPage.module.scss";

const RecipeListPage = () => {
    const [searchValue, setSearchValue] = useQueryParamsStore();

    const search = searchValue.search.toString();
    const type = searchValue.type.toString();

    const handleSearch = React.useCallback(
        (value: string) => {
            setSearchValue(new URLSearchParams([["search", `${value}`]]));
        },
        [setSearchValue],
    );

    const handleTypeChange = React.useCallback(
        (clickedType: string) => {
            let oldType = searchValue.type
                .toString()
                .split(",")
                .filter((elem) => elem !== "");

            if (!oldType.includes(clickedType)) {
                oldType.push(clickedType);
            } else {
                oldType = oldType.filter((elem) => elem !== clickedType);
            }

            setSearchValue(
                new URLSearchParams([
                    ["search", `${searchValue.search}`],
                    ["type", `${oldType.join()}`],
                    ["page", "1"],
                ]),
            );
        },
        [searchValue.search, searchValue.type],
    );

    return (
        <div className={styles.recipe}>
            <div className={styles.recipe__container}>
                <RecipeListPageHeader
                    onSearchButtonClick={handleSearch}
                    searchValue={search}
                    onTypeChange={handleTypeChange}
                    typeValue={type.split(",").join(", ")}
                />
                <RecipeListPageBody
                    searchValue={search}
                    typeValue={type}
                />
            </div>
        </div>
    );
};

export default observer(RecipeListPage);
