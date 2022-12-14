import React from "react";

import { RequestData } from "@pages/Products";
import Card from "@ui/Card";
import { Link } from "react-router-dom";

import { ProductsListProps } from "./";
import s from "./ProductsList.module.scss";

const ProductsList: React.FC<ProductsListProps> = ({
  productsList,
  className,
  title,
}) => {
  return (
    <div className={[className, s.list].join(" ")}>
      <div className={s.list__header}>{title}</div>

      <div className={[s.list__products, s.products].join(" ")}>
        {productsList.map((product: RequestData) => (
          <Link key={product.id} to={`/products/${product.id}`}>
            <Card
              image={product.image}
              title={product.title}
              subtitle={product.description}
              category={product.category}
              price={product.price}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default React.memo(ProductsList);
