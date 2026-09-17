import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Limpiamos los productos anteriores de la DEMO
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: [
      {
        name: "Filtro de aceite Bosch",
        slug: "filtro-de-aceite-bosch",
        reference: "BOS-F001",
        description:
          "Filtro de aceite Bosch diseñado para ayudar a mantener limpio el aceite del motor y proteger sus componentes.",
        price: 45000,
        stock: 15,
        brand: "Bosch",
        category: "Filtros",
        image:
          "https://c0.uidownload.com/pngpics/999/2088/car-oil-filter-bosch-oil-filter-synthetic-oil-filter-vehicle-maintenance-automotive-filtration-engine-lubrication-car-service-parts.png",
      },

      {
        name: "Pastillas de freno Brembo",
        slug: "pastillas-de-freno-brembo",
        reference: "BRM-P06101",
        description:
          "Juego de pastillas de freno Brembo para aplicaciones automotrices seleccionadas, diseñado para ofrecer una frenada confiable.",
        price: 85000,
        stock: 8,
        brand: "Brembo",
        category: "Frenos",
        image:
          "https://contentassets.autozone.com/product_image/USA/1684/BBHN/P06101N/P06101N-06.jpg?imwidth=1920",
      },

      {
        name: "Bujías NGK",
        slug: "bujias-ngk",
        reference: "NGK-B001",
        description:
          "Bujías NGK para sistemas de encendido de motores a gasolina.",
        price: 28000,
        stock: 25,
        brand: "NGK",
        category: "Motor",
        image:
          "https://scdn.autodoc.de/catalog/categories/600x600/10251.png",
      },

      {
        name: "Filtro de aire MANN",
        slug: "filtro-de-aire-mann",
        reference: "MANN-A001",
        description:
          "Filtro de aire MANN diseñado para mantener limpio el flujo de aire que ingresa al motor.",
        price: 38000,
        stock: 12,
        brand: "MANN-Filter",
        category: "Filtros",
        image:
          "https://www.fb-tuning.de/Produktbilder/shop565px/60069451_001.jpg",
      },

      {
        name: "Amortiguador Monroe",
        slug: "amortiguador-monroe",
        reference: "MON-376154",
        description:
          "Amortiguador Monroe para sistemas de suspensión automotriz.",
        price: 185000,
        stock: 6,
        brand: "Monroe",
        category: "Suspensión",
        image:
          "https://cdn.autodoc.de/thumb?id=7436595&lng=se&m=0&n=0&rev=94078007",
      },

      {
        name: "Filtro de combustible",
        slug: "filtro-de-combustible",
        reference: "COMB-F001",
        description:
          "Filtro de combustible en línea diseñado para retener contaminantes y ayudar a mantener limpio el sistema de alimentación.",
        price: 32000,
        stock: 18,
        brand: "Genérica",
        category: "Filtros",
        image:
          "https://s.alicdn.com/@sc04/kf/Haaa66255b47b4afd889a70b5abde73e7X/Car-Motorcycle-Filtro-De-Combustible-Fuel-Filter-for-Mitsubishi-Chevrolet-Nissan-Bmw-Benz-Suzuki-Honda-Isuzu-Toyota-Hyundai.jpg",
      },

      {
        name: "Alternador automotriz",
        slug: "alternador-automotriz",
        reference: "ALT-001",
        description:
          "Alternador de reemplazo para el sistema eléctrico del vehículo y la carga de la batería.",
        price: 420000,
        stock: 4,
        brand: "Genérica",
        category: "Eléctrico",
        image:
          "https://i.ebayimg.com/images/g/xioAAOSwhkpmBwWz/s-l1200.webp",
      },

      {
        name: "Motor de arranque",
        slug: "motor-de-arranque",
        reference: "STA-001",
        description:
          "Motor de arranque para sistemas de encendido automotriz.",
        price: 310000,
        stock: 5,
        brand: "Genérica",
        category: "Eléctrico",
        image:
          "https://modernautoparts.co.za/cdn/shop/collections/bf4033ab9960051c3eed438397c01e14_2fe3b2ce-9571-4911-bc4e-ef70f3c8bd73_600x600_crop_center.png?v=1752244141",
      },

      {
        name: "Kit de distribución INA",
        slug: "kit-de-distribucion-ina",
        reference: "INA-TB001",
        description:
          "Kit de distribución con correa, tensores y componentes necesarios para el mantenimiento del sistema.",
        price: 295000,
        stock: 7,
        brand: "INA",
        category: "Motor",
        image:
          "https://images.lteplatform.com/images/products/600x600/348440148.jpg",
      },

      {
        name: "Pinza de freno",
        slug: "pinza-de-freno",
        reference: "CAL-001",
        description:
          "Pinza de freno para sistemas de frenado hidráulico.",
        price: 240000,
        stock: 5,
        brand: "Genérica",
        category: "Frenos",
        image:
          "https://rst.lineteco.com/storage/products-amin/braking-system/brake-caliper.jpg",
      },

      {
        name: "Kit de embrague",
        slug: "kit-de-embrague",
        reference: "CLU-001",
        description:
          "Conjunto de embrague para vehículos con transmisión manual.",
        price: 520000,
        stock: 3,
        brand: "Genérica",
        category: "Transmisión",
        image:
          "https://www.espaceauto92.fr/embriage.png",
      },

      {
        name: "Rodamiento de rueda",
        slug: "rodamiento-de-rueda",
        reference: "WHB-001",
        description:
          "Rodamiento sellado para conjunto de rueda automotriz.",
        price: 95000,
        stock: 10,
        brand: "Genérica",
        category: "Suspensión",
        image:
          "https://cdn.shopify.com/s/files/1/0441/8748/4320/products/2_ef2273be-ef2c-4305-8a0b-616a27376c1a.png?v=1611236433",
      },

      {
        name: "Brazo de control de suspensión",
        slug: "brazo-de-control",
        reference: "CTRL-001",
        description:
          "Brazo de control para el sistema de suspensión y alineación del vehículo.",
        price: 165000,
        stock: 7,
        brand: "MOOG",
        category: "Suspensión",
        image:
          "https://static.summitracing.com/global/images/prod/xlarge/mog-rk620168_xl.jpg",
      },

      {
        name: "Terminal de dirección TRW",
        slug: "terminal-de-direccion-trw",
        reference: "TRW-JTE1054",
        description:
          "Terminal de dirección para el sistema de dirección del vehículo.",
        price: 72000,
        stock: 14,
        brand: "TRW",
        category: "Dirección",
        image:
          "https://hometowneautorepairandtireofwoodbridge.com/blog/wp-content/uploads/2017/01/Inner-and-outer-tie-rods.jpg",
      },

      {
        name: "Bobina de encendido",
        slug: "bobina-de-encendido",
        reference: "IGN-001",
        description:
          "Bobina de encendido para sistemas de ignición de motores.",
        price: 110000,
        stock: 9,
        brand: "Genérica",
        category: "Eléctrico",
        image:
          "https://static.summitracing.com/global/images/prod/xlarge/sum-850501-1b_xl.jpg",
      },

      {
        name: "Correa auxiliar",
        slug: "correa-auxiliar",
        reference: "BELT-001",
        description:
          "Correa auxiliar de múltiples nervaduras para accesorios del motor.",
        price: 65000,
        stock: 11,
        brand: "Genérica",
        category: "Motor",
        image:
          "https://cdn3.s1partscenter.com/images/source/78d/b3a/353/6d58fa45e7.jpg",
      },

      {
        name: "Termostato automotriz",
        slug: "termostato-automotriz",
        reference: "THERM-001",
        description:
          "Termostato encargado de ayudar a regular la temperatura de operación del motor.",
        price: 55000,
        stock: 13,
        brand: "Genérica",
        category: "Refrigeración",
        image:
          "https://images.nexusapp.co/assets/8a/be/c4/315638809.jpg",
      },

      {
        name: "Radiador",
        slug: "radiador-automotriz",
        reference: "RAD-001",
        description:
          "Radiador de reemplazo para el sistema de refrigeración del vehículo.",
        price: 385000,
        stock: 4,
        brand: "Genérica",
        category: "Refrigeración",
        image:
          "https://static.summitracing.com/global/images/prod/xlarge/rcg-41-13612_xl.jpg",
      },

      {
        name: "Faro delantero",
        slug: "faro-delantero",
        reference: "LAMP-001",
        description:
          "Faro delantero de reemplazo para el sistema de iluminación automotriz.",
        price: 480000,
        stock: 2,
        brand: "Genérica",
        category: "Iluminación",
        image:
          "https://cld.partsimg.com/image/upload/q_auto%2Cdpr_auto%2Cf_auto/carparts/cpw/lp/popular-parts/headlights",
      },

      {
        name: "Disco de freno",
        slug: "disco-de-freno",
        reference: "DISC-001",
        description:
          "Disco de freno para sistemas de frenado automotriz.",
        price: 145000,
        stock: 10,
        brand: "JINNGE",
        category: "Frenos",
        image:
          "https://shopcdnpro.grainajz.com/category/372395/2378/e9ef53fbc905b258c5b8c497c4c73620/Spare-Auto-Parts-Oem-Car-Brake-Disc-Rotor-Low-Metal-Disc-For-BMW.jpg",
      },
      {
        name: "Caja de Reversa",
        slug: "caja-de-reversa",
        reference: "bdc-001",
        description:
          "Caja de reversa para carguero universal reforzada, color dorado",
        price: 303001,
        stock: 0,
        brand: "BDC",
        category: "Caja",
        image:
          "https://shopcdnpro.grainajz.com/category/372395/2378/e9ef53fbc905b258c5b8c497c4c73620/Spare-Auto-Parts-Oem-Car-Brake-Disc-Rotor-Low-Metal-Disc-For-BMW.jpg",
      },
   

    ],
  });

  console.log("21 productos creados correctamente.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });