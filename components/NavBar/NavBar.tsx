"use client";

import { MdOutlineFavorite } from "react-icons/md";
import Logo from "@/components/Logo";
import Dropdown from "../Dropdown";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { IoSettings } from "react-icons/io5";
import userMascot from "@/public/user-mascot.json";
import { useRef, useState } from "react";
import style from "./NavBar.module.scss";
import Link from "next/link";

interface SettingsMenuProps {
  closeDropdown?: () => void;
}

const SettingsMenu = ({ closeDropdown }: SettingsMenuProps) => {
  const handleClick = () => {
    if (closeDropdown) {
      closeDropdown();
    }
  };

  return (
    <div className={style.settingsMenu}>
      <Link href="#" onClick={handleClick}>
        <p>Perfil</p>
      </Link>
      <Link href="#" onClick={handleClick}>
        <p>Minha Lista</p>{" "}
      </Link>
      <hr />
      <Link href="#" onClick={handleClick}>
        <p>Sair</p>
      </Link>
    </div>
  );
};

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
        <div>
          <Link href="/">
            <p className={style.favMovies}>
              <MdOutlineFavorite />
              Favoritos
            </p>
          </Link>
        </div>
        <div>
          <Dropdown
            trigger={() => <IoSettings className={style.settingsIcon} />}
          >
            <SettingsMenu />
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
