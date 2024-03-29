import React from "react";

import classNames from "classnames";
import Button from "components/Button/Button";
import Input from "components/Input/Input";
import MultiDropdown from "components/MultiDropdown/MultiDropdown";
import { requestTypes } from "utils/requestTypes";

import styles from "./RecipeListPageHeader.module.scss";

export type RecipeListPageHeaderProps = {
    onSearchButtonClick: (value: string) => void;
    searchValue: string;
    onTypeChange: (value: string) => void;
    typeValue: string;
};

const RecipeListPageHeader: React.FC<RecipeListPageHeaderProps> = ({
    onSearchButtonClick,
    searchValue,
    onTypeChange,
    typeValue,
}) => {
    const [type, setType] = React.useState<string[]>([]);
    const [inputValue, setInputValue] = React.useState<string>(searchValue);

    const handleInputChange = React.useCallback((e: React.SyntheticEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);
    }, []);

    const handleSearch = React.useCallback(() => {
        onSearchButtonClick(inputValue.trim());
    }, [inputValue, onSearchButtonClick]);

    const handleDropdownClick = React.useCallback(
        (option: string) => {
            onTypeChange(option);
        },
        [type, setType],
    );

    return (
        <div className={styles.recipe__header}>
            <div className={classNames(styles.recipe__search, styles.search)}>
                <Input
                    className={styles.search__input}
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Search"
                />
                <Button className={styles.search__button} onClick={handleSearch} />
            </div>
            <MultiDropdown
                className={styles.recipe__categories}
                options={requestTypes}
                value={typeValue}
                onChange={handleDropdownClick}
            />
        </div>
    );
};

export default React.memo(RecipeListPageHeader);
