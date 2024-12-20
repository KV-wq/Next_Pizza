import { Title } from "@/components/shared/title";
import { Container } from "@/components/shared/container";
import { TopBar } from "@/components/shared/top-bar";
import { Filters } from "@/components/shared/filters";
import { ProductGroupList } from "@/components/shared/product-group-list";
import { prisma } from "@/prisma/prisma-client";

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          ingredients: true,
          items: true,
        },
      },
    },
  });

  return (
    <>
      <Container className="mt-8">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <TopBar categories={categories} />

      <Container className="pb-14 mt-10">
        <div className="flex gap-[70px]">
          {/* Filters */}

          <div className="w-[250x]">
            <Filters />
          </div>

          {/* Products */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (cat) =>
                  cat.products.length > 0 && (
                    <ProductGroupList
                      key={cat.id}
                      title={cat.name}
                      items={cat.products}
                      categoryId={cat.id}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
