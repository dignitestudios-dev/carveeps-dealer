import React, { useState, useEffect, useContext } from "react";
import { styles } from "../../styles/styles";
import { IoClose } from "react-icons/io5";
import { GalleryIcon } from "../../assets/export";
import { useNavigate } from "react-router";
import { FaCheck } from "react-icons/fa6";
import axios from "axios";
import Cookies from "js-cookie";
import { GlobalContext } from "../../context/GlobalContext";
import Error from "../Global/Error";
import BtnLoader from "../Global/BtnLoader";

const PaymentForm = () => {
  const { navigateToLink, baseUrl } = useContext(GlobalContext);
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(!showModal);
  };
  const [bankName, setBankName] = useState("");
  const [holderName, setHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
              Cookies.set("isBankAccountAdded", true, { expires: 7 });
              handleShowModal();
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
  const navigate = useNavigate();

  return (
    <>
      {error && <Error error={error} setError={setError} />}
      <div
        className={`w-full h-12 flex justify-end items-center ${styles.bodyBg} mr-2 `}
      >
        <button
          onClick={() => {
            Cookies.remove("token");
            navigate("/login");
          }}
          className="w-36 h-10 rounded-lg flex items-center justify-center bg-[#ff204e] text-sm text-white font-medium"
        >
          Logout
        </button>
      </div>
      <div
        className={`${styles.bodyBg} w-full h-screen flex items-center justify-center`}
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg md:w-[708px] h-auto p-6 relative flex flex-col gap-y-6 items-start"
        >
          <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center bg-[#FF204E26]">
            <img
              src={GalleryIcon}
              alt="GalleryIcon"
              className="h-[26.89px] w-[26.89px]"
            />
          </div>
          <h1 className="text-2xl font-bold">Connect a Bank Account</h1>
          <p className="text-base font-normal">
            Please enter your bank account details below to securely connect
            your bank account to our platform. This will enable seamless
            transactions and payments within the app.
          </p>
          <div className="w-full flex flex-col items-start gap-y-2">
            <label htmlFor="" className="text-[13px] font-medium">
              Bank Name
            </label>
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className={`w-full ${styles.bodyBg} h-[60px] px-4 rounded-lg outline-none`}
            />
          </div>
          <div className="w-full flex flex-col items-start gap-y-2">
            <label htmlFor="" className="text-[13px] font-medium">
              Account Holder Name
            </label>
            <input
              type="text"
              value={holderName}
              onChange={(e) => setHolderName(e.target.value)}
              className={`w-full ${styles.bodyBg} h-[60px] px-4 rounded-lg outline-none`}
            />
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="w-full flex flex-col items-start gap-y-2">
              <label htmlFor="" className="text-[13px] font-medium">
                Account Number
              </label>
              <input
                type="text"
                value={accountNumber}
                maxLength={12}
                onChange={(e) => setAccountNumber(e.target.value)}
                className={`w-full ${styles.bodyBg} h-[60px] px-4 rounded-lg outline-none`}
              />
            </div>
            <div className="w-full flex flex-col items-start gap-y-2">
              <label htmlFor="" className="text-[13px] font-medium">
                Routing Number
              </label>
              <input
                type="text"
                value={routingNumber}
                maxLength={9}
                onChange={(e) => setRoutingNumber(e.target.value)}
                className={`w-full ${styles.bodyBg} h-[60px] px-4 rounded-lg outline-none`}
              />
            </div>
          </div>
          <button
            type="submit"
            className={`mt-5 w-full ${styles.bgOrange} text-white text-base font-medium h-[48px] rounded-lg`}
          >
            {loading ? <BtnLoader /> : "Save"}
          </button>
        </form>
      </div>
      {showModal && (
        <div className="w-full h-screen fixed top-0 right-0 bottom-0 left-0 bg-[#0F0F0F80] flex items-center justify-center">
          <div className="bg-white w-full md:w-[455px] h-[282px] flex flex-col items-center justify-center rounded-lg relative gap-3">
            <button
              onClick={() => navigateToLink("/report-access", "Report Access")}
              className={`w-[30px] h-[30px] ${styles.bodyBg} flex items-center justify-center absolute right-6 top-6 rounded-full`}
            >
              <IoClose className="w-[14px] h-[14px]" />
            </button>
            <div
              className={`${styles.bgOrange} w-[84px] h-[84px] rounded-full flex items-center justify-center`}
            >
              <FaCheck className="text-white w-[48.58px] h-[48.58px]" />
            </div>
            <h1 className="text-[22px] font-bold">Bank Account Connected</h1>
            <p className="text-base font-medium">
              You have successfully connected a bank account.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentForm;
