import Link from "next/link";

type Product = {
  id: number;
  name: string;
  slug: string;
  reference: string;
  price: number | string;
  stock: number;
  brand: string;
  category: string;
  image: string | null;
};

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  const isAvailable = product.stock > 0;
  const productUrl = `/productos/${product.slug}`;

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Imagen principal */}
      <Link
        href={productUrl}
        className="block"
        aria-label={`Ver ${product.name}`}
      >
        <div className="relative flex h-60 items-center justify-center overflow-hidden bg-gray-100">
          {product.image?.trim() ? (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-contain p-3 transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-5xl" aria-hidden="true">
                🔧
              </span>
              <p className="mt-2 text-sm text-gray-400">
                Imagen próximamente
              </p>
            </div>
          )}

          <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700 shadow">
            {product.category}
          </span>
        </div>
      </Link>

      {/* Información del repuesto */}
      <div className="p-5">
        <p className="text-sm font-medium text-blue-600">
          {product.brand}
        </p>

        <Link href={productUrl}>
          <h2 className="mt-1 line-clamp-2 min-h-14 text-lg font-bold text-gray-900 transition hover:text-blue-600">
            {product.name}
          </h2>
        </Link>

        <p className="mt-2 text-xs text-gray-500">
          Referencia: {product.reference}
        </p>

        <div className="mt-4 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="text-2xl font-bold text-gray-900">
              $
              {Number(product.price).toLocaleString("es-CO")}
            </p>

            <p className="text-xs text-gray-500">
              Precio en COP
            </p>
          </div>

          {isAvailable ? (
            <span className="shrink-0 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
              Disponible
            </span>
          ) : (
            <span className="shrink-0 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
              Agotado
            </span>
          )}
        </div>

        <Link
          href={productUrl}
          className="mt-5 block rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Ver producto
        </Link>
      </div>
    </article>
  );
}

