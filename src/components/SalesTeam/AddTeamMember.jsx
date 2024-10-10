import React, { useContext, useState } from "react";
import SaveModal from "./SaveModal";
import { GlobalContext } from "../../context/GlobalContext";
import Error from "../Global/Error";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router";
import BtnLoader from "../Global/BtnLoader";

const AddTeamMember = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const { navigateToLink, baseUrl, setNewUpdate } = useContext(GlobalContext);

  // Error States
  const [formError, setFormError] = useState(false);
  // Loading States
  const [loading, setLoading] = useState(false);
  // States to manage the data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [empNumber, setEmpNumber] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    // Regular expression to check if the input contains only numbers
    const isValid = /^[0-9]*$/.test(value);

    if (isValid) {
      setPhoneNumber(value);
      setFormError(false);
    } else {
      setFormError("Phone number can only contain numbers");
    }
  };
  const validateEmail = (email) => {
    const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      email
    );

    if (isValid) {
      return true;
    } else {
      return false;
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    const token = Cookies.get("token");

    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      if (name == "") {
        setFormError("Name cannot be left empty.");
      } else if (email == "") {
        setFormError("Email cannot be left empty.");
      } else if (!validateEmail(email)) {
        setFormError("Email is not a valid email.");
      } else if (phoneNumber == "") {
        setFormError("Phone Number cannot be left empty.");
      } else if (jobTitle == "") {
        setFormError("Job Title cannot be left empty.");
      } else if (empNumber == "") {
        setFormError("Employee Number cannot be left empty.");
      } else {
        setLoading(true);
        axios
          .post(
            `${baseUrl}/dealership/salesPerson`,
            {
              name: name,
              email: email,
              jobTitle: jobTitle,
              phoneNumber: phoneNumber,
              empNo: empNumber,
            },
            { headers }
          )
          .then(
            (response) => {
              if (response?.status == 201) {
                setShowModal((prev) => !prev);
                setNewUpdate((prev) => !prev);
              }
              setLoading(false);
            },
            (error) => {
              setLoading(false);
              setFormError(error?.response?.data?.message);
            }
          );
      }
    } else {
      navigate("/login");
    }
  }

  return (
    <div className="w-full h-auto lg:h-screen">
      <form
        onSubmit={handleSubmit}
        className="rounded-[18px] p-6 bg-white flex flex-col items-start gap-6"
      >
        {/* Form Error */}
        {formError && <Error error={formError} setError={setFormError} />}
        <h1 className="text-xl font-bold">Add Salesperson</h1>

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
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#F7F7F7] h-[52px] rounded-xl px-4 text-[13px] font-normal text-[#5C5C5C] outline-none"
              placeholder="marktaylor@gmail.com"
            />
          </div>
          <div className="w-full md:w-[434px] h-[77px] flex flex-col gap-1 relative items-start">
            <label htmlFor="Phone Number" className="text-base font-medium">
              Phone Number
            </label>
            <div className="w-full bg-[#F7F7F7] h-[52px] rounded-xl flex items-center gap-1 py-1">
              <span
                type="button"
                className="w-12 border-r-2 text-center text-[#5C5C5C] text-[13px] font-normal flex items-center justify-center h-full"
              >
                +1
              </span>
              <input
                type="text"
                placeholder="999 9999 999"
                value={phoneNumber}
                onChange={(e) => handleChange(e)}
                maxLength={10}
                className="text-[#5C5C5C] text-[13px] font-normal h-full bg-transparent outline-none px-2"
              />
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
              value={empNumber}
              onChange={(e) => setEmpNumber(e.target.value)}
              className="w-full bg-[#F7F7F7] h-[52px] rounded-xl px-4 text-[13px] font-normal text-[#5C5C5C] outline-none"
              placeholder="DS-1234"
            />
          </div>
        </div>

        <div className="w-full flex items-center justify-end gap-6 pt-10 pb-5">
          <button
            type="submit"
            className="bg-[#FF204E] w-[250px] rounded-lg text-white font-bold text-sm py-4"
          >
            {loading ? <BtnLoader /> : "Save"}
          </button>
        </div>
        <SaveModal
          showModal={showModal}
          setShowModal={setShowModal}
          onclick={() => setShowModal((prev) => !prev)}
          heading={"Subscription Plan"}
          text={
            "Do you want to create a subscription plan for this salesperson?"
          }
          url={"/create-subscription-plan"}
        />
      </form>
    </div>
  );
};

export default AddTeamMember;
