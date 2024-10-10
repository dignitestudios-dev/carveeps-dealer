import React from "react";
import { useNavigate } from "react-router-dom";

const DeleteModal = ({ showModal, setShowModal, onclick }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/subscription-plans");
  };

  return (
    <>
      {showModal && (
        <div className="w-full h-screen fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-40 bg-[rgba(0,0,0,0.4)]">
          <div className="bg-white rounded-[18px] p-8 w-[90%] lg:w-[375px] h-auto flex flex-col items-start justify-start gap-2 relative">
            <h1 className="text-[22px] font-bold">Delete Subscription Plan</h1>
            <p className="text-base font-medium text-[#5C5C5C]">
              Are you sure you want to delete subscription plane?
            </p>
            <div className="w-full flex justify-end items-center gap-10">
              <button
                className="text-base font-bold text-[#FF204E]"
                onClick={onclick}
              >
                Cancel
              </button>
              <button
                className="text-base font-bold text-[#FF204E]"
                onClick={onclick}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;
