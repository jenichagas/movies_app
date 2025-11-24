"use client";
import style from "./NavBar.module.scss";
import Logo from "@/components/Logo";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import userMascot from "@/public/user-mascot.json";
import { useRef, useState } from "react";

export default function NavBar() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [isClicked, setIsClicked] = useState(false);
  const DELAY_ENTRE_LOOPS = 2000; 

  const handleAnimationComplete = () => {
    setTimeout(() => {
      lottieRef.current?.play();
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
        <div className={style.userName}>Jeniffer</div>
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
      </div>
    </div>
  );
}