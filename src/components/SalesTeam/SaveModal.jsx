import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";

const SaveModal = ({
  showModal,
  setShowModal,
  onclick,
  heading,
  text,
  id,
  url,
}) => {
  const { navigateToLink } = useContext(GlobalContext);
  return (
    showModal && (
      <div className="w-screen h-screen fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)] z-40 px-6">
        <div className="bg-white rounded-[18px] p-6 lg:w-[375px] w-full h-[187px] flex flex-col items-start justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-[22px] font-bold">{heading}</h1>
            <p className="text-base">{text}</p>
          </div>
          <div className="w-full flex justify-end items-center gap-x-6">
            <button
              onClick={() => {
                navigateToLink(`/sales-team`, "Sales Team");
              }}
              className="text-[#FF204E] text-base font-bold"
              // onClick={onclick}
            >
              No
            </button>
            <button
              onClick={() => {
                navigateToLink(url, "Subscription");
              }}
              className="text-[#FF204E] text-base font-bold"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default SaveModal;
