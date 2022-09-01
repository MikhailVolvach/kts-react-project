import React, { FC, useEffect, useState } from "react";

import { Color } from "@configs/.";
import { resultType } from "@pages/Product";
import Button from "@ui/Button";
import WithLoader from "@ui/WithLoader";
import axios from "axios";
import { useParams } from "react-router-dom";

import { ProductContentProps } from "./";
import s from "./ProductContent.module.scss";

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
  const [productIsLoading, setProductIsLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetch = async () => {
      setProductIsLoading(true);
      const { data } = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );

      setProductData(data);
      setFullText(data.description.length > 179);
      setProductIsLoading(false);
    };

    fetch();
  }, [id]);

  return (
    <WithLoader loaderColor={Color.primaryInverted} loading={productIsLoading}>
      <div className={[className, s.content].join(" ")}>
        <div className={s.content__left}>
          <div className={s.content__image}>
            <img src={productData.image} alt={productData.title} />
          </div>
        </div>
        <div className={s.content__right}>
          <h2 className={s.content__title}>{productData.title}</h2>
          <p className={s.content__category}>{productData.category}</p>
          {fullText ? (
            <p className={s.content__description}>
              {productData.description.slice(0, 178)}...
              <span onClick={() => setFullText(!fullText)}>Read More</span>
            </p>
          ) : (
            <p className={s.content__description}>{productData.description}</p>
          )}
          <p className={[s.content__price, "h2"].join(" ")}>
            ${productData.price}
          </p>
          <div className={s.content__buttons}>
            <Button>Buy Now</Button>
            <Button color={Color.secondary}>Add to Chart</Button>
          </div>
        </div>
      </div>
    </WithLoader>
  );
};

export default React.memo(ProductContent);
