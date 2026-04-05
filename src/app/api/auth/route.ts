import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (!process.env.DASHBOARD_PASSWORD) {
    return NextResponse.json(
      { error: "DASHBOARD_PASSWORD no configurado" },
      { status: 500 }
    );
  }

  if (password === process.env.DASHBOARD_PASSWORD) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json(
    { error: "Contraseña incorrecta" },
    { status: 401 }
  );
}
