"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-3 sm:px-6">

        {/* =====================================================
            BARRA PRINCIPAL
        ====================================================== */}
        <div className="flex h-16 items-center gap-2 sm:h-[72px] sm:gap-4">

          {/* MENÚ MÓVIL */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-xl text-gray-700 shadow-sm transition active:scale-95 hover:bg-gray-50 md:hidden"
            aria-label={
              menuOpen ? "Cerrar menú" : "Abrir menú"
            }
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>

          {/* LOGO */}
          <Link
            href="/"
            onClick={closeMenu}
            className="flex min-w-0 shrink-0 items-center gap-2"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-xl shadow-sm sm:h-11 sm:w-11">
              🚚
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-extrabold leading-tight text-gray-900 sm:text-lg">
                Repuestos
              </p>

              <p className="hidden text-[11px] leading-tight text-gray-500 sm:block">
                Tu tienda de confianza
              </p>
            </div>
          </Link>

          {/* MENÚ DESKTOP */}
          <nav className="ml-3 hidden items-center gap-5 lg:ml-6 lg:gap-6 md:flex">
            <Link
              href="/"
              className="whitespace-nowrap text-sm font-medium text-gray-700 transition hover:text-blue-600"
            >
              Inicio
            </Link>

            <Link
              href="/repuestos"
              className="whitespace-nowrap text-sm font-medium text-gray-700 transition hover:text-blue-600"
            >
              Repuestos
            </Link>

            <Link
              href="/motocargueros"
              className="whitespace-nowrap text-sm font-medium text-gray-700 transition hover:text-blue-600"
            >
              Motocargueros
            </Link>

            <Link
              href="/motos"
              className="whitespace-nowrap text-sm font-medium text-gray-700 transition hover:text-blue-600"
            >
              Motos
            </Link>

            <Link
              href="/sobre-nosotros"
              className="whitespace-nowrap text-sm font-medium text-gray-700 transition hover:text-blue-600"
            >
              Nosotros
            </Link>
          </nav>

          {/* BUSCADOR DESKTOP */}
          <div className="ml-auto hidden min-w-0 flex-1 md:block md:max-w-md lg:max-w-lg">
            <Suspense fallback={null}>
              <SearchBar />
            </Suspense>
          </div>

          {/* CARRITO - SIEMPRE A LA DERECHA */}
          <button
            type="button"
            className="ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-xl shadow-sm transition active:scale-95 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 md:ml-3 md:w-auto md:px-4"
            aria-label="Abrir carrito"
          >
            <span aria-hidden="true">🛒</span>

            <span className="ml-2 hidden text-sm font-semibold md:inline">
              Carrito
            </span>
          </button>
        </div>

        {/* =====================================================
            BUSCADOR MÓVIL
        ====================================================== */}
        <div className="pb-3 md:hidden">
          <Suspense fallback={null}>
            <SearchBar />
          </Suspense>
        </div>

        {/* =====================================================
            MENÚ MÓVIL
        ====================================================== */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
            menuOpen
              ? "max-h-[460px] border-t border-gray-100 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-3">

            {/* CABECERA DEL MENÚ */}
            <div className="mb-2 flex items-center justify-between px-2">
              <div>
                <p className="text-sm font-bold text-gray-900">
                  Menú
                </p>

                <p className="text-xs text-gray-500">
                  Explora nuestra tienda
                </p>
              </div>

              <button
                type="button"
                onClick={closeMenu}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                aria-label="Cerrar menú"
              >
                ✕
              </button>
            </div>

            <nav className="grid gap-1">

              {/* INICIO */}
              <Link
                href="/"
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-xl px-3 py-3.5 text-sm font-semibold text-gray-700 transition active:bg-gray-100 hover:bg-gray-50"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-lg">
                  🏠
                </span>

                <span>Inicio</span>

                <span className="ml-auto text-gray-300">
                  →
                </span>
              </Link>

              {/* REPUESTOS */}
              <Link
                href="/repuestos"
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-xl px-3 py-3.5 text-sm font-semibold text-gray-700 transition active:bg-gray-100 hover:bg-gray-50"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-lg">
                  🔧
                </span>

                <span>Repuestos</span>

                <span className="ml-auto text-gray-300">
                  →
                </span>
              </Link>

              {/* MOTOCARGUEROS */}
              <Link
                href="/motocargueros"
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-xl px-3 py-3.5 text-sm font-semibold text-gray-700 transition active:bg-gray-100 hover:bg-gray-50"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-lg">
                  🚚
                </span>

                <span>Motocargueros</span>

                <span className="ml-auto text-gray-300">
                  →
                </span>
              </Link>

              {/* MOTOS */}
              <Link
                href="/motos"
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-xl px-3 py-3.5 text-sm font-semibold text-gray-700 transition active:bg-gray-100 hover:bg-gray-50"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-lg">
                  🏍️
                </span>

                <span>Motos</span>

                <span className="ml-auto text-gray-300">
                  →
                </span>
              </Link>

              {/* SOBRE NOSOTROS */}
              <Link
                href="/sobre-nosotros"
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-xl px-3 py-3.5 text-sm font-semibold text-gray-700 transition active:bg-gray-100 hover:bg-gray-50"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-lg">
                  ℹ️
                </span>

                <span>Sobre nosotros</span>

                <span className="ml-auto text-gray-300">
                  →
                </span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
