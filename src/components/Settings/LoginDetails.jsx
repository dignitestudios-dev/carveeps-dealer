import React, { useContext, useState } from "react";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import ResetPasswordModal from "./ResetPasswordModal";
import Cookies from "js-cookie";
import axios from "axios";
import Success from "../Global/Success";
import { GlobalContext } from "../../context/GlobalContext";

const LoginDetails = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const { baseUrl, setError } = useContext(GlobalContext);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const [passLoading, setPassLoading] = useState(false);
  const updatePassword = () => {
    setPassLoading(true);
    if (Cookies?.get("dealershipEmail")) {
      axios
        .post(`${baseUrl}/auth/forgotDealership`, {
          email: Cookies?.get("dealershipEmail"),
          role: "dealership",
        })
        .then((response) => {
          setSuccess(
            "A Password reset link has been sent on to your registered email."
          );
          setPassLoading(false);
        })
        .catch((error) => {
          setError(error?.response?.data?.message);
          setPassLoading(false);
        });
    } else {
      setError("we are unable to find your email kindly relogin.");
      setPassLoading(false);
    }
  };

  const [accessLoading, setAccessLoading] = useState(false);
  const updateAccessKey = () => {
    setAccessLoading(true);

    if (Cookies?.get("token")) {
      const headers = {
        Authorization: `Bearer ${Cookies.get("token")}`,
      };
      axios
        .get(`${baseUrl}/auth/forgotAccessKey`, {
          headers,
        })
        .then((response) => {
          setSuccess(
            "An Access Key reset link has been sent on to your registered email."
          );
          setAccessLoading(false);
        })
        .catch((error) => {
          setError(error?.response?.data?.message);
          setAccessLoading(false);
        });
    } else {
      Cookies.remove("token");
      setAccessLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-20 px-4 lg:px-0">
      {success && <Success setSuccess={setSuccess} success={success} />}
      <div className="">
        <h1 className="text-[24px] font-bold">Login Details</h1>
        <p className="text-xs">
          Please note that for security reasons. Login details cannot be edited
          directly. If you need to make any changes to your login information,
          please contact the admin for assistance.
        </p>
      </div>
      <div className="w-full flex flex-col gap-5">
        {/* <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-1">
            <label htmlFor="First name" className="text-sm font-medium">
              First name
            </label>
            <input
              type="text"
              className="w-full md:w-[350px] bg-[#F7F7F7] rounded-xl text-base h-[60px] outline-none px-4"
              placeholder="Aria"
            />
          </div>
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-1">
            <label htmlFor="First name" className="text-sm font-medium">
              Last name
            </label>
            <input
              type="text"
              className="w-full md:w-[350px] bg-[#F7F7F7] rounded-xl text-base h-[60px] outline-none px-4"
              placeholder="Jacob"
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            type="text"
            className="w-full bg-[#F7F7F7] rounded-xl text-base h-[60px] outline-none px-4"
            placeholder="aria.jacob@gmail.com"
          />
        </div>
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <div className="w-full bg-[#F7F7F7] rounded-xl h-[60px] flex items-center justify-between px-4 gap-2">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full bg-[#F7F7F7] rounded-xl text-base h-full outline-none"
              placeholder="......"
            />
            <button onClick={handleShowPassword}>
              {showPassword ? (
                <FiEye className="w-4 h-4" />
              ) : (
                <FiEyeOff className="w-4 h-4" />
              )}
            </button>
          </div>
         
        </div> */}
        <div className="text-end">
          <button
            onClick={updatePassword}
            className="text-[#167EFB] text-base font-medium"
          >
            {passLoading ? "Requesting" : " Request to change password"}
          </button>
        </div>
      </div>

      <div className="w-full border mt-6" />
      <div>
        <h1 className="text-[24px] font-bold">
          Password Reset for Essential Sections
        </h1>
        <p className="my-3">
          For added security measures, you have the option to reset your
          password for the <span className="font-semibold">Reports</span>,{" "}
          <span className="font-semibold">Payment Gateway</span>, and{" "}
          <span className="font-semibold">Profile</span> sections. To reset your
          password for these sections, please cklick on the lik below:
        </p>
        <div className="text-end">
          <button
            onClick={updateAccessKey}
            className="text-[#167EFB] text-base font-medium"
          >
            {accessLoading ? "Requesting" : "Request to change access key"}
          </button>
        </div>
        {/* <button className="text-[#167EFB] text-base font-medium" onClick={handleShowModal}>
          Reset Password
        </button>
        <ResetPasswordModal
          showModal={showModal}
          setShowModal={setShowModal}
          onclick={handleShowModal}
        /> */}
      </div>
    </div>
  );
};

export default LoginDetails;
