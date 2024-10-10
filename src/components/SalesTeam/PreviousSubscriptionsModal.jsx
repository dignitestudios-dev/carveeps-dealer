import React from "react";
import { IoClose } from "react-icons/io5";

const PreviousSubscriptionModal = ({ showModal, setShowModal, onclick }) => {
  return (
    showModal && (
      <div className="w-screen h-screen fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)] z-40 px-2">
        <div className="bg-white rounded-[18px] p-6 lg:w-[877px] w-full h-[526px] flex flex-col items-start justify-start">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-[22px] font-bold">Previous Subscriptions</h1>
            <button className="w-[30px] h-[30px] rounded-full p-1 bg-gray-100" onClick={onclick}>
              <IoClose className="w-full h-full" />
            </button>
          </div>
          <div className="w-full overflow-y-scroll modal-scroll">
            <div className="w-full grid grid-cols-5 py-4 mt-2">
              <div className="">
                <h1 className="text-xs text-[#7C7C7C] font-medium">Date</h1>
              </div>
              <div className="">
                <h1 className="text-xs text-[#7C7C7C] font-medium">
                  Subscription Plan
                </h1>
              </div>
              <div className="">
                <h1 className="text-xs text-[#7C7C7C] font-medium">Duration</h1>
              </div>
              <div className="">
                <h1 className="text-xs text-[#7C7C7C] font-medium">Amount</h1>
              </div>
              <div className="">
                <h1 className="text-xs text-[#7C7C7C] font-medium"></h1>
              </div>
            </div>
            <div className="w-full grid grid-cols-5 py-3 border-t border-b">
              <div>
                <p className="text-xs font-medium">Jan 15, 2024</p>
              </div>
              <div>
                <p className="text-xs font-medium">DriveCar Plus</p>
              </div>
              <div>
                <p className="text-xs font-medium">Yearly</p>
              </div>
              <div>
                <p className="text-xs font-medium">USD $100</p>
              </div>
              <div>
                <button className="text-xs font-medium text-[#FF3B30]">
                  Remove
                </button>
              </div>
            </div>
            <div className="w-full grid grid-cols-5 py-3 border-t border-b">
              <div>
                <p className="text-xs font-medium">Jan 15, 2024</p>
              </div>
              <div>
                <p className="text-xs font-medium">DriveCar Plus</p>
              </div>
              <div>
                <p className="text-xs font-medium">Yearly</p>
              </div>
              <div>
                <p className="text-xs font-medium">USD $100</p>
              </div>
              <div>
                <button className="text-xs font-medium text-[#FF3B30]">
                  Remove
                </button>
              </div>
            </div>
            <div className="w-full grid grid-cols-5 py-3 border-t border-b">
              <div>
                <p className="text-xs font-medium">Jan 15, 2024</p>
              </div>
              <div>
                <p className="text-xs font-medium">DriveCar Plus</p>
              </div>
              <div>
                <p className="text-xs font-medium">Yearly</p>
              </div>
              <div>
                <p className="text-xs font-medium">USD $100</p>
              </div>
              <div>
                <button className="text-xs font-medium text-[#FF3B30]">
                  Remove
                </button>
              </div>
            </div>
            <div className="w-full grid grid-cols-5 py-3 border-t border-b">
              <div>
                <p className="text-xs font-medium">Jan 15, 2024</p>
              </div>
              <div>
                <p className="text-xs font-medium">DriveCar Plus</p>
              </div>
              <div>
                <p className="text-xs font-medium">Yearly</p>
              </div>
              <div>
                <p className="text-xs font-medium">USD $100</p>
              </div>
              <div>
                <button className="text-xs font-medium text-[#FF3B30]">
                  Remove
                </button>
              </div>
            </div>
            <div className="w-full grid grid-cols-5 py-3 border-t border-b">
              <div>
                <p className="text-xs font-medium">Jan 15, 2024</p>
              </div>
              <div>
                <p className="text-xs font-medium">DriveCar Plus</p>
              </div>
              <div>
                <p className="text-xs font-medium">Yearly</p>
              </div>
              <div>
                <p className="text-xs font-medium">USD $100</p>
              </div>
              <div>
                <button className="text-xs font-medium text-[#FF3B30]">
                  Remove
                </button>
              </div>
            </div>
            <div className="w-full grid grid-cols-5 py-3 border-t border-b">
              <div>
                <p className="text-xs font-medium">Jan 15, 2024</p>
              </div>
              <div>
                <p className="text-xs font-medium">DriveCar Plus</p>
              </div>
              <div>
                <p className="text-xs font-medium">Yearly</p>
              </div>
              <div>
                <p className="text-xs font-medium">USD $100</p>
              </div>
              <div>
                <button className="text-xs font-medium text-[#FF3B30]">
                  Remove
                </button>
              </div>
            </div>
            <div className="w-full grid grid-cols-5 py-3 border-t border-b">
              <div>
                <p className="text-xs font-medium">Jan 15, 2024</p>
              </div>
              <div>
                <p className="text-xs font-medium">DriveCar Plus</p>
              </div>
              <div>
                <p className="text-xs font-medium">Yearly</p>
              </div>
              <div>
                <p className="text-xs font-medium">USD $100</p>
              </div>
              <div>
                <button className="text-xs font-medium text-[#FF3B30]">
                  Remove
                </button>
              </div>
            </div>
            <div className="w-full grid grid-cols-5 py-3 border-t border-b">
              <div>
                <p className="text-xs font-medium">Jan 15, 2024</p>
              </div>
              <div>
                <p className="text-xs font-medium">DriveCar Plus</p>
              </div>
              <div>
                <p className="text-xs font-medium">Yearly</p>
              </div>
              <div>
                <p className="text-xs font-medium">USD $100</p>
              </div>
              <div>
                <button className="text-xs font-medium text-[#FF3B30]">
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default PreviousSubscriptionModal;
