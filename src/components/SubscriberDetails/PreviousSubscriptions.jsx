import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UpdateModal from "./UpdateModal";
import { GlobalContext } from "../../context/GlobalContext";
import { NoData } from "../../assets/export";

const PreviousSubscriptions = ({ data, loading }) => {
  const navigate = useNavigate();
  const { setPrevData } = useContext(GlobalContext);
  const formatDateFromISOString = (isoString) => {
    if (isoString == null) return "";
    const splittedString = String(isoString).split("T")[0];
    const [year, month, day] = splittedString.split("-");
    const formattedString = `${month}-${day}-${year}`;
    const date = new Date(formattedString);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };
  return loading ? (
    <div className="bg-white w-full p-6 rounded-[18px] mt-6 flex flex-col gap-6 animate-pulse">
      <div className="w-full flex items-center justify-start lg:justify-between gap-6">
        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        <div className="h-8 bg-gray-300 rounded-full w-24"></div>
      </div>
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
    <>
      <div className="bg-white w-full p-6 rounded-[18px] mt-6 flex flex-col gap-6">
        <div className="w-full flex items-center justify-start lg:justify-between gap-6">
          <h1 className="text-[18px] font-bold">Previous Subscriptions</h1>
          <button
            onClick={() => navigate("/previous-subscriptions")}
            className="w-[59px] bg-[#FF204E14] py-2 text-center text-[#FF204E] text-xs font-medium rounded-full"
          >
            View All
          </button>
        </div>
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
          {data?.length < 1 ? (
            <div className="w-full bg-white rounded-b-[18px] flex items-center justify-center">
              <img src={NoData} alt="" className="w-96 my-10" />
            </div>
          ) : (
            data?.map((item, key) => {
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
                        : item?.interval == "month" && item?.intervalCount == 6
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
        {/* small device card */}
        <div className="w-full flex flex-col lg:hidden gap-6">
          {data?.map((item, key) => {
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
          })}
        </div>
      </div>
    </>
  );
};

export default PreviousSubscriptions;
