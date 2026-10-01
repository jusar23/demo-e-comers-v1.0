"use client";

import { useState } from "react";

type MotocarroGalleryProps = {
images: string[];
fallbackImage?: string | null;
name: string;
};

export default function MotocarroGallery({
images,
fallbackImage,
name,
}: MotocarroGalleryProps) {
const allImages = Array.from(
new Set(
[
...(fallbackImage ? [fallbackImage] : []),
...(Array.isArray(images) ? images : []),
].filter(Boolean)
)
);

const [selectedIndex, setSelectedIndex] = useState(0);

if (allImages.length === 0) {
return (
<div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
<div className="flex min-h-[400px] items-center justify-center bg-gray-100 sm:min-h-[500px]">
<div className="flex flex-col items-center text-center">
<div className="text-8xl">🚚</div>

        <p className="mt-5 text-sm font-medium text-gray-400">
          Imagen del modelo próximamente
        </p>
      </div>
    </div>
  </div>
);


}

const selectedImage =
allImages[selectedIndex] ?? allImages[0];

return (
<div className="w-full">
{/* IMAGEN PRINCIPAL */}
<div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
<div className="relative flex min-h-[400px] items-center justify-center bg-gray-100 sm:min-h-[500px]">
<img
src={selectedImage}
alt={`${name} - imagen ${selectedIndex + 1}`}
className="h-full max-h-[550px] w-full object-contain"
/>

      {allImages.length > 1 && (
        <div className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1 text-sm font-semibold text-white">
          {selectedIndex + 1} / {allImages.length}
        </div>
      )}
    </div>
  </div>

  {/* MINIATURAS */}
  {allImages.length > 1 && (
    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {allImages.map((image, index) => (
        <button
          key={`${image}-${index}`}
          type="button"
          onClick={() => setSelectedIndex(index)}
          className={`relative aspect-square overflow-hidden rounded-xl border-2 bg-white transition ${
            selectedIndex === index
              ? "border-blue-600 ring-2 ring-blue-100"
              : "border-gray-200 hover:border-blue-400"
          }`}
        >
          <img
            src={image}
            alt={`${name} - miniatura ${index + 1}`}
            className="h-full w-full object-cover"
          />
        </button>
      ))}
    </div>
  )}

  {/* BOTONES ANTERIOR / SIGUIENTE */}
  {allImages.length > 1 && (
    <div className="mt-4 flex gap-3">
      <button
        type="button"
        onClick={() =>
          setSelectedIndex((current) =>
            current === 0
              ? allImages.length - 1
              : current - 1
          )
        }
        className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-blue-400 hover:text-blue-600"
      >
        ← Anterior
      </button>

      <button
        type="button"
        onClick={() =>
          setSelectedIndex((current) =>
            current === allImages.length - 1
              ? 0
              : current + 1
          )
        }
        className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-blue-400 hover:text-blue-600"
      >
        Siguiente →
      </button>
    </div>
  )}
</div>


);
}