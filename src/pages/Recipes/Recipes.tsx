import React from "react";

import Button from "@components/Button";
import Card from "@components/Card";
import Input from "@components/Input";
import MultiDropdown from "@components/MultiDropdown";
import WithLoader from "@components/WithLoader";
import { ReactComponent as SearchIcon } from "@svg/search.svg";
import { Log } from "@utils/log";
import axios from "axios";
import classNames from "classnames";
import { Link } from "react-router-dom";

import { RecipesProps, RecipeCardDataType } from "./";
import styles from "./Recipes.module.scss";

const Recipes: React.FC<RecipesProps> = ({ className }) => {
  const [recipes, setRecipes] = React.useState<RecipeCardDataType[]>([
    {
      calories: {},
      id: 0,
      image: "",
      ingredients: [],
      title: "",
    },
  ]);
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
    <div className={styles.recipes}>
      <WithLoader loading={isLoading} className={styles.recipes__loader}>
        <div className={styles.recipes__container}>
          <div className={styles.recipes__header}>
            <div className={classNames(styles.recipes__search, styles.search)}>
              {/* eslint-disable-next-line no-console */}
              <Input
                className={styles.search__input}
                value=""
                onChange={() => Log(1)}
                placeholder="Search"
              />
              <Button
                className={styles.search__button}
                onClick={() => Log(2)}
                onMouseOver={() => Log(3)}
              >
                <SearchIcon />
              </Button>
            </div>
            <MultiDropdown
              className={styles.recipes__categories}
              options={[]}
              value={[]}
              pluralizeOptions={() => "Pick categories"}
              onChange={() => Log(5)}
            />
          </div>
          <div className={styles.recipes__body}>
            {recipes.map((recipe) => (
              <Link to={`/recipe/${recipe.id}`}>
                <Card
                  key={recipe.id}
                  image={recipe.image}
                  title={recipe.title}
                  subtitle={recipe.ingredients.map(
                    (ingredient: any) => ingredient?.name
                  )}
                  content={recipe.calories}
                />
              </Link>
            ))}
          </div>
        </div>
      </WithLoader>
    </div>
  );
};

export default React.memo(Recipes);
