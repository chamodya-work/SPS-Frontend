// import AppDetails from "components/Tabs/AppDetail";
// import LocationalDetails from "components/Tabs/LocationalDetail";
// import PersonalDetails from "components/Tabs/PersonalDetail";
// import TechDetails from "components/Tabs/TechDetails";
// import { CheckCircle } from "lucide-react";
// import { useState } from "react";
// import React from "react";
// import { useHistory } from "react-router-dom";

// const tabs = [
//   {
//     id: "application",
//     label: "Application Details",
//     component: <AppDetails />,
//   },
//   { id: "personal", label: "Personal Details", component: <PersonalDetails /> },
//   {
//     id: "locational",
//     label: "Service Location Details",
//     component: <LocationalDetails />,
//   },
//   { id: "technical", label: "Technical Details", component: <TechDetails /> },
// ];

// const NewApplication = ({
//   onFormSubmit,
//   isModify,
//   formData,
//   setFormData,
//   handleSearch,
// }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const history = useHistory();

//   // const validateCurrentTab = () => {
//   //   const currentTab = tabs[currentIndex].id;
//   //   const currentData = formData[currentTab];
//   //   if (!currentData) return false;

//   //   // Add validation logic for each tab
//   //   switch (currentTab) {
//   //     // case "application":
//   //     //   return currentData.applicationId && currentData.description;
//   //     case "personal":
//   //       return currentData.fname && currentData.lname;
//   //     // case "locational":
//   //     //   return currentData.address && currentData.city;
//   //     // case "technical":
//   //       // return currentData.techField1 && currentData.techField2;
//   //     default:
//   //       return true;
//   //   }
//   // };

//   const handleNext = () => {
//     if (currentIndex < tabs.length - 1) setCurrentIndex((prev) => prev + 1);
//     // if (validateCurrentTab()) {
//     //   if (currentIndex < tabs.length - 1) setCurrentIndex((prev) => prev + 1);
//     // } else {
//     //   alert("Please fill all required fields before proceeding.");
//     // }
//   };

//   const handlePrevious = () => {
//     if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
//   };

//   const handleInputChange = (section, data) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [section]: { ...prevData[section], ...data },
//     }));
//   };

//   const handleSubmit = () => {
//     onFormSubmit(formData);
//   };

//   const handleUpdateClick = () => {
//     history.push("/application/modify");
//   };

//   return (
//     <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
//       {/* Stepper */}
//       <div className="relative flex items-center justify-between mt-4 mb-2">
//         {tabs.map((tab, index) => (
//           <div
//             key={tab.id}
//             className={`flex-1 flex flex-col items-center cursor-pointer relative${
//               index <= currentIndex
//                 ? "text-blue-600"
//                 : index === currentIndex
//                 ? "text-blue-600"
//                 : "text-gray-400"
//             }`}
//           >
//             {index > 0 && (
//               <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-0.5 bg-gray-300 z-0"></div>
//             )}
//             <div
//               className="flex items-center justify-center w-10 h-10 transition-all border-2 rounded-full "
//               style={{
//                 backgroundColor:
//                   index < currentIndex
//                     ? "#34d399"
//                     : index === currentIndex
//                     ? "#ffd800"
//                     : "transparent",
//                 borderColor:
//                   index < currentIndex
//                     ? "#34d399"
//                     : index === currentIndex
//                     ? "#ffd800"
//                     : "#d1d5db",
//                 color:
//                   index < currentIndex || index === currentIndex
//                     ? "white"
//                     : "black",
//               }}
//             >
//               {currentIndex[index] ? (
//                 <CheckCircle size={20} />
//               ) : (
//                 <span className="font-bold">{index + 1}</span>
//               )}
//             </div>
//             {index < tabs.length - 1 && (
//               <div
//                 className={`h-2 ml-0 flex-1 ${
//                   currentIndex[index] ? "bg-lightBlue-500" : "bg-gray-300"
//                 }`}
//               ></div>
//             )}
//             <span className="mt-2 text-sm">{tab.label}</span>
//           </div>
//         ))}
//       </div>
//       <div className="flex justify-center mb-2 text-center">
//           <h6 className="text-sm font-bold text-blueGray-700">
//             {tabs[currentIndex].label}
//           </h6>
//         </div>
//       {/* Content */}
//       <div className="p-6 rounded-lg bg-blueGray-100">
        
//         {tabs[currentIndex].id === "application" && (
//           <AppDetails
//             onInputChange={(data) => handleInputChange("appDetails", data)}
//             isModify={isModify}
//             data={formData.appDetails}
//             handleSearch={handleSearch}
//           />
//         )}
//         {tabs[currentIndex].id === "personal" && (
//           <PersonalDetails
//             onInputChange={(data) => handleInputChange("personalDetails", data)}
//             data={formData.personalDetails}
//           />
//         )}
//         {tabs[currentIndex].id === "locational" && (
//           <LocationalDetails
//             onInputChange={(data) =>
//               handleInputChange("locationalDetails", data)
//             }
//             data={formData.locationalDetails}
//           />
//         )}
//         {tabs[currentIndex].id === "technical" && (
//           <TechDetails
//             onInputChange={(data) => handleInputChange("techDetails", data)}
//             //data={formData.TechDetails}
//           />
//         )}
//       </div>

//       <div className="flex justify-between px-12 ml-2">
//         <div>
//           {!isModify && (
//             <button
//               onClick={handleUpdateClick}
//               style={{ backgroundColor: "#7c0000" }}
//               className="px-6 py-2 mt-2 mr-1 text-sm text-white transition-all duration-150 ease-linear rounded shadow outline-none active:bg-emerald-600 hover:shadow-md focus:outline-none"
//             >
//               Edit
//             </button>
//           )}
//         </div>

//         {/* Navigation Buttons */}
//         <div className="flex items-center justify-end mt-2 mb-4 mr-1">
//           {currentIndex > 0 ? (
//             <button
//               onClick={handlePrevious}
//               style={{ backgroundColor: "#7c0000" }}
//               className="px-6 py-2 mr-1 text-sm text-white transition-all duration-150 ease-linear rounded shadow outline-none active:bg-lightBlue-600 hover:shadow-md focus:outline-none"
//             >
//               Previous
//             </button>
//           ) : null}
//           {currentIndex < tabs.length - 1 ? (
//             <button
//               onClick={handleNext}
//               style={{ backgroundColor: "#7c0000" }}
//               className="px-6 py-2 mr-1 text-sm text-white transition-all duration-150 ease-linear rounded shadow outline-none active:bg-lightBlue-600 hover:shadow-md focus:outline-none"
//             >
//               Next
//             </button>
//           ) : (
//             <button
//               onClick={handleSubmit}
//               className="px-6 py-2 mr-1 text-sm text-white transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-400 active:bg-emerald-600 hover:shadow-md focus:outline-none"
//             >
//               {isModify ? "Update" : "Submit"}
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewApplication;
// Updated: sanjula
// import AppDetails from "components/Tabs/AppDetail";
// import LocationalDetails from "components/Tabs/LocationalDetail";
// import PersonalDetails from "components/Tabs/PersonalDetail";
// import TechDetails from "components/Tabs/TechDetails";
// import { useState } from "react";
// import React from "react";
// import { useHistory } from "react-router-dom";

