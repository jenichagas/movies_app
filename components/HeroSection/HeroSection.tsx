import Menu from "../Menu";
import styles from "./HeroSection.module.scss";

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

export default function HeroSection({ onSearch }: HeroSectionProps) {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroContent}>
        <img src="/movie-banner.jpg" alt="Imagem banner filme" />
        <Menu onSearch={onSearch} />
      </div>
    </div>
  );
}
