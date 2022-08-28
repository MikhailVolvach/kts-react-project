import React, { useEffect, useState } from "react";

import ProductsList from "@components/Products-List";
import axios from "axios";

import ProductsHeader from "./components/Products-Header";
import ProductsSearch from "./components/Products-Search";
import styles from "./Products.module.scss";

export type RequestData = {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string;
  price: number;
};

const Products = () => {
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const result = await axios({
        method: "get",
        url: "https://fakestoreapi.com/products",
      });

      setProductsList(
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
    <div className={styles.products}>
      <ProductsHeader className="products__header" />
      <ProductsSearch className="products__search" />
      <ProductsList
        title={
          <>
            <h2>Total Product</h2>
            <span className={styles.list__size}>{productsList.length}</span>
          </>
        }
        className="products__list"
        productsList={productsList}
      />
    </div>
  );
};

export default Products;
