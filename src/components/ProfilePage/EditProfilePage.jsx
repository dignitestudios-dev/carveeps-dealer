import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";
import Error from "../Global/Error";
import { CiImageOn } from "react-icons/ci";
import BtnLoader from "../Global/BtnLoader";

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
const EditProfilePage = () => {
  const { id } = useParams();
  const [dealer, setDealer] = useState([]);
  const { baseUrl, navigate, navigateToLink } = useContext(GlobalContext);
  const [dealerLoading, setDealerLoading] = useState(false);

  const getDealerProfile = () => {
    const token = Cookies.get("token");

    if (token) {
      setDealerLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(`${baseUrl}/dealership?dealershipId=${id}`, {
          headers,
        })
        .then(
          (response) => {
            setDealer(response?.data?.data);
            setDealerLoading(false);
          },
          (error) => {
            setDealerLoading(false);
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
    getDealerProfile();
  }, []);
  // States to manage the data:
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

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
    if (token) {
      const validationErrors = validateHours();
      if (name == "") {
        setError("Name cannot be left empty.");
      } else if (name.length > 25) {
        setError("Name must be less than 25 characters");
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
        formdata.append("facebook", facebook);
        formdata.append("instagram", instagram);
        formdata.append("linkedIn", linkedin);
        formdata.append("twitter", twitter);
        formdata.append("website", website);
        formdata.append("phoneNumber", phone);
        formdata.append("tiktok", tiktok);
        formdata.append("appointmentLink", scheduleLink);
        formdata.append("businessHours", JSON.stringify(businessHours));
        imageFile !== null && formdata.append("logo", imageFile);

        axios.put(`${baseUrl}/dealership`, formdata, { headers }).then(
          (response) => {
            navigateToLink("/profile", "Profile");
            setLoading(false);
          },
          (error) => {
            setLoading(false);

            setError(error?.response?.data?.message);
          }
        );
      }
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

  useEffect(() => {
    setName(dealer?.name);
    setAddress(dealer?.address);
    setCountry(dealer?.country);
    setCity(dealer?.city);
    setState(dealer?.state);
    setScheduleLink(dealer?.appointmentLink);
    setWebsite(dealer?.website);
    setFacebook(dealer?.facebook);
    setInstagram(dealer?.instagram);
    setTwitter(dealer?.twitter);
    setTiktok(dealer?.tiktok);
    setLinkedin(dealer?.linkedIn);
    setZip(dealer?.zipCode);
    setPhone(dealer?.phoneNumber);
    setBase64Image(dealer?.logo);
    setBusinessHours(dealer?.businessHours);
  }, [dealer]);
  return (
    <div className="bg-white p-6 rounded-[18px] flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Edit Profile</h1>
      {error && <Error error={error} setError={setError} />}
      <div className="w-full flex flex-col md:flex-row items-center justify-start gap-4">
        {base64Image ? (
          <img
            src={base64Image}
            alt="dealership logo"
            className="h-[160px] w-[160px] bg-gray-200 rounded-full"
          />
        ) : (
          <span
            onClick={handleImageClick}
            className="h-[160px] w-[160px] bg-gray-200 rounded-full  text-gray-700 flex items-center justify-center text-5xl"
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

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-52">
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-1">
          <label htmlFor="name" className="text-[13px] font-medium">
            Name
          </label>
          <input
            type="text"
            placeholder={dealer?.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#F7F7F7] h-[60px] text-sm outline-none rounded-lg px-4"
          />
        </div>
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-1">
          <label htmlFor="Street Address" className="text-[13px] font-medium">
            Street Address
          </label>
          <input
            type="text"
            placeholder={dealer?.address}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-[#F7F7F7] h-[60px] text-sm outline-none rounded-lg px-4"
          />
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className=" md:col-span-1 flex flex-col gap-1">
          <label htmlFor="City" className="text-[13px] font-medium">
            City
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder={dealer?.city}
            className="w-full bg-[#F7F7F7] h-[60px] text-sm outline-none rounded-lg px-4 text-[#5C5C5C]"
          />
        </div>
        <div className="col-span-3 md:col-span-1 flex flex-col gap-1">
          <label htmlFor="State" className="text-[13px] font-medium">
            State
          </label>
          <input
            type="text"
            placeholder={dealer?.state}
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full bg-[#F7F7F7] h-[60px] text-sm outline-none rounded-lg px-4 text-[#5C5C5C]"
          />
        </div>
        <div className="col-span-3 md:col-span-1 flex flex-col gap-1">
          <label htmlFor="Zip Code" className="text-[13px] font-medium">
            Zip Code
          </label>
          <input
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder={dealer?.zipCode}
            className="w-full bg-[#F7F7F7] h-[60px] text-sm outline-none rounded-lg px-4 text-[#5C5C5C]"
          />
        </div>
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="country" className="text-[13px] font-medium">
            Country
          </label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            disabled
            placeholder={dealer?.country}
            className="w-full bg-[#F7F7F7] h-[60px] text-sm outline-none rounded-lg px-4 text-[#5C5C5C]"
          />
        </div>
      </div>

      <div className="w-full border mt-6" />

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-52">
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-1">
          <label htmlFor="Phone Number" className="text-[13px] font-medium">
            Phone Number
          </label>
          <input
            type="text"
            value={phone && formatPhoneNumber(phone)}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={dealer?.phoneNumber}
            className="w-full bg-[#F7F7F7] h-[60px] text-sm outline-none rounded-lg px-4 text-[#5C5C5C]"
          />
        </div>
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-1">
          <label htmlFor="appointment-link" className="text-[13px] font-medium">
            Appointment Scheduling Link
          </label>
          <input
            type="text"
            placeholder={dealer?.appointmentLink}
            value={scheduleLink}
            onChange={(e) => setScheduleLink(e.target.value)}
            className="w-full bg-[#F7F7F7] h-[60px] text-sm outline-none rounded-lg px-4 text-[#5C5C5C]"
          />
        </div>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-52">
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-1">
          <label htmlFor="Facebook Link" className="text-[13px] font-medium">
            Facebook Link{" "}
            <span className="text-[11px] text-[#606060]">(Optional)</span>
          </label>
          <input
            type="text"
            placeholder={dealer?.facebook}
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
            className="w-full bg-[#F7F7F7] h-[60px] text-sm outline-none rounded-lg px-4 text-[#5C5C5C]"
          />
        </div>
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-1">
          <label htmlFor="instagram-link" className="text-[13px] font-medium">
            Instagram Link{" "}
            <span className="text-[11px] text-[#606060]">(Optional)</span>
          </label>
          <input
            type="text"
            placeholder={dealer?.instagram}
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            className="w-full bg-[#F7F7F7] h-[60px] text-sm outline-none rounded-lg px-4 text-[#5C5C5C]"
          />
        </div>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-52">
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-1">
          <label htmlFor="Linkedin Link" className="text-[13px] font-medium">
            LinkedIn Link{" "}
            <span className="text-[11px] text-[#606060]">(Optional)</span>
          </label>
          <input
            type="text"
            placeholder={dealer?.linkedIn}
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            className="w-full bg-[#F7F7F7] h-[60px] text-sm outline-none rounded-lg px-4 text-[#5C5C5C]"
          />
        </div>
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-1">
          <label htmlFor="twitter-link" className="text-[13px] font-medium">
            Twitter Link{" "}
            <span className="text-[11px] text-[#606060]">(Optional)</span>
          </label>
          <input
            type="text"
            placeholder={dealer?.twitter}
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
            className="w-full bg-[#F7F7F7] h-[60px] text-sm outline-none rounded-lg px-4 text-[#5C5C5C]"
          />
        </div>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-52">
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-1">
          <label htmlFor="Tiktok Link" className="text-[13px] font-medium">
            Tiktok Link{" "}
            <span className="text-[11px] text-[#606060]">(Optional)</span>
          </label>
          <input
            type="text"
            placeholder={dealer?.tiktok}
            value={tiktok}
            onChange={(e) => setTiktok(e.target.value)}
            className="w-full bg-[#F7F7F7] h-[60px] text-sm outline-none rounded-lg px-4 text-[#5C5C5C]"
          />
        </div>
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-1">
          <label htmlFor="instagram-link" className="text-[13px] font-medium">
            Website{" "}
            <span className="text-[11px] text-[#606060]">(Optional)</span>
          </label>
          <input
            type="text"
            placeholder={dealer?.website}
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full bg-[#F7F7F7] h-[60px] text-sm outline-none rounded-lg px-4 text-[#5C5C5C]"
          />
        </div>
      </div>

      <div className="w-full  flex flex-col gap-1">
        <label htmlFor="instagram-link" className="text-[13px] font-medium">
          Business Hours
        </label>
        <div>
          {businessHours?.map((item, index) => (
            <div
              key={index}
              className="mb-4 flex justify-start items-center gap-8"
            >
              <div className="w-32 flex flex-col justify-start items-start gap-1">
                <label className="block mb-1 text-gray-800 text-[16px] font-medium">
                  {item?.day}
                </label>
                <div className="flex items-center justify-center space-x-0.5 ">
                  <input
                    type="checkbox"
                    checked={item?.closed}
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
                        handleHoursChange(index, "openTime", e.target.value)
                      }
                      className="border disable:bg-gray-100 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-100"
                    />
                    <span className="self-center">to</span>
                    <input
                      type="time"
                      disabled={item?.closed || item?.open24}
                      value={item.closeTime}
                      onChange={(e) =>
                        handleHoursChange(index, "closeTime", e.target.value)
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

      <div className="w-full flex flex-col lg:flex-row items-center justify-end gap-6 lg:pt-10 lg:pb-6">
        <Link
          to="/profile"
          className="w-[250px] text-center py-3 text-white text-base font-bold rounded-lg bg-[#C20028]"
        >
          Back
        </Link>
        <button
          onClick={handleSubmit}
          className="w-[250px]  text-center py-3 text-white text-base font-bold rounded-lg bg-[#FF204E]"
        >
          {loading ? <BtnLoader /> : "Save"}
        </button>
      </div>
    </div>
  );
};

export default EditProfilePage;
