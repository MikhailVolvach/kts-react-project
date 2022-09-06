import React, { useEffect, useState } from "react";

import ProductContent from "./components/ProductContent";
import ProductRelated from "./components/ProductRelated";
import styles from "./Product.module.scss";

const Product = () => {
  const [category, setCategory] = useState("");
  const getCategory = React.useCallback((cat: string) => {
    setCategory(cat);
  }, []);

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
