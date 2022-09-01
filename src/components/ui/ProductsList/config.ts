import React from "react";

import { RequestData } from "@pages/Products";

export type ProductsListProps = {
  productsList: RequestData[];
  className?: string;
  title: React.ReactNode;
};
