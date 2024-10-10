import React, { useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import BtnLoader from "../Global/BtnLoader";
import axios from "axios";
import Cookies from "js-cookie";
import { GlobalContext } from "../../context/GlobalContext";

const EditDetailsModal = ({ showModal, setShowModal, onclick }) => {
  const { navigateToLink, baseUrl } = useContext(GlobalContext);

  const [bankName, setBankName] = useState("");
  const [holderName, setHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
    if (token) {
      if (bankName == "") {
        setError("Bank Name cannot be left empty.");
      } else if (holderName == "") {
        setError("Account Holder's Name cannot be left empty.");
      } else if (accountNumber == "") {
        setError("You must provide your account number.");
      } else if (routingNumber == "") {
        setError("You must provide your routing number.");
      } else {
        setLoading(true);
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        axios
          .post(
            `${baseUrl}/dealership/bank`,
            {
              accountHolderName: holderName,
              bankName: bankName,
              accountNumber: accountNumber,
              routingNumber: routingNumber,
            },
            { headers }
          )
          .then(
            (response) => {
              onclick();
              setLoading(false);
            },
            (error) => {
              setLoading(false);
              setError(error?.response?.data?.message);
            }
          );
      }
    }
  };
  return (
    showModal && (
      <div className="w-screen h-screen fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)] z-40 p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-[18px] p-6 lg:w-[679px] w-full h-[539px] flex flex-col items-start justify-between"
        >
          <div className="w-full flex items-center justify-between gap-y-2">
            <h1 className="text-[22px] font-bold">Edit Bank Details</h1>
            <button
              className="w-6 h-6 rounded-full flex items-center justify-center p-1 bg-[#F7F7F7]"
              onClick={onclick}
            >
              <IoClose className="w-full h-full" />
            </button>
          </div>
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="Bank Name" className="text-[13px] font-medium">
              Bank Name
            </label>
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full h-[60px] rounded-lg px-4 text-sm outline-none bg-[#F7F7F7]"
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="Bank Name" className="text-[13px] font-medium">
              Account Holder Name
            </label>
            <input
              type="text"
              value={holderName}
              onChange={(e) => setHolderName(e.target.value)}
              className="w-full h-[60px] rounded-lg px-4 text-sm outline-none bg-[#F7F7F7]"
            />
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full col-span-2 md:col-span-1 flex flex-col gap-1">
              <label htmlFor="Bank Name" className="text-[13px] font-medium">
                Account Number
              </label>
              <input
                type="text"
                value={accountNumber}
                maxLength={12}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full h-[60px] rounded-lg px-4 text-sm outline-none bg-[#F7F7F7]"
              />
            </div>
            <div className="w-full col-span-2 md:col-span-1 flex flex-col gap-1">
              <label htmlFor="Bank Name" className="text-[13px] font-medium">
                Routing Number
              </label>
              <input
                type="text"
                value={routingNumber}
                maxLength={9}
                onChange={(e) => setRoutingNumber(e.target.value)}
                className="w-full h-[60px] rounded-lg px-4 text-sm outline-none bg-[#F7F7F7]"
              />
            </div>
          </div>
          <div className="w-full flex justify-end items-center gap-x-6">
            <button
              type="submit"
              className="text-white bg-[#FF204E] rounded-lg text-base font-bold w-full py-3"
            >
              {loading ? <BtnLoader /> : "Save"}
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default EditDetailsModal;
