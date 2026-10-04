import { prisma } from "@/lib/prisma";
import ProductCatalog from "@/components/ProductCatalog";

type RepuestosPageProps = {
  searchParams: Promise<{
    categoria?: string;
  }>;
};

export default async function RepuestosPage({
  searchParams,
}: RepuestosPageProps) {
  const params = await searchParams;
  const categoriaInicial = params.categoria ?? "";

  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const categoriesResult = await prisma.product.findMany({
    select: {
      category: true,
    },
    distinct: ["category"],
    orderBy: {
      category: "asc",
    },
  });

  const brandsResult = await prisma.product.findMany({
    select: {
      brand: true,
    },
    distinct: ["brand"],
    orderBy: {
      brand: "asc",
    },
  });

  const categories = categoriesResult.map(
    (item) => item.category
  );

  const brands = brandsResult.map(
    (item) => item.brand
  );

  const formattedProducts = products.map((product) => ({
    ...product,
    price: Number(product.price),
  }));

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gray-900 px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-wider text-blue-400">
            Catálogo de repuestos
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            Repuestos para tu vehículo
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base">
            Encuentra repuestos para motocargueros y motos.
            Utiliza el buscador y los filtros para encontrar
            rápidamente la referencia que necesitas.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <ProductCatalog
          products={formattedProducts}
          categories={categories}
          brands={brands}
          initialCategory={categoriaInicial}
        />
      </section>
    </main>
  );
}