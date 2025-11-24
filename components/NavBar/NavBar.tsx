"use client";

import Logo from "@/components/Logo";
import Dropdown from "../Dropdown";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { IoSettings } from "react-icons/io5";
import userMascot from "@/public/user-mascot.json";
import { useRef, useState } from "react";
import style from "./NavBar.module.scss";
import Link from "next/link";

export default function NavBar() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [isClicked, setIsClicked] = useState(false);
  const DELAY_ENTRE_LOOPS = 2000;
  const handleAnimationComplete = () => {
    setTimeout(() => {
      lottieRef.current?.goToAndPlay(0, true);
    }, DELAY_ENTRE_LOOPS);
  };

  const handleIconClick = () => {
    lottieRef.current?.goToAndPlay(0, true);

    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 200);
  };

  return (
    <div className={style.navBar}>
      <Logo />
      <div className={style.actions}>
        <div className={style.userName}>Olá, Jeniffer!</div>
        <div
          className={`${style.userIcon} ${
            isClicked ? style.userIconClicked : ""
          }`}
          onClick={handleIconClick}
        >
          <Lottie
            lottieRef={lottieRef}
            animationData={userMascot}
            loop={false}
            onComplete={handleAnimationComplete}
          />
        </div>
        <div className={style.settingsIcon}>
          <Dropdown trigger={() => <IoSettings />}>
            <div className={style.settingsMenu}>
              <Link href="#"><p>Perfil</p></Link>
              <Link href="#"><p>Minha Lista</p> </Link>
              <hr />
              <Link href="#"><p>Sair</p></Link>
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
