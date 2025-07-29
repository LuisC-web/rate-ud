import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface VerifyCodeRequestBody {
  email: string;
  code: string;
}

export async function POST(req: Request) {
  try {
    const { email, code } = (await req.json()) as VerifyCodeRequestBody;

    if (!email || !code) {
      return NextResponse.json(
        { error: "Faltan campos requeridos." },
        { status: 400 },
      );
    }

    const storedCode = await prisma.code.findUnique({ where: { email } });

    if (!storedCode) {
      return NextResponse.json(
        { error: "No se encontró un código para este correo." },
        { status: 404 },
      );
    }

    const now = new Date();

    if (storedCode.code !== code) {
      return NextResponse.json(
        { error: "Código incorrecto." },
        { status: 401 },
      );
    }

    if (storedCode.expiresAt < now) {
      await prisma.code.delete({ where: { email } });
      return NextResponse.json(
        { error: "El código ha expirado." },
        { status: 410 },
      );
    }

    await prisma.code.delete({ where: { email } });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: unknown) {
    console.error(err);
    return NextResponse.json(
      {
        error: "Error interno",
        detail:
          typeof err === "object" && err !== null && "message" in err
            ? (err as { message: string }).message
            : String(err),
      },
      { status: 500 },
    );
  }
}
