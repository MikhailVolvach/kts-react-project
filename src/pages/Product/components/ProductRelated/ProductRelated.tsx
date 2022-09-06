import React, { FC, useEffect } from "react";

import ProductsStore from "@store/ProductsStore";
import ProductsList from "@ui/ProductsList";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import { ProductRelatedProps } from "./";
import s from "./ProductRelated.module.scss";

const ProductRelated: FC<ProductRelatedProps> = ({ className, category }) => {
  const shopStore = useLocalStore(() => new ProductsStore());

  const { id } = useParams();

  useEffect(() => {
    let url = `https://fakestoreapi.com/products/category/${category}?limit=4`;
    shopStore.getProductsList(url);

    shopStore.list.filter((elem) => elem.id.toString() !== id);
  }, [category, id, shopStore]);

  return (
    <div className={[className, s.related].join(" ")}>
      <ProductsList
        title={<h2>Related Items</h2>}
        productsList={shopStore?.list?.filter(
          (elem) => elem?.id?.toString() !== id
        )}
        className="related__list"
      />
    </div>
  );
};

export default observer(ProductRelated);
