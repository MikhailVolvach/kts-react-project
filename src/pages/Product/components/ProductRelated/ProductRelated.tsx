import React, { FC, useEffect, useState } from "react";

import { RequestData } from "@pages/Products";
import ProductsList from "@ui/ProductsList";
import { fetchData } from "@utils/fetchData";

import { ProductRelatedProps } from "./";
import s from "./ProductRelated.module.scss";

const ProductRelated: FC<ProductRelatedProps> = ({ className }) => {
  const [related, setRelated] = useState<RequestData[]>([]);

  useEffect(() => {
    fetchData("https://fakestoreapi.com/products?limit=3", setRelated);
  }, []);

  return (
    <div className={[className, s.related].join(" ")}>
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

export default React.memo(ProductRelated);
