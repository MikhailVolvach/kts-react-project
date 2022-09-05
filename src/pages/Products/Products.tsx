import React, { useEffect, useState } from "react";

import ProductsList from "@ui/ProductsList";
import WithLoader from "@ui/WithLoader";
import { fetchData } from "@utils/fetchData";

import { RequestData } from "./";
import ProductsHeader from "./components/ProductsHeader";
import ProductsSearch from "./components/ProductsSearch";
import s from "./Products.module.scss";

const Products = () => {
  const [productsList, setProductsList] = useState<RequestData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData(
      "https://fakestoreapi.com/products",
      setProductsList,
      setIsLoading
    );
  }, []);

  return (
    <WithLoader loading={isLoading}>
      <div className={s.products}>
        <ProductsHeader className="products__header" />
        <ProductsSearch className="products__search" />
        <ProductsList
          title={
            <>
              <h2>Total Product</h2>
              <span className={s.list__size}>{productsList.length}</span>
            </>
          }
          className="products__list"
          productsList={productsList}
        />
      </div>
    </WithLoader>
  );
};

export default Products;
