import React from "react";

const RemoveCardModal = ({ showModal, setShowModal, onclick }) => {
  return (
    showModal && (
      <div className="w-screen h-screen fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)] z-40 p-6">
        <div className="bg-white rounded-[18px] p-6 lg:w-[375px] w-full h-[187px] flex flex-col items-start justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-[22px] font-bold">Remove Card</h1>
            <p className="text-base">Are you sure you want to remove PayPal?</p>
          </div>
          <div className="w-full flex justify-end items-center gap-x-6">
            <button className="text-[#FF204E] text-base font-bold" onClick={onclick}>
              Cancel
            </button>
            <button className="text-[#FF204E] text-base font-bold">
              Remove
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default RemoveCardModal;
