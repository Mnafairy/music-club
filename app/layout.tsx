import type { Metadata, Viewport } from "next";
import { Archivo_Black, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo-black",
  adjustFontFallback: false,
  fallback: ["Archivo Black", "sans-serif"],
});

const jetBrainsMono = JetBrains_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains-mono",
  adjustFontFallback: false,
  fallback: ["JetBrains Mono", "monospace"],
});

export const metadata: Metadata = {
  title: "ДУУ // 8 КЛУБ",
  description: "НАЙМАН ДУГУЙЛАН НЭГ САНАА",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="mn"
      className={`${archivoBlack.variable} ${jetBrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
