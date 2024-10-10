import React from "react";

const AnalyticsLoader = () => {
  return (
    <div className="w-full flex items-center flex-col lg:flex-row gap-6">
      {Array(3)
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl p-4 w-[307px] h-[90px] flex items-center justify-start gap-4 custom-shadow animate-pulse"
          >
            <div className="w-16 h-16 bg-gray-200 rounded-3xl flex items-center justify-center"></div>
            <div className="flex flex-col gap-1">
              <div className="w-24 h-6 bg-gray-200 rounded"></div>
              <div className="w-32 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnalyticsLoader;
