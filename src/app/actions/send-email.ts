"use server";

import { Resend } from "resend";
import { z } from "zod";
import { headers } from "next/headers";
import { checkRateLimit } from "@/lib/admin-auth";

const formSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(40).optional(),
  message: z.string().trim().min(10).max(4000),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: "È necessario acconsentire all'informativa privacy.",
  }),
});

export async function sendEmail(data: z.infer<typeof formSchema>) {
  const hdrs = await headers();
  const ip =
    hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    hdrs.get("x-real-ip")?.trim() ||
    "unknown";

  const rate = checkRateLimit(`contact:${ip}`, 5, 15 * 60 * 1000);
  if (!rate.allowed) {
    return {
      success: false,
      error: "Hai inviato troppe richieste. Riprova tra qualche minuto.",
    };
  }

  const result = formSchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: "Dati non validi" };
  }

  const { name, email, phone, message } = result.data;

  if (!process.env.RESEND_API_KEY) {
    return {
      success: false,
      error: "Servizio email momentaneamente non configurato.",
    };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const targetEmail = process.env.CONTACT_EMAIL || "psi.padalino@gmail.com";

  try {
    await resend.emails.send({
      from: "Lumina Studio <onboarding@resend.dev>",
      to: [targetEmail],
      replyTo: email,
      subject: `Nuova richiesta di consulto da ${name.replace(/[\r\n]/g, " ")}`,
      text: `Nome: ${name}\nEmail: ${email}\nTelefono: ${phone || "Non fornito"}\n\nMessaggio:\n${message}`,
    });
    return { success: true };
  } catch (error) {
    console.error("Errore invio email:", error);
    return { success: false, error: "Errore durante l'invio" };
  }
}
