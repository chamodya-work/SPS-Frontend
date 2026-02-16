import Applicant from "components/Applicant/Applicant";
import React, { useState } from "react";

const NewApplicant = () => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const [appData, setAppData] = useState({
    idNo: "",
    firstName: "",
    lastName: "",
    fullName: "",
    streetAddress: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [isModify, setIsModify] = useState(false);

  const handleSearch = async () => {
    // ... (keep your existing handleSearch implementation)
  };

  const handleFormSubmit = async (data) => {
    // ... (keep your existing submit logic)
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-center">
        <Applicant
          onFormSubmit={handleFormSubmit}
          handleSearch={handleSearch}
          isModify={isModify}
          appData={appData}
          setAppData={setAppData}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default NewApplicant;