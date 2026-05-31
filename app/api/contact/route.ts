import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, phone, message } = await request.json();

  const { error } = await resend.emails.send({
    from: "Scheune Jonatal <onboarding@resend.dev>",
    to: "max.bloechlinger.job@gmail.com",
    replyTo: email,
    subject: `Anfrage von ${name}`,
    text: [
      `Name: ${name}`,
      `E-Mail: ${email}`,
      phone ? `Telefon: ${phone}` : null,
      ``,
      message,
    ]
      .filter((l) => l !== null)
      .join("\n"),
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true });
}
