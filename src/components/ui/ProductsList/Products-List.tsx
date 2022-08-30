import React, { FC } from "react";

import Card from "@components/Card";
import { Link } from "react-router-dom";

import styles from "./Products-List.module.scss";

export type ProductsListProps = {
  productsList: ProductType[];
  className?: string;
  title: React.ReactNode;
};

export type ProductType = {
  id: number;
  imageUrl: string;
  category: string;
  title: string;
  subtitle: string;
  price: number;
};

const ProductsList: FC<ProductsListProps> = ({
  productsList,
  className,
  title,
}) => {
  return (
    <div className={[className, styles.list].join(" ")}>
      <div className={styles.list__header}>{title}</div>

      <div className={[styles.list__products, styles.products].join(" ")}>
        {productsList.map((product: ProductType) => (
          <Link key={product.id} to={`/products/${product.id}`}>
            <Card
              image={product.imageUrl}
              title={product.title}
              subtitle={product.subtitle}
              category={product.category}
              content={product.price}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
