import React, { useContext, useState } from "react";
import { styles } from "../../styles/styles";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import PasswordModal from "./PasswordModal";
import Error from "../Global/Error";
import Cookies from "js-cookie";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";
import BtnLoader from "../Global/BtnLoader";

const ReportAccess = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [pass, setPass] = useState("");
  const [rePass, setRePass] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { navigateToLink, baseUrl, fetchToken } = useContext(GlobalContext);
  const [response, setResponse] = useState({ status: null, stripe: null });
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
    if (token) {
      if (pass == "") {
        setError("Password cannot be left empty.");
      } else if (rePass == "") {
        setError("You must re-enter the password.");
      } else if (pass !== rePass) {
        setError("Passwords must match.");
      } else {
        setLoading(true);
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        axios
          .post(
            `${baseUrl}/dealership/addAccessKey`,
            {
              accessKey: pass,
            },
            { headers }
          )
          .then(
            (response) => {
              const data = response?.data?.data;
              console.log(response);
              Cookies.set("isAccessKeyAdded", true, { expires: 7 });
              setResponse({
                status: response?.data?.data?.stripeProfileStatus,
                stripe: response?.data?.data?.isStripeProfileCompleted,
              });
              Cookies?.set("dealershipId", data?.dealership?._id);
              Cookies?.set("dealershipLogo", data?.dealership?.logo);
              Cookies?.set("dealershipName", data?.dealership?.name);
              Cookies?.set("dealershipEmail", data?.dealership?.email);
              handleShowModal();
              setLoading(false);
            },
            (error) => {
              setLoading(false);
              setError(error?.response?.data?.message);
            }
          );
      }
    }
  };

  const handleShowModal = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      {error && <Error error={error} setError={setError} />}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-6 flex flex-col gap-6 h-auto lg:h-screen relative"
      >
        <h1 className="font-bold text-[18px]">Reports Access</h1>
        <div
          className={`rounded-lg p-4 lg:p-6 ${styles.bodyBg} flex flex-col items-center justify-center gap-3`}
        >
          <h1 className="font-bold text-[18px]">Note</h1>
          <p className="font-medium text-[18px] text-center">
            This password grants access to the Financial, Reporting and Profile
            section of the platform. By setting a separate password for these
            sections, you add an extra layer of security to protect sensitive
            information
          </p>
        </div>
        <div className="w-full border mt-4" />
        <div className="w-full flex flex-col xl:flex-row items-center justify-between gap-6 mb-28 lg:mb-0">
          <div className="w-full xl:w-[432px] flex flex-col items-start gap-2">
            <label htmlFor="password" className="text-base font-medium">
              Password
            </label>
            <div
              className={`h-[60px] xl:w-[432px] flex items-center justify-between w-full bg-[#EDEDED] rounded-lg px-4`}
            >
              <input
                type={`${showPassword ? "password" : "text"}`}
                placeholder="Enter Password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className={`w-full bg-transparent h-full rounded-lg outline-none text-base text-[#606060]`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <IoEyeOutline className="w-[20px] h-[16px]" />
                ) : (
                  <IoEyeOffOutline className="w-[20px] h-[16px]" />
                )}
              </button>
            </div>
          </div>
          <div className="w-full xl:w-[432px] flex flex-col items-start gap-2">
            <label htmlFor="password" className="text-base font-medium">
              Confirm Password
            </label>
            <div
              className={`h-[60px] xl:w-[432px] flex items-center justify-between w-full bg-[#EDEDED] rounded-lg px-4`}
            >
              <input
                type={`${showPassword ? "password" : "text"}`}
                placeholder="Enter Password"
                value={rePass}
                onChange={(e) => setRePass(e.target.value)}
                className={`w-full bg-transparent h-full rounded-lg outline-none  text-base text-[#606060]`}
              />
              <button
                type="button"
                onClick={() => setShowPassword2(!showPassword2)}
              >
                {showPassword2 ? (
                  <IoEyeOutline className="w-[20px] h-[16px]" />
                ) : (
                  <IoEyeOffOutline className="w-[20px] h-[16px]" />
                )}
              </button>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className={`${styles.bgOrange} text-white font-medium text-base rounded-lg w-[250px] h-[50px] absolute bottom-6 right-6`}
        >
          {loading ? <BtnLoader /> : "Save"}
        </button>
      </form>
      <PasswordModal
        showModal={showModal}
        setShowModal={setShowModal}
        status={response?.status}
        stripe={response?.stripe}
      />
    </>
  );
};

export default ReportAccess;
