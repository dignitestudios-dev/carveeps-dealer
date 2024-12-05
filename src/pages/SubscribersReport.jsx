import React, {
  useContext,
  useEffect,
  useState,
  useDeferredValue,
  useMemo,
} from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import List from "../components/Dashboard/List";
import { RxCalendar } from "react-icons/rx";
import { FiSearch } from "react-icons/fi";
import DateModal from "../components/Global/DateModal";
import Card from "../components/Dashboard/Card";
import { GlobalContext } from "../context/GlobalContext";
import Cookies from "js-cookie";
import axios from "axios";
import CardLoader from "../components/Dashboard/CardLoader";
import { NoData } from "../assets/export";
import InfiniteScroll from "react-infinite-scroll-component";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FaSpinner } from "react-icons/fa";

const SubscribersReport = () => {
  const handleToggleDropdown = () => {
    setShowDropdown(!showDropDown);
  };

  const handleToggleDropdown2 = () => {
    setShowDropdown2(!showDropDown2);
  };
  const [showDropDown, setShowDropdown] = useState(false);
  const [showDropDown2, setShowDropdown2] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState({
    date: null,
    filter: "all",
  });
  const [search, setSearch] = useState("");
  const [subscribers, setSubscribers] = useState([]);
  const { baseUrl, navigate, setError, plans } = useContext(GlobalContext);
  const [subscribersLoading, setSubscribersLoading] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(search);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const [planFilter, setPlanFilter] = useState(null);

  const [type, setType] = useState(null);
  function convertToDateFormat(date) {
    // Extract the day, month, and year
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();

    // Combine into dd-mm-yyyy format
    return `${day}-${month}-${year}`;
  }

  const getSubscribersReport = () => {
    const token = Cookies.get("token");

    if (token) {
      setSubscribersLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(
          filter?.date == null
            ? planFilter !== null && type !== null
              ? `${baseUrl}/dealership/reports/subscriber?from=0&filter=${filter?.filter}&subscriptionPlan=${planFilter}&type=${type}`
              : planFilter !== null
              ? `${baseUrl}/dealership/reports/subscriber?from=0&filter=${filter?.filter}&subscriptionPlan=${planFilter}`
              : type !== null
              ? `${baseUrl}/dealership/reports/subscriber?from=0&filter=${filter?.filter}&type=${type}`
              : `${baseUrl}/dealership/reports/subscriber?from=0&filter=${filter?.filter}`
            : `${baseUrl}/dealership/reports/subscriber?from=0&particularDate=${convertToDateFormat(
                filter?.date
              )}`,
          {
            headers,
          }
        )
        .then(
          (response) => {
            setSubscribers(response?.data?.data ? response?.data?.data : []);
            setSubscribersLoading(false);
          },
          (error) => {
            setSubscribersLoading(false);
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

  useEffect(() => {
    getSubscribersReport();
  }, [filter, planFilter, type]);

  const filteredData = subscribers?.filter(
    (person) =>
      person?.user?.name
        ?.toLowerCase()
        .includes(debouncedValue.toLowerCase()) ||
      person?.user?.email
        ?.toLowerCase()
        .includes(debouncedValue.toLowerCase()) ||
      person?.user?.vehicle?.vin
        ?.toLowerCase()
        .includes(debouncedValue.toLowerCase())
  );

  const fetchNewData = (length) => {
    setCurrentPage(subscribers?.length);
  };

  useEffect(() => {
    if (currentPage > 0) {
      getSubscribersReport(currentPage);
    }
  }, [currentPage]);

  const arr = [1, 2, 3, 4, 5, 6];

  const ToggleIsOpen = () => {
    setIsOpen((prev) => !prev);
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
  return (
    <div className="w-full bg-white  flex flex-col gap-y-4 rounded-[18px] ">
      <div className="bg-white p-6 rounded-[18px] flex flex-col gap-y-6">
        <h1 className="text-[18px] font-bold">Subscribers Report</h1>
        <div className="w-[285px] md:w-[295px] h-[32px] bg-[#EDEDED] rounded-lg px-4 flex items-center justify-start">
          <FiSearch className="w-3.5 h-3.5 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search here"
            className="text-sm font-medium bg-transparent px-2 w-full outline-none"
          />
        </div>
        <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
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
              className="bg-[#EDEDED] text-black font-medium text-xs w-[108px] h-[32px] rounded-full flex items-center justify-center gap-1"
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
              onClick={() => handleDownload("subscriber-report", "Report")}
              className="bg-black lg:flex hidden text-white  items-center gap-1 justify-center font-medium text-xs w-auto px-3 h-[32px] rounded-full"
            >
              Download
              {downloading && (
                <FaSpinner className="text-white text-md animate-spin" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div
        id="subscriber-report"
        className="w-full h-auto px-6 flex flex-col justify-start items-start"
      >
        <div className="w-full hidden lg:grid grid-cols-12 gap-4 py-4 border-b">
          <div>
            <p className="text-xs font-medium text-[#7C7C7C]">
              Subscription Date
            </p>
          </div>
          <div className="col-span-2">
            <p className="text-xs font-medium text-[#7C7C7C]">
              Subscriber Info
            </p>
          </div>
          <div className="col-span-3">
            <p className="text-xs font-medium text-[#7C7C7C] text-center">
              VIN
            </p>
          </div>
          <div className="relative col-span-2 ">
            <button
              className="text-xs font-medium text-[#7C7C7C] flex items-center justify-end gap-1"
              onClick={handleToggleDropdown}
            >
              Subscription Plan{" "}
              {showDropDown ? (
                <TiArrowSortedDown className="text-base pdf-exclude" />
              ) : (
                <TiArrowSortedUp className="text-base pdf-exclude" />
              )}
            </button>
            {showDropDown && (
              <div className="bg-white custom-shadow py-2 absolute">
                {plans?.map((plan) => {
                  return (
                    <button
                      key={plan?._id}
                      onClick={() => {
                        setPlanFilter(plan?._id);
                        handleToggleDropdown();
                      }}
                      className="text-[11px] w-full py-1 hover:bg-gray-100 px-3 text-start"
                    >
                      {plan?.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          <div className="text-center">
            <p className="text-xs font-medium text-[#7C7C7C] text-center">
              Amount
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-[#7C7C7C]">Duration</p>
          </div>
          <div className="relative">
            <button
              className="text-xs font-medium text-[#7C7C7C] flex items-center gap-1"
              onClick={handleToggleDropdown2}
            >
              Subscriber Type{" "}
              {showDropDown2 ? (
                <TiArrowSortedDown className="text-base pdf-exclude" />
              ) : (
                <TiArrowSortedUp className="text-base pdf-exclude" />
              )}
            </button>
            {showDropDown2 && (
              <div className="bg-white custom-shadow py-2 absolute flex flex-col w-24">
                <button
                  onClick={() => {
                    setType("active");
                    handleToggleDropdown2();
                  }}
                  className="text-[11px] py-1 hover:bg-gray-100 px-3 text-start"
                >
                  Active
                </button>
                <button
                  onClick={() => {
                    setType("inactive");
                    handleToggleDropdown2();
                  }}
                  className="text-[11px] py-1 hover:bg-gray-100 px-3 text-start"
                >
                  Inactive
                </button>
              </div>
            )}
          </div>
          <div>
            <p className="text-xs font-medium text-[#7C7C7C]"></p>
          </div>
        </div>
        <>
          <div id="scrollableDiv" className="w-full hidden lg:flex lg:flex-col">
            {subscribersLoading ? (
              arr?.map((item) => {
                return (
                  <div
                    key={item}
                    className="w-full grid grid-cols-9 gap-8 py-4 border-b animate-pulse"
                  >
                    <div className="flex items-center">
                      <div className="h-3 bg-gray-300 rounded w-16"></div>
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                      <div className="flex flex-col gap-1">
                        <div className="h-3 bg-gray-300 rounded w-24"></div>
                        <div className="h-3 bg-gray-300 rounded w-32"></div>
                        <div className="h-3 bg-gray-300 rounded w-20"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-end">
                      <div className="h-3 bg-gray-300 rounded w-24"></div>
                    </div>
                    <div className="flex items-center justify-end">
                      <div className="h-3 bg-gray-300 rounded w-24"></div>
                    </div>
                    <div className="flex items-center justify-center px-2">
                      <div className="h-3 bg-gray-300 rounded w-12"></div>
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 bg-gray-300 rounded w-20"></div>
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 bg-gray-300 rounded w-16"></div>
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 bg-gray-300 rounded w-20"></div>
                    </div>
                  </div>
                );
              })
            ) : filteredData.length < 1 ? (
              <div className="w-full flex items-center justify-center">
                <img src={NoData} alt="" className="w-96 my-10" />
              </div>
            ) : (
              <>
                {filteredData?.map((subscriber) => (
                  <List key={subscriber?.id} subscriber={subscriber} />
                ))}
              </>
            )}
          </div>
        </>
      </div>

      <div id="scrollableDiv2" className="w-full flex lg:hidden flex-col gap-4">
        {subscribersLoading ? (
          <CardLoader />
        ) : filteredData.length < 1 ? (
          <div className="w-full flex items-center justify-center">
            <img src={NoData} alt="" className="w-96 my-10" />
          </div>
        ) : (
          <>
            {filteredData.map((subscriber) => (
              <Card key={subscriber.id} subscriber={subscriber} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default SubscribersReport;
