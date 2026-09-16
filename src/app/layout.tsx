import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { UiEnhancements } from "@/components/ui-enhancements";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.giovannapadalino.it"),
  title: {
    default: "Dott.ssa Giovanna V. Padalino | Psicologa Clinica & Pedagogista - Bologna e Online",
    template: "%s | Dott.ssa Giovanna Padalino",
  },
  description:
    "Sostegno psicologico e pedagogico a Bologna e online per bambini, adolescenti, giovani adulti, adulti e famiglie. Specializzata in ADHD, DSA, neurodivergenze e genitorialità. Iscritta all'Ordine degli Psicologi dell'Emilia-Romagna n. 12479.",
  keywords: [
    "Psicologa Bologna",
    "Psicologa Clinica Bologna",
    "Psicologa Online",
    "Dott.ssa Giovanna Padalino",
    "Giovanna Valentina Padalino",
    "ADHD adulti Bologna",
    "ADHD bambini e adolescenti",
    "Pedagogista Bologna",
    "Tecnico ABA Bologna",
    "Disturbi evolutivi specifici",
    "DSA e metodo di studio",
    "Supporto alla genitorialità",
    "Psicoterapia e benessere emotivo",
  ],
  authors: [{ name: "Dott.ssa Giovanna V. Padalino" }],
  creator: "Dott.ssa Giovanna V. Padalino",
  publisher: "Lumina Digital",
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://www.giovannapadalino.it",
    title: "Dott.ssa Giovanna V. Padalino | Psicologa Clinica & Pedagogista",
    description:
      "Sostegno psicologico e pedagogico a Bologna e online. Uno spazio accogliente per ascoltarsi e ritrovarsi.",
    siteName: "Dott.ssa Giovanna Padalino - Studio di Psicologia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dott.ssa Giovanna V. Padalino | Psicologa a Bologna e Online",
    description:
      "Sostegno psicologico rivolto a bambini, adolescenti, giovani adulti, adulti e famiglie.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.giovannapadalino.it",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="font-sans min-h-full flex flex-col">
        <Header />
        <main className="flex-1 shrink-0 pt-16 md:pt-24">
          {children}
        </main>
        <UiEnhancements />
        <Footer />
      </body>
    </html>
  );
}
