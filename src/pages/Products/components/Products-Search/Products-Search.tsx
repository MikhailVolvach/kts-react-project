import React, { FC } from "react";

import Button from "@components/Button";
import Input from "@components/Input";
import MultiDropdown, { Option } from "@components/MultiDropdown";
import filter_icon from "@icons/filter.svg";

import styles from "./Products-Search.module.scss";

export type ProductsSearchProps = {
  className?: string;
};

const options: Option[] = [
  { key: "Men's clothing", value: "Men's clothing" },
  { key: "Women's clothing", value: "Women's clothing" },
  { key: "Jewelery", value: "Jewelery" },
  { key: "Electronics", value: "Electronics" },
];

const ProductsSearch: FC<ProductsSearchProps> = ({ className }) => {
  return (
    <div className={[className, styles.search].join(" ")}>
      <div className={styles.search__input}>
        <Input
          value={""}
          onChange={(value) => value}
          placeholder="Search property"
        />
        <Button>Find Now</Button>
      </div>
      <MultiDropdown
        options={options}
        value={[]}
        onChange={() => {}}
        pluralizeOptions={(value) => "Filter"}
      >
        <img src={filter_icon} alt="Search" />
      </MultiDropdown>
    </div>
  );
};

export default ProductsSearch;
