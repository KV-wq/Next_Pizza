import React from "react";
import { DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/shared/lib/utils";
import { Button } from "../ui/button";

interface Props {
  imageUrl: string;
  name: string;
  items?: any[];
  onClickAdd?: VoidFunction;
  className?: string;
}

export const ChooseProduct: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  onClickAdd,
  className,
}) => {
  const textDetails = "30см, традиционное тесто";
  const totalPrice = 790;

  return (
    <div className={cn(className, "flex flex-1")}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 w-[350px] h-[350px]"
        />
      </div>

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <DialogTitle>{name}</DialogTitle>

        <p className="text-gray-400 mt-2">{textDetails}</p>

        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
