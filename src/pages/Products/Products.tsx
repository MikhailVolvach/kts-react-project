import React, { useEffect, useState } from "react";

import Pagination from "@ui/Pagination/Pagination";
import ProductsList from "@ui/ProductsList";
import WithLoader from "@ui/WithLoader";
import { log } from "@utils/log";
import { Meta } from "@utils/meta";
import { pagesArr } from "@utils/pages";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

import ProductsStore from "../../store/ProductsStore/ProductsStore";
import ProductsHeader from "./components/ProductsHeader";
import ProductsSearch from "./components/ProductsSearch";
import s from "./Products.module.scss";

const Products = () => {
  const ELEMS_PER_PAGE = 6;
  const shopStore = useLocalStore(() => new ProductsStore());

  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });

  const pageQuery = searchParams.get("page") || "";
  const searchQuery = searchParams.get("search") || "";

  const [currentPage, setCurrentPage] = useState(+pageQuery || 1);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = React.useCallback(
    (value: string) => {
      setSearchValue(`category/${value}`);
      setSearchParams({ search: value });
    },
    [setSearchParams]
  );

  useEffect(() => {
    if (searchQuery) setSearchValue("category/" + searchQuery);
    let url = `https://fakestoreapi.com/products/${searchValue}`;
    shopStore.getProductsList(url);
  }, [searchQuery, searchValue, shopStore]);

  log(shopStore.list);

  const handlePaginationClick = React.useCallback(
    (pageNumber: number) => {
      setCurrentPage(pageNumber);
      setSearchParams({ page: pageNumber.toString() });
    },
    [setSearchParams]
  );

  return (
    <div className={s.products}>
      <ProductsHeader className="products__header" />
      <ProductsSearch
        value={searchParams.get("search") || ""}
        callback={handleSearch}
        className="products__search"
      />
      <WithLoader loading={shopStore.meta === Meta.loading}>
        <ProductsList
          title={
            <>
              <h2>Total Product</h2>
              <span className={s.list__size}>{shopStore.list.length}</span>
            </>
          }
          className="products__list"
          productsList={shopStore.list.slice(
            (currentPage - 1) * 6,
            currentPage * 6
          )}
        />

        {shopStore.list.length > ELEMS_PER_PAGE && (
          <Pagination
            callback={handlePaginationClick}
            pagesArr={pagesArr(shopStore.list.length, ELEMS_PER_PAGE)}
            currentPage={currentPage}
          />
        )}
      </WithLoader>
    </div>
  );
};

export default observer(Products);
