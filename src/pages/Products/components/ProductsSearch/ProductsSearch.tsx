import React, { FC } from "react";

import { Color } from "@configs/.";
import filter_icon from "@icons/filter.svg";
import Button from "@ui/Button";
import Input from "@ui/Input";
import MultiDropdown from "@ui/MultiDropdown";

import { options, ProductsSearchProps } from "./config";
import s from "./ProductsSearch.module.scss";

const ProductsSearch: FC<ProductsSearchProps> = ({
  className,
  callback,
  value = "",
}) => {
  const [inputValue, setValue] = React.useState<string>(value);

  const handleChange = React.useCallback(
    (value: string) => setValue(value.trim()),
    []
  );

  const handleSearch = React.useCallback(() => {
    if (inputValue) {
      callback(inputValue);
    }
  }, [callback, inputValue]);

  return (
    <div className={[className, s.search].join(" ")}>
      <div className={s.search__container}>
        <div className={s.search__input}>
          <Input
            onChange={handleChange}
            placeholder="Search property"
            value={inputValue}
          />
          <Button onClick={handleSearch} color={Color.primary}>
            Find Now
          </Button>
        </div>
        <MultiDropdown options={options} selected={[]} onChange={() => {}}>
          <img src={filter_icon} alt="Search" />
        </MultiDropdown>
      </div>
    </div>
  );
};

export default ProductsSearch;
