import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import Cookies from "js-cookie";
import InputField from "../Global/InputField";
import { styles } from "../../styles/styles";
import axios from "axios";
import BtnLoader from "../Global/BtnLoader";
import Error from "../Global/Error";
import { useNavigate } from "react-router";

const CompleteStripeProfile = () => {
  const { navigateToLink, baseUrl } = useContext(GlobalContext);
  // useEffect(() => {
  //   const token = Cookies.get("token");
  //   const isStripeProfileCompleted =
  //     Cookies.get("isStripeProfileCompleted") === "true";

  //   if (token && isStripeProfileCompleted) {
  //     navigateToLink("/payment", "Profile Setup");
  //   }
  // }, []);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [website, setWebsite] = useState("");
  const [ssn, setSsn] = useState("");
  const [dob, setDob] = useState("");
  const [companyZipCode, setCompanyZipCode] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [supportPhone, setSupportPhone] = useState("");
  const [personEmail, setPersonEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState("");
  const [companyCity, setCompanyCity] = useState("");
  const [companyState, setCompanyState] = useState("");
  const [companyTaxId, setCompanyTaxId] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [personTitle, setPersonTitle] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
    if (token) {
      if (companyName.trim() === "") {
        setLoading(false);
        setError("Company Name cannot be left empty.");
        return;
      }
      if (companyPhoneNumber.trim() === "") {
        setLoading(false);
        setError("Company Phone Number cannot be left empty.");
        return;
      }
      if (companyAddress.trim() === "") {
        setLoading(false);
        setError("Company Address cannot be left empty.");
        return;
      }
      if (companyCity.trim() === "") {
        setLoading(false);
        setError("Company City cannot be left empty.");
        return;
      }
      if (companyState.trim() === "") {
        setLoading(false);
        setError("Company State cannot be left empty.");
        return;
      }
      if (personTitle.trim() === "") {
        setLoading(false);
        setError("Representative Title cannot be left empty.");
        return;
      }
      if (companyZipCode.trim() === "") {
        setLoading(false);
        setError("Company Zip Code cannot be left empty.");
        return;
      }
      if (companyTaxId.trim() === "") {
        setLoading(false);
        setError("Company Tax ID cannot be left empty.");
        return;
      }
      if (productDescription.trim() === "") {
        setLoading(false);
        setError("Product Description cannot be left empty.");
        return;
      }
      if (supportEmail.trim() === "") {
        setLoading(false);
        setError("Support Email cannot be left empty.");
        return;
      }
      if (!/\S+@\S+\.\S+/.test(supportEmail)) {
        setLoading(false);
        setError("Support Email is invalid.");
        return;
      }
      if (supportPhone.trim() === "") {
        setLoading(false);
        setError("Support Phone cannot be left empty.");
        return;
      }
      // if (personEmail.trim() === "") {
      //   setLoading(false);
      //   setError("Person Email cannot be left empty.");
      //   return;
      // }
      // if (!/\S+@\S+\.\S+/.test(personEmail)) {
      //   setLoading(false);
      //   setError("Person Email is invalid.");
      //   return;
      // }
      if (firstName == "") {
        setError("Representative First Name cannot be left empty.");
      } else if (lastName == "") {
        setError("Representative Last Name cannot be left empty.");
      } else if (dob == "") {
        setError("Representative must provide your date of birth.");
      } else if (website == "") {
        setError("You must provide url of your website.");
      } else if (ssn == "") {
        setError("Representative must provide S.S.N number.");
      } else {
        setLoading(true);
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        axios
          .post(
            `${baseUrl}/dealership/completeStripeProfile`,
            {
              companyName: companyName,
              companyPhoneNumber: companyPhoneNumber,
              companyAddress: companyAddress,
              companyCity: companyCity,
              companyState: companyState,
              companyZipCode: companyZipCode,
              companyCountry: "US",
              companyTaxId: companyTaxId,
              personTitle: personTitle,
              productDescription: productDescription,
              supportEmail: supportEmail,
              supportPhone: companyPhoneNumber,
              personEmail: supportEmail,
              personFirstName: firstName,
              personLastName: lastName,
              personPhone: supportPhone,
              personAddress: address,
              personCity: city,
              personState: state,
              personZipCode: zip,
              personCountry: "US",
              dob: formatDate(dob),
              website: website,
              ssn: ssn,
            },
            { headers }
          )
          .then(
            (response) => {
              const data = response?.data?.data;
              Cookies.set("isProfileCompleted", data?.isProfileCompleted, {
                expires: 7,
              });
              Cookies.set(
                "isStripeProfileCompleted",
                data?.isStripeProfileCompleted,
                { expires: 7 }
              );
              Cookies.set("isBankAccountAdded", data?.isBankAccountAdded, {
                expires: 7,
              });
              Cookies.set("isAccessKeyAdded", data?.isAccessKeyAdded, {
                expires: 7,
              });

              if (
                data?.isProfileCompleted &&
                data?.isStripeProfileCompleted &&
                data?.isBankAccountAdded &&
                data?.isAccessKeyAdded
              ) {
                navigateToLink("/dashboard", "Dashboard");
              } else if (
                data?.isProfileCompleted &&
                data?.isBankAccountAdded == false &&
                data?.isStripeProfileCompleted == false &&
                data?.isAccessKeyAdded == false
              ) {
                navigateToLink("/complete-stripe-profile", "Profile Setup");
              } else if (
                data?.isProfileCompleted &&
                data?.isStripeProfileCompleted &&
                data?.isBankAccountAdded == false &&
                data?.isAccessKeyAdded == false
              ) {
                navigateToLink("/payment", "Profile Setup");
              } else if (
                data?.isProfileCompleted &&
                data?.isStripeProfileCompleted &&
                data?.isBankAccountAdded &&
                data?.isAccessKeyAdded == false
              ) {
                navigateToLink("/report-access", "Profile Setup");
              } else if (
                data?.isProfileCompleted &&
                data?.isStripeProfileCompleted == false &&
                data?.stripeProfileStatus == "in-review" &&
                data?.isBankAccountAdded &&
                data?.isAccessKeyAdded
              ) {
                // navigateToLink("/complete-stripe-profile", "Profile Setup");
                console.log("show modal");
              } else if (
                data?.isProfileCompleted &&
                data?.isStripeProfileCompleted == false &&
                data?.stripeProfileStatus == null &&
                data?.isBankAccountAdded &&
                data?.isAccessKeyAdded
              ) {
                navigateToLink("/complete-stripe-profile", "Profile Setup");
                // console.log("show modal");
              } else if (
                data?.isProfileCompleted &&
                data?.isStripeProfileCompleted == false &&
                data?.isBankAccountAdded &&
                data?.isAccessKeyAdded == false
              ) {
                navigateToLink("/complete-stripe-profile", "Profile Setup");
              } else if (
                data?.isProfileCompleted == false &&
                data?.isBankAccountAdded == false &&
                data?.isStripeProfileCompleted == false &&
                data?.isAccessKeyAdded == false
              ) {
                navigateToLink("/profile-setup", "Profile Setup");
              }
              console.log(response);
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
    setCompanyZipCode(Cookies.get("zip"));
    setSupportPhone(Cookies.get("phone"));
    setCompanyAddress(Cookies.get("address"));
    setCompanyPhoneNumber(Cookies.get("phone"));
    setCompanyCity(Cookies.get("city"));
    setCompanyState(Cookies.get("state"));
    setAddress(Cookies.get("address"));
    setCity(Cookies.get("city"));
    setState(Cookies.get("state"));
    setPhone(Cookies.get("phone"));
    setZip(Cookies.get("zip"));
  }, []);

  const navigate = useNavigate();
  return (
    <div>
      <div className="w-full h-12 flex justify-end items-center">
        <button
          onClick={() => {
            Cookies.remove("token");
            navigate("/login");
          }}
          className="w-36 h-10 rounded-lg flex items-center justify-center bg-[#ff204e] text-sm text-white font-medium"
        >
          Logout
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-[18px] bg-white p-6 flex flex-col items-start gap-6"
      >
        <div className="w-full">
          <h3 className="text-3xl font-bold text-gray-800">
            Payment Gateway Information
          </h3>
          <p className="w-[75%] text-lg mt-2 leading-6 font-medium text-gray-500">
            Carveeps does not store or retain any personal or banking
            information provided for payment processing. All financial data is
            securely handled by our payment gateway partner.
          </p>
        </div>
        {error && <Error error={error} setError={setError} />}
        <div className="w-full">
          <h3 className="text-xl font-bold text-gray-800">
            Company Information
          </h3>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            labelName={"Company Name"}
            inputName={"companyName"}
            inputType={"text"}
            inputValue={companyName}
            onchange={(e) => setCompanyName(e.target.value)}
            labeltext={""}
          />
          <InputField
            labelName={"Company Phone Number"}
            inputName={"companyPhoneNumber"}
            inputType={"text"}
            inputValue={companyPhoneNumber}
            onchange={(e) => setCompanyPhoneNumber(e.target.value)}
            labeltext={""}
          />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            labelName={"Company Address"}
            inputName={"companyAddress"}
            inputType={"text"}
            inputValue={companyAddress}
            onchange={(e) => setCompanyAddress(e.target.value)}
            labeltext={""}
          />
          <InputField
            labelName={"Company City"}
            inputName={"companyCity"}
            inputType={"text"}
            inputValue={companyCity}
            onchange={(e) => setCompanyCity(e.target.value)}
            labeltext={""}
          />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            labelName={"Company State"}
            inputName={"companystate"}
            inputType={"text"}
            inputValue={companyState}
            onchange={(e) => setCompanyState(e.target.value)}
            labeltext={""}
          />
          <InputField
            labelName={"Company Zip Code"}
            inputName={"companyZipCode"}
            inputType={"text"}
            inputValue={companyZipCode}
            onchange={(e) => setCompanyZipCode(e.target.value)}
            labeltext={""}
          />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            labelName={"Company Tax Id"}
            inputName={"companystate"}
            inputType={"text"}
            inputValue={companyTaxId}
            onchange={(e) => setCompanyTaxId(e.target.value)}
            labeltext={""}
          />
          {/* <InputField
            labelName={"Company Zip Code"}
            inputName={"companyZipCode"}
            inputType={"text"}
            inputValue={companyZipCode}
            onchange={(e) => setCompanyZipCode(e.target.value)}
            labeltext={""}
          /> */}
        </div>
        <div className="w-full">
          <h3 className="text-xl font-bold text-gray-800">
            Representative Information
          </h3>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            labelName={"Representative First Name"}
            inputName={"firstName"}
            inputType={"text"}
            inputValue={firstName}
            onchange={(e) => setFirstName(e.target.value)}
            labeltext={""}
          />
          <InputField
            labelName={"Representative Last Name"}
            inputName={"lastName"}
            inputType={"text"}
            inputValue={lastName}
            onchange={(e) => setLastName(e.target.value)}
            labeltext={""}
          />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          <InputField
            labelName={"Representative Email"}
            inputName={"cupportEmail"}
            inputType={"text"}
            inputValue={supportEmail}
            onchange={(e) => setSupportEmail(e.target.value)}
            labeltext={""}
          />
          <InputField
            labelName={"Representative Phone"}
            inputName={"supportPhone"}
            inputType={"text"}
            inputValue={supportPhone}
            onchange={(e) => setSupportPhone(e.target.value)}
            labeltext={""}
          />
          <InputField
            labelName={"Representative Title"}
            inputName={"personTitle"}
            inputType={"text"}
            inputValue={personTitle}
            onchange={(e) => setPersonTitle(e.target.value)}
            labeltext={""}
          />
        </div>
        <div className="w-full grid grid-cols-1 gap-6">
          {/* <InputField
            labelName={"Person Email"}
            inputName={"personEmail"}
            inputType={"text"}
            inputValue={personEmail}
            onchange={(e) => setPersonEmail(e.target.value)}
            labeltext={""}
          /> */}
          <InputField
            labelName={"Product Description"}
            inputName={"productDescription"}
            inputType={"text"}
            inputValue={productDescription}
            onchange={(e) => setProductDescription(e.target.value)}
            labeltext={""}
          />
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InputField
            labelName={"D.O.B"}
            inputName={"dob"}
            inputType={"date"}
            inputValue={dob}
            onchange={(e) => setDob(e.target.value)}
            labeltext={""}
          />
          <InputField
            labelName={"Website"}
            inputName={"website"}
            inputType={"text"}
            inputValue={website}
            onchange={(e) => setWebsite(e.target.value)}
            labeltext={""}
          />
          {/*  */}
          <InputField
            labelName={"S.S.N"}
            inputName={"ssn"}
            inputType={"text"}
            max={9}
            inputValue={ssn}
            onchange={(e) => setSsn(e.target.value)}
            labeltext={""}
          />
        </div>
        {/* <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            labelName={"Phone Number"}
            inputName={"phonenumber"}
            inputType={"text"}
            placeholder={"Enter your phone number"}
            labeltext={""}
            inputValue={phone}
            max={10}
            onchange={(e) => handleChange(e)}
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
        </div> */}
        <div className="w-full border mt-6" />
        <div className="w-full text-end mt-4">
          <button
            type="submit"
            className={`${styles.bgOrange} text-white font-medium text-base rounded-lg h-[52px] w-full md:w-[262px]`}
          >
            {loading ? <BtnLoader /> : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompleteStripeProfile;
