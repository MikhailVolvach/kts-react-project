import React from "react";

import Button from "@components/Button";
import WithLoader from "@components/WithLoader";
import { ReactComponent as ArrowIcon } from "@svg/arrow-back.svg";
import { ReactComponent as ClockIcon } from "@svg/Clock.svg";
import { ReactComponent as HeartIcon } from "@svg/Heart.svg";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import { RecipeDataType } from "./";
import styles from "./Recipe.module.scss";

const Recipe = () => {
  const [recipeInfo, setRecipeInfo] = React.useState<RecipeDataType>({
    aggregateLikes: 0,
    id: 0,
    image: "",
    extendedIngredients: [],
    instructions: "",
    readyInMinutes: 0,
    title: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const { id } = useParams();

  React.useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);

      const { data } = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?&apiKey=9cf15f974d3b4aac8c3cdf47e72525ad`
      );

      setRecipeInfo(data);

      setIsLoading(false);
    };

    fetch();
  }, [id]);

  return (
    <div className={styles.recipe}>
      <WithLoader loading={isLoading}>
        <div className={styles.recipe__container}>
          <div className={styles.recipe__header}>
            <div className={styles.recipe__image}>
              <img src={recipeInfo.image} alt="" />
            </div>
            <Link to="/">
              <Button className={styles["recipe__button-back"]}>
                <ArrowIcon />
              </Button>
            </Link>
          </div>

          <div className={styles.recipe__body}>
            <h1 className={styles.recipe__title}>{recipeInfo.title}</h1>
            <div className={styles.recipe__info}>
              <div className={styles.recipe__time}>
                <ClockIcon /> {recipeInfo?.readyInMinutes} minutes
              </div>
              <div className={styles.recipe__rating}>
                <HeartIcon /> {recipeInfo.aggregateLikes} likes
              </div>
            </div>
            <div className={styles.recipe__description}>
              <h3>Ingredients</h3>
              <ul>
                {recipeInfo.extendedIngredients.map((ingredient: any) => (
                  <li key={ingredient.id}>{ingredient.name}</li>
                ))}
              </ul>
              <div
                dangerouslySetInnerHTML={{ __html: recipeInfo.instructions }}
              />
            </div>
          </div>
        </div>
      </WithLoader>
    </div>
  );
};

export default React.memo(Recipe);
