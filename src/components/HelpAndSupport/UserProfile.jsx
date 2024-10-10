import React from "react";

const UserProfile = () => {
  return (
    <div className="hidden lg:flex flex-col items-center gap-6 lg:pt-16 bg-white px-6 pb-20 rounded-xl h-[85vh]">
      <img
        src="https://s3-alpha-sig.figma.com/img/f5cb/6bdb/522c6e019011c18841a6f4d3954d95d0?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SYErpn6OdIXP28--G0lJwjmb4YXR9Okn~FCdZZDYQ2JuDpg-WcUB1dOV9g8HmiCG6o0HLG0QbCD3CXTeLD585V9W1eo3XegpQXcHQSIs6aHKYouWy3suqJiSCnaV0eEySnZaiWUfexd2SH656s5TlnXCVJHd0-chnkPhadm1JSIQBzTgSQov7N~rtlGWlTXfbClz6hmP7mLqC6e4TwOtTxWXiQr8QZ8BBMkQ0Vi8TNSNRzMphFQJyt3HlSkkiV74LiJsoXf23J~1-YF4grPXhaOsfA52PyX4bsnBJYYb-r7dMlGuHM7fN7QwSvfkh8O3P3coBXA-sB93yHELVngFxg__"
        alt=""
        className="w-[105px] h-[105px] rounded-full"
      />

      <div className="text-start w-full">
        <p className="text-[13px] text-start font-medium">Preview</p>
        <div className="w-full h-[152px] border border-[#CFCFCF] rounded-lg p-4 mt-1">
          <div className="w-[173px] bg-[#F7F7F7] rounded-lg text-xs px-3 py-2">
            Hi! How are you?
          </div>
          <div className="w-[200px] bg-[#F7F7F7] rounded-lg text-xs px-3 py-2 mt-2">
            I want to know about the Prices.
          </div>
          <div className="w-[122px] bg-[#FF4068] text-white float-end mt-3 rounded-lg text-xs px-3 py-2">
            Hi, I am good!
          </div>
        </div>
      </div>
      <div className="w-full">
        <p className="text-[13px] text-start font-medium">Colors</p>
        <div className="w-full flex flex-wrap gap-4 mt-2">
          <button className="border border-[#3DA2FF] w-[46px] h-[46px] bg-[#3DA2FF26] rounded-full cursor-pointer"></button>
          <button className="border border-[#3FB743] w-[46px] h-[46px] bg-[#3FB74326] rounded-full cursor-pointer"></button>
          <button className="border border-[#ee6b87] w-[46px] h-[46px] bg-[#FF4068] rounded-full cursor-pointer"></button>
          <button className="border border-[#9747FF] w-[46px] h-[46px] bg-[#9747FF26] rounded-full cursor-pointer"></button>
          <button className="border border-[#FFCC00] w-[46px] h-[46px] bg-[#FFCC0026] rounded-full cursor-pointer"></button>
          <button className="border border-[#df4f4f] w-[46px] h-[46px] bg-[#FF406826] rounded-full cursor-pointer"></button>
          <button className="border border-[#00FFF0] w-[46px] h-[46px] bg-[#00FFF021] rounded-full cursor-pointer"></button>
          <button className="border border-[#FF6B00] w-[46px] h-[46px] bg-[#FF6B0026] rounded-full cursor-pointer"></button>
          <button className="border border-[#1000CD] w-[46px] h-[46px] bg-[#1000CD26] rounded-full cursor-pointer"></button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
