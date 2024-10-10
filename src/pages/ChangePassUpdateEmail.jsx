import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import axios from "axios";
import Cookies from "js-cookie";
import Success from "../components/Global/Success";
import Error from "../components/Global/Error";
import BtnLoader from "../components/Global/BtnLoader";

const ChangePassUpdateEmail = () => {
  const { navigate } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const { baseUrl, setError, error, navigateToLink } =
    useContext(GlobalContext);
  const [success, setSuccess] = useState(false);
  const updatePassword = () => {
    setLoading(true);
    if (email) {
      axios
        .post(`${baseUrl}/auth/forgotDealership`, {
          email: email,
          role: "dealership",
        })
        .then((response) => {
          setSuccess(
            "A Password reset link has been sent on to your registered email."
          );
          setTimeout(() => {
            navigateToLink("/login");
          }, 3000);
          setLoading(false);
        })
        .catch((error) => {
          setError(error?.response?.data?.message);
          setLoading(false);
        });
    } else {
      setError("Email cannot be left empty.");
      setLoading(false);
    }
  };
  return (
    <main
      id="content"
      role="main"
      class="w-full h-screen flex items-center justify-center flex-col bg-white mx-auto p-6"
    >
      {success && <Success setSuccess={setSuccess} success={success} />}
      {error && <Error setError={setError} error={error} />}
      <div class="mt-7 bg-white w-96  rounded-xl   border-2 border-[#ff204d74]">
        <div class="p-4 sm:p-7">
          <div class="text-center">
            <h1 class="block text-2xl font-bold text-gray-800 ">
              Forgot password?
            </h1>
            <p class="mt-2 text-sm text-gray-600 ">
              Remember your password?
              <button
                class="text-[#FF204E] decoration-2 ml-1 hover:underline font-medium"
                onClick={() => navigate("/login")}
              >
                Login here
              </button>
            </p>
          </div>

          <div class="mt-5">
            <div>
              <div class="grid gap-y-4">
                <div>
                  <label for="email" class="block text-sm font-bold ml-1 mb-2 ">
                    Email address
                  </label>
                  <div class="relative">
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                      class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                      aria-describedby="email-error"
                    />
                  </div>
                  <p
                    class="text-center text-xs text-gray-500 mt-2"
                    id="email-error"
                  >
                    Please include a valid email address so that we can send a
                    password reset link to your email
                  </p>
                </div>
                <button
                  type="button"
                  onClick={updatePassword}
                  class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#FF204E] text-white hover:bg-[#ff204de2] focus:outline-none focus:ring-2 focus:ring-[#FF204E] focus:ring-offset-2 transition-all text-sm "
                >
                  {loading ? <BtnLoader /> : "Reset Password"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ChangePassUpdateEmail;
