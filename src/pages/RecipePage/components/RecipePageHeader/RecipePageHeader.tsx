import React from "react";

import Button from "components/Button/Button";
import { useNavigate } from "react-router-dom";
import ArrowIcon from "svg/arrow-back.svg";

import styles from "./RecipePageHeader.module.scss";

export type RecipePageHeaderProps = {
    image?: string;
};

const RecipePageHeader: React.FC<RecipePageHeaderProps> = ({ image = "" }) => {
    const navigate = useNavigate();

    const handleClick = React.useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return (
        <div className={styles.recipe__header}>
            <div className={styles.recipe__image}>
                <img src={image} alt="" />
            </div>
            <Button className={styles["recipe__button-back"]} onClick={handleClick}>
                <img src={ArrowIcon} alt="" />
            </Button>
        </div>
    );
};

export default React.memo(RecipePageHeader);
