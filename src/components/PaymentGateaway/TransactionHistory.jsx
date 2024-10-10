import React, { useState } from "react";
import List from "./List";
import WithdrawModal from "./WithdrawModal";

const TransactionHistory = () => {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(!showModal);
  };
  return (
    <div className="bg-white px-6 py-4">
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          <h1 className="text-[18px] font-bold">Transaction History</h1>
          <p className="text-xs mt-1">
            Access detailed transaction history for full transaction
            transparency, including payments <br /> received and withdrawals
            made.
          </p>
        </div>
        <button
          className="bg-[#FF204E] text-white w-[118px] rounded-lg text-[12px] font-semibold py-3"
          onClick={handleShowModal}
        >
          Withdraw
        </button>
        <WithdrawModal
          showModal={showModal}
          onclick={handleShowModal}
          setShowModal={setShowModal}
        />
      </div>
      <List />
    </div>
  );
};

export default TransactionHistory;
