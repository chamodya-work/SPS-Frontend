// src/views/commission/ApplicantForm.js
import React, { useState, useEffect } from "react";

const ApplicantForm = ({ estimateNo }) => {
  const [formData, setFormData] = useState({
    nicPassportBusiness: "",
    fullNameRequestedBy: "",
    firstNameCompany: "",
    lastName: "",
    streetAddress: "",
    suburb: "",
    mobileNo: "",
    email: "",
  });
  // console.log("how about estimate number "+estimateNo);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicantData = async () => {
      try {
        setLoading(true);
        setError(null);


        // update version for applicant
        if (!estimateNo) {
          setError("No estimate number provided");
          setLoading(false);
          return;
        }

        // Encode the estimateNo for URL
        // const encodedEstimateNo = encodeURIComponent(estimateNo);


        // console.log('this is encoded ' +encodedEstimateNo);

        // Build the URL with query parameter
        // const url = `http://127.0.0.1:8088/SPS/api/applicants/by-estimate?estimateNo=${encodedEstimateNo}`;

        // Build the URL with query parameter
        // Use the estimateNo directly without encoding for the API call
        const url = `http://127.0.0.1:8088/SPS/api/applicants/by-estimate?estimateNo=${estimateNo}`;

        console.log("Fetching applicant data for estimate:", estimateNo);
        console.log("Request URL:", url);

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa("user:admin123"),
          },
        });

        console.log("Response status:", response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response:", errorText);
          throw new Error(
            `HTTP error! status: ${response.status} - ${errorText}`
          );
        }

        const data = await response.json();
        console.log("Received data:", data);

        if (data && data.length > 0) {
          const applicant = data[0];
          setFormData({
            nicPassportBusiness: applicant.idNo || "",
            fullNameRequestedBy: applicant.fullName || "",
            firstNameCompany: applicant.firstName || "",
            lastName: applicant.lastName || "",
            streetAddress: applicant.streetAddress || "",
            suburb: applicant.suburb || "",
            mobileNo: applicant.mobileNo || "",
            email: applicant.email || "",
          });
        } else {
          setError("No applicant data found for this estimate");
        }
      } catch (error) {
        console.error("Error fetching applicant data:", error);
        setError(
          `Failed to load applicant data for Estimate No: ${estimateNo}. Please verify the estimate number.`
        );
      } finally {
        setLoading(false);
      }
    };

    // if (estimateNo) {
    //   fetchApplicantData();
    // } else {
    //   setError("No estimate number provided");
    //   setLoading(false);
    // }

    fetchApplicantData();
  }, [estimateNo]);

  const fields = [
    {
      label: "NIC/Passport Number/Business Registration",
      name: "nicPassportBusiness",
      type: "text",
    },
    {
      label: "Full Name/Requested by",
      name: "fullNameRequestedBy",
      type: "text",
    },
    {
      label: "First Name(initials) Company Name/Requested By",
      name: "firstNameCompany",
      type: "text",
    },
    {
      label: "Last Name",
      name: "lastName",
      type: "text",
    },
    {
      label: "Street Address",
      name: "streetAddress",
      type: "text",
    },
    {
      label: "Suburb",
      name: "suburb",
      type: "text",
    },
    {
      label: "Mobile No",
      name: "mobileNo",
      type: "tel",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
    },
  ];

  if (loading) {
    return (
      <div className="form-container">
        <h3 className="form-title">Applicant Information</h3>
        <div className="loading-text">Loading applicant data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="form-container">
        <h3 className="form-title">Applicant Information </h3>
        <div className="error-text">{error}</div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h3 className="form-title">Applicant Information</h3>
      {/* <div className="estimate-info">
        <strong>Estimate No:</strong> {estimateNo}
      </div> */}
      <form>
        <div className="form-grid">
          {fields.map((field) => (
            <React.Fragment key={field.name}>
              <label htmlFor={field.name} className="form-label">
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                readOnly
                className="form-input"
              />
            </React.Fragment>
          ))}
        </div>
      </form>
    </div>
  );
};

export default ApplicantForm;
