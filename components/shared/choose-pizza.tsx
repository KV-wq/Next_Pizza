import React, { useState } from "react";
import { DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/shared/lib/utils";
import { Button } from "../ui/button";
import { ProductImage } from "./product-image";
import { GroupVariants } from "./group-variants";
import {
  PizzaSize,
  PizzaType,
  mapPizzaType,
  pizzaSizes,
  pizzaTypes,
} from "@/shared/constants/pizza";
import { Ingredient } from "./ingredient";
import { useSet } from "react-use";
import { IProduct } from "@/@types/prisma";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: any[];
  items: IProduct["items"];
  onClickAdd?: VoidFunction;
  className?: string;
}

export const ChoosePizza: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  onClickAdd,
  className,
}) => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);

  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  );

  const pizzaPrice = items.find(
    (item) => item.pizzaType === type && item.size === size
  )?.price;
  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ing) => acc + ing.price, 0);

  const totalPrice = pizzaPrice + totalIngredientsPrice;

  const textDetails = `${size} см, ${mapPizzaType[type]} тесто`;

  return (
    <div className={cn(className, "flex flex-1")}>
      <ProductImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <DialogTitle>{name}</DialogTitle>

        <p className="text-gray-400 mt-3 mb-3">{textDetails}</p>

        <GroupVariants
          items={pizzaSizes}
          selectedValue={String(size)}
          onClick={(value) => setSize(Number(value) as PizzaSize)}
        />

        <GroupVariants
          items={pizzaTypes}
          selectedValue={String(type)}
          onClick={(value) => setType(Number(value) as PizzaType)}
          className="mt-2"
        />

        <div className="bg-gray-50 rounded-md p-5 my-4 overflow-auto h-[415px] ">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ing) => (
              <Ingredient
                key={ing.id}
                name={ing.name}
                price={ing.price}
                imageUrl={ing.imageUrl}
                onClick={() => addIngredient(ing.id)}
                active={selectedIngredients.has(ing.id)}
              />
            ))}
          </div>
        </div>

        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full ">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
