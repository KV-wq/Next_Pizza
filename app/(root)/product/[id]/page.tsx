import { ChooseProductModal } from "@/components/shared/modals/choose-product-modal";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductModalPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      items: true,
    },
  });

  if (!product) return notFound();

  return (
    <>
      <div className="bg-[url('/bg.svg')] inset-0 absolute -z-20" />
      <ChooseProductModal product={product} />
    </>
  );
}
