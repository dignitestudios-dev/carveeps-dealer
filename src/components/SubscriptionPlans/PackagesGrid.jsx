import React, { useContext } from "react";
import PackageCard from "./PackageCard";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import PackageCardLoader from "./PackageCardLoader";

const PackagesGrid = ({ plans, plansLoading, setUpdate }) => {
  const { navigate } = useContext(GlobalContext);
  const arr = [1, 2, 3, 4, 5, 6];
  return (
    <div className="w-full mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <button
        onClick={() => navigate("/create-subscription-plan")}
        className="rounded-[18px] h-96 bg-white flex items-center justify-center flex-col border-2 border-dashed"
      >
        <button className="flex flex-col items-center gap-2 text-[#FF204E] text-[13px]">
          <FaPlus className="w-[48px] h-[48px]" />
          Create Plan
        </button>
      </button>
      {plansLoading
        ? arr?.map((item) => {
            return <PackageCardLoader />;
          })
        : plans?.map((plan, key) => {
            return <PackageCard key={key} plan={plan} setUpdate={setUpdate} />;
          })}
    </div>
  );
};

export default PackagesGrid;
