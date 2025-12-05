import type { Metadata } from "next";

import "./globals.scss";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "CINE BOX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <main>
          <NavBar />
          {children}
        </main>
        <div id="portal-root"></div>
        <Footer />
      </body>
    </html>
  );
}
