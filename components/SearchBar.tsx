"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(
    searchParams.get("search") ?? ""
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (value.trim()) {
      params.set("search", value.trim());
    } else {
      params.delete("search");
    }

    router.push(`/?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full"
    >
      <div className="relative flex-1">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          🔎
        </span>

        <input
          type="search"
          value={value}
          onChange={(event) =>
            setValue(event.target.value)
          }
          placeholder="Buscar por nombre, referencia o marca..."
          className="h-14 w-full rounded-l-2xl border border-gray-300 bg-white pl-12 pr-4 text-sm text-black placeholder:text-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <button
        type="submit"
        className="rounded-r-2xl bg-blue-600 px-6 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        Buscar
      </button>
    </form>
  );
}