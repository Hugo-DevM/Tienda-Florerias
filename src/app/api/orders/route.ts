import { NextRequest, NextResponse } from "next/server";
import { getOrdersFromGitHub, saveOrdersToGitHub } from "@/lib/github";
import { Order } from "@/types";

export async function GET() {
  try {
    const data = await getOrdersFromGitHub();
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/orders:", error);
    return NextResponse.json({ error: "Error al obtener pedidos" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orders, sha } = await getOrdersFromGitHub();

    const newOrder: Order = {
      id: crypto.randomUUID(),
      items: body.items,
      total: body.total,
      status: "pending",
      notes: body.notes ?? "",
      createdAt: new Date().toISOString(),
    };

    await saveOrdersToGitHub([newOrder, ...orders], sha);
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error("POST /api/orders:", error);
    return NextResponse.json({ error: "Error al registrar pedido" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { orders, sha } = await getOrdersFromGitHub();

    const updated = orders.map((o: Order) =>
      o.id === body.id ? { ...o, ...body } : o
    );

    await saveOrdersToGitHub(updated, sha);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT /api/orders:", error);
    return NextResponse.json({ error: "Error al actualizar pedido" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    const { orders, sha } = await getOrdersFromGitHub();
    await saveOrdersToGitHub(orders.filter((o: Order) => o.id !== id), sha);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/orders:", error);
    return NextResponse.json({ error: "Error al eliminar pedido" }, { status: 500 });
  }
}
