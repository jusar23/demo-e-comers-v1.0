import Link from "next/link";

const categories = [
  {
    name: "Motor",
    description: "Repuestos para motor",
    icon: "⚙️",
    href: "/#productos",
  },
  {
    name: "Frenos",
    description: "Pastillas, discos y más",
    icon: "🛞",
    href: "/#productos",
  },
  {
    name: "Transmisión",
    description: "Embragues y transmisión",
    icon: "🔧",
    href: "/#productos",
  },
  {
    name: "Suspensión",
    description: "Amortiguadores y piezas",
    icon: "🔩",
    href: "/#productos",
  },
  {
    name: "Eléctrico",
    description: "Baterías y componentes",
    icon: "⚡",
    href: "/#productos",
  },
  {
    name: "Accesorios",
    description: "Accesorios para tu vehículo",
    icon: "🧰",
    href: "/#productos",
  },
];

export default function CategorySection() {
  return (
    <section className="bg-white px-6 py-12">
      <div className="mx-auto max-w-7xl">
        
        <div className="mb-8 flex items-end justify-between gap-4">
          {/* <div>
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Encuentra lo que necesitas
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
              Compra por categoría
            </h2>

            <p className="mt-2 max-w-2xl text-sm text-gray-500 sm:text-base">
              Explora nuestros principales tipos de repuestos
              para motocargueros y motos.
            </p>
          </div> */}

          {/* <Link
            href="/#productos"
            className="hidden shrink-0 text-sm font-semibold text-blue-600 hover:text-blue-700 sm:block"
          >
            Ver todos →
          </Link> */}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group rounded-2xl border border-gray-200 bg-gray-50 p-5 text-center transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50 hover:shadow-md"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm transition duration-300 group-hover:scale-110">
                {category.icon}
              </div>

              <h3 className="mt-4 text-base font-bold text-gray-900 group-hover:text-blue-600">
                {category.name}
              </h3>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                {category.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-5 sm:hidden">
          <Link
            href="/#productos"
            className="block rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-center text-sm font-semibold text-blue-600"
          >
            Ver todos los repuestos →
          </Link>
        </div>
      </div>
    </section>
  );
}
