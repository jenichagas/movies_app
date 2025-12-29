import Logo from "@/components/Logo";
import style from "./NavBar.module.scss";
import UserAuth from "../UserAuth/UserAuth";

export default function NavBar() {
  return (
    <div className={style.navBar}>
      <Logo />

      <div className={style.actions}>
        <UserAuth />
      </div>
    </div>
  );
}
