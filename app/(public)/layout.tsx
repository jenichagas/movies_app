import React from "react";
import "@/app/globals.scss";
import { ToastProvider } from "@/providers/toast-provider";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <ToastProvider />
        <main>{children}</main>
      </body>
    </html>
  );
}
