import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import { GlobalContext } from "../context/GlobalContext";
import Success from "../components/Global/Success";
import Error from "../components/Global/Error";
import axios from "axios";
import Cookies from "js-cookie";
import BtnLoader from "../components/Global/BtnLoader";
import { LuEye, LuEyeOff } from "react-icons/lu";

const AccessKeyUpdateKey = () => {
  const { id } = useParams();

  const [passLoading, setPassLoading] = useState(false);
  const [pass, setPass] = useState("");

  const [success, setSuccess] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const { baseUrl, setError, error, navigate } = useContext(GlobalContext);

  const sendAccessKey = (e) => {
    e.preventDefault();
    setPassLoading(true);
    if (id) {
      axios
        .post(`${baseUrl}/auth/updateDealershipAccessKey`, {
          token: id,
          accessKey: pass,
        })
        .then((response) => {
          setSuccess("Access Key updated successfully.");
          setTimeout(() => {
            Cookies.remove("token");
            navigate("/login");
          }, 3000);
          setPassLoading(false);
        })
        .catch((error) => {
          setError(error?.response?.data?.message);
          setPassLoading(false);
        });
    } else {
      setError("Id not provided.");
      setPassLoading(false);
    }
  };
  return (
    <main
      id="content"
      role="main"
      class="w-full h-screen bg-white flex items-center justify-center flex-col   mx-auto p-6"
    >
      {success && <Success setSuccess={setSuccess} success={success} />}
      {error && <Error setError={setError} error={error} />}

      <div class="mt-7 bg-white w-96  rounded-xl shadow-lg   border-2 border-[#ff204d70]">
        <div class="p-4 sm:p-7">
          <div class="text-center">
            <h1 class="block text-2xl font-bold text-gray-800 ">
              Update Access Key
            </h1>
          </div>

          <div class="mt-5">
            <form onSubmit={sendAccessKey}>
              <div class="grid gap-y-4">
                <div>
                  <label for="email" class="block text-sm font-bold ml-1 mb-2 ">
                    New Access Key
                  </label>
                  <div class="relative">
                    <div className="border w-full rounded-lg flex items-center bg-[#EDEDED]">
                      <input
                        type={showPass ? "text" : "password"}
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
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
                  <p class="hidden text-xs text-red-600 mt-2" id="email-error">
                    Please include a valid email address so that we can send a
                    password reset link to your email
                  </p>
                </div>
                <button
                  type="submit"
                  class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#FF204E] text-white hover:bg-[#ff204de2] focus:outline-none focus:ring-2 focus:ring-[#FF204E] focus:ring-offset-2 transition-all text-sm "
                >
                  {passLoading ? <BtnLoader /> : "Update Access Key"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AccessKeyUpdateKey;
