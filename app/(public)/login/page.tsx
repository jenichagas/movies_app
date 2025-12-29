import Link from "next/link";
import { login } from "@/lib/auth-actions";
import Logo from "@/components/Logo";
import styles from "./Login.module.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - CINE BOX",
};

export default function LoginPage() {
  return (
    <div className={styles.loginPage}>
      <main className={styles.loginCard}>
        <div className={styles.logoContainer}>
          <Logo />
        </div>
        <h1 className={styles.title}>Bem vindo de volta!</h1>

        {/* Formulário de login tradicional (ação a ser implementada no futuro) */}
        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="seu@email.com"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
            />
          </div>
          <button type="submit" className={styles.loginButton}>
            Entrar
          </button>
          <div className={styles.links}>
            <Link href="#">Cadastre-se agora!</Link>
            <Link href="#">Esqueci minha senha</Link>
          </div>
        </form>

        <div className={styles.separator}>ou</div>

        {/* Formulário para login com TMDB via Server Action */}
        <form action={login}>
          <button type="submit" className={styles.tmdbButton}>
            Entrar com TMDB
          </button>
        </form>
      </main>
    </div>
  );
}
