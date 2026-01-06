import { useState, useEffect } from "react";

import GeneralInfo from "../../components/EstimationForms/GeneralInfo";
import TechnicalDetails from "../../components/EstimationForms/TechnicalDetails";
import CostMeasurements from "../../components/EstimationForms/CostMeasurements";
import Actions from "../../components/EstimationForms/Actions";
import StandardRates from "../../components/EstimationForms/StandardRates";
import Uploads from "../../components/EstimationForms/Uploads";

const Tabs = () => {

  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const [activeTab, setActiveTab] = useState(0);
  const [completedTabs, setCompletedTabs] = useState(Array(6).fill(false));
  const [editMode, setEditMode] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const [generalInfo, setGeneralInfo] = useState({
    appNo: "",
    name: "",
    address: "",
    deptId: "",
    jobDescription: "",
    beneficiaries: "",
    powerSupply: "",
    rejectedReason: "",
    entryDate: new Date(),
  });

  const [technicalDetails, setTechnicalDetails] = useState({
    demand: "",
    mvlinetype: "MV Line - OTHER",
    fundSource: "",
    SinNo: "",
    ExistingCapacity: "",
    NewCapacity: "",
    VoltageLevel: "",
    LineLengthCustomerPremises: "",
    LineLengthMVLineOutsideCustomerPremises: "",
  });

  const [costMeasurements, setCostMeasurements] = useState({
    securityDeposit: "",
    vat: "",
    nbt: "",
    loanPercentage: "",
    totalCost: "",
  });

  // Generic handler for form state updates
  const handleGeneralInfoChange = (e) => {
    const { name, value } = e.target;
    setGeneralInfo({ ...generalInfo, [name]: value });
  };

  const handleTechnicalDetailsChange = (e) => {
    const { name, value } = e.target;
    setTechnicalDetails({ ...technicalDetails, [name]: value });
  };

  const handleCostChange = (e) => {
    const { name, value } = e.target;
    setCostMeasurements((prev) => ({ ...prev, [name]: value }));
  };

  const isFormCompleted = (formData, requiredFields = []) => {
    if (requiredFields.length > 0) {
      return requiredFields.every(
        (key) =>
          formData[key] !== null &&
          formData[key] !== undefined &&
          !(typeof formData[key] === "string" && formData[key].trim() === "")
      );
    }

    return Object.values(formData).every(
      (value) =>
        value !== null &&
        value !== undefined &&
        !(typeof value === "string" && value.trim() === "")
    );
  };

  // Update completed steps when form changes
  useEffect(() => {
    console.log("validating forms...", generalInfo); // debug
    setCompletedTabs([
      isFormCompleted(generalInfo, ["appNo", "name", "address"]), // only required ones
      isFormCompleted(technicalDetails),
      isFormCompleted(costMeasurements),
      false,
      false,
      false,
    ]);
  }, [generalInfo, technicalDetails, costMeasurements]);

  const handleSearch = async () => {
    if (!generalInfo.appNo) {
      alert("please enter an application reference no");
      return;
    }

    setLoadingSearch(true);
    try {
      const response = await fetch(
        `${baseUrl}/api/spstdesthmt/applicant/${generalInfo.appNo}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa("user:admin123"),
          },
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("not found");

      const data = await response.json();
      console.log("Fetched data:", data);

      setGeneralInfo((prev) => ({
        ...prev,
        name: `${data.firstName || ""} ${data.lastName || ""}`.trim(),
        address: data.streetAddress || "",
        jobDescription: data.jobname || "",
        rejectedReason: data.rejReasonEe || "",
        beneficiaries: data.beneficiaries || "",
        powerSupply: data.powerSupply || "",
      }));
    } catch (err) {
      console.error(err);
      alert("application not found");
    } finally {
      setLoadingSearch(false);
    }
  };

  const handleSubmit = async () => {
  // Auto-assign deptId from appNo if not already set
  const updatedDeptId = generalInfo.deptId?.trim()
    ? generalInfo.deptId
    : generalInfo.appNo;

  if (!generalInfo.name || !updatedDeptId) {
    alert("Please fill in name and application reference number.");
    return;
  }

  const payload = {
    appNo: generalInfo.appNo,
    stdNo: generalInfo.name,
    deptId: updatedDeptId,
    jobName: generalInfo.jobDescription,
    description: generalInfo.jobDescription,
    contingency: "none",
    beneficiaries: generalInfo.beneficiaries,
    powerSupply: generalInfo.powerSupply,
    rejectedReason: generalInfo.rejectedReason,
    entryDate:
      generalInfo.entryDate instanceof Date
        ? generalInfo.entryDate.toISOString()
        : new Date().toISOString(),
    demand: technicalDetails.demand,
    mvlinetype: technicalDetails.mvlinetype,
    fundSource: technicalDetails.fundSource,
    sinNo: technicalDetails.SinNo,
    exCapacity: technicalDetails.ExistingCapacity,
    newCapacity: technicalDetails.NewCapacity,
    voltageLevel: technicalDetails.VoltageLevel,
    lineLength: technicalDetails.LineLengthCustomerPremises,
    lineLengthMVLineOutsideCustomerPremises:
      technicalDetails.LineLengthMVLineOutsideCustomerPremises,
    secDeposit: costMeasurements.securityDeposit,
    vatCost: costMeasurements.vat,
    nbtCost: costMeasurements.nbt,
    loanPercentage: costMeasurements.loanPercentage,
    totalCost: costMeasurements.totalCost,
  };

  try {
    const response = await fetch(
      '${baseUrl}/api/spstdesthmt',
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("user:admin123"),
        },
        credentials: "include",
        body: JSON.stringify(payload),
      }
    );

    if (response.ok) {
      alert(`Details updated successfully! AppNo: ${payload.appNo}`);
    } else {
      const errorText = await response.text();
      console.error("Server response:", errorText);
      alert("Failed to update details.");
    }
  } catch (error) {
    console.error("Error saving data:", error);
    alert("Error saving details.");
  }
};


  const tabs = [
    {
      name: "general information",
      content: (
        <GeneralInfo
          formData={generalInfo}
          handleChange={handleGeneralInfoChange}
          editMode={editMode}
          onSearch={handleSearch}
          loadingSearch={loadingSearch}
        />
      ),
    },
    {
      name: "technical details",
      content: (
        <TechnicalDetails
          formData={technicalDetails}
          handleChange={handleTechnicalDetailsChange}
        />
      ),
    },
    {
      name: "cost & measurements",
      content: (
        <CostMeasurements
          formData={costMeasurements}
          handleChange={handleCostChange}
        />
      ),
    },
    { name: "uploads", content: <Uploads /> },
    { name: "standard rates", content: <StandardRates /> },
    { name: "actions", content: <Actions handleSubmit={handleSubmit} /> },
  ];

  const handleNext = () => {
    const requiredFieldsMap = {
      0: ["appNo", "name", "address", "deptId"], // general info tab
      1: [], // technical details tab (add required fields if needed)
      2: [], // cost measurements tab (add required fields if needed)
    };

    const currentTabIndex = activeTab;
    const currentTabData = tabs[currentTabIndex].content.props?.formData;
    const requiredFields = requiredFieldsMap[currentTabIndex] || [];

    // if (currentTabData && !isFormCompleted(currentTabData, requiredFields)) {
    //   alert("please fill in all fields before proceeding.");
    //   return;
    // }

    if (activeTab < tabs.length - 1) {
      setActiveTab(activeTab + 1);
    }
  };

  const handlePrev = () => {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6 mt-6">
      <div className="w-full max-w-4xl px-4 mb-2">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full shadow-lg rounded p-1">
          {/* Stepper */}
          <div className="flex justify-between items-center mb-4 mt-4 relative w-full">
            {tabs.map((tab, index) => (
              <div
                key={index}
                className="relative flex-1 flex flex-col items-center"
              >
                {index < tabs.length - 1 && (
                  <div
                    className={`absolute top-5 left-1/2 w-full h-1 -z-10 ${
                      completedTabs[index] ? "bg-emerald-400" : "bg-gray-300"
                    }`}
                  />
                )}

                {/* Step circle */}
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all "
                  style={{
                    backgroundColor:
                      index < activeTab
                        ? "#34d399"
                        : index === activeTab
                        ? "#ffd800"
                        : "transparent",
                    borderColor:
                      index < activeTab
                        ? "#34d399"
                        : index === activeTab
                        ? "#ffd800"
                        : "#d1d5db",
                    color:
                      index < activeTab || index === activeTab
                        ? "white"
                        : "black",
                  }}
                >
                  {index + 1}
                </div>
                <span className="text-sm mt-2">{tab.name}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center mb-2">
            <h6 className="px-6 text-sm font-bold text-blueGray-700">
              {tabs[activeTab].name}
            </h6>
          </div>

          <div className="ml-0 bg-blueGray-100">
            <div className="px-12 rounded pb-4">{tabs[activeTab].content}</div>
          </div>
        </div>

        <div className="bg-white rounded px-12 h-16 flex justify-between items-center mb-4 space-x-2">
          <div className="ml-4 pl-4">
            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                style={{ backgroundColor: "#7c0000" }}
                className="text-white text-sm px-6 py-2 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150"
              >
                edit
              </button>
            )}
          </div>
          <div className="mr-4 pr-2">
            {activeTab > 0 && (
              <button
                onClick={handlePrev}
                style={{ backgroundColor: "#7c0000" }}
                className="text-white text-sm px-6 py-2 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150"
              >
                previous
              </button>
            
            )}

            {activeTab < tabs.length - 1 ? (
              <button
                onClick={handleNext}
                style={{ backgroundColor: "#7c0000" }}
                className="text-white ml-2 mr-12 text-sm px-6 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
              >
                next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="bg-emerald-400 text-white ml-2 text-sm px-6 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
              >
                submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
