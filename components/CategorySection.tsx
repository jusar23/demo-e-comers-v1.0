import Link from "next/link";

const categories = [
  {
    name: "Motor",
    description: "Repuestos para motor",
    icon: "⚙️",
  },
  {
    name: "Frenos",
    description: "Pastillas, discos y más",
    icon: "🛞",
  },
  {
    name: "Transmisión",
    description: "Embragues y transmisión",
    icon: "🔧",
  },
  {
    name: "Suspensión",
    description: "Amortiguadores y piezas",
    icon: "🔩",
  },
  {
    name: "Eléctrico",
    description: "Baterías y componentes",
    icon: "⚡",
  },
  {
    name: "Accesorios",
    description: "Accesorios para tu vehículo",
    icon: "🧰",
  },
];

export default function CategorySection() {
  return (
    <section className="bg-white px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/repuestos?categoria=${encodeURIComponent(
                category.name
              )}`}
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
            href="/repuestos"
            className="block rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-center text-sm font-semibold text-blue-600"
          >
            Ver todos los repuestos →
          </Link>
        </div>
      </div>
    </section>
  );
}
