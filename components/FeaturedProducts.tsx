"use client";

import Link from "next/link";
import { useRef } from "react";
import ProductCard from "@/components/ProductCard";

type Product = {
id: number;
name: string;
slug: string;
reference: string;
price: number | string;
stock: number;
brand: string;
category: string;
image: string | null;
};

type FeaturedProductsProps = {
products: Product[];
};

export default function FeaturedProducts({
products,
}: FeaturedProductsProps) {
const carouselRef = useRef<HTMLDivElement>(null);

function scrollCarousel(direction: "left" | "right") {
const carousel = carouselRef.current;


if (!carousel) return;

const amount = carousel.clientWidth * 0.8;
const maxScroll =
  carousel.scrollWidth - carousel.clientWidth;

if (direction === "right") {
  if (carousel.scrollLeft >= maxScroll - 10) {
    carousel.scrollTo({
      left: 0,
      behavior: "smooth",
    });
  } else {
    carousel.scrollBy({
      left: amount,
      behavior: "smooth",
    });
  }
} else {
  if (carousel.scrollLeft <= 10) {
    carousel.scrollTo({
      left: maxScroll,
      behavior: "smooth",
    });
  } else {
    carousel.scrollBy({
      left: -amount,
      behavior: "smooth",
    });
  }
}


}

return ( <section className="bg-gray-50 px-6 py-14"> <div className="mx-auto max-w-7xl">

    {/* ENCABEZADO */}
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
          Repuestos para tu vehículo
        </p>

        <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
          Repuestos destacados
        </h2>

        <p className="mt-2 max-w-2xl text-sm text-gray-500 sm:text-base">
          Conoce algunos de nuestros repuestos disponibles
          para motocargueros y motos.
        </p>
      </div>

      {/* CONTROLES */}
      <div className="hidden items-center gap-3 sm:flex">
        <button
          type="button"
          onClick={() => scrollCarousel("left")}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-lg text-gray-700 shadow-sm transition hover:bg-gray-100"
          aria-label="Productos anteriores"
        >
          ←
        </button>

        <button
          type="button"
          onClick={() => scrollCarousel("right")}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-lg text-gray-700 shadow-sm transition hover:bg-gray-100"
          aria-label="Siguientes productos"
        >
          →
        </button>

        <Link
          href="/#productos"
          className="ml-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
        >
          Ver todos →
        </Link>
      </div>
    </div>

    {/* PRODUCTOS */}
    {products.length === 0 ? (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
        <div className="text-5xl">🔧</div>

        <h3 className="mt-4 text-lg font-bold text-gray-900">
          No hay productos disponibles
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Cuando agreguemos productos al catálogo aparecerán aquí.
        </p>
      </div>
    ) : (
      <div
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
        style={{
          scrollbarWidth: "none",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[85%] shrink-0 snap-start sm:w-[48%] lg:w-[31%] xl:w-[23%]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    )}

    {/* BOTÓN MÓVIL */}
    <div className="mt-8 sm:hidden">
      <Link
        href="/#productos"
        className="block rounded-xl bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        Ver todos los repuestos →
      </Link>
    </div>

  </div>
</section>

);
}
