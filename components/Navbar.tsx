"use client";

import Link from "next/link";
import { useState } from "react";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* =========================
            NAVBAR PRINCIPAL
        ========================== */}
        <div className="flex h-16 items-center justify-between gap-3">

          {/* Botón menú móvil */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-xl text-gray-700 transition hover:bg-gray-50 md:hidden"
            aria-label="Abrir menú"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenu}
            className="flex shrink-0 items-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl">
              🚚
            </div>

            <div>
              <p className="text-base font-bold leading-none text-gray-900 sm:text-lg">
                Repuestos
              </p>

              <p className="hidden text-xs text-gray-500 sm:block">
                Tu tienda de confianza
              </p>
            </div>
          </Link>

          {/* =========================
              MENÚ PC
          ========================== */}
          <nav className="hidden items-center gap-6 md:flex">

            <Link
              href="/"
              className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
            >
              Inicio
            </Link>

            <Link
              href="/#productos"
              className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
            >
              Repuestos
            </Link>

            <Link
              href="/motocargueros"
              className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
            >
              Motocargueros
            </Link>

            <Link
              href="/motos"
              className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
            >
              Motos
            </Link>

            <Link
              href="/promociones"
              className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
            >
              Promociones
            </Link>

          </nav>

          {/* =========================
              BUSCADOR PC
          ========================== */}
          <div className="hidden flex-1 md:block md:max-w-md">
            <SearchBar />
          </div>

          {/* =========================
              CARRITO
          ========================== */}
          <button
            type="button"
            className="shrink-0 rounded-xl border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            🛒 <span className="hidden sm:inline">Carrito</span>
          </button>
        </div>

        {/* =========================
            BUSCADOR MÓVIL
        ========================== */}
        <div className="pb-3 md:hidden">
          <SearchBar />
        </div>

        {/* =========================
            MENÚ MÓVIL
        ========================== */}
        {menuOpen && (
          <div className="border-t border-gray-100 py-3 md:hidden">

            <nav className="flex flex-col">

              <Link
                href="/"
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <span className="text-lg">🏠</span>
                Inicio
              </Link>

              <Link
                href="/#productos"
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <span className="text-lg">🔧</span>
                Repuestos
              </Link>

              <Link
                href="/motocargueros"
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <span className="text-lg">🚚</span>
                Motocargueros
              </Link>

              <Link
                href="/motos"
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <span className="text-lg">🏍️</span>
                Motos
              </Link>

              <Link
                href="/promociones"
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <span className="text-lg">🔥</span>
                Promociones
              </Link>

              <Link
                href="/#contacto"
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <span className="text-lg">📞</span>
                Contacto
              </Link>

            </nav>
          </div>
        )}
      </div>
    </header>
  );
}