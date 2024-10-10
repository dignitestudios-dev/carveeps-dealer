import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";

const PasswordModal = ({ showModal, setShowModal }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleNavigate = () => {
    navigate("/reports/revenue-analysis");
  };

  return (
    <>
      {showModal && (
        <div className="w-full h-screen fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-40 bg-[rgba(0,0,0,0.4)]">
          <div className="bg-white rounded-[18px] px-8 py-7 w-[90%] lg:w-[490px] h-auto flex flex-col items-start justify-start gap-5 relative">
            <button className="w-7 h-7 rounded-full flex items-center justify-center bg-[#F7F7F7] absolute top-6 right-6 p-1" onClick={()=>setShowModal(!showModal)}>
              <IoClose className="w-full h-full" />
            </button>
            <div className="w-full">
              <h1 className="text-[22px] font-bold">Password Protected</h1>
              <p className="text-base font-medium">
                To ensure security of your reports, please enter your password
                below to access this section.
              </p>
            </div>
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="password" className="text-base font-medium">
                Enter Password
              </label>
              <div className="w-full h-[52px] bg-[#F7F7F7] rounded-lg flex items-center justify-between px-4">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full h-full bg-transparent outline-none"
                />
                <button onClick={handleShowPassword}>
                  {showPassword ? (
                    <IoEyeOutline className="text-xl" />
                  ) : (
                    <FaRegEyeSlash className="text-xl" />
                  )}
                </button>
              </div>
              <div className="w-full text-end">
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-blue-600"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
            <button
              className="w-full rounded-lg py-3 text-white text-base font-bold bg-[#FF204E]"
              onClick={handleNavigate}
            >
              Unlock
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PasswordModal;
