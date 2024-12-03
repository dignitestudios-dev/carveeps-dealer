import React, { useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import BtnLoader from "../../components/Global/BtnLoader";
import { GlobalContext } from "../../context/GlobalContext";
import axios from "axios";
import Cookies from "js-cookie";

const UpdateModal = ({ showModal, setShowModal, onclick, service, update }) => {
  const formatDateFromEpoch = (epoch) => {
    if (epoch == null) return "N/A";
    const date = new Date(epoch);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };

  const getDateToday = () => {
    const date = new Date();
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };

  const { setError, baseUrl, navigate } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);

  const redeemService = (id, remainingCount) => {
    if (remainingCount == 0) {
      setError("All services already redeemed.");
    } else {
      const token = Cookies.get("token");
      if (token) {
        setLoading(true);
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        axios
          .post(
            `${baseUrl}/dealership/services/redeem`,
            {
              obtainedServiceId: id,
            },
            { headers }
          )
          .then((response) => {
            setLoading(false);

            update((prev) => !prev);
            onclick();
          })
          .catch((error) => {
            setLoading(false);
            setError(error?.response?.data?.message);
          });
      } else {
        Cookies.remove("token");
        navigate("/login");
      }
    }
  };
  return (
    <>
      {showModal && (
        <div className="fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center z-40 w-screen h-screen bg-[rgba(0,0,0,0.4)] px-6">
          <div className="bg-white w-[668px] h-auto p-6 rounded-[18px] shadow-xl flex flex-col gap-6">
            <div className="w-full flex items-center justify-between">
              <h1 className="text-[18px] font-semibold">Update Service</h1>
              <button
                className="w-[30px] h-[30px] rounded-full flex items-center justify-center bg-[#F7F7F7] p-2"
                onClick={onclick}
              >
                <IoClose className="w-full h-full" />
              </button>
            </div>
            <div className="w-full grid grid-cols-2 gap-6">
              <div className="col-span-1 flex flex-col items-start gap-1">
                <label htmlFor="service" className="text-[13px] font-medium">
                  Service
                </label>
                <input
                  type="text"
                  disabled
                  value={service?.service?.name}
                  className="h-[52px] rounded-[8px] px-4 bg-[#F7F7F7] text-[13px] font-normal w-full placeholder:text-black"
                />
              </div>
              <div className="col-span-1 flex flex-col items-start gap-1">
                <label htmlFor="service" className="text-[13px] font-medium">
                  Last Used
                </label>
                <input
                  type="text"
                  disabled
                  value={formatDateFromEpoch(service?.lastUsed)}
                  className="h-[52px] rounded-[8px] px-4 bg-[#F7F7F7] text-[13px] font-normal w-full placeholder:text-black"
                />
              </div>
            </div>
            <div className="w-full grid grid-cols-2 gap-6">
              <div className="col-span-1 flex flex-col items-start gap-1">
                <label htmlFor="service" className="text-[13px] font-medium">
                  Total Services
                </label>
                <input
                  type="text"
                  disabled
                  value={service?.totalCount}
                  className="h-[52px] rounded-[8px] px-4 bg-[#F7F7F7] text-[13px] font-normal w-full placeholder:text-black"
                />
              </div>
              <div className="col-span-1 flex flex-col items-start gap-1">
                <label htmlFor="service" className="text-[13px] font-medium">
                  Remaining Services
                </label>
                <input
                  type="text"
                  disabled
                  value={service?.remainingCount}
                  className="h-[52px] rounded-[8px] px-4 bg-[#F7F7F7] text-[13px] font-normal w-full placeholder:text-black"
                />
              </div>
            </div>
            <button
              disabled={loading}
              className="w-full bg-[#FF204E] rounded-[8px] text-white font-bold text-base py-3"
              onClick={() =>
                redeemService(service?._id, service?.remainingCount)
              }
            >
              {loading ? <BtnLoader /> : "Redeem"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateModal;
