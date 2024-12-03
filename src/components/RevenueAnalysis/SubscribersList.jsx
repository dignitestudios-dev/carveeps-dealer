import React, { useContext, useEffect, useState } from "react";
import { styles } from "../../styles/styles";
import { RxCalendar } from "react-icons/rx";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import DateModal from "../Global/DateModal";
import SubscribersListSkeleton from "./SubscribersListSkeleton";
import { NoData } from "../../assets/export";
import InfiniteScroll from "react-infinite-scroll-component";
import { GlobalContext } from "../../context/GlobalContext";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const SubscribersList = ({
  revenue,
  revenueData,
  loading,
  setFilter,
  filter,
  fetchNewData,
  hasMore,
  setTeamFilter,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const ToggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleShowSropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const formatDateFromISOString = (isoString) => {
    if (isoString == null) return "";
    const splittedString = String(isoString).split("T")[0];
    const [year, month, day] = splittedString.split("-");
    const formattedString = `${month}-${day}-${year}`;
    const date = new Date(formattedString);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };

  const { team } = useContext(GlobalContext);
  useEffect(() => {
    console.log(revenue?.analysis);
  }, [revenue]);

  const handleDownload = async (elementId, filename) => {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error("Element not found");
      return;
    }

    const padding = 3; // Padding at the top of each page in pixels
    element.style.backgroundColor = "#fff";
    element.style.padding = `${padding}px`;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight() - padding * 2; // Adjusted height to account for padding

    let imgProps = pdf.getImageProperties(imgData);
    let imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

    let heightLeft = imgHeight;
    let position = padding;

    // Add the first page with top padding
    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
    heightLeft -= pdfHeight;

    // Add extra pages with consistent padding at the top
    while (heightLeft > 0) {
      position = padding; // Reset position for each new page to start at the padding
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save(filename);

    element.style.backgroundColor = "";
    element.style.padding = "";
  };

  return (
    <div className="bg-white px-6 pb-6 rounded-b-[18px]">
      <div className="w-full flex items-start lg:items-center justify-between flex-col lg:flex-row gap-4 py-3">
        <div className="flex items-center justify-start gap-3 flex-wrap">
          <button
            onClick={() => setFilter({ date: null, filter: "all" })}
            className={`text-xs font-medium ${
              filter?.filter == "all"
                ? "bg-[#FF204E]  text-white"
                : "text-black bg-[#EDEDED]"
            } rounded-full px-3 py-1.5`}
          >
            All
          </button>
          <button
            onClick={() => setFilter({ date: null, filter: "yearToDate" })}
            className={`text-xs font-medium ${
              filter?.filter == "yearToDate"
                ? "bg-[#FF204E]  text-white"
                : "text-black bg-[#EDEDED]"
            } rounded-full px-3 py-1.5`}
          >
            Year to Date
          </button>
          <button
            onClick={() => setFilter({ date: null, filter: "thisMonth" })}
            className={`text-xs font-medium ${
              filter?.filter == "thisMonth"
                ? "bg-[#FF204E]  text-white"
                : "text-black bg-[#EDEDED]"
            } rounded-full px-3 py-1.5`}
          >
            This Month
          </button>
          <button
            onClick={() => setFilter({ date: null, filter: "lastMonth" })}
            className={`text-xs font-medium ${
              filter?.filter == "lastMonth"
                ? "bg-[#FF204E]  text-white"
                : "text-black bg-[#EDEDED]"
            } rounded-full px-3 py-1.5`}
          >
            Last Month
          </button>
        </div>
        <div className="flex items-center gap-4 justify-start lg:justify-end">
          <button
            className="bg-[#EDEDED] text-black font-medium text-xs w-[108px] h-[32px] rounded-full flex items-center justify-center gap-1.5"
            onClick={ToggleIsOpen}
          >
            <RxCalendar className="text-base" />
            Select Date
          </button>
          <DateModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setFilter={setFilter}
          />
          <button
            onClick={() => handleDownload("revenue", "Revenue")}
            className="bg-black text-white font-medium text-xs w-[97px] h-[32px] rounded-full"
          >
            Download
          </button>
        </div>
      </div>
      {loading ? (
        <SubscribersListSkeleton />
      ) : (
        <>
          <div id="revenue" className="w-full  hidden lg:flex flex-col">
            <div className="w-full grid grid-cols-6 gap-4 py-4">
              <div className="flex items-center">
                <p className="text-xs font-medium text-[#7C7C7C]">Date</p>
              </div>
              <div>
                <p className="text-xs font-medium text-[#7C7C7C]">
                  Subscriber Name
                </p>
              </div>
              <div className="flex items-center">
                <p className="text-xs font-medium text-[#7C7C7C]">
                  Subscription Plan
                </p>
              </div>
              <div className="flex items-center">
                <p className="text-xs font-medium text-[#7C7C7C]">Duration</p>
              </div>
              <div className="flex items-center relative">
                <button
                  className="text-xs font-medium text-[#7C7C7C] flex items-center gap-1"
                  onClick={handleShowSropdown}
                >
                  Sales Person{" "}
                  {showDropdown ? (
                    <IoMdArrowDropup className="text-lg" />
                  ) : (
                    <IoMdArrowDropdown className="text-lg" />
                  )}
                </button>
                {showDropdown && (
                  <div className="absolute w-[160px] h-[180px] shadow-2xl z-40 bg-white top-6 right-10 py-2 overflow-y-scroll rounded-xl modal-scroll">
                    {team?.map((item) => {
                      return (
                        <button
                          key={item?._id}
                          onClick={() => {
                            setTeamFilter(item?._id);
                            handleShowSropdown();
                          }}
                          className="text-xs font-medium text-[#7C7C7C] hover:bg-gray-50 transition-all duration-200 w-full text-start px-6 py-2"
                        >
                          {item?.name}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="flex items-center">
                <p className={`text-xs font-medium text-[#7C7C7C]`}>Revenue</p>
              </div>
            </div>

            {revenue?.length < 1 ? (
              <div className="w-full bg-white rounded-b-[18px] flex items-center justify-center">
                <img src={NoData} alt="" className="w-96 my-10" />
              </div>
            ) : (
              revenue?.map((item, key) => (
                <div
                  key={key}
                  className="w-full grid grid-cols-6 gap-4 py-4 border-b border-t"
                >
                  <div className="flex items-center">
                    <p className="text-xs font-medium">
                      {formatDateFromISOString(item?.date)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium flex items-center gap-2">
                      {item?.subscriberName}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-xs font-medium flex items-center gap-2">
                      {item?.subscriptionPlan}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-xs font-medium">{item?.duration}</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-xs font-medium">{item?.salesPerson}</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-xs font-medium">US ${item?.revenue}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          <div
            id="scrollableDiv"
            className="w-full flex flex-col lg:hidden gap-6"
          >
            {revenue?.map((item, key) => {
              return (
                <div
                  key={key}
                  className="w-full rounded-xl p-4 flex flex-col gap-3 bg-[#F7F7F7]"
                >
                  <div className="w-full flex items-start justify-between">
                    <p className="text-xs font-medium text-[#7C7C7C]">Date</p>
                    <p className="text-xs font-medium">
                      {formatDateFromISOString(item?.date)}
                    </p>
                  </div>
                  <div className="w-full flex items-start justify-between">
                    <p className="text-xs font-medium text-[#7C7C7C]">
                      Subscriber Name
                    </p>
                    <p className="text-xs font-medium">
                      {item?.subscriberName}
                    </p>
                  </div>
                  <div className="w-full flex items-start justify-between">
                    <p className="text-xs font-medium text-[#7C7C7C]">
                      Subscription Plan
                    </p>
                    <p className="text-xs font-medium">
                      {item?.subscriptionPlan}
                    </p>
                  </div>
                  <div className="w-full flex items-start justify-between">
                    <p className="text-xs font-medium text-[#7C7C7C]">
                      Duration
                    </p>
                    <p className="text-xs font-medium">{item?.duration}</p>
                  </div>
                  <div className="w-full flex items-start justify-between">
                    <p className="text-xs font-medium text-[#7C7C7C]">
                      Sales Person
                    </p>
                    <p className="text-xs font-medium">{item?.salesPerson}</p>
                  </div>
                  <div className="w-full flex items-start justify-between">
                    <p className="text-xs font-medium text-[#7C7C7C]">
                      Revenue
                    </p>
                    <p className="text-xs font-medium">US ${item?.revenue}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-full bg-[#EDEDED] p-4 flex items-center justify-between mt-1">
            <h1 className="text-[13px] font-bold">Total Revenue</h1>
            <h1 className="text-[13px] font-bold">
              ${revenueData?.totalRevenue}
            </h1>
          </div>
        </>
      )}
    </div>
  );
};

export default SubscribersList;
