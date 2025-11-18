import MenuList from "../MenuList";
import Search from "../Search";
import styles from "./Menu.module.scss";

interface MenuProps {
  onSearch: (query: string) => void;
}

export default function Menu({ onSearch }: MenuProps) {
  return (
    <div className={styles.menu}>
      <MenuList />
      <Search onSearch={onSearch} />
    </div>
  );
}
