"use client";

import { useMemo, useState } from "react";

import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";

type Product = {
  id: number;
  name: string;
  slug: string;
  reference: string;
  price: number;
  stock: number;
  brand: string;
  category: string;
  image: string | null;
  createdAt: Date;
};

type ProductCatalogProps = {
  products: Product[];
  categories: string[];
  brands: string[];
  initialCategory?: string;
};

export default function ProductCatalog({
  products,
  categories,
  brands,
  initialCategory = "",
}: ProductCatalogProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [brand, setBrand] = useState("");
  const [sort, setSort] = useState("");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Buscar por nombre, referencia o marca
    if (search.trim()) {
      const searchValue = search.toLowerCase().trim();

      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchValue) ||
          product.reference.toLowerCase().includes(searchValue) ||
          product.brand.toLowerCase().includes(searchValue)
      );
    }

    // Filtrar por categoría
    if (category) {
      result = result.filter(
        (product) =>
          product.category.toLowerCase() ===
          category.toLowerCase()
      );
    }

    // Filtrar por marca
    if (brand) {
      result = result.filter(
        (product) =>
          product.brand.toLowerCase() ===
          brand.toLowerCase()
      );
    }

    // Precio menor a mayor
    if (sort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    }

    // Precio mayor a menor
    if (sort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    // Nombre A-Z
    if (sort === "name-asc") {
      result.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    // Más recientes
    if (!sort) {
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      );
    }

    return result;
  }, [
    products,
    search,
    category,
    brand,
    sort,
  ]);

  function clearFilters() {
    setSearch("");
    setCategory("");
    setBrand("");
    setSort("");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">

      {/* Filtros */}
      <aside>
        <ProductFilters
          categories={categories}
          brands={brands}
          search={search}
          category={category}
          brand={brand}
          sort={sort}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onBrandChange={setBrand}
          onSortChange={setSort}
          onClear={clearFilters}
        />
      </aside>

      {/* Productos */}
      <div>

        {/* Encabezado */}
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {category
                ? `Repuestos de ${category}`
                : "Todos los repuestos"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "producto encontrado"
                : "productos encontrados"}
            </p>
          </div>

          {(search || category || brand || sort) && (
            <button
              onClick={clearFilters}
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Limpiar filtros
            </button>
          )}

        </div>

        {/* Sin resultados */}
        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">

            <div className="text-5xl">
              🔍
            </div>

            <h3 className="mt-4 text-xl font-bold text-gray-900">
              No encontramos productos
            </h3>

            <p className="mt-2 text-gray-500">
              Intenta buscar con otro término o cambiar
              los filtros.
            </p>

            <button
              onClick={clearFilters}
              className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Ver todos los repuestos
            </button>

          </div>
        ) : (

          /* Cards */
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

          </div>
        )}

      </div>

    </div>
  );
}
