import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

import MotocarroGallery from "@/components/MotocarroGallery";

type MotocarroDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function MotocarroDetailPage({
  params,
}: MotocarroDetailPageProps) {
  const { slug } = await params;

  const motocarro = await prisma.motocarro.findUnique({
    where: {
      slug,
    },
  });

  if (!motocarro) {
    notFound();
  }

  const price = motocarro.price
    ? Number(motocarro.price)
    : null;

  const horsepower = motocarro.horsepower
    ? Number(motocarro.horsepower)
    : null;

  return (
    <main className="min-h-screen bg-gray-50">

      {/* MIGAS DE NAVEGACIÓN */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4">

          <div className="flex items-center gap-2 text-sm text-gray-500">

            <Link
              href="/"
              className="transition hover:text-blue-600"
            >
              Inicio
            </Link>

            <span>/</span>

            <Link
              href="/motocargueros"
              className="transition hover:text-blue-600"
            >
              Motocargueros
            </Link>

            <span>/</span>

            <span className="font-medium text-gray-900">
              {motocarro.model}
            </span>

          </div>

        </div>
      </div>

      {/* INFORMACIÓN PRINCIPAL */}
      <section className="px-6 py-10 sm:py-14">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-10 lg:grid-cols-2">

            {/* GALERÍA */}
            <MotocarroGallery
              images={motocarro.images}
              fallbackImage={motocarro.image}
              name={`${motocarro.brand} ${motocarro.model}`}
            />

            {/* INFORMACIÓN */}
            <div className="flex flex-col justify-center">

              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                Motocarguero
              </p>

              <h1 className="mt-3 text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl">
                {motocarro.model}
              </h1>

              {motocarro.description && (
                <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
                  {motocarro.description}
                </p>
              )}

              {/* PRECIO */}
              <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5">

                {price ? (
                  <>
                    <p className="text-sm text-gray-500">
                      Precio
                    </p>

                    <p className="mt-1 text-3xl font-extrabold text-gray-900">
                      ${price.toLocaleString("es-CO")}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Precio de referencia en pesos colombianos
                    </p>
                  </>
                ) : (
                  <p className="text-lg font-bold text-gray-900">
                    Consultar precio
                  </p>
                )}

              </div>

              {/* DATOS DESTACADOS */}
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">

                <div className="rounded-2xl bg-white p-4 shadow-sm">

                  <p className="text-xs text-gray-500">
                    Cilindraje
                  </p>

                  <p className="mt-1 font-bold text-gray-900">
                    {motocarro.displacement
                      ? `${motocarro.displacement} cc`
                      : "—"}
                  </p>

                </div>

                <div className="rounded-2xl bg-white p-4 shadow-sm">

                  <p className="text-xs text-gray-500">
                    Potencia
                  </p>

                  <p className="mt-1 font-bold text-gray-900">
                    {horsepower
                      ? `${horsepower} HP`
                      : "—"}
                  </p>

                </div>

                <div className="rounded-2xl bg-white p-4 shadow-sm">

                  <p className="text-xs text-gray-500">
                    Carga
                  </p>

                  <p className="mt-1 font-bold text-gray-900">
                    {motocarro.loadCapacity
                      ? `${motocarro.loadCapacity.toLocaleString(
                          "es-CO"
                        )} kg`
                      : "—"}
                  </p>

                </div>

              </div>

              {/* BOTONES */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                <Link
                  href="/#contacto"
                  className="flex-1 rounded-xl bg-blue-600 px-6 py-4 text-center text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  Consultar este modelo
                </Link>

                <Link
                  href="/motocargueros"
                  className="flex-1 rounded-xl border border-gray-300 bg-white px-6 py-4 text-center text-sm font-bold text-gray-700 transition hover:border-blue-300 hover:text-blue-600"
                >
                  Ver otros modelos
                </Link>

              </div>

            </div>

          </div>

          {/* FICHA TÉCNICA */}
          <section className="mt-14">

            <div className="mb-7">

              <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                Especificaciones
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                Ficha técnica
              </h2>

            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

              <div className="grid md:grid-cols-2">

                <TechnicalRow
                  label="Marca"
                  value={motocarro.brand}
                />

                <TechnicalRow
                  label="Referencia"
                  value={motocarro.model}
                />

                <TechnicalRow
                  label="Motor"
                  value={motocarro.engineType}
                />

                <TechnicalRow
                  label="Cilindraje"
                  value={
                    motocarro.displacement
                      ? `${motocarro.displacement} cc`
                      : null
                  }
                />

                <TechnicalRow
                  label="Potencia"
                  value={
                    horsepower
                      ? `${horsepower} HP`
                      : null
                  }
                />

                <TechnicalRow
                  label="Torque máximo"
                  value={
                    motocarro.maxTorque
                      ? `${Number(
                          motocarro.maxTorque
                        )} Nm`
                      : null
                  }
                />

                <TechnicalRow
                  label="Refrigeración"
                  value={motocarro.refrigeration}
                />

                <TechnicalRow
                  label="Transmisión"
                  value={motocarro.transmission}
                />

                <TechnicalRow
                  label="Arranque"
                  value={motocarro.starter}
                />

                <TechnicalRow
                  label="Capacidad de carga"
                  value={
                    motocarro.loadCapacity
                      ? `${motocarro.loadCapacity.toLocaleString(
                          "es-CO"
                        )} kg`
                      : null
                  }
                />

                <TechnicalRow
                  label="Capacidad del tanque"
                  value={
                    motocarro.fuelTank
                      ? `${Number(
                          motocarro.fuelTank
                        )} galones`
                      : null
                  }
                />

                <TechnicalRow
                  label="Suspensión delantera"
                  value={motocarro.frontSuspension}
                />

                <TechnicalRow
                  label="Suspensión trasera"
                  value={motocarro.rearSuspension}
                />

                <TechnicalRow
                  label="Freno delantero"
                  value={motocarro.frontBrake}
                />

                <TechnicalRow
                  label="Freno trasero"
                  value={motocarro.rearBrake}
                />

                <TechnicalRow
                  label="Dimensiones"
                  value={motocarro.bodyDimensions}
                />

                <TechnicalRow
                  label="Llantas"
                  value={motocarro.tires}
                />

              </div>

              {motocarro.equipment && (
                <div className="border-t border-gray-200 p-6">

                  <p className="text-sm font-semibold text-gray-500">
                    Equipamiento
                  </p>

                  <p className="mt-2 leading-7 text-gray-800">
                    {motocarro.equipment}
                  </p>

                </div>
              )}

            </div>

          </section>

        </div>

      </section>

    </main>
  );
}

function TechnicalRow({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) {
  return (
    <div className="border-b border-gray-200 p-5 last:border-b-0">

      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-gray-900">
        {value || "No especificado"}
      </p>

    </div>
  );
}
