import React from "react";
import ChatBox from "./ChatBox";
import UserProfile from "./UserProfile";

const Grid = () => {
  return (
    <div className="h-[84vh] lg:h-[85vh] rounded-[18px]">
      <div className="w-full grid grid-cols-3 gap-6">
        <div className="col-span-3 lg:col-span-2">
            <ChatBox/>
        </div>
        <div className="col-span-0 lg:col-span-1">
            <UserProfile/>
        </div>
      </div>
    </div>
  );
};

export default Grid;