// const tabs = [
//   { id: "application", label: "Application Details" },
//   { id: "personal", label: "Personal Details" },
//   { id: "locational", label: "Service Location Details" },
//   { id: "technical", label: "Technical Details" },
// ];

// const NewApplication = ({
//   onFormSubmit,
//   isModify,
//   formData,
//   setFormData,
//   handleSearch,
// }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [completedTabs, setCompletedTabs] = useState([false, false, false, false]);
//   const history = useHistory();

//   const handleNext = () => {
//     if (currentIndex < tabs.length - 1) {
//       setCompletedTabs((prev) => {
//         const newTabs = [...prev];
//         newTabs[currentIndex] = true;
//         return newTabs;
//       });
//       setCurrentIndex((prev) => prev + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentIndex > 0) {
//       setCompletedTabs((prev) => {
//         const newTabs = [...prev];
//         if (currentIndex - 1 >= 0) {
//           newTabs[currentIndex - 1] = false;
//         }
//         return newTabs;
//       });
//       setCurrentIndex((prev) => prev - 1);
//     }
//   };

//   const handleInputChange = (section, data) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [section]: { ...prevData[section], ...data },
//     }));
//   };

//   const handleSubmit = () => {
//     onFormSubmit(formData);
//   };

//   const handleUpdateClick = () => {
//     history.push("/application/modify");
//   };

//   return (
//     <div className="w-full bg-white rounded-lg shadow-lg p-6">
//       {/* Stepper */}
//       <div className="flex justify-between items-center mb-8 relative">
//         {tabs.map((tab, index) => (
//           <div key={tab.id} className="relative flex-1 flex flex-col items-center">
//             {index > 0 && (
//               <div
//                 className={`absolute top-5 left-0 transform -translate-y-1/2 h-0.5 w-full ${
//                   completedTabs[index - 1] ? "bg-gray" : "bg-gray-300"
//                 }`}
//                 style={{ left: "-50%", width: "100%", zIndex: 0 }}
//               ></div>
//             )}
//             <div
//               className="w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all z-10 bg-white cursor-pointer"
//               style={{
//                 borderColor: completedTabs[index] 
//                   ? "#10b981" 
//                   : (index === currentIndex ? "#dee110" : "#d1d5db"),
//                 backgroundColor: completedTabs[index] 
//                   ? "#10b981" 
//                   : (index === currentIndex ? "#dee110" : "white"),
//                 color: completedTabs[index] || index === currentIndex ? "white" : "#6b7280",
//               }}
//               onClick={() => {
//                 if (index <= currentIndex || completedTabs[index - 1] || index === 0) {
//                   setCurrentIndex(index);
//                 }
//               }}
//             >
//               {index + 1}
//             </div>
//             <span className={`text-sm mt-2 text-center font-medium ${
//               index === currentIndex ? "text-gray" : "text-gray-600"
//             }`}>
//               {tab.label}
//             </span>
//           </div>
//         ))}
//       </div>

//       {/* Section Title */}
//       <div className="text-center mb-4">
//         <h2 className="text-lg font-bold text-gray-800">{tabs[currentIndex].label}</h2>
//       </div>

//       {/* Content */}
//       <div className="bg-gray-50 rounded-lg border mb-4">
//         <div className="p-6">
//           {tabs[currentIndex].id === "application" && (
//             <AppDetails
//               onInputChange={(data) => handleInputChange("appDetails", data)}
//               isModify={isModify}
//               data={formData.appDetails}
//               handleSearch={handleSearch}
//             />
//           )}

//           {tabs[currentIndex].id === "personal" && (
//             <PersonalDetails
//               onInputChange={(data) => handleInputChange("personalDetails", data)}
//               data={formData.personalDetails}
//             />
//           )}

//           {tabs[currentIndex].id === "locational" && (
//             <LocationalDetails
//               onInputChange={(data) => handleInputChange("locationalDetails", data)}
//               data={formData.locationalDetails}
//             />
//           )}

//           {tabs[currentIndex].id === "technical" && (
//             <TechDetails
//               onInputChange={(data) => handleInputChange("techDetails", data)}
//               data={formData.techDetails}
//             />
//           )}
//         </div>
//       </div>

//       {/* Buttons */}
//       <div className="flex justify-between items-center bg-white rounded-b-lg px-2 py-2 border-t">
//         <div>
//           {!isModify && (
//             <button
//               onClick={handleUpdateClick}
//               className="bg-[#7c0000] text-white text-sm px-4 py-2 rounded shadow hover:bg-[#a00000] focus:outline-none focus:ring-2 focus:ring-[#7c0000] focus:ring-opacity-50"
//             >
//               Edit
//             </button>
//           )}
//         </div>
//         <div className="flex space-x-3">
//           {currentIndex > 0 && (
//             <button
//               onClick={handlePrevious}
//               className="bg-[#7c0000] text-white text-sm px-4 py-2 rounded shadow hover:bg-[#a00000] focus:outline-none focus:ring-2 focus:ring-[#7c0000] focus:ring-opacity-50"
//             >
//               Previous
//             </button>
//           )}
//           {currentIndex < tabs.length - 1 ? (
//             <button
//               onClick={handleNext}
//               className="bg-[#7c0000] text-white text-sm px-4 py-2 rounded shadow hover:bg-[#a00000] focus:outline-none focus:ring-2 focus:ring-[#7c0000] focus:ring-opacity-50"
//             >
//               Next
//             </button>
//           ) : (
//             <button
//               onClick={handleSubmit}
//               className="bg-[#7c0000] text-white text-sm px-4 py-2 rounded shadow hover:bg-[#a00000] focus:outline-none focus:ring-2 focus:ring-[#7c0000] focus:ring-opacity-50"
//             >
//               {isModify ? "Update" : "Submit"}
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewApplication;



// import AppDetails from "components/Tabs/AppDetail";
// import LocationalDetails from "components/Tabs/LocationalDetail";
// import PersonalDetails from "components/Tabs/PersonalDetail";
// import TechDetails from "components/Tabs/TechDetails";
// import { useState } from "react";
// import React from "react";
// import { useHistory } from "react-router-dom";

