import React, { useContext, useState } from "react";
import Balance from "../components/PaymentGateaway/Balance";
import TransactionHistory from "../components/PaymentGateaway/TransactionHistory";
import { GlobalContext } from "../context/GlobalContext";
import PasswordModal from "../components/Reports/PasswordModal";

const PaymentGateaway = () => {
  const { showModal, setShowModal, handleShowModal, isAuthenticated } =
    useContext(GlobalContext);

  const [update, setUpdate] = useState(false);

  return isAuthenticated ? (
    <div>
      <Balance update={update} setUpdate={setUpdate} />
      <TransactionHistory setUpdate={setUpdate} />
    </div>
  ) : (
    <div>
      <PasswordModal
        showModal={showModal}
        setShowModal={setShowModal}
        onclick={handleShowModal}
        url={"/payment-gateway"}
      />
    </div>
  );
};

export default PaymentGateaway;
