import React from "react";

import ProductContent from "./components/ProductContent";
import ProductRelated from "./components/ProductRelated";
import styles from "./Product.module.scss";

const Product = () => {
  return (
    <div className={styles.product}>
      <ProductContent className={styles.product__content} />
      <ProductRelated className={styles.product__related} />
    </div>
  );
};

export default React.memo(Product);
