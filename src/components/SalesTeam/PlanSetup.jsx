import React from "react";
import { ToyotaLogo } from "../../assets/export";

const PlanSetup = () => {
  return (
    <div className="w-full lg:w-[666px] py-6 bg-white flex flex-col gap-6 rounded-[18px]">
      <div className="flex items-center gap-6 lg:px-6">
        <img src={ToyotaLogo} alt="" className="w-[130px] h-[130px]" />
        <p className="text-[13px] font-medium text-[#FF204E] underline">
          Add Another Dealership Logo
        </p>
      </div>
      <div className="flex flex-col items-start gap-1 lg:px-6 px-2">
        <label htmlFor="" className="text-[13px] font-medium">
          Associate Salesperson
        </label>
        <select
          id="countries"
          className="w-full bg-[#F7F7F7] h-[52px] rounded-[8px] text-[13px] placeholder:text-[#5C5C5C] text-black outline-none px-4 focus:ring-blue-500 focus:border-blue-500 block"
        >
          <option selected>Select a salesperson</option>
          <option value="US">Salesperson 1</option>
          <option value="CA">Salesperson 2</option>
          <option value="FR">Salesperson 3</option>
          <option value="DE">Salesperson 4</option>
          <option value="DE">Salesperson 5</option>
          <option value="DE">Salesperson 6</option>
        </select>
        <p className="text-xs font-medium text-[#5C5C5C]">
          Select a salesperson to manage sales for this subscription plan.
        </p>
      </div>
      <div className="flex flex-col items-start gap-1 lg:px-6 px-2">
        <label htmlFor="" className="text-[13px] font-medium">
          Plan Name
        </label>
        <input
          type="text"
          className="w-full bg-[#F7F7F7] h-[52px] rounded-[8px] text-[13px] placeholder:text-[#5C5C5C] text-black outline-none px-4"
        />
        <p className="text-xs font-medium text-[#5C5C5C]">
          Select a salesperson to manage sales for this subscription plan.
        </p>
      </div>
      <div className="flex flex-col items-start gap-1 lg:px-6 px-2">
        <label htmlFor="" className="text-[13px] font-medium">
          Plan description{" "}
          <span className="text-[#5C5C5C] text-xs">(Optional)</span>
        </label>
        <input
          type="text"
          className="w-full bg-[#F7F7F7] h-[52px] rounded-[8px] text-[13px] placeholder:text-[#5C5C5C] text-black outline-none px-4"
        />
        <p className="text-xs font-medium text-[#5C5C5C]">
          Create a detailed description to inform users about the unique
          features and benefits of your plan.
        </p>
      </div>
      <div className="flex flex-col items-start gap-1 lg:px-6 px-2">
        <label htmlFor="" className="text-[13px] font-medium">
          Subscription Fee
        </label>
        <input
          type="text"
          className="w-full bg-[#F7F7F7] h-[52px] rounded-[8px] text-[13px] placeholder:text-[#5C5C5C] text-black outline-none px-4"
        />
        <p className="text-xs font-medium text-[#5C5C5C]">
          Specify teh subscription fee for the plan
        </p>
      </div>
      <div className="flex flex-col items-start gap-1 lg:px-6 px-2">
        <label htmlFor="" className="text-[13px] font-medium">
          Subscription Duration
        </label>
        <select
          id="countries"
          className="w-full bg-[#F7F7F7] h-[52px] rounded-[8px] text-[13px] placeholder:text-[#5C5C5C] text-black outline-none px-4 focus:ring-blue-500 focus:border-blue-500 block "
        >
          <option selected>Choose a duration</option>
          <option value="US">Annual</option>
          <option value="CA">Bi-annual</option>
          <option value="FR">Monthly</option>
        </select>
        <p className="text-xs font-medium text-[#5C5C5C]">
          Select the subscription option that suits you best
        </p>
      </div>
    </div>
  );
};

export default PlanSetup;
