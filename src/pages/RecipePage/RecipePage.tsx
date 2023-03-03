import React from "react";

import WithLoader from "@components/WithLoader";
import axios from "axios";
import { useParams } from "react-router-dom";

import RecipePageBody, { ingredientsType } from "./components/RecipePageBody";
import RecipePageHeader from "./components/RecipePageHeader";
import styles from "./RecipePage.module.scss";

export type RecipeDataType = {
  id: number;
  image: string;
  title: string;
  readyInMinutes: number;
  aggregateLikes: number;
  extendedIngredients: Array<ingredientsType>;
  instructions: string;
};

const RecipePage = () => {
  const [recipeInfo, setRecipeInfo] = React.useState<RecipeDataType | null>(
    null
  );

  const [isLoading, setIsLoading] = React.useState(false);

  const { id } = useParams();

  React.useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);

      const { data } = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?&apiKey=9cf15f974d3b4aac8c3cdf47e72525ad`
      );

      setRecipeInfo({
        id: data.id,
        image: data.image,
        title: data.title,
        readyInMinutes: data.readyInMinutes,
        aggregateLikes: data.aggregateLikes,
        extendedIngredients: data.extendedIngredients,
        instructions: data.instructions,
      });

      setIsLoading(false);
    };

    fetch();
  }, [id]);

  return (
    <div className={styles.recipe || "recipe"}>
      <WithLoader loading={isLoading}>
        <div className={styles.recipe__container || "recipe__container"}>
          <RecipePageHeader image={recipeInfo?.image} />
          <RecipePageBody
            title={recipeInfo?.title}
            readyInMinutes={recipeInfo?.readyInMinutes}
            aggregateLikes={recipeInfo?.aggregateLikes}
            extendedIngredients={recipeInfo?.extendedIngredients}
            instructions={recipeInfo?.instructions}
          />
        </div>
      </WithLoader>
    </div>
  );
};

export default React.memo(RecipePage);
