import React, { FC } from "react";

import { Color } from "@configs/.";
import filter_icon from "@icons/filter.svg";
import Button from "@ui/Button";
import Input from "@ui/Input";
import MultiDropdown, { Option } from "@ui/MultiDropdown";

import { options, ProductsSearchProps } from "./config";
import s from "./ProductsSearch.module.scss";

const ProductsSearch: FC<ProductsSearchProps> = ({ className }) => {
  return (
    <div className={[className, s.search].join(" ")}>
      <div className={s.search__container}>
        <div className={s.search__input}>
          <Input
            onChange={(value: any) => value}
            placeholder="Search property"
          />
          <Button color={Color.primary}>Find Now</Button>
        </div>
        <MultiDropdown
          options={options}
          selected={[]}
          onChange={() => {}}
          pluralizeOptions={() => "Filter"}
        >
          <img src={filter_icon} alt="Search" />
        </MultiDropdown>
      </div>
    </div>
  );
};

export default ProductsSearch;
