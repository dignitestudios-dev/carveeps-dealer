import React, { useContext, useEffect, useState } from "react";
import SaveModal from "./SaveModal";
import { Link, useParams } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import Cookies from "js-cookie";
import axios from "axios";
import BtnLoader from "../Global/BtnLoader";

const EditSalesPersonForm = () => {
  const [state, setState] = useState(false);
  const [showCountryCode, setShowCountryCode] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleState = () => {
    setState(!state);
  };
  const handleShowCode = () => {
    setShowCountryCode(!showCountryCode);
  };

  const { id } = useParams();
  const [salesPerson, setSalesPerson] = useState([]);
  const { baseUrl, navigate } = useContext(GlobalContext);
  const [salesPersonLoading, setSalesPersonLoading] = useState(false);

  const getSalesPerson = () => {
    const token = Cookies.get("token");

    if (token) {
      setSalesPersonLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(`${baseUrl}/dealership/salesPerson?id=${id}`, {
          headers,
        })
        .then(
          (response) => {
            setSalesPerson(response?.data?.data[0]);
            setSalesPersonLoading(false);
          },
          (error) => {
            setSalesPersonLoading(false);
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

  useEffect(() => {
    getSalesPerson();
  }, []);

  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setName(salesPerson?.name);
    setJobTitle(salesPerson?.jobTitle);
  }, [salesPerson]);

  const editSalesPerson = () => {
    const token = Cookies.get("token");

    if (token) {
      setLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .put(
          `${baseUrl}/dealership/salesPerson?id=${id}`,
          {
            salesPersonId: id,
            name: name,
            jobTitle: jobTitle,
          },
          {
            headers,
          }
        )
        .then(
          (response) => {
            setLoading(false);
            handleShowModal();
            setSalesPerson(response?.data?.data[0]);
          },
          (error) => {
            setLoading(false);
            if (error?.response?.status == 401) {
              Cookies.remove("token");
              navigate("/login");
            }
          }
        );
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="rounded-[18px] p-6 bg-white flex flex-col items-start gap-6 h-auto lg:h-screen">
      <h1 className="text-xl font-bold">Edit Salesperson</h1>

      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="w-full md:w-[434px] h-[77px] flex flex-col gap-1">
          <label htmlFor="name" className="text-base font-medium">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#F7F7F7] h-[52px] rounded-xl px-4 text-[13px] font-normal text-[#5C5C5C] outline-none"
            placeholder="Mark Taylor"
          />
        </div>
        <div className="w-full md:w-[434px] h-[77px] flex flex-col gap-1">
          <label htmlFor="Job Title" className="text-base font-medium">
            Job Title
          </label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full bg-[#F7F7F7] h-[52px] rounded-xl px-4 text-[13px] font-normal text-[#5C5C5C] outline-none"
            placeholder="Sales Head"
          />
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="w-full md:w-[434px] h-[77px] flex flex-col gap-1">
          <label htmlFor="Email" className="text-base font-medium">
            Email
          </label>
          <input
            type="email"
            className="w-full bg-[#F7F7F7] h-[52px] rounded-xl px-4 text-[13px] font-normal text-[#5C5C5C] outline-none"
            placeholder={salesPerson?.email}
            value={salesPerson?.email}
            disabled
          />
        </div>
        <div className="w-full md:w-[434px] h-[77px] flex flex-col gap-1 relative items-start">
          <label htmlFor="Phone Number" className="text-base font-medium">
            Phone Number
          </label>
          <div className="w-full bg-[#F7F7F7] h-[52px] rounded-xl flex items-center gap-1 py-1">
            <button
              className="w-12 border-r-2 text-center text-[#5C5C5C] text-[13px] font-normal h-full"
              // onClick={handleShowCode}
            >
              +1
            </button>
            <input
              type="text"
              placeholder={salesPerson?.phoneNumber}
              value={salesPerson?.phoneNumber}
              disabled
              className="text-[#5C5C5C] text-[13px] font-normal h-full bg-transparent outline-none px-2"
            />
            {/* {showCountryCode && (
              <div className="w-[80px] shadow-lg max-h-[200px] bg-white z-20 rounded-lg absolute -left-8 top-20 overflow-y-scroll">
                <option
                  value="+1"
                  className="px-4 text-[13px] py-1 hover:bg-gray-100 cursor-pointer text-center"
                >
                  +1
                </option>
                <option
                  value="+1"
                  className="px-4 text-[13px] py-1 hover:bg-gray-100 cursor-pointer text-center"
                >
                  +1
                </option>
                <option
                  value="+1"
                  className="px-4 text-[13px] py-1 hover:bg-gray-100 cursor-pointer text-center"
                >
                  +1
                </option>
                <option
                  value="+1"
                  className="px-4 text-[13px] py-1 hover:bg-gray-100 cursor-pointer text-center"
                >
                  +1
                </option>
                <option
                  value="+1"
                  className="px-4 text-[13px] py-1 hover:bg-gray-100 cursor-pointer text-center"
                >
                  +1
                </option>
                <option
                  value="+1"
                  className="px-4 text-[13px] py-1 hover:bg-gray-100 cursor-pointer text-center"
                >
                  +1
                </option>
              </div>
            )} */}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="w-full md:w-[434px] h-[77px] flex flex-col gap-1">
          <label htmlFor="Employee Number" className="text-base font-medium">
            Employee Number
          </label>
          <input
            type="text"
            className="w-full bg-[#F7F7F7] h-[52px] rounded-xl px-4 text-[13px] font-normal text-[#5C5C5C] outline-none"
            placeholder={salesPerson?.empNo}
            value={salesPerson?.empNo}
            disabled
          />
        </div>
        {/* <div className="w-full md:w-[434px] h-[77px] flex flex-col gap-1">
            <label htmlFor="Job Title" className="text-base font-medium">
              Subscription Plan{" "}
              <span className="text-[13px] text-[#5C5C5C]">(Optional)</span>
            </label>
            <select
              className="w-full bg-[#F7F7F7] h-[52px] rounded-xl px-4 text-[13px] font-normal text-[#5C5C5C] outline-none"
            >
              <option value="" className="bg-[#F7F7F7] text-[13px] font-normal text-[#5C5C5C]">DriveCar Plus</option>
              <option value="" className="bg-[#F7F7F7] text-[13px] font-normal text-[#5C5C5C]">DriveCar Premium</option>
            </select>
          </div> */}
      </div>

      <div className="w-full flex items-center justify-end gap-6 pt-10 pb-5">
        <Link
          to={`/sales-team/sales-person-profile/${id}`}
          className=" w-[250px] rounded-lg bg-[#C20028] text-white text-center font-bold text-sm py-4"
        >
          Back
        </Link>
        <button
          onClick={editSalesPerson}
          className="bg-[#FF204E] w-[250px] rounded-lg text-white font-bold text-sm py-4 text-center"
        >
          {loading ? <BtnLoader /> : "Save"}
        </button>
        <SaveModal
          showModal={showModal}
          setShowModal={setShowModal}
          onclick={handleShowModal}
          heading={"Subscription Plan"}
          text={
            "Do you want to create a subscription plan for this salesperson?"
          }
          id={id}
          url={`/create-subscription-plan/${id}`}
        />
      </div>
    </div>
  );
};

export default EditSalesPersonForm;
