import Image from "next/image";
import styles from "./Logo.module.scss";
import  Link  from "next/link";

export default function Logo() {
  return (
    <div className={styles.logoContainer}>
      <Link href="/">
        <Image
          src="/logo-inline.png"
          alt="Logo"
          width={170}
          height={30}
          loading="eager"
          className={styles.logo}
        />
      </Link>
    </div>
  );
}
