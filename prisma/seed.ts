import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const motocargueros = [
  {
    brand: "Vaisand",
    model: "DB 200ZH",
    slug: "vaisand-db-200zh",
    description:
      "Motocarguero de carga de 197 cc diseñado para labores de transporte y trabajo diario.",

    price: new Prisma.Decimal("15990000"),
    stock: 0,

    engineType: "4 tiempos",
    displacement: 197,
    horsepower: new Prisma.Decimal("12.7"),
    maxTorque: new Prisma.Decimal("13.9"),
    transmission: "5 velocidades + reversa + bajo",
    starter: "Eléctrico y pedal",
    loadCapacity: 750,
    fuelTank: new Prisma.Decimal("4.5"),
    frontSuspension: "Telescópica reforzada",
    rearSuspension: "Ballestas de 7 hojas",
    frontBrake: "Disco",
    rearBrake: "Campana",
    bodyDimensions: "1.80 m x 1.20 m",
    tires: "500 x R12",
    equipment:
      "Farola LED, tablero digital y sistema de bajo.",
    image: null,
  },

  {
    brand: "Vaisand",
    model: "DB 250ZH",
    slug: "vaisand-db-250zh",
    description:
      "Motocarguero de 246 cc con refrigeración líquida y capacidad de carga de hasta 850 kg.",

    price: new Prisma.Decimal("18490000"),
    stock: 0,

    engineType: "4 tiempos",
    displacement: 246,
    horsepower: new Prisma.Decimal("15.4"),
    maxTorque: new Prisma.Decimal("19.0"),
    transmission: "5 velocidades + reversa",
    starter: "Eléctrico y pedal",
    loadCapacity: 850,
    fuelTank: new Prisma.Decimal("4.5"),
    frontSuspension: "Telescópica reforzada",
    rearSuspension: "Ballestas de 7 hojas",
    frontBrake: "Disco",
    rearBrake: "Campana",
    bodyDimensions: "1.90 m x 1.25 m",
    tires: "500 x R12",
    equipment:
      "Refrigeración líquida con radiador, luces LED, tacómetro digital y sistema de bajo.",
    image: null,
  },

  {
    brand: "Vaisand",
    model: "DB 300ZH",
    slug: "vaisand-db-300zh",
    description:
      "Motocarguero de 272 cc y una tonelada de capacidad de carga, equipado con sistema hidráulico para el volco.",

    price: new Prisma.Decimal("24490000"),
    stock: 0,

    engineType: "4 tiempos",
    displacement: 272,
    horsepower: new Prisma.Decimal("19"),
    maxTorque: new Prisma.Decimal("21"),
    transmission: "5 velocidades + reversa",
    starter: "Eléctrico y pedal",
    loadCapacity: 1000,
    fuelTank: new Prisma.Decimal("4.5"),
    frontSuspension: "Telescópica reforzada",
    rearSuspension: "Ballestas de 7 hojas",
    frontBrake: "Disco",
    rearBrake: "Campana",
    bodyDimensions: "2.00 m x 1.40 m",
    tires: "500 x R12, doble llanta trasera",
    equipment:
      "Gato hidráulico, doble suspensión delantera, doble llanta trasera y sistema de volco.",
    image: null,
  },

  {
    brand: "Kameyo",
    model: "MTRD 200",
    slug: "kameyo-mtrd-200",
    description:
      "Motocarguero diseñado para labores de logística y transporte diario.",

    price: new Prisma.Decimal("15990000"),
    stock: 0,

    engineType: "4 tiempos, monocilíndrico OHV",
    displacement: 197,
    horsepower: new Prisma.Decimal("14.1"),
    maxTorque: new Prisma.Decimal("17.5"),
    transmission: "5 velocidades + reversa",
    starter: "Eléctrico y pedal",
    loadCapacity: 500,
    fuelTank: null,
    frontSuspension: "Independiente",
    rearSuspension: "Doble amortiguador",
    frontBrake: "Disco hidráulico",
    rearBrake: "Tambor",
    bodyDimensions: null,
    tires: null,
    equipment:
      "Tracción trasera con diferencial.",
    image: null,
  },

  {
    brand: "Kameyo",
    model: "MTRD 250",
    slug: "kameyo-mtrd-250",
    description:
      "Motocarguero de 246 cc diseñado para trabajo pesado en zonas urbanas y rurales.",

    price: new Prisma.Decimal("18490000"),
    stock: 0,

    engineType: "4 tiempos, monocilíndrico OHV",
    displacement: 246,
    horsepower: new Prisma.Decimal("15.5"),
    maxTorque: new Prisma.Decimal("19.5"),
    transmission: "5 velocidades + reversa + bajo",
    starter: "Eléctrico y pedal",
    loadCapacity: 700,
    fuelTank: new Prisma.Decimal("5"),
    frontSuspension: null,
    rearSuspension: null,
    frontBrake: "Disco hidráulico",
    rearBrake: "Campana",
    bodyDimensions: null,
    tires: null,
    equipment:
      "Refrigeración líquida, chasis reforzado, puerto USB e iluminación frontal y trasera.",
    image: null,
  },

  {
    brand: "Kameyo",
    model: "MTRD 300",
    slug: "kameyo-mtrd-300",
    description:
      "Motocarguero de alta capacidad para trabajo pesado con motor de 296 cc y capacidad de carga de una tonelada.",

    price: new Prisma.Decimal("23790000"),
    stock: 0,

    engineType: "4 tiempos, monocilíndrico OHV",
    displacement: 296,
    horsepower: new Prisma.Decimal("22"),
    maxTorque: new Prisma.Decimal("21"),
    transmission: "5 velocidades + reversa + bajo",
    starter: "Eléctrico y pedal",
    loadCapacity: 1000,
    fuelTank: new Prisma.Decimal("4.5"),
    frontSuspension: "Telescópica reforzada",
    rearSuspension: "Muelles reforzados",
    frontBrake: "Disco hidráulico",
    rearBrake: "Tambor hidráulico",
    bodyDimensions: "2.20 m x 1.40 m de platón",
    tires: "4.50-R12",
    equipment:
      "Volco, farola LED, tablero digital, puerto USB y sistema eléctrico de 12 V.",
    image: null,
  },

  {
    brand: "Kameyo",
    model: "AGR 300",
    slug: "kameyo-agr-300",
    description:
      "Motocarguero utilitario 4x4 diseñado para trabajo pesado y terrenos de alta exigencia.",

    price: new Prisma.Decimal("35990000"),
    stock: 0,

    engineType: "4 tiempos, monocilíndrico OHV",
    displacement: 275,
    horsepower: new Prisma.Decimal("17"),
    maxTorque: new Prisma.Decimal("21"),
    transmission: "5 velocidades + reversa",
    starter: null,
    loadCapacity: 800,
    fuelTank: null,
    frontSuspension: "Reforzada de 11 hojas",
    rearSuspension: "Reforzada de 11 hojas",
    frontBrake: null,
    rearBrake: null,
    bodyDimensions: "1.40 m x 2.20 m de platón expandido",
    tires: null,
    equipment:
      "Tracción 4x4, winche eléctrico, volco eléctrico, cabina con panorámico, iluminación LED y pantalla digital.",
    image: null,
  },

  {
    brand: "AYCO",
    model: "AY200ZH",
    slug: "ayco-ay200zh",
    description:
      "Motocarguero AYCO de 197 cc con refrigeración por aire reforzado y capacidad de carga de 500 kg.",

    price: new Prisma.Decimal("16790000"),
    stock: 0,

    engineType: "4 tiempos ecológico OHV",
    displacement: 197,
    horsepower: new Prisma.Decimal("13"),
    maxTorque: new Prisma.Decimal("13.9"),
    transmission: "5 velocidades + bajo + reversa",
    starter: "Eléctrico y pedal",
    loadCapacity: 500,
    fuelTank: new Prisma.Decimal("5.8"),
    frontSuspension: "Barras telescópicas",
    rearSuspension: "Muelles",
    frontBrake: "Disco",
    rearBrake: "Hidráulico",
    bodyDimensions: "1.75 m x 1.25 m",
    tires: "4.50-12, 8 lonas",
    equipment:
      "Carburador, encendido CDI y transmisión final por cardán.",
    image: null,
  },

  {
    brand: "AYCO",
    model: "AY200ZH-2",
    slug: "ayco-ay200zh-2",
    description:
      "Versión AYCO 200 con refrigeración líquida y capacidad de carga de 500 kg.",

    price: new Prisma.Decimal("17990000"),
    stock: 0,

    engineType: "4 tiempos ecológico OHV",
    displacement: 197,
    horsepower: new Prisma.Decimal("13"),
    maxTorque: new Prisma.Decimal("13.9"),
    transmission: "5 velocidades + bajo + reversa",
    starter: "Eléctrico y pedal",
    loadCapacity: 500,
    fuelTank: new Prisma.Decimal("5.8"),
    frontSuspension: "Barras telescópicas",
    rearSuspension: "Muelles",
    frontBrake: "Disco",
    rearBrake: "Hidráulico",
    bodyDimensions: "1.75 m x 1.25 m",
    tires: "4.50-12, 8 lonas",
    equipment:
      "Refrigeración líquida, carburador, encendido CDI y transmisión final por cardán.",
    image: null,
  },

  {
    brand: "AYCO",
    model: "AY300ZHS",
    slug: "ayco-ay300zhs",
    description:
      "Motocarguero AYCO 300 con platón fijo, motor de 272 cc y capacidad de carga de una tonelada.",

    price: new Prisma.Decimal("23990000"),
    stock: 0,

    engineType: "4 tiempos ecológico OHV",
    displacement: 272,
    horsepower: new Prisma.Decimal("19"),
    maxTorque: new Prisma.Decimal("19.5"),
    transmission: "5 velocidades + bajo + reversa",
    starter: "Eléctrico y pedal",
    loadCapacity: 1000,
    fuelTank: new Prisma.Decimal("5.8"),
    frontSuspension: "Barras telescópicas",
    rearSuspension: "Muelles reforzados",
    frontBrake: "Disco",
    rearBrake: "Hidráulico",
    bodyDimensions: "3.16 m x 1.33 m x 1.25 m",
    tires: "4.50-12, 8 lonas",
    equipment:
      "Platón fijo, transmisión final por cardán y encendido CDI.",
    image: null,
  },

  {
    brand: "AYCO",
    model: "AY300ZHV",
    slug: "ayco-ay300zhv",
    description:
      "Motocarguero AYCO 300 tipo volqueta con sistema electrohidráulico de levante.",

    price: new Prisma.Decimal("25990000"),
    stock: 0,

    engineType: "4 tiempos ecológico OHV",
    displacement: 272,
    horsepower: new Prisma.Decimal("19"),
    maxTorque: new Prisma.Decimal("19.5"),
    transmission: "5 velocidades + bajo + reversa",
    starter: "Eléctrico y pedal",
    loadCapacity: 1000,
    fuelTank: new Prisma.Decimal("5.8"),
    frontSuspension: "Barras telescópicas",
    rearSuspension: "Muelles reforzados",
    frontBrake: "Disco",
    rearBrake: "Hidráulico",
    bodyDimensions: "1.90 m x 1.40 m de volquete",
    tires: "4.50-12, 8 lonas",
    equipment:
      "Volqueta metálica con accionamiento electrohidráulico mediante botón.",
    image: null,
  },
];

async function main() {
  console.log("Cargando motocargueros...");

  for (const motocarro of motocargueros) {
    await prisma.motocarro.upsert({
      where: {
        slug: motocarro.slug,
      },
      update: motocarro,
      create: motocarro,
    });
  }

  console.log(
    `Se cargaron/actualizaron ${motocargueros.length} motocargueros.`
  );
}

main()
  .catch((error) => {
    console.error("Error durante el seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });