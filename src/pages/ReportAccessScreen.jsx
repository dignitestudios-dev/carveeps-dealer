import React, { useContext, useEffect } from "react";
import ReportAccess from "../components/ReportAccess/ReportAccess";
import { GlobalContext } from "../context/GlobalContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

const ReportAccessScreen = () => {
  const { navigateToLink, fetchToken } = useContext(GlobalContext);
  // useEffect(() => {
  //   const token = Cookies.get("token");
  //   const isAccessKeyAdded = Cookies.get("isAccessKeyAdded") === "true";

  //   if (token && isAccessKeyAdded) {
  //     fetchToken().then(() => {
  //       navigateToLink("/dashboard", "Dashboard");
  //     });
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
      <ReportAccess />
    </div>
  );
};

export default ReportAccessScreen;
