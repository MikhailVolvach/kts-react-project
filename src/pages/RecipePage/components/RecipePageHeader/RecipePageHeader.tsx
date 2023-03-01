import React from "react";

import Button from "@components/Button/Button";
import { ReactComponent as ArrowIcon } from "@svg/arrow-back.svg";
import { Link, useNavigate } from "react-router-dom";

import styles from "./RecipePageHeader.module.scss";

export type RecipePageHeaderProps = {
  image?: string;
};

const RecipePageHeader: React.FC<RecipePageHeaderProps> = ({ image = "" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.recipe__header}>
      <div className={styles.recipe__image}>
        <img src={image} alt="" />
      </div>
      <Button className={styles["recipe__button-back"]} onClick={handleClick}>
        <ArrowIcon />
      </Button>
    </div>
  );
};

export default React.memo(RecipePageHeader);
