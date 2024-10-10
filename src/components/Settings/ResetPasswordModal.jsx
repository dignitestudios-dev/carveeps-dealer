import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { FiEye, FiEyeOff } from "react-icons/fi";

const ResetPasswordModal = ({ showModal, setShowModal, onclick }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  return (
    <>
      {showModal && (
        <div className="w-screen h-screen fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)] z-40">
          <div className="bg-white rounded-[18px] px-6 pt-6 pb-10 lg:w-[512px] w-full h-[437px] flex flex-col items-start justify-between">
            <div className="w-full flex items-center justify-between">
              <h1 className="text-[24px] font-bold">Reset Password</h1>
              <button
                className="w-6 h-6 rounded-full flex items-center justify-center p-1 bg-[#F7F7F7] float-end"
                onClick={onclick}
              >
                <IoClose className="w-full h-full" />
              </button>
            </div>

            <div className="w-full flex flex-col gap-1">
              <label htmlFor="password" className="text-base font-medium">
                Enter Password
              </label>
              <div className="w-full bg-[#F7F7F7] rounded-xl h-[60px] flex items-center justify-between px-4 gap-2">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-[#F7F7F7] rounded-xl text-base h-full outline-none"
                  placeholder="Enter Password"
                />
                <button onClick={handleShowPassword}>
                  {showPassword ? (
                    <FiEye className="w-4 h-4" />
                  ) : (
                    <FiEyeOff className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="w-full flex flex-col gap-1">
              <label htmlFor="password" className="text-base font-medium">
                Confirm Password
              </label>
              <div className="w-full bg-[#F7F7F7] rounded-xl h-[60px] flex items-center justify-between px-4 gap-2">
                <input
                  type={showPassword2 ? "text" : "password"}
                  className="w-full bg-[#F7F7F7] rounded-xl text-base h-full outline-none"
                  placeholder="Enter Password"
                />
                <button onClick={handleShowPassword2}>
                  {showPassword2 ? (
                    <FiEye className="w-4 h-4" />
                  ) : (
                    <FiEyeOff className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="w-full">
              <button className="bg-[#FF204E] text-white py-4 rounded-xl text-base font-bold w-full" onClick={onclick}>
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPasswordModal;
