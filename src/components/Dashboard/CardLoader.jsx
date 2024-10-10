import React from "react";

const CardLoader = () => {
  return (
    <div className="w-full cursor-pointer rounded-xl p-4 flex flex-col gap-3 items-start bg-[#F7F7F7]">
      <div className="w-full flex items-center justify-between animate-pulse">
        <div className="h-3 bg-gray-300 rounded-full w-1/4"></div>
        <div className="h-3 bg-gray-300 rounded-full w-1/3"></div>
      </div>
      <div className="w-full flex items-center justify-between animate-pulse">
        <div className="h-3 bg-gray-300 rounded-full w-1/4"></div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          <div className="h-3 bg-gray-300 rounded-full w-1/3"></div>
        </div>
      </div>
      <div className="w-full flex items-center justify-between animate-pulse">
        <div className="h-3 bg-gray-300 rounded-full w-1/4"></div>
        <div className="w-auto flex flex-col justify-end items-end gap-1">
          <div className="h-3 bg-gray-300 rounded-full w-1/3"></div>
          <div className="h-3 bg-gray-300 rounded-full w-1/4"></div>
        </div>
      </div>
      <div className="w-full flex items-center justify-between animate-pulse">
        <div className="h-3 bg-gray-300 rounded-full w-1/4"></div>
        <div className="h-3 bg-gray-300 rounded-full w-1/3"></div>
      </div>
      <div className="w-full flex items-center justify-between animate-pulse">
        <div className="h-3 bg-gray-300 rounded-full w-1/4"></div>
        <div className="h-3 bg-gray-300 rounded-full w-1/3"></div>
      </div>
      <div className="w-full flex items-center justify-between animate-pulse">
        <div className="h-3 bg-gray-300 rounded-full w-1/4"></div>
        <div className="h-3 bg-gray-300 rounded-full w-1/3"></div>
      </div>
      <div className="w-full flex items-center justify-between animate-pulse">
        <div className="h-3 bg-gray-300 rounded-full w-1/4"></div>
        <div className="h-3 bg-gray-300 rounded-full w-1/3"></div>
      </div>
      <div className="w-full flex items-center justify-between animate-pulse">
        <div className="h-3 bg-gray-300 rounded-full w-1/4"></div>
        <div className="h-3 bg-gray-300 rounded-full w-1/3"></div>
      </div>
    </div>
  );
};

export default CardLoader;
