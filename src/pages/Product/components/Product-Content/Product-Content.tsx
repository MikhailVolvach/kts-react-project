import React, { FC, useEffect, useState } from "react";

import Button, { ButtonColor } from "@components/Button";
import { resultType } from "@pages/Product";
import axios from "axios";
import { useParams } from "react-router-dom";

import styles from "./Product-Content.module.scss";

type ProductContentProps = {
  className: string;
};

const ProductContent: FC<ProductContentProps> = ({ className }) => {
  const [productData, setProductData] = useState<resultType>({
    id: 0,
    image: "",
    category: "",
    title: "",
    price: 0,
    description: "",
  });

  const [fullText, setFullText] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetch = async () => {
      const result = await axios({
        method: "get",
        url: `https://fakestoreapi.com/products/${id}`,
      });

      setProductData(result.data);
      setFullText(result.data.description.length > 179);
    };

    fetch();
  }, [id]);

  return (
    <div className={[className, styles.content].join(" ")}>
      <div className={styles.content__left}>
        <div className={styles.content__image}>
          <img src={productData.image} alt={productData.title} />
        </div>
      </div>
      <div className={styles.content__right}>
        <h2 className={styles.content__title}>{productData.title}</h2>
        <p className={styles.content__category}>{productData.category}</p>
        {fullText && (
          <p className={styles.content__description}>
            {productData.description.slice(0, 178)}...
            <span onClick={() => setFullText(!fullText)}>Read More</span>
          </p>
        )}
        {!fullText && (
          <p className={styles.content__description}>
            {productData.description}
          </p>
        )}
        <h2 className={styles.content__price}>${productData.price}</h2>
        <div className={styles.content__buttons}>
          <Button>Buy Now</Button>
          <Button color={ButtonColor.secondary}>Add to Chart</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductContent;
