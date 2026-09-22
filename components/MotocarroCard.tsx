import Link from "next/link";

type Motocarro = {
  id: number;
  brand: string;
  model: string;
  slug: string;
  description: string | null;
  price: number | string | null;
  stock: number;
  displacement: number | null;
  horsepower: number | string | null;
  loadCapacity: number | null;
  image: string | null;
};

export default function MotocarroCard({
  motocarro,
}: {
  motocarro: Motocarro;
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link
        href={`/motocargueros/${motocarro.slug}`}
        className="block"
      >
        <div className="relative flex h-64 items-center justify-center overflow-hidden bg-gray-100">
          {motocarro.image ? (
            <img
              src={motocarro.image}
              alt={`${motocarro.brand} ${motocarro.model}`}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
              <div className="text-6xl">🚚</div>
              <p className="mt-3 text-sm font-medium text-gray-400">
                Imagen próximamente
              </p>
            </div>
          )}

          <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-bold text-gray-700 shadow">
            {motocarro.brand}
          </span>
        </div>
      </Link>

      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          Motocarguero
        </p>

        <Link href={`/motocargueros/${motocarro.slug}`}>
          <h2 className="mt-1 text-xl font-bold text-gray-900 transition hover:text-blue-600">
            {motocarro.model}
          </h2>
        </Link>

        {motocarro.description && (
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
            {motocarro.description}
          </p>
        )}

        <div className="mt-5 grid grid-cols-2 gap-3">
          {motocarro.displacement && (
            <div className="rounded-xl bg-gray-50 p-3">
              <p className="text-xs text-gray-400">
                Cilindraje
              </p>
              <p className="mt-1 font-bold text-gray-900">
                {motocarro.displacement} cc
              </p>
            </div>
          )}

          {motocarro.loadCapacity && (
            <div className="rounded-xl bg-gray-50 p-3">
              <p className="text-xs text-gray-400">
                Capacidad
              </p>
              <p className="mt-1 font-bold text-gray-900">
                {motocarro.loadCapacity.toLocaleString("es-CO")} kg
              </p>
            </div>
          )}
        </div>

        <div className="mt-5 flex items-end justify-between gap-3">
          <div>
            {motocarro.price ? (
              <>
                <p className="text-2xl font-bold text-gray-900">
                  $
                  {Number(motocarro.price).toLocaleString(
                    "es-CO"
                  )}
                </p>
                <p className="text-xs text-gray-500">
                  Precio en COP
                </p>
              </>
            ) : (
              <p className="text-sm font-semibold text-gray-500">
                Consultar precio
              </p>
            )}
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              motocarro.stock > 0
                ? "bg-green-50 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {motocarro.stock > 0
              ? "Disponible"
              : "Consultar disponibilidad"}
          </span>
        </div>

        <Link
          href={`/motocargueros/${motocarro.slug}`}
          className="mt-5 block rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Ver ficha técnica
        </Link>
      </div>
    </article>
  );
}