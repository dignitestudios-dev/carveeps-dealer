import React from "react";

const PackageCardLoader = () => {
  return (
    <div className="w-full md:w-[373px] h-96 rounded-[12px] p-6 flex flex-col gap-5 bg-white animate-pulse cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="w-[28px] h-[28px] bg-gray-300 flex items-center justify-center rounded-md"></div>
            <span className="w-24 h-4 bg-gray-300 rounded"></span>
          </div>
          <div className="w-[116px] py-1.5 bg-gray-300 rounded-full"></div>
        </div>
        <div className="w-24 h-10 bg-gray-300 rounded"></div>
      </div>
      <div className="w-full h-auto flex flex-col justify-start items-start gap-3">
        {Array(8)
          .fill("")
          .map((_, index) => (
            <div key={index} className="w-full h-4 bg-gray-300 rounded"></div>
          ))}
      </div>
    </div>
  );
};

export default PackageCardLoader;
