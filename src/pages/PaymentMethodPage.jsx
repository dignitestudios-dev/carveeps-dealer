import React, { useContext, useEffect } from "react";
import PaymentForm from "../components/PaymentMethodPage/PaymentForm";
import { GlobalContext } from "../context/GlobalContext";
import Cookies from "js-cookie";

const PaymentMethodPage = () => {
  const { navigateToLink } = useContext(GlobalContext);
  useEffect(() => {
    const token = Cookies.get("token");
    const isBankAccountAdded = Cookies.get("isBankAccountAdded") === "true";

    if (token && isBankAccountAdded == "true") {
      navigateToLink("/report-access", "Dashboard");
    }
  }, []);
  return (
    <div>
      <PaymentForm />
    </div>
  );
};

export default PaymentMethodPage;
