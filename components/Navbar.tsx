import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl">
            🚗
          </div>

          <div>
            <p className="text-lg font-bold leading-none text-gray-900">
              Repuestos
            </p>

            <p className="text-xs text-gray-500">
              Tu tienda de confianza
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
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
            Productos
          </Link>

          <Link
            href="/#contacto"
            className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
          >
            Contacto
          </Link>
        </nav>

        <button
          className="rounded-xl border px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          type="button"
        >
          🛒 Carrito
        </button>
      </div>
    </header>
  );
}