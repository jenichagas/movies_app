import Link from "next/link";
import styles from "./Footer.module.scss";
import SocialTooltip from "../SocialTooltip";
import Logo from "../Logo";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.logoSocial}>
          <Logo />
          <div className={styles.socialIcons}>
            <SocialTooltip />
          </div>
        </div>
        <div className={styles.links}>
          <div className={styles.linkColumn}>
            <h4>Navegação</h4>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/movies">Filmes</Link>
              </li>
              <li>
                <Link href="/series">Séries</Link>
              </li>
              <li>
                <Link href="/my-list">Minha Lista</Link>
              </li>
            </ul>
          </div>
          <div className={styles.linkColumn}>
            <h4>Conta</h4>
            <ul>
              <li>
                <Link href="/account">Minha Conta</Link>
              </li>
              <li>
                <Link href="/subscription">Assinatura</Link>
              </li>
              <li>
                <Link href="/login">Login</Link>
              </li>
            </ul>
          </div>
          <div className={styles.linkColumn}>
            <h4>Legal</h4>
            <ul>
              <li>
                <Link href="/terms">Termos de Uso</Link>
              </li>
              <li>
                <Link href="/privacy">Política de Privacidade</Link>
              </li>
              <li>
                <Link href="/contact">Contato</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>
          &copy; {new Date().getFullYear()} CINE BOX. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}
