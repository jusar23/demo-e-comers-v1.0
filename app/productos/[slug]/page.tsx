import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ImageGallery from "@/components/ImageGallery";
import AddToCartButton from "@/components/cart/AddToCartButton";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
    include: {
      images: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!product) {
    notFound();
  }

  const isAvailable = product.stock > 0;

  // Combinar la imagen principal con las imágenes adicionales.
  // Se eliminan las URLs repetidas para evitar duplicados en la galería.
  const galleryImages = [
    ...(product.image
      ? [
          {
            url: product.image,
            alt: product.name,
          },
        ]
      : []),
    ...product.images.map((image) => ({
      url: image.url,
      alt: image.alt || product.name,
    })),
  ].filter(
    (image, index, images) =>
      image.url.trim() !== "" &&
      images.findIndex(
        (item) => item.url === image.url
      ) === index
  );

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          ← Volver al catálogo
        </Link>

        <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
          <div className="grid md:grid-cols-2">
            {/* Galería de imágenes */}
            <div className="p-6 md:p-8">
              <ImageGallery
                images={galleryImages}
                alt={product.name}
              />
            </div>

            {/* Información del repuesto */}
            <div className="p-8 md:p-12">
              <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {product.category}
              </span>

              <h1 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                {product.name}
              </h1>

              <p className="mt-4 text-gray-500">
                Marca:{" "}
                <span className="font-semibold text-gray-700">
                  {product.brand}
                </span>
              </p>

              <p className="mt-1 text-gray-500">
                Referencia:{" "}
                <span className="font-semibold text-gray-700">
                  {product.reference}
                </span>
              </p>

              <div className="my-8 h-px bg-gray-200" />

              <p className="text-4xl font-bold text-gray-900">
                $
                {Number(product.price).toLocaleString("es-CO")}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Precio en pesos colombianos
              </p>

              <div className="mt-5">
                {isAvailable ? (
                  <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                    <span>✓</span>
                    Producto disponible
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">
                    Producto agotado
                  </div>
                )}
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-900">
                  Descripción
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                  {product.description}
                </p>
              </div>

              {isAvailable ? (
                <AddToCartButton
                  product={{
                    id: product.id,
                    name: product.name,
                    slug: product.slug,
                    reference: product.reference,
                    price: Number(product.price),
                    stock: product.stock,
                    image: product.image,
                  }}
                />
              ) : (
                <button
                  disabled
                  className="mt-8 w-full cursor-not-allowed rounded-xl bg-gray-300 px-6 py-4 font-semibold text-gray-500"
                >
                  Producto agotado
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

