import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { ToastProvider } from "@/providers/toast-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cine Box",
  description: "Seu aplicativo de filmes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
