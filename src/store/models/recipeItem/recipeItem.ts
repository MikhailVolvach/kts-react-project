import { ingredientType, nutrientType, nutritionType } from "utils/types";

export type RecipeItemApi = {
    id: number;
    image: string;
    title: string;
    nutrition?: nutritionType;
    totalResults?: number;
    summary: string;
    aggregateLikes: number;
    readyInMinutes: number;
};

export type RecipeItemModel = {
    id: number;
    image: string;
    title: string;
    summary: string;
    aggregateLikes: number;
    ingredients?: Array<ingredientType> | null;
    calories?: nutrientType;
    readyInMinutes: number;
    instructions?: string;
    totalResults?: number;
};

export const normalizeRecipeItem = (from: RecipeItemApi): RecipeItemModel => {
    const item: RecipeItemModel = {
        id: from.id,
        image: from.image,
        title: from.title,
        calories: from.nutrition?.nutrients[0],
        aggregateLikes: from.aggregateLikes,
        summary: from.summary,
        readyInMinutes: from.readyInMinutes,
    };

    if (!from.nutrition?.ingredients) {
        return item;
    }

    if (from.nutrition?.ingredients) {
        item.ingredients = from.nutrition?.ingredients;
    }

    if (from.summary) {
        item.summary = from.summary;
    }

    return item;
};
