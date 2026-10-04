
"use client";

import { useState } from "react";

export type GalleryImage = {
  url: string;
  alt?: string | null;
};

type ImageGalleryProps = {
  images: GalleryImage[];
  alt: string;
};

export default function ImageGallery({
  images,
  alt,
}: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const validImages = images.filter((image) => image.url.trim() !== "");

  if (validImages.length === 0) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl bg-gray-100 p-8 text-center">
        <span className="text-7xl" aria-hidden="true">
          🏍️
        </span>
        <p className="mt-4 font-semibold text-gray-700">
          Imágenes próximamente
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Las fotografías de este modelo estarán disponibles pronto.
        </p>
      </div>
    );
  }

  const selectedImage = validImages[selectedIndex];

  function previousImage() {
    setSelectedIndex((current) =>
      current === 0 ? validImages.length - 1 : current - 1
    );
  }

  function nextImage() {
    setSelectedIndex((current) =>
      current === validImages.length - 1 ? 0 : current + 1
    );
  }

  return (
    <div className="w-full">
      <div className="group relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-2xl bg-gray-100 sm:min-h-[440px]">
        <img
          key={selectedImage.url}
          src={selectedImage.url}
          alt={selectedImage.alt || alt}
          className="max-h-[560px] w-full object-contain"
        />

        {validImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={previousImage}
              aria-label="Ver imagen anterior"
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl text-gray-900 shadow transition hover:bg-white"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={nextImage}
              aria-label="Ver imagen siguiente"
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl text-gray-900 shadow transition hover:bg-white"
            >
              ›
            </button>

            <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
              {selectedIndex + 1} / {validImages.length}
            </span>
          </>
        )}
      </div>

      {validImages.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {validImages.map((image, index) => (
            <button
              key={`${image.url}-${index}`}
              type="button"
              onClick={() => setSelectedIndex(index)}
              aria-label={`Ver imagen ${index + 1}`}
              aria-pressed={selectedIndex === index}
              className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-gray-100 transition sm:h-24 sm:w-24 ${
                selectedIndex === index
                  ? "border-[#17266F] ring-2 ring-[#17266F]/20"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <img
                src={image.url}
                alt={image.alt || `${alt}, imagen ${index + 1}`}
                loading="lazy"
                className="h-full w-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}