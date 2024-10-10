import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import Cookies from "js-cookie";
import { GlobalContext } from "../../context/GlobalContext";
import BtnLoader from "../Global/BtnLoader";

const PasswordModal = ({ showModal, setShowModal, onclick, url }) => {
  const {
    setIsAuthenticated,
    navigateToLink,
    handleShowModal,
    baseUrl,
    setError,
  } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNavigate = (e) => {
    e.preventDefault();
    // navigateToLink(url);
    // When the api returns true response
    const token = Cookies.get("token");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      if (password == "") {
        setError("Password cannot be left empty.");
      } else {
        setLoading(true);

        axios
          .post(
            `${baseUrl}/dealership/verify`,
            {
              accessKey: password,
            },
            { headers }
          )
          .then((response) => {
            setIsAuthenticated(true);
            setLoading(false);
          })
          .catch((error) => {
            if (error?.response?.status == 401) {
              Cookies.remove("token");
              navigateToLink("/login", "Login");
            }
            setError(error?.response?.data?.message);
            setLoading(false);
          });
      }
    } else {
      navigateToLink("/login", "Login");
    }
  };

  return (
    <div className="w-screen h-screen fixed top-0  right-0 flex items-center justify-center z-50 bg-[rgba(0,0,0,0.4)]">
      <form
        onSubmit={handleNavigate}
        className="bg-white rounded-[18px] px-8 py-7 w-[90%] lg:w-[490px] h-auto flex flex-col items-start justify-start gap-5 relative"
      >
        <button
          type="button"
          className="w-7 h-7 rounded-full flex items-center justify-center bg-[#F7F7F7] absolute top-6 right-6 p-1"
          onClick={() => navigateToLink("/dashboard", "Dashboard")}
        >
          <IoClose className="w-full h-full" />
        </button>
        <div className="w-full">
          <h1 className="text-[22px] font-bold">Password Protected</h1>
          <p className="text-base font-medium">
            To ensure security of your reports, please enter your password below
            to access this section.
          </p>
        </div>
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="password" className="text-base font-medium">
            Enter Password
          </label>
          <div className="w-full h-[52px] bg-[#F7F7F7] rounded-lg flex items-center justify-between px-4">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-full bg-transparent outline-none"
            />
            <button type="button" onClick={handleShowPassword}>
              {showPassword ? (
                <IoEyeOutline className="text-xl" />
              ) : (
                <FaRegEyeSlash className="text-xl" />
              )}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full rounded-lg py-3 text-white text-base font-bold bg-[#FF204E]"
          // onClick={handleNavigate}
        >
          {loading ? <BtnLoader /> : "Unlock"}
        </button>
      </form>
    </div>
  );
};

export default PasswordModal;
