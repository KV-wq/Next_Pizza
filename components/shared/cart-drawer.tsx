"use client";

import React from "react";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { CartItem } from "./cart-item";
import { getCartItemsDetails } from "@/shared/lib/get-cart-items-details";
import { useCartStore } from "@/shared/stores/cart";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { useCart } from "@/shared/hooks/useCart";

interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  const { totalAmount, items, removeCartItem } = useCart();

  const [redirecting, setRedirecting] = React.useState(false);

  // const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
  //   const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
  //   updateItemQuantity(id, newQuantity);
  // };
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <SheetHeader>
          <SheetTitle>
            В корзине <span className="font-bold">3 товара</span>
          </SheetTitle>
        </SheetHeader>

        <div className="-mx-6 mt-5 overflow-auto flex-1">
          {items.map((item) => (
            <CartItem
              id={item.id}
              key={item.id}
              className="mb-2"
              imageUrl={item.imageUrl}
              details={
                item.type
                  ? getCartItemsDetails(
                      item.type as PizzaType,
                      item.pizzaSize as PizzaSize,
                      item.ingredients
                    )
                  : " "
              }
              name={item.name}
              price={item.price}
              quantity={item.quantity}
            />
          ))}
        </div>

        <SheetFooter className="-mx-6 bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Итого
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"></div>
              </span>
              <span className="font-bold text-lg">{totalAmount} ₽</span>
            </div>

            <Link href="/cart">
              <Button type="submit" className="w-full h-12 text-base">
                Оформить заказ
                <ArrowRight className="w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
