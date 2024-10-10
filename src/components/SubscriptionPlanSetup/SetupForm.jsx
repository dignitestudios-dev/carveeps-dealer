import React from "react";
import { ToyotaLogo } from "../../assets/export";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { PlanCreationContext } from "../../context/PlanCreationContext";
import { useParams } from "react-router";

const SetupForm = ({ team }) => {
  const {
    planName,
    setPlanDesc,
    setPlanName,
    planDesc,
    duration,
    setDuration,
    salesPerson,
    setSalesPerson,
    price,
    setPrice,
    formData,
    setFormData,
    handleInputChange,
  } = useContext(PlanCreationContext);
  const { salesPersonId } = useParams();
  console.log(salesPerson);
  return (
    <div className="w-full lg:w-[666px] py-6 bg-white flex flex-col gap-6 rounded-[18px]">
      {/* <div className="flex items-center gap-6 lg:px-6">
        <img src={ToyotaLogo} alt="" className="w-[130px] h-[130px]" />
        <p className="text-[13px] font-medium text-[#FF204E] underline">
          Add Another Dealership Logo
        </p>
      </div> */}
      {
        <div className="flex flex-col items-start gap-1 lg:px-6 px-2">
          <label htmlFor="" className="text-[13px] font-medium">
            Associate Salesperson
          </label>
          <select
            id="salesPerson"
            value={salesPerson}
            onChange={(e) => {
              const selectedId = e.target.value;
              const selectedPerson = team.find(
                (person) => person._id === selectedId
              );
              setSalesPerson(e.target.value);
              handleInputChange({
                target: { name: "salesPerson", value: selectedPerson },
              });
            }}
            className="w-full bg-[#F7F7F7] h-[52px] rounded-[8px] text-[13px] placeholder:text-[#5C5C5C] text-black outline-none px-4 focus:ring-blue-500 focus:border-blue-500 block "
          >
            <option value={""}>Select a salesperson</option>
            {team?.map((person, key) => {
              return (
                <option key={key} value={person?._id}>
                  {person?.name}
                </option>
              );
            })}
          </select>
          {/* <input
        type="text"
        className="w-full bg-[#F7F7F7] h-[52px] rounded-[8px] text-[13px] placeholder:text-[#5C5C5C] text-black outline-none px-4"
      /> */}
          <p className="text-xs font-medium text-[#5C5C5C]">
            Select a salesperson to manage sales for this subscription plan.
          </p>
        </div>
      }

      <div className="flex flex-col items-start gap-1 lg:px-6 px-2">
        <label htmlFor="" className="text-[13px] font-medium">
          Plan Name
        </label>
        <input
          type="text"
          value={planName}
          maxLength={22}
          onChange={(e) => {
            setPlanName(e.target.value);
            handleInputChange({
              target: { name: "planName", value: e.target.value },
            });
          }}
          className="w-full bg-[#F7F7F7] h-[52px] rounded-[8px] text-[13px] placeholder:text-[#5C5C5C] text-black outline-none px-4"
        />
        <p className="text-xs font-medium text-[#5C5C5C]">
          Select a salesperson to manage sales for this subscription plan.
        </p>
      </div>

      <div className="flex flex-col items-start gap-1 lg:px-6 px-2">
        <label htmlFor="" className="text-[13px] font-medium">
          Plan description{" "}
          {/* <span className="text-[#5C5C5C] text-xs">(Optional)</span> */}
        </label>
        <input
          type="text"
          value={planDesc}
          onChange={(e) => {
            setPlanDesc(e.target.value);
            handleInputChange({
              target: { name: "planDescription", value: e.target.value },
            });
          }}
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
          value={price}
          onChange={(e) => {
            const inputValue = e.target.value;

            // Check if the input is a valid number
            const parsedValue = parseFloat(inputValue);

            // Allow empty input or valid number less than or equal to 10999.99
            if (
              inputValue === "" || // Allow empty input
              (parsedValue >= 0 &&
                parsedValue <= 10999.99 &&
                !isNaN(parsedValue)) // Valid range
            ) {
              setPrice(inputValue);
              handleInputChange({
                target: { name: "price", value: inputValue },
              });
            }
          }}
          className="w-full bg-[#F7F7F7] h-[52px] rounded-[8px] text-[13px] placeholder:text-[#5C5C5C] text-black outline-none px-4"
        />
        <p className="text-xs font-medium text-[#5C5C5C]">
          Specify the subscription fee for the plan
        </p>
      </div>
      <div className="flex flex-col items-start gap-1 lg:px-6 px-2">
        <label htmlFor="" className="text-[13px] font-medium">
          Subscription Duration
        </label>
        <select
          id="countries"
          value={duration}
          onChange={(e) => {
            setDuration(e.target.value);
            handleInputChange({
              target: { name: "duration", value: e.target.value },
            });
          }}
          className="w-full bg-[#F7F7F7] h-[52px] rounded-[8px] text-[13px] placeholder:text-[#5C5C5C] text-black outline-none px-4 focus:ring-blue-500 focus:border-blue-500 block"
        >
          <option selected value="">
            Select a duration
          </option>
          <option value="year">Annually</option>
          <option value="biannual">Biannually</option>
          <option value="month">Monthly</option>
        </select>
        <p className="text-xs font-medium text-[#5C5C5C]">
          Select the subscription option that suits you best
        </p>
      </div>
    </div>
  );
};

export default SetupForm;
