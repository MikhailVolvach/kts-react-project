import * as qs from "qs";

export type Option = {
  key: string;
  value: string;
};

export type ingredientType = {
  name: string;
  id: number;
};

export type nutrientType = {
  name: string;
  unit: string;
  amount: number;
  percentOfDailyNeeds: number;
};

export type nutritionType = {
  nutrients: nutrientType[];
  ingredients: ingredientType[];
};

export type queryParamType = {
  name: string;
  value: undefined | string | string[] | qs.ParsedQs | qs.ParsedQs[];
};
