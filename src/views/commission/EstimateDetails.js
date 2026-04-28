// src/views/commission/EstimateDetails.js
import React, { useState, useEffect } from "react";

const resolveApiBaseUrl = () => {
  const envBaseUrl = (process.env.REACT_APP_API_BASE_URL || "").trim();

  if (typeof window !== "undefined") {
    const isCraDevServer =
      (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1") &&
      window.location.port === "3000";

    if (!isCraDevServer) {
      return "/SPSNEW";
    }
  }

  return envBaseUrl || "/SPSNEW";
};

const normalizeEstimateNo = (value) => {
  const trimmedValue = (value || "").trim();

  if (!trimmedValue) {
    return "";
  }

  try {
    return decodeURIComponent(trimmedValue);
  } catch {
    return trimmedValue;
  }
};

const EstimateDetails = ({ estimateNo }) => {
  const API_BASE_URL = resolveApiBaseUrl().replace(/\/$/, "");
  const [formData, setFormData] = useState({
    securityDeposite: "",
    cebCost: "",
    vatCost: "",
    ssclCost: "",
    demand: "",
    rebateCost: "",
    nbtCost: "",
    totalConsumerPayableCost: "",
  });

  const [estimateItems, setEstimateItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch estimate details data
  useEffect(() => {
    const fetchEstimateDetails = async () => {
      const sanitizedEstimateNo = encodeURIComponent(
        normalizeEstimateNo(estimateNo)
      );
      if (!sanitizedEstimateNo) {
        setError("Estimate number is required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `${API_BASE_URL}/api/estimate-details?estimateNo=${sanitizedEstimateNo}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Basic " + btoa("user:admin123"),
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch estimate details: ${response.status}`
          );
        }

        const data = await response.json();
        setFormData({
          securityDeposite: data.secdeposit,
          cebCost: data.cebcost,
          vatCost: data.vatcost,
          ssclCost: data.sctcost,
          demand: data.demand,
          rebateCost: data.rebateCost,
          nbtCost: data.nbtcost,
          totalConsumerPayableCost: data.toconpay,
        });
      } catch (error) {
        console.error("Error fetching estimate details:", error);
        setError("Failed to load estimate details");
      } finally {
        setLoading(false);
      }
    };

    fetchEstimateDetails();
  }, [estimateNo]);

  // Fetch estimate items
  useEffect(() => {
    const fetchEstimateItems = async () => {
      const sanitizedEstimateNo = encodeURIComponent(
        normalizeEstimateNo(estimateNo)
      );
      if (!sanitizedEstimateNo) {
        setError("Estimate number is required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `${API_BASE_URL}/api/estimate-details?estimateNo=${sanitizedEstimateNo}&action=items`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Basic " + btoa("user:admin123"),
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch items: ${response.status}`);
        }

        const data = await response.json();
        setEstimateItems(data);
      } catch (error) {
        console.error("Error fetching estimate items:", error);
        setError("Failed to load estimate items");
      } finally {
        setLoading(false);
      }
    };

    fetchEstimateItems();
  }, [estimateNo]);

  // Form fields configuration
  const leftFields = [
    { label: "Security Deposite", name: "securityDeposite", type: "text" },
    { label: "CEB Cost", name: "cebCost", type: "text" },
    { label: "Vat Cost", name: "vatCost", type: "text" },
    { label: "SSCL Cost", name: "ssclCost", type: "text" },
  ];

  const rightFields = [
    { label: "Demand", name: "demand", type: "text" },
    { label: "Rebate Cost", name: "rebateCost", type: "text" },
    { label: "NBT Cost", name: "nbtCost", type: "text" },
    {
      label: "Total Consumer Payable Cost",
      name: "totalConsumerPayableCost",
      type: "text",
    },
  ];

  if (loading) {
    return (
      <div className="form-container">
        <h3 className="form-title">Estimate Details</h3>
        <div className="loading-text">Loading estimate data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="form-container">
        <h3 className="form-title">Estimate Details</h3>
        <div className="error-text">{error}</div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h3 className="form-title">Estimate Details</h3>
      <form>
        {/* Side by side form layout */}
        <div className="estimate-form-layout">
          {/* Left side */}
          <div className="estimate-form-column">
            {leftFields.map((field) => (
              <div className="estimate-form-group" key={field.name}>
                <label htmlFor={field.name} className="estimate-form-label">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ""}
                  readOnly
                  className="estimate-form-input"
                />
              </div>
            ))}
          </div>

          {/* Right side */}
          <div className="estimate-form-column">
            {rightFields.map((field) => (
              <div className="estimate-form-group" key={field.name}>
                <label htmlFor={field.name} className="estimate-form-label">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ""}
                  readOnly
                  className="estimate-form-input"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Estimate Items Table */}
        <div className="estimate-table-container">
          <table className="commission-table">
            <thead>
              <tr className="table-header">
                <th>Code</th>
                <th>Uom</th>
                <th>Description</th>
                <th>Quantity/Length</th>
                <th>Standard Rate</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {estimateItems.length > 0 ? (
                estimateItems.map((item, index) => (
                  <tr key={index} className="table-row">
                    <td className="table-cell">{item.lineType}</td>
                    <td className="table-cell">{item.uom}</td>
                    <td className="table-cell">{item.linedes}</td>
                    <td className="table-cell">{item.length}</td>
                    <td className="table-cell">
                      {item.estCost?.toLocaleString()}
                    </td>
                    <td className="table-cell">
                      {item.lineCost?.toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
                    No estimate items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default EstimateDetails;
