import MenuList from "../MenuList";
import Search from "../Search";
import styles from "./Menu.module.scss";

export default function Menu() {
  return (
    <div className={styles.menu}>
      <MenuList />
      <Search />
    </div>
  );
}
