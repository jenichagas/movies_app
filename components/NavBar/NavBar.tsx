import style from "./NavBar.module.scss";
import Logo from "@/components/Logo";
import Link from "next/link";
import { TiHomeOutline } from "react-icons/ti";

export default function NavBar() {
  return (
    <div className={style.navBar}>
      <Logo />
      <Link href="/">
        <div className={style.links}>
          <TiHomeOutline />
          <p>Início</p>
        </div>
      </Link>
    </div>
  );
}
