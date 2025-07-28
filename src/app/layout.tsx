import type { Metadata } from "next";
import { Itim } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const itim = Itim({
  variable: "--font-itim",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Califica a tu profesor-UD",
  description: "Califica a tu profesor de forma anonima",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${itim.variable} font-sans`}>
      <body className="flex h-screen min-h-screen flex-col bg-white text-gray-900 antialiased">
        <Header />
        <main className="flex flex-grow flex-col">{children}</main>
      </body>
    </html>
  );
}
