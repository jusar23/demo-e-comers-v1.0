"use client";

import { useState } from "react";

type MotocarroGalleryProps = {
  images: string[];
  fallbackImage: string | null;
  name: string;
};

export default function MotocarroGallery({
  images,
  fallbackImage,
  name,
}: MotocarroGalleryProps) {
  // Si existen imágenes en "images", usamos esas.
  // Si no, utilizamos la imagen antigua "image".
  const allImages =
    images.length > 0
      ? images
      : fallbackImage
        ? [fallbackImage]
        : [];

  const [selectedImage, setSelectedImage] = useState(0);

  const currentImage = allImages[selectedImage];

  return (
    <div className="space-y-4">

      {/* Imagen principal */}
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        <div className="relative flex min-h-[400px] items-center justify-center bg-gray-100 sm:min-h-[500px]">

          {currentImage ? (
            <img
              src={currentImage}
              alt={name}
              className="h-full max-h-[550px] w-full object-contain"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
              <div className="text-8xl">
                🚚
              </div>

              <p className="mt-5 text-sm font-medium text-gray-400">
                Imagen del modelo próximamente
              </p>
            </div>
          )}

        </div>
      </div>

      {/* Miniaturas */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">

          {allImages.map((image, index) => {
            const isSelected =
              index === selectedImage;

            return (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square overflow-hidden rounded-xl border-2 bg-white transition ${
                  isSelected
                    ? "border-blue-600 ring-2 ring-blue-100"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >
                <img
                  src={image}
                  alt={`${name} - imagen ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            );
          })}

        </div>
      )}

      {/* Contador */}
      {allImages.length > 1 && (
        <p className="text-center text-xs text-gray-500">
          Imagen {selectedImage + 1} de {allImages.length}
        </p>
      )}

    </div>
  );
}
