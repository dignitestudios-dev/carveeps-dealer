import React, { useContext, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import SaveModal from "./SaveModal";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import axios from "axios";
import Cookies from "js-cookie";
import BtnLoader from "../Global/BtnLoader";

const SalesTeamList = ({ data, loading, update }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleShowModal = (id) => {
    setSelectedId(id);
    setShowModal((prev) => !prev);
  };
  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  };

  const { navigate } = useContext(GlobalContext);

  return (
    <div>
      <div className="bg-white rounded-[18px] p-6 h-auto hidden xl:flex flex-col">
        {loading ? (
          <>
            <div className="grid grid-cols-7 py-4">
              <div>
                <h1 className="text-xs text-[#5C5C5C] font-medium">
                  Salesperson Name
                </h1>
              </div>
              <div className="w-full col-span-2">
                <h1 className="text-xs text-[#5C5C5C] font-medium">
                  Contact Details
                </h1>
              </div>
              <div>
                <h1 className="text-xs text-[#5C5C5C] font-medium">
                  Job Title
                </h1>
              </div>

              <div>
                <h1 className="text-xs text-[#5C5C5C] font-medium">
                  Subscription Plan Sold
                </h1>
              </div>
              <div>
                <h1 className="text-xs text-[#5C5C5C] font-medium">
                  Total Revenue Generated
                </h1>
              </div>
              <div>
                <h1 className="text-xs text-[#5C5C5C] font-medium"></h1>
              </div>
            </div>
            <div className="bg-white rounded-[18px] p-6 h-screen hidden xl:flex flex-col">
              <div className="grid grid-cols-8 py-4">
                <div className="animate-pulse bg-gray-300 h-4 w-24 rounded"></div>
                <div className="w-full col-span-2">
                  <div className="animate-pulse bg-gray-300 h-4 w-full rounded"></div>
                </div>
                <div className="animate-pulse bg-gray-300 h-4 w-24 rounded"></div>
                <div className="relative">
                  <div className="animate-pulse bg-gray-300 h-4 w-24 rounded"></div>
                </div>
                <div className="animate-pulse bg-gray-300 h-4 w-24 rounded"></div>
                <div className="animate-pulse bg-gray-300 h-4 w-24 rounded"></div>
                <div></div>
              </div>
              {/* Repeat the skeleton rows based on your data length */}
              <div className="grid grid-cols-8 py-4 border-b border-t">
                <div className="animate-pulse bg-gray-300 h-6 w-24 rounded"></div>
                <div className="col-span-2 w-full">
                  <div className="animate-pulse bg-gray-300 h-6 w-full rounded"></div>
                </div>
                <div className="animate-pulse bg-gray-300 h-6 w-24 rounded"></div>
                <div className="relative">
                  <div className="animate-pulse bg-gray-300 h-6 w-24 rounded"></div>
                </div>
                <div className="animate-pulse bg-gray-300 h-6 w-24 rounded"></div>
                <div className="animate-pulse bg-gray-300 h-6 w-24 rounded"></div>
                <div className="flex justify-center gap-2">
                  <div className="animate-pulse bg-gray-300 h-6 w-12 rounded"></div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {data?.length > 0 && (
              <div className="grid grid-cols-7 py-4">
                <div>
                  <h1 className="text-xs text-[#5C5C5C] font-medium">
                    Salesperson Name
                  </h1>
                </div>
                <div className="w-full col-span-2">
                  <h1 className="text-xs text-[#5C5C5C] font-medium">
                    Contact Details
                  </h1>
                </div>
                <div>
                  <h1 className="text-xs text-[#5C5C5C] font-medium">
                    Job Title
                  </h1>
                </div>

                <div>
                  <h1 className="text-xs text-[#5C5C5C] font-medium">
                    Subscription Plan Sold
                  </h1>
                </div>
                <div>
                  <h1 className="text-xs text-[#5C5C5C] font-medium">
                    Total Revenue Generated
                  </h1>
                </div>
                <div>
                  <h1 className="text-xs text-[#5C5C5C] font-medium"></h1>
                </div>
              </div>
            )}

            {data?.map((person) => {
              return (
                <div
                  key={person?._id}
                  className="grid grid-cols-7 py-4 border-b border-t"
                >
                  <div>
                    <button
                      onClick={() =>
                        navigate(
                          `/sales-team/sales-person-profile/${person?._id}`
                        )
                      }
                      className="text-xs font-medium"
                    >
                      {person?.name}
                    </button>
                  </div>
                  <div className="col-span-2 w-full">
                    <p className="text-xs flex flex-col font-medium">
                      <span>{person?.email}</span>
                      <span>{person?.phoneNumber}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium">{person?.jobTitle}</p>
                  </div>

                  <div>
                    <p className="text-xs font-medium">
                      {person?.subscriptionSold}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium">
                      USD ${person?.totalRevenueGenerated}
                    </p>
                  </div>
                  <div>
                    <div className="text-xs font-medium flex justify-center gap-2">
                      <button onClick={() => handleShowModal(person?._id)}>
                        <FaTrash className="text-base text-[#5C5C5C80]" />
                      </button>
                      <RemoveSalesModal
                        showModal={showModal}
                        setShowModal={setShowModal}
                        onclick={handleShowModal}
                        selectedId={selectedId}
                        setUpdate={update}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:hidden gap-6 pt-6">
        {loading ? (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:hidden gap-6 pt-6">
            {/* Repeat the skeleton card based on your data length */}
            <div className="w-full rounded-xl p-4 flex flex-col gap-4 bg-[#EDEDED]">
              <div className="w-full flex items-start justify-between">
                <div className="animate-pulse bg-gray-300 h-4 w-24 rounded"></div>
                <div className="animate-pulse bg-gray-300 h-4 w-24 rounded"></div>
              </div>
              <div className="w-full flex items-start justify-between">
                <div className="animate-pulse bg-gray-300 h-4 w-24 rounded"></div>
                <div className="animate-pulse bg-gray-300 h-4 w-24 rounded"></div>
              </div>
              <div className="w-full flex items-start justify-between">
                <div className="animate-pulse bg-gray-300 h-4 w-24 rounded"></div>
                <div className="animate-pulse bg-gray-300 h-4 w-24 rounded"></div>
              </div>
              <div className="w-full flex items-start justify-between">
                <div className="animate-pulse bg-gray-300 h-4 w-24 rounded"></div>
                <div className="animate-pulse bg-gray-300 h-4 w-24 rounded"></div>
              </div>
              <div className="w-full flex items-start justify-between">
                <div className="animate-pulse bg-gray-300 h-4 w-24 rounded"></div>
                <div className="animate-pulse bg-gray-300 h-4 w-24 rounded"></div>
              </div>
              <div className="text-xs font-medium flex justify-end gap-4">
                <div className="animate-pulse bg-gray-300 h-6 w-12 rounded"></div>
              </div>
            </div>
          </div>
        ) : (
          data?.map((person) => {
            return (
              <div
                onClick={() =>
                  navigate(`/sales-team/sales-person-profile/${person?._id}`)
                }
                key={person?._id}
                className="w-full cursor-pointer rounded-xl p-4 flex flex-col gap-4 bg-[#EDEDED]"
              >
                <div className="w-full flex items-start justify-between">
                  <p className="text-xs font-medium text-[#5C5C5C]">
                    Salesperson Name
                  </p>
                  <p className="text-xs font-medium">{person?.name}</p>
                </div>
                <div className="w-full flex items-start justify-between">
                  <p className="text-xs font-medium text-[#5C5C5C]">
                    Contact Details
                  </p>
                  <div className="text-xs font-medium flex flex-col items-end">
                    <span>{person?.email}</span>{" "}
                    <span>{person?.phoneNumber}</span>
                  </div>
                </div>
                <div className="w-full flex items-start justify-between">
                  <p className="text-xs font-medium text-[#5C5C5C]">
                    Job Title
                  </p>
                  <p className="text-xs font-medium">{person?.jobTitle}</p>
                </div>

                <div className="w-full flex items-start justify-between">
                  <p className="text-xs font-medium text-[#5C5C5C]">
                    Subscription Plan Sold
                  </p>
                  <p className="text-xs font-medium">
                    {person?.subscriptionSold}
                  </p>
                </div>
                <div className="w-full flex items-start justify-between">
                  <p className="text-xs font-medium text-[#5C5C5C]">
                    Total Revenue Generated
                  </p>
                  <p className="text-xs font-medium">
                    USD ${person?.totalRevenueGenerated}
                  </p>
                </div>

                <div className="text-xs font-medium flex justify-end gap-4">
                  <button
                    onClick={() => handleShowModal(person?._id)}
                    className="text-xs font-medium text-red-500"
                  >
                    <FaTrash className="text-base text-[#5C5C5C]" />
                  </button>
                  <RemoveSalesModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    onclick={handleShowModal}
                    selectedId={selectedId}
                    setUpdate={update}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SalesTeamList;

const RemoveSalesModal = ({
  showModal,
  setShowModal,
  onclick,
  selectedId,
  setUpdate,
}) => {
  const { setError, baseUrl } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const handleRemove = () => {
    const token = Cookies.get("token");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      setLoading(true);
      axios
        .delete(`${baseUrl}/dealership/salesPerson/${selectedId}`, {
          headers,
          data: null,
        })
        .then((response) => {
          setUpdate((prev) => !prev);
          setLoading(false);

          setShowModal(false);
        })
        .catch((error) => {
          setLoading(false);

          setError(error?.response?.data?.message);
        });
    }
  };
  return (
    showModal && (
      <div className="w-screen h-screen fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-[rgba(0,0,0,0.02)] z-40 px-6">
        <div className="bg-white rounded-[18px] p-6 lg:w-[375px] w-full h-[207px] flex flex-col items-start justify-between">
          <div className="flex flex-col gap-y-3">
            <h1 className="text-[22px] font-bold">Remove Salesperson</h1>
            <p className="text-base  font-normal">
              By removing salesperson all his associated subscription plans will
              be removed.
            </p>
          </div>
          <div className="w-full flex justify-end items-center gap-x-6">
            <button
              className="text-[#FF204E] text-base font-bold"
              onClick={onclick}
            >
              Cancel
            </button>
            <button
              className="text-[#FF204E] text-base font-bold"
              onClick={handleRemove}
            >
              {loading ? "Removing" : "Remove"}
            </button>
          </div>
        </div>
      </div>
    )
  );
};
