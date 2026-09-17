import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import SearchBar from "@/components/SearchBar";

type HomeProps = {
  searchParams: Promise<{
    search?: string;
    category?: string;
    brand?: string;
    sort?: string;
  }>;
};

export default async function Home({
  searchParams,
}: HomeProps) {
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
      
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-500 px-6 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-100">
              Tienda de repuestos
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              Encuentra el repuesto que necesitas
            </h1>

            <p className="mt-5 text-lg text-blue-100">
              Explora nuestro catálogo de repuestos y
              encuentra productos por nombre, referencia
              o marca.
            </p>
          </div>

          <div className="mt-8 max-w-4xl">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Catálogo */}
      <section
        id="productos"
        className="mx-auto max-w-7xl px-6 py-12"
      >
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          
          {/* Filtros */}
          <div>
            <ProductFilters
              categories={categories}
              brands={brands}
            />
          </div>

          {/* Productos */}
          <div>
            <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Nuestros productos
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {formattedProducts.length}{" "}
                  {formattedProducts.length === 1
                    ? "producto encontrado"
                    : "productos encontrados"}
                </p>
              </div>

              {(search || category || brand) && (
                <p className="text-sm text-gray-500">
                  Filtros activos
                </p>
              )}
            </div>

            {formattedProducts.length === 0 ? (
              <div className="rounded-2xl border border-dashed bg-white px-6 py-16 text-center">
                <div className="text-5xl">🔍</div>

                <h3 className="mt-4 text-xl font-bold text-gray-900">
                  No encontramos productos
                </h3>

                <p className="mt-2 text-gray-500">
                  Intenta buscar con otro término o
                  cambiar los filtros.
                </p>
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

      {/* Contacto */}
      <section
        id="contacto"
        className="border-t bg-white px-6 py-16"
      >
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            ¿Necesitas ayuda para encontrar un repuesto?
          </h2>

          <p className="mt-3 text-gray-600">
            Comunícate con nosotros y te ayudaremos a
            encontrar la referencia correcta.
          </p>

          <button className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">
            Contactarnos
          </button>
        </div>
      </section>
    </main>
  );
}