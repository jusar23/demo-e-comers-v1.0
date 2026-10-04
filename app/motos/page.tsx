
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import MotoCard from "@/components/MotoCard";


export default async function MotosPage() {
  const motos = await prisma.moto.findMany({
  orderBy: {
    model: "asc",
  },
});

console.log("========== MOTOS ==========");
console.log(motos);
console.log("TOTAL:", motos.length);

  const formattedMotos = motos.map((moto) => ({
  ...moto,
  displacement:
    moto.displacement !== null
      ? Number(moto.displacement)
      : null,
  horsepower:
    moto.horsepower !== null
      ? Number(moto.horsepower)
      : null,
}));

  return (
    <main className="min-h-screen bg-white">
      {/* Encabezado Vento */}
      <section className="relative overflow-hidden bg-[#080A12] text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#17266F]/70 via-transparent to-black/50" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 sm:py-20 lg:grid-cols-[1fr_auto] lg:py-24">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-300">
              Motos nuevas de concesionario
            </p>

            <h1 className="mt-4 text-4xl font-black uppercase leading-tight sm:text-5xl lg:text-6xl">
              Encuentra tu
              <span className="block text-blue-300">
                próxima Vento
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg">
              Conoce nuestra selección de motocicletas Vento.
              Explora sus características, consulta sus fichas
              técnicas y contacta a un asesor para recibir
              información comercial.
            </p>

            <Link
              href="#catalogo"
              className="mt-8 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#17266F] transition hover:bg-blue-50"
            >
              Explorar modelos
              <span className="ml-2">↓</span>
            </Link>
          </div>

          <div className="flex justify-center lg:justify-end">
            <Image
              src="/vento/logo-vento.png"
              alt="Vento Motorcycles U.S.A."
              width={520}
              height={180}
              priority
              className="h-auto w-full max-w-[420px] object-contain"
            />
          </div>
        </div>
      </section>

      {/* Información comercial */}
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 py-6 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
              🏍️
            </span>
            <div>
              <p className="font-bold text-gray-900">
                Modelos Vento
              </p>
              <p className="text-sm text-gray-500">
                Consulta sus características
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
              📋
            </span>
            <div>
              <p className="font-bold text-gray-900">
                Fichas técnicas
              </p>
              <p className="text-sm text-gray-500">
                Especificaciones disponibles
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
              👨‍💼
            </span>
            <div>
              <p className="font-bold text-gray-900">
                Atención personalizada
              </p>
              <p className="text-sm text-gray-500">
                Contacta a un asesor
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo */}
      <section
        id="catalogo"
        className="scroll-mt-24 px-6 py-14 sm:py-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-[#17266F]">
                Catálogo oficial de nuestra tienda
              </p>

              <h2 className="mt-2 text-3xl font-black uppercase text-gray-950">
                Modelos Vento
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
                Revisa los modelos disponibles en nuestro catálogo
                y consulta la ficha técnica de cada motocicleta.
              </p>
            </div>

            <p className="text-sm font-semibold text-gray-500">
              {motos.length}{" "}
              {motos.length === 1 ? "modelo" : "modelos"} registrados
            </p>
          </div>

          {formattedMotos.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 px-6 py-16 text-center">
              <h3 className="text-xl font-bold text-gray-900">
                Estamos preparando el catálogo
              </h3>
              <p className="mt-3 text-sm text-gray-500">
                Los modelos aparecerán aquí cuando se carguen
                en la base de datos.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {formattedMotos.map((moto) => (
                <MotoCard key={moto.id} moto={moto} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contacto provisional */}
      <section
        id="contacto"
        className="bg-[#080A12] px-6 py-14 text-white"
      >
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-300">
            Atención personalizada
          </p>

          <h2 className="mt-3 text-3xl font-black">
            ¿Te interesa una Vento?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-300">
            Un asesor podrá orientarte sobre el modelo que te
            interesa, su disponibilidad y las condiciones
            comerciales.
          </p>

          <p className="mt-5 text-sm text-gray-400">
            El canal de contacto se configurará cuando tengamos
            los datos comerciales de la tienda.
          </p>
        </div>
      </section>
    </main>
  );
}