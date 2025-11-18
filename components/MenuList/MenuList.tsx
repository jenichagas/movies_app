import styles from "./MenuList.module.scss";
import { PiFilmSlateBold } from "react-icons/pi";
import { TbStars } from "react-icons/tb";
import { MdOutlineWidgets } from "react-icons/md";
import { BiCameraMovie } from "react-icons/bi";

export default function MenuList() {
  return (
    <div className={styles.menuList}>
      <div className={styles.menuItem}>
        <PiFilmSlateBold />
        <p>Filmes</p>
      </div>
      |
      <div className={styles.menuItem}>
        <BiCameraMovie />
        <p>Séries</p>
      </div>
      |
      <div className={styles.menuItem}>
        <TbStars />
        <p>Mais populares</p>
      </div>
      |
      <div className={styles.menuItem}>
        <MdOutlineWidgets />
        <p>Mais recentes</p>
      </div>
    </div>
  );
}
