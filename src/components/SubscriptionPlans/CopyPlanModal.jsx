import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { GlobalContext } from "../../context/GlobalContext";
import BtnLoader from "../Global/BtnLoader";

const CopyPlanModal = ({ showModal, setShowModal, id, setUpdate }) => {
  const [team, setTeam] = useState([]);
  const { baseUrl, navigate, setError } = useContext(GlobalContext);
  const [teamLoading, setTeamLoading] = useState(false);
  const [salesPerson, setSalesPerson] = useState(null);
  const [loading, setLoading] = useState(false);

  const getTeam = () => {
    const token = Cookies.get("token");

    if (token) {
      setTeamLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios.get(`${baseUrl}/dealership/salesPerson`, { headers }).then(
        (response) => {
          setTeam(response?.data?.data);
          setTeamLoading(false);
        },
        (error) => {
          setTeamLoading(false);
          if (error?.response?.status == 401) {
            setIsLoggedIn(false);
            Cookies.remove("token");
            navigate("/login");
          }
        }
      );
    } else {
      navigate("/login");
    }
  };

  const copyPlan = () => {
    const token = Cookies.get("token");
    if (token) {
      if (salesPerson == null) {
        setError("You must select a salesperson.");
      } else {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        setLoading(true);
        axios
          .post(
            `${baseUrl}/dealership/subscription/copy`,
            {
              salesPersonId: salesPerson,
              subscriptionPlanId: id,
            },
            { headers }
          )
          .then((response) => {
            setUpdate((prev) => !prev);
            setLoading(false);
          })
          .catch((err) => {
            setError(err?.response?.data?.message);
            setLoading(false);
          });
      }
    }
  };

  useEffect(() => {
    getTeam();
  }, []);

  const handleNavigate = () => {
    navigate("/subscription-plans");
  };

  const modalRef = useRef();

  const toggleModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal(false);
    }
  };

  return (
    <>
      {showModal && (
        <div
          onClick={toggleModal}
          className="w-full h-screen fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-40 bg-[rgba(0,0,0,0.4)]"
        >
          <div
            ref={modalRef}
            className="bg-white rounded-[18px] p-5 w-[90%] lg:w-[475px] h-auto flex flex-col items-start justify-start gap-2 relative"
          >
            <h1 className="text-[22px] font-bold">Copy Subscription Plan</h1>
            {/* <p className="text-base font-medium text-[#5C5C5C]">
              Select a salesperson you want to associate the plan with.
            </p> */}

            <div className="flex w-full flex-col items-start gap-1 ">
              <label htmlFor="" className="text-[13px] font-medium">
                Associate Salesperson
              </label>
              <select
                id="salesPerson"
                onChange={(e) => {
                  setSalesPerson(e.target.value);
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
            <div className="w-full flex mt-2 justify-end items-center gap-10">
              <button
                onClick={copyPlan}
                className="text-base w-28 h-8 rounded-xl  font-medium bg-[#FF204E] text-white"
              >
                {loading ? <BtnLoader /> : "Copy Plan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CopyPlanModal;
