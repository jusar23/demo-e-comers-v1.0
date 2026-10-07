"use client";

import {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";

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

  const [value, setValue] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const requestId = useRef(0);

  // =========================================================
  // BUSCAR MIENTRAS ESCRIBE
  // =========================================================

  useEffect(() => {
    const query = value.trim();

    if (query.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    setOpen(true);
    setLoading(true);

    const currentRequest = ++requestId.current;

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(query)}`
        );

        if (!response.ok) {
          throw new Error("Error al buscar");
        }

        const data: SearchResult[] =
          await response.json();

        // Ignorar respuestas viejas
        if (currentRequest !== requestId.current) {
          return;
        }

        setResults(data);
      } catch (error) {
        console.error("Error en búsqueda:", error);

        if (currentRequest === requestId.current) {
          setResults([]);
        }
      } finally {
        if (currentRequest === requestId.current) {
          setLoading(false);
        }
      }
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  // =========================================================
  // CERRAR AL HACER CLICK AFUERA
  // =========================================================

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
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

  // =========================================================
  // REALIZAR BÚSQUEDA
  // =========================================================

  function search() {
    const query = value.trim();

    if (!query) {
      router.push("/repuestos");
      return;
    }

    // Cerrar sugerencias
    setOpen(false);

    // Limpiar resultados anteriores
    setResults([]);

    // IMPORTANTE:
    // invalidamos cualquier búsqueda anterior
    requestId.current++;

    // Limpiamos el buscador para poder escribir
    // inmediatamente una búsqueda nueva.
    setValue("");

    router.push(
      `/repuestos?search=${encodeURIComponent(query)}`
    );
  }

  // =========================================================
  // FORMULARIO
  // =========================================================

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    search();
  }

  // =========================================================
  // TECLADO
  // =========================================================

  function handleKeyDown(
    event: KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();

      if (value.trim()) {
        search();
      }
    }
  }

  // =========================================================
  // CLICK PRODUCTO
  // =========================================================

  function openProduct(slug: string) {
    setOpen(false);
    setResults([]);
    setValue("");

    router.push(`/productos/${slug}`);
  }

  return (
    <div
      ref={searchRef}
      className="relative w-full"
    >
      {/* =====================================================
          INPUT
      ====================================================== */}

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
            onChange={(event) => {
              setValue(event.target.value);

              if (
                event.target.value.trim().length >= 2
              ) {
                setOpen(true);
              }
            }}
            onFocus={() => {
              if (value.trim().length >= 2) {
                setOpen(true);
              }
            }}
            onKeyDown={handleKeyDown}
            placeholder="Buscar por nombre, referencia o marca..."
            autoComplete="off"
            className="h-12 w-full rounded-l-xl border border-gray-300 bg-white pl-12 pr-10 text-sm text-black placeholder:text-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          {loading && (
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
              aria-hidden="true"
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

      {/* =====================================================
          SUGERENCIAS
      ====================================================== */}

      {open && value.trim().length >= 2 && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-[100] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">

          {loading ? (
            <div className="px-5 py-6 text-center text-sm text-gray-500">
              Buscando repuestos...
            </div>
          ) : results.length > 0 ? (
            <>
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
                      openProduct(product.slug)
                    }
                    className="flex w-full items-center gap-4 border-b border-gray-100 px-4 py-3 text-left hover:bg-gray-50"
                  >

                    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
                      {product.image?.trim() ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-contain p-1"
                        />
                      ) : (
                        <span className="text-2xl">
                          🔧
                        </span>
                      )}
                    </div>

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

                    <div className="hidden text-right sm:block">
                      <p className="text-sm font-bold text-gray-900">
                        $
                        {product.price.toLocaleString(
                          "es-CO"
                        )}
                      </p>
                    </div>

                  </button>
                ))}

              </div>

              {/* VER TODOS */}
              <button
                type="button"
                onClick={search}
                className="w-full border-t border-gray-100 bg-gray-50 px-4 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50"
              >
                Ver todos los resultados para "
                {value.trim()}"
              </button>
            </>
          ) : (
            <div className="px-5 py-7 text-center">

              <div className="text-3xl">
                🔍
              </div>

              <p className="mt-2 text-sm font-semibold text-gray-700">
                No encontramos repuestos
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Intenta con otro nombre, referencia o
                marca.
              </p>

              <button
                type="button"
                onClick={search}
                className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
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