import React, { useState, useEffect } from "react";
import SaveModal from "./SaveModal";
import PreviousSubscriptionModal from "./PreviousSubscriptionsModal";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import Cookies from "js-cookie";
import axios from "axios";

const SalesPersonProfile = () => {
  const { id } = useParams();
  const [showCountryCode, setShowCountryCode] = useState(false);
  const [showSubscriptionsModal, setShowSubscriptionsModal] = useState(false);

  const handleShowSubcriptionModal = () => {
    setShowSubscriptionsModal(!showSubscriptionsModal);
  };

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleShowCode = () => {
    setShowCountryCode(!showCountryCode);
  };
  const [salesPerson, setSalesPerson] = useState([]);
  const { baseUrl, navigate, setError } = useContext(GlobalContext);
  const [salesPersonLoading, setSalesPersonLoading] = useState(false);

  const getSalesPerson = () => {
    const token = Cookies.get("token");

    if (token) {
      setSalesPersonLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(`${baseUrl}/dealership/salesPerson?id=${id}`, {
          headers,
        })
        .then(
          (response) => {
            setSalesPerson(response?.data?.data[0]);
            setSalesPersonLoading(false);
          },
          (error) => {
            setSalesPersonLoading(false);
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
    getSalesPerson();
  }, []);

  const [previousSubscriptions, setPreviousSubscriptions] = useState([]);
  const [previousSubscriptionsLoading, setPreviousSubscriptionsLoading] =
    useState(false);

  const getData = () => {
    const token = Cookies.get("token");

    if (token) {
      setPreviousSubscriptionsLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(`${baseUrl}/dealership/salesPerson/${id}/subscription`, {
          headers,
        })
        .then(
          (response) => {
            setPreviousSubscriptions(response?.data?.data);
            setPreviousSubscriptionsLoading(false);
          },
          (error) => {
            setPreviousSubscriptionsLoading(false);
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
    getData();
  }, []);
  const formatDateFromISOString = (isoString) => {
    const splittedString = String(isoString).split("T")[0];
    const date = new Date(splittedString);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };
  return (
    <>
      <div className="rounded-[18px] p-6 bg-white flex flex-col items-start gap-6">
        <div className="w-full flex items-start gap-6 lg:items-center justify-between flex-col lg:flex-row">
          <h1 className="text-xl font-bold">{salesPerson?.name} Profile</h1>
          <div className="flex items-start md:items-center flex-col md:flex-row gap-4">
            <button
              onClick={() => navigate(`/sales-team/edit-salesperson/${id}`)}
              className="bg-[#FF204E26] rounded-[10px] px-4 py-2 text-[#FF204E] text-xs font-bold text-center"
            >
              Edit Details
            </button>
            <button
              onClick={() => {
                navigate(`/create-subscription-plan/${id}`);
              }}
              className="bg-[#FF204E] rounded-[10px] px-4 py-2 text-white text-xs font-bold text-center"
            >
              Create Subscription Plan
            </button>
          </div>
        </div>

        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="w-full md:w-[434px] h-[77px] flex flex-col gap-1">
            <label htmlFor="name" className="text-base font-medium">
              Name
            </label>
            <input
              type="text"
              className="w-full bg-[#F7F7F7] h-[52px] rounded-xl px-4 text-[13px] font-normal text-[#5C5C5C] outline-none"
              placeholder={salesPerson?.name}
            />
          </div>
          <div className="w-full md:w-[434px] h-[77px] flex flex-col gap-1">
            <label htmlFor="Job Title" className="text-base font-medium">
              Job Title
            </label>
            <input
              type="text"
              className="w-full bg-[#F7F7F7] h-[52px] rounded-xl px-4 text-[13px] font-normal text-[#5C5C5C] outline-none"
              placeholder={salesPerson?.jobTitle}
            />
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="w-full md:w-[434px] h-[77px] flex flex-col gap-1">
            <label htmlFor="Email" className="text-base font-medium">
              Email
            </label>
            <input
              type="email"
              className="w-full bg-[#F7F7F7] h-[52px] rounded-xl px-4 text-[13px] font-normal text-[#5C5C5C] outline-none"
              placeholder={salesPerson?.email}
            />
          </div>
          <div className="w-full md:w-[434px] h-[77px] flex flex-col gap-1 relative items-start">
            <label htmlFor="Phone Number" className="text-base font-medium">
              Phone Number
            </label>
            <div className="w-full bg-[#F7F7F7] h-[52px] rounded-xl flex items-center gap-1 py-1">
              <button
                className="w-12 border-r-2 text-center text-[#5C5C5C] text-[13px] font-normal h-full"
                // onClick={handleShowCode}
              >
                +1
              </button>
              <input
                type="text"
                placeholder={salesPerson?.phoneNumber}
                className="text-[#5C5C5C] text-[13px] font-normal h-full bg-transparent outline-none px-2"
              />
              {/* {showCountryCode && (
                <div className="w-[80px] shadow-lg max-h-[200px] bg-white z-20 rounded-lg absolute -left-8 top-20 overflow-y-scroll">
                  <option
                    value="+1"
                    className="px-4 text-[13px] py-1 hover:bg-gray-100 cursor-pointer text-center"
                  >
                    +1
                  </option>
                  <option
                    value="+1"
                    className="px-4 text-[13px] py-1 hover:bg-gray-100 cursor-pointer text-center"
                  >
                    +1
                  </option>
                  <option
                    value="+1"
                    className="px-4 text-[13px] py-1 hover:bg-gray-100 cursor-pointer text-center"
                  >
                    +1
                  </option>
                  <option
                    value="+1"
                    className="px-4 text-[13px] py-1 hover:bg-gray-100 cursor-pointer text-center"
                  >
                    +1
                  </option>
                  <option
                    value="+1"
                    className="px-4 text-[13px] py-1 hover:bg-gray-100 cursor-pointer text-center"
                  >
                    +1
                  </option>
                  <option
                    value="+1"
                    className="px-4 text-[13px] py-1 hover:bg-gray-100 cursor-pointer text-center"
                  >
                    +1
                  </option>
                </div>
              )} */}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="w-full md:w-[434px] h-[77px] flex flex-col gap-1">
            <label htmlFor="Employee Number" className="text-base font-medium">
              Employee Number
            </label>
            <input
              type="text"
              className="w-full bg-[#F7F7F7] h-[52px] rounded-xl px-4 text-[13px] font-normal text-[#5C5C5C] outline-none"
              placeholder={salesPerson?.empNo}
            />
          </div>
          {/* <div className="w-full md:w-[434px] h-[77px] flex flex-col gap-1">
            <label htmlFor="Job Title" className="text-base font-medium">
              Subscription Plan{" "}
              <span className="text-[13px] text-[#5C5C5C]">(Optional)</span>
            </label>
            <select className="w-full bg-[#F7F7F7] h-[52px] rounded-xl px-4 text-[13px] font-normal text-[#5C5C5C] outline-none">
              <option
                value=""
                className="bg-[#F7F7F7] text-[13px] font-normal text-[#5C5C5C]"
              >
                DriveCar Plus
              </option>
              <option
                value=""
                className="bg-[#F7F7F7] text-[13px] font-normal text-[#5C5C5C]"
              >
                DriveCar Premium
              </option>
            </select>
          </div> */}
        </div>
      </div>
      <div className="rounded-[18px] p-6 bg-white flex flex-col items-start mt-6 w-full">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-[18px] font-bold">
            Associated Subscription Plans
          </h1>
          {/* <button
            className="px-4 py-2 rounded-full text-xs font-bold underline text-[#FF204E]"
            onClick={handleShowSubcriptionModal}
          >
            View All
          </button>
          <PreviousSubscriptionModal
            showModal={showSubscriptionsModal}
            setShowModal={setShowSubscriptionsModal}
            onclick={handleShowSubcriptionModal}
          /> */}
        </div>
        <div className="w-full hidden lg:flex flex-col">
          <div className="w-full grid grid-cols-5 py-4 mt-2">
            <div className="">
              <h1 className="text-xs text-[#7C7C7C] font-medium">Date</h1>
            </div>
            <div className="">
              <h1 className="text-xs text-[#7C7C7C] font-medium">
                Subscription Plan
              </h1>
            </div>
            <div className="">
              <h1 className="text-xs text-[#7C7C7C] font-medium">Duration</h1>
            </div>
            <div className="">
              <h1 className="text-xs text-[#7C7C7C] font-medium">Amount</h1>
            </div>
            <div className="">
              <h1 className="text-xs text-[#7C7C7C] font-medium"></h1>
            </div>
          </div>
          {previousSubscriptions?.map((item, key) => {
            return (
              <div
                key={key}
                className="w-full grid grid-cols-5 py-3 border-t border-b"
              >
                <div>
                  <p className="text-xs font-medium">
                    {formatDateFromISOString(item?.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium">{item?.name}</p>
                </div>
                <div>
                  <p className="text-xs font-medium">
                    {item?.interval == "year"
                      ? "Yearly"
                      : item?.interval == "month" && item?.intervalCount == 6
                      ? "BiAnnually"
                      : "Monthly"}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium">USD ${item?.price}</p>
                </div>
                <div>
                  <button
                    className="text-xs font-medium text-[#FF3B30]"
                    onClick={handleShowModal}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full flex flex-col lg:hidden gap-6 mt-6">
          {previousSubscriptions?.map((item, key) => {
            return (
              <div
                key={key}
                className="w-full flex flex-col gap-3 rounded-xl bg-[#EDEDED] p-4"
              >
                <div className="w-full flex items-start justify-between">
                  <h1 className="text-xs text-[#7C7C7C] font-medium">Date</h1>
                  <p className="text-xs font-medium">
                    {formatDateFromISOString(item?.createdAt)}
                  </p>
                </div>
                <div className="w-full flex items-start justify-between">
                  <h1 className="text-xs text-[#7C7C7C] font-medium">
                    Subscription Plan
                  </h1>
                  <p className="text-xs font-medium">{item?.name}</p>
                </div>
                <div className="w-full flex items-start justify-between">
                  <h1 className="text-xs text-[#7C7C7C] font-medium">
                    Duration
                  </h1>
                  <p className="text-xs font-medium">
                    {item?.interval == "year"
                      ? "Yearly"
                      : item?.interval == "month" && item?.intervalCount == 6
                      ? "BiAnnually"
                      : "Monthly"}
                  </p>
                </div>
                <div className="w-full flex items-start justify-between">
                  <h1 className="text-xs text-[#7C7C7C] font-medium">
                    USD ${item?.price}
                  </h1>
                  <p className="text-xs font-medium"></p>
                </div>
                <div className="w-full flex items-start justify-end">
                  <button
                    className="text-xs font-medium text-[#FF3B30]"
                    onClick={handleShowModal}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <RemoveSubscriptionPlanModal
        showModal={showModal}
        setShowModal={setShowModal}
        onclick={handleShowModal}
      />
    </>
  );
};

export default SalesPersonProfile;

const RemoveSubscriptionPlanModal = ({ showModal, setShowModal, onclick }) => {
  return (
    showModal && (
      <div className="w-screen h-screen fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)] z-40 px-6">
        <div className="bg-white rounded-[18px] p-6 lg:w-[375px] w-full h-[187px] flex flex-col items-start justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-[22px] font-bold">Remove Subscription Plan</h1>
            <p className="text-base">
              Are you sure you want to remove this subscription plan from the
              "Mark Taylor's Profile"?
            </p>
          </div>
          <div className="w-full flex justify-end items-center gap-x-6">
            <button
              className="text-[#FF204E] text-base font-bold"
              onClick={onclick}
            >
              Cancel
            </button>
            <button
              className="text-[#FF204E] text-base font-bold"
              onClick={onclick}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    )
  );
};
