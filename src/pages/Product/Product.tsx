import React from "react";

import ProductContent from "@pages/Product/components/Product-Content";
import ProductRelated from "@pages/Product/components/Product-Related";

import styles from "./Product.module.scss";

export type resultType = {
  id: number;
  image: string;
  title: string;
  category: string;
  description: string;
  price: number;
};

const Product = () => {
  return (
    <div className={styles.product}>
      <ProductContent className={styles.product__content} />
      <ProductRelated className={styles.product__related} />
    </div>
  );
};

export default Product;
