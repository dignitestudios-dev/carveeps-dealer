import React, { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { GlobalContext } from "./GlobalContext";
import axios from "axios";
import Cookies from "js-cookie";

export const PlanCreationContext = createContext();

const PlanCreationContextProvider = ({ children }) => {
  const {
    navigateToLink,
    baseUrl,
    navigate,
    setError,
    loading,
    setLoading,
    planName,
    setPlanDesc,
    setPlanName,
    planDesc,
    duration,
    setDuration,
    salesPerson,
    setSalesPerson,
    price,
    setPrice,
    state,
    setState,
    subscription,
    setSubscription,
    selectedServices,
    setSelectedServices,
    sendServices,
    setSendServices,
    setNewUpdate,
  } = useContext(GlobalContext);

  const createPlan = () => {
    const token = Cookies.get("token");
    if (token) {
      if (planName == "") {
        setError("Plan Name cannot be left empty.");
      } else if (planDesc == "") {
        setError("Plan Description cannot be left empty.");
      } else if (duration == "") {
        setError("Plan Duration must be selected.");
      } else if (price == "") {
        setError("Plan Price cannot be left empty.");
      } else if (salesPerson == "" || salesPerson == null) {
        setError("Sales Person must be selected.");
      } else {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        setLoading(true);
        axios
          .post(
            `${baseUrl}/dealership/subscription`,
            {
              name: planName,
              price: price,
              description: planDesc,
              interval:
                duration == "year"
                  ? "year"
                  : duration == "biannual"
                  ? "month"
                  : duration == "month" && "month",
              intervalCount:
                duration == "year"
                  ? 1
                  : duration == "biannual"
                  ? 6
                  : duration == "month" && 1,
              salesPersonId: salesPerson,
            },
            { headers }
          )
          .then((response) => {
            Cookies.set("planId", response?.data?.data?._id);
            setLoading(false);
            setState(state + 1);
            setSubscription(subscription + 1);
          })
          .catch((error) => {
            setLoading(false);
            setError(error?.response?.data?.message);
          });
      }
    } else {
      navigate("/login");
    }
  };

  const validateServices = () => {
    for (let item of selectedServices) {
      if (item.frequency == "") {
        setError(`Missing frequency of service: ${item.service.name}`);
        return false;
      } else if (duration !== "month" && item.duration == "") {
        setError(`Missing duration of service: ${item.service.name}`);
        return false;
      }
    }

    setError(false); // Clear the error if all services are valid
    return true;
  };

  const addServicesToPlan = (e) => {
    e.preventDefault();

    const token = Cookies.get("token");
    const id = Cookies.get("planId");
    const isValid = validateServices();
    if (token) {
      if (selectedServices == [] || selectedServices == null) {
        setError("Please add some services to your plan.");
      } else if (isValid) {
        console.log(selectedServices);
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        setLoading(true);
        axios
          .post(
            `${baseUrl}/dealership/subscription/service`,
            {
              subscriptionPlanId: id,
              services: sendServices,
            },
            { headers }
          )
          .then((response) => {
            setLoading(false);
            navigateToLink("/subscription-plans", "Subscription");
            setSubscription(1);
            setState(1);
            setNewUpdate((prev) => !prev);
            setPlanName("");
            setDuration("");
            setSalesPerson(null);
            setPlanDesc("");
            setPrice("");
            setSelectedServices([]);
            setSendServices([]);

            // setState(state + 1);
            // setSubscription(subscription + 1);
          })
          .catch((error) => {
            setLoading(false);
            setError(error?.response?.data?.message);
          });
      }
    } else {
      navigate("/login");
    }
  };

  // Preview
  const [formData, setFormData] = useState({
    salesPerson: {},
    planName: "",
    planDescription: "",
    price: "",
    duration: "",
    features: [],
    // add other fields as needed
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (service, isChecked) => {
    if (isChecked) {
      setSelectedServices((prev) => [
        ...prev,
        { service, frequency: "", interval: "" },
      ]);
      setSendServices((prev) => [
        ...prev,
        { service: service._id, frequency: "", interval: "" },
      ]);
    } else {
      setSelectedServices((prev) =>
        prev.filter((item) => item.service._id !== service._id)
      );
      setSendServices((prev) =>
        prev.filter((item) => item.service !== service._id)
      );
    }
  };

  const handleDurationChange = (service, newDuration) => {
    // Check if the service exists in the selected services

    // Update the duration in the selected services
    setSelectedServices((prev) =>
      prev.map((item) =>
        item.service._id === service._id
          ? { ...item, interval: newDuration }
          : item
      )
    );

    // Update the duration in the sendServices
    setSendServices((prev) =>
      prev.map((item) =>
        item.service === service._id ? { ...item, interval: newDuration } : item
      )
    );

    // Clear any previous error if needed
    setError(null);
  };

  const handleFrequencyChange = (service, newFrequency) => {
    setSelectedServices((prev) =>
      prev.map((item) =>
        item.service._id === service._id
          ? { ...item, frequency: newFrequency }
          : item
      )
    );
    setSendServices((prev) =>
      prev.map((item) =>
        item.service === service._id
          ? { ...item, frequency: newFrequency }
          : item
      )
    );

    // Clear any previous error if needed
    setError(null);
  };

  return (
    <PlanCreationContext.Provider
      value={{
        planName,
        setPlanDesc,
        setPlanName,
        planDesc,
        duration,
        setDuration,
        salesPerson,
        setSalesPerson,
        price,
        setPrice,
        createPlan,
        state,
        setState,
        subscription,
        setSubscription,
        loading,
        setLoading,
        formData,
        setFormData,
        handleInputChange,
        selectedServices,
        setSelectedServices,
        handleCheckboxChange,
        handleDurationChange,
        handleFrequencyChange,
        validateServices,
        addServicesToPlan,
      }}
    >
      {children}
    </PlanCreationContext.Provider>
  );
};

export default PlanCreationContextProvider;
