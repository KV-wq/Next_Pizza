import { instance } from "./axios";
import { CartDTO } from "../lib/get-cart-details";

export const fetchCart = async (): Promise<CartDTO> => {
  const { data } = await instance.get<CartDTO>("/cart");
  console.log(data);
  return data;
};
