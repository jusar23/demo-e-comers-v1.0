import Link from "next/link";
import MotocarroCard from "@/components/MotocarroCard";
import { prisma } from "@/lib/prisma";

type MotocarguerosPageProps = {
  searchParams: Promise<{
    brand?: string;
  }>;
};

export default async function MotocarguerosPage({
  searchParams,
}: MotocarguerosPageProps) {
  const params = await searchParams;
  const selectedBrand = params.brand ?? "";

  const motocargueros = await prisma.motocarro.findMany({
    where: selectedBrand
      ? {
          brand: {
            equals: selectedBrand,
            mode: "insensitive",
          },
        }
      : undefined,
    orderBy: [
      {
        brand: "asc",
      },
      {
        model: "asc",
      },
    ],
  });

  const brands = await prisma.motocarro.findMany({
    select: {
      brand: true,
    },
    distinct: ["brand"],
    orderBy: {
      brand: "asc",
    },
  });

  const formattedMotocargueros = motocargueros.map(
    (motocarro) => ({
      ...motocarro,
      price: motocarro.price
        ? Number(motocarro.price)
        : null,
      horsepower: motocarro.horsepower
        ? Number(motocarro.horsepower)
        : null,
    })
  );

  return (
    <main className="min-h-screen bg-gray-50">
      {/* ENCABEZADO */}
      <section className="bg-gray-900 px-6 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-300">
            Vehículos de carga
          </p>

          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">
            Motocargueros para tu trabajo
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg">
            Conoce nuestra selección de motocargueros
            nuevos para transporte, comercio, trabajo
            rural y diferentes necesidades de carga.
          </p>
        </div>
      </section>

      {/* CONTENIDO */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          {/* FILTROS */}
          <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {formattedMotocargueros.length}{" "}
                {formattedMotocargueros.length === 1
                  ? "modelo"
                  : "modelos"}{" "}
                disponibles
              </p>

              <h2 className="mt-1 text-2xl font-bold text-gray-900">
                Nuestros motocargueros
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/motocargueros"
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  !selectedBrand
                    ? "bg-blue-600 text-white"
                    : "border border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                Todos
              </Link>

              {brands.map((item) => (
                <Link
                  key={item.brand}
                  href={`/motocargueros?brand=${encodeURIComponent(
                    item.brand
                  )}`}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    selectedBrand.toLowerCase() ===
                    item.brand.toLowerCase()
                      ? "bg-blue-600 text-white"
                      : "border border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:text-blue-600"
                  }`}
                >
                  {item.brand}
                </Link>
              ))}
            </div>
          </div>

          {/* RESULTADOS */}
          {formattedMotocargueros.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
              <div className="text-6xl">🚚</div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                No encontramos motocargueros
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                No hay modelos registrados para la marca
                seleccionada.
              </p>

              <Link
                href="/motocargueros"
                className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Ver todos los modelos
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {formattedMotocargueros.map((motocarro) => (
                <MotocarroCard
                  key={motocarro.id}
                  motocarro={motocarro}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}