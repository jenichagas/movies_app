import type { Metadata } from "next";
import { FavoritesProvider } from "@/contexts/FavoriteContext";
import { ToastProvider } from "@/providers/toast-provider";
import "@/app/globals.scss";
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
        <ToastProvider />
          <FavoritesProvider>
            <main>
              <NavBar />
              <div
              className="layout"
              >{children}</div>
            </main>
            <div id="portal-root"></div>
            <Footer />
          </FavoritesProvider>
      </body>
    </html>
  );
}
