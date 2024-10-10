import React, { useContext, useState } from "react";
import Header from "../components/Subscription/Header";
import { Link } from "react-router-dom";
import NoteToUser from "../components/SubscriptionPlans/NoteToUser";
import SubscriptionCardGrid from "../components/AllSubscriptions/SubscriptionCardGrid";
import { GlobalContext } from "../context/GlobalContext";

const Subscription = () => {
  const [cards, setCards] = useState([]);
  const { navigate } = useContext(GlobalContext);
  return (
    <div className={`${cards.length > 0 ? "h-auto" : "h-screen"}`}>
      <Header />
      {cards.length > 0 ? (
        <>
          <NoteToUser />
          <SubscriptionCardGrid />
        </>
      ) : (
        <div className="lg:pt-20 flex flex-col items-center gap-6">
          <p className="text-base font-medium text-[#5C5C5C] text-center mx-auto">
            It seems like you haven't created any subscription plans yet. Don't
            miss out on this opportunity to expand <br /> your offerings and
            attract more customers. Create a subscription plan today and watch
            your sales soar! <br />
            Click here to get started.
          </p>
          <button
            onClick={() => navigate("/create-subscription-plan")}
            className="w-[215px] text-center py-4 px-2 block rounded-[8px] text-white font-semibold text-sm bg-[#FF204E]"
          >
            Create Subscription Plan
          </button>
        </div>
      )}
    </div>
  );
};

export default Subscription;
