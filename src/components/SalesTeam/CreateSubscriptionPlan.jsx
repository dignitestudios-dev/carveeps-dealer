import React, { useState } from "react";
import PlanSetup from "./PlanSetup";
import AddServicesForm from "./AddServicesForm";
import ReviewFinalize from "./ReviewFinalize";
import { GoDotFill } from "react-icons/go";
import { SiToyota } from "react-icons/si";
import { LuEye } from "react-icons/lu";
import SuccessModal from "./SuccessModal";
import { useNavigate } from "react-router";
import { HiOutlineStar } from "react-icons/hi";
import { AddServiceIcon, ReviewAndFinalizeIcon } from "../../assets/export";

const CreateSubscriptionPlan = () => {
  const [subscription, setSubscription] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [state, setState] = useState(1);
  const navigate = useNavigate();

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

  const renderForm = () => {
    switch (subscription) {
      case 1:
        return <PlanSetup />;
      case 2:
        return <AddServicesForm />;
      case 3:
        return <ReviewFinalize />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="w-full">
        <h1 className="text-xl font-bold">Subscription Plans</h1>
        <div className="w-full my-12">
          <div className="lg:w-[891px] h-20  mx-auto flex items-center justify-center">
            <div className="relative h-20 w- flex flex-col items-center justify-start gap-2">
              <div
                className={`w-[50px] h-[50px] ${state >= 1 ? 'bg-[#3FB743]' : 'bg-[#0F0F0F29]'} rounded-md flex items-center justify-center`}
              >
                <HiOutlineStar className="text-white w-4 h-4" />
              </div>
              <p className="absolute -bottom-2 w-20 text-start  text-[13px] font-medium">Plan Setup</p>
            </div>
            <span className={`w-[30%] h-[1.5px] mb-[20px] ${state >=2 ? "bg-[#3FB743]" : "bg-gray-200"}`}/>

            <div className="relative h-20 w- flex flex-col items-center justify-start gap-2">
              <div
                className={`w-[45px] h-[50px] ${state >= 2 ? 'bg-[#3FB743]' : 'bg-[#0F0F0F29]'} rounded-md flex items-center justify-center`}
              >
                <img src={AddServiceIcon} alt="" className="w-4 h-4" />
              </div>
              <p className="absolute -bottom-2 w-20 text-start  text-[13px] font-medium">Add Services</p>
            </div>
            <span className={`w-[30%] h-[1.5px] mb-[20px] ${state >=3 ? "bg-[#3FB743]" : "bg-gray-200"}`}/>

            <div className="relative h-20 w- flex flex-col items-center justify-start gap-2">
              <div
                className={`w-[50px] h-[50px] ${state >= 3 ? 'bg-[#3FB743]' : 'bg-[#0F0F0F29]'} rounded-md flex items-center justify-center`}
              >
                <img src={ReviewAndFinalizeIcon} alt="" className="w-4 h-4" />
              </div>
              <p className="absolute -bottom-2 w-32 text-start  text-[13px] font-medium">Review and Finalize</p>
            </div>
            </div>
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row gap-6 mt-6">
        {renderForm()}
        <div className="w-full mx-auto lg:w-[470px] bg-[#EFEFEF] p-6 rounded-[18px] flex flex-col items-center gap-6">
          <div className="w-full flex items-center justify-between">
            <h1 className="text-base font-bold flex items-center gap-1">
              <LuEye className="w-[20px] h-[14px]" /> Preview
            </h1>
            <p className="text-[13px] font-medium">What customer see</p>
          </div>
          <div className="bg-white rounded-[18px] w-full md:w-[411px] py-10 px-4 md:px-8 flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <div className="w-[34px] h-[34px] bg-red-200 flex items-center justify-center rounded-md">
                <SiToyota className="text-[#C20028]" />
              </div>
              <span className="text-base font-medium">Mike Smith</span>
            </div>
            <div className="w-[115px] bg-[#C20028] text-base font-semibold text-white rounded-full text-center py-2">
              Plan Name
            </div>
            <h1 className="text-[48px] font-bold relative">
              <sup className="text-base font-normal absolute top-4 -left-2">
                $
              </sup>
              90
              <sub className="text-sm font-normal">/annualy</sub>
            </h1>
            <button className="w-full bg-[#FF204E] text-white rounded-[8px] text-[14px] font-bold h-[48px]">
              Buy Now
            </button>
            <p className="text-base font-normal flex items-center gap-1">
              <GoDotFill /> Package feature goes here
            </p>
            <p className="text-base font-normal flex items-center gap-1">
              <GoDotFill /> Package feature goes here
            </p>
            <p className="text-base font-normal flex items-center gap-1">
              <GoDotFill /> Package feature goes here
            </p>
            <p className="text-base font-normal flex items-center gap-1">
              <GoDotFill /> Package feature goes here
            </p>
            <p className="text-base font-normal flex items-center gap-1">
              <GoDotFill /> Package feature goes here
            </p>
          </div>
        </div>
      </div>

      <div className="flex pt-10 pb-5 justify-end px-6">
        {subscription > 2 ? (
          <div className="w-full flex flex-col lg:flex-row items-center justify-end gap-6 py-6">
            <button
              className="w-[250px] text-[#FF204E] text-base font-bold rounded-[8px] border-[1px] border-[#FF204E] h-[50px]"
            >
              Download QR Code
            </button>
            <button
              className="w-[250px] text-white text-base font-bold rounded-[8px] bg-[#FF204E] h-[50px]"
              onClick={handleShowModal}
            >
              Create Plan
            </button>
            <SuccessModal showModal={showModal} setShowModal={setShowModal} onclick={handleShowModal}/>
          </div>
        ) : (
          <div className="flex gap-4">
            {
              subscription >= 2 ?  <button
              className="w-[250px] text-white text-base font-bold rounded-[8px] bg-[#C20028] py-3.5"
              onClick={handleBack}
            >
              Back
            </button>:<></>
            }
          <button
            className="w-[250px] text-white text-base font-bold rounded-[8px] bg-[#FF204E] py-3.5"
            onClick={handleNext}
          >
            Next
          </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateSubscriptionPlan;
