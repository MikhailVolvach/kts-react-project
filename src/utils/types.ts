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
    [key: string]: string;
};
