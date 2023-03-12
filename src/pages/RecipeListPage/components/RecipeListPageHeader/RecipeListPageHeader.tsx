import React from "react";

import Button from "components/Button/Button";
import Input from "components/Input/Input";
import MultiDropdown from "components/MultiDropdown/MultiDropdown";
import SearchIcon from "svg/search.svg";
import { requestTypes } from "utils/requestTypes";
import classNames from "classnames";

import styles from "./RecipeListPageHeader.module.scss";
import {useQueryParamsStore} from "store/RootStore/hooks/useQueryParamsStore";

export type RecipeListPageHeaderProps = {
  onSearchButtonClick: (value: string) => void;
};

const RecipeListPageHeader: React.FC<RecipeListPageHeaderProps> = ({
  onSearchButtonClick,
}) => {
  const [inputValue, setInputValue] = useQueryParamsStore();
  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(new URLSearchParams({"search": e.target.value}));
    },
    [inputValue]
  );

  const handleSearch = React.useCallback(() => {
    onSearchButtonClick(inputValue.getSearch()?.toString() || "");
  }, [onSearchButtonClick]);

  return (
    <div className={styles.recipe__header}>
      <div className={classNames(styles.recipe__search, styles.search)}>
        <Input
          className={styles.search__input}
          value={inputValue.getSearch()?.toString()}
          onChange={handleInputChange}
          placeholder="Search"
        />
        <Button className={styles.search__button} onClick={handleSearch}>
          <img src={SearchIcon} alt=""/>
        </Button>
      </div>
      <MultiDropdown
        className={styles.recipe__categories}
        options={requestTypes}
        value={[]}
        pluralizeOptions={() => "Pick categories"}
        onChange={() => {}}
      />
    </div>
  );
};

export default React.memo(RecipeListPageHeader);
