import React, { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import Cookies from "js-cookie";
import { onMessageListener } from "../firebase/messages";
import getFCMToken from "../firebase/getFcmToken";

export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const navigate = useNavigate();
  // Sidebar link toggle
  const [activeLink, setActiveLink] = useState("Dashboard");
  const { pathname } = useLocation();

  const [reports, setReports] = useState(false);
  const baseUrl = "http://192.168.18.19:5050";

  // From plan creation context:

  const [state, setState] = useState(1);
  const [subscription, setSubscription] = useState(1);

  const [planName, setPlanName] = useState("");
  const [salesPerson, setSalesPerson] = useState(Cookies.get("salesPersonId"));
  const [planDesc, setPlanDesc] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedServices, setSelectedServices] = useState([]);
  const [sendServices, setSendServices] = useState([]);

  const navigateToLink = (link, name) => {
    navigate(link);
    if (
      link === "/reports/revenue-analysis" ||
      link === "/reports/subscribers-report" ||
      link === "/reports/subscription-bought"
    ) {
      // setIsAuthenticated(true);
      setReports(true);
    } else {
      setIsAuthenticated(false);
      setReports(false);
    }
    setSubscription(1);
    setState(1);
    setPlanName("");
    setDuration("");
    setSalesPerson(null);
    setPlanDesc("");
    setPrice("");
    setSelectedServices([]);
    setSendServices([]);
    setActiveLink(name);
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(true);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const [error, setError] = useState(false);
  const [tempData, setTempData] = useState(null);
  const [prevData, setPrevData] = useState(null);

  // Filters Data
  const [plans, setPlans] = useState(null);
  const [plansLoading, setPlansLoading] = useState(false);

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
          // setError(error?.response?.data?.message);
          setPlansLoading(false);
        });
    }
  };

  const [team, setTeam] = useState([]);
  const [teamLoading, setTeamLoading] = useState(false);
  const [newUpdate, setNewUpdate] = useState(false);

  const getTeam = () => {
    const token = Cookies.get("token");

    if (token) {
      setTeamLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios.get(`${baseUrl}/dealership/salesPerson`, { headers }).then(
        (response) => {
          setTeam(response?.data?.data);
          setTeamLoading(false);
        },
        (error) => {
          setTeamLoading(false);
        }
      );
    }
  };

  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [isTokenFound, setTokenFound] = useState(false);

  // // Send fcm to backend:
  const fetchToken = async () => {
    const token = await getFCMToken(setTokenFound);
    const authToken = Cookies.get("token");
    if (!authToken) {
      // setError("FCM Token Not found");
    } else if (authToken) {
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
      axios
        .post(
          `${baseUrl}/auth/updateFCM`,
          {
            fcmToken: token,
          },
          { headers }
        )
        .then((response) => {})
        .catch((err) => {
          setError(err?.response?.data?.message);
        });
    }

    // You can send this token to your server or use it as needed
  };

  onMessageListener()
    .then((payload) => {
      setShow(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
    })
    .catch((err) => console.log("failed: ", err));

  useEffect(() => {
    getPlans();
    getTeam();
  }, [newUpdate]);

  return (
    <GlobalContext.Provider
      value={{
        activeLink,
        setActiveLink,
        navigate,
        navigateToLink,
        isAuthenticated,
        setIsAuthenticated,
        showModal,
        setShowModal,
        setReports,
        reports,
        handleShowModal,
        baseUrl,
        error,
        setError,
        tempData,
        setTempData,
        prevData,
        setPrevData,
        team,
        plans,
        teamLoading,
        plansLoading,
        show,
        notification,
        setShow,
        fetchToken,
        setNewUpdate,

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
        loading,
        setLoading,
        selectedServices,
        setSelectedServices,
        sendServices,
        setSendServices,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
