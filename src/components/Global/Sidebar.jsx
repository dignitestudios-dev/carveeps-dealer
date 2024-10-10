import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MdKeyboardArrowDown,
  MdNotifications,
  MdOutlineNotifications,
} from "react-icons/md";
import { AiOutlineTeam } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { LuUser2 } from "react-icons/lu";
import { BiSupport } from "react-icons/bi";
import { IoLogOutOutline } from "react-icons/io5";
import { MdKeyboardArrowUp } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineAnalytics } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { HiOutlineCreditCard } from "react-icons/hi2";
import { DropdownState } from "../../context/ToggleStateContext";
import PasswordModal from "../Global/PasswordModal";
import { GlobalContext } from "../../context/GlobalContext";
import { TiTicket } from "react-icons/ti";
import Cookies from "js-cookie";

const Sidebar = () => {
  const handleShowReports = () => {
    setReports(!reports);
  };

  const navigate = useNavigate();

  const {
    activeLink,
    setActiveLink,
    navigateToLink,
    isAuthenticated,
    reports,
    setReports,
  } = useContext(GlobalContext);

  const navigateToLogin = () => {
    Cookies.remove("token");
    Cookies.remove("isProfileCompleted");
    Cookies.remove("isStripeProfileCompleted");
    Cookies.remove("isBankAccountAdded");
    Cookies.remove("isAccessKeyAdded");

    navigateToLink("/login", "Login");
  };

  return (
    <>
      <div className="w-full z-[100000000] lg:px-4 flex flex-col items-start gap-y-1">
        <button
          onClick={() => navigateToLink("/dashboard", "Dashboard")}
          className={`w-full h-12 ${
            activeLink === "Dashboard"
              ? "bg-[#FF204E] text-white font-semibold"
              : "text-[#7C7C7C] bg-transparent font-semibold"
          } rounded-xl px-5 flex justify-start items-center gap-3 `}
        >
          <LuLayoutDashboard className="text-xl" />
          <span className="text-sm">Dashboard</span>
        </button>

        <button
          onClick={() => navigateToLink("/sales-team", "Sales Team")}
          className={`w-full h-12 ${
            activeLink === "Sales Team"
              ? "bg-[#FF204E] text-white font-semibold"
              : "text-[#7C7C7C] bg-transparent font-semibold"
          } rounded-xl px-5 flex justify-start items-center gap-3 `}
        >
          <AiOutlineTeam className="text-xl" />
          <span className="text-sm">Sales Team</span>
        </button>

        <div className="w-full relative">
          <button
            onClick={() => {
              navigateToLink("/reports", "Reports");
              setReports(true);
            }}
            className={`w-full h-12 ${
              activeLink === "Reports"
                ? "bg-[#FF204E] text-white font-semibold"
                : "text-[#7C7C7C] bg-transparent font-semibold"
            } rounded-xl px-5 flex justify-start items-center gap-3 `}
          >
            <MdOutlineAnalytics className="text-xl" />
            <span className="text-sm font-semibold flex items-center gap-1">
              Reports{" "}
              {reports ? (
                <MdKeyboardArrowDown className="text-base" />
              ) : (
                <MdKeyboardArrowUp className="text-base" />
              )}
            </span>
          </button>
          {reports && isAuthenticated ? (
            <div className="flex flex-col gap-1 pl-[54px] items-start">
              <button
                onClick={() => {
                  navigateToLink("/reports/revenue-analysis", "Reports");
                  setReports(true);
                }}
                className="text-[13px] text-[#7C7C7C] font-semibold"
              >
                Revenue Analysis
              </button>
              <button
                onClick={() => {
                  navigateToLink("/reports/subscribers-report", "Reports");
                  setReports(true);
                }}
                className="text-[13px] text-[#7C7C7C] font-semibold"
              >
                Subscribers Report
              </button>
              <button
                onClick={() => {
                  navigateToLink("/reports/subscription-bought", "Reports");
                  setReports(true);
                }}
                className="text-[13px] text-[#7C7C7C] font-semibold"
              >
                Subscription Bought
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
        <button
          onClick={() => navigateToLink("/payment-gateway", "Payment Gateway")}
          className={`w-full h-12 ${
            activeLink === "Payment Gateway"
              ? "bg-[#FF204E] text-white font-semibold"
              : "text-[#7C7C7C] bg-transparent font-semibold"
          } rounded-xl px-5 flex justify-start items-center gap-3 `}
        >
          <HiOutlineCreditCard className="text-xl" />
          <span className="text-sm">Payment Gateway</span>
        </button>
        <button
          onClick={() => navigateToLink("/subscription-plans", "Subscription")}
          className={`w-full h-12 ${
            activeLink === "Subscription"
              ? "bg-[#FF204E] text-white font-semibold"
              : "text-[#7C7C7C] bg-transparent font-semibold"
          } rounded-xl px-5 flex justify-start items-center gap-3 `}
        >
          <RiMoneyDollarCircleLine className="text-xl" />
          <span className="text-sm">Subscriptions</span>
        </button>
        {/* <button
          onClick={() =>
            navigateToLink("/system-notifications", "Notifications")
          }
          className={`w-full h-12 ${
            activeLink === "Notifications"
              ? "bg-[#FF204E] text-white font-semibold"
              : "text-[#7C7C7C] bg-transparent font-semibold"
          } rounded-xl px-5 flex justify-start items-center gap-3 `}
        >
          <IoMdNotificationsOutline className="text-xl" />
          <span className="text-sm">Notifications</span>
        </button> */}
        <button
          onClick={() => navigateToLink("/settings/notifications", "Settings")}
          className={`w-full h-12 ${
            activeLink === "Settings"
              ? "bg-[#FF204E] text-white font-semibold"
              : "text-[#7C7C7C] bg-transparent font-semibold"
          } rounded-xl px-5 flex justify-start items-center gap-3 `}
        >
          <CiSettings className="text-xl" />
          <span className="text-sm">Settings</span>
        </button>
        <button
          onClick={() => navigateToLink("/profile", "Profile")}
          className={`w-full h-12 ${
            activeLink === "Profile"
              ? "bg-[#FF204E] text-white font-semibold"
              : "text-[#7C7C7C] bg-transparent font-semibold"
          } rounded-xl px-5 flex justify-start items-center gap-3 `}
        >
          <LuUser2 className="text-xl" />
          <span className="text-sm">Profile</span>
        </button>
        <button
          onClick={() => navigateToLink("/support-tickets", "support-tickets")}
          className={`w-full h-12 ${
            activeLink === "support-tickets"
              ? "bg-[#FF204E] text-white font-semibold"
              : "text-[#7C7C7C] bg-transparent font-semibold"
          } rounded-xl px-5 flex justify-start items-center gap-3 `}
        >
          <TiTicket className="text-xl" />
          <span className="text-sm">Support Tickets</span>
        </button>

        <button
          onClick={() =>
            navigateToLink("/send-notifications", "send-notifications")
          }
          className={`w-full h-12 ${
            activeLink === "send-notifications"
              ? "bg-[#FF204E] text-white font-semibold"
              : "text-[#7C7C7C] bg-transparent font-semibold"
          } rounded-xl px-5 flex justify-start items-center gap-3 `}
        >
          <MdOutlineNotifications className="text-xl" />
          <span className="text-sm">Notifications</span>
        </button>
        <button
          onClick={() => navigateToLogin()}
          className="w-full h-12 font-semibold hover:bg-[#FF204E] transition-all duration-300 hover:text-white text-[#7C7C7C] rounded-xl px-5 flex justify-start items-center gap-3"
        >
          <IoLogOutOutline className="text-xl" />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </>
  );
};

export default Sidebar;
