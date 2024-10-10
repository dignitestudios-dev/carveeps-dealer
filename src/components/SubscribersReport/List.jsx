import React, { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { RxCalendar } from "react-icons/rx";
import { styles } from "../../styles/styles";
import { FiSearch } from "react-icons/fi";
import { TiArrowSortedUp } from "react-icons/ti";
import { subscriberList } from "../../constants/subscriberList";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const List = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleShowSropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="bg-white p-6 rounded-t-[18px] flex flex-col gap-y-4">
      <div className="w-full bg-white p-6 flex flex-col gap-y-4 rounded-b-[18px]">
        <div className="w-full grid grid-cols-9 gap-4 py-4 border-b">
          <div>
            <p className="text-xs font-medium text-[#7C7C7C]">
              Subscription Date
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-[#7C7C7C]">
              Subscriber Name
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-[#7C7C7C]">
              Contact Details
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-[#7C7C7C]">VIN</p>
          </div>
          <div>
            <p className="text-xs font-medium text-[#7C7C7C] flex items-center gap-2">
              Subscription Plan <TiArrowSortedUp className="text-base" />
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-[#7C7C7C]">Amount</p>
          </div>
          <div>
            <p className="text-xs font-medium text-[#7C7C7C]">Duration</p>
          </div>
          <div>
            <p className="text-xs font-medium text-[#7C7C7C] flex items-center gap-2">
              Subscriber Type <TiArrowSortedUp className="text-base" />
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-[#7C7C7C]"></p>
          </div>
        </div>
        {subscriberList.map((subscriber, index) => {
          return <List subscriber={subscriber} key={index} />;
        })}
      </div>
    </div>
  );
};

export default List;
