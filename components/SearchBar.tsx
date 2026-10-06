"use client";

import {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";

type SearchResult = {
  id: number;
  name: string;
  slug: string;
  reference: string;
  brand: string;
  category: string;
  price: number;
  image: string | null;
};

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(
    searchParams.get("search") ?? ""
  );

  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  /*
   * Buscar sugerencias mientras el usuario escribe.
   */
  useEffect(() => {
    const query = value.trim();

    if (query.length < 2) {
      setResults([]);
      setShowResults(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setShowResults(true);

    const timeout = setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(query)}`
        );

        if (!response.ok) {
          throw new Error(
            "No fue posible realizar la búsqueda"
          );
        }

        const data: SearchResult[] =
          await response.json();

        setResults(data);
      } catch (error) {
        console.error(error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  /*
   * Cerrar sugerencias al hacer clic fuera.
   */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(
          event.target as Node
        )
      ) {
        setShowResults(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /*
   * Ejecutar búsqueda completa.
   */
  function performSearch() {
    const query = value.trim();

    setShowResults(false);

    if (!query) {
      router.push("/repuestos");
      return;
    }

    router.push(
      `/repuestos?search=${encodeURIComponent(query)}`
    );
  }

  /*
   * Submit del formulario.
   */
  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    performSearch();
  }

  /*
   * Teclado.
   */
  function handleKeyDown(
    event: KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key === "Escape") {
      setShowResults(false);
      return;
    }

    if (
      event.key === "Enter" &&
      value.trim()
    ) {
      event.preventDefault();
      performSearch();
    }
  }

  /*
   * Abrir producto.
   */
  function handleResultClick(slug: string) {
    setShowResults(false);
    router.push(`/productos/${slug}`);
  }

  return (
    <div
      ref={searchRef}
      className="relative w-full"
    >
      <form
        onSubmit={handleSubmit}
        className="flex w-full"
      >
        <div className="relative flex-1">
          <span
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          >
            🔎
          </span>

          <input
            type="search"
            value={value}
            onChange={(event) =>
              setValue(event.target.value)
            }
            onFocus={() => {
              if (value.trim().length >= 2) {
                setShowResults(true);
              }
            }}
            onKeyDown={handleKeyDown}
            placeholder="Buscar por nombre, referencia o marca..."
            autoComplete="off"
            className="h-12 w-full rounded-l-xl border border-gray-300 bg-white pl-12 pr-10 text-sm text-black placeholder:text-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          {isLoading && (
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400"
              aria-label="Buscando"
            >
              ⏳
            </span>
          )}
        </div>

        <button
          type="submit"
          className="rounded-r-xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Buscar
        </button>
      </form>

      {/* Sugerencias */}
      {showResults &&
        value.trim().length >= 2 && (
          <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
            {isLoading ? (
              <div className="px-5 py-6 text-center text-sm text-gray-500">
                Buscando repuestos...
              </div>
            ) : results.length > 0 ? (
              <div>
                <div className="border-b border-gray-100 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Repuestos encontrados
                  </p>
                </div>

                <div className="max-h-[420px] overflow-y-auto">
                  {results.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() =>
                        handleResultClick(
                          product.slug
                        )
                      }
                      className="flex w-full items-center gap-4 border-b border-gray-100 px-4 py-3 text-left transition last:border-b-0 hover:bg-gray-50"
                    >
                      {/* Miniatura */}
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
                        {product.image?.trim() ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            loading="lazy"
                            className="h-full w-full object-contain p-1"
                          />
                        ) : (
                          <span
                            className="text-2xl"
                            aria-hidden="true"
                          >
                            🔧
                          </span>
                        )}
                      </div>

                      {/* Información */}
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-sm font-semibold text-gray-900">
                          {product.name}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {product.brand} · Ref.{" "}
                          {product.reference}
                        </p>

                        <p className="mt-1 text-xs text-blue-600">
                          {product.category}
                        </p>
                      </div>

                      {/* Precio */}
                      <div className="hidden shrink-0 text-right sm:block">
                        <p className="text-sm font-bold text-gray-900">
                          $
                          {product.price.toLocaleString(
                            "es-CO"
                          )}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          Ver producto →
                        </p>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Ver todos */}
                <button
                  type="button"
                  onClick={performSearch}
                  className="w-full border-t border-gray-100 bg-gray-50 px-4 py-3 text-center text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                >
                  Ver todos los resultados para "
                  {value.trim()}"
                </button>
              </div>
            ) : (
              <div className="px-5 py-7 text-center">
                <div
                  className="text-3xl"
                  aria-hidden="true"
                >
                  🔍
                </div>

                <p className="mt-2 text-sm font-semibold text-gray-700">
                  No encontramos repuestos
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Intenta con otro nombre,
                  referencia o marca.
                </p>

                {/* Aunque no haya sugerencias,
                    permite buscar el término completo */}
                <button
                  type="button"
                  onClick={performSearch}
                  className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
                >
                  Buscar "{value.trim()}"
                </button>
              </div>
            )}
          </div>
        )}
    </div>
  );
}