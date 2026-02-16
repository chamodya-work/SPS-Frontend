// import { useState } from "react";

// import ApplicantContact from "components/Tabs/ApplicantContact";
// import ApplicantInfo from "components/Tabs/ApplicantInfo";

// const Applicant = () => {
//   const [step, setStep] = useState(1);

//   const nextStep = () => setStep(2);
//   const prevStep = () => setStep(1);
//   const handleSubmit = () => {
//     alert("Form submitted successfully!"); // Replace this with actual form submission logic
//   };

//   return (
//     <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
//       {/* Top Bar */}
//       <div className="rounded-t bg-white mb-0 px-6 py-6">
//         <div className="text-center flex justify-between">
//           {/* Dynamic Title */}
//           <h6 className="text-blueGray-700 text-xl font-bold">
//             {step === 1 ? "Applicant Information" : "Applicant Contact Details"}
//           </h6>

//           {/* Navigation Buttons */}
//           <div>
//             {step > 1 && (
//               <button
//                 onClick={prevStep}
//                 className="bg-lightBlue-500 text-white px-4 py-2 rounded "
//               >
//                 Previous
//               </button>
//             )}
//             {step < 2 ? (
//               <button
//                 onClick={nextStep}
//                 className="bg-lightBlue-500 text-white px-4 py-2 rounded "
//               >
//                 Next
//               </button>
//             ) : (
//               <button
//                 onClick={handleSubmit}
//                 className="bg-lightBlue-500 text-white px-4 py-2 rounded ml-2"
//               >
//                 Submit
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className="p-6">
//         {step === 1 ? (
//           <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-blueGray-100 border-0">
//             <ApplicantInfo />
//           </div>
//         ) : (
//           <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-blueGray-100 border-0">
//             <ApplicantContact />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Applicant;

import { useState } from "react";
import ApplicantContact from "components/Tabs/ApplicantContact";
import ApplicantInfo from "components/Tabs/ApplicantInfo";
import { useHistory } from "react-router-dom";

const Applicant = ({
  onFormSubmit,
  handleSearch,
  isModify,
  appData,
  setAppData,
}) => {
  const history = useHistory();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({
    applicantInfo: {},
    applicantContact: {},
  });

  const tabs = [
    {
      id: "info",
      component: (
        <ApplicantInfo
          onInputChange={(data) => handleInputChange("applicantInfo", data)}
          isModify={isModify}
          data={formData.applicantInfo}
          handleSearch={handleSearch}
          appData={appData}
          setAppData={setAppData}
        />
      ),
    },
    {
      id: "contact",
      component: (
        <ApplicantContact
          onInputChange={(data) => handleInputChange("applicantContact", data)}
          data={formData.applicantContact}
        />
      ),
    },
  ];

  const handleNext = () => {
    if (currentIndex < tabs.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleInputChange = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  };

  const handleSubmit = () => {
    onFormSubmit(formData);
  };

  const handleUpdateClick = () => {
    history.push("/applicant/modifyapplicant");
  };

  // Helper to determine step circle styles
  const stepCircleClass = (index) => {
    if (index < currentIndex) return "bg- border-green-400 text-white";
    if (index === currentIndex)
      return "bg-yellow-500 border-yellow-400 text-white";
    return "bg-transparent border-gray-300 text-gray-700";
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-6">
      {/* Stepper */}
      <div className="flex justify-center items-center mt-4">
        {tabs.map((tab, index) => (
          <div key={tab.id} className="flex flex-col items-center px-4 sm:px-8">
            <span
              className={`flex items-center justify-center w-10 h-10 text-lg font-medium rounded-full border-2 mb-2 ${stepCircleClass(
                index
              )}`}
            >
              {index + 1}
            </span>
            <span className="text-xs sm:text-sm text-gray-700 text-center">
              {index === 0 ? "Applicant Information" : "Contact Details"}
            </span>
          </div>
        ))}
      </div>

      {/* Current step title */}
      <div className="text-center my-4">
        <span className="text-lg font-bold text-gray-800">
          {currentIndex === 0 ? "Applicant Information" : "Applicant Contact Details"}
        </span>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        <div className="relative flex flex-col w-full bg-gray-50 rounded-lg border">
          {currentIndex === 0 ? (
            <ApplicantInfo
              handleSearch={handleSearch}
              onInputChange={(data) => handleInputChange("applicantInfo", data)}
              applicant={appData || { idNo: "" }}
              appData={appData}
              isModify={isModify}
              setAppData={setAppData}
            />
          ) : (
            <ApplicantContact
              onInputChange={(data) => handleInputChange("applicantContact", data)}
            />
          )}

          {/* Bottom bar with buttons */}
          <div className="flex justify-between items-center bg-white rounded-b-lg px-6 py-4 border-t">
            <div>
              {!isModify && (
                <button
                  onClick={handleUpdateClick}
                  className="bg-[#7c0000] text-white text-sm px-6 py-2 rounded shadow hover:bg-[#a00000] focus:outline-none focus:ring-2 focus:ring-[#7c0000] focus:ring-opacity-50 transition-all duration-150"
                >
                  Edit
                </button>
              )}
            </div>
            <div className="flex space-x-3">
              {currentIndex > 0 && (
                <button
                  onClick={handlePrevious}
                  className="bg-[#7c0000] text-white text-sm px-6 py-2 rounded shadow hover:bg-[#a00000] focus:outline-none focus:ring-2 focus:ring-[#7c0000] focus:ring-opacity-50 transition-all duration-150"
                >
                  Previous
                </button>
              )}
              {currentIndex < tabs.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="bg-[#7c0000] text-white text-sm px-6 py-2 rounded shadow hover:bg-[#a00000] focus:outline-none focus:ring-2 focus:ring-[#7c0000] focus:ring-opacity-50 transition-all duration-150"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="bg-[#7c0000] text-white text-sm px-6 py-2 rounded shadow hover:bg-[#a00000] focus:outline-none focus:ring-2 focus:ring-[#7c0000] focus:ring-opacity-50 transition-all duration-150"
                >
                  {isModify ? "Update" : "Submit"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applicant;