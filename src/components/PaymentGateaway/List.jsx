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

const List = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const ToggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const [data, setData] = useState([]);
  const { baseUrl, navigate, setError } = useContext(GlobalContext);
  const [dataLoading, setDataLoading] = useState(false);

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
            ? `${baseUrl}/dealership/transaction/received?particularDate=${filter?.date}`
            : `${baseUrl}/dealership/transaction/withdraw?particularDate=${filter?.date}`,
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
    const date = new Date(isoString);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };
  const handleDownload = async (elementId, filename) => {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error("Element not found");
      return;
    }
    element.style.backgroundColor = "#fff";
    element.style.padding = "10px";
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(filename);
    element.style.backgroundColor = "#fff";
    element.style.padding = "";
  };

  return (
    <div className="w-full">
      <div className="flex gap-x-10 my-4">
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
      <p className="text-[12px] font-medium text-[#5C5C5C]">
        Total Amount {activeTab == 2 ? "Withdrawn" : "Received"}
      </p>
      <h1 className="text-[32px] font-bold">
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
      <div className="w-full flex items-center justify-between flex-wrap my-4 gap-3">
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
            onClick={() =>
              handleDownload("transaction-history", "TransactionHistory")
            }
            className="text-[12px] font-medium text-white bg-black px-4 py-2 rounded-full"
          >
            Download
          </button>
        </div>
      </div>
      {dataLoading ? (
        <div className="w-full p-4 animate-pulse">
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
          <div className="w-full hidden lg:block">
            {activeTab === 2 ? (
              <div id="transaction-history" className="w-full">
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
              <div id="transaction-history" className="w-full">
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
