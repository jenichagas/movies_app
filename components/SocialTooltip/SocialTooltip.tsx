import styles from "./SocialTooltip.module.scss";
import {
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

export default function SocialTooltip() {
  return (
    <div className={styles.socialIconsContainer}>
      <div className={`${styles.iconWrapper} ${styles.insta}`}>
        <p className={styles.iconName}>Instagram</p>
        <div className={`${styles.icon} ${styles.insta}`}>
          <FaInstagram size={25} />
        </div>
      </div>
      <div className={`${styles.iconWrapper} ${styles.whatsapp}`}>
        <p className={styles.iconName}>WhatsApp</p>
        <div className={`${styles.icon} ${styles.whats}`}>
          <FaWhatsapp size={25} />
        </div>
      </div>
      <div className={`${styles.iconWrapper} ${styles.youtube}`}>
        <p className={styles.iconName}>YouTube</p>
        <div className={`${styles.icon} ${styles.tube}`}>
          <FaYoutube size={25} />
        </div>
      </div>
    </div>
  );
}
