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
import { FaSpinner } from "react-icons/fa";
import exportToExcel from "../../utils/dataExport";

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

  function convertToDateFormat(date) {
    // Extract the day, month, and year
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();

    // Combine into dd-mm-yyyy format
    return `${day}-${month}-${year}`;
  }

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
            : `${baseUrl}/dealership/reports/bought?particularDate=${convertToDateFormat(
                filter?.date
              )}`,
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
    if (isoString == null) return "N/A";
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

  const [downloading, setDownloading] = useState(false);
  const handleDownload = async (elementId, filename) => {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error("Element not found");
      return;
    }
    setDownloading(true);

    const padding = 3; // Padding at the top of each page in pixels
    element.style.backgroundColor = "#fff";
    element.style.paddingTop = `${padding}px`;
    element.style.paddingBottom = `${padding}px`;
    // Temporarily hide elements with the class 'pdf-exclude'
    const excludeElements = document.querySelectorAll(".pdf-exclude");
    excludeElements.forEach((el) => {
      el.style.display = "none";
    });

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

    // Restore visibility of the hidden elements
    excludeElements.forEach((el) => {
      el.style.display = "";
    });
    element.style.backgroundColor = "";
    element.style.paddingTop = "";
    element.style.paddingBottom = "";
    setDownloading(false);
  };

  const dataToExport = subscribers?.map((item) => ({
    Date: item?.date
      ? new Date(item?.date).toLocaleDateString("en-US") // Format as mm/dd/yyyy
      : "N/A",
    Name: item?.subscriberName || "N/A",
    PlanName: item?.subscriptionPlan || "N/A",
    Duration:
      item?.interval == "year"
        ? "Yearly"
        : item?.interval == "month" && item?.intervalCount == 6
        ? "BiAnnually"
        : "Monthly",
    SalesPerson: item?.soldBy || "N/A",
    Amount: item?.amount || 0,
  }));

  const dataWidths = [
    { wch: 15 }, // CreatedAt
    { wch: 20 }, // Name
    { wch: 25 }, // SubscriptionPlan
    { wch: 10 }, // Interval
    { wch: 30 }, // Email
    { wch: 10 }, // Price
  ];

  return (
    <div className="bg-white w-full rounded-[18px] py-6 flex flex-col gap-4 items-start mt-6">
      <h1 className="text-[18px] px-6 font-bold">
        Subscription Aquisition Report List
      </h1>
      <div className="w-full flex px-6 flex-wrap justify-between items-center gap-3">
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
            onClick={() =>
              exportToExcel(
                dataToExport,
                "Subscription Acquisition Report",
                dataWidths
              )
            }
            className="bg-black lg:flex hidden text-white  items-center gap-1 justify-center font-medium text-xs w-auto px-3 h-[32px] rounded-full"
          >
            Download
            {downloading && (
              <FaSpinner className="text-white text-md animate-spin" />
            )}
          </button>
        </div>
      </div>

      {subscribersLoading ? (
        <div className="bg-white px-6  w-full rounded-[18px]  flex flex-col gap-6 items-start ">
          <div className="w-full animate-pulse">
            <div className="w-full h-auto modal-scroll hidden lg:flex flex-col mt-4">
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
            className="w-full h-auto px-6 py-4 modal-scroll hidden lg:flex flex-col"
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
