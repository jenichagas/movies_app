"use client";

import { useState } from "react";
import { login } from "@/lib/auth-actions";
import styles from "./Login.module.scss";

type FormType = "login" | "register" | "reset";


const LoginForm = ({
  setFormType,
}: {
  setFormType: (type: FormType) => void;
}) => (
  <>
    <p className={styles.title}>
      Faça login para acessar sua conta no Cine Box.
    </p>
    <div className={styles.form}>
      <div className={styles.inputGroup}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="seu@email.com"
          autoComplete="email"
        />
      </div>
      <div className={styles.inputGroup}>
        <label>Senha</label>
        <input
          type="password"
          name="password"
          placeholder="********"
          autoComplete="current-password"
        />
      </div>
      <form className={styles.form} action={login}>
        <button type="submit" className={styles.loginButton}>
          Entrar
        </button>
      </form>
      <div className={styles.separator}>ou</div>
      <div className={styles.links}>
        <a href="#" onClick={() => setFormType("register")}>
          Cadastre-se agora!
        </a>
        <a href="#" onClick={() => setFormType("reset")}>
          Esqueci minha senha
        </a>
      </div>
    </div>
  </>
);

const RegisterForm = ({
  setFormType,
}: {
  setFormType: (type: FormType) => void;
}) => (
  <>
    <p className={styles.title}>
      Crie sua conta para começar a usar o Cine Box.
    </p>
    <div className={styles.form}>
      <div className={styles.inputGroup}>
        <label>Nome</label>
        <input type="text" name="name" placeholder="Seu nome completo" />
      </div>
      <div className={styles.inputGroup}>
        <label>Email</label>
        <input type="email" name="email" placeholder="seu@email.com" />
      </div>
      <div className={styles.inputGroup}>
        <label>Senha</label>
        <input type="password" name="password" placeholder="********" />
      </div>
      <div className={styles.inputGroup}>
        <label>Confirmar senha</label>
        <input type="password" name="password_confirm" placeholder="********" />
      </div>
      <form className={styles.form}>
        <button type="submit" className={styles.loginButton}>
          Criar Conta
        </button>
      </form>
      <div className={styles.separator}>ou</div>
      <div className={`${styles.links} ${styles.center}`} >
        <a href="#" onClick={() => setFormType("login")}>
          Já tem uma conta? Faça login.
        </a>
      </div>
    </div>
  </>
);

const ResetForm = ({
  setFormType,
}: {
  setFormType: (type: FormType) => void;
}) => (
  <>
    <p className={styles.title}>
      Recupere seu acesso.
      <span className={styles.subtitle}>
        Enviaremos um link para seu e-mail para você redefinir sua senha.
      </span>
    </p>

    <div className={styles.form}>
      <div className={styles.inputGroup}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="seu@email.com"
          autoComplete="email"
        />
      </div>
      <form className={styles.form}>
        <button type="submit" className={styles.loginButton}>
          Enviar link de recuperação
        </button>
      </form>
      <div className={styles.separator}>ou</div>
      <div className={`${styles.links} ${styles.center}`} >
        <a href="#" onClick={() => setFormType("login")}>
          Lembrou a senha? Faça login.
        </a>
      </div>
    </div>
  </>
);


export default function AuthForm() {
  const [formType, setFormType] = useState<FormType>("login");

  const renderForm = () => {
    switch (formType) {
      case "register":
        return <RegisterForm setFormType={setFormType} />;
      case "reset":
        return <ResetForm setFormType={setFormType} />;
      case "login":
      default:
        return <LoginForm setFormType={setFormType} />;
    }
  };

  return <div>{renderForm()}</div>;
}
