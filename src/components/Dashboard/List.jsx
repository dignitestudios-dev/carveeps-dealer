import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import Cookies from "js-cookie";

const List = ({ subscriber, loading }) => {
  const formatDateFromISOString = (isoString) => {
    if (isoString == null) return "N/A";
    const splittedString = String(isoString).split("T")[0];
    const [year, month, day] = splittedString.split("-");
    const formattedString = `${month}-${day}-${year}`;
    const date = new Date(formattedString);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };
  const { navigate, setTempData } = useContext(GlobalContext);
  return (
    <div className="w-full grid grid-cols-12 gap-8 py-4 border-b">
      <div className="flex items-center">
        <p className="text-xs font-medium">
          {formatDateFromISOString(subscriber?.createdAt)}
        </p>
      </div>
      <div className="col-span-2 ">
        <p className="text-xs  justify-start items-start flex-col font-medium flex  gap-2">
          <div className="w-auto flex gap-1 justify-start items-start">
            <img
              src={
                subscriber?.user?.profilePicture
                  ? subscriber?.user?.profilePicture
                  : "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg"
              }
              alt="profile"
              className="w-6 h-6 rounded-full"
            />{" "}
            <p className="text-xs font-medium flex flex-col items-start">
              {subscriber?.user?.name}
              <p className="text-xs font-medium flex flex-col items-start ">
                <span>{subscriber?.user?.email}</span>
                <span>{subscriber?.user?.phoneNumber}</span>
              </p>
            </p>
          </div>
        </p>
      </div>
      <div className="flex items-center justify-center col-span-3">
        <p className="text-xs font-medium">{subscriber?.user?.vehicle?.vin}</p>
      </div>
      <div className="flex col-span-2 items-center justify-start">
        <p className="text-xs font-medium flex items-center gap-2">
          {subscriber?.subscriptionPlan?.name}
        </p>
      </div>
      <div className="flex items-center justify-center px-2">
        <p className="text-xs font-medium">
          ${subscriber?.subscriptionPlan?.price}
        </p>
      </div>
      <div className="flex items-center">
        <p className="text-xs font-medium">
          {subscriber?.subscriptionPlan?.interval == "year"
            ? "Yearly"
            : subscriber?.subscriptionPlan?.interval == "month" &&
              subscriber?.subscriptionPlan?.intervalCount == 6
            ? "BiAnnually"
            : "Monthly"}
        </p>
      </div>
      <div className="flex items-center">
        <p
          className={`text-xs font-medium flex items-center gap-2 ${
            subscriber?.status === "paid"
              ? "text-[#01D763]  rounded-full"
              : "text-[#fb3838]  rounded-full"
          }`}
        >
          {subscriber?.status == "paid" ? "Active" : "Inactive"}
        </p>
      </div>
      <div className="flex pdf-exclude items-center">
        <button
          onClick={() => {
            navigate(`/subscriber-details/${subscriber?._id}`);
            setTempData(subscriber);
          }}
          className="text-[#3DA2FF] text-xs font-medium underline"
        >
          View Detail
        </button>
      </div>
    </div>
  );
};

export default List;
