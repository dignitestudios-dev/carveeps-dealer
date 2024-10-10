import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useContext, useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import Cookies from "js-cookie";
import axios from "axios";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { GlobalContext } from "../../context/GlobalContext";

// Register necessary components
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Chart options
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return context.dataset.label + ": " + context.raw;
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: true,
      },
      ticks: {
        display: true,
      },
      border: {
        display: false,
      },
    },
  },
};

function getMonthsArray() {
  const monthsArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return monthsArray;
}

function getRandomDataArray() {
  // Generate an array with random data for 12 months
  const randomDataArray = Array.from(
    { length: 12 },
    () => Math.floor(Math.random() * 100) + 1
  );

  return randomDataArray;
}

const DashboardGraph = () => {
  const [showOpt3, setShowOpt3] = useState(false);
  const [showOpt4, setShowOpt4] = useState(false);

  const handlePersonChange = (event, personId) => {
    if (event.target.checked) {
      if (selectedPersons?.length < 2) {
        // Add plan ID to the array
        setSelectedPersons([...selectedPersons, personId]);
      } else {
        // Prevent selecting more than two plans
        event.preventDefault();

        setError("You can only select up to two salesperson.");
      }
    } else {
      // Remove plan ID from the array
      setSelectedPersons(selectedPersons.filter((id) => id !== personId));
    }
  };
  const [openDropdown2, setOpenDropdown2] = useState(false);
  const [openDropdown3, setOpenDropdown3] = useState(false);
  const toggleDropdown2 = () => {
    setOpenDropdown2(!openDropdown2);
  };

  const toggleDropdown3 = () => {
    setOpenDropdown3(!openDropdown3);
  };

  const [filter2, setFilter2] = useState("yearly");

  const { team, setError, baseUrl, setNewUpdate } = useContext(GlobalContext);
  const [selectedPersons, setSelectedPersons] = useState(
    team?.length > 0 ? [team[0]?._id] : []
  );

  const [personData, setPersonData] = useState([]);
  const [personDataLoading, setPersonDataLoading] = useState(false);

  const getPersonData = () => {
    const token = Cookies.get("token");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      setPersonDataLoading(true);
      axios
        .post(
          `${baseUrl}/dealership/dashboard/graph`,
          {
            salesPersons: selectedPersons,
            filter: filter2,
          },
          { headers }
        )
        .then((response) => {
          setPersonData(response?.data?.data);
          setPersonDataLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPersonDataLoading(false);
        });
    }
  };

  useEffect(() => {
    selectedPersons?.length > 0 && getPersonData();
  }, [selectedPersons, filter2]);

  useEffect(() => {
    setNewUpdate((prev) => !prev);
  }, []);

  // Sample data
  const data = {
    labels: personData?.labels,

    datasets:
      personData?.datasets?.length > 1
        ? [
            {
              label: personData?.datasets[0]?.label,
              data: personData?.datasets[0]?.data,
              backgroundColor: "#FF204E",
              borderColor: "#FF204E",
              borderWidth: 1,
              borderRadius: { topLeft: 50, topRight: 50 },
              borderSkipped: "bottom",
            },
            {
              label: personData?.datasets[1]?.label,
              data: personData?.datasets[1]?.data,
              backgroundColor: "#007BFF",
              borderColor: "#007BFF",
              borderWidth: 1,
              borderRadius: { topLeft: 50, topRight: 50 },
              borderSkipped: "bottom",
            },
          ]
        : personData?.datasets?.length > 0
        ? [
            {
              label: personData?.datasets[0]?.label,
              data: personData?.datasets[0]?.data,
              backgroundColor: "#FF204E",
              borderColor: "#FF204E",
              borderWidth: 1,
              borderRadius: { topLeft: 50, topRight: 50 },
              borderSkipped: "bottom",
            },
          ]
        : [],
  };
  return (
    <div className="bg-white p-6 mt-4 rounded-[18px] flex flex-col gap-y-6">
      <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <h1 className="text-base font-bold">Subscription Trends</h1>
        <div className="relative flex gap-2">
          <div className="relative z-[1000]">
            <button
              className="w-[144px]  py-2 flex items-center justify-center gap-[2px] bg-[#EDEDED] rounded-full text-[11px] font-medium"
              onClick={toggleDropdown3}
            >
              Select Salesperson{" "}
              {openDropdown3 ? (
                <IoMdArrowDropdown className="text-base" />
              ) : (
                <IoMdArrowDropup className="text-base" />
              )}
            </button>
            {openDropdown3 && (
              <div className="bg-white w-[164px] max-h-[200px] overflow-y-scroll modal-scroll custom-shadow absolute flex flex-col items-start gap-3 px-3 py-2">
                {team?.map((person, key) => {
                  return (
                    <div key={person?._id} class="flex items-center px-2">
                      <input
                        id="checked-checkbox"
                        checked={selectedPersons?.includes(person?._id)}
                        type="checkbox"
                        onChange={(e) => handlePersonChange(e, person?._id)}
                        className="w-3 h-3 text-[#FF204E] rounded dark:focus:[#FF204E] accent-[#FF204E]"
                      />
                      <label
                        for="checked-checkbox"
                        class="ms-2 font-medium text-[11px] text-gray-900 dark:text-gray-300"
                      >
                        {person?.name}
                      </label>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div>
            <button
              className="w-[86px] z-[100000000] py-2 flex items-center capitalize justify-center gap-[2px] bg-[#EDEDED] rounded-full text-[11px] font-medium"
              onClick={toggleDropdown2}
            >
              {filter2 == "thisYear"
                ? "This Year"
                : filter2 == "last7Days"
                ? "Last 7 days"
                : filter2}
              {openDropdown2 ? (
                <IoMdArrowDropdown className="text-base" />
              ) : (
                <IoMdArrowDropup className="text-base" />
              )}
            </button>
            {openDropdown2 && (
              <div className="bg-white w-[92px] h-auto py-1 custom-shadow absolute flex flex-col items-start">
                {/* <button
                  onClick={() => {
                    toggleDropdown2();
                    setFilter2("thisYear");
                  }}
                  className="font-medium text-[11px] w-full px-3 py-1 text-start hover:bg-gray-100"
                >
                  This Year
                </button> */}
                <button
                  onClick={() => {
                    toggleDropdown2();
                    setFilter2("last7Days");
                  }}
                  className="font-medium text-[11px] w-full px-3 py-1 text-start hover:bg-gray-100"
                >
                  Last 7 days
                </button>
                <button
                  onClick={() => {
                    toggleDropdown2();
                    setFilter2("weekly");
                  }}
                  className="font-medium text-[11px] w-full px-3 py-1 text-start hover:bg-gray-100"
                >
                  Weekly
                </button>
                <button
                  onClick={() => {
                    toggleDropdown2();
                    setFilter2("monthly");
                  }}
                  className="font-medium text-[11px] w-full px-3 py-1 text-start hover:bg-gray-100"
                >
                  Monthly
                </button>
                <button
                  onClick={() => {
                    toggleDropdown2();
                    setFilter2("yearly");
                  }}
                  className="font-medium text-[11px] w-full px-3 py-1 text-start hover:bg-gray-100"
                >
                  Yearly
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col justify-start items-start gap-2 col-span-3 h-full p-4">
        <div className="h-full w-full flex justify-center items-center">
          {personDataLoading ? (
            <div className="w-full h-[400px] bg-gray-100 rounded-lg animate-pulse"></div>
          ) : (
            <Bar data={data} options={options} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardGraph;
