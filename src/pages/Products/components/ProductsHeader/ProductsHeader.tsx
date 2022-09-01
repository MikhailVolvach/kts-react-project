import React, { FC } from "react";

import { ProductsHeaderProps } from "./";
import s from "./ProductsHeader.module.scss";

const ProductsHeader: FC<ProductsHeaderProps> = ({ className }) => {
  return (
    <div className={[className, s.header].join(" ")}>
      <h1 className={s.header__title}>Products</h1>
      <p className={s.header__subtitle}>
        We&nbsp;display products based on&nbsp;the latest products we&nbsp;have,
        if&nbsp;you want to&nbsp;see our old products please enter the name
        of&nbsp;the item
      </p>
    </div>
  );
};

export default React.memo(ProductsHeader);
