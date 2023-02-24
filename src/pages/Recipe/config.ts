export type RecipeDataType = {
  id: number;
  image: string;
  title: string;
  readyInMinutes: number;
  aggregateLikes: number;
  extendedIngredients: object[];
  instructions: string;
};
