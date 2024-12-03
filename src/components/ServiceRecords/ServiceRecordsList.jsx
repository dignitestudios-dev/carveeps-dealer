import React, { useContext, useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { ServiceHistory } from "../../constants/serviceHistory";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import axios from "axios";
import Cookies from "js-cookie";
import { NoData } from "../../assets/export";

const ServiceRecordsList = () => {
  const [openDropdown, setOpendropdown] = useState(false);

  const handleDropdown = () => {
    setOpendropdown(!openDropdown);
  };
  const { prevData, baseUrl, setError } = useContext(GlobalContext);

  const [data, setData] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const { id } = useParams();

  const getData = () => {
    const token = Cookies.get("token");

    if (token) {
      setDataLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(`${baseUrl}/user/subscription?subscriptionId=${id}`, {
          headers,
        })
        .then(
          (response) => {
            setData(response?.data?.data);
            setDataLoading(false);
          },
          (error) => {
            setDataLoading(false);
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

  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(false);

  const getServices = () => {
    const token = Cookies.get("token");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(
          `${baseUrl}/user/service?subscriptionId=${data?._id}&filter=12months`,
          {
            headers,
          }
        )
        .then((response) => {
          setServices(response?.data?.data);
        })
        .catch((error) => {
          setError(error?.response?.data?.message);
        });
    }
  };
  useEffect(() => {
    getData();
    data !== null && getServices();
  }, []);

  return (
    <>
      <div className="w-full bg-white rounded-[18px] p-6 flex flex-col items-start gap-6">
        <div className="w-full flex items-start lg:items-center justify-between flex-col lg:flex-row gap-6">
          <div className="w-[135px] h-[32px] flex items-center justify-center gap-1 text-white text-[13px] font-medium bg-[#C20028] rounded-full">
            {prevData?.subscriptionPlan} <GoDotFill className="" />
          </div>
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
        <h1 className="text-[18px] font-bold">Service Records</h1>

        <div className="w-full hidden lg:flex flex-col">
          <div className="w-full hidden lg:grid grid-cols-8 gap-6 py-4 border-b">
            <p className="text-xs font-medium text-[#7C7C7C]">
              Last Service Date
            </p>
            <p className="text-xs font-medium text-[#7C7C7C]">
              Last Service Time
            </p>
            <p className="text-xs font-medium text-[#7C7C7C] flex items-center gap-1">
              Services
            </p>

            <p className="text-xs font-medium text-[#7C7C7C]">
              Service Details
            </p>
            <p className="text-xs font-medium text-[#7C7C7C]">Total Services</p>
            <p className="text-xs font-medium text-[#7C7C7C]">Availed</p>
            <p className="text-xs font-medium text-[#7C7C7C]">
              Remaining Services
            </p>
            <p className="text-xs font-medium text-[#7C7C7C]">Status</p>
          </div>
          <div className="w-full flex flex-col lg:hidden gap-6">
            {services?.length < 1 ? (
              <div className="w-full bg-white rounded-b-[18px] flex items-center justify-center">
                <img src={NoData} alt="" className="w-96 my-10" />
              </div>
            ) : (
              services?.map((service, index) => {
                return (
                  <div
                    className="w-full h-auto flex flex-col p-4 bg-gray-50 rounded-2xl gap-4"
                    key={index}
                  >
                    <div className="w-full h-auto flex justify-between items-start flex-col gap-3">
                      <div className="w-full flex justify-between items-start ">
                        <h1 className="text-md font-medium text-black">
                          Last Service Date
                        </h1>
                        <p className="text-xs font-medium text-[#7c7c7c]">
                          {service.date}
                        </p>
                      </div>
                      <div className="w-full flex justify-between items-start ">
                        <h1 className="text-md font-medium text-black">
                          Total Services
                        </h1>
                        <p className="text-xs font-medium text-[#7c7c7c]">
                          {service?.total_services}
                        </p>
                      </div>
                      <div className="w-full flex items-start justify-between">
                        <h1 className="text-md font-medium text-black">
                          Availed Services
                        </h1>
                        <p className="text-xs font-medium flex flex-col items-end">
                          <span>{service?.availed}</span>{" "}
                        </p>
                      </div>
                      <div className="w-full flex items-start justify-between">
                        <h1 className="text-md font-medium text-black">
                          Remaining Services
                        </h1>
                        <p className="text-xs font-medium flex flex-col items-end">
                          <span>{service?.remainingCount}</span>{" "}
                        </p>
                      </div>
                    </div>
                    <div className="w-full">
                      <p className="text-xs font-medium flex flex-col items-end">
                        {service.details}
                      </p>
                    </div>
                    <div className="w-full flex justify-between items-start ">
                      <span className="text-xs font-medium text-[#3FB743]">
                        {service?.status}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="w-full hidden lg:flex flex-col">
          {services?.length < 1 ? (
            <div className="w-full bg-white rounded-b-[18px] flex items-center justify-center">
              <img src={NoData} alt="" className="w-96 my-10" />
            </div>
          ) : (
            services?.map((service, index) => {
              return (
                <div
                  className="w-full grid grid-cols-8 gap-6 py-4 border-b"
                  key={index}
                >
                  <p className="text-xs font-normal">
                    {formatDateFromEpoch(service?.lastUsed)}
                  </p>
                  <p className="text-xs font-normal">
                    {formatTimestamp(service?.lastUsed)}
                  </p>
                  <p className="text-xs font-normal">
                    {service?.service?.name}
                  </p>
                  <p className="text-xs font-normal">
                    {service?.service?.details}
                  </p>
                  <p className="text-xs font-normal">{service?.totalCount}</p>
                  <p className="text-xs font-normal">
                    {service?.totalCount - service?.remainingCount}
                  </p>
                  <p className="text-xs font-normal">
                    {service?.remainingCount}
                  </p>
                  <div className="flex justify-center">
                    <span className="text-xs font-medium text-[#3FB743]">
                      {service?.status}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <div className="w-full pt-10 pb-6 flex justify-end">
        <Link
          to="/subscriber-details"
          className="w-[250px] text-center text-white text-base font-bold py-3 rounded-[8px] bg-[#FF204E]"
        >
          Back
        </Link>
      </div>
    </>
  );
};

export default ServiceRecordsList;
