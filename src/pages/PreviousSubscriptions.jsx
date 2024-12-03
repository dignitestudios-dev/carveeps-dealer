import React, { useState, useEffect, useContext } from "react";
import { LuCalendarDays } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import DateModal from "../components/Global/DateModal";
import Cookies from "js-cookie";
import axios from "axios";
import { GlobalContext } from "../context/GlobalContext";
import { NoData } from "../assets/export";

const PreviousSubscriptions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { navigate, tempData, baseUrl, setError, setPrevData } =
    useContext(GlobalContext);

  const ToggleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  const [prevSubscription, setPrevSubscription] = useState([]);
  const [prevSubscriptionLoading, setPrevSubscriptionLoading] = useState(false);
  const getPreviousSubscriptions = () => {
    const token = Cookies.get("token");

    if (token) {
      setPrevSubscriptionLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(
          filter?.date == null
            ? `${baseUrl}/user/subscription/previous?userId=${tempData?.user?._id}&filter=${filter?.filter}`
            : `${baseUrl}/user/subscription/previous?userId=${tempData?.user?._id}&particularDate=${filter?.date}`,
          {
            headers,
          }
        )
        .then(
          (response) => {
            setPrevSubscription(response?.data?.data);
            setPrevSubscriptionLoading(false);
          },
          (error) => {
            setPrevSubscriptionLoading(false);
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
  const [filter, setFilter] = useState({
    date: null,
    filter: "all",
  });

  useEffect(() => {
    getPreviousSubscriptions();
  }, [filter]);
  const formatDateFromISOString = (isoString) => {
    if (isoString == null) return "";
    const splittedString = String(isoString).split("T")[0];
    const [year, month, day] = splittedString.split("-");
    const formattedString = `${month}-${day}-${year}`;
    const date = new Date(formattedString);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <>
      <div className="bg-white w-full p-6 rounded-[18px] mt-6 flex flex-col gap-6">
        <div className="w-full flex items-center justify-start lg:justify-between gap-6">
          <h1 className="text-[18px] font-bold">Previous Subscriptions</h1>
        </div>
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-start lg:justify-between gap-6">
          <div className="flex items-center justify-start gap-3 flex-wrap">
            <button
              onClick={() => setFilter({ date: null, filter: "all" })}
              className={`text-xs font-medium ${
                filter?.filter == "all"
                  ? "bg-[#FF204E]  text-white"
                  : "text-black bg-[#EDEDED]"
              } rounded-full px-3 py-1.5`}
            >
              All
            </button>
            <button
              onClick={() => setFilter({ date: null, filter: "yearToDate" })}
              className={`text-xs font-medium ${
                filter?.filter == "yearToDate"
                  ? "bg-[#FF204E]  text-white"
                  : "text-black bg-[#EDEDED]"
              } rounded-full px-3 py-1.5`}
            >
              Year to Date
            </button>
            <button
              onClick={() => setFilter({ date: null, filter: "thisMonth" })}
              className={`text-xs font-medium ${
                filter?.filter == "thisMonth"
                  ? "bg-[#FF204E]  text-white"
                  : "text-black bg-[#EDEDED]"
              } rounded-full px-3 py-1.5`}
            >
              This Month
            </button>
            <button
              onClick={() => setFilter({ date: null, filter: "lastMonth" })}
              className={`text-xs font-medium ${
                filter?.filter == "lastMonth"
                  ? "bg-[#FF204E]  text-white"
                  : "text-black bg-[#EDEDED]"
              } rounded-full px-3 py-1.5`}
            >
              Last Month
            </button>
          </div>
          <div>
            <button
              className="w-[108px] bg-[#EDEDED] h-[32px] rounded-full text-xs font-medium flex items-center gap-2 justify-center"
              onClick={ToggleIsOpen}
            >
              <LuCalendarDays />
              Select date
            </button>
            <DateModal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              setFilter={setFilter}
            />
          </div>
        </div>
        {prevSubscriptionLoading ? (
          <div className="bg-white w-full  rounded-[18px] flex flex-col gap-6 animate-pulse">
            <div className="w-full hidden lg:flex flex-col">
              <div className="w-full grid grid-cols-6 gap-6 py-4 border-b">
                <div>
                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                </div>
                <div>
                  <div className="h-4 bg-gray-300 rounded w-32"></div>
                </div>
                <div>
                  <div className="h-4 bg-gray-300 rounded w-20"></div>
                </div>
                <div>
                  <div className="h-4 bg-gray-300 rounded w-20"></div>
                </div>
                <div>
                  <div className="h-4 bg-gray-300 rounded w-20"></div>
                </div>
                <div></div>
              </div>
              <div className="w-full grid grid-cols-6 gap-6 py-4 border-b">
                <div>
                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                </div>
                <div>
                  <div className="h-4 bg-gray-300 rounded w-32"></div>
                </div>
                <div>
                  <div className="h-4 bg-gray-300 rounded w-20"></div>
                </div>
                <div>
                  <div className="h-4 bg-gray-300 rounded w-20"></div>
                </div>
                <div>
                  <div className="h-4 bg-gray-300 rounded w-20"></div>
                </div>
                <div>
                  <div className="h-4 bg-gray-300 rounded w-20"></div>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col lg:hidden gap-6">
              <div className="w-full h-auto flex flex-col p-4 bg-gray-50 rounded-2xl gap-4">
                <div className="w-full h-auto flex justify-between items-start flex-col gap-3">
                  <div className="w-full flex justify-between items-start ">
                    <div className="h-4 bg-gray-300 rounded w-32"></div>
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                  </div>
                  <div className="w-full flex justify-between items-start ">
                    <div className="h-4 bg-gray-300 rounded w-32"></div>
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                  </div>
                  <div className="w-full flex items-start justify-between">
                    <div className="h-4 bg-gray-300 rounded w-32"></div>
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                  </div>
                  <div className="w-full flex items-start justify-between">
                    <div className="h-4 bg-gray-300 rounded w-32"></div>
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                  </div>
                </div>
                <div className="w-full flex justify-end items-start ">
                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full hidden lg:flex flex-col">
            <div className="w-full grid grid-cols-6 gap-6 py-4 border-b">
              <div>
                <p className="text-[#7C7C7C] text-xs font-medium">
                  Subscribed Date
                </p>
              </div>
              <div>
                <p className="text-[#7C7C7C] text-xs font-medium">
                  Subscription Plan
                </p>
              </div>
              <div>
                <p className="text-[#7C7C7C] text-xs font-medium">Duration</p>
              </div>
              <div>
                <p className="text-[#7C7C7C] text-xs font-medium">Amount</p>
              </div>
              <div>
                <p className="text-[#7C7C7C] text-xs font-medium">Sold By</p>
              </div>
              <div></div>
            </div>
            {prevSubscription?.length == 0 ? (
              <div className="w-full bg-white rounded-b-[18px] flex items-center justify-center">
                <img src={NoData} alt="" className="w-96 my-10" />
              </div>
            ) : (
              prevSubscription?.map((item, key) => {
                return (
                  <div
                    key={key}
                    className="w-full grid grid-cols-6 gap-6 py-4 border-b"
                  >
                    <div>
                      <p className=" text-xs font-medium">
                        {formatDateFromISOString(item?.createdAt)}
                      </p>
                    </div>
                    <div>
                      <p className=" text-xs font-medium">
                        {item?.subscriptionPlan}
                      </p>
                    </div>
                    <div>
                      <p className=" text-xs font-medium">
                        {item?.interval == "year"
                          ? "Yearly"
                          : item?.interval == "month" &&
                            item?.intervalCount == 6
                          ? "BiAnnually"
                          : "Monthly"}
                      </p>
                    </div>
                    <div>
                      <p className=" text-xs font-medium">USD ${item?.price}</p>
                    </div>
                    <div>
                      <p className=" text-xs font-medium">{item?.soldBy}</p>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          navigate(`/service-records/${item?._id}`);
                          setPrevData(item);
                        }}
                        className="text-[#3DA2FF] text-xs font-medium underline"
                      >
                        View Detail
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
      {/* small device card */}
      <div className="w-full flex flex-col lg:hidden gap-6">
        {prevSubscription?.length == 0 ? (
          <div className="w-full bg-white rounded-b-[18px] flex items-center justify-center">
            <img src={NoData} alt="" className="w-96 my-10" />
          </div>
        ) : (
          prevSubscription?.map((item, key) => {
            return (
              <div
                key={key}
                className="w-full h-auto flex flex-col p-4 bg-gray-50 rounded-2xl gap-4"
              >
                <div className="w-full h-auto flex justify-between items-start flex-col gap-3">
                  <div className="w-full flex justify-between items-start ">
                    <h1 className="text-md font-medium text-black">
                      Last subscriber Date
                    </h1>
                    <p className="text-xs font-medium text-[#7c7c7c]">
                      {formatDateFromISOString(item?.createdAt)}
                    </p>
                  </div>
                  <div className="w-full flex justify-between items-start ">
                    <h1 className="text-md font-medium text-black">
                      Subscription Plan
                    </h1>
                    <p className="text-xs font-medium text-[#7c7c7c]">
                      {item?.subscriptionPlan}
                    </p>
                  </div>
                  <div className="w-full flex items-start justify-between">
                    <h1 className="text-md font-medium text-black">
                      Duration:
                    </h1>
                    <p className="text-xs font-medium flex flex-col items-end">
                      {item?.interval == "year"
                        ? "Yearly"
                        : item?.interval == "month" && item?.intervalCount == 6
                        ? "BiAnnually"
                        : "Monthly"}
                    </p>
                  </div>
                  <div className="w-full flex items-start justify-between">
                    <h1 className="text-md font-medium text-black">Sold By:</h1>
                    <p className="text-xs font-medium flex flex-col items-end">
                      {item?.soldBy}
                    </p>
                  </div>
                </div>
                <div className="w-full flex justify-end items-start ">
                  <button
                    onClick={() => {
                      navigate(`/service-records/${item?._id}`);
                      setPrevData(item);
                    }}
                    className="text-[#3DA2FF] text-xs font-medium underline"
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="w-full flex justify-end pt-10 pb-6">
        <button
          onClick={() => navigate(-1)}
          className="w-[250px] py-3 text-center rounded-[8px] bg-[#FF204E] font-bold text-base text-white"
        >
          Back
        </button>
      </div>
    </>
  );
};

export default PreviousSubscriptions;
