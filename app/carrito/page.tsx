"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";

export default function CarritoPage() {
  const {
    items,
    totalItems,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
  } = useCart();

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50">

        <section className="bg-gray-900 px-6 py-14">
          <div className="mx-auto max-w-7xl">

            <p className="text-sm font-bold uppercase tracking-wider text-blue-400">
              Carrito de compras
            </p>

            <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              Tu carrito está vacío
            </h1>

          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-16">

          <div className="rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">

            <div className="text-6xl">
              🛒
            </div>

            <h2 className="mt-5 text-2xl font-bold text-gray-900">
              No tienes repuestos en tu carrito
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
              Explora nuestro catálogo y agrega los
              repuestos que necesitas.
            </p>

            <Link
              href="/repuestos"
              className="mt-7 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Ver repuestos
            </Link>

          </div>

        </section>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* =====================================================
          ENCABEZADO
      ====================================================== */}

      <section className="bg-gray-900 px-6 py-12">
        <div className="mx-auto max-w-7xl">

          <p className="text-sm font-bold uppercase tracking-wider text-blue-400">
            Carrito de compras
          </p>

          <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>
              <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
                Tus repuestos
              </h1>

              <p className="mt-2 text-sm text-gray-300">
                {totalItems}{" "}
                {totalItems === 1
                  ? "unidad"
                  : "unidades"}{" "}
                en el carrito
              </p>
            </div>

            <button
              type="button"
              onClick={clearCart}
              className="text-sm font-semibold text-red-400 transition hover:text-red-300"
            >
              Vaciar carrito
            </button>

          </div>

        </div>
      </section>

      {/* =====================================================
          CONTENIDO
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-10">

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

          {/* =================================================
              PRODUCTOS
          ================================================== */}

          <div className="space-y-4">

            {items.map((item) => {

              const subtotal =
                item.price * item.quantity;

              return (
                <article
                  key={item.id}
                  className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
                >

                  <div className="flex gap-4">

                    {/* IMAGEN */}

                    <Link
                      href={`/productos/${item.slug}`}
                      className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100 sm:h-28 sm:w-28"
                    >
                      {item.image?.trim() ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-contain p-2"
                        />
                      ) : (
                        <span className="text-4xl">
                          🔧
                        </span>
                      )}
                    </Link>

                    {/* INFORMACIÓN */}

                    <div className="min-w-0 flex-1">

                      <div className="flex items-start justify-between gap-3">

                        <div>
                          <Link
                            href={`/productos/${item.slug}`}
                            className="text-base font-bold text-gray-900 hover:text-blue-600 sm:text-lg"
                          >
                            {item.name}
                          </Link>

                          <p className="mt-1 text-xs text-gray-500">
                            Ref. {item.reference}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removeItem(item.id)
                          }
                          className="shrink-0 text-sm text-red-500 hover:text-red-700"
                          aria-label={`Eliminar ${item.name}`}
                        >
                          Eliminar
                        </button>

                      </div>

                      <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

                        {/* PRECIO UNITARIO */}

                        <div>
                          <p className="text-xs text-gray-500">
                            Precio unitario
                          </p>

                          <p className="mt-1 text-sm font-semibold text-gray-800">
                            $
                            {item.price.toLocaleString(
                              "es-CO"
                            )}
                          </p>
                        </div>

                        {/* CANTIDAD */}

                        <div>
                          <p className="mb-1 text-xs text-gray-500">
                            Cantidad
                          </p>

                          <div className="flex items-center overflow-hidden rounded-xl border border-gray-300">

                            <button
                              type="button"
                              onClick={() =>
                                decreaseQuantity(
                                  item.id
                                )
                              }
                              className="flex h-10 w-10 items-center justify-center text-lg font-bold text-gray-600 transition hover:bg-gray-100"
                            >
                              −
                            </button>

                            <span className="flex h-10 min-w-12 items-center justify-center border-x border-gray-300 px-3 text-sm font-bold text-gray-900">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                increaseQuantity(
                                  item.id
                                )
                              }
                              disabled={
                                item.quantity >=
                                item.stock
                              }
                              className="flex h-10 w-10 items-center justify-center text-lg font-bold text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-300"
                            >
                              +
                            </button>

                          </div>

                          <p className="mt-1 text-[11px] text-gray-400">
                            Stock disponible:{" "}
                            {item.stock}
                          </p>
                        </div>

                        {/* SUBTOTAL */}

                        <div className="sm:text-right">

                          <p className="text-xs text-gray-500">
                            Subtotal
                          </p>

                          <p className="mt-1 text-lg font-extrabold text-gray-900">
                            $
                            {subtotal.toLocaleString(
                              "es-CO"
                            )}
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                </article>
              );
            })}

          </div>

          {/* =================================================
              RESUMEN
          ================================================== */}

          <aside className="lg:sticky lg:top-28 lg:h-fit">

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold text-gray-900">
                Resumen del pedido
              </h2>

              <div className="mt-6 space-y-4">

                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-gray-500">
                    Productos diferentes
                  </span>

                  <span className="font-semibold text-gray-900">
                    {items.length}
                  </span>
                </div>

                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-gray-500">
                    Unidades
                  </span>

                  <span className="font-semibold text-gray-900">
                    {totalItems}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-4">

                  <div className="flex items-end justify-between gap-4">

                    <span className="font-semibold text-gray-700">
                      Total
                    </span>

                    <span className="text-2xl font-extrabold text-gray-900">
                      $
                      {totalPrice.toLocaleString(
                        "es-CO"
                      )}
                    </span>

                  </div>

                  <p className="mt-1 text-right text-xs text-gray-400">
                    Precio total en COP
                  </p>

                </div>

              </div>

              <button
                type="button"
                className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-4 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                Continuar con el pedido
              </button>

              <Link
                href="/repuestos"
                className="mt-3 block text-center text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Seguir comprando
              </Link>

            </div>

          </aside>

        </div>

      </section>

    </main>
  );
}