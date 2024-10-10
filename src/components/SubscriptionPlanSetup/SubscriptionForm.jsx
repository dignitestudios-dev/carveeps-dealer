import React, { useState } from "react";
import {
  AddServiceIcon,
  ReviewAndFinalizeIcon,
  ToyotaLogo,
} from "../../assets/export";
import { LuEye } from "react-icons/lu";
import { SiToyota } from "react-icons/si";
import { GoDotFill } from "react-icons/go";
import SetupForm from "./SetupForm";
import ServicePreferences from "./ServicePreferences";
import Review from "./Review";
import SuccessModal from "./SuccessModal";
import { Link, useParams } from "react-router-dom";
import { HiOutlineStar } from "react-icons/hi";
import { useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { PlanCreationContext } from "../../context/PlanCreationContext";
import BtnLoader from "../Global/BtnLoader";

const SubscriptionForm = () => {
  const [showModal, setShowModal] = useState(false);

  const {
    createPlan,
    subscription,
    setSubscription,
    state,
    setState,
    loading,
    formData,
    setFormData,
    selectedServices,
    addServicesToPlan,
    validateServices,
    duration,
  } = useContext(PlanCreationContext);

  const { salesPersonId } = useParams();

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleNext = () => {
    setSubscription(subscription + 1);
    setState(state + 1);
  };

  const handleBack = () => {
    setSubscription(subscription - 1);
    setState(state - 1);
  };

  const [team, setTeam] = useState([]);
  const { baseUrl, navigate } = useContext(GlobalContext);
  const [teamLoading, setTeamLoading] = useState(false);

  const getTeam = () => {
    const token = Cookies.get("token");

    if (token) {
      setTeamLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios.get(`${baseUrl}/dealership/salesPerson`, { headers }).then(
        (response) => {
          setTeam(response?.data?.data);
          setTeamLoading(false);
        },
        (error) => {
          setTeamLoading(false);
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
    getTeam();
  }, []);

  const renderForm = () => {
    switch (subscription) {
      case 1:
        return <SetupForm team={team} />;
      case 2:
        return <ServicePreferences />;
      case 3:
        return <Review />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="w-full">
        <h1 className="text-[18px] font-bold">Subscription Plans</h1>
        <div className="w-full my-12">
          <div className="lg:w-[891px] h-20  mx-auto flex items-center justify-center">
            <div className="relative h-20 w- flex flex-col items-center justify-start gap-2">
              <div
                className={`w-[50px] h-[50px] ${
                  state >= 1 ? "bg-[#3FB743]" : "bg-[#0F0F0F29]"
                } rounded-md flex items-center justify-center`}
              >
                <HiOutlineStar className="text-white w-4 h-4" />
              </div>
              <p className="absolute -bottom-2 w-20 text-start  text-[13px] font-medium">
                Plan Setup
              </p>
            </div>
            <span
              className={`w-[30%] h-[1.5px] mb-[20px] ${
                state >= 2 ? "bg-[#3FB743]" : "bg-gray-200"
              }`}
            />

            <div className="relative h-20 w- flex flex-col items-center justify-start gap-2">
              <div
                className={`w-[45px] h-[50px] ${
                  state >= 2 ? "bg-[#3FB743]" : "bg-[#0F0F0F29]"
                } rounded-md flex items-center justify-center`}
              >
                <img src={AddServiceIcon} alt="" className="w-4 h-4" />
              </div>
              <p className="absolute -bottom-2 w-20 text-start  text-[13px] font-medium">
                Add Services
              </p>
            </div>
            <span
              className={`w-[30%] h-[1.5px] mb-[20px] ${
                state >= 3 ? "bg-[#3FB743]" : "bg-gray-200"
              }`}
            />

            <div className="relative h-20 w- flex flex-col items-center justify-start gap-2">
              <div
                className={`w-[50px] h-[50px] ${
                  state >= 3 ? "bg-[#3FB743]" : "bg-[#0F0F0F29]"
                } rounded-md flex items-center justify-center`}
              >
                <img src={ReviewAndFinalizeIcon} alt="" className="w-4 h-4" />
              </div>
              <p className="absolute -bottom-2 w-32 text-start  text-[13px] font-medium">
                Review and Finalize
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row gap-6 mt-6">
        {renderForm()}
        <div className="w-full lg:w-[470px] bg-[#EFEFEF] px-2 py-4 rounded-[18px] flex flex-col gap-6">
          <div className="w-full flex items-center justify-between">
            <h1 className="text-base font-bold flex items-center gap-1">
              <LuEye className="w-[20px] h-[14px]" /> Preview
            </h1>
            <p className="text-[13px] font-medium">Customer view</p>
          </div>
          <div className="bg-white rounded-[18px] w-full md:w-[411px] py-10 px-4 mx-auto md:px-8 flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <div className="w-[34px] h-[34px] bg-red-200 flex items-center justify-center rounded-md">
                <img
                  src={Cookies.get("dealershipLogo")}
                  alt=""
                  className="w-full h-full rounded-md"
                />
              </div>
              <span className="text-base font-medium">
                {formData?.salesPerson?.name
                  ? formData?.salesPerson?.name
                  : "Sales Person Name"}
              </span>
            </div>
            <div className="w-[205px] bg-[#C20028] text-base font-semibold text-white rounded-full text-center py-2">
              {formData?.planName ? formData?.planName : "Plan Name"}
            </div>
            <h1 className="text-[48px] font-bold relative">
              <sup className="text-base font-normal absolute top-4 -left-2">
                $
              </sup>
              {formData?.price ? formData?.price : "00"}
              <sub className="text-sm font-normal">
                /
                {formData?.duration == "year"
                  ? "annually"
                  : formData?.duration == "biannual"
                  ? "biannually"
                  : formData?.duration == "month"
                  ? "monthly"
                  : "Duration"}
              </sub>
            </h1>
            <span className="w-full flex items-center justify-center bg-[#FF204E] text-white rounded-[8px] text-[14px] font-bold h-[48px]">
              Buy Now
            </span>
            <div className="w-full flex flex-col gap-2 justify-start items-start">
              <div
                className={`w-full h-auto grid ${
                  duration !== "month" ? "grid-cols-3" : "grid-cols-2"
                }`}
              >
                <span className="text-sm text-gray-800 font-medium">Name</span>
                <span className="text-sm w-full flex items-center justify-center text-gray-800 font-medium">
                  Frequency
                </span>
                {duration !== "month" && (
                  <span className="text-sm w-full flex items-center justify-center text-gray-800 font-medium">
                    Duration
                  </span>
                )}
              </div>
              <div className="w-full h-auto flex flex-col justify-start items-start gap-1">
                {selectedServices?.map((service, key) => {
                  return (
                    <div
                      className={`w-full h-auto grid ${
                        duration !== "month" ? "grid-cols-3" : "grid-cols-2"
                      }`}
                    >
                      <span className="text-xs text-gray-600 font-medium">
                        {service?.service?.name}
                      </span>
                      <span className="w-full flex items-center justify-center text-xs text-gray-600 font-medium">
                        {service?.frequency}
                      </span>
                      {duration !== "month" && (
                        <div className="w-full flex justify-center items-center">
                          {service?.interval !== "" && (
                            <span className="w-16 px-2 h-6 flex items-center justify-center text-xs bg-blue-500/20 text-blue-500 rounded-full capitalize font-medium">
                              {service?.interval == "year" && duration == "year"
                                ? "Yearly"
                                : service?.interval == "year" &&
                                  duration == "biannual"
                                ? "Biannually"
                                : "Monthly"}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {subscription > 2 ? (
        <>
          <div className="w-full flex flex-col lg:flex-row items-center justify-end gap-6 py-6">
            <button
              onClick={() => handleBack()}
              className="w-[250px] text-white text-base font-bold rounded-[8px] bg-[#C20028] py-3.5 text-center"
            >
              Back
            </button>
            <button
              className="w-[250px] text-white text-base font-bold rounded-[8px] bg-[#FF204E] py-3.5"
              onClick={addServicesToPlan}
            >
              {loading ? <BtnLoader /> : "Create Plan"}
            </button>
          </div>
        </>
      ) : subscription == 1 ? (
        <>
          <div className="w-full flex flex-col lg:flex-row items-center justify-end gap-6 py-6">
            {!salesPersonId && subscription == 1 && (
              <button
                onClick={() => navigate("/subscription-plans")}
                className="w-[250px] text-white text-base font-bold rounded-[8px] bg-[#C20028] py-3.5 text-center"
              >
                Back
              </button>
            )}

            <button
              onClick={createPlan}
              className="w-[250px] text-white text-base font-bold rounded-[8px] bg-[#FF204E] py-3.5"
            >
              {loading ? <BtnLoader /> : "Next"}
            </button>
          </div>
        </>
      ) : (
        subscription == 2 && (
          <>
            <div className="w-full flex flex-col lg:flex-row items-center justify-end gap-6 py-6">
              <button
                className="w-[250px] text-white text-base font-bold rounded-[8px] bg-[#C20028] py-3.5"
                onClick={handleBack}
              >
                Back
              </button>
              <button
                className="w-[250px] text-white text-base font-bold rounded-[8px] bg-[#FF204E] py-3.5"
                onClick={() => {
                  if (validateServices()) {
                    handleNext();
                  }
                }}
              >
                {"Next"}
              </button>
            </div>
          </>
        )
      )}
      <SuccessModal
        showModal={showModal}
        setShowModal={setShowModal}
        onclick={handleShowModal}
      />
    </>
  );
};

export default SubscriptionForm;
