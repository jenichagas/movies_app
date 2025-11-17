import style from "./NavBar.module.scss";
import Logo from "@/components/Logo";

export default function NavBar() {
  return (
    <div className={style.navBar}>
      <Logo />
    </div>
  );
}
