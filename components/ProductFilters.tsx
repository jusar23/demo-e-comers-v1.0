"use client";

type ProductFiltersProps = {
  categories: string[];
  brands: string[];

  search: string;
  category: string;
  brand: string;
  sort: string;

  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onBrandChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onClear: () => void;
};

export default function ProductFilters({
  categories,
  brands,
  search,
  category,
  brand,
  sort,
  onSearchChange,
  onCategoryChange,
  onBrandChange,
  onSortChange,
  onClear,
}: ProductFiltersProps) {
  return (
    <aside className="rounded-2xl border bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">
          Filtros
        </h2>

        <button
          onClick={onClear}
          className="text-xs font-medium text-blue-600 hover:underline"
        >
          Limpiar
        </button>
      </div>

      <div className="mt-6 space-y-5">

        {/* Buscar */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Buscar
          </label>

          <input
            type="text"
            value={search}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
            placeholder="Nombre, referencia o marca..."
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-3 text-sm text-black outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Categoría */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Categoría
          </label>

          <select
            value={category}
            onChange={(e) =>
              onCategoryChange(e.target.value)
            }
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-3 text-sm text-black outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">
              Todas las categorías
            </option>

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
              onBrandChange(e.target.value)
            }
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-3 text-sm text-black outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">
              Todas las marcas
            </option>

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
              onSortChange(e.target.value)
            }
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-3 text-sm text-black outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">
              Más recientes
            </option>

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
