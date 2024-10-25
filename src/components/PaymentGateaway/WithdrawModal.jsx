import React, { useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { GlobalContext } from "../../context/GlobalContext";
import Cookies from "js-cookie";
import axios from "axios";
import BtnLoader from "../Global/BtnLoader";

const WithdrawModal = ({ showModal, setShowModal, onclick }) => {
  const [successModal, setSuccessModal] = useState(false);

  const handleSuccessModal = () => {
    setSuccessModal((prev) => !prev);
    setShowModal(false);
  };

  const { baseUrl, setError, navigate } = useContext(GlobalContext);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState("");

  const [resp, setResp] = useState(null);

  function handleWithdraw(e) {
    e.preventDefault();
    const token = Cookies.get("token");
    if (token) {
      if (amount == "") {
        setError("Amount is required.");
      } else {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        setLoading(true);
        axios
          .post(
            `${baseUrl}/dealership/bank/withdraw`,
            {
              amount: amount,
            },
            { headers }
          )
          .then(
            (response) => {
              console.log(response?.data);
              setResp(response?.data?.data);
              handleSuccessModal();
              setLoading(false);
            },
            (error) => {
              setLoading(false);
              if (error?.response?.status == 401) {
                Cookies.remove("token");
                navigate("/login");
              }
              setError(error?.response?.data?.message);
            }
          );
      }
    } else {
      navigate("/login");
    }
  }

  function convertIsoToMMDDYYYY(isoString) {
    const date = new Date(isoString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    return `${month}-${day}-${year}`;
  }

  return (
    <>
      {showModal && (
        <div className="w-screen h-screen fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)] z-40">
          <form
            onSubmit={handleWithdraw}
            className="bg-white rounded-[18px] px-6 pt-6 pb-10 lg:w-[530px] w-full h-[463px] flex flex-col items-start justify-between"
          >
            <div className="w-full">
              <button
                type="button"
                className="w-6 h-6 rounded-full flex items-center justify-center p-1 bg-[#F7F7F7] float-end"
                onClick={onclick}
              >
                <IoClose className="w-full h-full" />
              </button>
            </div>

            <div className="w-full flex flex-col gap-1 lg:px-6">
              <label
                htmlFor="Attached Stripe Account"
                className="text-[12px] font-medium"
              >
                Attached Account
              </label>
              <span className="w-full flex items-center justify-start h-[52px] bg-[#F7F7F7] px-4 text-sm outline-none rounded-xl placeholder:text-black">
                ****-****-****-{Cookies?.get("accountNumber")}
              </span>
            </div>

            <div className="lg:px-6">
              <h1 className="text-xl font-bold">Withdraw Funds</h1>
            </div>

            <div className="w-full flex flex-col gap-1 lg:px-6">
              <label
                htmlFor="Attached Stripe Account"
                className="text-[12px] font-medium"
              >
                Enter Amount
              </label>
              <input
                type="text"
                placeholder="500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full h-[52px] placeholder:text-gray-500  bg-transparent border border-[#B8B8B8] px-4 text-base outline-none rounded-xl "
              />
            </div>

            <div className="w-full lg:px-6">
              <button
                type="submit"
                className="bg-[#FF204E] text-white py-4 rounded-xl text-base font-bold w-full"
              >
                {loading ? <BtnLoader /> : "Withdraw Now"}
              </button>
            </div>
          </form>
        </div>
      )}
      {successModal && (
        <div className="w-screen h-screen fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)] z-40">
          <div className="bg-white rounded-[18px] px-6 pt-6 pb-10 lg:w-[456px] w-full h-[453px] flex flex-col items-center justify-center gap-3 text-center">
            <div className="w-full">
              <button
                className="w-6 h-6 rounded-full flex items-center justify-center p-1 bg-[#F7F7F7] float-end"
                onClick={handleSuccessModal}
              >
                <IoClose className="w-full h-full" />
              </button>
            </div>

            <div className="w-[70px] h-[70px] rounded-full flex items-center justify-center bg-[#3FB743] p-4">
              <FaCheck className="text-white w-full h-full" />
            </div>
            <h1 className="text-2xl font-bold">Withdraw Successfully</h1>
            <div>
              <p className="text-[13px] font-medium text-[#5C5C5C]">
                Amount Withdraw
              </p>
              <p className="text-2xl font-semibold">USD {resp?.amount}</p>
            </div>
            <div>
              <p className="text-[13px] font-medium text-[#5C5C5C]">
                Reference ID
              </p>
              <p className="text-[13px] font-semibold">{resp?._id}</p>
            </div>
            <div>
              <p className="text-[13px] font-medium text-[#5C5C5C]">Name</p>
              <p className="text-[13px] font-semibold">
                {resp?.withdrawerName}
              </p>
            </div>
            <div>
              <p className="text-[13px] font-medium text-[#5C5C5C]">Date</p>
              <p className="text-[13px] font-semibold">
                {convertIsoToMMDDYYYY(resp?.createdAt)}
              </p>
            </div>
            <div>
              <p className="text-[13px] font-medium text-[#5C5C5C]">
                Description
              </p>
              <p className="text-[13px] font-semibold">
                direct to local bank account <br />
                {resp?.bankName}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WithdrawModal;
