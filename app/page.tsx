import Link from "next/link";
import { prisma } from "@/lib/prisma";

import BannerRotativo from "@/components/BannerRotativo";
import CategorySection from "@/components/CategorySection";
import ProductCard from "@/components/ProductCard";
import MotocarroCard from "@/components/MotocarroCard";
import PromotionsCarousel from "@/components/PromotionsCarousel";

export default async function Home() {
  const [featuredProducts, featuredMotocarros] =
    await Promise.all([
      prisma.product.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 4,
      }),

      prisma.motocarro.findMany({
        orderBy: [
          {
            brand: "asc",
          },
          {
            model: "asc",
          },
        ],
        take: 4,
      }),
    ]);

  const formattedProducts = featuredProducts.map(
    (product) => ({
      ...product,
      price: Number(product.price),
    })
  );

  const formattedMotocarros = featuredMotocarros.map(
    (motocarro) => ({
      ...motocarro,
      price: motocarro.price
        ? Number(motocarro.price)
        : null,
      horsepower: motocarro.horsepower
        ? Number(motocarro.horsepower)
        : null,
      fuelTank: motocarro.fuelTank
        ? Number(motocarro.fuelTank)
        : null,
    })
  );

  return (
    <main className="min-h-screen bg-gray-50">

      {/* =========================================
          BANNER PRINCIPAL
      ========================================= */}
      <BannerRotativo />

      {/* =========================================
          CATEGORÍAS
      ========================================= */}
      <CategorySection />

      {/* =========================================
          MOTOCARGUEROS DESTACADOS
      ========================================= */}
      <section className="bg-white px-6 py-14">
        <div className="mx-auto max-w-7xl">

          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                Vehículos de trabajo
              </p>

              <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                Motocargueros destacados
              </h2>

              <p className="mt-2 max-w-2xl text-sm text-gray-500 sm:text-base">
                Conoce algunos de nuestros motocargueros
                disponibles para diferentes necesidades de
                trabajo y transporte.
              </p>
            </div>

            <Link
              href="/motocargueros"
              className="hidden shrink-0 text-sm font-semibold text-blue-600 transition hover:text-blue-700 sm:block"
            >
              Ver todos →
            </Link>
          </div>

          {formattedMotocarros.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">
              <div className="text-5xl">🚚</div>

              <h3 className="mt-4 text-lg font-bold text-gray-900">
                Próximamente
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Estamos preparando nuestro catálogo de
                motocargueros.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {formattedMotocarros.map((motocarro) => (
                <MotocarroCard
                  key={motocarro.id}
                  motocarro={motocarro}
                />
              ))}
            </div>
          )}

          <div className="mt-8 sm:hidden">
            <Link
              href="/motocargueros"
              className="block rounded-xl bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Ver todos los motocargueros →
            </Link>
          </div>

        </div>
      </section>

      {/* =========================================
          MOTOS
      ========================================= */}
      <section className="bg-gray-50 px-6 py-14">
        <div className="mx-auto max-w-7xl">

          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm sm:p-12">
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">

              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                  Motos nuevas
                </p>

                <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                  Próximamente tendremos nuestras motos
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
                  Estamos preparando esta sección para
                  ofrecerte información sobre nuestras motos
                  nuevas, modelos disponibles y sus
                  especificaciones.
                </p>
              </div>

              <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl bg-blue-50 text-6xl">
                🏍️
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =========================================
          PROMOCIONES
      ========================================= */}
      <PromotionsCarousel />

      {/* =========================================
          REPUESTOS DESTACADOS
      ========================================= */}
      <section className="bg-white px-6 py-14">
        <div className="mx-auto max-w-7xl">

          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                Repuestos para tu vehículo
              </p>

              <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                Repuestos destacados
              </h2>

              <p className="mt-2 max-w-2xl text-sm text-gray-500 sm:text-base">
                Algunas de nuestras referencias disponibles.
                Consulta el catálogo completo para encontrar
                el repuesto que necesitas.
              </p>
            </div>

            <Link
              href="/repuestos"
              className="hidden shrink-0 text-sm font-semibold text-blue-600 transition hover:text-blue-700 sm:block"
            >
              Ver todos →
            </Link>
          </div>

          {formattedProducts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">
              <div className="text-5xl">🔧</div>

              <h3 className="mt-4 text-lg font-bold text-gray-900">
                No hay repuestos destacados
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Cuando agreguemos productos aparecerán aquí.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {formattedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          )}

          <div className="mt-8 sm:hidden">
            <Link
              href="/repuestos"
              className="block rounded-xl bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Ver catálogo de repuestos →
            </Link>
          </div>

        </div>
      </section>

      {/* =========================================
          CONTACTO
      ========================================= */}
      <section
        id="contacto"
        className="border-t bg-gray-50 px-6 py-16"
      >
        <div className="mx-auto max-w-7xl">

          <div className="rounded-3xl bg-gray-900 px-8 py-12 text-center sm:px-12">

            <p className="text-sm font-bold uppercase tracking-wider text-blue-400">
              Estamos para ayudarte
            </p>

            <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              ¿Necesitas encontrar un repuesto?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base">
              Comunícate con nosotros y te ayudaremos a
              encontrar la referencia que necesitas para tu
              motocarguero o motocicleta.
            </p>

            <button
              type="button"
              className="mt-7 rounded-xl bg-blue-600 px-7 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Contactarnos
            </button>

          </div>

        </div>
      </section>

    </main>
  );
}