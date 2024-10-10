import React, { useContext } from "react";
import { ToyotaLogo } from "../../assets/export";
import { PlanCreationContext } from "../../context/PlanCreationContext";
import Cookies from "js-cookie";
const Review = () => {
  const { formData, selectedServices, duration } =
    useContext(PlanCreationContext);
  console.log(selectedServices);
  return (
    <>
      <div className="bg-white rounded-[18px] p-6 w-full lg:w-[666px] h-[777px] overflow-y-auto flex flex-col gap-4">
        <h1 className="text-lg font-bold">Review</h1>
        <div className="w-full bg-[#F7F7F7] rounded-[18px] p-6">
          <div className="w-[109px] h-[109px]">
            <img
              src={Cookies.get("dealershipLogo")}
              alt=""
              className="w-full h-full rounded-md"
            />
          </div>
          <div className="w-full mt-6 flex gap-4 md:gap-8 lg:gap-24">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium text-[#5C5C5C]">
                {formData?.salesPerson?.name
                  ? formData?.salesPerson?.name
                  : "Sales Person Name"}
              </p>
              <p className="text-xs font-medium">
                {formData?.planName ? formData?.planName : "Plan Name"}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium text-[#5C5C5C]">
                Subscription Fee
              </p>
              <p className="text-xs font-medium">
                ${formData?.price ? formData?.price : "00"}/
                {formData?.duration == "year"
                  ? "annually"
                  : formData?.duration == "biannual"
                  ? "biannually"
                  : formData?.duration == "month"
                  ? "monthly"
                  : "Duration"}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium text-[#5C5C5C]">Duration</p>
              <p className="text-xs font-medium">
                {formData?.duration == "year"
                  ? "Yearly"
                  : formData?.duration == "biannual"
                  ? "Biannual"
                  : formData?.duration == "month"
                  ? "Monthly"
                  : "Duration"}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full bg-[#F7F7F7] rounded-[18px] p-6">
          <div
            className={`w-full grid ${
              duration == "month" ? " grid-cols-3" : "grid-cols-4"
            }`}
          >
            <div className="px-4">
              <h1 className="text-xs font-medium text-[#606060]">Services</h1>
            </div>
            <div className="px-4">
              <h1 className="text-xs font-medium text-[#606060]">
                Service Details
              </h1>
            </div>
            <div className="px-4">
              <h1 className="text-xs font-medium text-[#606060]">Duration</h1>
            </div>
            <div className="px-4">
              <h1 className="text-xs font-medium text-[#606060]">Frequency</h1>
            </div>
          </div>
          {selectedServices?.map((service, key) => {
            console.log(service);
            return (
              <div
                key={key}
                className={`w-full grid ${
                  duration == "month" ? " grid-cols-3" : "grid-cols-4"
                } mt-4`}
              >
                <div className="px-4">
                  <p className="text-xs font-medium">
                    {service?.service?.name}{" "}
                  </p>
                </div>
                <div className="px-4">
                  <p className="text-xs font-medium">
                    {service?.service?.details}
                  </p>
                </div>
                {duration !== "month" && (
                  <div className="px-4">
                    <p className="text-xs font-medium">
                      {service?.interval == "month"
                        ? "Monthly"
                        : service?.interval == "year" && "Yearly"}
                    </p>
                  </div>
                )}

                <div className="px-4">
                  <p className="text-xs font-medium">{service?.frequency}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Review;
