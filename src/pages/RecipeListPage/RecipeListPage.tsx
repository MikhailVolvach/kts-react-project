import React from "react";

import RecipeListPageBody from "./components/RecipeListPageBody";
import RecipeListPageHeader from "./components/RecipeListPageHeader";
import styles from "./RecipListPage.module.scss";
import { useQueryParamsStore } from "store/RootStore/hooks/useQueryParamsStore";
import { observer } from "mobx-react-lite";

const RecipeListPage = () => {
  const [searchValue, setSearchValue] = useQueryParamsStore();

  const handleSearch = React.useCallback(
    (value: string) => {
      setSearchValue(new URLSearchParams([["search", `${value}`]] ));
    },
    [setSearchValue]
  );

  const handleTypeChange = React.useCallback((type: string) => {
    setSearchValue(new URLSearchParams([["search", `${searchValue.search}`], ["type", `${type}`], ["page", `1`]]))
  }, []);

  return (
    <div className={styles.recipe}>
      <div className={styles.recipe__container}>
        <RecipeListPageHeader
          onSearchButtonClick={handleSearch}
          searchValue={searchValue.search?.toString()}
          onTypeChange={handleTypeChange}
          typeValue={searchValue.type?.toString()}
        />
        <RecipeListPageBody
          searchValue={searchValue.search?.toString()}
          typeValue={searchValue.type?.toString()}
        />
      </div>
    </div>
  );
};

export default observer(RecipeListPage);
