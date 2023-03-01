// TODO: 1) Исправить колбеки для поиска и дропдауна

import React from "react";

import Button from "@components/Button/Button";
import Input from "@components/Input/Input";
import MultiDropdown from "@components/MultiDropdown/MultiDropdown";
import { ReactComponent as SearchIcon } from "@svg/search.svg";
import { Log } from "@utils/log";
import classNames from "classnames";

import styles from "./RecipeListPageHeader.module.scss";

const RecipeListPageHeader = () => {
  return (
    <div className={styles.recipe__header}>
      <div className={classNames(styles.recipe__search, styles.search)}>
        <Input
          className={styles.search__input}
          value=""
          onChange={() => Log(1)}
          placeholder="Search"
        />
        <Button
          className={styles.search__button}
          onClick={() => Log(2)}
          onMouseOver={() => Log(3)}
        >
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
