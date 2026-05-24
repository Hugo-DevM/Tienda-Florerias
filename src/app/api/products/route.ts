import { NextRequest, NextResponse } from "next/server";
import { getProductsFromGitHub, saveProductsToGitHub } from "@/lib/github";
import { Product } from "@/types";

export async function GET() {
  try {
    const data = await getProductsFromGitHub();
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/products:", error);
    return NextResponse.json(
      { error: "Error al obtener productos" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { products, sha } = await getProductsFromGitHub();

    const newProduct: Product = {
      id: crypto.randomUUID(),
      name: body.name,
      description: body.description,
      price: Number(body.price),
      image: body.image,
      category: body.category,
      visible: true,
      featured: Boolean(body.featured),
      badge: body.badge || "",
      occasions: body.occasions ?? [],
      createdAt: new Date().toISOString(),
    };

    await saveProductsToGitHub([...products, newProduct], sha);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("POST /api/products:", error);
    return NextResponse.json(
      { error: "Error al crear producto" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { products, sha } = await getProductsFromGitHub();

    const updated = products.map((p: Product) =>
      p.id === body.id ? { ...p, ...body } : p
    );

    await saveProductsToGitHub(updated, sha);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT /api/products:", error);
    return NextResponse.json(
      { error: "Error al actualizar producto" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    const { products, sha } = await getProductsFromGitHub();

    const filtered = products.filter((p: Product) => p.id !== id);
    await saveProductsToGitHub(filtered, sha);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/products:", error);
    return NextResponse.json(
      { error: "Error al eliminar producto" },
      { status: 500 }
    );
  }
}
