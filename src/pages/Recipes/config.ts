export type RecipeCardDataType = {
  id: number;
  title: string;
  image: string;
  ingredients: object[];
  calories: object;
};

export type RecipesProps = {
  className?: string;
};
