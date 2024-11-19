import React, { useContext, useEffect, useState } from "react";
import { LuCalendarDays } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import DateModal from "../Global/DateModal";
import { GlobalContext } from "../../context/GlobalContext";
import Cookies from "js-cookie";
import axios from "axios";
import { NoData } from "../../assets/export";
import InfiniteScroll from "react-infinite-scroll-component";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const SubscriptionAquisitionReportList = () => {
  const [isOpen, setIsOpen] = useState(false);

  const ToggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const [subscribers, setSubscribers] = useState([]);
  const { baseUrl, navigate, setError } = useContext(GlobalContext);
  const [subscribersLoading, setSubscribersLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const getSubscribersBought = (page) => {
    const token = Cookies.get("token");

    if (token) {
      setSubscribersLoading((prev) => (currentPage > 0 ? prev : true));
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(
          filter?.date == null
            ? `${baseUrl}/dealership/reports/bought?filter=${filter?.filter}`
            : `${baseUrl}/dealership/reports/bought?particularDate=${filter?.date}`,
          { headers }
        )
        .then(
          (response) => {
            const newSubscribers = response?.data?.data
              ? response?.data?.data
              : [];
            setSubscribers(newSubscribers);
            setSubscribersLoading((prev) => (currentPage > 0 ? prev : false));

            setHasMore(newSubscribers.length > 0);
          },
          (error) => {
            setSubscribersLoading((prev) => (currentPage > 0 ? prev : false));

            if (error?.response?.status == 401) {
              Cookies.remove("token");
              navigate("/login");
            }
            setError(error?.response?.data?.message);
          }
        );
    } else {
      navigate("/login");
    }
  };
  const [filter, setFilter] = useState({
    date: null,
    filter: "all",
  });
  useEffect(() => {
    setCurrentPage(0);
    getSubscribersBought(0);
  }, [filter]);
  const formatDateFromISOString = (isoString) => {
    const splittedString = String(isoString).split("T")[0];
    const [year, month, day] = splittedString.split("-");
    const formattedString = `${month}-${day}-${year}`;
    const date = new Date(formattedString);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };

  const fetchNewData = (length) => {
    setCurrentPage(subscribers?.length);
  };

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
    <div className="bg-white w-full rounded-[18px] p-6 flex flex-col gap-6 items-start mt-6">
      <h1 className="text-[18px] font-bold">
        Subscription Aquisition Report List
      </h1>
      <div className="w-full flex flex-wrap justify-between items-center gap-3">
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
        <div className="flex items-center gap-3">
          <button
            className="px-4 py-2 rounded-full bg-[#EDEDED] flex items-center justify-center gap-1.5 text-xs font-medium"
            onClick={ToggleIsOpen}
          >
            <LuCalendarDays className="text-sm" />
            Select Date
          </button>
          <DateModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setFilter={setFilter}
          />
          <button
            onClick={() => handleDownload("report", "report")}
            className="px-4 py-2 rounded-full bg-black text-white text-xs font-medium"
          >
            Download
          </button>
        </div>
      </div>

      {subscribersLoading ? (
        <div className="bg-white w-full rounded-[18px]  flex flex-col gap-6 items-start ">
          <div className="w-full animate-pulse">
            <div className="w-full max-h-screen overflow-y-scroll modal-scroll hidden lg:flex flex-col mt-4">
              <div className="w-full grid grid-cols-6 gap-5 py-4">
                <div className="bg-gray-200 h-4 rounded-full"></div>
                <div className="bg-gray-200 h-4 rounded-full"></div>
                <div className="bg-gray-200 h-4 rounded-full"></div>
                <div className="bg-gray-200 h-4 rounded-full"></div>
                <div className="bg-gray-200 h-4 rounded-full"></div>
                <div className="bg-gray-200 h-4 rounded-full"></div>
              </div>
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="w-full grid grid-cols-6 gap-5 py-4 border-t border-b"
                >
                  <div className="bg-gray-200 h-4 rounded-full"></div>
                  <div className="bg-gray-200 h-4 rounded-full"></div>
                  <div className="bg-gray-200 h-4 rounded-full"></div>
                  <div className="bg-gray-200 h-4 rounded-full"></div>
                  <div className="bg-gray-200 h-4 rounded-full"></div>
                  <div className="bg-gray-200 h-4 rounded-full"></div>
                </div>
              ))}
            </div>

            <div className="w-full flex flex-col gap-6 lg:hidden mt-4">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="w-full cursor-pointer rounded-xl p-4 flex flex-col gap-3 items-start bg-gray-100 animate-pulse"
                >
                  <div className="w-full flex items-center justify-between">
                    <div className="bg-gray-200 h-4 w-1/4 rounded-full"></div>
                    <div className="bg-gray-200 h-4 w-1/4 rounded-full"></div>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <div className="bg-gray-200 h-4 w-1/4 rounded-full"></div>
                    <div className="bg-gray-200 h-4 w-1/4 rounded-full"></div>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <div className="bg-gray-200 h-4 w-1/4 rounded-full"></div>
                    <div className="bg-gray-200 h-4 w-1/4 rounded-full"></div>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <div className="bg-gray-200 h-4 w-1/4 rounded-full"></div>
                    <div className="bg-gray-200 h-4 w-1/4 rounded-full"></div>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <div className="bg-gray-200 h-4 w-1/4 rounded-full"></div>
                    <div className="bg-gray-200 h-4 w-1/4 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div
            id="report"
            className="w-full max-h-screen overflow-y-scroll modal-scroll hidden lg:flex flex-col"
          >
            <div className="w-full grid grid-cols-6 py-4">
              <div>
                <p className="text-[11px] text-[#7C7C7C] font-medium">Date</p>
              </div>
              <div>
                <p className="text-[11px] text-[#7C7C7C] font-medium">
                  Subscriber Name
                </p>
              </div>
              <div>
                <p className="text-[11px] text-[#7C7C7C] font-medium">
                  Subscription Plan
                </p>
              </div>
              <div>
                <p className="text-[11px] text-[#7C7C7C] font-medium">
                  Duration
                </p>
              </div>
              <div>
                <p className="text-[11px] text-[#7C7C7C] font-medium">Amount</p>
              </div>

              <div>
                <p className="text-[11px] text-[#7C7C7C] font-medium">
                  Sold By
                </p>
              </div>
            </div>
            {subscribers?.length == 0 ? (
              <div className="w-full bg-white rounded-b-[18px] flex items-center justify-center">
                <img src={NoData} alt="" className="w-96 my-10" />
              </div>
            ) : (
              <>
                {subscribers?.map((subscriber, key) => {
                  return (
                    <div
                      key={key}
                      className="w-full grid grid-cols-6 py-4 border-t border-b"
                    >
                      <div>
                        <p className="text-[11px] font-medium">
                          {formatDateFromISOString(subscriber?.date)}
                        </p>
                      </div>
                      <div>
                        <button
                          onClick={() =>
                            navigate(`/subscriber-details/${subscriber?._id}`)
                          }
                          className="text-[11px] font-medium"
                        >
                          {subscriber?.subscriberName}
                        </button>
                      </div>
                      <div>
                        <p className="text-[11px] font-medium">
                          {subscriber?.subscriptionPlan}
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] font-medium">
                          {subscriber?.interval == "year"
                            ? "Yearly"
                            : subscriber?.interval == "month" &&
                              subscriber?.intervalCount == 6
                            ? "BiAnnually"
                            : "Monthly"}
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] font-medium">
                          {subscriber?.amount}
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] font-medium">
                          {subscriber?.soldBy}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>

          <div
            id="scrollableDiv2"
            className="w-full flex flex-col gap-6 lg:hidden"
          >
            <>
              {subscribers?.map((subscriber, key) => {
                return (
                  <div
                    key={key}
                    onClick={() =>
                      navigate(`/subscriber-details/${subscriber?._id}`)
                    }
                    className="w-full cursor-pointer rounded-xl p-4 flex flex-col gap-3 items-start bg-[#F7F7F7]"
                  >
                    <div className="w-full flex items-center justify-between">
                      <p className="text-[11px] text-[#7C7C7C] font-medium">
                        Date
                      </p>
                      <p className="text-[11px] font-medium">
                        {formatDateFromISOString(subscriber?.date)}
                      </p>
                    </div>
                    <div className="w-full flex items-center justify-between">
                      <p className="text-[11px] font-medium">Subscriber Name</p>
                      <button
                        onClick={() =>
                          navigate(`/subscriber-details/${subscriber?._id}`)
                        }
                        className="text-[11px] font-medium"
                      >
                        {subscriber?.subscriberName}
                      </button>
                    </div>
                    <div className="w-full flex items-center justify-between">
                      <p className="text-[11px] text-[#7C7C7C] font-medium">
                        Subscription Plan
                      </p>
                      <p className="text-[11px] font-medium">
                        {subscriber?.subscriptionPlan}
                      </p>
                    </div>
                    <div className="w-full flex items-center justify-between">
                      <p className="text-[11px] text-[#7C7C7C] font-medium">
                        Duration
                      </p>
                      <p className="text-[11px] font-medium">
                        {subscriber?.interval == "year"
                          ? "Yearly"
                          : subscriber?.interval == "month" &&
                            subscriber?.intervalCount == 6
                          ? "BiAnnually"
                          : "Monthly"}
                      </p>
                    </div>
                    <div className="w-full flex items-center justify-between">
                      <p className="text-[11px] text-[#7C7C7C] font-medium">
                        Amount
                      </p>
                      <p className="text-[11px] font-medium">
                        US ${subscriber?.amount}
                      </p>
                    </div>

                    <div className="w-full flex items-center justify-between">
                      <p className="text-[11px] text-[#7C7C7C] font-medium">
                        Sold By
                      </p>
                      <p className="text-[11px] font-medium">
                        {subscriber?.soldBy}
                      </p>
                    </div>
                  </div>
                );
              })}
            </>
          </div>
        </>
      )}
    </div>
  );
};

export default SubscriptionAquisitionReportList;
