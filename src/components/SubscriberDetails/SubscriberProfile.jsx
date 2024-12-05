import React, { useContext } from "react";
import { Profile1, SubscriberCar, USAFlag } from "../../assets/export";
import Cookies from "js-cookie";
import { GlobalContext } from "../../context/GlobalContext";

const SubscriberProfile = () => {
  const { tempData } = useContext(GlobalContext);
  return (
    <div className="bg-white rounded-[18px] p-6 w-full h-auto lg:h-[228px] flex flex-col lg:flex-row items-start lg:items-center justify-start gap-4 relative">
      <img
        src={
          tempData?.user?.vehicle?.image ||
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/495px-No-Image-Placeholder.svg.png?20200912122019"
        }
        alt=""
        className="rounded-xl object-contain bg-gray-100 h-[204px] w-[246px]"
      />
      <div className="flex flex-col justify-end lg:flex-row gap-6">
        <div className="h-full flex flex-col items-start justify-start gap-4 lg:gap-4 lg:w-[465px]">
          <div>
            <p className="text-[#5C5C5C] text-xs font-normal">Vehicle Make</p>
            <h1 className="text-[28px] font-semibold lg:mb-3">
              {tempData?.user?.vehicle?.make || "N/A"}
            </h1>
          </div>
          <div className="w-full h-full flex justify-between gap-6 lg:gap-x-14">
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-[#5C5C5C] text-xs font-normal">
                  Year/Make/Model
                </p>
                <p className="text-sm font-medium mt-1">
                  {tempData?.user?.vehicle?.year || "N/A"}/
                  {tempData?.user?.vehicle?.make || "N/A"}/
                  {tempData?.user?.vehicle?.model || "N/A"}
                </p>
              </div>
              <div className="">
                <p className="text-[#5C5C5C] text-xs font-normal">Car Plate</p>
                <p className="text-sm font-medium mt-1">
                  {tempData?.user?.vehicle?.licensePlate || "N/A"}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <di>
                <p className="text-[#5C5C5C] text-xs font-normal">
                  VIN (Vehicle identification number)
                </p>
                <p className="text-sm font-medium mt-1">
                  {tempData?.user?.vehicle?.vin || "N/A"}
                </p>
              </di>
              <di>
                <p className="text-[#5C5C5C] text-xs font-normal">Color</p>
                <p className="text-sm font-medium mt-1">
                  {tempData?.user?.vehicle?.color || "N/A"}
                </p>
              </di>
            </div>
          </div>
        </div>

        <div className="w-[248px] flex items-center gap-2 lg:absolute lg:right-4 lg:bottom-4">
          <img
            src={
              tempData?.user?.profilePicture ||
              "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
            }
            alt=""
            className="w-[51px] h-[51px] rounded-full"
          />
          <div className="flex flex-col">
            <h1 className="text-base font-semibold">
              {tempData?.user?.name || "N/A"}
            </h1>
            <p className="text-xs text-[#5C5C5C] flex items-center gap-1">
              <img src={USAFlag} alt="" className="w-4 h-4" />{" "}
              {tempData?.user?.city || "N/A"},{tempData?.user?.state || "N/A"},
              {tempData?.user?.country || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriberProfile;
