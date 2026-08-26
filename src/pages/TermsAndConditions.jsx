import React from "react";
import PublicLegalLayout from "../components/Global/PublicLegalLayout";
import TermsAndServices from "../components/Settings/TermsAndServices";

const TermsAndConditions = () => {
  return (
    <PublicLegalLayout title="Terms & Conditions">
      <TermsAndServices />
    </PublicLegalLayout>
  );
};

export default TermsAndConditions;
