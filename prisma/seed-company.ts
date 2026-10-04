import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Cargando sedes de la empresa...");

  const branches = [
    {
      name: "Sede Principal",
      city: "Bogotá",
      address: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      phone: "+57 300 000 0000",
      whatsapp: "+57 300 000 0000",
      email: "sedeprincipal@empresa.com",
      latitude: null,
      longitude: null,
      position: 1,
    },
    {
      name: "Sede Norte",
      city: "Medellín",
      address: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      phone: "+57 301 000 0000",
      whatsapp: "+57 301 000 0000",
      email: "medellin@empresa.com",
      latitude: null,
      longitude: null,
      position: 2,
    },
    {
      name: "Sede Centro",
      city: "Cali",
      address: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      phone: "+57 302 000 0000",
      whatsapp: "+57 302 000 0000",
      email: "cali@empresa.com",
      latitude: null,
      longitude: null,
      position: 3,
    },
    {
      name: "Sede Oriente",
      city: "Bucaramanga",
      address: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      phone: "+57 303 000 0000",
      whatsapp: "+57 303 000 0000",
      email: "bucaramanga@empresa.com",
      latitude: null,
      longitude: null,
      position: 4,
    },
  ];

  for (const branch of branches) {
    await prisma.companyBranch.upsert({
      where: {
        id: branch.position,
      },
      update: branch,
      create: branch,
    });
  }

  console.log("Sedes cargadas correctamente.");
}

main()
  .catch((error) => {
    console.error("Error cargando las sedes:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });