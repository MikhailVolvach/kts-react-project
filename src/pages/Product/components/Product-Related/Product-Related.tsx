import React, { FC, useEffect, useState } from "react";

import ProductsList from "@components/Products-List";
import { RequestData } from "@pages/Products/Products";
import axios from "axios";

import styles from "./Product-Related.module.scss";

export type ProductRelatedProps = {
  className: string;
};

const ProductRelated: FC<ProductRelatedProps> = ({ className }) => {
  const [related, setRelated] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const result = await axios({
        method: "get",
        url: "https://fakestoreapi.com/products?limit=3",
      });

      setRelated(
        result.data.map((raw: RequestData) => ({
          id: raw.id,
          imageUrl: raw.image,
          category: raw.category,
          title: raw.title,
          subtitle: raw.description,
          price: raw.price,
        }))
      );
    };

    fetch();
  }, []);

  return (
    <div className={[className, styles.related].join(" ")}>
      {/*<h3 className={styles.related__title}>Related Items</h3>*/}
      <ProductsList
        title={
          <>
            <h2>Related Items</h2>
          </>
        }
        productsList={related}
        className="related__list"
      />
    </div>
  );
};

export default ProductRelated;
