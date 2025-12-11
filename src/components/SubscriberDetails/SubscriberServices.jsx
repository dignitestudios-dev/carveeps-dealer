import React, { useContext, useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { LuCalendarDays } from "react-icons/lu";
import ServiceList from "./ServiceList";
import DateModal from "../Global/DateModal";
import { GlobalContext } from "../../context/GlobalContext";
import axios from "axios";
import Cookies from "js-cookie";
import { FiCheckCircle, FiCreditCard, FiXCircle } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import Error from "../Global/Error";
import { useNavigate } from "react-router";

const SubscriberServices = ({ data, loading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [refundModal, setRefundModal] = useState(false);
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [successModal, setSuccessModal] = useState(false);
  const [Refundloading, setRefundLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const navigate = useNavigate();
  const { tempData, baseUrl, setError } = useContext(GlobalContext);
  const handleRefundSubmit = async () => {
    try {
      setRefundLoading(true);

      const token = Cookies.get("token");

      const refundValue = selectedRefund === "no" ? "0" : selectedRefund;

      await axios.put(
        `${baseUrl}/dealership/subscription/refund`,
        {
          subscription: tempData?._id,
          refund: refundValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRefundModal(false);
      setSelectedRefund(null);
      setSuccessModal(true);
    } catch (err) {
      console.error(err);

      // ✅ backend message agar ho
      const message =
        err?.response?.data?.message || "Refund failed. Please try again.";

      setApiError(message);
    } finally {
      setRefundLoading(false);
    }
  };

  const ToggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const formatDateFromEpoch = (epoch) => {
    if (epoch == null) return "N/A";
    const date = new Date(epoch);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };
  const formatDateFromISOString = (isoString) => {
    if (isoString == null) return "N/A";
    const splittedString = String(isoString).split("T")[0];
    const [year, month, day] = splittedString.split("-");
    const formattedString = `${month}-${day}-${year}`;
    const date = new Date(formattedString);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };

  const [services, setServices] = useState(null);
  const [servicesLoading, setServicesLoading] = useState(false);

  const getServices = () => {
    const token = Cookies.get("token");
    if (token) {
      setServicesLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(
          filter?.date == null
            ? `${baseUrl}/user/service?subscriptionId=${data?._id}&filter=${filter?.filter}`
            : `${baseUrl}/user/service?subscriptionId=${data?._id}&particularDate=${filter?.date}`,
          {
            headers,
          }
        )
        .then((response) => {
          setServicesLoading(false);

          setServices(response?.data?.data);
        })
        .catch((error) => {
          setError(error?.response?.data?.message);
          setServicesLoading(false);
        });
    }
  };

  const [filter, setFilter] = useState({
    date: null,
    filter: "12months",
  });
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    data?._id && getServices();
  }, [data, filter, update]);

  console.log(tempData, "tempData-plain");

  return loading ? (
    <div className="w-full mt-4 p-6 bg-white rounded-[18px] flex flex-col gap-6 animate-pulse">
      <div className="w-full flex items-start lg:items-center justify-between flex-col lg:flex-row gap-6">
        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        <div className="lg:w-[506px] lg:h-[36px] flex items-center justify-between flex-wrap gap-6">
          <div className="flex flex-col text-center">
            <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
            <div className="h-6 bg-gray-300 rounded w-16"></div>
          </div>
          <div className="flex flex-col text-center">
            <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
            <div className="h-6 bg-gray-300 rounded w-16"></div>
          </div>
          <div className="flex flex-col text-center">
            <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
            <div className="h-6 bg-gray-300 rounded w-16"></div>
          </div>
          <div className="flex flex-col text-center">
            <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
            <div className="h-6 bg-gray-300 rounded w-16"></div>
          </div>
        </div>
      </div>
      <div className="w-full flex items-start lg:items-center justify-between flex-col lg:flex-row gap-6">
        <div className="flex items-center justify-start gap-2">
          <div className="h-8 bg-gray-300 rounded-full w-24"></div>
          <div className="h-8 bg-gray-300 rounded-full w-24"></div>
          <div className="h-8 bg-gray-300 rounded-full w-24"></div>
          <div className="h-8 bg-gray-300 rounded-full w-24"></div>
        </div>
        <div>
          <div className="h-8 bg-gray-300 rounded-full w-36"></div>
        </div>
      </div>
      <div className="w-full h-[200px] bg-gray-300 rounded"></div>
    </div>
  ) : (
    <div className="w-full pt-5">
      {apiError && <Error error={apiError} setError={setApiError} />}
      {/* Refund Modal */}
      <div className="bg-gray-50">
        {/* Subscription Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold text-black mb-3">
            Current Subscription
          </h3>

          {/* Plan Info Card */}
          <div className="bg-gradient-to-br from-[#C20028] to-[#a00020] rounded-xl p-5 mb-4 text-white">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FiCreditCard className="w-5 h-5" />
                <span className="text-lg font-bold">
                  {tempData?.subscriptionPlan?.name}
                </span>
              </div>
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <GoDotFill className="text-[#00E13F] w-3 h-3" />
                <span className="text-xs font-medium">
                  {tempData?.status === "paid" ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-white/80 text-sm">
                Price: {tempData?.subscriptionPlan?.price}
              </p>
              {/* <p className="text-white/70 text-xs">
                Next billing: {tempData?.subscriptionPlan?.nextBilling}
              </p> */}
            </div>
          </div>

          {/* Action Button */}
          {tempData?.status === "paid" && (
            <button
              onClick={() => setRefundModal(true)}
              className="w-full bg-gray-100 hover:bg-gray-200 transition-colors rounded-xl py-3 text-sm font-semibold text-gray-800 flex items-center justify-center gap-2"
            >
              Refund
            </button>
          )}
        </div>

        {/* Refund Modal */}
        {refundModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-[slideUp_0.3s_ease-out]">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#C20028] to-[#a00020] p-6 text-white relative">
                <button
                  onClick={() => {
                    setRefundModal(false);
                    setSelectedRefund(null);
                  }}
                  className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                >
                  <IoMdClose className="w-6 h-6" />
                </button>
                <h2 className="text-xl font-bold">Refund</h2>
                <p className="text-white/80 text-sm mt-1">
                  Choose your refund option
                </p>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="space-y-3">
                  {/* 100% Refund */}
                  <label
                    className={`flex items-start gap-4 cursor-pointer p-4 border-2 rounded-xl transition-all
                    ${
                      selectedRefund === "100"
                        ? "border-[#C20028] bg-[#fff3f6] shadow-md"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="refund"
                      value="100"
                      checked={selectedRefund === "100"}
                      onChange={() => setSelectedRefund("100")}
                      className="w-5 h-5 text-[#C20028] mt-0.5"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <FiCheckCircle
                          className={`w-5 h-5 ${
                            selectedRefund === "100"
                              ? "text-[#C20028]"
                              : "text-gray-400"
                          }`}
                        />
                        <span className="font-semibold text-gray-900">
                          Full Refund
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        The user will get 100% of their payment back
                      </p>
                    </div>
                  </label>

                  {/* 50% Refund */}
                  <label
                    className={`flex items-start gap-4 cursor-pointer p-4 border-2 rounded-xl transition-all
                    ${
                      selectedRefund === "50"
                        ? "border-[#C20028] bg-[#fff3f6] shadow-md"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="refund"
                      value="50"
                      checked={selectedRefund === "50"}
                      onChange={() => setSelectedRefund("50")}
                      className="w-5 h-5 text-[#C20028] mt-0.5"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <FiCheckCircle
                          className={`w-5 h-5 ${
                            selectedRefund === "50"
                              ? "text-[#C20028]"
                              : "text-gray-400"
                          }`}
                        />
                        <span className="font-semibold text-gray-900">
                          Partial Refund
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        The user will get 50% of their payment back
                      </p>
                    </div>
                  </label>

                  {/* No Refund */}
                  <label
                    className={`flex items-start gap-4 cursor-pointer p-4 border-2 rounded-xl transition-all
                    ${
                      selectedRefund === "no"
                        ? "border-[#C20028] bg-[#fff3f6] shadow-md"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="refund"
                      value="no"
                      checked={selectedRefund === "no"}
                      onChange={() => setSelectedRefund("no")}
                      className="w-5 h-5 text-[#C20028] mt-0.5"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <FiXCircle
                          className={`w-5 h-5 ${
                            selectedRefund === "no"
                              ? "text-[#C20028]"
                              : "text-gray-400"
                          }`}
                        />
                        <span className="font-semibold text-gray-900">
                          Cancel Without Refund
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        No refund will be issued
                      </p>
                    </div>
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => {
                      setRefundModal(false);
                      setSelectedRefund(null);
                    }}
                    className="flex-1 border-2 border-gray-300 text-gray-700 rounded-xl py-3 font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={!selectedRefund || Refundloading}
                    onClick={handleRefundSubmit}
                    className={`flex-1 rounded-xl py-3 font-semibold transition-all
  ${
    selectedRefund
      ? "bg-[#C20028] text-white hover:bg-[#a00020] shadow-lg"
      : "bg-gray-200 text-gray-400 cursor-not-allowed"
  }`}
                  >
                    {Refundloading ? "Processing..." : "Submit"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {successModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-[slideUp_0.3s_ease-out]">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#C20028] to-[#a00020] p-6 text-white text-center">
                <FiCheckCircle className="w-14 h-14 mx-auto mb-3" />
                <h2 className="text-xl font-bold">Refund Successful</h2>
                <p className="text-white/80 text-sm mt-1">
                  Subscription refund has been processed
                </p>
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                <p className="text-gray-600 mb-6">
                  The selected refund option has been applied successfully.
                </p>

                <button
                  onClick={() => {
                    setSuccessModal(false);
                    navigate(-1);
                  }}
                  className="w-full bg-[#C20028] text-white py-3 rounded-xl font-semibold hover:bg-[#a00020] transition-all shadow-md"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>

      <div className="bg-white mt-4 w-full rounded-[18px] p-6 flex flex-col gap-6">
        <div className="w-full flex items-start lg:items-center justify-between flex-col lg:flex-row gap-6">
          <h1 className="text-[18px] font-bold">Service History</h1>
          <div className="lg:w-[506px] lg:h-[36px] flex items-center justify-between flex-wrap gap-6">
            <div className="flex flex-col text-center">
              <p className="text-xs text-[#5C5C5C]">Subscribed Date</p>
              <p className="text-base font-semibold">
                {formatDateFromISOString(data?.createdAt)}
              </p>
            </div>
            <div className="flex flex-col text-center">
              <p className="text-xs text-[#5C5C5C]">Expire Date</p>
              <p className="text-base font-semibold">
                {formatDateFromEpoch(data?.expireOn)}
              </p>
            </div>
            <div className="flex flex-col text-center">
              <p className="text-xs text-[#5C5C5C]">Duration</p>
              <p className="text-base font-semibold">
                {data?.subscriptionPlan?.intervalCount}{" "}
                {data?.subscriptionPlan?.interval}
              </p>
            </div>
            <div className="flex flex-col text-center">
              <p className="text-xs text-[#5C5C5C]">Subscription Fee</p>
              <p className="text-base font-semibold">
                ${data?.subscriptionPlan?.price}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex items-start lg:items-center justify-between flex-col lg:flex-row gap-6">
          <div className="flex items-center justify-start gap-2">
            <button
              onClick={() => {
                setFilter({ filter: "12months", date: null });
              }}
              className={`text-xs font-medium ${
                filter?.filter == "12months"
                  ? "bg-[#FF204E]  text-white"
                  : "text-black bg-[#EDEDED]"
              } rounded-full px-3 py-1.5`}
            >
              12 Months
            </button>
            <button
              onClick={() => {
                setFilter({ filter: "30days", date: null });
              }}
              className={`text-xs font-medium ${
                filter?.filter == "30days"
                  ? "bg-[#FF204E]  text-white"
                  : "text-black bg-[#EDEDED]"
              } rounded-full px-3 py-1.5`}
            >
              30 days
            </button>
            <button
              onClick={() => {
                setFilter({ filter: "7days", date: null });
              }}
              className={`text-xs font-medium ${
                filter?.filter == "7days"
                  ? "bg-[#FF204E]  text-white"
                  : "text-black bg-[#EDEDED]"
              } rounded-full px-3 py-1.5`}
            >
              7 days
            </button>
            <button
              onClick={() => {
                setFilter({ filter: "24hours", date: null });
              }}
              className={`text-xs font-medium ${
                filter?.filter == "24hours"
                  ? "bg-[#FF204E]  text-white"
                  : "text-black bg-[#EDEDED]"
              } rounded-full px-3 py-1.5`}
            >
              24 Hours
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
        <ServiceList
          services={services}
          loading={servicesLoading}
          update={setUpdate}
        />
      </div>
    </div>
  );
};

export default SubscriberServices;
