import Menu from "../Menu";
import styles from "./HeroSection.module.scss";

export default function HeroSection() {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroContent}>
        <img src="/movie-banner.jpg" alt="Imagem banner filme" />
        <Menu />
      </div>
    </div>
  );
}
