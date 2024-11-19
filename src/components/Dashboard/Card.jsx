import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";

const Card = ({ subscriber, loading }) => {
  const formatDateFromISOString = (isoString) => {
    const splittedString = String(isoString).split("T")[0];
    const [year, month, day] = splittedString.split("-");
    const formattedString = `${month}-${day}-${year}`;
    const date = new Date(formattedString);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };
  const { navigateToLink, setTempData } = useContext(GlobalContext);
  return (
    <div
      onClick={() => {
        navigateToLink(`/subscriber-details/${subscriber?._id}`, "Reports");
        setTempData(subscriber);
      }}
      className="w-full cursor-pointer rounded-xl p-4 flex flex-col gap-3 items-start bg-[#F7F7F7]"
    >
      <div className="w-full flex items-center justify-between">
        <p className="text-[11px] text-[#7C7C7C] font-medium">Date</p>
        <p className="text-[11px] font-medium">
          {formatDateFromISOString(subscriber?.createdAt)}
        </p>
      </div>
      <div className="w-full flex items-center justify-between">
        <p className="text-[11px] font-medium">Subscriber Name</p>
        <div className="flex items-center gap-2">
          <img
            src={
              subscriber?.user?.profilePicture
                ? subscriber?.user?.profilePicture
                : "https://t4.ftcdn.net/jpg/05/42/36/11/360_F_542361185_VFRJWpR2FH5OiAEVveWO7oZnfSccZfD3.jpg"
            }
            alt="profile"
            className="w-6 h-6 rounded-full"
          />
          <p className="text-[11px] font-medium">{subscriber?.user?.name}</p>
        </div>
      </div>
      <div className="w-full flex items-center justify-between">
        <p className="text-[11px] font-medium">Contact Information</p>
        <div className="w-auto flex flex-col justify-end items-end">
          <p className="text-[11px]">{subscriber?.user?.email}</p>
          <p className="text-[11px]">{subscriber?.user?.phoneNumber}</p>
        </div>
      </div>
      <div className="w-full flex items-center justify-between">
        <p className="text-[11px] text-[#7C7C7C] font-medium">
          Subscription Plan
        </p>
        <p className="text-[11px] font-medium">
          {subscriber?.subscriptionPlan?.name}
        </p>
      </div>
      <div className="w-full flex items-center justify-between">
        <p className="text-[11px] text-[#7C7C7C] font-medium">Amount</p>
        <p className="text-[11px] font-medium">
          US ${subscriber?.subscriptionPlan?.price}
        </p>
      </div>
      <div className="w-full flex items-center justify-between">
        <p className="text-[11px] text-[#7C7C7C] font-medium">Duration</p>
        <p className="text-[11px] font-medium">
          {subscriber?.subscriptionPlan?.interval === "year"
            ? "Yearly"
            : subscriber?.subscriptionPlan?.interval === "month" &&
              subscriber?.subscriptionPlan?.intervalCount === 6
            ? "BiAnnually"
            : "Monthly"}
        </p>
      </div>
      <div className="w-full flex items-center justify-between">
        <p className="text-[11px] text-[#7C7C7C] font-medium">Status</p>
        <p
          className={`text-[11px] font-medium ${
            subscriber?.status === "paid"
              ? "text-[#01D763] bg-[#F1F1F1] px-3 py-1 rounded-full"
              : "text-[#191919] bg-gray-200 px-3 py-1 rounded-full"
          }`}
        >
          {subscriber?.status === "paid" ? "Active" : "Inactive"}
        </p>
      </div>
      <div className="w-full flex items-center justify-between">
        <p className="text-[11px] text-[#7C7C7C] font-medium">View Details</p>
        <button
          onClick={() =>
            navigateToLink(`/subscriber-details/${subscriber?._id}`, "Reports")
          }
          className="text-[#3DA2FF] text-[11px] font-medium underline"
        >
          View Detail
        </button>
      </div>
    </div>
  );
};

export default Card;
