"use client";

import { cn } from "@/shared/lib/utils";
import { Api } from "@/shared/services/client";
import { Product } from "@prisma/client";
import { Search } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useClickAway, useDebounce } from "react-use";

interface Props {
  className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [value, setValue] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [focused, setFocused] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => {
    setFocused(false);
  });

  useDebounce(
    () => {
      Api.products.search(value).then((items) => {
        setProducts(items);
      });
    },
    200,
    [value]
  );

  const onClick = () => {
    setFocused(false);
    setValue("");
    setProducts([]);
  };

  return (
    <>
      {focused && <div className="fixed inset-0 bg-black/50 z-30" />}

      <div
        ref={ref}
        className={cn(
          "flex rounded-2xl flex-1 justify-between relative h-11 z-30",
          className
        )}
      >
        <Search className="absolute top-1/2 -translate-y-[50%] left-3 h-5 text-gray-400" />
        <input
          className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
          type="text"
          placeholder="Найти пиццу.."
          onFocus={() => setFocused(true)}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        {products.length > 0 && (
          <div
            className={cn(
              "absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
              focused && "visible opacity-100 top-[2.85rem]"
            )}
          >
            {products.map((product) => (
              <Link
                key={product.id}
                href={"/product/" + product.id}
                className="flex items-center gap-3 hover:bg-primary/10 px-3 py-2 transition-colors"
                onClick={onClick}
              >
                <img
                  src={product.imageUrl}
                  className="rounded-full h-8 w-8"
                  alt={product.name}
                />
                <span className="font-semibold">{product.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
