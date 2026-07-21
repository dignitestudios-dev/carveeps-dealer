import React, { useContext, useState, useEffect } from "react";
import Balance from "../components/PaymentGateaway/Balance";
import TransactionHistory from "../components/PaymentGateaway/TransactionHistory";
import { GlobalContext } from "../context/GlobalContext";
import PasswordModal from "../components/Reports/PasswordModal";
import axios from "axios";
import Cookies from "js-cookie";

const PaymentGateaway = () => {
  const { showModal, setShowModal, handleShowModal, isAuthenticated } =
    useContext(GlobalContext);

  const [update, setUpdate] = useState(false);
  const [data, setData] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const { baseUrl, navigate, setError } = useContext(GlobalContext);

  const getData = () => {
    const token = Cookies.get("token");

    if (token) {
      setDataLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(`${baseUrl}/dealership/account`, {
          headers,
        })
        .then(
          (response) => {
            setData(response?.data?.data);
            setDataLoading(false);
          },
          (error) => {
            setDataLoading(false);
            if (error?.response?.status == 401) {
              Cookies.remove("token");
              navigate("/login");
            }
            setError(error?.response?.data?.message);
          }
        );
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getData();
    }
  }, [update, isAuthenticated]);

  return isAuthenticated ? (
    <div>
      <Balance
        data={data}
        dataLoading={dataLoading}
        getAccountData={getData}
        update={update}
        setUpdate={setUpdate}
      />
      <TransactionHistory
        payoutMode={data?.payoutMode}
        setUpdate={setUpdate}
      />
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
