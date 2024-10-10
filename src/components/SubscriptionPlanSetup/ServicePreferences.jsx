import React, { useContext, useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { GlobalContext } from "../../context/GlobalContext";
import Cookies from "js-cookie";
import axios from "axios";
import { PlanCreationContext } from "../../context/PlanCreationContext";
import BtnLoader from "../Global/BtnLoader";
import { MdDelete } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { NoData } from "../../assets/export";

const ServicePreferences = () => {
  const [addMore, setAddMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const handleAddMore = () => {
    setAddMore(!addMore);
  };
  const handleShowModal = () => {
    setShowModal(!showModal);
  };
  const [services, setServices] = useState([]);
  const { baseUrl, navigate, setError } = useContext(GlobalContext);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [update, setUpdate] = useState(false);

  const getServices = () => {
    const token = Cookies.get("token");

    if (token) {
      setServicesLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(`${baseUrl}/dealership/services`, {
          headers,
        })
        .then(
          (response) => {
            setServices(response?.data?.data);
            setServicesLoading(false);
          },
          (error) => {
            setServicesLoading(false);
            if (error?.response?.status == 401) {
              setIsLoggedIn(false);
              Cookies.remove("token");
              navigate("/login");
            }
          }
        );
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    getServices();
  }, [update]);

  const {
    handleCheckboxChange,
    selectedServices,
    handleDurationChange,
    handleFrequencyChange,
    duration,
    setSelectedServices,
    setSendServices,
  } = useContext(PlanCreationContext);

  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [loading, setLoading] = useState("");

  const addService = () => {
    const token = Cookies.get("token");
    if (token) {
      if (name == "") {
        setError("Service Title cannot be left empty");
      } else if (detail == "") {
        setError("Service Detail cannot be left empty.");
      } else {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        setLoading(true);
        axios
          .post(
            `${baseUrl}/dealership/services`,
            {
              name: name,
              details: detail,
            },
            { headers }
          )
          .then((res) => {
            setDetail("");
            setName("");
            setUpdate((prev) => !prev);
            setLoading(false);
            handleShowModal();
          })
          .catch((error) => {
            setError(error?.response?.data?.message);
            if (error?.response?.status == 401) {
              Cookies.remove("token");
              navigate("/login");
            }
            setLoading(false);
          });
      }
    }
  };

  const [removeLoading, setRemoveLoading] = useState(false);

  const handleRemove = (id) => {
    const token = Cookies.get("token");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      setRemoveLoading(true);
      axios
        .delete(`${baseUrl}/dealership/services/${id}`, {
          headers,
          data: null,
        })
        .then((response) => {
          setUpdate((prev) => !prev);
          setRemoveLoading(false);
        })
        .catch((error) => {
          setRemoveLoading(false);
          setError(error?.response?.data?.message);
        });
    }
  };

  return (
    <>
      <div className="bg-white rounded-[18px] p-6 w-full lg:w-[666px] h-[777px] overflow-y-auto">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-lg font-bold">Service Preferences</h1>
          <div className="flex gap-2">
            <button
              className="bg-[#FF204E14] h-[30px] w-[64px] rounded-full flex items-center justify-center gap-1 font-medium text-xs text-[#FF204E]"
              onClick={handleShowModal}
            >
              <GoPlus className="w-4 h-4" /> Add
            </button>
          </div>
        </div>

        <div
          className={`w-full grid ${
            duration !== "month" ? "grid-cols-12" : "grid-cols-10"
          } mt-4 `}
        >
          <div className="lg:border-r col-span-1 w-full h-full px-4"></div>
          <div className="lg:border-r w-full col-span-3 h-full px-4">
            <h1 className="text-[13px] font-medium text-[#5C5C5C]">Service</h1>
          </div>
          <div className="lg:border-r w-full col-span-3 h-full px-4">
            <h1 className="text-[13px] font-medium text-[#5C5C5C]">
              Service Details
            </h1>
          </div>
          {duration !== "month" && (
            <div className="lg:border-r w-full col-span-2 h-full px-4">
              <h1 className="text-[13px] font-medium text-[#5C5C5C]">
                Duration
              </h1>
            </div>
          )}

          <div className=" w-full col-span-2 h-full px-4">
            <h1 className="text-[13px] font-medium text-[#5C5C5C]">
              Frequency
            </h1>
          </div>
          <div className="lg:border-r col-span-1 w-full h-full px-4"></div>

          {/* <div className="lg:border-r w-full col-span-1 h-full px-4"></div> */}
        </div>
        {servicesLoading && (
          <div className="w-full flex justify-center items-center my-5 text-lg font-bold">
            Fetching previously added services...
          </div>
        )}
        {services?.length > 0 && !servicesLoading
          ? services?.map((service, key) => {
              const selectedService = selectedServices.find(
                (item) => item.service._id === service._id
              );
              return (
                <div
                  key={key}
                  className={`w-full grid ${
                    duration !== "month" ? "grid-cols-12" : "grid-cols-10"
                  } `}
                >
                  <div className="lg:border-r w-full col-span-1  h-full px-4">
                    <div className="mt-7">
                      <input
                        type="checkbox"
                        checked={selectedServices.some(
                          (item) => item.service._id === service._id
                        )}
                        onChange={(e) =>
                          handleCheckboxChange(service, e.target.checked)
                        }
                        className="w-4 h-4 accent-[#FF204E]"
                      />
                    </div>
                  </div>
                  <div className="lg:border-r w-full col-span-3 h-full px-4">
                    <div className="mt-6 w-full ">
                      <span className="text-xs w-full outline-none border-none font-medium">
                        {service?.name}
                      </span>
                    </div>
                  </div>
                  <div className="lg:border-r w-full col-span-3 h-full px-4">
                    <div className="mt-6">
                      <span className="text-xs  w-full text-wrap outline-none border-none font-medium">
                        {service?.details}
                      </span>
                    </div>
                  </div>
                  {duration !== "month" && (
                    <div className="lg:border-r h-full w-full col-span-2  px-2">
                      <div className="mt-6 w-full">
                        <select
                          disabled={
                            !selectedServices.some(
                              (item) => item.service._id === service._id
                            )
                          }
                          onChange={(e) =>
                            handleDurationChange(service, e.target.value)
                          }
                          className="text-xs border border-gray-400 rounded-md font-normal w-full"
                        >
                          <option value="">Select Duration</option>

                          <option value="month">Monthly</option>
                          {duration == "biannual" ? (
                            <option value="year">Biannually</option>
                          ) : (
                            <option value="year">Yearly</option>
                          )}
                        </select>
                      </div>
                    </div>
                  )}
                  <div className="h-full w-full col-span-2 px-4">
                    <div className="mt-6 w-full flex flex-col items-start gap-3">
                      <input
                        type="text"
                        disabled={
                          !selectedServices.some(
                            (item) => item.service._id === service._id
                          )
                        }
                        value={selectedService ? selectedService.frequency : ""}
                        onChange={(e) =>
                          handleFrequencyChange(service, e.target.value)
                        }
                        className="w-[120px] border-0 outline-none text-xs"
                        placeholder="Type here"
                      />
                    </div>
                  </div>
                  <div className="h-full w-full col-span-1 px-4">
                    <button
                      onClick={() => handleRemove(service?._id)}
                      className="mt-7 text-xl text-red-600 w-full flex flex-col items-start gap-3"
                    >
                      {removeLoading ? (
                        <AiOutlineLoading3Quarters />
                      ) : (
                        <MdDelete />
                      )}
                    </button>
                  </div>
                  {/* <div className="h-full w-full col-span-1 px-4">
                <div className="mt-6 w-full flex items-center justify-between relative">
                  <button onClick={() => setShowButtons(!showButtons)}>
                    <HiOutlineDotsHorizontal />
                  </button>
                  {showButtons && (
                    <div className="px-2 py-2 rounded-md shadow-md absolute z-10 bg-white flex flex-col items-start gap-1.5 right-0 top-4">
                      <button className="text-[12px] font-medium">Edit</button>
                      <button className="text-[12px] font-medium">
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div> */}
                </div>
              );
            })
          : !servicesLoading && (
              <div className="w-full flex items-center justify-center">
                <img src={NoData} alt="" className="w-96 my-10" />
              </div>
            )}
      </div>
      {/* add service modal */}
      {showModal && (
        <div className="w-full h-screen fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-40 bg-[rgba(0,0,0,0.4)]">
          <div className="bg-white rounded-[18px] py-10 px-8 w-[587px] min-h-[502px] flex flex-col gap-5">
            <div className="w-full flex items-start justify-between gap-6">
              <div className="flex flex-col gap-1">
                <h1 className="text-lg font-bold">Add Service</h1>
                <p className="text-xs text-[#606060]">
                  Add any additional services here to include them in your
                  subscription plan <br /> for your customers.
                </p>
              </div>
              <button
                className="w-[30px] h-[30px] rounded-full bg-[#F7F7F7] flex items-center justify-center p-1"
                onClick={handleShowModal}
              >
                <IoClose className="w-full h-full" />
              </button>
            </div>
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="service-name" className="text-[13px] font-medium">
                Service Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-[52px] px-4 text-sm font-normal bg-[#F7F7F7] outline-none rounded-lg"
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <label
                htmlFor="service-details"
                className="text-[13px] font-medium"
              >
                Service Details
              </label>
              <textarea
                name="service-details"
                id=""
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                className="w-full p-4 text-sm font-normal bg-[#F7F7F7] outline-none rounded-lg h-[130px] resize-none"
              ></textarea>
              {/* <div className="w-full text-end">
                <button
                  className="float-end text-[#FF204E] text-xs font-medium underline"
                  onClick={handleAddMore}
                >
                  Add more
                </button>
              </div> */}
            </div>
            {/* {addMore && (
              <>
                <div className="w-full flex flex-col gap-1">
                  <label
                    htmlFor="service-name"
                    className="text-[13px] font-medium"
                  >
                    Service Name
                  </label>
                  <input
                    type="text"
                    className="w-full h-[52px] px-4 text-sm font-normal bg-[#F7F7F7] outline-none rounded-lg"
                  />
                </div>
                <div className="w-full flex flex-col gap-1">
                  <label
                    htmlFor="service-details"
                    className="text-[13px] font-medium"
                  >
                    Service Details
                  </label>
                  <textarea
                    name="service-details"
                    id=""
                    className="w-full p-4 text-sm font-normal bg-[#F7F7F7] outline-none rounded-lg h-[125px]"
                  ></textarea>
                  <div className="w-full text-end">
                    <button
                      className="float-end text-[#FF204E] text-xs font-medium underline"
                      onClick={handleAddMore}
                    >
                      Add more
                    </button>
                  </div>
                </div>
              </>
            )} */}
            <div className="w-full">
              <button
                className="w-full bg-[#FF204E] h-[52px] rounded-lg text-white text-base font-bold"
                onClick={addService}
              >
                {loading ? <BtnLoader /> : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ServicePreferences;
