import React, { useContext, useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import axios from "axios";
import Cookies from "js-cookie";
import { GlobalContext } from "../../context/GlobalContext";

const SubscriptionBoughtCharts = () => {
  const { team, plans, baseUrl, setError } = useContext(GlobalContext);
  const COLORS = [
    "#32ECEC",
    "#FF6680",
    "#FFBB28",
    "#FF8042",
    "#FF664E",
    "#FFAD4E",
  ];

  const [openDropdown1, setOpenDropdown1] = useState(false);
  const [openDropdown2, setOpenDropdown2] = useState(false);
  const [openDropdown3, setOpenDropdown3] = useState(false);
  const [openPlans, setOpenPlans] = useState(false);

  const [selectedPlans, setSelectedPlans] = useState([]);
  const [selectedPersons, setSelectedPersons] = useState([]);
  const [planData, setPlanData] = useState([]);
  const [planDataLoading, setPlanDataLoading] = useState(false);
  const [personData, setPersonData] = useState([]);
  const [personDataLoading, setPersonDataLoading] = useState(false);
  const [filter1, setFilter1] = useState("This Year");
  const [filter2, setFilter2] = useState("This Year");

  const getPersonData = () => {
    const token = Cookies.get("token");
    if (token) {
      const headers = { Authorization: `Bearer ${token}` };
      setPersonDataLoading(true);
      axios
        .post(
          `${baseUrl}/dealership/reports/bought/salesPersonGraph`,
          {
            filter:
              filter2 == "This Year"
                ? "thisYear"
                : filter2 == "Last 7 Days"
                ? "last7Days"
                : filter2 == "This Week"
                ? "weekly"
                : filter2 == "This Month" && "monthly",
            salesPerson: selectedPersons,
          },
          { headers }
        )
        .then((response) => {
          console.log(response?.data?.data);
          setPersonData(response?.data?.data?.data);
          setPersonDataLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPersonDataLoading(false);
        });
    }
  };

  const getPlanData = () => {
    const token = Cookies.get("token");
    if (token) {
      const headers = { Authorization: `Bearer ${token}` };
      setPlanDataLoading(true);
      axios
        .post(
          `${baseUrl}/dealership/reports/bought/subscriptionPlanGraph`,
          {
            filter:
              filter1 == "This Year"
                ? "thisYear"
                : filter1 == "Last 7 Days"
                ? "last7Days"
                : filter1 == "This Week"
                ? "weekly"
                : filter1 == "This Month" && "monthly",
            subscriptionPlan: selectedPlans,
          },
          { headers }
        )
        .then((response) => {
          setPlanData(response?.data?.data);
          setPlanDataLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPlanDataLoading(false);
        });
    }
  };

  const handlePlansChange = (event, plan) => {
    if (event.target.checked) {
      setSelectedPlans((prev) => [...prev, plan]);
    } else {
      setSelectedPlans(selectedPlans.filter((p) => p?._id !== plan?._id));
    }
  };

  useEffect(() => {
    if (selectedPlans.length > 0) getPlanData();
  }, [selectedPlans, filter1]);

  useEffect(() => {
    if (selectedPersons.length > 0) getPersonData();
  }, [selectedPersons, filter2]);

  const handlePersonChange = (event, person) => {
    if (event.target.checked) {
      setSelectedPersons((prev) => [...prev, person]);
    } else {
      setSelectedPersons(selectedPersons.filter((p) => p?._id !== person?._id));
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, count } = payload[0].payload; // Get data for the hovered segment
      return (
        <div style={tooltipStyle}>
          <p style={{ fontWeight: "bold" }}>{name}</p>
          <p>{`Count: ${count}`}</p>
        </div>
      );
    }
    return null;
  };

  const tooltipStyle = {
    backgroundColor: "white",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div className="w-full flex flex-col items-start gap-6">
      <h1 className="font-bold text-[18px]">Subscription Acquisition Report</h1>
      <div className="w-full flex items-center justify-start gap-6 flex-wrap">
        <div className="w-full md:w-[430px] h-[350px] p-6 bg-white rounded-lg flex flex-col items-start gap-4">
          <div className="w-full flex items-start justify-between">
            <div className="flex flex-col gap-4">
              <h2 className="text-xs font-semibold">
                Subscription Plan Distribution
              </h2>
            </div>
            <div className="relative flex items-center gap-1">
              <div className="relative">
                <button
                  className="px-4 py-2 flex items-center justify-center gap-[2px] bg-[#EDEDED] rounded-full text-[11px] font-medium"
                  onClick={() => setOpenPlans(!openPlans)}
                >
                  Plans{" "}
                  {openPlans ? (
                    <IoMdArrowDropdown className="text-base" />
                  ) : (
                    <IoMdArrowDropup className="text-base" />
                  )}
                </button>
                {openPlans && (
                  <div className="bg-white z-[10000] w-[152px] py-1.5 custom-shadow absolute right-1 max-h-[120px] flex flex-col items-start gap-2 overflow-y-scroll modal-scroll">
                    {plans?.map((plan) => (
                      <div
                        key={plan?._id}
                        className="px-3 flex items-center justify-start gap-1 w-full"
                      >
                        <input
                          type="checkbox"
                          checked={selectedPlans.some(
                            (selectedPlan) => selectedPlan._id === plan._id
                          )}
                          onChange={(e) =>
                            handlePlansChange(e, {
                              _id: plan?._id,
                              name: plan?.name,
                            })
                          }
                          className="w-2.5 h-2.5 accent-red-500"
                        />
                        <label className="font-medium text-[11px]">
                          {plan?.name}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  className="w-[86px] py-2 flex items-center justify-center gap-[2px] bg-[#EDEDED] rounded-full text-[11px] font-medium"
                  onClick={() => setOpenDropdown1(!openDropdown1)}
                >
                  {filter1}
                  {openDropdown1 ? (
                    <IoMdArrowDropdown className="text-base" />
                  ) : (
                    <IoMdArrowDropup className="text-base" />
                  )}
                </button>
                {openDropdown1 && (
                  <div className="bg-white w-[92px] z-30 h-auto py-1 custom-shadow absolute flex flex-col items-start">
                    {[
                      "This Year",
                      "Last 7 Days",
                      "This Week",
                      "This Month",
                    ].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => {
                          setFilter1(filter);
                          setOpenDropdown1(false);
                        }}
                        className="font-medium text-[11px] w-full px-3 py-1 text-start hover:bg-gray-100"
                      >
                        {filter.charAt(0).toUpperCase() +
                          filter.slice(1).replace(/([A-Z])/g, " $1")}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          {planDataLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="animate-pulse w-[200px] h-[200px] bg-gray-300 rounded-full"></div>
            </div>
          ) : planData.length < 1 ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-[200px] h-[200px] bg-gray-300 flex items-center justify-center rounded-full">
                <span className="text-sm font-bold text-[#222222]">
                  No Data Available
                </span>
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={planData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {planData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="w-full md:w-[542px] h-[350px] p-6 bg-white rounded-lg flex flex-col items-start gap-4">
          <div className="w-full flex items-start justify-between flex-col md:flex-row gap-5">
            <div className="flex flex-col gap-4">
              <h2 className="text-xs font-semibold">
                Subscription Sold By Sales Persons
              </h2>
            </div>
            <div className="relative flex items-center gap-1">
              <div className="relative">
                <button
                  className="px-4 py-2 flex items-center justify-center gap-[2px] bg-[#EDEDED] rounded-full text-[11px] font-medium"
                  onClick={() => setOpenDropdown3(!openDropdown3)}
                >
                  Sales Person{" "}
                  {openDropdown3 ? (
                    <IoMdArrowDropdown className="text-base" />
                  ) : (
                    <IoMdArrowDropup className="text-base" />
                  )}
                </button>
                {openDropdown3 && (
                  <div className="bg-white z-[10000] w-[152px] py-1.5 custom-shadow absolute right-1 max-h-[120px] flex flex-col items-start gap-2 overflow-y-scroll modal-scroll">
                    {team?.map((member) => (
                      <div
                        key={member?._id}
                        className="px-3 flex items-center justify-start gap-1 w-full"
                      >
                        <input
                          type="checkbox"
                          checked={selectedPersons.some(
                            (selectedPerson) =>
                              selectedPerson._id === member._id
                          )}
                          onChange={(e) =>
                            handlePersonChange(e, {
                              _id: member?._id,
                              name: member?.name,
                            })
                          }
                          className="w-2.5 h-2.5 accent-red-500"
                        />
                        <label className="font-medium text-[11px]">
                          {member?.name}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  className="w-[86px] py-2  z-30 flex items-center justify-center gap-[2px] bg-[#EDEDED] rounded-full text-[11px] font-medium"
                  onClick={() => setOpenDropdown2(!openDropdown2)}
                >
                  {filter2}
                  {openDropdown2 ? (
                    <IoMdArrowDropdown className="text-base" />
                  ) : (
                    <IoMdArrowDropup className="text-base" />
                  )}
                </button>
                {openDropdown2 && (
                  <div className="bg-white w-[92px] h-auto py-1 z-30 custom-shadow absolute flex flex-col items-start">
                    {[
                      "This Year",
                      "Last 7 Days",
                      "This Week",
                      "This Month",
                    ].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => {
                          setFilter2(filter);
                          setOpenDropdown2(false);
                        }}
                        className="font-medium text-[11px] w-full px-3 py-1 text-start hover:bg-gray-100"
                      >
                        {filter.charAt(0).toUpperCase() +
                          filter.slice(1).replace(/([A-Z])/g, " $1")}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          {personDataLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="animate-pulse w-[200px] h-[200px] bg-gray-300 rounded-full"></div>
            </div>
          ) : personData.length < 1 ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-[200px] h-[200px] bg-gray-300 flex items-center justify-center rounded-full">
                <span className="text-sm font-bold text-[#222222]">
                  No Data Available
                </span>
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={personData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {personData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionBoughtCharts;
