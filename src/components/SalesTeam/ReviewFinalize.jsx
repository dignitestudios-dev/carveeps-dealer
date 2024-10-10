import React from 'react'
import { ToyotaLogo } from '../../assets/export'

const ReviewFinalize = () => {
  return (
    <div className="bg-white rounded-[18px] p-6 w-full lg:w-[666px] h-[777px] overflow-hidden flex flex-col gap-4">
    <h1 className="text-lg font-bold">Review</h1>
    <div className="w-full bg-[#F7F7F7] rounded-[18px] p-6">
      <div className="w-[109px] h-[109px]">
        <img src={ToyotaLogo} alt="logo" className="w-full h-full" />
      </div>
      <div className="w-full mt-6 flex gap-4 md:gap-8 lg:gap-24">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium text-[#5C5C5C]">
            Subscription Plan
          </p>
          <p className="text-xs font-medium">DriveCar Plus</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium text-[#5C5C5C]">
            Subscription Fee
          </p>
          <p className="text-xs font-medium">$90/annually</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium text-[#5C5C5C]">Duration</p>
          <p className="text-xs font-medium">Yearly</p>
        </div>
      </div>
    </div>
    <div className="w-full bg-[#F7F7F7] rounded-[18px] p-6">
      <div className="w-full grid grid-cols-3">
        <div className="px-4">
          <h1 className="text-xs font-medium text-[#606060]">Services</h1>
        </div>
        <div className="px-4">
          <h1 className="text-xs font-medium text-[#606060]">
            Service Details
          </h1>
        </div>
        <div className="px-4">
          <h1 className="text-xs font-medium text-[#606060]">Frequency</h1>
        </div>
      </div>
      <div className="w-full grid grid-cols-3 mt-4">
        <div className="px-4">
          <p className="text-xs font-medium">Car wash(per month)</p>
        </div>
        <div className="px-4">
          <p className="text-xs font-medium">
            Exterior was, interior vacuuminig, Waxing, Tire cleaning Window
            cleaning
          </p>
        </div>
        <div className="px-4">
          <p className="text-xs font-medium">5</p>
        </div>
      </div>
      <div className="w-full grid grid-cols-3 mt-4">
        <div className="px-4">
          <p className="text-xs font-medium">Car wash</p>
        </div>
        <div className="px-4">
          <p className="text-xs font-medium">
            Exterior was, interior vacuuminig, Waxing, Tire cleaning Window
            cleaning
          </p>
        </div>
        <div className="px-4">
          <p className="text-xs font-medium">5</p>
        </div>
      </div>
      <div className="w-full grid grid-cols-3 mt-4">
        <div className="px-4">
          <p className="text-xs font-medium">Car wash</p>
        </div>
        <div className="px-4">
          <p className="text-xs font-medium">
            Exterior was, interior vacuuminig, Waxing, Tire cleaning Window
            cleaning
          </p>
        </div>
        <div className="px-4">
          <p className="text-xs font-medium">5</p>
        </div>
      </div>
      <div className="w-full grid grid-cols-3 mt-4">
        <div className="px-4">
          <p className="text-xs font-medium">Car wash</p>
        </div>
        <div className="px-4">
          <p className="text-xs font-medium">
            Exterior was, interior vacuuminig, Waxing, Tire cleaning Window
            cleaning
          </p>
        </div>
        <div className="px-4">
          <p className="text-xs font-medium">5</p>
        </div>
      </div>
      <div className="w-full grid grid-cols-3 mt-4">
        <div className="px-4">
          <p className="text-xs font-medium">Car wash</p>
        </div>
        <div className="px-4">
          <p className="text-xs font-medium">
            Exterior was, interior vacuuminig, Waxing, Tire cleaning Window
            cleaning
          </p>
        </div>
        <div className="px-4">
          <p className="text-xs font-medium">5</p>
        </div>
      </div>
      <div className="w-full grid grid-cols-3 mt-4">
        <div className="px-4">
          <p className="text-xs font-medium">Car wash</p>
        </div>
        <div className="px-4">
          <p className="text-xs font-medium">
            Exterior was, interior vacuuminig, Waxing, Tire cleaning Window
            cleaning
          </p>
        </div>
        <div className="px-4">
          <p className="text-xs font-medium">5</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ReviewFinalize
