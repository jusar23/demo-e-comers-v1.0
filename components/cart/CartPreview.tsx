"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

type CartPreviewProps = {
  open: boolean;
  onClose: () => void;
};

export default function CartPreview({
  open,
  onClose,
}: CartPreviewProps) {
  const {
    items,
    totalItems,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  } = useCart();

  return (
    <>
      {/* =====================================================
          FONDO OSCURO
      ====================================================== */}

      {open && (
        <button
          type="button"
          aria-label="Cerrar carrito"
          onClick={onClose}
          className="fixed inset-0 z-[90] hidden bg-black/40 backdrop-blur-[2px] md:block"
        />
      )}

      {/* =====================================================
          PANEL LATERAL
      ====================================================== */}

      <aside
        className={`fixed right-0 top-0 z-[100] hidden h-screen w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out md:flex ${
          open
            ? "translate-x-0"
            : "translate-x-full"
        }`}
        aria-hidden={!open}
      >

        {/* =================================================
            CABECERA
        ================================================== */}

        <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-5 py-4">

          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Tu carrito
            </h2>

            <p className="mt-0.5 text-xs text-gray-500">
              {totalItems}{" "}
              {totalItems === 1
                ? "unidad"
                : "unidades"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-xl text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
            aria-label="Cerrar carrito"
          >
            ✕
          </button>

        </div>

        {/* =================================================
            PRODUCTOS
        ================================================== */}

        <div className="min-h-0 flex-1 overflow-y-auto">

          {items.length === 0 ? (

            <div className="flex h-full flex-col items-center justify-center px-6 text-center">

              <div className="text-6xl">
                🛒
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                Tu carrito está vacío
              </h3>

              <p className="mt-2 max-w-xs text-sm leading-6 text-gray-500">
                Agrega algunos repuestos y aparecerán
                aquí.
              </p>

              <Link
                href="/repuestos"
                onClick={onClose}
                className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                Ver repuestos
              </Link>

            </div>

          ) : (

            <div className="divide-y divide-gray-100">

              {items.map((item) => {

                const subtotal =
                  item.price * item.quantity;

                return (
                  <div
                    key={item.id}
                    className="p-4"
                  >

                    <div className="flex gap-3">

                      {/* IMAGEN */}

                      <Link
                        href={`/productos/${item.slug}`}
                        onClick={onClose}
                        className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100"
                      >
                        {item.image?.trim() ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-contain p-1"
                          />
                        ) : (
                          <span className="text-3xl">
                            🔧
                          </span>
                        )}
                      </Link>

                      {/* INFORMACIÓN */}

                      <div className="min-w-0 flex-1">

                        <div className="flex items-start justify-between gap-2">

                          <Link
                            href={`/productos/${item.slug}`}
                            onClick={onClose}
                            className="line-clamp-2 text-sm font-bold text-gray-900 transition hover:text-blue-600"
                          >
                            {item.name}
                          </Link>

                          <button
                            type="button"
                            onClick={() =>
                              removeItem(item.id)
                            }
                            className="shrink-0 text-xs text-red-500 transition hover:text-red-700"
                            aria-label={`Eliminar ${item.name}`}
                          >
                            Eliminar
                          </button>

                        </div>

                        <p className="mt-1 text-xs text-gray-500">
                          ${item.price.toLocaleString("es-CO")} por unidad
                        </p>

                        <div className="mt-3 flex items-center justify-between gap-3">

                          {/* CANTIDAD */}

                          <div className="flex items-center overflow-hidden rounded-lg border border-gray-300">

                            <button
                              type="button"
                              onClick={() =>
                                decreaseQuantity(
                                  item.id
                                )
                              }
                              className="flex h-8 w-8 items-center justify-center text-base font-bold text-gray-600 transition hover:bg-gray-100"
                              aria-label={`Disminuir cantidad de ${item.name}`}
                            >
                              −
                            </button>

                            <span className="flex h-8 min-w-9 items-center justify-center border-x border-gray-300 px-2 text-xs font-bold text-gray-900">
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
                              className="flex h-8 w-8 items-center justify-center text-base font-bold text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-300"
                              aria-label={`Aumentar cantidad de ${item.name}`}
                            >
                              +
                            </button>

                          </div>

                          {/* SUBTOTAL */}

                          <p className="text-sm font-extrabold text-gray-900">
                            $
                            {subtotal.toLocaleString(
                              "es-CO"
                            )}
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

          )}

        </div>

        {/* =================================================
            RESUMEN INFERIOR
        ================================================== */}

        {items.length > 0 && (
          <div className="shrink-0 border-t border-gray-200 bg-white p-5">

            <div className="flex items-center justify-between gap-4">

              <div>
                <p className="text-sm text-gray-500">
                  Total
                </p>

                <p className="text-xs text-gray-400">
                  {totalItems}{" "}
                  {totalItems === 1
                    ? "unidad"
                    : "unidades"}
                </p>
              </div>

              <p className="text-2xl font-extrabold text-gray-900">
                $
                {totalPrice.toLocaleString(
                  "es-CO"
                )}
              </p>

            </div>

            <Link
              href="/carrito"
              onClick={onClose}
              className="mt-4 block w-full rounded-xl bg-blue-600 px-5 py-3.5 text-center text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Ver carrito completo
            </Link>

            <Link
              href="/repuestos"
              onClick={onClose}
              className="mt-3 block text-center text-sm font-semibold text-blue-600 transition hover:text-blue-700"
            >
              Seguir comprando
            </Link>

          </div>
        )}

      </aside>
    </>
  );
}