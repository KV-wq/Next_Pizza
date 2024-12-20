import { CartItemDTO } from "./get-cart-details";

export const calcItemTotalPrice = (item: CartItemDTO): number => {
  const price = item.ingredients.reduce((acc, ing) => acc + ing.price, 0);

  return (price + item.productItem.price) * item.quantity;
};
