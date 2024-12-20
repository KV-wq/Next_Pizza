import { cn } from "@/shared/lib/utils";
import { CircleCheck } from "lucide-react";
import React from "react";

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Ingredient: React.FC<Props> = ({
  className,
  imageUrl,
  name,
  price,
  active,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        className,
        "flex items-center flex-col p-1 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white border border-transparent",
        { "border-primary": active }
      )}
    >
      {active && (
        <CircleCheck className="absolute top-2 right-2 text-primary" />
      )}
      <img src={imageUrl} alt={name} className="size-[110px]" />
      <span className="text-xs mb-1">{name}</span>
      <span className="font-bold">{price} ₽</span>
    </div>
  );
};
