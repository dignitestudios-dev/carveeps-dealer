import React, { useEffect } from "react";

const Success = ({ success, setSuccess }) => {
  useEffect(() => {
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  }, []);
  return (
    <div
      class={`min-w-96 animate-bounce z-[100000]  max-w-96 bg-white border border-gray-200 transition-all duration-300 rounded-xl fixed bottom-2 right-2 shadow-lg ${
        success ? "translate-x-0" : "translate-x-96"
      } `}
      role="alert"
    >
      <div class="flex p-4">
        <div class="flex-shrink-0">
          <svg
            class="flex-shrink-0 size-4 text-green-500 mt-0.5"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
          </svg>
        </div>
        <div class="ms-3">
          <p class="text-sm text-gray-700 ">{success}</p>
        </div>
      </div>
    </div>
  );
};

export default Success;
