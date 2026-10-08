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
    <main className="min-h-screen bg-[#080A12] text-white">
      {/* =====================================================
          CONTENIDO PRINCIPAL
          Fondo azul oscuro + negro
      ====================================================== */}

      <div className="relative overflow-hidden bg-[#080A12]">
        {/* HALO AZUL SUPERIOR */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[700px] opacity-90"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(23,38,111,0.75) 0%, rgba(23,38,111,0.35) 30%, rgba(8,10,18,0) 70%)",
          }}
        />

        {/* HALO AZUL LATERAL */}
        <div
          className="pointer-events-none absolute left-[-250px] top-[650px] h-[600px] w-[600px] rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(37,99,235,0.35) 0%, rgba(8,10,18,0) 70%)",
          }}
        />

        {/* HALO AZUL DERECHO */}
        <div
          className="pointer-events-none absolute right-[-300px] top-[1100px] h-[700px] w-[700px] rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(23,38,111,0.65) 0%, rgba(8,10,18,0) 70%)",
          }}
        />

        {/* =====================================================
            ENCABEZADO VENTO
        ====================================================== */}
        <section className="relative overflow-hidden text-white">
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
                className="mt-8 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#17266F] shadow-lg shadow-blue-950/20 transition hover:bg-blue-50 hover:shadow-blue-500/20"
              >
                Explorar modelos
                <span className="ml-2">↓</span>
              </Link>
            </div>

            <div className="flex justify-center lg:justify-end">
              <Image
                src="/vento/logo-vento-blanco.png"
                alt="Vento Motorcycles U.S.A."
                width={520}
                height={180}
                priority
                className="h-auto w-full max-w-[420px] object-contain"
              />
            </div>
          </div>
        </section>



        {/* =====================================================
            CATÁLOGO
        ====================================================== */}
        <section
          id="catalogo"
          className="relative scroll-mt-24 px-6 py-16 sm:py-20"
        >
          <div className="relative mx-auto max-w-7xl">
            {/* ENCABEZADO DEL CATÁLOGO */}
            <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
                  Catálogo oficial de nuestra tienda
                </p>

                <h2 className="mt-3 text-3xl font-black uppercase text-white sm:text-4xl">
                  Modelos Vento
                </h2>

                <div className="mt-4 h-1 w-16 rounded-full bg-blue-500" />

                <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
                  Revisa los modelos disponibles en nuestro
                  catálogo y consulta la ficha técnica de cada
                  motocicleta.
                </p>
              </div>

              <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-sm">
                <p className="text-sm font-semibold text-gray-300">
                  <span className="text-white">
                    {motos.length}
                  </span>{" "}
                  {motos.length === 1
                    ? "modelo"
                    : "modelos"}{" "}
                  registrados
                </p>
              </div>
            </div>

            {/* CATÁLOGO VACÍO */}
            {formattedMotos.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-20 text-center backdrop-blur-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-3xl ring-1 ring-blue-400/20">
                  🏍️
                </div>

                <h3 className="mt-5 text-xl font-bold text-white">
                  Estamos preparando el catálogo
                </h3>

                <p className="mt-3 text-sm text-gray-400">
                  Los modelos aparecerán aquí cuando se carguen
                  en la base de datos.
                </p>
              </div>
            ) : (
              /* =================================================
                 TARJETAS
              ================================================== */
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {formattedMotos.map((moto) => (
                  <MotoCard
                    key={moto.id}
                    moto={moto}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* =====================================================
            SEPARADOR VISUAL
        ====================================================== */}
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
        </div>

        {/* =====================================================
            CONTACTO PROVISIONAL
        ====================================================== */}
        <section
          id="contacto"
          className="relative px-6 py-20"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(circle at 50% 100%, rgba(23,38,111,0.45) 0%, rgba(8,10,18,0) 55%)",
            }}
          />

          <div className="relative mx-auto max-w-4xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-300">
              Atención personalizada
            </p>

            <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
              ¿Te interesa una Vento?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-400">
              Un asesor podrá orientarte sobre el modelo que te
              interesa, su disponibilidad y las condiciones
              comerciales.
            </p>

          </div>
        </section>
      </div>
    </main>
  );
}