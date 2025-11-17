import Image from "next/image";
import styles from "./Logo.module.scss";

export default function Logo() {
  return (
    <div className={styles.logoContainer}>
      <Image
        src="/logo-inline.png"
        alt="Logo"
        width={150}
        height={30}
        loading="eager"
        className={styles.logo}
      />
    </div>
  );
}
