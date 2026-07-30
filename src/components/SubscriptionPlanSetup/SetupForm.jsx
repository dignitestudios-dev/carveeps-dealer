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
    planType,
    setPlanType,
    isOneTime,
    setIsOneTime,
    formData,
    setFormData,
    handleInputChange,
    commissions,
  } = useContext(PlanCreationContext);

  // Calculate commission description for UI display
  let showCommissionInfo = false;
  let commissionVal = "";
  let commissionTypeLabel = "";

  if (commissions && duration) {
    showCommissionInfo = true;
    if (planType === "free") {
      commissionTypeLabel = "Fixed Amount";
      const settings = commissions.freeCommissionSettings || {};
      if (duration === "year") {
        commissionVal = `$${settings.yearlyAmount ?? 45}`;
      } else if (duration === "biannual") {
        commissionVal = `$${settings.biannualAmount ?? 25}`;
      } else if (duration === "month") {
        commissionVal = `$${settings.monthlyAmount ?? 5}`;
      } else {
        showCommissionInfo = false;
      }
    } else {
      const settings = commissions.commissionSettings || {};
      const type = settings.commissionType || "percentage";
      commissionTypeLabel = type === "percentage" ? "Percentage" : "Fixed Amount";
      
      let amount = 0;
      if (duration === "year") {
        amount = settings.yearlyAmount ?? 10;
      } else if (duration === "biannual") {
        amount = settings.biannualAmount ?? 10;
      } else if (duration === "month") {
        amount = settings.monthlyAmount ?? 10;
      } else {
        showCommissionInfo = false;
      }

      if (showCommissionInfo) {
        if (type === "percentage") {
          commissionVal = `${amount}%`;
          if (price && !isNaN(parseFloat(price))) {
            const calculatedCommissionCash = (parseFloat(price) * amount) / 100;
            commissionVal += ` ($${calculatedCommissionCash.toFixed(2)})`;
          }
        } else {
          commissionVal = `$${amount}`;
        }
      }
    }
  }
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
      <div className="flex flex-col items-start gap-1 lg:px-6 px-2 w-full">
        <label htmlFor="" className="text-[13px] font-medium">
          Plan Type
        </label>
        <select
          value={planType}
          onChange={(e) => {
            const val = e.target.value;
            setPlanType(val);
            handleInputChange({
              target: { name: "planType", value: val },
            });
            if (val === "free") {
              setPrice("0");
              handleInputChange({
                target: { name: "price", value: "0" },
              });
            } else {
              setPrice("");
              handleInputChange({
                target: { name: "price", value: "" },
              });
            }
          }}
          className="w-full bg-[#F7F7F7] h-[52px] rounded-[8px] text-[13px] placeholder:text-[#5C5C5C] text-black outline-none px-4 focus:ring-blue-500 focus:border-blue-500 block"
        >
          <option value="paid">Paid</option>
          <option value="free">Free</option>
        </select>
        <p className="text-xs font-medium text-[#5C5C5C]">
          Choose whether the subscription plan is paid or free
        </p>
      </div>

      {planType === "paid" ? (
        <div className="flex flex-col items-start gap-1 lg:px-6 px-2 w-full">
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
      ) : (
        <>
          {/* <div className="flex items-center gap-2 lg:px-6 px-2 w-full my-1">
            <input
              type="checkbox"
              id="isOneTime"
              checked={isOneTime}
              onChange={(e) => {
                setIsOneTime(e.target.checked);
                handleInputChange({
                  target: { name: "isOneTime", value: e.target.checked },
                });
              }}
              className="w-4 h-4 text-[#FF204E] focus:ring-[#FF204E] border-gray-300 rounded"
            />
            <label htmlFor="isOneTime" className="text-[13px] font-medium text-gray-800 cursor-pointer">
              One-Time Claim Only?
            </label>
          </div> */}
          {/* <p className="text-xs font-medium text-[#5C5C5C] lg:px-6 px-2 -mt-2">
            If enabled, a customer can only subscribe to this free plan once in their lifetime.
          </p> */}

          {/* <div className="lg:mx-6 mx-2 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-md w-[calc(100%-2rem)] lg:w-[calc(100%-3rem)]">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.63-1.515 2.63H3.72c-1.345 0-2.188-1.463-1.515-2.63L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-xs text-amber-700">
                  <strong>Warning:</strong> Creating a free subscription plan requires a connected payout bank account and a backup payment method. Creation will fail if either is missing.
                </p>
              </div>
            </div>
          </div> */}
        </>
      )}
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

      {showCommissionInfo && (
        <div className="mx-2 lg:mx-6 p-4 rounded-xl border border-[#ff204e]/20 bg-[#ff204e]/[0.02] flex items-center justify-between gap-4 transition-all">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
              Admin Commission ({commissionTypeLabel})
            </span>
            <p className="text-xs text-gray-600">
              The platform will deduct this commission amount from the payout.
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <span className="text-base font-extrabold text-[#ff204e]">
              {commissionVal}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetupForm;
