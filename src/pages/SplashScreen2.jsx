import React, { useContext, useEffect } from "react";
import { styles } from "../styles/styles";
import { SplashImage } from "../assets/export";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import { GlobalContext } from "../context/GlobalContext";
import axios from "axios";

const SplashScreen2 = () => {
  const navigate = useNavigate();
  const { navigateToLink, baseUrl, setError } = useContext(GlobalContext);
  const handleNavigate = () => {
    navigate("/login");
  };
  // useEffect(() => {
  //   const token = Cookies.get("token");
  //   const isBankAccountAdded = Cookies.get("isBankAccountAdded") === "true";
  //   const isProfileCompleted = Cookies.get("isProfileCompleted") === "true";
  //   const isStripeProfileCompleted =
  //     Cookies.get("isStripeProfileCompleted") === "true";
  //   const isAccessKeyAdded = Cookies.get("isAccessKeyAdded") === "true";

  //   if (
  //     token &&
  //     isProfileCompleted &&
  //     isStripeProfileCompleted &&
  //     isAccessKeyAdded
  //   ) {
  //     navigateToLink("/dashboard", "Dashboard");
  //     setNewUpdate((prev) => !prev);
  //   } else if (
  //     token &&
  //     !isProfileCompleted &&
  //     !isStripeProfileCompleted &&
  //     !isAccessKeyAdded
  //   ) {
  //     navigateToLink("/profile-setup", "Profile Setup");
  //   } else if (
  //     token &&
  //     isProfileCompleted &&
  //     !isStripeProfileCompleted &&
  //     !isAccessKeyAdded
  //   ) {
  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //     };
  //     axios
  //       .post(
  //         `${baseUrl}/dealership/completeStripeProfile`,
  //         {},
  //         {
  //           headers,
  //         }
  //       )
  //       .then((res) => {
  //         window.location.href = res?.data?.data?.url;
  //       })
  //       .catch((err) => {
  //         setError(err?.response?.data?.message);
  //       });
  //   } else if (
  //     token &&
  //     isProfileCompleted &&
  //     !isStripeProfileCompleted &&
  //     isAccessKeyAdded
  //   ) {
  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //     };
  //     axios
  //       .post(
  //         `${baseUrl}/dealership/completeStripeProfile`,
  //         {},
  //         {
  //           headers,
  //         }
  //       )
  //       .then((res) => {
  //         window.location.href = res?.data?.data?.url;
  //       })
  //       .catch((err) => {
  //         setError(err?.response?.data?.message);
  //       });
  //   } else if (
  //     isProfileCompleted &&
  //     isStripeProfileCompleted &&
  //     !isAccessKeyAdded
  //   ) {
  //     navigateToLink("/report-access", "Profile Setup");
  //   }
  // }, []);
  return (
    <div
      className={`w-screen h-screen flex flex-col text-center items-center justify-center gap-6 ${styles.bodyBg} px-2`}
    >
      <img
        src={SplashImage}
        alt="splash-image"
        className="w-[246px] h-[234px]"
      />
      <h1 className="text-[32px] font-bold">Welcome to CARVEEPS</h1>
      <p className="text-[#5C5C5C] text-base font-medium">
        Step into the Dealer Panel, where dealers shape bespoke subscription
        plans, putting the power of <br /> choice in their hands.
      </p>
      <div>
        <button
          onClick={handleNavigate}
          className={`${styles.bgOrange} text-white w-[300px] lg:w-[460px] h-[52px] font-bold text-base rounded-lg`}
        >
          Log in
        </button>
      </div>
    </div>
  );
};

export default SplashScreen2;
