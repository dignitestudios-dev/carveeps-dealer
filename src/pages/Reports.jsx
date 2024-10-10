import React, { useContext, useState } from "react";
import PasswordModal from "../components/Reports/PasswordModal";
import RevenueAnalysis from "./RevenueAnalysis";
import { GlobalContext } from "../context/GlobalContext";

const Reports = () => {
  const {showModal, setShowModal, handleShowModal, isAuthenticated} = useContext(GlobalContext)
  return (
    isAuthenticated ? <RevenueAnalysis /> :
    <div>
      <PasswordModal showModal={showModal} setShowModal={setShowModal} onclick={handleShowModal} url={'/reports/revenue-analysis'}/>
    </div>
  );
};

export default Reports;
