// //this is previous working code without validation
// import { useState } from "react";
// import ApplicantContact from "components/Tabs/ApplicantContact";
// import ApplicantInfo from "components/Tabs/ApplicantInfo";
// import { useHistory } from "react-router-dom";

// const Applicant = ({ onFormSubmit, isModify }) => {
//   const history = useHistory();
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const [formData, setFormData] = useState({
//     applicantInfo: {
//       idNo: "",
//       firstName: "",
//       lastName: "",
//       fullName: "",
//       personalCorporate: "",
//       cebEmployee: "",
//       preferredLanguage: "",
//       // idType: "NIC",
//       idType:""
//     },
//     applicantContact: {
//       mobileNo: "",
//       email: "",
//       telephoneNo: "",
//       streetAddress: "",
//       suburb: "",
//       city: "",
//       postalCode: "",
//     },
//   });

//   //  SEARCH FUNCTION MOVED HERE
//   const handleSearch = async () => {
//     const idNo = formData.applicantInfo.idNo;

//     if (!idNo) {
//       alert("Please enter a valid NIC number before searching.");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `${process.env.REACT_APP_API_BASE_URL}/api/applicants/search?idNo=${idNo}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: "Basic " + btoa("user:admin123"),
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("NIC not found");
//       }

//       const data = await response.json();

//       // ✅ UPDATE FORM DATA (THIS FIXES YOUR UI ISSUE)
//       setFormData((prev) => ({
//         ...prev,
//         applicantInfo: {
//           ...prev.applicantInfo,
//           ...data,
//         },
//         applicantContact: {
//           ...prev.applicantContact,
//           ...data,
//         },
//       }));

//       alert("Data loaded successfully!");
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   const handleNext = () => {
//     if (currentIndex < 1) setCurrentIndex(currentIndex + 1);
//   };

//   const handlePrevious = () => {
//     if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
//   };

//   const handleInputChange = (section, data) => {
//     setFormData((prev) => ({
//       ...prev,
//       [section]: { ...prev[section], ...data },
//     }));
//   };

//   const handleSubmit = () => {
//     onFormSubmit(formData);
//   };

//   const handleUpdateClick = () => {
//     history.push("/applicant/modifyapplicant");
//   };

//   return (
//     <div className="w-full p-6 bg-white rounded-lg shadow-lg">
//       <div className="my-4 text-center">
//         <span className="text-lg font-bold text-gray-800">
//           {currentIndex === 0
//             ? "Applicant Information"
//             : "Applicant Contact Details"}
//         </span>
//       </div>

//       <div className="mt-4">
//         <div className="relative flex flex-col w-full border rounded-lg bg-gray-50">
//           {currentIndex === 0 ? (
//             <ApplicantInfo
//               handleSearch={handleSearch}
//               onInputChange={(data) =>
//                 handleInputChange("applicantInfo", data)
//               }
//               data={formData.applicantInfo}
//               isModify={isModify}
//             />
//           ) : (
//             <ApplicantContact
//               onInputChange={(data) =>
//                 handleInputChange("applicantContact", data)
//               }
//               data={formData.applicantContact}
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

//               {currentIndex === 0 ? (
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

// export default Applicant;



// //new updated code with validation 
// import { useState } from "react";
// import ApplicantContact from "components/Tabs/ApplicantContact";
// import ApplicantInfo from "components/Tabs/ApplicantInfo";
// import { useHistory } from "react-router-dom";

// const Applicant = ({ onFormSubmit, isModify }) => {
//   const history = useHistory();
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [searchLoading, setSearchLoading] = useState(false);
//   const [isApplicantInfoValid, setIsApplicantInfoValid] = useState(true);

//   const [formData, setFormData] = useState({
//     applicantInfo: {
//       idNo: "",
//       firstName: "",
//       lastName: "",
//       fullName: "",
//       personalCorporate: "",
//       cebEmployee: "",
//       preferredLanguage: "",
//       idType: "NIC", // default to NIC
//     },
//     applicantContact: {
//       mobileNo: "",
//       email: "",
//       telephoneNo: "",
//       streetAddress: "",
//       suburb: "",
//       city: "",
//       postalCode: "",
//     },
//   });

//   const handleSearch = async () => {
//     const idNo = formData.applicantInfo.idNo;

//     if (!idNo) {
//       alert("Please enter an ID number before searching.");
//       return;
//     }

//     setSearchLoading(true);
//     try {
//       const response = await fetch(
//         `${process.env.REACT_APP_API_BASE_URL}/api/applicants/search?idNo=${idNo}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: "Basic " + btoa("user:admin123"),
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("ID not found");
//       }

//       const data = await response.json();

//       setFormData((prev) => ({
//         ...prev,
//         applicantInfo: {
//           ...prev.applicantInfo,
//           ...data,
//         },
//         applicantContact: {
//           ...prev.applicantContact,
//           ...data,
//         },
//       }));

//       alert("Data loaded successfully!");
//     } catch (error) {
//       alert(error.message);
//     } finally {
//       setSearchLoading(false);
//     }
//   };

//   const handleNext = () => {
//     if (currentIndex < 1) setCurrentIndex(currentIndex + 1);
//   };

//   const handlePrevious = () => {
//     if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
//   };

//   const handleInputChange = (section, data) => {
//     setFormData((prev) => ({
//       ...prev,
//       [section]: { ...prev[section], ...data },
//     }));
//   };

//   const handleSubmit = () => {
//     if (!isApplicantInfoValid) {
//       alert("Please fix errors in Applicant Information before submitting.");
//       return;
//     }
//     onFormSubmit(formData);
//   };

//   const handleUpdateClick = () => {
//     history.push("/applicant/modifyapplicant");
//   };

//   return (
//     <div className="w-full p-6 bg-white rounded-lg shadow-lg">
//       <div className="my-4 text-center">
//         <span className="text-lg font-bold text-gray-800">
//           {currentIndex === 0
//             ? "Applicant Information"
//             : "Applicant Contact Details"}
//         </span>
//       </div>

//       <div className="mt-4">
//         <div className="relative flex flex-col w-full border rounded-lg bg-gray-50">
//           {currentIndex === 0 ? (
//             <ApplicantInfo
//               handleSearch={handleSearch}
//               onInputChange={(data) =>
//                 handleInputChange("applicantInfo", data)
//               }
//               data={formData.applicantInfo}
//               isModify={isModify}
//               searchLoading={searchLoading}
//               onValidationChange={setIsApplicantInfoValid}
//             />
//           ) : (
//             <ApplicantContact
//               onInputChange={(data) =>
//                 handleInputChange("applicantContact", data)
//               }
//               data={formData.applicantContact}
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

//               {currentIndex === 0 ? (
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

// export default Applicant;


// //new updated code 2 with validation 
import { useState } from "react";
import ApplicantContact from "components/Tabs/ApplicantContact";
import ApplicantInfo from "components/Tabs/ApplicantInfo";
import { useHistory } from "react-router-dom";

const nicRegex = /^(\d{9}[Vv]|\d{12})$/;
const brnRegex = /^[A-Za-z0-9\-]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;




const Applicant = ({ onFormSubmit, isModify }) => {
  const history = useHistory();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchLoading, setSearchLoading] = useState(false);
  const [formData, setFormData] = useState({
    applicantInfo: {
      idNo: "",
      firstName: "",
      lastName: "",
      fullName: "",
      personalCorporate: "Per",
      cebEmployee: "y",
      preferredLanguage: "SN",
      idType: "NIC",
    },
    applicantContact: {
      mobileNo: "",
      email: "",
      telephoneNo: "",
      streetAddress: "",
      suburb: "",
      city: "",
      postalCode: "",
    },
  });

  // Validation state
  const [errors, setErrors] = useState({
    applicantInfo: {},
    applicantContact: {},
  });

  // Validation rules
  const validateApplicantInfo = (data) => {
    const newErrors = {};
    // Required fields
  if (!data.firstName?.trim()) newErrors.firstName = "First name is required";
  if (!data.lastName?.trim()) newErrors.lastName = "Last name is required";
  if (!data.idNo?.trim()) newErrors.idNo = "ID number is required";

  // ID format validation based on type
  if (data.idNo?.trim()) {
    const idType = data.idType || "NIC"; // default to NIC if not set
    if (idType === "NIC" && !nicRegex.test(data.idNo)) {
      newErrors.idNo = "Invalid NIC. Use 9 digits + V or 12 digits.";
    } else if (idType === "BRN" && !brnRegex.test(data.idNo)) {
      newErrors.idNo = "Invalid BRN format.";
    }
  }
  return newErrors;
  };

  const validateApplicantContact = (data) => {
    const newErrors = {};
    // // Add contact validation as needed
    // // Example: if (!data.email?.trim()) newErrors.email = "Email is required";
    // if (!data.streetAddress?.trim()) newErrors.streetAddress = "Street Address is required";
    // if (data.mobileNo?.trim().length!==10) newErrors.mobileNo = "mobile no length should be 10";

    // Street Address is required
  if (!data.streetAddress?.trim()) {
    newErrors.streetAddress = "Street Address is required";
  }
  
  // Mobile number validation - only if provided
  if (data.mobileNo?.trim()) {
    // Remove any non-digit characters for accurate length check
    const digitsOnly = data.mobileNo.replace(/\D/g, '');
    if (digitsOnly.length !== 10) {
      newErrors.mobileNo = "Mobile number must be exactly 10 digits";
    }
    // Optional: Also check if it starts with 07 for Sri Lankan numbers
    else if (!digitsOnly.startsWith('07')) {
      newErrors.mobileNo = "Mobile number must start with 07";
    }
  }
  
  // Email validation - only if you want email to be optional too
  if (data.email?.trim() && !emailRegex.test(data.email)) {
    newErrors.email = "Please enter a valid email address";
  }
  
    return newErrors;
  };

  const handleSearch = async () => {
    const idNo = formData.applicantInfo.idNo;
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
      const data = await response.json();

      setFormData((prev) => ({
        ...prev,
        applicantInfo: { ...prev.applicantInfo, ...data },
        applicantContact: { ...prev.applicantContact, ...data },
      }));

      alert("Data loaded successfully!");
    } catch (error) {
      alert(error.message);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleNext = () => {
    // Validate current section before moving to next
    const currentErrors =
      currentIndex === 0
        ? validateApplicantInfo(formData.applicantInfo)
        : validateApplicantContact(formData.applicantContact);

    if (Object.keys(currentErrors).length > 0) {
      setErrors((prev) => ({
        ...prev,
        [currentIndex === 0 ? "applicantInfo" : "applicantContact"]: currentErrors,
      }));
      alert("Please fix the errors before proceeding.");
      return;
    }

    // Clear errors for this section and move next
    setErrors((prev) => ({
      ...prev,
      [currentIndex === 0 ? "applicantInfo" : "applicantContact"]: {},
    }));
    if (currentIndex < 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleInputChange = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));

    // Validate the updated section
    const validationFn =
      section === "applicantInfo" ? validateApplicantInfo : validateApplicantContact;
    const newErrors = validationFn({ ...formData[section], ...data });

    setErrors((prev) => ({
      ...prev,
      [section]: newErrors,
    }));
  };

  const handleSubmit = () => {
    // Validate all sections
    const infoErrors = validateApplicantInfo(formData.applicantInfo);
    const contactErrors = validateApplicantContact(formData.applicantContact);

    if (Object.keys(infoErrors).length > 0 || Object.keys(contactErrors).length > 0) {
      setErrors({
        applicantInfo: infoErrors,
        applicantContact: contactErrors,
      });
      alert("Please fix all errors before submitting.");
      return;
    }

    onFormSubmit(formData);
  };

  const handleUpdateClick = () => {
    history.push("/applicant/modifyapplicant");
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
      <div className="my-4 text-center">
        <span className="text-lg font-bold text-gray-800">
          {currentIndex === 0
            ? "Applicant Information"
            : "Applicant Contact Details"}
        </span>
      </div>

      <div className="mt-4">
        <div className="relative flex flex-col w-full border rounded-lg bg-gray-50">
          {currentIndex === 0 ? (
            <ApplicantInfo
              handleSearch={handleSearch}
              onInputChange={(data) => handleInputChange("applicantInfo", data)}
              data={formData.applicantInfo}
              isModify={isModify}
              searchLoading={searchLoading}
              errors={errors.applicantInfo} // Pass errors down
            />
          ) : (
            <ApplicantContact
              onInputChange={(data) => handleInputChange("applicantContact", data)}
              data={formData.applicantContact}
              errors={errors.applicantContact} // Pass errors down
            />
          )}

          <div className="flex items-center justify-between px-6 py-4 bg-white border-t rounded-b-lg">
            <div>
              {/* {!isModify && (
                <button
                  onClick={handleUpdateClick}
                  className="bg-[#7c0000] text-white text-sm px-6 py-2 rounded shadow"
                >
                  Edit
                </button>
              )} */}
            </div>

            <div className="flex space-x-3">
              {currentIndex > 0 && (
                <button
                  onClick={handlePrevious}
                  className="bg-[#7c0000] text-white text-sm px-6 py-2 rounded shadow"
                >
                  Previous
                </button>
              )}

              {currentIndex === 0 ? (
                <button
                  onClick={handleNext}
                  className="bg-[#7c0000] text-white text-sm px-6 py-2 rounded shadow"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="bg-[#7c0000] text-white text-sm px-6 py-2 rounded shadow"
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