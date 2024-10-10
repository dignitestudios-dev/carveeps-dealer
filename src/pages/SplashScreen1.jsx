import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SplashImage } from "../assets/export";
import { styles } from "../styles/styles";

const SplashScreen1 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      navigate("/splash-screen");
    }, 2100);

    return () => clearTimeout(redirectTimeout);
  }, []);
  return (
    <div
      className={`w-screen h-screen flex items-center justify-center ${styles.bodyBg} overflow-x-hidden`}
    >
      <img src={SplashImage} alt="splash-img" className="scale-down-center" />
    </div>
  );
};

export default SplashScreen1;
