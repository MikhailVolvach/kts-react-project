// TODO: 1) Исправить колбеки для поиска и дропдауна
//       2) Проверить работу коллбека

import React from "react";

import Button from "@components/Button/Button";
import Input from "@components/Input/Input";
import MultiDropdown from "@components/MultiDropdown/MultiDropdown";
import { ReactComponent as SearchIcon } from "@svg/search.svg";
import { Log } from "@utils/log";
import classNames from "classnames";
import { useSearchParams } from "react-router-dom";

import styles from "./RecipeListPageHeader.module.scss";

export type RecipeListPageHeaderProps = {
  // onSearchButtonClick: (value: string) => void;
  onSearchButtonClick: () => void;
};

const RecipeListPageHeader: React.FC<RecipeListPageHeaderProps> = ({
  onSearchButtonClick,
}) => {
  const [inputValue, setInputValue] = useSearchParams();

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue({ search: e.target.value });
    },
    [setInputValue]
  );

  const handleSearch = React.useCallback(() => {
    // onSearchButtonClick(inputValue.get("search") || "");
    onSearchButtonClick();
  }, [onSearchButtonClick]);

  return (
    <div className={styles.recipe__header}>
      <div className={classNames(styles.recipe__search, styles.search)}>
        <Input
          className={styles.search__input}
          value={inputValue.get("search") || ""}
          onChange={handleInputChange}
          placeholder="Search"
        />
        <Button className={styles.search__button} onClick={handleSearch}>
          <SearchIcon />
        </Button>
      </div>
      <MultiDropdown
        className={styles.recipe__categories}
        options={[]}
        value={[]}
        pluralizeOptions={() => "Pick categories"}
        onChange={() => Log(5)}
      />
    </div>
  );
};

export default React.memo(RecipeListPageHeader);
