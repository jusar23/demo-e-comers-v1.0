import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { companyInfo } from "@/data/company";

export default async function SobreNosotrosPage() {
  const branches = await prisma.companyBranch.findMany({
  where: {
    active: true,
  },
  orderBy: {
    position: "asc",
  },
});

const galleryImages = await prisma.galleryImage.findMany({
  where: {
    active: true,
  },
  orderBy: {
    position: "asc",
  },
});
 
  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-20">
          <Image
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2000&q=80"
            alt="Instalaciones y operaciones de la empresa"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="absolute inset-0 -z-10 bg-slate-950/70" />

        <div className="mx-auto max-w-7xl px-6 py-32 lg:px-8">
          <div className="max-w-3xl text-white">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
              {companyInfo.hero.eyebrow}
            </p>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {companyInfo.hero.title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              {companyInfo.hero.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/repuestos"
                className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Ver repuestos
              </Link>

              <Link
                href="/contacto"
                className="rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Contáctanos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HISTORIA */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              Nuestra historia
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {companyInfo.history.title}
            </h2>

            <div className="mt-6 space-y-5 text-base leading-7 text-slate-600">
              {companyInfo.history.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="relative h-[420px] overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1565610222536-ef125c59da2e?auto=format&fit=crop&w=1400&q=80"
              alt="Historia de la empresa"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ESTADO ACTUAL */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              Actualmente
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {companyInfo.current.title}
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              {companyInfo.current.description}
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {companyInfo.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-3xl font-bold text-blue-600">
                  {stat.number}
                </p>

                <p className="mt-2 text-sm font-medium text-slate-600">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Galería
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Conoce nuestro trabajo
          </h2>

          <p className="mt-4 text-slate-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Suspendisse potenti. Integer vitae turpis vel neque consequat
            elementum.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className={`relative overflow-hidden rounded-2xl ${
                index === 0
                  ? "h-[420px] sm:row-span-2"
                  : "h-[200px]"
              }`}
            >
              <Image
                src={image.url}
                alt={image.alt ?? image.title ?? "Imagen de la empresa"}
                fill
                className="object-cover transition duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      {/* SEDES */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-3xl text-white">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Nuestras sedes
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Estamos cerca de nuestros clientes
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {branches.map((branch) => (
              <article
                key={branch.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-blue-400">
                      {branch.city}
                    </p>

                    <h3 className="mt-1 text-xl font-bold text-white">
                      {branch.name}
                    </h3>
                  </div>

                  <div className="rounded-full bg-blue-600/20 px-3 py-1 text-xs font-semibold text-blue-300">
                    Sede
                  </div>
                </div>

                <div className="mt-6 space-y-3 text-sm text-slate-300">
                  <p>
                    <span className="font-semibold text-white">
                      Dirección:
                    </span>{" "}
                    {branch.address}
                  </p>

                  {branch.phone && (
                    <p>
                      <span className="font-semibold text-white">
                        Teléfono:
                      </span>{" "}
                      {branch.phone}
                    </p>
                  )}

                  {branch.email && (
                    <p>
                      <span className="font-semibold text-white">
                        Correo:
                      </span>{" "}
                      {branch.email}
                    </p>
                  )}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {branch.whatsapp && (
                    <a
                      href={`https://wa.me/${branch.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
                    >
                      WhatsApp
                    </a>
                  )}

                  <button
                    type="button"
                    className="rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
                  >
                    Ver ubicación
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-blue-600 px-6 py-12 text-center sm:px-12">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            ¿Necesitas un repuesto?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Encuentra las referencias que necesitas para mantener tu
            motocarguero siempre listo para trabajar.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/repuestos"
              className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              Ver repuestos
            </Link>

            <Link
              href="/contacto"
              className="rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Contactarnos
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}