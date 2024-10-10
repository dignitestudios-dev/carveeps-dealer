import React from "react";
import Header from "../components/Subscription/Header";
import NoteToUser from "../components/SubscriptionPlans/NoteToUser";
import PackagesGrid from "../components/SubscriptionPlans/PackagesGrid";
import axios from "axios";
import Cookies from "js-cookie";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useState } from "react";
import { useEffect } from "react";

const SubscriptionPlans = () => {
  const { navigateToLink, baseUrl, setError } = useContext(GlobalContext);
  const [plans, setPlans] = useState(null);
  const [plansLoading, setPlansLoading] = useState(false);
  const [update, setUpdate] = useState(false);

  const getPlans = () => {
    const token = Cookies.get("token");
    if (token) {
      setPlansLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(`${baseUrl}/dealership/subscription`, { headers })
        .then((response) => {
          // if (response?.data?.data?.length == 0) {
          //   navigateToLink("/subscription", "Subscription");
          // }
          setPlans(response?.data?.data);

          setPlansLoading(false);
        })
        .catch((error) => {
          if (error?.response?.status == 401) {
            Cookies.remove("token");
            navigateToLink("/login", "Login");
          }
          setError(error?.response?.data?.message);
          setPlansLoading(false);
        });
    } else {
      navigateToLink("/login", "Login");
    }
  };

  useEffect(() => {
    getPlans();
  }, [update]);
  return (
    <div>
      <Header />
      {/* <NoteToUser /> */}
      <PackagesGrid
        plans={plans}
        plansLoading={plansLoading}
        setUpdate={setUpdate}
      />
    </div>
  );
};

export default SubscriptionPlans;
