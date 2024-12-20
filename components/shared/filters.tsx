"use client";

import React from "react";
import { Title } from "./title";
import { Input } from "../ui/input";
import { RangeSlider } from "../ui/range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filter-group";
import { useFilterIngredients } from "@/shared/hooks/useFilterIngredients";
import { useSet } from "react-use";
import qs from "qs";
import { useRouter } from "next/navigation";

interface Props {
  className?: string;
}

interface PriceProps {
  priceFrom: number;
  priceTo: number;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { items, loading, onAddId, selectedIds } = useFilterIngredients();
  const [price, setPrice] = React.useState<PriceProps>({
    priceFrom: 0,
    priceTo: 3000,
  });
  const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>([]));
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>([])
  );

  const onChangeSetPrice = (name: keyof PriceProps, value: number) => {
    setPrice({
      ...price,
      [name]: value,
    });
  };

  const router = useRouter();

  React.useEffect(() => {
    const filters = {
      ...price,
      pizzaTypes: Array.from(pizzaTypes),
      sizes: Array.from(sizes),
      items: Array.from(selectedIds),
    };

    const query = qs.stringify(filters);

    router.push(`?${query}`, {
      scroll: false,
    });
  }, [items, price, pizzaTypes, sizes]);

  return (
    <div className={className}>
      <Title text="Фильрация" size="sm" className="mb-5 font-bold" />

      {/* <div className="flex flex-col gap-4">
        <FilterCheckbox name="qwe" text="Можно собирать" value="1" />
        <FilterCheckbox name="ewq" text="Новинки" value="2" />
      </div> */}

      <CheckboxFiltersGroup
        title="Размеры"
        name="sizes"
        className="mb-5"
        selectedIds={sizes}
        onClickCheckbox={toggleSizes}
        items={[
          { text: "20 см", value: "20" },
          { text: "30 см", value: "30" },
          { text: "40 см", value: "40" },
        ]}
      />

      <CheckboxFiltersGroup
        title="Тип теста"
        name="pizzaTypes"
        className="mb-5"
        selectedIds={pizzaTypes}
        onClickCheckbox={togglePizzaTypes}
        items={[
          { text: "Тонкое", value: "1" },
          { text: "Традиционное", value: "2" },
        ]}
      />

      <div className="mt-5 border-y border-y-neutral-200 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={3000}
            value={String(price.priceFrom)}
            onChange={(e) =>
              onChangeSetPrice("priceFrom", Number(e.target.value))
            }
          />
          <Input
            type="number"
            placeholder="3000"
            min={100}
            max={3000}
            value={String(price.priceTo)}
            onChange={(e) =>
              onChangeSetPrice("priceTo", Number(e.target.value))
            }
          />
        </div>

        <RangeSlider
          min={0}
          max={3000}
          step={10}
          value={[price.priceFrom, price.priceTo]}
          onValueChange={([from, to]) =>
            setPrice({ priceFrom: from, priceTo: to })
          }
        />
      </div>

      <CheckboxFiltersGroup
        title="Ингридиенты"
        name="ingredients"
        className="mt-5 "
        defaultItems={items
          .map((i) => ({ value: String(i.id), text: i.name }))
          .slice(0, 5)}
        items={items.map((i) => ({ value: String(i.id), text: i.name }))}
        loading={loading}
        onClickCheckbox={onAddId}
        selectedIds={selectedIds}
      />
    </div>
  );
};
