import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scheune Jonatal – Zur Vermietung",
  description:
    "Grosszügige Scheune im Jonatal, Wald ZH zu vermieten. Ideal für landwirtschaftliche Nutzung. Kontaktieren Sie uns für mehr Informationen.",
  openGraph: {
    title: "Scheune Wald ZH – Zur Vermietung",
    description:
      "Grosszügige Scheune im Jonatal, Wald ZH zu vermieten. Ideal für landwirtschaftliche Nutzung.",
    type: "website",
    locale: "de_CH",
    siteName: "Scheune Wald ZH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scheune Wald ZH – Zur Vermietung",
    description:
      "Grosszügige Scheune im Jonatal, Wald ZH zu vermieten. Ideal für landwirtschaftliche Nutzung.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
