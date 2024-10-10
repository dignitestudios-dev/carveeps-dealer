import React, { useState } from "react";
import { BsQrCode } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { LiaEditSolid } from "react-icons/lia";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaDotCircle } from "react-icons/fa";
import DeleteModal from "./DeleteModal";

const NoteToUser = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <DeleteModal showModal={showModal} setShowModal={setShowModal} onclick={handleShowModal}/>
      <div className="bg-white w-full rounded-[18px] p-6 my-6">
        <div className="w-full flex items-start md:items-center flex-col lg:flex-row justify-start lg:justify-between gap-6">
          <h1 className="text-[13px] font-bold">Note:</h1>
          <div className="flex items-center gap-2 md:gap-6 flex-wrap">
            <button className="text-[#606060] text-[13px] font-medium flex items-center gap-1">
              <BsQrCode className="text-base" />
              Download QR Code
            </button>
            <button className="text-[#606060] text-[13px] font-medium flex items-center gap-1">
              <LiaEditSolid className="text-xl" />
              Edit
            </button>
            <button className="text-[#FF3B30] text-[13px] font-medium flex items-center gap-1" onClick={handleShowModal}>
              <RiDeleteBinLine className="text-lg" /> Remove
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-4">
          <p className="text-[13px] font-normal flex items-center gap-2">
            <FaDotCircle className="w-3 h-3 text-[#FF204E]" /> Dear dealer, you
            have the flexibility to make changes to your plans up to 5 times.
          </p>
          <p className="text-[13px] font-normal flex items-center gap-2">
            <FaDotCircle className="w-3 h-3 text-[#FF204E]" /> Please note that
            once a change is made, the next change will only be possible after
            24 hours.
          </p>
        </div>
      </div>
    </>
  );
};

export default NoteToUser;
