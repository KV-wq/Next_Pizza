"use client";
import React from "react";
import { cn } from "@/shared/lib/utils";
import { useCategoryStore } from "@/shared/stores/category";
import { Category } from "@prisma/client";

interface Props {
  items: Category[];
  className?: string;
}

export const Categories: React.FC<Props> = ({ items, className }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);

  const scrollToCategory = (name: string) => {
    const element = document.querySelector(`#${name}`);

    if (element) {
      window.scrollTo({
        top: element.offsetTop - 120,
      });
    }
  };

  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {items.map((cat) => (
        <button
          key={cat.id}
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5",
            categoryActiveId === cat.id &&
              "bg-white shadow-md shadow-gray-200 text-primary"
          )}
          onClick={() => scrollToCategory(cat.name)}
        >
          <p>{cat.name}</p>
        </button>
      ))}
    </div>
  );
};
