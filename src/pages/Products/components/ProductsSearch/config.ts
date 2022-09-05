import { Option } from "@ui/MultiDropdown";

export type ProductsSearchProps = {
  className?: string;
};

export const options: Option[] = [
  { key: "Men's clothing", value: "Men's clothing" },
  { key: "Women's clothing", value: "Women's clothing" },
  { key: "Jewelery", value: "Jewelery" },
  { key: "Electronics", value: "Electronics" },
];
