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
import { data } from "autoprefixer";
import { useHistory } from "react-router-dom";
import badgeColors from "@material-tailwind/react/theme/components/badge/badgeColors";
// For named export
//import { ApplicantInfo } from "components/Tabs/ApplicantInfo";

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
      // label: "Applicant Information",
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
      // label: "Applicant Contact Details",
      component: (
        <ApplicantContact
          onInputChange={(data) => handleInputChange("applicantContact", data)}
          data={formData.applicantContact}
        />
      ),
    },
  ];

  const handleNext = () => {
    if (currentIndex < tabs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleInputChange = (section, data) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: { ...prevData[section], ...data },
    }));
  };

  const handleSubmit = () => {
    console.log(formData);
    onFormSubmit(formData);
  };

  const handleUpdateClick = () => {
    history.push("/applicant/modifyapplicant"); // Navigate to /application/modify
  };

  return (
    <div className="w-full max-w-2xl bg-white  rounded-lg p-6">
      {/* Stepper */}
      <div className="flex justify-center items-center mt-4">
        {tabs.map((tab, index) => (
          <div key={tab.id} className="flex flex-col justify-between  items-center px-12">
            {/* Step Number */}
            <div>
            <span
              className={"flex flex-col items-center justify-center w-10 h-10 text-lg font-medium rounded-full border-2 mb-2"}
              style={{
                  backgroundColor:
                    index < currentIndex
                      ? "#34d399"
                      : index === currentIndex
                      ? "#ffd800"
                      : "transparent",
                  borderColor:
                    index < currentIndex
                      ? "#34d399"
                      : index === currentIndex
                      ? "#ffd800"
                      : "#d1d5db",
                  color:
                    index < currentIndex || index === currentIndex
                      ? "white"
                      : "black",
                }}
            >
              {index + 1}
            </span>
            </div>
            {/* Step Labels */}
            <div>
            {index === 0 && (
              <span className="text-sm text-gray-700 ml-2 ">
                Applicant Information
              </span>
            )}
            {index === 1 && (
              <span className="text-sm text-gray-700 ml-2">
                Applicant Contact Details
              </span>
            )}
            </div>

            {/* Dashed Connecting Line */}
            {/* {index < tabs.length - 1 && (
              <div className="w-16 border-t-2 border-lightBlue-500 border-dashed mx-4"></div>
            )} */}
          </div>
        ))}
      </div>

      {/* <div className="flex justify-between px-12 ml-2">
          <h3 className="block text-blueGray-600 text-m font-bold mb-3 "> */}
      {/* {currentIndex === 0 ? "Applicant Information" : "Applicant Contact Details"} */}
      {/* </h3> */}
      {/* {!isModify && (
          <button
          // /applicant/modifyapplicant
          onClick={handleUpdateClick}
            className="bg-emerald-400 mb-2 text-white active:bg-emerald-600 font-bold text-sm px-6 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-2 ease-linear transition-all duration-150 mt-2"
            style={{
              backgroundColor: "#7c0000",
            }}
          >
            Edit
          </button>
          )} */}
      {/* </div> */}

      <div className="text-center flex justify-center mb-2 mt-2">
        {currentIndex === 0 && (
          <span className="text-sm text-gray-700 ml-2 font-bold">
            Applicant Information
          </span>
        )}
        {currentIndex === 1 && (
          <span className="text-sm text-gray-700 ml-2 font-bold">
            Applicant Contact Details
          </span>
        )}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-b-lg bg-blueGray-100 border-0">
          {/* now edited */}

          {/* now edited end */}
          {tabs[currentIndex].id === "info" && (
            <ApplicantInfo
              handleSearch={handleSearch}
              onInputChange={(data) => handleInputChange("applicantInfo", data)}
              applicant={appData || { idNo: "" }}
              appData={appData}
              isModify={isModify}
              setAppData={setAppData}
            />
          )}
          {tabs[currentIndex].id === "contact" && (
            <ApplicantContact
              onInputChange={(data) =>
                handleInputChange("applicantContact", data)
              }
            />
          )}

          {/* Navigation Buttons and bottom white bar */}
          <div className="flex justify-between rounded-t bg-white mb-0 px-12">
            <div className="ml-2">
              {!isModify && (
                <button
                  // /applicant/modifyapplicant
                  onClick={handleUpdateClick}
                  className="bg-emerald-400 mb-2 text-white active:bg-emerald-600 text-sm px-6 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-2 ease-linear transition-all duration-150 mt-2"
                  style={{
                    backgroundColor: "#7c0000",
                  }}
                >
                  Edit
                </button>
              )}
            </div>
            <div className="flex justify-end items-center mr-4 ml-2 mb-2">
              {/* Left-aligned "Previous" button */}
              {currentIndex > 0 ? (
                <button
                  onClick={handlePrevious}
                  className="bg-lightBlue-500 mr-2 mt-2 text-white text-sm px-6 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                  style={{
                    backgroundColor: "#7c0000",
                  }}
                >
                  Previous
                </button>
              ) : (
                <div></div> // Empty div to maintain spacing when Previous button is hidden
              )}

              {/* Right-aligned "Next" or "Submit" button */}
              {currentIndex < tabs.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="bg-emerald-400 mb-2 ml-2 mt-2 text-white active:bg-emerald-600 text-sm px-6 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 mt-2"
                  style={{
                    backgroundColor: "#7c0000",
                  }}
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="bg-emerald-400 bg-green text-white text-sm mt-2 px-6 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                  // style={{
                  //   backgroundColor: "#620000",
                  // }}
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
