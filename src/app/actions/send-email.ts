"use server";

import { Resend } from "resend";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
  privacyConsent: z.boolean().optional(),
});

export async function sendEmail(data: z.infer<typeof formSchema>) {
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: "Dati non validi" };
  }

  const { name, email, phone, message } = result.data;
  
  if (!process.env.RESEND_API_KEY) {
    console.log("[LUMINA MOCK EMAIL]", { name, email, phone, message });
    // Simulate network delay for prototype feeling
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { success: true };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const targetEmail = process.env.CONTACT_EMAIL || "hello@luminadigital.it";

  try {
    await resend.emails.send({
      from: "Lumina Studio <onboarding@resend.dev>",
      to: [targetEmail], // Legge l'email dal server Vercel per ogni cliente
      subject: `Nuova richiesta di consulto da ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\nTelefono: ${phone || "Non fornito"}\n\nMessaggio:\n${message}`,
    });
    return { success: true };
  } catch (error) {
    console.error("Errore invio email:", error);
    return { success: false, error: "Errore durante l'invio" };
  }
}