// const tabs = [
//   { id: "application", label: "Application Details" },
//   { id: "personal", label: "Personal Details" },
//   { id: "locational", label: "Service Location Details" },
//   { id: "technical", label: "Technical Details" },
// ];

// const NewApplication = ({
//   onFormSubmit,
//   isModify,
//   formData,
//   setFormData,
//   handleSearch,
// }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [completedTabs, setCompletedTabs] = useState([false, false, false, false]);
//   const history = useHistory();

//   const handleNext = () => {
//     if (currentIndex < tabs.length - 1) {
//       setCompletedTabs((prev) => {
//         const newTabs = [...prev];
//         newTabs[currentIndex] = true;
//         return newTabs;
//       });
//       setCurrentIndex((prev) => prev + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentIndex > 0) {
//       setCompletedTabs((prev) => {
//         const newTabs = [...prev];
//         if (currentIndex - 1 >= 0) {
//           newTabs[currentIndex - 1] = false;
//         }
//         return newTabs;
//       });
//       setCurrentIndex((prev) => prev - 1);
//     }
//   };

//   const handleInputChange = (section, data) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [section]: { ...prevData[section], ...data },
//     }));
//   };

//   const handleSubmit = () => {
//     onFormSubmit(formData);
//   };

//   const handleUpdateClick = () => {
//     history.push("/application/modify");
//   };

//   return (
//     <div className="w-full bg-white rounded-lg shadow-lg p-6">
//       {/* Stepper */}
//       <div className="flex justify-between items-center mb-8 relative">
//         {tabs.map((tab, index) => (
//           <div key={tab.id} className="relative flex-1 flex flex-col items-center">
//             {index > 0 && (
//               <div
//                 className={`absolute top-5 left-0 transform -translate-y-1/2 h-0.5 w-full ${
//                   completedTabs[index - 1] ? "bg-gray" : "bg-gray-300"
//                 }`}
//                 style={{ left: "-50%", width: "100%", zIndex: 0 }}
//               ></div>
//             )}
//             <div
//               className="w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all z-10 bg-white cursor-pointer"
//               style={{
//                 borderColor: completedTabs[index] 
//                   ? "#10b981" 
//                   : (index === currentIndex ? "#dee110" : "#d1d5db"),
//                 backgroundColor: completedTabs[index] 
//                   ? "#10b981" 
//                   : (index === currentIndex ? "#dee110" : "white"),
//                 color: completedTabs[index] || index === currentIndex ? "white" : "#6b7280",
//               }}
//               onClick={() => {
//                 if (index <= currentIndex || completedTabs[index - 1] || index === 0) {
//                   setCurrentIndex(index);
//                 }
//               }}
//             >
//               {index + 1}
//             </div>
//             <span className={`text-sm mt-2 text-center font-medium ${
//               index === currentIndex ? "text-gray" : "text-gray-600"
//             }`}>
//               {tab.label}
//             </span>
//           </div>
//         ))}
//       </div>

//       {/* Section Title */}
//       <div className="text-center mb-4">
//         <h2 className="text-lg font-bold text-gray-800">{tabs[currentIndex].label}</h2>
//       </div>

//       {/* Content */}
//       <div className="bg-gray-50 rounded-lg border mb-4">
//         <div className="p-6">
//           {tabs[currentIndex].id === "application" && (
//             <AppDetails
//               onInputChange={(data) => handleInputChange("appDetails", data)}
//               isModify={isModify}
//               data={formData.appDetails}
//               handleSearch={handleSearch}
//             />
//           )}

//           {tabs[currentIndex].id === "personal" && (
//             <PersonalDetails
//               onInputChange={(data) => handleInputChange("personalDetails", data)}
//               data={formData.personalDetails}
//             />
//           )}

//           {tabs[currentIndex].id === "locational" && (
//             <LocationalDetails
//               onInputChange={(data) => handleInputChange("locationalDetails", data)}
//               data={formData.locationalDetails}
//             />
//           )}

//           {tabs[currentIndex].id === "technical" && (
//             <TechDetails
//               onInputChange={(data) => handleInputChange("techDetails", data)}
//               data={formData.techDetails}
//             />
//           )}
//         </div>
//       </div>

//       {/* Buttons */}
//       <div className="flex justify-between items-center bg-white rounded-b-lg px-2 py-2 border-t">
//         <div>
//           {!isModify && (
//             <button
//               onClick={handleUpdateClick}
//               className="bg-[#7c0000] text-white text-sm px-4 py-2 rounded shadow hover:bg-[#a00000] focus:outline-none focus:ring-2 focus:ring-[#7c0000] focus:ring-opacity-50"
//             >
//               Edit
//             </button>
//           )}
//         </div>
//         <div className="flex space-x-3">
//           {currentIndex > 0 && (
//             <button
//               onClick={handlePrevious}
//               className="bg-[#7c0000] text-white text-sm px-4 py-2 rounded shadow hover:bg-[#a00000] focus:outline-none focus:ring-2 focus:ring-[#7c0000] focus:ring-opacity-50"
//             >
//               Previous
//             </button>
//           )}
//           {currentIndex < tabs.length - 1 ? (
//             <button
//               onClick={handleNext}
//               className="bg-[#7c0000] text-white text-sm px-4 py-2 rounded shadow hover:bg-[#a00000] focus:outline-none focus:ring-2 focus:ring-[#7c0000] focus:ring-opacity-50"
//             >
//               Next
//             </button>
//           ) : (
//             <button
//               onClick={handleSubmit}
//               className="bg-[#7c0000] text-white text-sm px-4 py-2 rounded shadow hover:bg-[#a00000] focus:outline-none focus:ring-2 focus:ring-[#7c0000] focus:ring-opacity-50"
//             >
//               {isModify ? "Update" : "Submit"}
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewApplication;


// //previous grok code 
// import { useState } from "react";
// import AppDetails from "components/Tabs/AppDetail";
// import PersonalDetails from "components/Tabs/PersonalDetail";
// import LocationalDetails from "components/Tabs/LocationalDetail";
// import TechDetails from "components/Tabs/TechDetails";
// import { useHistory } from "react-router-dom";

