import React, { useContext, useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { LuCalendarDays } from "react-icons/lu";
import ServiceList from "./ServiceList";
import DateModal from "../Global/DateModal";
import { GlobalContext } from "../../context/GlobalContext";
import axios from "axios";
import Cookies from "js-cookie";

const SubscriberServices = ({ data, loading }) => {
  const [isOpen, setIsOpen] = useState(false);

  const ToggleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  const { tempData, baseUrl, setError } = useContext(GlobalContext);
  const formatDateFromEpoch = (epoch) => {
    const date = new Date(epoch);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };
  const formatDateFromISOString = (isoString) => {
    const date = new Date(isoString);
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
    <div className="w-full pt-10">
      <div>
        <button className="bg-[#C20028] w-[135px] h-[32px] rounded-full text-white flex items-center justify-center gap-1 text-[13px] font-medium">
          {tempData?.subscriptionPlan?.name}{" "}
          <GoDotFill className="text-[#00E13F] w-3 h-3" />
        </button>
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
