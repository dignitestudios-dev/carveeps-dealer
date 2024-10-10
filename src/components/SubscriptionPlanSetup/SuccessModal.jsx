import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

const SuccessModal = ({showModal, setShowModal, onclick}) => {

  return (
    <>
      {showModal && (
        <div className="w-full h-screen fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-40 bg-[rgba(0,0,0,0.4)]">
          <div className="bg-white rounded-[18px] py-10 px-8 w-[90%] lg:w-[455px] h-[282px] flex flex-col items-center justify-center gap-5 relative">
            <Link to="/all-subscriptions"
              className="w-[30px] h-[30px] rounded-full bg-[#F7F7F7] flex items-center justify-center p-1 absolute top-5 right-5"
              onClick={onclick}
            >
              <IoClose className="w-full h-full" />
            </Link>
            <div className="bg-[#FF204E] w-[84px] h-[84px] rounded-full flex items-center justify-center p-4">
              <FaCheck className="w-full h-full text-white" />
            </div>
            <h1 className="text-xl font-bold">Congratulations!</h1>
            <p className="text-base font-medium text-[#5C5C5C] text-center">
              Your subscription plan has been successfully created. You can now
              start offering customized services to your customers.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SuccessModal;
