export type caloriesObject = {
  amount: number;
  unit: string;
};

export type RecipeCardDataType = {
  id: number;
  title: string;
  image: string;
  ingredients: object[];
  calories: caloriesObject;
};

export type Option = {
  key: string;
  value: string;
};
