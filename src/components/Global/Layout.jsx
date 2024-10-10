import React, { useContext, useEffect, useRef, useState } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { Logo, ToyotaLogo } from "../../assets/export";
import { styles } from "../../styles/styles";
import Sidebar from "./Sidebar";
import { Link, useLocation } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { GlobalContext } from "../../context/GlobalContext";
import Cookies from "js-cookie";
import Error from "./Error";
import axios from "axios";

const Layout = ({ pages }) => {
  const sidebarRef = useRef(null);
  const location = useLocation();
  const hideSidebarRoutes = [
    "/profile-setup",
    "/payment",
    "/report-access",
    "/complete-stripe-profile",
  ];
  const isSidebarHidden = hideSidebarRoutes.includes(location.pathname);
  const {
    navigateToLink,
    error,
    setError,
    show,
    notification,
    baseUrl,
    setShow,
    setNewUpdate,
  } = useContext(GlobalContext);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 5000);
  }, [show]);

  const [isOpen, setisOpen] = useState(false);
  const toggleModal = () => {
    setisOpen(!isOpen);
  };

  // useEffect(() => {
  //   const token = Cookies.get("token");
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
    <div className="w-screen h-screen flex justify-start items-start">
      {error && <Error error={error} setError={setError} />}
      {show && (
        <div
          class="min-w-64 max-w-96 fixed animate-pulse z-[100000] bottom-4 right-8 bg-white shadow border text-sm text-gray-800 rounded-2xl "
          role="alert"
          tabindex="-1"
          aria-labelledby="hs-toast-soft-color-teal-label"
        >
          <div
            id="hs-toast-soft-color-teal-label"
            class="w-full flex justify-between items-center p-4"
          >
            <div className="w-auto flex gap-3 justify-start items-center">
              <span className="bg-gray-300 flex items-center justify-center w-16 h-12 rounded-xl">
                <img
                  src="https://carweep-dealer.vercel.app/splash.png"
                  alt=""
                  className="w-full h-full"
                />
              </span>

              <div className="w-[70%] flex flex-col justify-start items-start">
                <span className="font-bold">{notification?.title}</span>
                <span>{notification?.body}</span>
              </div>
            </div>
            <div class="ms-auto">
              <button
                onClick={() => setShow(false)}
                type="button"
                class="inline-flex shrink-0 justify-center items-center size-5 rounded-lg text-gray-800 opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100 "
                aria-label="Close"
              >
                <span class="sr-only">Close</span>
                <svg
                  class="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        onClick={toggleModal}
        className={`w-screen h-screen fixed top-0 left-0 transition-all duration-500 bg-transparent  ${
          isOpen ? " lg:translate-x-0" : "-translate-x-full lg:translate-x-0"
        } lg:static  z-[2000] lg:z-auto px-3 lg:w-60 xl:w-72 flex flex-col gap-3 items-center justify-start py-0 lg:h-full `}
      >
        <div
          ref={sidebarRef}
          className={`fixed z-[100000000000] top-0 left-0 transition-all duration-200  ${
            isOpen ? " lg:translate-x-0" : "-translate-x-full lg:translate-x-0"
          } lg:static w-[60%] z-[2000] lg:z-auto px-3 lg:w-60 xl:w-72 flex flex-col gap-6 py-4 items-center justify-start h-full bg-white border-r border-gray-100`}
        >
          <img src={Logo} alt="" className="w-[134px]" />
          {!isSidebarHidden && <Sidebar />}
        </div>
      </div>

      <div className="w-full relative lg:w-[calc(100%-15rem)] xl:w-[calc(100%-18rem)] h-full overflow-y-auto overflow-x-hidden">
        <div className="sticky  top-0 left-0 w-full h-16 bg-white border-b border-gray-100 flex items-center justify-between lg:justify-end px-4 z-20">
          <button
            onClick={() => setisOpen((prev) => !prev)}
            className={` ${isSidebarHidden ? "hidden " : "lg:hidden block"}`}
          >
            <HiOutlineMenuAlt2 className="text-2xl" />
          </button>
          {!isSidebarHidden && (
            <div className="flex items-center gap-4 py-4 font-normal text-gray-900">
              <button
                onClick={() =>
                  navigateToLink("/notifications", "Notifications")
                }
                className="w-[29px] h-[29px] rounded-lg flex items-center justify-center bg-[#FF204E] p-1 relative"
              >
                <IoNotificationsOutline className="text-white w-full h-full" />
                {/* <GoDotFill className="w-[10px] h-[10px] text-[#3FB743] absolute top-1 right-1" /> */}
              </button>
              <div className="flex items-center gap-2">
                <img
                  src={Cookies?.get("dealershipLogo")}
                  alt=""
                  className="w-[28px] h-[28px] rounded-full"
                />
                <p className="text-xs font-medium">
                  {Cookies?.get("dealershipName")}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className={`w-full p-6 ${styles.bodyBg}`}>{pages}</div>
      </div>
    </div>
  );
};

export default Layout;
