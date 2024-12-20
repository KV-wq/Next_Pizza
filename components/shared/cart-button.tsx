import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { CartDrawer } from "./cart-drawer";

interface Props {
  className?: string;
}

export const CartButton: React.FC<Props> = ({ className }) => {
  return (
    <CartDrawer>
      <Button className="group relative">
        <b>1290 ₽</b>
        <span className="h-full w-[1px] bg-white/30 mx-3"></span>
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart
            className="h-4 w-4 relative"
            strokeWidth={2}
          ></ShoppingCart>
          <b>3</b>
        </div>
        <ArrowRight
          size={20}
          className=" absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
        ></ArrowRight>
      </Button>
      {/*      
        <Button variant="outline">
          <ShoppingCart
            className="h-4 w-4 relative"
            strokeWidth={2}
          ></ShoppingCart>
        </Button> */}
    </CartDrawer>
  );
};
