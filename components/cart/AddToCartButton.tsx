"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

type AddToCartButtonProps = {
  product: {
    id: number;
    name: string;
    slug: string;
    reference: string;
    price: number;
    stock: number;
    image: string | null;
  };
};

export default function AddToCartButton({
  product,
}: AddToCartButtonProps) {
  const {
    addItem,
    isInCart,
    getQuantity,
  } = useCart();

  const [added, setAdded] = useState(false);

  const quantity = getQuantity(product.id);
  const inCart = isInCart(product.id);

  const unavailable =
    product.stock <= 0;

  function handleAdd() {
    if (unavailable) {
      return;
    }

    addItem(product);

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  }

  return (
    <div className="w-full">

      <button
        type="button"
        onClick={handleAdd}
        disabled={
          unavailable ||
          quantity >= product.stock
        }
        className="w-full rounded-xl bg-blue-600 px-6 py-4 text-center text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        {unavailable
          ? "Producto agotado"
          : quantity >= product.stock
            ? "Stock máximo agregado"
            : added
              ? "✓ Agregado al carrito"
              : inCart
                ? `Agregar otra unidad (${quantity} en carrito)`
                : "Agregar al carrito"}
      </button>

      {inCart && (
        <p className="mt-2 text-center text-xs text-gray-500">
          Tienes {quantity}{" "}
          {quantity === 1
            ? "unidad"
            : "unidades"}{" "}
          de este producto en el carrito.
        </p>
      )}

    </div>
  );
}