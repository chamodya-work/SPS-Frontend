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
import AppDetails from "components/Tabs/AppDetail";
import LocationalDetails from "components/Tabs/LocationalDetail";
import PersonalDetails from "components/Tabs/PersonalDetail";
import TechDetails from "components/Tabs/TechDetails";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import React from "react";
import { useHistory } from "react-router-dom";

const tabs = [
  { id: "application", label: "Application Details" },
  { id: "personal", label: "Personal Details" },
  { id: "locational", label: "Service Location Details" },
  { id: "technical", label: "Technical Details" },
];

const NewApplication = ({
  onFormSubmit,
  isModify,
  formData,
  setFormData,
  handleSearch,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const history = useHistory();

  const handleNext = () => {
    if (currentIndex < tabs.length - 1)
      setCurrentIndex((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentIndex > 0)
      setCurrentIndex((prev) => prev - 1);
  };

  const handleInputChange = (section, data) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: { ...prevData[section], ...data },
    }));
  };

  const handleSubmit = () => {
    onFormSubmit(formData);
  };

  const handleUpdateClick = () => {
    history.push("/application/modify");
  };

  return (
    <div className="w-full p-6 bg-white shadow-xl rounded-2xl md:p-10">

      {/* Stepper */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        {tabs.map((tab, index) => (
          <div key={tab.id} className="flex flex-col items-center flex-1 min-w-[80px]">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
              ${
                index < currentIndex
                  ? "bg-green-500 border-green-500 text-white"
                  : index === currentIndex
                  ? "bg-yellow-400 border-yellow-400 text-white"
                  : "border-gray-300 text-gray-400"
              }`}
            >
              {index < currentIndex ? (
                <CheckCircle size={18} />
              ) : (
                <span className="font-semibold">{index + 1}</span>
              )}
            </div>

            <span className="mt-2 text-xs text-center text-gray-600 md:text-sm">
              {tab.label}
            </span>
          </div>
        ))}
      </div>

      {/* Section Title */}
      <div className="mb-6 text-center">
        <h2 className="text-lg font-semibold text-red-800">
          {tabs[currentIndex].label}
        </h2>
      </div>

      {/* Content */}
      <div className="p-6 shadow-inner bg-gray-50 rounded-xl">
        {tabs[currentIndex].id === "application" && (
          <AppDetails
            onInputChange={(data) =>
              handleInputChange("appDetails", data)
            }
            isModify={isModify}
            data={formData.appDetails}
            handleSearch={handleSearch}
          />
        )}

        {tabs[currentIndex].id === "personal" && (
          <PersonalDetails
            onInputChange={(data) =>
              handleInputChange("personalDetails", data)
            }
            data={formData.personalDetails}
          />
        )}

        {tabs[currentIndex].id === "locational" && (
          <LocationalDetails
            onInputChange={(data) =>
              handleInputChange("locationalDetails", data)
            }
            data={formData.locationalDetails}
          />
        )}

        {tabs[currentIndex].id === "technical" && (
          <TechDetails
            onInputChange={(data) =>
              handleInputChange("techDetails", data)
            }
          />
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-col items-center justify-between gap-4 mt-8 md:flex-row">

        <div>
          {!isModify && (
            <button
              onClick={handleUpdateClick}
              className="px-6 py-2 text-sm font-medium text-white transition duration-200 bg-red-800 rounded-lg shadow hover:bg-red-900"
            >
              Edit
            </button>
          )}
        </div>

        <div className="flex gap-3">
          {currentIndex > 0 && (
            <button
              onClick={handlePrevious}
              className="px-6 py-2 text-sm font-medium text-white transition duration-200 bg-red-800 rounded-lg shadow hover:bg-red-900"
            >
              Previous
            </button>
          )}

          {currentIndex < tabs.length - 1 ? (
            <button
              onClick={handleNext}
              className="px-6 py-2 text-sm font-medium text-white transition duration-200 bg-red-800 rounded-lg shadow hover:bg-red-900"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 text-sm font-medium text-white transition duration-200 bg-red-800 rounded-lg shadow hover:bg-red-900"
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
