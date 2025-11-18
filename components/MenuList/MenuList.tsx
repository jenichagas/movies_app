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
        Filmes
      </div>
      {/* | */}
      <div className={styles.menuItem}>
        <BiCameraMovie />
        Séries
      </div>
      {/* | */}
      <div className={styles.menuItem}>
        <TbStars />
        Populares
      </div>
      {/* | */}
      <div className={styles.menuItem}>
        <MdOutlineWidgets />
        Adicionados recentes
      </div>
    </div>
  );
}
