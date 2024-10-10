import React from "react";
import { HiOutlineStar } from "react-icons/hi";
import { AddServiceIcon, ReviewAndFinalizeIcon } from "../../assets/export";

const PlanTrack = () => {
  return (
    <div className="w-full">
      <h1 className="text-[18px] font-bold">Subscription Plans</h1>
      <div className="w-full my-12">
        <div className="lg:w-[891px] mx-auto flex items-center justify-between">
          <div className="flex flex-col items-center justify-start gap-2">
            <div className="w-[50px] h-[50px] bg-[#3FB743] rounded-md flex items-center justify-center">
              <HiOutlineStar className="text-white w-4 h-4" />
            </div>
            <p className="text-[13px] font-medium">Plan Setup</p>
          </div>
          <div className="flex flex-col items-center justify-start gap-2">
            <div className="w-[50px] h-[50px] bg-[#0F0F0F29] rounded-md flex items-center justify-center">
              <img src={AddServiceIcon} alt="" className="w-4 h-4" />
            </div>
            <p className="text-[13px] font-medium">Add Services</p>
          </div>
          <div className="flex flex-col items-center justify-start gap-2">
            <div className="w-[50px] h-[50px] bg-[#0F0F0F29] rounded-md flex items-center justify-center">
              <img src={ReviewAndFinalizeIcon} alt="" className="w-4 h-4" />
            </div>
            <p className="text-[13px] font-medium">Review and Finalize</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanTrack;
