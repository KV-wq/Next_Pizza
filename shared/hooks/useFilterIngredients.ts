import { Api } from "@/shared/services/client";
import { Ingredient } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSet } from "react-use";

interface ReturnProps {
  items: Ingredient[];
  loading: boolean;
  selectedIds: Set<string>;
  onAddId: (id: string) => void;
}

export const useFilterIngredients = (): ReturnProps => {
  const [items, setItems] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedIds, { toggle }] = useSet(new Set<string>([]));

  useEffect(() => {
    async function fetch() {
      try {
        const response = await Api.ingredients.getIngredients();
        setItems(response);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetch();
  }, []);

  return { items, loading, onAddId: toggle, selectedIds };
};
