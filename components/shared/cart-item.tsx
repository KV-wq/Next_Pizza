import React from "react";
import { CartItemProps } from "./cart-item/cart-item.types";
import { cn } from "@/shared/lib/utils";
import { CartItemDetailsImage } from "./cart-item/cart-item-image";
import { CartItemInfo } from "./cart-item/cart-item-info";
import { CountButton } from "./count-button";
import { CartItemDetailsPrice } from "./cart-item/cart-item-price";
import { Trash2Icon } from "lucide-react";

interface Props extends CartItemProps {
  className?: string;
}

export const CartItem: React.FC<Props> = ({
  className,
  id,
  imageUrl,
  name,
  price,
  details,
  quantity,
}) => {
  return (
    <div className={cn("flex bg-white p-5 gap-6", className)}>
      <CartItemDetailsImage src={imageUrl} />

      <div className="flex-1">
        <CartItemInfo name={name} details={details} />

        <hr className="my-3" />

        <div className="flex items-center justify-between">
          <CountButton onClick={(type) => console.log(type)} value={quantity} />

          <div className="flex items-center gap-3">
            <CartItemDetailsPrice value={price} />
            <Trash2Icon
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              size={16}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
