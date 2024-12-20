"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import React from "react";
import { useRouter } from "next/navigation";
import { ChooseProduct } from "../choose-product";
import { IProduct } from "@/@types/prisma";
import { ChoosePizza } from "../choose-pizza";

interface Props {
  className?: string;
  product: IProduct;
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
  const router = useRouter();
  const isPizza = !!product.items[0].pizzaType;

  return (
    <div className={className}>
      <Dialog open={!!product} onOpenChange={() => router.back()}>
        <DialogContent className="p-0 w-[1060px] max-w-[1060px] min-h-[520px] bg-white overflow-hidden">
          {isPizza ? (
            <ChoosePizza
              imageUrl={product.imageUrl}
              name={product.name}
              ingredients={product.ingredients}
              items={product.items}
            />
          ) : (
            <ChooseProduct imageUrl={product.imageUrl} name={product.name} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
