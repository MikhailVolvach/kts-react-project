import React, { useState } from "react";

import { log } from "@utils/log";

import ProductContent from "./components/ProductContent";
import ProductRelated from "./components/ProductRelated";
import styles from "./Product.module.scss";

const Product = () => {
  const [category, setCategory] = useState("");
  const getCategory = React.useCallback((category: string) => {
    setCategory(category);
  }, []);

  log("Cat", category);
  return (
    <div className={styles.product}>
      <ProductContent
        callback={getCategory}
        className={styles.product__content}
      />
      <ProductRelated category={category} className={styles.product__related} />
    </div>
  );
};

export default Product;
