import { ingredientType, nutrientType, nutritionType } from "utils/types";

export type RecipeItemApi = {
  id: number;
  image: string;
  title: string;
  nutrition?: nutritionType;
  extendedIngredients?: Array<ingredientType>;
  totalResults?: number;
};

export type RecipeItemModel = {
  id: number;
  image: string;
  title: string;
  ingredients: Array<ingredientType> | null;
  calories?: nutrientType;
  readyInMinutes?: number;
  aggregateLikes?: number;
  instructions?: string;
  totalResults?: number;
};

export const normalizeRecipeItem = (from: RecipeItemApi): RecipeItemModel => {
  let item: RecipeItemModel = {
    id: from.id,
    image: from.image,
    title: from.title,
    ingredients: null,
    calories: from.nutrition?.nutrients[0],
  };

  if (!from.extendedIngredients && !from.nutrition?.ingredients) {
    return item;
  }

  if (from.extendedIngredients) {
    item.ingredients = from.extendedIngredients;
    return item;
  }

  if (from.nutrition?.ingredients) {
    item.ingredients = from.nutrition?.ingredients;
  }
  return item;
};
