import React, { useContext, useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { DIcon1, DIcon2, DashboardChart1 } from "../../assets/export";
import { FiSearch } from "react-icons/fi";
import { styles } from "../../styles/styles";
import { RxCalendar } from "react-icons/rx";
import SubscribersList from "./SubscribersList";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import DashboardGraph from "./DashboardGraph";
import { GlobalContext } from "../../context/GlobalContext";
import Cookies from "js-cookie";
import axios from "axios";

const RevenueAndSubscription = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [showOpt, setShowOpt] = useState(false);
  const [showOpt2, setShowOpt2] = useState(false);

  const [filter1, setFilter1] = useState({
    state: "active",
    filter: "thisMonth",
  });
  const [filter2, setFilter2] = useState({
    state: "renewal",
    filter: "thisMonth",
  });

  // Function to handle dropdown change
  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const { baseUrl, navigate, setError } = useContext(GlobalContext);
  const [dataLoading1, setDataLoading1] = useState(false);
  const [data1, setData1] = useState(null);
  const [dataLoading2, setDataLoading2] = useState(false);
  const [data2, setData2] = useState(null);

  const getAnalytics1 = () => {
    const token = Cookies.get("token");

    if (token) {
      setDataLoading1(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(
          `${baseUrl}/dealership/dashboard/subscription?state=${filter1?.state}&filter=${filter1?.filter}`,
          {
            headers,
          }
        )
        .then(
          (response) => {
            setData1(response?.data?.data ? response?.data?.data : 0);
            setDataLoading1(false);
          },
          (error) => {
            setDataLoading1(false);
            if (error?.response?.status == 401) {
              Cookies.remove("token");
              navigate("/login");
            }
            setError(error?.response?.data?.message);
          }
        );
    } else {
      navigate("/login");
    }
  };
  const getAnalytics2 = () => {
    const token = Cookies.get("token");

    if (token) {
      setDataLoading2(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(
          `${baseUrl}/dealership/dashboard/subscription?state=${filter2?.state}&filter=${filter2?.filter}`,
          {
            headers,
          }
        )
        .then(
          (response) => {
            setData2(response?.data?.data ? response?.data?.data : 0);
            setDataLoading2(false);
          },
          (error) => {
            setDataLoading2(false);
            if (error?.response?.status == 401) {
              Cookies.remove("token");
              navigate("/login");
            }
            setError(error?.response?.data?.message);
          }
        );
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    getAnalytics1();
  }, [filter1]);
  useEffect(() => {
    getAnalytics2();
  }, [filter2]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-[36px] font-bold">
        Welcome Back, {Cookies.get("dealershipName")}!{" "}
      </h1>
      {/* <p className="text-base font-medium">
        Let’s work together to keep your car running smoothly and ensure every
        journey is a breeze.
      </p> */}
      <div className="w-full flex lg:items-center flex-col lg:flex-row gap-6">
        <div className="bg-white rounded-3xl p-4 w-[307px] h-[90px] flex items-center justify-between">
          <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center">
            <img src={DIcon1} alt="" />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-bold">{data1 ? data1 : 0}</h1>
            <p className="text-xs text-[#5C5C5C] font-medium">
              Active Subscription
            </p>
          </div>
          <div className="flex items-start h-full relative">
            <button
              className="w-[92px] h-[27px] rounded-full bg-[#EDEDED] flex text-xs font-medium items-center justify-center gap-1"
              onClick={() => setShowOpt2(!showOpt2)}
            >
              {filter1?.filter == "all"
                ? "All"
                : filter1?.filter == "yearToDate"
                ? "Year To Date"
                : filter1?.filter == "thisMonth"
                ? "This Month"
                : "Last Month"}{" "}
              {showOpt2 ? <TiArrowSortedDown /> : <TiArrowSortedUp />}
            </button>
            {showOpt2 && (
              <div className="bg-white w-[145px] h-[135px] shadow-md rounded-xl absolute right-4 top-7 flex flex-col items-start z-40">
                <button
                  onClick={() => {
                    setFilter1({ state: "active", filter: "all" });
                    setShowOpt2(false);
                  }}
                  className="w-full px-6 text-xs font-medium hover:bg-gray-100 py-2 text-start"
                >
                  All
                </button>
                <button
                  onClick={() => {
                    setFilter1({ state: "active", filter: "yearToDate" });
                    setShowOpt2(false);
                  }}
                  className="w-full px-6 text-xs font-medium hover:bg-gray-100 py-2 text-start"
                >
                  Year To Date
                </button>
                <button
                  onClick={() => {
                    setFilter1({ state: "active", filter: "thisMonth" });
                    setShowOpt2(false);
                  }}
                  className="w-full px-6 text-xs font-medium hover:bg-gray-100 py-2 text-start"
                >
                  This Month
                </button>
                <button
                  onClick={() => {
                    setFilter1({ state: "active", filter: "lastMonth" });
                    setShowOpt2(false);
                  }}
                  className="w-full px-6 text-xs font-medium hover:bg-gray-100 py-2 text-start"
                >
                  Last Month
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="bg-white rounded-3xl p-4 w-[307px] h-[90px] flex items-center justify-between relative">
          <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center">
            <img src={DIcon2} alt="" />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-bold">{data2 ? data2 : 0}</h1>
            <p className="text-xs text-[#5C5C5C] font-medium">Total Renewals</p>
          </div>
          <div className="flex items-start h-full relative">
            <button
              className="w-[92px] h-[27px] rounded-full bg-[#EDEDED] flex text-xs font-medium items-center justify-center gap-1"
              onClick={() => setShowOpt(!showOpt)}
            >
              {filter2?.filter == "all"
                ? "All"
                : filter2?.filter == "yearToDate"
                ? "Year To Date"
                : filter2?.filter == "thisMonth"
                ? "This Month"
                : "Last Month"}
              {showOpt ? <TiArrowSortedDown /> : <TiArrowSortedUp />}
            </button>
            {showOpt && (
              <div className="bg-white w-[145px] h-[135px] shadow-md rounded-xl absolute right-4 top-7 flex flex-col items-start z-40">
                <button
                  onClick={() => {
                    setFilter2({ state: "renewal", filter: "all" });
                    setShowOpt(false);
                  }}
                  className="w-full px-6 text-xs font-medium hover:bg-gray-100 py-2 text-start"
                >
                  All
                </button>
                <button
                  onClick={() => {
                    setFilter2({ state: "renewal", filter: "yearToDate" });
                    setShowOpt(false);
                  }}
                  className="w-full px-6 text-xs font-medium hover:bg-gray-100 py-2 text-start"
                >
                  Year To Date
                </button>
                <button
                  onClick={() => {
                    setFilter2({ state: "renewal", filter: "thisMonth" });
                    setShowOpt(false);
                  }}
                  className="w-full px-6 text-xs font-medium hover:bg-gray-100 py-2 text-start"
                >
                  This Month
                </button>
                <button
                  onClick={() => {
                    setFilter2({ state: "renewal", filter: "lastMonth" });
                    setShowOpt(false);
                  }}
                  className="w-full px-6 text-xs font-medium hover:bg-gray-100 py-2 text-start"
                >
                  Last Month{" "}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueAndSubscription;