// const nicRegex = /^(\d{9}[Vv]|\d{12})$/;
// const brnRegex = /^[A-Za-z0-9-]+$/;
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// const Application = ({ onFormSubmit, isModify }) => {
//   const history = useHistory();
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [searchLoading, setSearchLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     appDetails: {},
//     personalDetails: {},
//     locationalDetails: {},
//     techDetails: {},
//   });

//   const [errors, setErrors] = useState({
//     appDetails: {},
//     personalDetails: {},
//     locationalDetails: {},
//     techDetails: {},
//   });

//   const tabs = [
//     { id: "appDetails", label: "Application Details" },
//     { id: "personalDetails", label: "Personal Details" },
//     { id: "locationalDetails", label: "Service Location Details" },
//     { id: "techDetails", label: "Technical Details" },
//   ];

//   const validateAppDetails = (data) => {
//     const newErrors = {};
//     if (!data.applicationNo?.trim()) newErrors.applicationNo = "Application No is required";
//     if (!data.description?.trim()) newErrors.description = "Description is required";
//     // Add more validations as needed
//     return newErrors;
//   };

//   const validatePersonalDetails = (data) => {
//     const newErrors = {};
//     if (!data.firstName?.trim()) newErrors.firstName = "First name is required";
//     if (!data.lastName?.trim()) newErrors.lastName = "Last name is required";
//     if (!data.idNo?.trim()) newErrors.idNo = "ID number is required";
//     if (data.idNo?.trim()) {
//       const idType = data.idType || "NIC";
//       if (idType === "NIC" && !nicRegex.test(data.idNo)) {
//         newErrors.idNo = "Invalid NIC. Use 9 digits + V or 12 digits.";
//       } else if (idType === "BRN" && !brnRegex.test(data.idNo)) {
//         newErrors.idNo = "Invalid BRN format.";
//       }
//     }
//     if (data.email?.trim() && !emailRegex.test(data.email)) {
//       newErrors.email = "Please enter a valid email address";
//     }
//     // Add more
//     return newErrors;
//   };

//   const validateLocationalDetails = (data) => {
//     const newErrors = {};
//     if (!data.streetAddress?.trim()) newErrors.streetAddress = "Street Address is required";
//     // Add more
//     return newErrors;
//   };

//   const validateTechDetails = (data) => {
//     const newErrors = {};
//     // Add validations for tech fields
//     return newErrors;
//   };

//   const handleNext = () => {
//     const section = tabs[currentIndex].id;
//     const currentErrors = eval(`validate${section.charAt(0).toUpperCase() + section.slice(1)}`)(formData[section]);

//     if (Object.keys(currentErrors).length > 0) {
//       setErrors((prev) => ({ ...prev, [section]: currentErrors }));
//       alert("Please fix the errors before proceeding.");
//       return;
//     }

//     setErrors((prev) => ({ ...prev, [section]: {} }));
//     if (currentIndex < tabs.length - 1) setCurrentIndex(currentIndex + 1);
//   };

//   const handlePrevious = () => {
//     if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
//   };

//   const handleInputChange = (section, data) => {
//     setFormData((prev) => {
//       const updatedSection = { ...prev[section], ...data };
//       const validationFn = eval(`validate${section.charAt(0).toUpperCase() + section.slice(1)}`);
//       const newErrors = validationFn(updatedSection);

//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         [section]: newErrors,
//       }));

//       return { ...prev, [section]: updatedSection };
//     });
//   };

//   const handleSubmit = () => {
//     let allErrors = {};
//     tabs.forEach((tab) => {
//       const sectionErrors = eval(`validate${tab.id.charAt(0).toUpperCase() + tab.id.slice(1)}`)(formData[tab.id]);
//       if (Object.keys(sectionErrors).length > 0) {
//         allErrors[tab.id] = sectionErrors;
//       }
//     });

//     if (Object.keys(allErrors).length > 0) {
//       setErrors(allErrors);
//       alert("Please fix all errors before submitting.");
//       return;
//     }

//     onFormSubmit(formData);
//   };

//   const handleUpdateClick = () => {
//     history.push("/application/modify");
//   };

//   return (
//     <div className="w-full p-6 bg-white rounded-lg shadow-lg">
//       <div className="my-4 text-center">
//         <span className="text-lg font-bold text-gray-800">
//           {tabs[currentIndex].label}
//         </span>
//       </div>

//       <div className="mt-4">
//         <div className="relative flex flex-col w-full border rounded-lg bg-gray-50">
//           {currentIndex === 0 && (
//             <AppDetails
//               onInputChange={(data) => handleInputChange("appDetails", data)}
//               data={formData.appDetails}
//               errors={errors.appDetails}
//               isModify={isModify}
//             />
//           )}
//           {currentIndex === 1 && (
//             <PersonalDetails
//               onInputChange={(data) => handleInputChange("personalDetails", data)}
//               data={formData.personalDetails}
//               errors={errors.personalDetails}
//               searchLoading={searchLoading}
//               setSearchLoading={setSearchLoading}
//             />
//           )}
//           {currentIndex === 2 && (
//             <LocationalDetails
//               onInputChange={(data) => handleInputChange("locationalDetails", data)}
//               data={formData.locationalDetails}
//               errors={errors.locationalDetails}
//             />
//           )}
//           {currentIndex === 3 && (
//             <TechDetails
//               onInputChange={(data) => handleInputChange("techDetails", data)}
//               data={formData.techDetails}
//               errors={errors.techDetails}
//             />
//           )}

//           <div className="flex items-center justify-between px-6 py-4 bg-white border-t rounded-b-lg">
//             <div>
//               {!isModify && (
//                 <button
//                   onClick={handleUpdateClick}
//                   className="bg-[#7c0000] text-white text-sm px-6 py-2 rounded shadow"
//                 >
//                   Edit
//                 </button>
//               )}
//             </div>

//             <div className="flex space-x-3">
//               {currentIndex > 0 && (
//                 <button
//                   onClick={handlePrevious}
//                   className="bg-[#7c0000] text-white text-sm px-6 py-2 rounded shadow"
//                 >
//                   Previous
//                 </button>
//               )}

//               {currentIndex < tabs.length - 1 ? (
//                 <button
//                   onClick={handleNext}
//                   className="bg-[#7c0000] text-white text-sm px-6 py-2 rounded shadow"
//                 >
//                   Next
//                 </button>
//               ) : (
//                 <button
//                   onClick={handleSubmit}
//                   className="bg-[#7c0000] text-white text-sm px-6 py-2 rounded shadow"
//                 >
//                   {isModify ? "Update" : "Submit"}
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Application;


// //nre grok code

// import { useState } from "react";
// import AppDetails from "components/Tabs/AppDetail";
// import PersonalDetails from "components/Tabs/PersonalDetail";
// import LocationalDetails from "components/Tabs/LocationalDetail";
// import TechDetails from "components/Tabs/TechDetails";
// import { useHistory } from "react-router-dom";

// const nicRegex = /^(\d{9}[Vv]|\d{12})$/;
// const brnRegex = /^[A-Za-z0-9-]+$/;
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// const Application = ({ onFormSubmit, isModify }) => {
//   const history = useHistory();
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [searchLoading, setSearchLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     appDetails: {},
//     personalDetails: {},
//     locationalDetails: {},
//     techDetails: {},
//   });

//   const [errors, setErrors] = useState({
//     appDetails: {},
//     personalDetails: {},
//     locationalDetails: {},
//     techDetails: {},
//   });

//   const tabs = [
//     { id: "appDetails", label: "Application Details" },
//     { id: "personalDetails", label: "Personal Details" },
//     { id: "locationalDetails", label: "Service Location Details" },
//     { id: "techDetails", label: "Technical Details" },
//   ];

//   const validateAppDetails = (data) => {
//     const newErrors = {};
//     if (!data.applicationNo?.trim()) newErrors.applicationNo = "Application No is required";
//     if (!data.description?.trim()) newErrors.description = "Description is required";
//     // Add more if needed for other fields
//     return newErrors;
//   };

//   const validatePersonalDetails = (data) => {
//     const newErrors = {};
//     if (!data.firstName?.trim()) newErrors.firstName = "First name is required";
//     if (!data.lastName?.trim()) newErrors.lastName = "Last name is required";
//     if (!data.idNo?.trim()) newErrors.idNo = "ID number is required";
//     if (data.idNo?.trim()) {
//       const idType = data.idType || "NIC";
//       if (idType === "NIC" && !nicRegex.test(data.idNo)) {
//         newErrors.idNo = "Invalid NIC. Use 9 digits + V or 12 digits.";
//       } else if (idType === "BRN" && !brnRegex.test(data.idNo)) {
//         newErrors.idNo = "Invalid BRN format.";
//       }
//     }
//     if (data.email?.trim() && !emailRegex.test(data.email)) {
//       newErrors.email = "Please enter a valid email address";
//     }
//     // Add mobile validation if needed
//     return newErrors;
//   };

//   const validateLocationalDetails = (data) => {
//     const newErrors = {};
//     if (!data.streetAddress?.trim()) {
//       newErrors.streetAddress = "Street Address is required";
//     }
//     // Add more
//     return newErrors;
//   };

//   const validateTechDetails = (data) => {
//     const newErrors = {};
//     // Add if needed, e.g., if (!data.capacity?.trim()) newErrors.capacity = "Capacity is required";
//     return newErrors;
//   };

//   const handleSearch = async () => {
//     const idNo = formData.personalDetails.idNo;
//     if (!idNo) {
//       alert("Please enter an ID number before searching.");
//       return;
//     }

//     setSearchLoading(true);
//     try {
//       const response = await fetch(
//         `${process.env.REACT_APP_API_BASE_URL}/api/v1/search?nicno=${idNo}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: "Basic " + btoa("user:admin123"),
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!response.ok) throw new Error("ID not found");
//       const fetchedData = await response.json();

//       const updatedPersonal = { ...formData.personalDetails, ...fetchedData };
//       const personalErrors = validatePersonalDetails(updatedPersonal);

//       setFormData({ ...formData, personalDetails: updatedPersonal });
//       setErrors({ ...errors, personalDetails: personalErrors });
//       alert("Data loaded successfully!");
//     } catch (error) {
//       alert(error.message);
//     } finally {
//       setSearchLoading(false);
//     }
//   };

//   const handleNext = () => {
//     const section = tabs[currentIndex].id;
//     const currentErrors = eval(`validate${section.charAt(0).toUpperCase() + section.slice(1)}`)(formData[section]);

//     if (Object.keys(currentErrors).length > 0) {
//       setErrors((prev) => ({ ...prev, [section]: currentErrors }));
//       alert("Please fix the errors before proceeding.");
//       return;
//     }

//     setErrors((prev) => ({ ...prev, [section]: {} }));
//     if (currentIndex < tabs.length - 1) setCurrentIndex(currentIndex + 1);
//   };

//   const handlePrevious = () => {
//     if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
//   };

//   const handleInputChange = (section, data) => {
//     setFormData((prev) => {
//       const updatedSection = { ...prev[section], ...data };
//       const validationFn = eval(`validate${section.charAt(0).toUpperCase() + section.slice(1)}`);
//       const newErrors = validationFn(updatedSection);

//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         [section]: newErrors,
//       }));

//       return { ...prev, [section]: updatedSection };
//     });
//   };

//   const handleSubmit = () => {
//     let allErrors = {};
//     tabs.forEach((tab) => {
//       const sectionErrors = eval(`validate${tab.id.charAt(0).toUpperCase() + tab.id.slice(1)}`)(formData[tab.id]);
//       if (Object.keys(sectionErrors).length > 0) {
//         allErrors[tab.id] = sectionErrors;
//       }
//     });

//     if (Object.keys(allErrors).length > 0) {
//       setErrors(allErrors);
//       alert("Please fix all errors before submitting.");
//       return;
//     }

//     onFormSubmit(formData);
//   };

//   const handleUpdateClick = () => {
//     history.push("/application/modify");
//   };

//   return (
//     <div className="w-full p-6 bg-white rounded-lg shadow-lg">
//       <div className="my-4 text-center">
//         <span className="text-lg font-bold text-gray-800">
//           {tabs[currentIndex].label}
//         </span>
//       </div>

//       <div className="mt-4">
//         <div className="relative flex flex-col w-full border rounded-lg bg-gray-50">
//           {currentIndex === 0 ? (
//             <AppDetails
//               onInputChange={(data) => handleInputChange("appDetails", data)}
//               data={formData.appDetails}
//               errors={errors.appDetails}
//               isModify={isModify}
//             />
//           ) : currentIndex === 1 ? (
//             <PersonalDetails
//               onInputChange={(data) => handleInputChange("personalDetails", data)}
//               data={formData.personalDetails}
//               errors={errors.personalDetails}
//               handleSearch={handleSearch}
//               searchLoading={searchLoading}
//             />
//           ) : currentIndex === 2 ? (
//             <LocationalDetails
//               onInputChange={(data) => handleInputChange("locationalDetails", data)}
//               data={formData.locationalDetails}
//               errors={errors.locationalDetails}
//             />
//           ) : (
//             <TechDetails
//               onInputChange={(data) => handleInputChange("techDetails", data)}
//               data={formData.techDetails}
//               errors={errors.techDetails}
//             />
//           )}

//           <div className="flex items-center justify-between px-6 py-4 bg-white border-t rounded-b-lg">
//             <div>
//               {!isModify && (
//                 <button
//                   onClick={handleUpdateClick}
//                   className="bg-[#7c0000] text-white text-sm px-6 py-2 rounded shadow"
//                 >
//                   Edit
//                 </button>
//               )}
//             </div>

//             <div className="flex space-x-3">
//               {currentIndex > 0 && (
//                 <button
//                   onClick={handlePrevious}
//                   className="bg-[#7c0000] text-white text-sm px-6 py-2 rounded shadow"
//                 >
//                   Previous
//                 </button>
//               )}

//               {currentIndex < tabs.length - 1 ? (
//                 <button
//                   onClick={handleNext}
//                   className="bg-[#7c0000] text-white text-sm px-6 py-2 rounded shadow"
//                 >
//                   Next
//                 </button>
//               ) : (
//                 <button
//                   onClick={handleSubmit}
//                   className="bg-[#7c0000] text-white text-sm px-6 py-2 rounded shadow"
//                 >
//                   {isModify ? "Update" : "Submit"}
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Application;



// import { useState } from "react";
// import AppDetails from "components/Tabs/AppDetail";
// import PersonalDetails from "components/Tabs/PersonalDetail";
// import LocationalDetails from "components/Tabs/LocationalDetail";
// import TechDetails from "components/Tabs/TechDetails";
// import { useHistory } from "react-router-dom";

// const nicRegex = /^(\d{9}[Vv]|\d{12})$/;
// const brnRegex = /^[A-Za-z0-9-]+$/;
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// const tabs = [
//   { id: "application", label: "Application Details" },
//   { id: "personal", label: "Personal Details" },
//   { id: "locational", label: "Service Location Details" },
//   { id: "technical", label: "Technical Details" },
// ];

// const NewApplication = ({ onFormSubmit, isModify }) => {
//   const history = useHistory();
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [completedTabs, setCompletedTabs] = useState([false, false, false, false]);
//   const [formData, setFormData] = useState({
//     application: {},
//     personal: {},
//     locational: {},
//     technical: {},
//   });

//   const [errors, setErrors] = useState({
//     application: {},
//     personal: {},
//     locational: {},
//     technical: {},
//   });

//   const [searchLoading, setSearchLoading] = useState(false);

//   const validateApplication = (data) => {
//     const newErrors = {};
//     if (!data.applicationId?.trim()) newErrors.applicationId = "Temporary ID is required";
//     if (!data.description?.trim()) newErrors.description = "Description is required";
//     // Add more if needed
//     return newErrors;
//   };

//   const validatePersonal = (data) => {
//     const newErrors = {};
//     if (!data.idNo?.trim()) newErrors.idNo = "ID number is required";
//     if (data.idNo?.trim()) {
//       const idType = data.idType || "NIC";
//       if (idType === "NIC" && !nicRegex.test(data.idNo)) {
//         newErrors.idNo = "Invalid NIC format.";
//       } else if (idType === "BRN" && !brnRegex.test(data.idNo)) {
//         newErrors.idNo = "Invalid BRN format.";
//       }
//     }
//     if (!data.fname?.trim()) newErrors.fname = "First name is required";
//     if (!data.lname?.trim()) newErrors.lname = "Last name is required";
//     if (data.email?.trim() && !emailRegex.test(data.email)) {
//       newErrors.email = "Invalid email format.";
//     }
//     // Add more if needed
//     return newErrors;
//   };

//   const validateLocational = (data) => {
//     const newErrors = {};
//     if (!data.streetAddress?.trim()) newErrors.streetAddress = "Street address is required";
//     // Add more if needed
//     return newErrors;
//   };

//   const validateTechnical = (data) => {
//     const newErrors = {};
//     // Add more if needed
//     return newErrors;
//   };

//   const handleSearch = async () => {
//     const idNo = formData.personal.idNo;
//     if (!idNo) {
//       alert("Please enter an ID number before searching.");
//       return;
//     }

//     setSearchLoading(true);
//     try {
//       const response = await fetch(
//         // `${process.env.REACT_APP_API_BASE_URL}/api/v1/search?nicno=${idNo}`,
//         `${process.env.REACT_APP_API_BASE_URL}/api/applicants/search?idNo=${idNo}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: "Basic " + btoa("user:admin123"),
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!response.ok) throw new Error("ID not found");
//       const fetchedData = await response.json();

