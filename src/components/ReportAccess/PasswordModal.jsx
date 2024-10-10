import React from "react";
import { styles } from "../../styles/styles";
import { useNavigate } from "react-router";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import Cookies from "js-cookie";

const PasswordModal = ({ showModal, setShowModal, status, stripe }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    if (status == "completed" && stripe == true) {
      navigate("/dashboard");
    } else if (status == "in-review" && stripe == false) {
      console.log("show modal here");
      Cookies.remove("token");
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  };
  return (
    <>
      {showModal && (
        <div className="w-full h-screen fixed top-0 right-0 bottom-0 left-0 bg-[#0F0F0F80] flex items-center justify-center z-30">
          <div className="bg-white w-full md:w-[455px] h-[282px] flex flex-col items-center justify-center rounded-lg relative px-5 gap-3">
            <button
              onClick={() => handleClose()}
              className={`w-[30px] h-[30px] ${styles.bodyBg} flex items-center justify-center absolute right-6 top-6 rounded-full`}
            >
              <IoClose className="w-[14px] h-[14px]" />
            </button>
            <div
              className={`${styles.bgOrange} w-[84px] h-[84px] rounded-full flex items-center justify-center`}
            >
              <FaCheck className="text-white w-[48.58px] h-[48.58px]" />
            </div>
            <h1 className="text-[22px] font-bold">Password Setup Complete</h1>
            <p className="text-base font-medium text-center">
              You've successfully set up passwords to secure access to your
              Reports, Payment Gateway, and Profile sections. Your account is
              now fully protected, ensuring the confidentiality of your data and
              transactions.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default PasswordModal;
