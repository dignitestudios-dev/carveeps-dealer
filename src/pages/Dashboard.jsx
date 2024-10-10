import React, { useContext, useState } from "react";
import RevenueAndSubscription from "../components/Dashboard/RevenueAndSubscription";
import SubscribersList from "../components/Dashboard/SubscribersList";
import axios from "axios";
import Cookies from "js-cookie";
import { GlobalContext } from "../context/GlobalContext";
import DashboardGraph from "../components/Dashboard/DashboardGraph";

const Dashboard = () => {
  return (
    <div>
      <RevenueAndSubscription />
      <DashboardGraph />
      <SubscribersList />
    </div>
  );
};

export default Dashboard;
