import React, { useContext, useState } from "react";
import { ToyotaLogo } from "../../assets/export";
import InputField from "../Global/InputField";
import { styles } from "../../styles/styles";
import TimeModal from "./TimeModal";
import { useNavigate } from "react-router";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";
import Cookies from "js-cookie";
import { CiImageOn } from "react-icons/ci";
import Error from "../Global/Error";
import BtnLoader from "../Global/BtnLoader";
import { useEffect } from "react";

const initialHours = [
  { day: "Monday", closed: false, open24: false, openTime: "", closeTime: "" },
  { day: "Tuesday", closed: false, open24: false, openTime: "", closeTime: "" },
  {
    day: "Wednesday",
    closed: false,
    open24: false,
    openTime: "",
    closeTime: "",
  },
  {
    day: "Thursday",
    closed: false,
    open24: false,
    openTime: "",
    closeTime: "",
  },
  { day: "Friday", closed: false, open24: false, openTime: "", closeTime: "" },
  {
    day: "Saturday",
    closed: false,
    open24: false,
    openTime: "",
    closeTime: "",
  },
  { day: "Sunday", closed: false, open24: false, openTime: "", closeTime: "" },
];

const ProfileSection = () => {
  const { navigateToLink, baseUrl } = useContext(GlobalContext);
  const [showModal, setShowModal] = useState(false);

  // States to manage the data:
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [scheduleLink, setScheduleLink] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const [businessHours, setBusinessHours] = useState(initialHours);
  const [errors, setErrors] = useState([]);

  const handleHoursChange = (index, field, value) => {
    const updatedHours = [...businessHours];
    updatedHours[index][field] = value;
    const validationErrors = validateHours();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors([]);
    }
    setBusinessHours(updatedHours);
  };

  const handleToggle = (index) => {
    const updatedHours = [...businessHours];
    updatedHours[index].closed = !updatedHours[index].closed;
    updatedHours[index].open24 = false; // Reset open24 when toggling open
    // Reset time if toggling to closed
    if (!updatedHours[index].closed) {
      updatedHours[index].openTime = "";
      updatedHours[index].closeTime = "";
    }
    const validationErrors = validateHours();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors([]);
    }
    setBusinessHours(updatedHours);
  };

  const handle24HoursToggle = (index) => {
    const updatedHours = [...businessHours];
    updatedHours[index].open24 = !updatedHours[index].open24;
    updatedHours[index].open = !updatedHours[index].open; // Toggle open status
    if (updatedHours[index].open24) {
      updatedHours[index].openTime = "00:00"; // Set to 24-hour format
      updatedHours[index].closeTime = "23:59"; // End of the day
    } else {
      updatedHours[index].openTime = "";
      updatedHours[index].closeTime = "";
    }
    const validationErrors = validateHours();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors([]);
    }
    setBusinessHours(updatedHours);
  };

  const validateHours = () => {
    const newErrors = [];
    businessHours.forEach((item) => {
      if (!item.closed) {
        if (!item.open24 && (!item.openTime || !item.closeTime)) {
          newErrors.push(`${item.day}: Please set opening and closing times.`);
        }
        if (
          item.open24 &&
          (item.openTime !== "00:00" || item.closeTime !== "23:59")
        ) {
          newErrors.push(`${item.day}: Invalid 24-hour setting.`);
        }
      }
    });
    return newErrors;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const formdata = new FormData();
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };
    const validationErrors = validateHours();
    if (token) {
      if (name == "") {
        setError("Name cannot be left empty.");
      } else if (address == "") {
        setError("Address cannot be left empty.");
      } else if (city == "") {
        setError("City cannot be left empty.");
      } else if (state == "") {
        setError("State cannot be left empty.");
      } else if (zip == "") {
        setError("ZipCode cannot be left empty.");
      } else if (phone == "") {
        setError("Phone cannot be left empty.");
      } else if (scheduleLink == "") {
        setError("Appointment Link cannot be left empty.");
      } else if (imageFile == null) {
        setError("Dealerhip logo is required.");
      } else if (validationErrors.length > 0) {
        setErrors(validationErrors);
      } else {
        setErrors([]);
        setLoading(true);

        formdata.append("name", name);
        formdata.append("address", address);
        formdata.append("city", city);
        formdata.append("country", "US");
        formdata.append("state", state);
        formdata.append("zipCode", zip);
        facebook !== "" && formdata.append("facebook", facebook);
        instagram !== "" && formdata.append("instagram", instagram);
        linkedin !== "" && formdata.append("linkedIn", linkedin);
        twitter !== "" && formdata.append("twitter", twitter);
        website !== "" && formdata.append("website", website);
        tiktok !== "" && formdata.append("tiktok", tiktok);
        formdata.append("phoneNumber", phone);
        formdata.append("appointmentLink", scheduleLink);
        formdata.append("logo", imageFile);
        formdata.append("businessHours", JSON.stringify(businessHours));

        axios
          .post(`${baseUrl}/dealership/completeProfile`, formdata, { headers })
          .then(
            (response) => {
              console.log(response);
              Cookies.set("isProfileCompleted", true, { expires: 7 });
              Cookies.set("phone", phone, { expires: 7 });
              Cookies.set("address", address, { expires: 7 });
              Cookies.set("city", city, { expires: 7 });
              Cookies.set("state", state, { expires: 7 });
              Cookies.set("zip", zip, { expires: 7 });

              // navigateToLink("/complete-stripe-profile", "Profile Setup");
              axios
                .post(
                  `${baseUrl}/dealership/completeStripeProfile`,
                  {},
                  {
                    headers,
                  }
                )
                .then((res) => {
                  console.log("res", res);
                  window.location.href = res?.data?.data?.url;
                })
                .catch((err) => {
                  setError(err?.response?.data?.message);
                });
              setLoading(false);
            },
            (error) => {
              setLoading(false);

              setError(error?.response?.data?.message);
            }
          );
      }
    } else {
      navigateToLink("/login", "Login");
    }
  };
  const handleImageClick = (e) => {
    e.preventDefault();
    document.getElementById("image").click();
  };

  const formatPhoneNumber = (phoneNumber) => {
    const formattedNumber = phoneNumber.replace(
      /^(\d{3})(\d{3})(\d{4})$/,
      "($1) $2-$3"
    );
    return formattedNumber;
  };
  const handleChange = (e) => {
    const input = e.target.value;
    setPhone(input);
  };

  return (
    <>
      {error && <Error error={error} setError={setError} />}

      <form
        onSubmit={handleSubmit}
        className="w-full rounded-[18px] bg-white p-6 flex flex-col items-start gap-6"
      >
        <h1 className="text-lg font-bold">Profile</h1>
        <div className="w-full flex flex-col md:flex-row items-center justify-start gap-4">
          {base64Image ? (
            <img
              src={base64Image}
              alt="dealership logo"
              className="h-[160px] w-[160px] rounded-full"
            />
          ) : (
            <span
              onClick={handleImageClick}
              className="h-[160px] w-[160px] rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-5xl"
            >
              <CiImageOn />
            </span>
          )}
          <input
            type="file"
            id="image"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <button
            onClick={handleImageClick}
            className="text-[#FF204E] text-base font-semibold underline"
          >
            Upload Dealership Logo
          </button>
        </div>
        <div className="w-full flex flex-col gap-6">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              labelName={"Dealership Name"}
              inputName={"dealershipname"}
              inputType={"text"}
              inputValue={name}
              onchange={(e) => setName(e.target.value)}
              labeltext={""}
            />
            <InputField
              labelName={"Street Address"}
              inputName={"streetaddress"}
              inputType={"text"}
              inputValue={address}
              onchange={(e) => setAddress(e.target.value)}
              labeltext={""}
            />
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputField
              labelName={"City"}
              inputName={"city"}
              inputType={"text"}
              inputValue={city}
              onchange={(e) => setCity(e.target.value)}
              labeltext={""}
            />
            <InputField
              labelName={"State"}
              inputName={"state"}
              inputType={"text"}
              inputValue={state}
              onchange={(e) => setState(e.target.value)}
              labeltext={""}
            />
            <InputField
              labelName={"Zip Code"}
              inputName={"streetaddress"}
              inputType={"text"}
              placeholder={"090909"}
              max={5}
              inputValue={zip}
              onchange={(e) => setZip(e.target.value)}
              labeltext={""}
            />
          </div>
          <div className="w-full border mt-6" />
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              labelName={"Phone Number"}
              inputName={"phonenumber"}
              inputType={"text"}
              placeholder={"Enter your phone number"}
              labeltext={""}
              inputValue={formatPhoneNumber(phone)}
              max={10}
              onchange={(e) => handleChange(e)}
            />
            <InputField
              labelName={"Appointment Scheduling Link"}
              inputName={"appointment-link"}
              inputType={"text"}
              placeholder={"https://www.example.com/"}
              labeltext={""}
              inputValue={scheduleLink}
              onchange={(e) => setScheduleLink(e.target.value)}
            />
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              labelName={"Facebook Link"}
              inputName={"facebook_link"}
              inputType={"text"}
              placeholder={"https://www.example.com/"}
              labeltext={"(Optional)"}
              inputValue={facebook}
              onchange={(e) => setFacebook(e.target.value)}
            />
            <InputField
              labelName={"Instagram Link"}
              inputName={"instagram_link"}
              inputType={"text"}
              inputValue={instagram}
              onchange={(e) => setInstagram(e.target.value)}
              placeholder={"https://www.example.com/"}
              labeltext={"(Optional)"}
            />
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              labelName={"LinkedIn Link"}
              inputName={"linkedin"}
              inputType={"text"}
              inputValue={linkedin}
              onchange={(e) => setLinkedin(e.target.value)}
              placeholder={"https://www.example.com/"}
              labeltext={"(Optional)"}
            />
            <InputField
              labelName={"Twitter Link"}
              inputName={"twiter"}
              inputType={"text"}
              inputValue={twitter}
              onchange={(e) => setTwitter(e.target.value)}
              placeholder={"https://www.example.com/"}
              labeltext={"(Optional)"}
            />
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              labelName={"Tiktok Link"}
              inputName={"tiktok_link"}
              inputType={"text"}
              inputValue={tiktok}
              onchange={(e) => setTiktok(e.target.value)}
              placeholder={"https://www.example.com/"}
              labeltext={"(Optional)"}
            />
            <InputField
              labelName={"Website Link"}
              inputName={"website_link"}
              inputType={"text"}
              inputValue={website}
              onchange={(e) => setWebsite(e.target.value)}
              placeholder={"https://www.example.com/"}
              labeltext={"(Optional)"}
            />
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="w-full flex col-span-2 flex-col items-start gap-y-4">
              <label htmlFor="" className="text-[17px] font-medium">
                Business Hours
              </label>
              <div>
                {businessHours.map((item, index) => (
                  <div
                    key={index}
                    className="mb-4 flex justify-start items-center gap-8"
                  >
                    <div className="w-32 flex flex-col justify-start items-start gap-1">
                      <label className="block mb-1 text-gray-800 text-[16px] font-medium">
                        {item.day}
                      </label>
                      <div className="flex items-center justify-center space-x-0.5 ">
                        <input
                          type="checkbox"
                          checked={item.closed}
                          onChange={() => handleToggle(index)}
                          className="mr-2 w-4 h-4"
                        />
                        <span className="text-[13px] text-gray-500 font-medium">
                          {item.closed ? "Closed" : "Closed"}
                        </span>
                      </div>
                    </div>

                    <div className="w-60 mb-1 flex justify-start items-center">
                      {
                        <div className="flex space-x-2">
                          <input
                            type="time"
                            disabled={item?.closed || item?.open24}
                            value={item.openTime}
                            onChange={(e) =>
                              handleHoursChange(
                                index,
                                "openTime",
                                e.target.value
                              )
                            }
                            className="border disable:bg-gray-100 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-100"
                          />
                          <span className="self-center">to</span>
                          <input
                            type="time"
                            disabled={item?.closed || item?.open24}
                            value={item.closeTime}
                            onChange={(e) =>
                              handleHoursChange(
                                index,
                                "closeTime",
                                e.target.value
                              )
                            }
                            className="border  disable:bg-gray-100 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-100"
                          />
                        </div>
                      }
                    </div>
                    <div className="w-auto mb-1">
                      {!item.closed && (
                        <div className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            checked={item.open24}
                            onChange={() => handle24HoursToggle(index)}
                            className="mr-2 w-4 h-4"
                          />
                          <span className="text-[13px] text-gray-500 font-medium">
                            Open 24 Hours
                          </span>
                        </div>
                      )}
                    </div>

                    {errors
                      .filter((err) => err.includes(item.day))
                      .map((error, errorIndex) => (
                        <p key={errorIndex} className="text-red-500 text-sm">
                          {error}
                        </p>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full text-end mt-4">
            <button
              type="submit"
              className={`${styles.bgOrange} text-white font-medium text-base rounded-lg h-[52px] w-full md:w-[262px]`}
            >
              {loading ? <BtnLoader /> : "Save"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ProfileSection;
