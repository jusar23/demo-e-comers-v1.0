import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Cargando galería de la empresa...");

  const images = [
    {
      title: "Instalaciones",
      description: "Espacios e instalaciones de nuestra empresa.",
      url: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1200&q=80",
      alt: "Instalaciones de la empresa",
      position: 1,
    },
    {
      title: "Almacén",
      description: "Área de almacenamiento y organización de repuestos.",
      url: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=1200&q=80",
      alt: "Almacén de repuestos",
      position: 2,
    },
    {
      title: "Repuestos",
      description: "Productos y repuestos para vehículos.",
      url: "https://images.unsplash.com/photo-1632823471565-1ecdf5c3d2b1?auto=format&fit=crop&w=1200&q=80",
      alt: "Repuestos para vehículos",
      position: 3,
    },
    {
      title: "Productos automotrices",
      description: "Productos disponibles para nuestros clientes.",
      url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
      alt: "Productos automotrices",
      position: 4,
    },
    {
      title: "Herramientas",
      description: "Herramientas y elementos para mantenimiento.",
      url: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80",
      alt: "Repuestos y herramientas",
      position: 5,
    },
    {
      title: "Operaciones",
      description: "Procesos y operaciones de nuestra empresa.",
      url: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=1200&q=80",
      alt: "Operaciones de la empresa",
      position: 6,
    },
  ];

  for (const image of images) {
    await prisma.galleryImage.upsert({
      where: {
        id: image.position,
      },
      update: image,
      create: image,
    });
  }

  console.log("Galería cargada correctamente.");
}

main()
  .catch((error) => {
    console.error("Error cargando la galería:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });