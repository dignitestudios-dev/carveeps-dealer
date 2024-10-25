import React, { useContext, useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { FaDotCircle } from "react-icons/fa";
import { BankLogo } from "../../assets/export";
import RemoveCardModal from "./RemoveCardModal";
import EditDetailsModal from "./EditBankDetailsModal";
import { GlobalContext } from "../../context/GlobalContext";
import Cookies from "js-cookie";
import axios from "axios";

const Balance = ({ update, setUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [showBankDetailsModal, setShowBankDetailsModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleShowBankDetailsModal = () => {
    setShowBankDetailsModal(!showBankDetailsModal);
  };
  const [data, setData] = useState([]);
  const { baseUrl, navigate, setError } = useContext(GlobalContext);
  const [dataLoading, setDataLoading] = useState(false);
  const getData = () => {
    const token = Cookies.get("token");

    if (token) {
      setDataLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(`${baseUrl}/dealership/account`, {
          headers,
        })
        .then(
          (response) => {
            setData(response?.data?.data);
            setDataLoading(false);
          },
          (error) => {
            setDataLoading(false);
            if (error?.response?.status == 401) {
              Cookies.remove("token");
              navigate("/login");
            }
            setError(error?.response?.data?.message);
          }
        );
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    getData();
  }, [update]);

  useEffect(() => {
    Cookies.set("accountNumber", data?.accountNumber);
  }, [data]);

  function formatValue(data) {
    const value = parseFloat(data?.availableForWithdraw);

    // Check if the parsed value is a number
    if (!isNaN(value)) {
      // Check if the value is an integer
      if (Number.isInteger(value)) {
        // Format integer to two decimal places
        return value.toFixed(2);
      } else {
        // If value is already a float, keep it the same
        return value.toString();
      }
    } else {
      // Handle the case where the value is not a number (NaN)
      return "Invalid number";
    }
  }

  return dataLoading ? (
    <div className="bg-white rounded-t-[18px] p-6 border-b">
      <div className="flex items-start justify-between gap-6 flex-wrap animate-pulse">
        <div>
          <div className="bg-gray-200 h-6 w-40 rounded-full"></div>
          <div className="bg-gray-200 h-4 w-64 mt-2 rounded-full"></div>
        </div>
      </div>
      <div className="text-base font-medium mt-5 bg-gray-200 h-4 w-64 rounded-full animate-pulse"></div>
      <div className="w-full lg:w-[739px] p-4 bg-[#F7F7F7] rounded-[12px] mt-2 animate-pulse">
        <div className="bg-gray-200 h-4 w-40 rounded-full"></div>
        <div className="w-full flex items-end justify-between mt-4">
          <div className="bg-gray-200 h-10 w-32 rounded-full"></div>
          <div className="flex items-center gap-3">
            <div className="bg-gray-200 h-8 w-8 rounded-full"></div>
            <div className="bg-gray-200 h-8 w-8 rounded-full"></div>
          </div>
        </div>
        <div className="bg-white p-4 mt-2 rounded-xl flex items-center justify-between flex-wrap animate-pulse">
          <div className="flex items-center justify-start gap-3">
            <div className="bg-gray-200 h-5 w-5 rounded-full"></div>
            <div className="bg-gray-200 h-5 w-20 rounded-full"></div>
          </div>
          <div className="bg-gray-200 h-4 w-48 rounded-full"></div>
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-white rounded-t-[18px] p-6 border-b">
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          <h1 className="text-[18px] font-bold">Gateway operations</h1>
          <p className="text-xs mt-1">
            Stay on top of your expenses, plans, and payment history with our
            comprehensive billing <br /> features.
          </p>
        </div>
      </div>
      <h1 className="text-base font-medium mt-5">Connected Bank account</h1>
      <div className="w-full lg:w-[739px] p-4 bg-[#F7F7F7] rounded-[12px] mt-2">
        <p className="text-[#7C7C7C] text-[12px] font-medium">
          Total Account Balance
        </p>
        <div className="w-full flex items-end justify-between">
          <h1 className="text-[32px] font-medium">
            ${data?.availableForWithdraw ? data?.availableForWithdraw : "0.00"}
          </h1>
          <div className="flex items-center gap-3">
            <RemoveCardModal
              showModal={showModal}
              setShowModal={setShowModal}
              onclick={handleShowModal}
            />
            <button onClick={handleShowBankDetailsModal}>
              <RiEdit2Fill className="w-5 h-5 text-[#5C5C5C]" />
            </button>
            <EditDetailsModal
              onclick={handleShowBankDetailsModal}
              showModal={showBankDetailsModal}
              setShowModal={setShowBankDetailsModal}
            />
          </div>
        </div>
        <div className="bg-white p-4 mt-2 rounded-xl flex items-center justify-between flex-wrap">
          <div className=" flex items-center justify-start gap-3">
            <FaDotCircle className="text-[#FF204E] w-5 h-5" />
            {/* <img src={BankLogo} alt="" /> */}
            <span className="text-base">{data?.bankName}</span>
          </div>
          <p className="text-base text-[#0F0F0F]">
            ****-****-****-{data?.accountNumber}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Balance;
