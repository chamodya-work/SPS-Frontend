// src/views/commission/ApplicationDetails.js
import React, { useState, useEffect } from "react";

const ApplicationDetails = ({ estimateNo }) => {
  const [applicationData, setApplicationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicationData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Debug logging
        console.log("Original estimateNo:", estimateNo);

        // Encode estimateNo only once
        // const encodedEstimateNo = encodeURIComponent(estimateNo);
        // console.log("Encoded estimateNo:", encodedEstimateNo);

        // Build the complete URL
        const url = `http://127.0.0.1:8088/SPS/api/application/details?estimateNo=${estimateNo}`;
        console.log("Request URL:", url);

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa("user:admin123"),
          },
        });

        console.log("Response status:", response.status);
        console.log("Response URL:", response.url);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response:", errorText);
          throw new Error(
            `HTTP error! status: ${response.status} - ${errorText}`
          );
        }

        const data = await response.json();
        console.log("Received data:", data);
        setApplicationData(data);
      } catch (error) {
        console.error("Error fetching application data:", error);
        setError(
          `Failed to load application data for Estimate No: ${estimateNo}. Please verify the estimate number.`
        );
      } finally {
        setLoading(false);
      }
    };

    if (estimateNo) {
      fetchApplicationData();
    } else {
      setError("No estimate number provided");
      setLoading(false);
    }
  }, [estimateNo]);

  const fields = [
    {
      label: "Application No",
      name: "applicationNo",
      type: "text",
    },
    {
      label: "Application Id/Temporary Id",
      name: "applicationId",
      type: "text",
    },
    {
      label: "Application Type",
      name: "applicationType",
      type: "text",
    },
    {
      label: "Description",
      name: "description",
      type: "textarea",
    },
    {
      label: "Demand", //no
      name: "demand",
      type: "number",
    },
    {
      label: "Fund Source", //no
      name: "fundSource",
      type: "text",
    },
  ];

  if (loading) {
    return (
      <div className="form-container">
        <h3 className="form-title">Application Details</h3>
        <div className="loading-text">Loading application data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="form-container">
        <h3 className="form-title">Application Details</h3>
        <div className="error-text">{error}</div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h3 className="form-title">Application Details</h3>
      {applicationData.length === 0 ? (
        <div className="no-data-text">
          No application data found for this estimate
        </div>
      ) : (
        applicationData.map((application, index) => (
          <div key={index} className="application-item">
            <form>
              <div className="form-grid">
                {fields.map((field) => (
                  <React.Fragment key={field.name}>
                    <label
                      htmlFor={`${field.name}-${index}`}
                      className="form-label"
                    >
                      {field.label}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        id={`${field.name}-${index}`}
                        name={field.name}
                        value={application[field.name] || ""}
                        readOnly
                        className="form-input"
                        rows="3"
                      />
                    ) : (
                      <input
                        type={field.type}
                        id={`${field.name}-${index}`}
                        name={field.name}
                        value={application[field.name] || ""}
                        readOnly
                        className="form-input"
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </form>
            {index < applicationData.length - 1 && (
              <hr className="application-divider" />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ApplicationDetails;
