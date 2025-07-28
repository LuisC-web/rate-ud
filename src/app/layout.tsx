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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${itim.variable} font-sans antialiased min-h-screen h-full md:h-screen w-screen`}
      >
        <Header></Header>
        {children}
      </body>
    </html>
  );
}
