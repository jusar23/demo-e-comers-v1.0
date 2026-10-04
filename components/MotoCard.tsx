
import Link from "next/link";

type Moto = {
  id: number;
  brand: string;
  model: string;
  slug: string;
  displacement: number | string | null;
  horsepower: number | string | null;
  transmission: string | null;
  colors: string[];
  image: string | null;
  warrantyYears: number | null;
};

export default function MotoCard({ moto }: { moto: Moto }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link
        href={`/motos/${moto.slug}`}
        className="block"
        aria-label={`Ver detalles de ${moto.model}`}
      >
        <div className="relative flex h-64 items-center justify-center overflow-hidden bg-gray-100">
          {moto.image ? (
            <img
              src={moto.image}
              alt={`${moto.brand} ${moto.model}`}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex flex-col items-center justify-center px-6 text-center">
              <img
                src="/vento/logo-vento.png"
                alt="Vento Motorcycles U.S.A."
                className="mb-5 max-h-12 max-w-[190px] object-contain"
              />
              <div className="text-6xl">🏍️</div>
              <p className="mt-3 text-sm font-medium text-gray-500">
                Imagen del modelo próximamente
              </p>
            </div>
          )}

          <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#17266F] shadow">
            Moto nueva
          </span>
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#17266F]">
            Vento Motorcycles
          </p>

          {moto.warrantyYears && (
            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-[#17266F]">
              {moto.warrantyYears} años de garantía*
            </span>
          )}
        </div>

        <Link href={`/motos/${moto.slug}`}>
          <h2 className="mt-3 text-xl font-extrabold text-gray-950 transition hover:text-[#17266F]">
            {moto.model}
          </h2>
        </Link>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-gray-50 p-3">
            <p className="text-xs text-gray-500">Cilindraje</p>
            <p className="mt-1 font-bold text-gray-900">
              {moto.displacement != null
                ? `${Number(moto.displacement).toLocaleString("es-CO")} cc`
                : "Por confirmar"}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-3">
            <p className="text-xs text-gray-500">Potencia</p>
            <p className="mt-1 font-bold text-gray-900">
              {moto.horsepower != null
                ? `${Number(moto.horsepower).toLocaleString("es-CO")} HP`
                : "Por confirmar"}
            </p>
          </div>
        </div>

        {moto.transmission && (
          <p className="mt-4 line-clamp-2 text-sm text-gray-600">
            <span className="font-semibold text-gray-800">
              Transmisión:
            </span>{" "}
            {moto.transmission}
          </p>
        )}

        {moto.colors.length > 0 && (
          <div className="mt-3">
            <p className="text-xs font-semibold text-gray-500">
              Colores disponibles según catálogo
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {moto.colors.map((color) => (
                <span
                  key={color}
                  className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-700"
                >
                  {color}
                </span>
              ))}
            </div>
          </div>
        )}

        <Link
          href={`/motos/${moto.slug}`}
          className="mt-5 block rounded-xl border border-[#17266F] px-4 py-3 text-center text-sm font-bold text-[#17266F] transition hover:bg-blue-50"
        >
          Ver ficha técnica
        </Link>

        <Link
          href={`/motos/${moto.slug}#contacto`}
          className="mt-3 block rounded-xl bg-[#17266F] px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-[#10194B]"
        >
          Contactar a un asesor
        </Link>

        <p className="mt-3 text-center text-xs text-gray-400">
          *Garantía indicada en la información suministrada.
        </p>
      </div>
    </article>
  );
}