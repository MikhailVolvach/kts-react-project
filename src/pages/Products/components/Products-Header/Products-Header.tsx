import React, { FC } from "react";

import styles from "./Products-Header.module.scss";

export type ProductsHeaderProps = {
  className?: string;
};

const ProductsHeader: FC<ProductsHeaderProps> = ({ className }) => {
  return (
    <div className={[className, styles.header].join(" ")}>
      <h1 className={styles.header__title}>Products</h1>
      <p className={styles.header__subtitle}>
        We&nbsp;display products based on&nbsp;the latest products we&nbsp;have,
        if&nbsp;you want to&nbsp;see our old products please enter the name
        of&nbsp;the item
      </p>
    </div>
  );
};

export default ProductsHeader;
