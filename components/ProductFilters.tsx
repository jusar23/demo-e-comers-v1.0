"use client";

import { useRouter, useSearchParams } from "next/navigation";

type ProductFiltersProps = {
  categories: string[];
  brands: string[];
};

export default function ProductFilters({
  categories,
  brands,
}: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const category = searchParams.get("category") ?? "";
  const brand = searchParams.get("brand") ?? "";
  const sort = searchParams.get("sort") ?? "";

  function updateFilter(
    key: string,
    value: string
  ) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`/?${params.toString()}`);
  }

  function clearFilters() {
    router.push("/");
  }

  return (
    <aside className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">
          Filtros
        </h2>

        <button
          onClick={clearFilters}
          className="text-xs font-medium text-blue-600 hover:underline"
        >
          Limpiar
        </button>
      </div>

      <div className="mt-6 space-y-5">
        
        {/* Categoría */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Categoría
          </label>

          <select
            value={category}
            onChange={(e) =>
              updateFilter("category", e.target.value)
            }
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-3 text-sm text-black outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Todas las categorías</option>

            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Marca */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Marca
          </label>

          <select
            value={brand}
            onChange={(e) =>
              updateFilter("brand", e.target.value)
            }
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-3 text-sm text-black outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Todas las marcas</option>

            {brands.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Orden */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Ordenar por
          </label>

          <select
            value={sort}
            onChange={(e) =>
              updateFilter("sort", e.target.value)
            }
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-3 text-sm text-black outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Más recientes</option>
            <option value="price-asc">
              Precio: menor a mayor
            </option>
            <option value="price-desc">
              Precio: mayor a menor
            </option>
            <option value="name-asc">
              Nombre: A-Z
            </option>
          </select>
        </div>
      </div>
    </aside>
  );
}