//       const updatedPersonal = { ...formData.personal, 
//         fname: fetchedData.fname || "",
//         lname: fetchedData.lname || "",
//         streetAddress: fetchedData.streetAddress || "",
//         suburb: fetchedData.suburb || "",
//         city: fetchedData.city || "",
//         postalCode: fetchedData.postalCode || "",
//         telephoneNo: fetchedData.telephoneNo || "",
//         mobileNo: fetchedData.mobileNo || "",
//         email: fetchedData.email || "",
//       };
//       const personalErrors = validatePersonal(updatedPersonal);

//       setFormData({ ...formData, personal: updatedPersonal });
//       setErrors({ ...errors, personal: personalErrors });
//       alert("Data loaded successfully!");
//     } catch (error) {
//       alert(error.message);
//     } finally {
//       setSearchLoading(false);
//     }
//   };

//   const handleNext = () => {
//     const tabId = tabs[currentIndex].id;
//     const currentErrors = eval(`validate${tabId.charAt(0).toUpperCase() + tabId.slice(1)}`)(formData[tabId]);

//     if (Object.keys(currentErrors).length > 0) {
//       setErrors((prev) => ({ ...prev, [tabId]: currentErrors }));
//       alert("Please fix the errors before proceeding.");
//       return;
//     }

//     setCompletedTabs((prev) => {
//       const newTabs = [...prev];
//       newTabs[currentIndex] = true;
//       return newTabs;
//     });

