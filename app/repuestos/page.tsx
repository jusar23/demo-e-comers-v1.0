import Link from "next/link";
import { prisma } from "@/lib/prisma";

import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";

type RepuestosPageProps = {
  searchParams: Promise<{
    search?: string;
    category?: string;
    brand?: string;
    sort?: string;
  }>;
};

export default async function RepuestosPage({
  searchParams,
}: RepuestosPageProps) {
  const params = await searchParams;

  const search = params.search ?? "";
  const category = params.category ?? "";
  const brand = params.brand ?? "";
  const sort = params.sort ?? "";

  const products = await prisma.product.findMany({
    where: {
      ...(search
        ? {
            OR: [
              {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                reference: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                brand: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {}),

      ...(category
        ? {
            category: {
              equals: category,
              mode: "insensitive",
            },
          }
        : {}),

      ...(brand
        ? {
            brand: {
              equals: brand,
              mode: "insensitive",
            },
          }
        : {}),
    },

    orderBy:
      sort === "price-asc"
        ? { price: "asc" }
        : sort === "price-desc"
          ? { price: "desc" }
          : sort === "name-asc"
            ? { name: "asc" }
            : { createdAt: "desc" },
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

      {/* Encabezado */}
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

      {/* Catálogo */}
      <section className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">

          {/* Filtros */}
          <aside>
            <ProductFilters
              categories={categories}
              brands={brands}
            />
          </aside>

          {/* Productos */}
          <div>

            <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Todos los repuestos
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {formattedProducts.length}{" "}
                  {formattedProducts.length === 1
                    ? "producto encontrado"
                    : "productos encontrados"}
                </p>
              </div>

              {(search || category || brand) && (
                <Link
                  href="/repuestos"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Limpiar filtros
                </Link>
              )}

            </div>

            {/* Productos */}
            {formattedProducts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">

                <div className="text-5xl">
                  🔍
                </div>

                <h3 className="mt-4 text-xl font-bold text-gray-900">
                  No encontramos productos
                </h3>

                <p className="mt-2 text-gray-500">
                  Intenta buscar con otro término o cambiar
                  los filtros.
                </p>

                <Link
                  href="/repuestos"
                  className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Ver todos los repuestos
                </Link>

              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

                {formattedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}

              </div>
            )}

          </div>

        </div>

      </section>

    </main>
  );
}
