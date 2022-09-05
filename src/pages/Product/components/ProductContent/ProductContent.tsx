import React, { FC, useEffect, useState } from "react";

import { Color } from "@configs/.";
import ProductsStore from "@store/ProductsStore/ProductsStore";
import Button from "@ui/Button";
import WithLoader from "@ui/WithLoader";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import { ProductContentProps } from "./";
import s from "./ProductContent.module.scss";

const ProductContent: FC<ProductContentProps> = ({ className, callback }) => {
  const shopStore = useLocalStore(() => new ProductsStore());

  const [fullText, setFullText] = useState(
    shopStore?.list[0]?.description?.length > 179 || false
  );

  const { id } = useParams();

  useEffect(() => {
    let url = `https://fakestoreapi.com/products/${id}`;
    shopStore?.getProductsList(url);
    setFullText(shopStore?.list?.[0]?.description.length > 179);
  }, [id, shopStore, setFullText, callback]);

  const data = shopStore.list[0];

  if (data?.category !== undefined && data?.category !== "") {
    callback(data?.category);
  }

  // log(shopStore.list);

  return (
    <WithLoader
      loaderColor={Color.primaryInverted}
      loading={shopStore?.meta === Meta.loading}
    >
      <div className={[className, s.content].join(" ")}>
        <div className={s.content__left}>
          <div className={s.content__image}>
            <img src={data?.image} alt={data?.title} />
          </div>
        </div>
        <div className={s.content__right}>
          <h2 className={s.content__title}>{data?.title}</h2>
          <p className={s.content__category}>{data?.category}</p>
          {fullText ? (
            <p className={s.content__description}>
              {data?.description?.slice(0, 178)}...
              <span onClick={() => setFullText(!fullText)}>Read More</span>
            </p>
          ) : (
            <p className={s.content__description}>{data?.description}</p>
          )}
          <p className={[s.content__price, "h2"].join(" ")}>${data?.price}</p>
          <div className={s.content__buttons}>
            <Button>Buy Now</Button>
            <Button color={Color.secondary}>Add to Chart</Button>
          </div>
        </div>
      </div>
    </WithLoader>
  );
};

export default observer(ProductContent);
