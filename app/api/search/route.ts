import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.trim() ?? "";

    if (query.length < 2) {
      return NextResponse.json([]);
    }

    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            reference: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            brand: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            category: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        slug: true,
        reference: true,
        brand: true,
        category: true,
        price: true,
        image: true,
      },
      orderBy: {
        name: "asc",
      },
      take: 6,
    });

    return NextResponse.json(
      products.map((product) => ({
        ...product,
        price: Number(product.price),
      }))
    );
  } catch (error) {
    console.error("Error en búsqueda:", error);

    return NextResponse.json(
      {
        error: "No fue posible realizar la búsqueda",
      },
      {
        status: 500,
      }
    );
  }
}