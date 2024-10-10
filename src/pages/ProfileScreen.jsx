import React, { useContext, useEffect } from "react";
import ProfileSection from "../components/Profile/ProfileSection";
import Cookies from "js-cookie";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router";

const ProfileScreen = () => {
  const { navigateToLink } = useContext(GlobalContext);
  // useEffect(() => {
  //   const token = Cookies.get("token");
  //   const isProfileCompleted = Cookies.get("isProfileCompleted") === "true";

  //   if (token && isProfileCompleted) {
  //     navigateToLink("/complete-stripe-profile", "Profile Setup");
  //   }
  // }, []);
  const navigate = useNavigate();
  return (
    <div>
      <div className="w-full h-12 flex justify-end items-center">
        <button
          onClick={() => {
            Cookies.remove("token");
            navigate("/login");
          }}
          className="w-36 h-10 rounded-lg flex items-center justify-center bg-[#ff204e] text-sm text-white font-medium"
        >
          Logout
        </button>
      </div>
      <ProfileSection />
    </div>
  );
};

export default ProfileScreen;