//     if (currentIndex < tabs.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentIndex > 0) {
//       setCompletedTabs((prev) => {
//         const newTabs = [...prev];
//         if (currentIndex - 1 >= 0) {
//           newTabs[currentIndex - 1] = false;
//         }
//         return newTabs;
//       });
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   const handleInputChange = (section, data) => {
//     setFormData((prevData) => {
//       const updatedData = { ...prevData[section], ...data };
//       const validationFn = eval(`validate${section.charAt(0).toUpperCase() + section.slice(1)}`);
//       const newErrors = validationFn(updatedData);

//       setErrors((prev) => ({ ...prev, [section]: newErrors }));
//       return { ...prevData, [section]: updatedData };
//     });
//   };

//   const handleSubmit = () => {
//     let allErrors = {};
//     tabs.forEach((tab) => {
//       const sectionErrors = eval(`validate${tab.id.charAt(0).toUpperCase() + tab.id.slice(1)}`)(formData[tab.id]);
//       if (Object.keys(sectionErrors).length > 0) {
//         allErrors[tab.id] = sectionErrors;
//       }
//     });

//     if (Object.keys(allErrors).length > 0) {
//       setErrors(allErrors);
//       alert("Please fix all errors before submitting.");
//       return;
//     }

//     onFormSubmit(formData);
//   };

//   const handleUpdateClick = () => {
//     history.push("/application/modify");
//   };

//   return (
//     <div className="w-full bg-white rounded-lg shadow-lg p-6">
//       {/* Stepper */}
//       <div className="flex justify-between items-center mb-8 relative">
//         {tabs.map((tab, index) => (
//           <div key={tab.id} className="relative flex-1 flex flex-col items-center">
//             {index > 0 && (
//               <div
//                 className={`absolute top-5 left-0 transform -translate-y-1/2 h-0.5 w-full ${
//                   completedTabs[index - 1] ? "bg-gray" : "bg-gray-300"
//                 }`}
//                 style={{ left: "-50%", width: "100%", zIndex: 0 }}
//               ></div>
//             )}
//             <div
//               className="w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all z-10 bg-white cursor-pointer"
//               style={{
//                 borderColor: completedTabs[index] 
//                   ? "#10b981" 
//                   : (index === currentIndex ? "#dee110" : "#d1d5db"),
//                 backgroundColor: completedTabs[index] 
//                   ? "#10b981" 
//                   : (index === currentIndex ? "#dee110" : "white"),
//                 color: completedTabs[index] || index === currentIndex ? "white" : "#6b7280",
//               }}
//               onClick={() => {
//                 if (index <= currentIndex || completedTabs[index - 1] || index === 0) {
//                   setCurrentIndex(index);
//                 }
//               }}
//             >
//               {index + 1}
//             </div>
//             <span className={`text-sm mt-2 text-center font-medium ${
//               index === currentIndex ? "text-gray" : "text-gray-600"
//             }`}>
//               {tab.label}
//             </span>
//           </div>
//         ))}
//       </div>

//       {/* Section Title */}
//       <div className="text-center mb-4">
//         <h2 className="text-lg font-bold text-gray-800">{tabs[currentIndex].label}</h2>
//       </div>

//       {/* Content */}
//       <div className="bg-gray-50 rounded-lg border mb-4">
//         <div className="p-6">
//           {currentIndex === 0 && (
//             <AppDetails
//               onInputChange={(data) => handleInputChange("application", data)}
//               isModify={isModify}
//               data={formData.application}
//               errors={errors.application}
//               handleSearch={handleSearch}
//             />
//           )}

//           {currentIndex === 1 && (
//             <PersonalDetails
//               onInputChange={(data) => handleInputChange("personal", data)}
//               data={formData.personal}
//               errors={errors.personal}
//               handleSearch={handleSearch}
//               searchLoading={searchLoading}
//             />
//           )}

//           {currentIndex === 2 && (
//             <LocationalDetails
//               onInputChange={(data) => handleInputChange("locational", data)}
//               data={formData.locational}
//               errors={errors.locational}
//             />
//           )}

//           {currentIndex === 3 && (
//             <TechDetails
//               onInputChange={(data) => handleInputChange("technical", data)}
//               data={formData.technical}
//               errors={errors.technical}
//             />
//           )}
//         </div>
//       </div>

//       {/* Buttons */}
//       <div className="flex justify-between items-center bg-white rounded-b-lg px-2 py-2 border-t">
//         <div>
//           {!isModify && (
//             <button
//               onClick={handleUpdateClick}
//               className="bg-[#7c0000] text-white text-sm px-4 py-2 rounded shadow hover:bg-[#a00000] focus:outline-none focus:ring-2 focus:ring-[#7c0000] focus:ring-opacity-50"
//             >
//               Edit
//             </button>
//           )}
//         </div>
//         <div className="flex space-x-3">
//           {currentIndex > 0 && (
//             <button
//               onClick={handlePrevious}
//               className="bg-[#7c0000] text-white text-sm px-4 py-2 rounded shadow hover:bg-[#a00000] focus:outline-none focus:ring-2 focus:ring-[#7c0000] focus:ring-opacity-50"
//             >
//               Previous
//             </button>
//           )}
//           {currentIndex < tabs.length - 1 ? (
//             <button
//               onClick={handleNext}
//               className="bg-[#7c0000] text-white text-sm px-4 py-2 rounded shadow hover:bg-[#a00000] focus:outline-none focus:ring-2 focus:ring-[#7c0000] focus:ring-opacity-50"
//             >
//               Next
//             </button>
//           ) : (
//             <button
//               onClick={handleSubmit}
//               className="bg-[#7c0000] text-white text-sm px-4 py-2 rounded shadow hover:bg-[#a00000] focus:outline-none focus:ring-2 focus:ring-[#7c0000] focus:ring-opacity-50"
//             >
//               {isModify ? "Update" : "Submit"}
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewApplication;


import { useState } from "react";
import AppDetails from "components/Tabs/AppDetail";
import PersonalDetails from "components/Tabs/PersonalDetail";
import LocationalDetails from "components/Tabs/LocationalDetail";
import TechDetails from "components/Tabs/TechDetails";
import { useHistory } from "react-router-dom";

const nicRegex = /^(\d{9}[Vv]|\d{12})$/;
const brnRegex = /^[A-Za-z0-9-]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const tabs = [
  { id: "application", label: "Application Details" },
  { id: "personal", label: "Personal Details" },
  { id: "locational", label: "Service Location Details" },
  { id: "technical", label: "Technical Details" },
];

const NewApplication = ({ onFormSubmit, isModify }) => {
  const history = useHistory();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedTabs, setCompletedTabs] = useState([false, false, false, false]);
  const [formData, setFormData] = useState({
    application: {},
    personal: {},
    locational: {},
    technical: {},
  });

  const [errors, setErrors] = useState({
    application: {},
    personal: {},
    locational: {},
    technical: {},
  });

  const [searchLoading, setSearchLoading] = useState(false);

  const validateApplication = (data) => {
    const newErrors = {};
    // Remove or comment out to allow Next without them
    if (!data.applicationId?.trim()) newErrors.applicationId = "Temporary ID is required";
    // if (!data.description?.trim()) newErrors.description = "Description is required";
    if (!data.applicationType?.trim()) newErrors.applicationType = "ApplicationType is required";
    return newErrors;
  };

  const validatePersonal = (data) => {
    const newErrors = {};
    // Remove or comment out to allow Next without them
    if (!data.idNo?.trim()) newErrors.idNo = "ID number is required";
    if (data.idNo?.trim()) {
      const idType = data.idType || "NIC";
      if (idType === "NIC" && !nicRegex.test(data.idNo)) {
        newErrors.idNo = "Invalid NIC format.";
      } else if (idType === "BRN" && !brnRegex.test(data.idNo)) {
        newErrors.idNo = "Invalid BRN format.";
      }
    }
    // if (!data.firstName?.trim()) newErrors.firstName = "First name is required";
    // if (!data.lastName?.trim()) newErrors.lastName = "Last name is required";
    // if (data.email?.trim() && !emailRegex.test(data.email)) {
    //   newErrors.email = "Invalid email format.";
    // }
    return newErrors;
  };

  const validateLocational = (data) => {
    const newErrors = {};
    // if (!data.streetAddress?.trim()) newErrors.streetAddress = "Street address is required";
    return newErrors;
  };

  const validateTechnical = (data) => {
    const newErrors = {};
    return newErrors;
  };

  const handleSearch = async () => {
    const idNo = formData.personal.idNo;
    if (!idNo) {
      alert("Please enter an ID number before searching.");
      return;
    }

    setSearchLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/applicants/search?idNo=${idNo}`,
        {
          method: "GET",
          headers: {
            Authorization: "Basic " + btoa("user:admin123"),
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("ID not found");
      const fetchedData = await response.json();

      const updatedPersonal = { ...formData.personal, ...fetchedData };
      const personalErrors = validatePersonal(updatedPersonal);

      setFormData({ ...formData, personal: updatedPersonal });
      setErrors({ ...errors, personal: personalErrors });
      alert("Data loaded successfully!");
    } catch (error) {
      alert(error.message);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleNext = () => {
    const tabId = tabs[currentIndex].id;
    const currentErrors = eval(`validate${tabId.charAt(0).toUpperCase() + tabId.slice(1)}`)(formData[tabId]);

    if (Object.keys(currentErrors).length > 0) {
      setErrors((prev) => ({ ...prev, [tabId]: currentErrors }));
      alert("Please fix the errors before proceeding.");
      return;
    }

    setCompletedTabs((prev) => {
      const newTabs = [...prev];
      newTabs[currentIndex] = true;
      return newTabs;
    });

    if (currentIndex < tabs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCompletedTabs((prev) => {
        const newTabs = [...prev];
        if (currentIndex - 1 >= 0) {
          newTabs[currentIndex - 1] = false;
        }
        return newTabs;
      });
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleInputChange = (section, data) => {
    setFormData((prevData) => {
      const updatedData = { ...prevData[section], ...data };
      const validationFn = eval(`validate${section.charAt(0).toUpperCase() + section.slice(1)}`);
      const newErrors = validationFn(updatedData);

      setErrors((prev) => ({ ...prev, [section]: newErrors }));
      return { ...prevData, [section]: updatedData };
    });
  };

  const handleSubmit = () => {
    let allErrors = {};
    tabs.forEach((tab) => {
      const sectionErrors = eval(`validate${tab.id.charAt(0).toUpperCase() + tab.id.slice(1)}`)(formData[tab.id]);
      if (Object.keys(sectionErrors).length > 0) {
        allErrors[tab.id] = sectionErrors;
      }
    });

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      alert("Please fix all errors before submitting.");
      return;
    }

    onFormSubmit(formData);
  };

  const handleUpdateClick = () => {
    history.push("/application/modify");
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-6">
      {/* Stepper */}
      <div className="flex justify-between items-center mb-8 relative">
        {tabs.map((tab, index) => (
          <div key={tab.id} className="relative flex-1 flex flex-col items-center">
            {index > 0 && (
              <div
                className={`absolute top-5 left-0 transform -translate-y-1/2 h-0.5 w-full ${
                  completedTabs[index - 1] ? "bg-gray" : "bg-gray-300"
                }`}
                style={{ left: "-50%", width: "100%", zIndex: 0 }}
              ></div>
            )}
            <div
              className="w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all z-10 bg-white cursor-pointer"
              style={{
                borderColor: completedTabs[index] 
                  ? "#10b981" 
                  : (index === currentIndex ? "#dee110" : "#d1d5db"),
                backgroundColor: completedTabs[index] 
                  ? "#10b981" 
                  : (index === currentIndex ? "#dee110" : "white"),
                color: completedTabs[index] || index === currentIndex ? "white" : "#6b7280",
              }}
              onClick={() => {
                if (index <= currentIndex || completedTabs[index - 1] || index === 0) {
                  setCurrentIndex(index);
                }
              }}
            >
              {index + 1}
            </div>
            <span className={`text-sm mt-2 text-center font-medium ${
              index === currentIndex ? "text-gray" : "text-gray-600"
            }`}>
              {tab.label}
            </span>
          </div>
        ))}
      </div>

      {/* Section Title */}
      <div className="text-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">{tabs[currentIndex].label}</h2>
      </div>

      {/* Content */}
      <div className="bg-gray-50 rounded-lg border mb-4">
        <div className="p-6">
          {currentIndex === 0 && (
            <AppDetails
              onInputChange={(data) => handleInputChange("application", data)}
              isModify={isModify}
              data={formData.application}
              errors={errors.application}
              handleSearch={handleSearch}
            />
          )}

          {currentIndex === 1 && (
            <PersonalDetails
              onInputChange={(data) => handleInputChange("personal", data)}
              data={formData.personal}
              errors={errors.personal}
              handleSearch={handleSearch}
              searchLoading={searchLoading}
            />
          )}

          {currentIndex === 2 && (
            <LocationalDetails
              onInputChange={(data) => handleInputChange("locational", data)}
              data={formData.locational}
              errors={errors.locational}
            />
          )}

          {currentIndex === 3 && (
            <TechDetails
              onInputChange={(data) => handleInputChange("technical", data)}
              data={formData.technical}
              errors={errors.technical}
            />
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center bg-white rounded-b-lg px-2 py-2 border-t">
        <div>
          {!isModify && (
            <button
              onClick={handleUpdateClick}
              className="bg-[#7c0000] text-white text-sm px-4 py-2 rounded shadow hover:bg-[#a00000] focus:outline-none focus:ring-2 focus:ring-[#7c0000] focus:ring-opacity-50"
            >
              Edit
            </button>
          )}
        </div>
        <div className="flex space-x-3">
          {currentIndex > 0 && (
            <button
              onClick={handlePrevious}
              className="bg-[#7c0000] text-white text-sm px-4 py-2 rounded shadow hover:bg-[#a00000] focus:outline-none focus:ring-2 focus:ring-[#7c0000] focus:ring-opacity-50"
            >
              Previous
            </button>
          )}
          {currentIndex < tabs.length - 1 ? (
            <button
              onClick={handleNext}
              className="bg-[#7c0000] text-white text-sm px-4 py-2 rounded shadow hover:bg-[#a00000] focus:outline-none focus:ring-2 focus:ring-[#7c0000] focus:ring-opacity-50"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-[#7c0000] text-white text-sm px-4 py-2 rounded shadow hover:bg-[#a00000] focus:outline-none focus:ring-2 focus:ring-[#7c0000] focus:ring-opacity-50"
            >
              {isModify ? "Update" : "Submit"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewApplication;