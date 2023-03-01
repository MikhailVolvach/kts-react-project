import React from "react";

import WithLoader from "@components/WithLoader";
import { RecipeCardDataType } from "@utils/types";
import axios from "axios";

import RecipeListPageBody from "./components/RecipeListPageBody";
import RecipeListPageHeader from "./components/RecipeListPageHeader";
import styles from "./RecipListPage.module.scss";

const RecipeListPage = () => {
  const [recipes, setRecipes] = React.useState<RecipeCardDataType[] | null>(
    null
  );
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);

      const { data } = await axios.get(
        "https://api.spoonacular.com/recipes/complexSearch?addRecipeNutrition=true&addRecipeNutrition=true&apiKey=9cf15f974d3b4aac8c3cdf47e72525ad"
      );

      setRecipes(
        data.results.map(
          (raw: {
            id: number;
            image: string;
            title: string;
            nutrition: { ingredients: any; nutrients: any[] };
          }) => ({
            id: raw.id,
            image: raw.image,
            title: raw.title,
            ingredients: raw.nutrition.ingredients,
            calories: raw.nutrition.nutrients[0],
          })
        )
      );

      setIsLoading(false);
    };

    fetch();
  }, []);

  return (
    <div className={styles.recipe}>
      <WithLoader loading={isLoading} className={styles.recipe__loader}>
        <div className={styles.recipe__container}>
          <RecipeListPageHeader />
          <RecipeListPageBody recipes={recipes} />
        </div>
      </WithLoader>
    </div>
  );
};

export default React.memo(RecipeListPage);
