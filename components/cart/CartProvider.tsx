"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const MAX_DIFFERENT_PRODUCTS = 20;

export type CartProduct = {
  id: number;
  name: string;
  slug: string;
  reference: string;
  price: number;
  stock: number;
  image: string | null;
};

export type CartItem = CartProduct & {
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  differentProducts: number;
  addItem: (product: CartProduct) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  isInCart: (productId: number) => boolean;
  getQuantity: (productId: number) => number;
};

const CartContext =
  createContext<CartContextType | null>(null);

const STORAGE_KEY = "repuestos-cart";

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  /*
   * =========================================================
   * CARGAR CARRITO DESDE LOCALSTORAGE
   * =========================================================
   */

  useEffect(() => {
    try {
      const savedCart =
        window.localStorage.getItem(STORAGE_KEY);

      if (savedCart) {
        const parsedCart: CartItem[] =
          JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          setItems(parsedCart);
        }
      }
    } catch (error) {
      console.error(
        "No fue posible cargar el carrito:",
        error
      );
    } finally {
      setIsLoaded(true);
    }
  }, []);

  /*
   * =========================================================
   * GUARDAR CARRITO
   * =========================================================
   */

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(items)
      );
    } catch (error) {
      console.error(
        "No fue posible guardar el carrito:",
        error
      );
    }
  }, [items, isLoaded]);

  /*
   * =========================================================
   * AGREGAR PRODUCTO
   * =========================================================
   */

  function addItem(product: CartProduct) {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id
      );

      /*
       * Si ya existe, aumentamos unidades.
       */

      if (existingItem) {
        const newQuantity = Math.min(
          existingItem.quantity + 1,
          product.stock
        );

        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: newQuantity,
                stock: product.stock,
                price: product.price,
                image: product.image,
              }
            : item
        );
      }

      /*
       * Si es un producto nuevo, comprobamos
       * el límite de productos diferentes.
       */

      if (
        currentItems.length >=
        MAX_DIFFERENT_PRODUCTS
      ) {
        alert(
          `El carrito permite máximo ${MAX_DIFFERENT_PRODUCTS} productos diferentes.`
        );

        return currentItems;
      }

      /*
       * No podemos agregar un producto sin stock.
       */

      if (product.stock <= 0) {
        alert("Este producto está agotado.");
        return currentItems;
      }

      return [
        ...currentItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  }

  /*
   * =========================================================
   * AUMENTAR CANTIDAD
   * =========================================================
   */

  function increaseQuantity(productId: number) {
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== productId) {
          return item;
        }

        if (item.quantity >= item.stock) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      })
    );
  }

  /*
   * =========================================================
   * DISMINUIR CANTIDAD
   * =========================================================
   */

  function decreaseQuantity(productId: number) {
    setItems((currentItems) =>
      currentItems
        .map((item) => {
          if (item.id !== productId) {
            return item;
          }

          return {
            ...item,
            quantity: item.quantity - 1,
          };
        })
        .filter((item) => item.quantity > 0)
    );
  }

  /*
   * =========================================================
   * ELIMINAR PRODUCTO
   * =========================================================
   */

  function removeItem(productId: number) {
    setItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== productId
      )
    );
  }

  /*
   * =========================================================
   * VACIAR CARRITO
   * =========================================================
   */

  function clearCart() {
    setItems([]);
  }

  /*
   * =========================================================
   * SABER SI ESTÁ EN EL CARRITO
   * =========================================================
   */

  function isInCart(productId: number) {
    return items.some(
      (item) => item.id === productId
    );
  }

  /*
   * =========================================================
   * OBTENER CANTIDAD
   * =========================================================
   */

  function getQuantity(productId: number) {
    return (
      items.find(
        (item) => item.id === productId
      )?.quantity ?? 0
    );
  }

  /*
   * =========================================================
   * TOTALES
   * =========================================================
   */

  const totalItems = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total + item.quantity,
        0
      ),
    [items]
  );

  const totalPrice = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total +
          item.price * item.quantity,
        0
      ),
    [items]
  );

  const value: CartContextType = {
    items,
    totalItems,
    totalPrice,
    differentProducts: items.length,
    addItem,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
    isInCart,
    getQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart debe utilizarse dentro de CartProvider"
    );
  }

  return context;
}