import React, { useState, useContext, useEffect } from "react";
import SubscriberProfile from "../components/SubscriberDetails/SubscriberProfile";
import SubscriberServices from "../components/SubscriberDetails/SubscriberServices";
import PreviousSubscriptions from "../components/SubscriberDetails/PreviousSubscriptions";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import axios from "axios";
import Cookies from "js-cookie";
import Loader from "../components/Global/Loader";

const SubscriberDetails = () => {
  const { baseUrl, navigate, setError, tempData } = useContext(GlobalContext);
  const [data, setData] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const { id } = useParams();

  const getData = () => {
    const token = Cookies.get("token");

    if (token) {
      setDataLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(`${baseUrl}/user/subscription?subscriptionId=${id}`, {
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

  const [prevSubscription, setPrevSubscription] = useState([]);
  const [prevSubscriptionLoading, setPrevSubscriptionLoading] = useState(false);
  const getPreviousSubscriptions = () => {
    const token = Cookies.get("token");

    if (token) {
      setPrevSubscriptionLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(
          `${baseUrl}/user/subscription/previous?userId=${tempData?.user?._id}`,
          {
            headers,
          }
        )
        .then(
          (response) => {
            setPrevSubscription(response?.data?.data);
            setPrevSubscriptionLoading(false);
          },
          (error) => {
            setPrevSubscriptionLoading(false);
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
    getData();
    tempData?.user?._id && getPreviousSubscriptions();
  }, []);
  return (
    <div>
      <SubscriberProfile data={data} loading={dataLoading} />
      <SubscriberServices data={data} loading={dataLoading} />
      <PreviousSubscriptions
        data={prevSubscription}
        loading={prevSubscriptionLoading}
      />
      <div className="w-full flex justify-end pt-10 pb-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="w-[250px] h-[50px] rounded-[8px] bg-[#FF204E] text-white text-base font-bold flex items-center justify-center"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default SubscriberDetails;
