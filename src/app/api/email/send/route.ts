import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";
interface SendEmailRequestBody {
  email: string;
}

const generateCode = () =>
  Math.floor(100000 + Math.random() * 900000).toString();
export async function POST(req: Request) {
  try {
    const { email } = (await req.json()) as SendEmailRequestBody;

    if (!email) {
      return new Response(
        JSON.stringify({ error: "El campo 'email' es obligatorio." }),
        { status: 400 },
      );
    }
    const emailExist = await prisma.code.findUnique({ where: { email } });

    if (emailExist) {
      const now = new Date();
      if (emailExist.expiresAt < now) {
        await prisma.code.delete({ where: { email } });
      }
      return new Response(
        JSON.stringify({
          error: "El codigo ya fue enviado, espera 10 minutos y solicita otro.",
        }),
        { status: 429 },
      );
    }
    const code = generateCode();
    const transporter = nodemailer.createTransport({
      host: "live.smtp.mailtrap.io",
      port: 587,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });
    const mailOptions = {
      from: "Notificaciones<info@referenciasud.online>",
      to: email,
      subject: "Tu código de verificación",
      html: `
    <div style="font-family: sans-serif; padding: 20px;">
      <h2>¡Hola!</h2>
      <p>Tu código de verificación es:</p>
      <h1 style="background: #f4f4f4; padding: 10px; display: inline-block;">${code}</h1>
      <p>Este código expirará en 10 minutos.</p>
      <p>Si no solicitaste este código, ignora este mensaje.</p>
      <br>
      <small>Enviado por referenciasud.online</small>
    </div>
  `,
    };
    await transporter.sendMail(mailOptions);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await prisma.code.create({ data: { email, code, expiresAt } });

    return new Response(JSON.stringify({ success: true, code }), {
      status: 200,
    });
  } catch (err: unknown) {
    console.log(err);

    return new Response(
      JSON.stringify({
        error: "Error interno",
        detail:
          typeof err === "object" && err !== null && "message" in err
            ? (err as { message: string }).message
            : String(err),
      }),
      { status: 500 },
    );
  }
}
