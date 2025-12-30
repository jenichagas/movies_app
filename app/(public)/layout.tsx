import React from "react";
import { Metadata } from "next";
import styles from "./Login.module.scss";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "Login - CINE BOX",
};

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={styles.loginPage}>
      <main className={styles.loginCard}>
        <div className={styles.logoContainer}>
          <Logo />
        </div>
        {children}
      </main>
    </div>
  );
}
