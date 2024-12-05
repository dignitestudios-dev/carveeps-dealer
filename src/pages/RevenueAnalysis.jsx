import SubscribersList from "../components/RevenueAnalysis/SubscribersList";
import Analytics from "../components/RevenueAnalysis/Analytics";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import axios from "axios";
import Cookies from "js-cookie";

const RevenueAnalysis = () => {
  const [revenue, setRevenue] = useState([]);
  const [revenueList, setRevenueList] = useState([]);

  const { baseUrl, navigate, setError } = useContext(GlobalContext);
  const [revenueLoading, setRevenueLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [teamFilter, setTeamFilter] = useState(null);
  function convertToDateFormat(date) {
    // Extract the day, month, and year
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();

    // Combine into dd-mm-yyyy format
    return `${day}-${month}-${year}`;
  }

  const getRevenueAnalysis = (page) => {
    const token = Cookies.get("token");

    if (token) {
      setRevenueLoading((prev) => (currentPage > 0 ? prev : true));
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(
          filter?.date == null
            ? teamFilter !== null
              ? `${baseUrl}/dealership/reports/revenue?filter=${filter?.filter}&salesPerson=${teamFilter}`
              : `${baseUrl}/dealership/reports/revenue?filter=${filter?.filter}`
            : `${baseUrl}/dealership/reports/revenue?particularDate=${convertToDateFormat(
                filter?.date
              )}`,
          { headers }
        )
        .then(
          (response) => {
            setRevenue(response?.data?.data);
            const newSubscribers = response?.data?.data?.analysis
              ? response?.data?.data?.analysis
              : [];
            setRevenueList(newSubscribers);
            setRevenueLoading((prev) => (currentPage > 0 ? prev : false));

            setHasMore(newSubscribers.length > 0);
          },
          (error) => {
            setRevenueLoading((prev) => (currentPage > 0 ? prev : false));

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

  const fetchNewData = (length) => {
    setCurrentPage(length);
  };

  const [filter, setFilter] = useState({
    date: null,
    filter: "all",
  });

  useEffect(() => {
    getRevenueAnalysis(0);
  }, [filter, teamFilter]);
  return (
    <div>
      <Analytics revenue={revenue} loading={revenueLoading} />
      <SubscribersList
        revenue={revenueList}
        revenueData={revenue}
        loading={revenueLoading}
        setFilter={setFilter}
        filter={filter}
        setTeamFilter={setTeamFilter}
        fetchNewData={fetchNewData}
        hasMore={hasMore}
        currentPage={currentPage}
      />
    </div>
  );
};

export default RevenueAnalysis;
