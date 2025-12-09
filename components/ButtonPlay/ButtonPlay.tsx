import styles from "./ButtonPlay.module.scss";

export default function ButtonPlay() {
  return (
    <div>
      <button className={styles.buttonPlay}>
        <span>Assistir</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 24">
          <polygon points="38,3 52,12 38,21"></polygon>
          <polygon points="18,3 32,12 18,21"></polygon>
          <polygon points="-2,3 12,12 -2,21"></polygon>
        </svg>
      </button>
    </div>
  );
}
