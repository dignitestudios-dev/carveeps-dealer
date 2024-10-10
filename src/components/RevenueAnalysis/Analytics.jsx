import React, { useState } from "react";
import { DIcon1, DIcon2, DIcon3 } from "../../assets/export";
import { TiArrowSortedUp } from "react-icons/ti";
import { styles } from "../../styles/styles";
import { RxCalendar } from "react-icons/rx";
import AnalyticsLoader from "./AnalyticsLoader";

const Analytics = ({ revenue, loading }) => {
  const [showOpt, setShowOpt] = useState(false);
  const [showOpt2, setShowOpt2] = useState(false);
  const [showOpt3, setShowOpt3] = useState(false);

  return (
    <div className="bg-white p-6 rounded-t-[18px] flex flex-col gap-y-4">
      <h1 className="text-[18px] font-bold">Subscription Revenue Analysis</h1>
      {loading ? (
        <AnalyticsLoader />
      ) : (
        <div className="w-full flex items-center flex-col lg:flex-row gap-6">
          <div className="bg-white rounded-3xl p-4 w-[307px] h-[90px] flex items-center justify-start gap-4 custom-shadow">
            <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center">
              <img src={DIcon1} alt="" />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-bold">
                {revenue?.activeSubscription}
              </h1>
              <p className="text-xs text-[#5C5C5C] font-medium">
                Active Subscription
              </p>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-4 w-[307px] h-[90px] flex items-center justify-start gap-4 custom-shadow">
            <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center">
              <img src={DIcon2} alt="" />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-bold">{revenue?.totalRenewals}</h1>
              <p className="text-xs text-[#5C5C5C] font-medium">
                Total Renewals
              </p>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-4 w-[307px] h-[90px] flex items-center justify-start gap-4 custom-shadow">
            <div className="w-16 h-16 bg-[#FF00FF14] rounded-3xl flex items-center justify-center">
              <img src={DIcon3} alt="" />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-bold">{revenue?.totalRevenue}</h1>
              <p className="text-xs text-[#5C5C5C] font-medium">
                Total Revenue
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
