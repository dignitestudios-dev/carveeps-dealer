import React from "react";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { useNavigate } from "react-router";

const SuccessModal = ({ showModal, setShowModal, onclick }) => {
  const navigate = useNavigate();

  const handleCloseModal = () => {
    onclick();
    navigate("/sales-team/sales-person-profile")
  }
  return (
    showModal && (
      <div className="w-screen h-screen fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)] z-40 px-6">
        <div className="bg-white rounded-[18px] p-6 lg:w-[455px] w-full h-[282px] flex flex-col items-center gap-2 justify-center relative">
          <button className="w-7 h-7 rounded-full bg-gray-100 absolute top-5 right-5 p-1" onClick={handleCloseModal}>
            <IoClose className="w-full h-full"/>
          </button>
          <div className="w-[84px] h-[84px] rounded-full flex items-center justify-center bg-[#FF204E] p-5">
            <FaCheck className="w-full h-full text-white"/>
          </div>
          <div className="flex flex-col items-center justify-center gap-y-2">
            <h1 className="text-[22px] font-bold">Congratulations!</h1>
            <p className="text-base text-center text-[#5C5C5C]">You have successfully created a subscription plan for the 'salesperson's name'.</p>
          </div>
        </div>
      </div>
    )
  );
};

export default SuccessModal;
