import React, { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { ServiceHistory } from "../../constants/serviceHistory";
import UpdateModal from "./UpdateModal";
import { Link } from "react-router-dom";
import { NoData } from "../../assets/export";

const ServiceList = ({ services, loading, update }) => {
  const [showModal, setShowModal] = useState(false);
  const [openServices, setOpenServices] = useState(false);
  console.log(services);

  const handleToggleServices = () => {
    setOpenServices(!openServices);
  };

  const handleShowModal = () => {
    setShowModal((prev) => !prev);
  };
  const formatDateFromEpoch = (epoch) => {
    if (epoch == null) return "";
    const date = new Date(epoch);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };

  const formatDateFromISOString = (isoString) => {
    if (isoString == null) return "";
    const splittedString = String(isoString).split("T")[0];
    const [year, month, day] = splittedString.split("-");
    const formattedString = `${month}-${day}-${year}`;
    const date = new Date(formattedString);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };
  function formatTimestamp(timestamp) {
    // Create a new Date object from the timestamp
    const date = new Date(timestamp);

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return `${formattedTime}`;
  }

  const [selected, setSelected] = useState(null);

  return (
    <>
      <UpdateModal
        showModal={showModal}
        setShowModal={setShowModal}
        onclick={handleShowModal}
        service={selected}
        update={update}
      />
      {loading ? (
        <div className="w-full   bg-white rounded-[18px] flex flex-col gap-6 animate-pulse">
          <div className="w-full h-[200px] bg-gray-300 rounded"></div>
        </div>
      ) : (
        <div className="w-full">
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
            <p className="text-xs font-medium text-[#7C7C7C]"></p>
          </div>
          <div className="w-full flex flex-col lg:hidden gap-6">
            {services?.map((service, index) => {
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
                        {service?.lastUsed
                          ? formatDateFromEpoch(service?.lastUsed)
                          : "N/A"}
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
                      {service?.details}
                    </p>
                  </div>
                  <div className="w-full flex justify-between items-start ">
                    {service?.remainingCount > 0 ? (
                      <button
                        className="text-xs font-medium text-[#3FB743]"
                        onClick={(e) => {
                          handleShowModal(e);
                          setSelected(service);
                        }}
                      >
                        Update
                      </button>
                    ) : (
                      <span className="text-xs font-medium text-[#222222]">
                        Completed
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
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
                      {service?.lastUsed
                        ? formatDateFromEpoch(service?.lastUsed)
                        : "N/A"}
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
                      {service?.remainingCount > 0 ? (
                        <button
                          className="text-xs font-medium text-[#3FB743]"
                          onClick={(e) => {
                            handleShowModal(e);
                            setSelected(service);
                          }}
                        >
                          Update
                        </button>
                      ) : (
                        <span className="text-xs font-medium text-[#222222]">
                          Completed
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceList;
