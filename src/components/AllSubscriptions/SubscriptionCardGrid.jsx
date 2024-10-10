import React, { useContext } from "react";
import SubscriptionCard from "./SubscriptionCard";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";

const SubscriptionCardGrid = () => {
  const { navigateToLink } = useContext(GlobalContext);
  return (
    <div className="w-full flex justify-center items-center gap-6 flex-wrap">
      <SubscriptionCard />
      <div className="bg-white w-[447px] rounded-[18px] p-8 flex flex-col justify-center items-center text-center gap-6 h-[648px] border-[2px] border-dashed">
        <p className="text-[13px] font-medium">
          Create another subscription plan now and unlock new opportunities to
          delight your customers.
        </p>
        <button
          onClick={() => navigateToLink("/subscription-plans", "Subscription")}
          className="bg-[#FF204E] w-[120px] rounded-lg text-white font-semibold text-base py-3"
        >
          Create Now
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCardGrid;
