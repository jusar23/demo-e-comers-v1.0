"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const banners = [
  {
    id: 1,
    eyebrow: "PROMOCIÓN DE LA SEMANA",
    title: "Repuestos para mantener tu motocarguero en marcha",
    description:
      "Encuentra kits de freno, filtros, piezas de motor y mucho más.",
    buttonText: "Ver repuestos",
    buttonHref: "/#productos",
    image:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1400&q=85",
    position: "center",
  },
  {
    id: 2,
    eyebrow: "MOTOCARGUEROS NUEVOS",
    title: "El vehículo ideal para tu trabajo",
    description:
      "Conoce nuestros motocargueros disponibles y encuentra el modelo adecuado para tus necesidades.",
    buttonText: "Ver motocargueros",
    buttonHref: "/motocargueros",
    image:
      "https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&w=1400&q=85",
    position: "center",
  },
  {
    id: 3,
    eyebrow: "MOTOS NUEVAS",
    title: "Muévete con confianza y estilo",
    description:
      "Descubre nuestras motos nuevas y consulta las referencias disponibles.",
    buttonText: "Ver motos",
    buttonHref: "/motos",
    image:
      "https://images.unsplash.com/photo-1558980664-10ea9d8e4d8a?auto=format&fit=crop&w=1400&q=85",
    position: "center",
  },
  {
    id: 4,
    eyebrow: "OFERTAS ESPECIALES",
    title: "Aprovecha nuestras promociones",
    description:
      "Tenemos productos seleccionados para ayudarte a ahorrar en el mantenimiento de tu vehículo.",
    buttonText: "Ver promociones",
    buttonHref: "/#promociones",
    image:
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1400&q=85",
    position: "center",
  },
];

export default function BannerRotativo() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeBanner = banners[current];

  function nextBanner() {
    setCurrent((previous) =>
      previous === banners.length - 1 ? 0 : previous + 1
    );
  }

  function previousBanner() {
    setCurrent((previous) =>
      previous === 0 ? banners.length - 1 : previous - 1
    );
  }

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const interval = setInterval(() => {
      nextBanner();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      className="relative overflow-hidden bg-gray-900"
      aria-label="Promociones destacadas"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative h-[420px] sm:h-[460px] lg:h-[500px]">
        <img
          key={activeBanner.id}
          src={activeBanner.image}
          alt={activeBanner.title}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            objectPosition: activeBanner.position,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />

        <div className="relative mx-auto flex h-full max-w-7xl items-center px-6 py-12 sm:px-8 lg:px-12">
          <div className="max-w-2xl text-white">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-300">
              {activeBanner.eyebrow}
            </p>

            <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              {activeBanner.title}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-gray-200 sm:text-lg">
              {activeBanner.description}
            </p>

            <Link
              href={activeBanner.buttonHref}
              className="mt-8 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              {activeBanner.buttonText}
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>

        <button
          type="button"
          onClick={previousBanner}
          aria-label="Banner anterior"
          className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-xl text-white transition hover:bg-black/70 sm:left-6"
        >
          ←
        </button>

        <button
          type="button"
          onClick={nextBanner}
          aria-label="Siguiente banner"
          className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-xl text-white transition hover:bg-black/70 sm:right-6"
        >
          →
        </button>

        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2">
          {banners.map((banner, index) => (
            <button
              key={banner.id}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`Ir al banner ${index + 1}`}
              aria-current={current === index}
              className={`h-2.5 rounded-full transition-all ${
                current === index
                  ? "w-8 bg-white"
                  : "w-2.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}