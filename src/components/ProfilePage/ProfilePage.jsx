import React, { useContext, useState, useEffect } from "react";
import { ToyotaLogo, USAFlag } from "../../assets/export";
import { RiEdit2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import Cookies from "js-cookie";
import axios from "axios";
import CreateNotification from "../Notifications/CreateNotification";

const ProfilePage = () => {
  const [dealer, setDealer] = useState([]);
  const { baseUrl, navigate } = useContext(GlobalContext);
  const [dealerLoading, setDealerLoading] = useState(false);

  const getDealerProfile = () => {
    const token = Cookies.get("token");
    const id = Cookies.get("dealershipId");

    if (token) {
      setDealerLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(`${baseUrl}/dealership?dealershipId=${id}`, {
          headers,
        })
        .then(
          (response) => {
            setDealer(response?.data?.data);
            setDealerLoading(false);
          },
          (error) => {
            setDealerLoading(false);
            if (error?.response?.status == 401) {
              setIsLoggedIn(false);
              Cookies.remove("token");
              navigate("/login");
            }
          }
        );
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    getDealerProfile();
  }, []);

  function convertTo12HourFormat(time24) {
    const [hours, minutes] = time24.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12; // Convert to 12-hour format
    const minutesStr = minutes.toString().padStart(2, "0"); // Ensure two-digit minutes

    return `${hours12}:${minutesStr} ${period}`;
  }

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  return dealerLoading ? (
    <div className="bg-white rounded-[18px] flex flex-col gap-6 py-6 w-full animate-pulse">
      {/* <!-- Profile Section --> */}
      <div className="px-10">
        <div className="h-8 w-32 bg-gray-200 rounded-md mb-6"></div>

        <div className="w-full md:w-[415px] h-auto md:h-[164px] flex items-center md:items-center flex-col md:flex-row gap-6 flex-wrap mt-10">
          <div className="w-40 h-40 rounded-full bg-gray-200"></div>
          <div className="flex flex-col pb-1">
            <div className="h-8 w-48 bg-gray-200 rounded-md mb-2"></div>
            <div className="flex gap-2 items-center">
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
              <div className="h-4 w-60 bg-gray-200 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="border w-full mt-6"></div>

      <div className="px-10 flex flex-col gap-6">
        <div className="w-full flex items-center justify-between">
          <div className="h-8 w-48 bg-gray-200 rounded-md"></div>
          <div className="h-8 w-32 bg-gray-200 rounded-full"></div>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="col-span-2 lg:col-span-1">
            <div className="h-4 w-36 bg-gray-200 rounded-md mb-2"></div>
            <div className="h-4 w-48 bg-gray-200 rounded-md"></div>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <div className="h-4 w-36 bg-gray-200 rounded-md mb-2"></div>
            <div className="h-4 w-48 bg-gray-200 rounded-md"></div>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="col-span-2 lg:col-span-1">
            <div className="h-4 w-36 bg-gray-200 rounded-md mb-2"></div>
            <div className="h-4 w-48 bg-gray-200 rounded-md"></div>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <div className="h-4 w-36 bg-gray-200 rounded-md mb-2"></div>
            <div className="h-4 w-48 bg-gray-200 rounded-md"></div>
          </div>
        </div>

        <div className="border w-full"></div>

        <div className="w-full flex items-center justify-start">
          <div className="h-8 w-48 bg-gray-200 rounded-md"></div>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="col-span-2 lg:col-span-1">
            <div className="h-4 w-36 bg-gray-200 rounded-md mb-2"></div>
            <div className="h-4 w-48 bg-gray-200 rounded-md"></div>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <div className="h-4 w-36 bg-gray-200 rounded-md mb-2"></div>
            <div className="h-4 w-48 bg-gray-200 rounded-md"></div>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="col-span-2 lg:col-span-1">
            <div className="h-4 w-36 bg-gray-200 rounded-md mb-2"></div>
            <div className="h-4 w-48 bg-gray-200 rounded-md"></div>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <div className="h-4 w-36 bg-gray-200 rounded-md mb-2"></div>
            <div className="h-4 w-48 bg-gray-200 rounded-md"></div>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="col-span-2 lg:col-span-1">
            <div className="h-4 w-36 bg-gray-200 rounded-md mb-2"></div>
            <div className="h-4 w-48 bg-gray-200 rounded-md"></div>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <div className="h-4 w-36 bg-gray-200 rounded-md mb-2"></div>
            <div className="h-4 w-48 bg-gray-200 rounded-md"></div>
          </div>
        </div>

        <div className="w-[236px]">
          <div className="h-4 w-36 bg-gray-200 rounded-md mb-2"></div>
          <div className="h-4 w-60 bg-gray-200 rounded-md mb-1"></div>
          <div className="h-4 w-60 bg-gray-200 rounded-md mb-1"></div>
          <div className="h-4 w-60 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-white rounded-[18px] flex flex-col gap-6 py-6 w-full">
      <div className="px-10">
        <h1 className="text-2xl font-bold">Profile</h1>

        <div className="w-full h-auto md:h-[164px] overflow-y-auto flex items-center md:items-center  flex-row gap-6  mt-10">
          <div className="w-40 h-40 rounded-full bg-gray-200">
            <img
              src={dealer?.logo}
              alt=""
              className="block w-full object-contain h-full rounded-full"
            />
          </div>
          <div className=" w-[calc(100%-10rem)]  flex flex-col pb-1">
            <p className="text-2xl font-semibold">
              {dealer?.name ? dealer?.name : "N/A"}
            </p>
            <div className="flex gap-2">
              <img src={USAFlag} alt="" className="w-8 h-8 rounded-full" />
              <p className="text-base text-[#00000099]">
                {dealer?.city ? dealer?.city : "N/A"},{" "}
                {dealer?.state ? dealer?.state : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border w-full mt-6" />

      <div className="px-10 flex flex-col gap-6">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-2xl font-medium">Business Details</h1>
          <button
            onClick={() => navigate(`/profile/edit-profile/${dealer?._id}`)}
            className="bg-[#FF204E26] rounded-full px-3 py-2 text-[#FF204E] text-sm font-bold flex items-center justify-center gap-1"
          >
            <RiEdit2Fill /> Edit
          </button>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="col-span-2 lg:col-span-1">
            <p className="text-base text-[#5C5C5C]">Dealer Name</p>
            <p className="text-base mt-1">
              {dealer?.name ? dealer?.name : "N/A"}
            </p>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <p className="text-base text-[#5C5C5C]">Street Address</p>
            <p className="text-base mt-1">
              {dealer?.address ? dealer?.address : "N/A"}
            </p>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="col-span-2 lg:col-span-1">
            <p className="text-base text-[#5C5C5C]">City</p>
            <p className="text-base mt-1">
              {dealer?.city ? dealer?.city : "N/A"}
            </p>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <p className="text-base text-[#5C5C5C]">State</p>
            <p className="text-base mt-1">
              {dealer?.state ? dealer?.state : "N/A"}
            </p>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="col-span-2 lg:col-span-1">
            <p className="text-base text-[#5C5C5C]">Zip Code</p>
            <p className="text-base mt-1">
              {dealer?.zipCode ? dealer?.zipCode : "N/A"}
            </p>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <p className="text-base text-[#5C5C5C]">Country</p>
            <p className="text-base mt-1">
              {dealer?.country ? dealer?.country : "N/A"}
            </p>
          </div>
        </div>

        <div className="border w-full" />

        <div className="w-full flex items-center justify-start">
          <h1 className="text-2xl font-medium">Contact Information</h1>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="col-span-2 lg:col-span-1">
            <p className="text-base text-[#5C5C5C]">Phone Number</p>
            <p className="text-base mt-1">
              {dealer?.phoneNumber ? dealer?.phoneNumber : "N/A"}
            </p>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <p className="text-base text-[#5C5C5C]">
              Appointment Scheduling Link
            </p>
            <a
              href={dealer?.appointmentLink}
              target="_blank"
              className="text-base mt-1 text-[#3DA2FF]"
            >
              {dealer?.appointmentLink ? dealer?.appointmentLink : "N/A"}
            </a>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="col-span-2 lg:col-span-1">
            <p className="text-base text-[#5C5C5C]">Facebook Link</p>
            <a
              href={dealer?.facebook}
              target="_blank"
              className="text-base mt-1 text-[#3DA2FF]"
            >
              {dealer?.facebook ? dealer?.facebook : "N/A"}
            </a>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <p className="text-base text-[#5C5C5C]">Instagram Link</p>
            <a
              href={dealer?.instagram}
              target="_blank"
              className="text-base mt-1 text-[#3DA2FF]"
            >
              {dealer?.instagram ? dealer?.instagram : "N/A"}
            </a>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="col-span-2 lg:col-span-1">
            <p className="text-base text-[#5C5C5C]">LinkedIn Link</p>
            <a
              href={dealer?.linkedIn}
              target="_blank"
              className="text-base mt-1 text-[#3DA2FF]"
            >
              {dealer?.linkedIn ? dealer?.linkedIn : "N/A"}
            </a>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <p className="text-base text-[#5C5C5C]">Twitter Link</p>
            <a
              href={dealer?.twitter}
              target="_blank"
              className="text-base mt-1 text-[#3DA2FF]"
            >
              {dealer?.twitter ? dealer?.twitter : "N/A"}
            </a>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="col-span-2 lg:col-span-1">
            <p className="text-base text-[#5C5C5C]">Tiktok Link</p>
            <a
              href={dealer?.tiktok}
              target="_blank"
              className="text-base mt-1 text-[#3DA2FF]"
            >
              {dealer?.tiktok ? dealer?.tiktok : "N/A"}
            </a>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <p className="text-base text-[#5C5C5C]">Website</p>
            <a
              href={dealer?.website}
              target="_blank"
              className="text-base mt-1 text-[#3DA2FF]"
            >
              {dealer?.website ? dealer?.website : "N/A"}
            </a>
          </div>
        </div>

        <div className="w-auto">
          <p className="text-base text-[#5C5C5C]">Business Hours</p>
          <p className="text-base w-full flex flex-col gap-2 justify-start items-start">
            {dealer?.businessHours?.map((item) => {
              return (
                <div
                  key={item?.day}
                  className="w-96 flex items-center justify-between gap-2"
                >
                  <span className="text-md font-medium text-gray-600">
                    {item?.day}
                  </span>

                  {item?.closed && (
                    <div className="w-auto h-12 rounded-md border p-2 flex flex-col justify-center items-center ">
                      <span className="text-[14px] font-medium text-gray-800">
                        Closed
                      </span>
                    </div>
                  )}
                  {item?.open24 && (
                    <div className="w-auto h-12 rounded-md border p-2 flex flex-col justify-center items-center ">
                      <span className="text-[14px] font-medium text-gray-800">
                        Opens 24 Hour
                      </span>
                    </div>
                  )}
                  {!(item?.closed || item?.open24) && (
                    <div className="w-auto flex justify-start items-center gap-2">
                      <div className="w-auto h-12 rounded-md border p-2 flex flex-col justify-center items-center">
                        <span className="text-[13px] font-medium text-gray-500">
                          Opens At
                        </span>
                        <span className="text-[14px] font-medium text-gray-800">
                          {item?.openTime}
                        </span>
                      </div>
                      <div className="w-auto h-12 rounded-md border p-2 flex flex-col justify-center items-center">
                        <span className="text-[13px] font-medium text-gray-500">
                          Closes At
                        </span>
                        <span className="text-[14px] font-medium text-gray-800">
                          {item?.closeTime}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
