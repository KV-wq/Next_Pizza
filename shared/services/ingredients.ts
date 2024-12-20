import { Ingredient } from "@prisma/client";
import { instance } from "./axios";
import { Routes } from "./constants";

export const getIngredients = async () => {
  const { data } = await instance.get<Ingredient[]>(Routes.INGREDIENTS);

  return data;
};
