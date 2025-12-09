import styles from "./ButtonDownload.module.scss";
import { FaRegFolderOpen } from "react-icons/fa6";

export default function ButtonDownload() {
  return (
    <div>
      <div className={styles.container}>
        <label className={styles.label}>
          <input type="checkbox" className={styles.input} />
          <span className={styles.circle}>
            <svg
              className={styles.icon}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 19V5m0 14-4-4m4 4 4-4"
              />
            </svg>
            <div className={styles.square} />
          </span>
          <p className={styles.title}>Baixar agora</p>
          <p className={styles.title}>Abrir</p>
        </label>
      </div>
    </div>
  );
}
