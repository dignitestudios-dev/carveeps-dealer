import React, { useContext, useState, useEffect } from "react";
import { styles } from "../styles/styles";
import Button from "../components/Global/Button";
import { useNavigate } from "react-router";
import { LoginImage, LoginMockup } from "../assets/export";
import { GlobalContext } from "../context/GlobalContext";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import Cookies from "js-cookie";
import axios from "axios";
import { validateEmail } from "../utils/validators";
import Error from "../components/Global/Error";
import BtnLoader from "../components/Global/BtnLoader";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const { navigateToLink, baseUrl, error, setError, fetchToken } =
    useContext(GlobalContext);

  const [isPassVisible, setIsPassVisible] = useState(false);
  // Error States
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [formError, setFormError] = useState(false);
  // Loading States
  const [loading, setLoading] = useState(false);
  // States to manage the data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    if (email == "") {
      setEmailError("Email is required.");
      setTimeout(() => {
        setEmailError(false);
      }, 3000);
    } else if (!validateEmail(email)) {
      setEmailError("Email not in correct format.");
      setTimeout(() => {
        setEmailError(false);
      }, 3000);
    } else if (password == "") {
      setPasswordError("Password is required.");
      setTimeout(() => {
        setPasswordError(false);
      }, 3000);
    } else if (password.length < 6) {
      setPasswordError("Minimum password length is 6.");
      setTimeout(() => {
        setPasswordError(false);
      }, 3000);
    } else {
      setLoading(true);
      axios
        .post(`${baseUrl}/auth/signIn`, {
          email: email,
          password: password,
          role: "dealership",
        })
        .then(
          (response) => {
            console.log(response);
            if (response?.data?.data?.token) {
              const data = response?.data?.data;
              Cookies.set("token", data?.token, { expires: 7 });
              Cookies.set("isProfileCompleted", data?.isProfileCompleted, {
                expires: 7,
              });
              Cookies.set(
                "isStripeProfileCompleted",
                data?.isStripeProfileCompleted,
                { expires: 7 }
              );

              Cookies.set("isAccessKeyAdded", data?.isAccessKeyAdded, {
                expires: 7,
              });

              if (
                data?.isProfileCompleted &&
                data?.isStripeProfileCompleted &&
                data?.isAccessKeyAdded
              ) {
                Cookies?.set("dealershipId", data?.dealership?._id);
                Cookies?.set("dealershipLogo", data?.dealership?.logo);
                Cookies?.set("dealershipName", data?.dealership?.name);
                Cookies?.set("dealershipEmail", data?.dealership?.email);

                fetchToken().then(() => {
                  navigateToLink("/dashboard", "Dashboard");
                });
              } else if (
                data?.isProfileCompleted &&
                data?.isStripeProfileCompleted == false &&
                data?.isAccessKeyAdded == false
              ) {
                Cookies?.set("dealershipId", data?.dealership?._id);
                Cookies?.set("dealershipLogo", data?.dealership?.logo);
                Cookies?.set("dealershipName", data?.dealership?.name);
                Cookies?.set("dealershipEmail", data?.dealership?.email);

                // New stripe:
                const headers = {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${data?.token}`,
                };
                axios
                  .post(
                    `${baseUrl}/dealership/completeStripeProfile`,
                    {},
                    {
                      headers,
                    }
                  )
                  .then((res) => {
                    console.log("res", res);
                    window.location.href = res?.data?.data?.url;
                  })
                  .catch((err) => {
                    setFormError(err?.response?.data?.message);
                  });

                // navigateToLink("/complete-stripe-profile", "Profile Setup");
              } else if (
                data?.isProfileCompleted &&
                data?.isStripeProfileCompleted == false &&
                data?.isAccessKeyAdded
              ) {
                Cookies?.set("dealershipId", data?.dealership?._id);
                Cookies?.set("dealershipLogo", data?.dealership?.logo);
                Cookies?.set("dealershipName", data?.dealership?.name);
                Cookies?.set("dealershipEmail", data?.dealership?.email);

                // New stripe:
                const headers = {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${data?.token}`,
                };
                axios
                  .post(
                    `${baseUrl}/dealership/completeStripeProfile`,
                    {},
                    {
                      headers,
                    }
                  )
                  .then((res) => {
                    console.log("res", res);
                    window.location.href = res?.data?.data?.url;
                  })
                  .catch((err) => {
                    setFormError(err?.response?.data?.message);
                  });

                // navigateToLink("/complete-stripe-profile", "Profile Setup");
              } else if (
                data?.isProfileCompleted &&
                data?.isStripeProfileCompleted &&
                data?.isAccessKeyAdded == false
              ) {
                Cookies?.set("dealershipId", data?.dealership?._id);
                Cookies?.set("dealershipLogo", data?.dealership?.logo);
                Cookies?.set("dealershipName", data?.dealership?.name);
                Cookies?.set("dealershipEmail", data?.dealership?.email);

                navigateToLink("/report-access", "Profile Setup");
              } else if (
                data?.isProfileCompleted == false &&
                data?.isStripeProfileCompleted == false &&
                data?.isAccessKeyAdded == false
              ) {
                navigateToLink("/profile-setup", "Profile Setup");
              }
            }
            setLoading(false);
          },
          (error) => {
            setLoading(false);
            setFormError(error?.response?.data?.message);
          }
        );
    }
  }

  // useEffect(() => {
  //   const token = Cookies.get("token");
  //   const isBankAccountAdded = Cookies.get("isBankAccountAdded") === "true";
  //   const isProfileCompleted = Cookies.get("isProfileCompleted") === "true";
  //   const isStripeProfileCompleted =
  //     Cookies.get("isStripeProfileCompleted") === "true";
  //   const isAccessKeyAdded = Cookies.get("isAccessKeyAdded") === "true";

  //   if (
  //     token &&
  //     isBankAccountAdded &&
  //     isProfileCompleted &&
  //     isStripeProfileCompleted &&
  //     isAccessKeyAdded
  //   ) {
  //     navigateToLink("/dashboard", "Dashboard");
  //   } else if (
  //     token &&
  //     !isProfileCompleted &&
  //     !isStripeProfileCompleted &&
  //     !isBankAccountAdded &&
  //     !isAccessKeyAdded
  //   ) {
  //     navigateToLink("/profile-setup", "Profile Setup");
  //   } else if (
  //     token &&
  //     isProfileCompleted &&
  //     !isStripeProfileCompleted &&
  //     isBankAccountAdded &&
  //     !isAccessKeyAdded
  //   ) {
  //     navigateToLink("/complete-stripe-profile", "Profile Setup");
  //   } else if (
  //     token &&
  //     isProfileCompleted &&
  //     !isStripeProfileCompleted &&
  //     isBankAccountAdded &&
  //     isAccessKeyAdded
  //   ) {
  //     // navigateToLink("/complete-stripe-profile", "Profile Setup");
  //     // Show Modal here
  //     console.log("show modal here");
  //   } else if (
  //     token &&
  //     isProfileCompleted &&
  //     !isStripeProfileCompleted &&
  //     !isBankAccountAdded &&
  //     !isAccessKeyAdded
  //   ) {
  //     navigateToLink("/complete-stripe-profile", "Profile Setup");
  //   } else if (
  //     isProfileCompleted &&
  //     isStripeProfileCompleted &&
  //     !isBankAccountAdded &&
  //     !isAccessKeyAdded
  //   ) {
  //     navigateToLink("/payment", "Profile Setup");
  //   } else if (
  //     isProfileCompleted &&
  //     isStripeProfileCompleted &&
  //     isBankAccountAdded &&
  //     !isAccessKeyAdded
  //   ) {
  //     navigateToLink("/report-access", "Profile Setup");
  //   }
  // }, []);

  return (
    <div className={`w-full h-screen flex ${styles.bodyBg}`}>
      {/* Email Error */}
      {emailError && <Error error={emailError} setError={setEmailError} />}
      {error && <Error error={error} setError={setError} />}
      {/* Password Error */}
      {passwordError && (
        <Error error={passwordError} setError={setPasswordError} />
      )}
      {/* Form Error */}
      {formError && <Error error={formError} setError={setFormError} />}
      <div className="w-full lg:w-[50%] md:h-full flex justify-center items-center bg-gray-100 lg:bg-transparent px-6">
        <form
          onSubmit={handleLogin}
          className="w-full lg:w-[432px] flex flex-col items-start justify-center gap-y-6 bg-white lg:bg-transparent p-8 rounded-lg"
        >
          <h1 className="text-[36px] font-bold">Log In</h1>
          <div className="w-full flex flex-col items-start gap-y-4">
            <div className="flex w-full flex-col gap-2">
              <label htmlFor="email" className="font-medium text-base">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border w-full text-base font-normal h-[54px] rounded-lg px-4 bg-[#EDEDED] outline-none"
                placeholder="info.abcautocare.com"
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <label htmlFor="password" className="font-medium text-base">
                Password
              </label>
              <div className="border w-full rounded-lg flex items-center bg-[#EDEDED]">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-base font-normal h-[54px] rounded-lg px-4 bg-[#EDEDED] outline-none"
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="px-4"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <LuEye /> : <LuEyeOff />}
                </button>
              </div>
            </div>
            <div className="w-full flex justify-end items-center -mb-6 -mt-2 font-medium">
              <button
                type="button"
                onClick={() => navigateToLink("/update-email")}
                className="text-sm text-blue-600"
              >
                Forgot Password?
              </button>
            </div>
            <div className="mt-4 w-full">
              <button
                type="submit"
                className={`${styles.bgOrange} text-white w-full h-[52px] font-bold text-base rounded-lg`}
              >
                {loading ? <BtnLoader /> : "Log in"}
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="w-[0%] bg-gray-100 lg:w-[50%]  md:h-full ">
        <img src={LoginMockup} alt="login-image" className="w-full h-screen " />
      </div>
    </div>
  );
};

export default Login;
