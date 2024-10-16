import React from "react";
import { GoDotFill } from "react-icons/go";
import { SiToyota } from "react-icons/si";
//
const SubscriptionCard = () => {
  return (
    <div className="bg-white w-[447px] rounded-[18px] p-8 flex flex-col justify-center gap-6 h-[648px]">
      <div className="flex items-center gap-2">
        <div className="bg-red-200 w-[42px] h-[42px] flex items-center justify-center rounded-lg p-2">
          <SiToyota className="w-full h-full text-[#FF204E]" />
        </div>
        <p className="text-base font-medium">Mike Smith</p>
      </div>
      <div className="bg-[#C20028] w-[175px] h-[45px] rounded-full text-white text-base font-semibold flex items-center justify-center">
        DriveCare Plus
      </div>
      <div className="font-bold relative">
        <span className="text-[20px] font-medium absolute top-6 -left-3">
          $
        </span>
        <span className="text-[64px]">99</span>
        <sub className="text-[14px] font-normal">/annually</sub>
      </div>
      <button className="w-full bg-[#FF204E] rounded-lg text-white text-base font-bold py-3">
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
  );
};

export default SubscriptionCard;
