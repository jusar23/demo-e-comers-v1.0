
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ImageGallery from "@/components/ImageGallery";

type MotoDetailProps = {
  params: Promise<{ slug: string }>;
};

export default async function MotoDetailPage({
  params,
}: MotoDetailProps) {
  const { slug } = await params;

  const moto = await prisma.moto.findUnique({
    where: { slug },
    include: {
      images: {
        orderBy: { position: "asc" },
      },
    },
  });

  if (!moto) {
    notFound();
  }

  const specs = [
    ["Marca", moto.brand],
    ["Modelo", moto.model],
    [
      "Cilindraje",
      moto.displacement != null
        ? `${Number(moto.displacement)} cc`
        : null,
    ],
    [
      "Potencia",
      moto.horsepower != null
        ? `${Number(moto.horsepower)} HP`
        : null,
    ],
    [
      "RPM de potencia",
      moto.horsepowerRpm != null
        ? `${moto.horsepowerRpm} rpm`
        : null,
    ],
    [
      "Torque máximo",
      moto.maxTorque != null
        ? `${Number(moto.maxTorque)} Nm`
        : null,
    ],
    [
      "RPM de torque",
      moto.torqueRpm != null
        ? `${moto.torqueRpm} rpm`
        : null,
    ],
    ["Motor", moto.engineType],
    ["Alimentación", moto.fuelSupply],
    ["Encendido", moto.ignition],
    ["Transmisión", moto.transmission],
    [
      "Capacidad del tanque",
      moto.fuelCapacity != null
        ? `${Number(moto.fuelCapacity)} L`
        : null,
    ],
    ["Relación de compresión", moto.compressionRatio],
    [
      "Largo",
      moto.lengthMm != null
        ? `${moto.lengthMm} mm`
        : null,
    ],
    [
      "Ancho",
      moto.widthMm != null
        ? `${moto.widthMm} mm`
        : null,
    ],
    [
      "Alto",
      moto.heightMm != null
        ? `${moto.heightMm} mm`
        : null,
    ],
    [
      "Altura del asiento",
      moto.seatHeightMm != null
        ? `${moto.seatHeightMm} mm`
        : null,
    ],
    [
      "Distancia al suelo",
      moto.groundClearanceMm != null
        ? `${moto.groundClearanceMm} mm`
        : null,
    ],
    [
      "Peso",
      moto.weightKg != null
        ? `${Number(moto.weightKg)} kg`
        : null,
    ],
    ["Suspensión delantera", moto.frontSuspension],
    ["Suspensión trasera", moto.rearSuspension],
    ["Freno delantero", moto.frontBrake],
    ["Freno trasero", moto.rearBrake],
    ["Rueda delantera", moto.frontWheel],
    ["Rueda trasera", moto.rearWheel],
    ["Equipamiento", moto.equipment],
    ["Certificaciones", moto.certifications],
    [
      "Garantía",
      moto.warrantyYears != null
        ? `${moto.warrantyYears} años`
        : null,
    ],
  ] as const;

  const galleryImages = [
    ...(moto.image
      ? [
          {
            url: moto.image,
            alt: `${moto.brand} ${moto.model}`,
          },
        ]
      : []),
    ...moto.images.map((image) => ({
      url: image.url,
      alt: image.alt,
    })),
  ].filter(
    (image, index, all) =>
      all.findIndex((item) => item.url === image.url) === index
  );

  return (
    <main className="min-h-screen bg-white">
      {/* Navegación */}
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
        <nav className="mx-auto max-w-7xl text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-900">
            Inicio
          </Link>
          {" / "}
          <Link href="/motos" className="hover:text-blue-900">
            Motos Vento
          </Link>
          {" / "}
          <span className="font-semibold text-gray-900">
            {moto.model}
          </span>
        </nav>
      </div>

      {/* Presentación del modelo */}
      <section className="bg-[#080A12] px-6 py-12 text-white sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          {/* Galería de imágenes */}
          <div className="min-w-0">
            <ImageGallery
              alt={`${moto.brand} ${moto.model}`}
              images={galleryImages}
            />

            {moto.colors.length > 0 && (
              <div className="mt-5">
                <p className="text-sm font-semibold text-gray-300">
                  Colores registrados
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {moto.colors.map((color) => (
                    <span
                      key={color}
                      className="rounded-full border border-white/20 px-3 py-1.5 text-sm text-white"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Información principal */}
          <div className="flex flex-col justify-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-300">
              {moto.brand} Motorcycles
            </p>

            <h1 className="mt-4 text-4xl font-black uppercase sm:text-5xl">
              {moto.model}
            </h1>

            <p className="mt-5 leading-7 text-gray-300">
              {moto.description ??
                `Conoce las características de la ${moto.brand} ${moto.model} y consulta con un asesor las condiciones comerciales y disponibilidad.`}
            </p>

            <div className="mt-7 grid grid-cols-2 gap-3">
              <Highlight
                label="Cilindraje"
                value={
                  moto.displacement != null
                    ? `${Number(moto.displacement)} cc`
                    : "Por confirmar"
                }
              />

              <Highlight
                label="Potencia"
                value={
                  moto.horsepower != null
                    ? `${Number(moto.horsepower)} HP`
                    : "Por confirmar"
                }
              />

              <Highlight
                label="Transmisión"
                value={moto.transmission ?? "Por confirmar"}
              />

              <Highlight
                label="Garantía"
                value={
                  moto.warrantyYears != null
                    ? `${moto.warrantyYears} años`
                    : "Por confirmar"
                }
              />
            </div>

            <Link
              href="#contacto"
              className="mt-8 block rounded-xl bg-white px-6 py-4 text-center font-bold text-[#17266F] transition hover:bg-blue-100"
            >
              Contactar a un asesor
            </Link>

            <p className="mt-3 text-center text-xs text-gray-400">
              Consulta precio, disponibilidad y condiciones con
              nuestro equipo comercial.
            </p>
          </div>
        </div>
      </section>

      {/* Ficha técnica */}
      <section className="px-6 py-14 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-bold uppercase tracking-wider text-[#17266F]">
            Información del modelo
          </p>

          <h2 className="mt-2 text-3xl font-black text-gray-950">
            Ficha técnica
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Se muestran las especificaciones registradas para
            este modelo. Los datos no disponibles quedan
            pendientes de confirmar.
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200">
            {specs
              .filter(
                ([, value]) => value != null && value !== ""
              )
              .map(([label, value]) => (
                <div
                  key={label}
                  className="grid gap-1 border-b border-gray-100 px-5 py-4 last:border-b-0 sm:grid-cols-[220px_1fr] sm:gap-6"
                >
                  <p className="text-sm font-semibold text-gray-500">
                    {label}
                  </p>

                  <p className="text-sm font-medium text-gray-900">
                    {value}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section
        id="contacto"
        className="scroll-mt-24 bg-gray-50 px-6 py-14"
      >
        <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-7 text-center sm:p-10">
          <h2 className="text-2xl font-black text-gray-950">
            ¿Te interesa la {moto.model}?
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            Contacta a un asesor para consultar precio,
            disponibilidad, colores y condiciones comerciales.
          </p>

          <p className="mt-5 text-sm text-gray-500">
            El canal de contacto se habilitará cuando se
            configuren los datos comerciales de la tienda.
          </p>

          <Link
            href="/motos"
            className="mt-6 inline-flex rounded-xl bg-[#17266F] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#10194B]"
          >
            Volver al catálogo
          </Link>
        </div>
      </section>
    </main>
  );
}

function Highlight({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs text-gray-400">{label}</p>

      <p className="mt-2 line-clamp-2 font-bold text-white">
        {value}
      </p>
    </div>
  );
}