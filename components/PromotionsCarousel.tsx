"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const promotions = [
  {
    id: 1,
    title: "Promociones especiales",
    description:
      "Encuentra repuestos seleccionados para el mantenimiento de tu motocarguero.",
    badge: "OFERTAS",
    button: "Ver repuestos",
    href: "/repuestos",
    image:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: 2,
    title: "Equipa tu motocarguero",
    description:
      "Tenemos repuestos y componentes para ayudarte a mantener tu vehículo listo para el trabajo.",
    badge: "PROMOCIÓN",
    button: "Ver repuestos",
    href: "/repuestos",
    image:
      "https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: 3,
    title: "Aprovecha nuestras ofertas",
    description:
      "Consulta nuestras referencias disponibles y encuentra lo que necesitas para tu vehículo.",
    badge: "OFERTA ESPECIAL",
    button: "Explorar catálogo",
    href: "/repuestos",
    image:
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1400&q=85",
  },
];

export default function PromotionsCarousel() {
  const [current, setCurrent] = useState(0);

  function nextPromotion() {
    setCurrent((previous) =>
      previous === promotions.length - 1 ? 0 : previous + 1
    );
  }

  function previousPromotion() {
    setCurrent((previous) =>
      previous === 0 ? promotions.length - 1 : previous - 1
    );
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextPromotion();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const promotion = promotions[current];

  return (
    <section
      id="promociones"
      className="bg-gray-50 px-6 py-14"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
            Ofertas de la tienda
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            Promociones destacadas
          </h2>

          <p className="mt-2 max-w-2xl text-sm text-gray-500 sm:text-base">
            Aprovecha nuestras promociones y encuentra productos
            para el mantenimiento de tu vehículo.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gray-900 shadow-xl">
          <div className="relative min-h-[360px] sm:min-h-[400px]">
            <img
              key={promotion.id}
              src={promotion.image}
              alt={promotion.title}
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />

            <div className="relative flex min-h-[360px] items-center px-8 py-12 sm:min-h-[400px] sm:px-12 lg:px-16">
              <div className="max-w-xl text-white">
                <span className="inline-flex rounded-full bg-blue-600 px-4 py-2 text-xs font-bold uppercase tracking-wider">
                  {promotion.badge}
                </span>

                <h3 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
                  {promotion.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-gray-200 sm:text-base">
                  {promotion.description}
                </p>

                <Link
                  href={promotion.href}
                  className="mt-7 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-bold text-gray-900 transition hover:bg-gray-100"
                >
                  {promotion.button}
                  <span className="ml-2">→</span>
                </Link>
              </div>
            </div>

            <button
              type="button"
              onClick={previousPromotion}
              aria-label="Promoción anterior"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-xl text-white transition hover:bg-black/70 sm:left-5"
            >
              ←
            </button>

            <button
              type="button"
              onClick={nextPromotion}
              aria-label="Siguiente promoción"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-xl text-white transition hover:bg-black/70 sm:right-5"
            >
              →
            </button>

            <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
              {promotions.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrent(index)}
                  aria-label={`Ir a promoción ${index + 1}`}
                  className={`h-2.5 rounded-full transition-all ${
                    current === index
                      ? "w-8 bg-white"
                      : "w-2.5 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}