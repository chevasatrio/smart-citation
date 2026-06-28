import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CitasiCerdas — Generator Sitasi Akademik APA 7th Edition",
  description:
    "Buat sitasi dan daftar pustaka secara otomatis mengikuti standar APA 7th Edition. Mendukung format Buku, Jurnal, dan Website untuk mahasiswa, peneliti, dan akademisi Indonesia.",
  keywords: ["sitasi", "citation", "APA", "daftar pustaka", "referensi", "akademik", "Indonesia"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
