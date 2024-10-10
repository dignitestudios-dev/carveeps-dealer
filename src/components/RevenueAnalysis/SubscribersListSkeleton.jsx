import React from "react";
import { RxCalendar } from "react-icons/rx";

const SubscribersListSkeleton = () => {
  const placeholderItems = Array(6).fill(null);

  return (
    <div className="bg-white  pb-6 rounded-b-[18px] animate-pulse">
      <div className="w-full hidden lg:flex flex-col">
        <div className="w-full grid grid-cols-6 gap-4 py-4">
          {placeholderItems.map((_, index) => (
            <div key={index} className="flex items-center">
              <div className="w-full h-[16px] bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
        {placeholderItems.map((_, key) => (
          <div
            key={key}
            className="w-full grid grid-cols-6 gap-4 py-4 border-b border-t"
          >
            {placeholderItems.map((_, index) => (
              <div key={index} className="flex items-center">
                <div className="w-full h-[16px] bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="w-full flex flex-col lg:hidden gap-6">
        {placeholderItems.map((_, key) => (
          <div
            key={key}
            className="w-full rounded-xl p-4 flex flex-col gap-3 bg-[#F7F7F7]"
          >
            {placeholderItems.map((_, index) => (
              <div
                key={index}
                className="w-full flex items-start justify-between"
              >
                <div className="w-full h-[16px] bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="w-full bg-[#EDEDED] p-4 flex items-center justify-between mt-1">
        <div className="w-[100px] h-[16px] bg-gray-200 rounded"></div>
        <div className="w-[100px] h-[16px] bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default SubscribersListSkeleton;
