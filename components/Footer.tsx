import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0b1117] text-white">

      {/* =====================================================
          CONTENIDO PRINCIPAL
      ====================================================== */}

      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-14">

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* =================================================
              INFORMACIÓN DE LA TIENDA
          ================================================== */}

          <div>

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl shadow-sm">
                🚚
              </div>

              <div>
                <p className="text-lg font-extrabold">
                  Repuestos
                </p>

                <p className="text-xs text-gray-400">
                  Tu tienda de confianza
                </p>
              </div>

            </div>

            <p className="mt-5 max-w-sm text-sm leading-6 text-gray-400">
              Encuentra repuestos de calidad para motos y
              motocargueros. Te ayudamos a encontrar las
              referencias que necesitas para mantener tu
              vehículo en las mejores condiciones.
            </p>

          </div>

          {/* =================================================
              ENLACES RÁPIDOS
          ================================================== */}

          <div>

            <h3 className="text-sm font-bold uppercase tracking-wider text-blue-400">
              Enlaces rápidos
            </h3>

            <nav className="mt-5 flex flex-col gap-3">

              <Link
                href="/"
                className="text-sm text-gray-400 transition hover:text-white"
              >
                Inicio
              </Link>

              <Link
                href="/repuestos"
                className="text-sm text-gray-400 transition hover:text-white"
              >
                Repuestos
              </Link>

              <Link
                href="/motocargueros"
                className="text-sm text-gray-400 transition hover:text-white"
              >
                Motocargueros
              </Link>

              <Link
                href="/motos"
                className="text-sm text-gray-400 transition hover:text-white"
              >
                Motos
              </Link>

              <Link
                href="/sobre-nosotros"
                className="text-sm text-gray-400 transition hover:text-white"
              >
                Sobre nosotros
              </Link>

            </nav>

          </div>

          {/* =================================================
              CONTACTO
          ================================================== */}

          <div>

            <h3 className="text-sm font-bold uppercase tracking-wider text-blue-400">
              Contáctanos
            </h3>

            <div className="mt-5 space-y-5">

              {/* Teléfono */}
              <div className="flex items-start gap-3">

                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-lg">
                  📞
                </span>

                <div>
                  <p className="text-xs text-gray-500">
                    Teléfono
                  </p>

                  <p className="mt-1 text-sm text-gray-300">
                    +57 300 000 0000
                  </p>
                </div>

              </div>

              {/* Correo */}
              <div className="flex items-start gap-3">

                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-lg">
                  ✉️
                </span>

                <div>
                  <p className="text-xs text-gray-500">
                    Correo electrónico
                  </p>

                  <p className="mt-1 text-sm text-gray-300">
                    contacto@repuestos.com
                  </p>
                </div>

              </div>

              {/* Ubicación */}
              <div className="flex items-start gap-3">

                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-lg">
                  📍
                </span>

                <div>
                  <p className="text-xs text-gray-500">
                    Ubicación
                  </p>

                  <p className="mt-1 text-sm text-gray-300">
                    Colombia
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              REDES / INFORMACIÓN
          ================================================== */}

          <div>

            <h3 className="text-sm font-bold uppercase tracking-wider text-blue-400">
              Síguenos
            </h3>

            <p className="mt-5 text-sm leading-6 text-gray-400">
              Mantente al día con nuestros productos,
              novedades y promociones.
            </p>

            {/* Redes sociales */}

            <div className="mt-5 flex gap-3">

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-lg text-gray-300 transition hover:bg-blue-600 hover:text-white"
              >
                ◎
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-lg font-bold text-gray-300 transition hover:bg-blue-600 hover:text-white"
              >
                f
              </a>

              <a
                href="#"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-lg text-gray-300 transition hover:bg-blue-600 hover:text-white"
              >
                ◉
              </a>

            </div>

            {/* Botón */}

            <Link
              href="/repuestos"
              className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Ver repuestos
            </Link>

          </div>

        </div>

      </div>

      {/* =====================================================
          BARRA INFERIOR
      ====================================================== */}

      <div className="border-t border-white/10 bg-[#080d12]">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-4 text-center sm:flex-row sm:text-left">

          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Repuestos. Todos los derechos reservados.
          </p>

          <p className="text-xs text-gray-600">
            Calidad y confianza para tu vehículo.
          </p>

        </div>

      </div>

    </footer>
  );
}