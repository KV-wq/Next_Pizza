import { Product } from "@prisma/client";
import { instance } from "./axios";
import { Routes } from "./constants";

export const search = async (query: string): Promise<Product[]> => {
  return (
    await instance.get<Product[]>(Routes.SEARCH_PRODUCTS, { params: { query } })
  ).data;
};
