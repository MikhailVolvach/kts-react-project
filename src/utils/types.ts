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

export type ingredientType = {
  name: string;
  id: number;
  [key: string]: any;
};

export type nutrientType = {
  name: string;
  unit: string;
  amount: number;
  percentOfDailyNeeds: number;
};

export type nutritionType = {
  [key: string]: any;
  nutrients: nutrientType[];
  ingredients: ingredientType[];
};
