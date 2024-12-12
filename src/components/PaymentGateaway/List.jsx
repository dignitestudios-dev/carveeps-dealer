import React, { useState, useEffect, useContext } from "react";
import { LuCalendarDays } from "react-icons/lu";
import { Link } from "react-router-dom";
import DateModal from "../Global/DateModal";
import Cookies from "js-cookie";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";
import { NoData } from "../../assets/export";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FaSpinner } from "react-icons/fa";
import exportToExcel from "../../utils/dataExport";

const List = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const ToggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const [data, setData] = useState([]);
  const { baseUrl, navigate, setError } = useContext(GlobalContext);
  const [dataLoading, setDataLoading] = useState(false);
  function convertToDateFormat(date) {
    // Extract the day, month, and year
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();

    // Combine into dd-mm-yyyy format
    return `${day}-${month}-${year}`;
  }
  const getData = () => {
    const token = Cookies.get("token");

    if (token) {
      setDataLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(
          activeTab == 1 && filter?.date == null
            ? `${baseUrl}/dealership/transaction/received?filter=${filter?.filter}`
            : activeTab !== 1 && filter?.date == null
            ? `${baseUrl}/dealership/transaction/withdraw?filter=${filter?.filter}`
            : activeTab == 1 && filter?.date !== null
            ? `${baseUrl}/dealership/transaction/received?particularDate=${convertToDateFormat(
                filter?.date
              )}`
            : `${baseUrl}/dealership/transaction/withdraw?particularDate=${convertToDateFormat(
                filter?.date
              )}`,
          {
            headers,
          }
        )
        .then(
          (response) => {
            setData(response?.data?.data);
            setDataLoading(false);
          },
          (error) => {
            setDataLoading(false);
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
    getData();
  }, [activeTab, filter]);

  const formatDateFromISOString = (isoString) => {
    if (isoString == null) return "N/A";
    const splittedString = String(isoString).split("T")[0];
    const [year, month, day] = splittedString.split("-");
    const formattedString = `${month}-${day}-${year}`;
    const date = new Date(formattedString);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
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

  const dataToExport = data?.transactions?.map(
    activeTab == 2
      ? (item) => ({
          Date: item?.createdAt
            ? new Date(item?.createdAt).toLocaleDateString("en-US") // Format as mm/dd/yyyy
            : "N/A",
          TransactionID: item?.transactionId || "N/A",

          Amount: item?.price || 0,
        })
      : (item) => ({
          Date: item?.date
            ? new Date(item?.date).toLocaleDateString("en-US") // Format as mm/dd/yyyy
            : "N/A",
          Name: item?.user?.name || "N/A",
          PlanName: item?.subscriptionPlan?.name || "N/A",
          Duration:
            item?.subscriptionPlan?.interval == "year"
              ? "Yearly"
              : item?.subscriptionPlan?.interval == "month" &&
                item?.subscriptionPlan?.intervalCount == 6
              ? "BiAnnually"
              : "Monthly",
          Amount: item?.subscriptionPlan?.price || 0,
        })
  );

  const dataWidths =
    activeTab == 2
      ? [
          { wch: 15 }, // CreatedAt
          { wch: 35 }, // Transaction ID
          { wch: 10 }, // Price
        ]
      : [
          { wch: 15 }, // CreatedAt
          { wch: 20 }, // Name
          { wch: 25 }, // SubscriptionPlan
          { wch: 10 }, // Interval
          { wch: 10 }, // Price
        ];

  return (
    <div className="w-full ">
      <div className="flex gap-x-10 px-6 my-4">
        <button
          onClick={() => setActiveTab(1)}
          className={`text-[13px] font-semibold ${
            activeTab === 1
              ? "text-[#FF204E] border-b-2 border-[#FF204E]"
              : "text-[#0F0F0F]"
          }`}
        >
          Received
        </button>
        <button
          onClick={() => setActiveTab(2)}
          className={`text-[13px] font-semibold ${
            activeTab === 2
              ? "text-[#FF204E] border-b-2 border-[#FF204E]"
              : "text-[#0F0F0F]"
          }`}
        >
          Withdrawn
        </button>
      </div>
      <p className="text-[12px] px-6 font-medium text-[#5C5C5C]">
        Total Amount {activeTab == 2 ? "Withdrawn" : "Received"}
      </p>
      <h1 className="text-[32px] font-bold px-6">
        {dataLoading ? (
          <>
            {/* Total Amount Loader */}
            <h1 className="text-[32px] font-bold bg-gray-200 h-10 w-32 rounded-full"></h1>
          </>
        ) : activeTab == 1 ? (
          "$" + data?.totalRevenue?.toFixed(2)
        ) : (
          "$" + data?.totalWithdrawn?.toFixed(2)
        )}
      </h1>
      <div className="w-full px-6 flex items-center justify-between flex-wrap my-4 gap-3">
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
        <div className="flex items-center justify-end gap-3">
          <button
            className="text-[12px] font-medium text-black bg-[#EDEDED] px-4 py-2 rounded-full flex items-center justify-center gap-1"
            onClick={ToggleIsOpen}
          >
            <LuCalendarDays /> Select Date
          </button>
          <DateModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setFilter={setFilter}
          />
          <button
            disabled={dataLoading}
            onClick={() =>
              exportToExcel(
                dataToExport,
                activeTab == 2 ? "Withdrawal History" : "Transaction History",
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
      {dataLoading ? (
        <div className="w-full p-4 px-6 animate-pulse">
          {/* Transactions Table Loader (Desktop) */}
          <div className="w-full hidden lg:block">
            <div className="w-full grid grid-cols-4 py-4 mb-2">
              <div className="bg-gray-200 h-4 w-24 rounded-full"></div>
              <div className="bg-gray-200 h-4 w-32 rounded-full"></div>
              <div className="bg-gray-200 h-4 w-24 rounded-full"></div>
            </div>
            <div className="w-full grid grid-cols-4 py-4 border-t border-b mb-2">
              <div className="bg-gray-200 h-4 w-24 rounded-full"></div>
              <div className="bg-gray-200 h-4 w-32 rounded-full"></div>
              <div className="bg-gray-200 h-4 w-24 rounded-full"></div>
            </div>
          </div>

          {/* Transactions List Loader (Mobile) */}
          <div className="flex flex-col lg:hidden gap-6">
            <div className="w-full flex flex-col gap-3 p-4 rounded-xl bg-[#EDEDED] animate-pulse">
              <div className="w-full flex items-start justify-between">
                <div className="bg-gray-200 h-4 w-24 rounded-full"></div>
                <div className="bg-gray-200 h-4 w-24 rounded-full"></div>
              </div>
              <div className="w-full flex items-start justify-between">
                <div className="bg-gray-200 h-4 w-24 rounded-full"></div>
                <div className="bg-gray-200 h-4 w-24 rounded-full"></div>
              </div>
              <div className="w-full flex items-start justify-between">
                <div className="bg-gray-200 h-4 w-24 rounded-full"></div>
                <div className="bg-gray-200 h-4 w-24 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="w-full hidden lg:block ">
            {activeTab === 2 ? (
              <div id="transaction-history" className="w-full p-6 ">
                <div className="w-full grid grid-cols-4 p-4">
                  <div>
                    <p className="text-[11px] font-medium text-[#7C7C7C]">
                      Date
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-[#7C7C7C]">
                      Transaction ID
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-[#7C7C7C]">
                      Amount
                    </p>
                  </div>
                </div>
                {data?.transactions?.length == 0 ? (
                  <div className="w-full bg-white rounded-b-[18px] flex items-center justify-center">
                    <img src={NoData} alt="" className="w-96 my-10" />
                  </div>
                ) : (
                  data?.transactions?.map((item, key) => {
                    return (
                      <div
                        key={key}
                        className="w-full grid grid-cols-4 py-4 border-t border-b"
                      >
                        <div>
                          <p className="text-[11px] font-medium">
                            {formatDateFromISOString(item?.createdAt)}
                          </p>
                        </div>
                        <div>
                          <p className="text-[11px] font-medium">
                            {item?.transactionId}
                          </p>
                        </div>

                        <div>
                          <p className="text-[11px] font-medium">
                            USD ${item?.price}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            ) : (
              <div id="transaction-history" className="w-full p-6">
                <div className="w-full grid grid-cols-6 py-4">
                  <div>
                    <p className="text-[11px] font-medium text-[#7C7C7C]">
                      Date
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-[#7C7C7C]">
                      Subscriber Name
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-[#7C7C7C]">
                      Subscription Plan
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-[#7C7C7C]">
                      Duration
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-[#7C7C7C]">
                      Amount
                    </p>
                  </div>
                </div>
                {data?.transactions?.length == 0 ? (
                  <div className="w-full bg-white rounded-b-[18px] flex items-center justify-center">
                    <img src={NoData} alt="" className="w-96 my-10" />
                  </div>
                ) : (
                  data?.transactions?.map((item, key) => {
                    return (
                      <div
                        key={key}
                        className="w-full grid grid-cols-6 py-4 border-t border-b"
                      >
                        <div>
                          <p className="text-[11px] font-medium">
                            {formatDateFromISOString(item?.date)}
                          </p>
                        </div>
                        <div>
                          <Link
                            to={`/subscriber-details/${item?._id}`}
                            className="text-[11px] font-medium text-black hover:text-black"
                          >
                            {item?.user?.name}
                          </Link>
                        </div>
                        <div>
                          <p className="text-[11px] font-medium">
                            {item?.subscriptionPlan?.name}
                          </p>
                        </div>
                        <div>
                          <p className="text-[11px] font-medium">
                            {item?.subscriptionPlan?.interval == "year"
                              ? "Yearly"
                              : item?.subscriptionPlan?.interval == "month" &&
                                item?.subscriptionPlan?.intervalCount == 6
                              ? "BiAnnually"
                              : "Monthly"}
                          </p>
                        </div>
                        <div>
                          <p className="text-[11px] font-medium">
                            USD ${item?.revenue}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col lg:hidden gap-6">
            {activeTab === 2 ? (
              <>
                {data?.transactions?.map((item, key) => {
                  return (
                    <div
                      key={key}
                      className="w-full flex flex-col gap-3 p-4 rounded-xl bg-[#EDEDED]"
                    >
                      <div className="w-full flex items-start justify-between">
                        <p className="text-xs font-medium text-[#7C7C7C]">
                          Date
                        </p>
                        <p className="text-xs font-medium">
                          {formatDateFromISOString(item?.createdAt)}
                        </p>
                      </div>
                      <div className="w-full flex items-start justify-between">
                        <p className="text-xs font-medium text-[#7C7C7C]">
                          Transaction ID
                        </p>
                        <p className="text-xs font-medium">
                          {item?.transactionId}
                        </p>
                      </div>

                      <div className="w-full flex items-start justify-between">
                        <p className="text-xs font-medium text-[#7C7C7C]">
                          Amount
                        </p>
                        <p className="text-xs font-medium">
                          USD ${item?.price}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                {data?.transactions?.map((item, key) => {
                  return (
                    <Link
                      to={`/subscriber-details/${item?._id}`}
                      key={key}
                      className="w-full flex flex-col gap-3 p-4 rounded-xl bg-[#EDEDED]"
                    >
                      <div className="w-full flex items-start justify-between">
                        <p className="text-xs font-medium text-[#7C7C7C]">
                          Date
                        </p>
                        <p className="text-xs font-medium">
                          {formatDateFromISOString(item?.date)}
                        </p>
                      </div>
                      <div className="w-full flex items-start justify-between">
                        <p className="text-xs font-medium text-[#7C7C7C]">
                          Subscriber Name
                        </p>
                        <p className="text-xs font-medium">
                          <Link
                            to={`/subscriber-details/${item?._id}`}
                            className="text-[11px] font-medium"
                          >
                            {item?.user?.name}
                          </Link>
                        </p>
                      </div>
                      <div className="w-full flex items-start justify-between">
                        <p className="text-xs font-medium text-[#7C7C7C]">
                          Subscription Plan
                        </p>
                        <p className="text-xs font-medium">
                          {item?.subscriptionPlan?.name}
                        </p>
                      </div>
                      <div className="w-full flex items-start justify-between">
                        <p className="text-xs font-medium text-[#7C7C7C]">
                          Duration
                        </p>
                        <p className="text-xs font-medium">
                          {item?.subscriptionPlan?.interval == "year"
                            ? "Yearly"
                            : item?.subscriptionPlan?.interval == "month" &&
                              item?.subscriptionPlan?.intervalCount == 6
                            ? "BiAnnually"
                            : "Monthly"}
                        </p>
                      </div>
                      <div className="w-full flex items-start justify-between">
                        <p className="text-xs font-medium text-[#7C7C7C]">
                          Amount
                        </p>
                        <p className="text-xs font-medium">
                          USD ${item?.revenue}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default List;
