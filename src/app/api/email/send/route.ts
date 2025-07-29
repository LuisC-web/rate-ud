import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
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
    console.log(emailExist);

    if (emailExist) {
      return new Response(
        JSON.stringify({
          error: "El codigo ya fue enviado, espera 10 minutos y solicita otro.",
        }),
        { status: 429 },
      );
    }
    const code = generateCode();

    const subject = "Tu código de verificación";
    const html = `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2>¡Hola!</h2>
        <p>Tu código de verificación es:</p>
        <h1 style="background: #f4f4f4; padding: 10px; display: inline-block;">${code}</h1>
        <p>Este código expirará en 10 minutos.</p>
        <p>Si no solicitaste este código, ignora este mensaje.</p>
        <br>
        <small>Enviado por referenciasud.online</small>
      </div>
    `;
    const { data, error } = await resend.emails.send({
      from: "Notificaciones <no-reply@referenciasud.online>",
      to: email,
      subject,
      html,
    });

    if (error) {
      return new Response(JSON.stringify({ error }), { status: 500 });
    }
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await prisma.code.create({ data: { email, code, expiresAt } });

    return new Response(JSON.stringify({ success: true, code, data }), {
      status: 200,
    });
  } catch (err: any) {
    console.log(err);

    return new Response(
      JSON.stringify({ error: "Error interno", detail: err.message }),
      { status: 500 },
    );
  }
}
