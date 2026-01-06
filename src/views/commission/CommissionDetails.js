// src/views/commission/CommissionDetails.js
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./commission.css";
import ApplicantForm from "./ApplicantForm";
import ApplicationDetails from "./ApplicationDetails";
import PivDetails from "./PivDetails";
import EstimateDetails from "./EstimateDetails";
import ServiceDetails from "./ServiceDetails";
import CommentHistoryApproval from "./CommentHistoryApproval";
import Attachments from "./Attachments";

export default function CommissionDetails() {
  const { id } = useParams();
  // const decodedEstimateNo = decodeURIComponent(id); 
  const decodedEstimateNo = id; // e.g., "501.20/BS/13/0001/1"
  const [activeTab, setActiveTab] = useState("applicant");

  const tabs = [
    "applicant",
    "application-details",
    "piv-details",
    "service-details",
    "estimate-details",
    "comments-approval",
    "attachments",
  ];

  // Separate state for Applicant form
  const [applicantData, setApplicantData] = useState({
    nicPassportBusiness: "",
    fullNameRequestedBy: "",
    firstNameCompany: "",
    lastName: "",
    streetAddress: "",
    suburb: "",
    mobileNo: "",
    email: "",
  });

  // Separate state for Application Details form
  const [applicationDetails, setApplicationDetails] = useState({
    applicationNo: "",
    applicationId: "",
    applicationType: "",
    description: "",
    demand: "",
    fundSource: "",
  });

  // Separate state for Service Details form
  const [serviceDetails, setServiceDetails] = useState({
    serviceStreetAddress: "",
    serviceSuburb: "",
    serviceCity: "",
    area: "",
    district: "",
    contractDemand: "",
    neighbourAccountNumber: "",
  });

  // Separate state for Estimate Details form
  const [estimateDetails, setEstimateDetails] = useState({
    powerToSupply: "",
    securityDeposite: "",
    cebCost: "",
    vatCost: "",
    ssclCost: "",
    fullNameRequestedBy: "",
    demand: "",
    rebateCost: "",
    nbtCost: "",
    totalConsumerPayableCost: "",
  });

  // Handler for Applicant form changes
  const handleApplicantChange = (e) => {
    const { name, value } = e.target;
    setApplicantData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for Application Details form changes
  const handleApplicationDetailsChange = (e) => {
    const { name, value } = e.target;
    setApplicationDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for Service Details form changes
  const handleServiceDetailsChange = (e) => {
    const { name, value } = e.target;
    setServiceDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for Estimate Details form changes
  const handleEstimateDetailsChange = (e) => {
    const { name, value } = e.target;
    setEstimateDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="details-container">
      <div className="details-wrapper">
        <div className="details-card">
          {/* Breadcrumb */}
          <div className="breadcrumb">
            <Link to="/admin/commission">Commission</Link>
            <span className="breadcrumb-separator">/</span>
            <span>Commission Details (ID: {decodedEstimateNo})</span>
          </div>

          {/* Tab Navigation */}
          <div className="tab-navigation">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`tab-button ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {/* {tab === "comments-approval"
                  ? "Comments & Approval History"
                  : tab.split("-").join(" ")} */}

                {/* updated section for check applicant */}

                {tab === "applicant" && "Applicant Information"}
                {tab === "application-details" && "Application Details"}
                {tab === "piv-details" && "PIV Details"}
                {tab === "service-details" && "Service Details"}
                {tab === "estimate-details" && "Estimate Details"}
                {tab === "comments-approval" && "Comments & Approval History"}
                {tab === "attachments" && "Attachments"}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === "applicant" && (
              <ApplicantForm
              //  updated section for check applicant 
                // formData={applicantData}
                // handleChange={handleApplicantChange}
                estimateNo={decodedEstimateNo}
              />
            )}

            {activeTab === "application-details" && (
              <ApplicationDetails
                // formData={applicationDetails}
                // handleChange={handleApplicationDetailsChange}
                estimateNo={decodedEstimateNo}
              />
            )}

            {activeTab === "piv-details" && (
              <PivDetails estimateNo={decodedEstimateNo} />
            )}

            {activeTab === "service-details" && (
              <ServiceDetails
                formData={serviceDetails}
                handleChange={handleServiceDetailsChange}
                estimateNo={decodedEstimateNo}
              />
            )}

            {activeTab === "estimate-details" && (
              <EstimateDetails
                formData={estimateDetails}
                handleChange={handleEstimateDetailsChange}
                estimateNo={decodedEstimateNo}
              />
            )}

            {activeTab === "comments-approval" && (
              <CommentHistoryApproval estimateNo={decodedEstimateNo} />
            )}

            {activeTab === "attachments" && <Attachments />}
          </div>
        </div>
      </div>
    </div>
  );
}
