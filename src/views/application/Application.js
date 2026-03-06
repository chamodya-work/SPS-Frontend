// import NewApplication from "components/Applicationss/NewApplication";
// import { useState, useEffect } from "react";
// import {toast} from "react-toastify";

// const NewApp = () => {
//   const [isModify, setisModify] = useState(false);

//   const [formData, setFormData] = useState({
//     appDetails: {},
//     personalDetails: {},
//     locationalDetails: {},
//     techDetails: {},
//   });

//   const baseUrl = process.env.REACT_APP_API_BASE_URL;

//   const handleFormSubmit = async (data) => {
//     const hardcodedData = {
//       applicationType: "gy",
//       submitDate: "2021-09-01",
//       status: "bn",
//     };

//     // Merge hardcoded data with form data
//     const mergedData = {
//       ...data,
//       idNo: data.personalDetails?.idNo || "",
//       applicationId: data.appDetails?.applicationId || "",
//       description: data.appDetails?.description || "",
//       ...hardcodedData,
//     };

//     setFormData(mergedData);
//     console.log(mergedData);
//     // Send the data to the backend via REST API
//     try {
//       const response = await fetch(
//         `${baseUrl}/api/application/save`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Basic " + btoa("user:admin123"),
//           },
//           credentials: "include",
//           body: JSON.stringify(mergedData),
//         }
//       );

//       if (response.ok) {
//         toast.success("Form submitted successfully!");
//       } else {
//         toast.error("Form submission failed!");
//         console.log("Form submission failed", response);
//       }
//     } catch (error) {
//       toast.error("An error occurred!");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="container mx-auto rounded-lg">
//       <div className="flex justify-center px-4 mx-48 mt-5 mb-5 rounded-lg md:px-10 lg:px-20">
//         <NewApplication onFormSubmit={handleFormSubmit} isModify={isModify} formData={formData} setFormData={setFormData}/>
//       </div>
//     </div>
//   );
// };

// export default NewApp;
// Updated: sanjula
// import NewApplication from "components/Applicationss/NewApplication";
// import { useState } from "react";
// import { toast } from "react-toastify";

// const NewApp = () => {
//   const [isModify] = useState(false);
//   const [formData, setFormData] = useState({
//     appDetails: {},
//     personalDetails: {},
//     locationalDetails: {},
//     techDetails: {},
//   });

//   const baseUrl = process.env.REACT_APP_API_BASE_URL;

//   const handleFormSubmit = async (data) => {
//     const hardcodedData = {
//       applicationType: "gy",
//       submitDate: "2021-09-01",
//       status: "bn",
//     };

//     const mergedData = {
//       ...data,
//       idNo: data.personalDetails?.idNo || "",
//       applicationId: data.appDetails?.applicationId || "",
//       description: data.appDetails?.description || "",
//       ...hardcodedData,
//     };

//     setFormData(mergedData);

//     try {
//       const response = await fetch(`${baseUrl}/api/application/save`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Basic " + btoa("user:admin123"),
//         },
//         credentials: "include",
//         body: JSON.stringify(mergedData),
//       });

//       if (response.ok) {
//         toast.success("Form submitted successfully!");
//       } else {
//         toast.error("Form submission failed!");
//       }
//     } catch (error) {
//       toast.error("An error occurred!");
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <div className="flex justify-center">
//         <NewApplication
//           onFormSubmit={handleFormSubmit}
//           isModify={isModify}
//           formData={formData}
//           setFormData={setFormData}
//         />
//       </div>
//     </div>
//   );
// };

// export default NewApp;

// import NewApplication from "components/Applicationss/NewApplication";
// import { useState } from "react";
// import { toast } from "react-toastify";

// const NewApp = () => {
//   const [isModify] = useState(false);
//   const [formData, setFormData] = useState({
//     appDetails: {},
//     personalDetails: {},
//     locationalDetails: {},
//     techDetails: {},
//   });

//   const baseUrl = process.env.REACT_APP_API_BASE_URL;

//   const handleFormSubmit = async (data) => {
//     const hardcodedData = {
//       applicationType: "gy",
//       submitDate: "2021-09-01",
//       status: "bn",
//     };

//     const mergedData = {
//       ...data,
//       idNo: data.personalDetails?.idNo || "",
//       applicationId: data.appDetails?.applicationId || "",
//       description: data.appDetails?.description || "",
//       ...hardcodedData,
//     };

//     setFormData(mergedData);

//     try {
//       const response = await fetch(`${baseUrl}/api/application/save`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Basic " + btoa("user:admin123"),
//         },
//         credentials: "include",
//         body: JSON.stringify(mergedData),
//       });

//       if (response.ok) {
//         toast.success("Form submitted successfully!");
//       } else {
//         toast.error("Form submission failed!");
//       }
//     } catch (error) {
//       toast.error("An error occurred!");
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <div className="flex justify-center">
        // <NewApplication
//           onFormSubmit={handleFormSubmit}
//           isModify={isModify}
//           formData={formData}
//           setFormData={setFormData}
//         />
//       </div>
//     </div>
//   );
// };

// export default NewApp;


//grok previous code

// import Application from "components/Applicationss/NewApplication";
// import React, { useState } from "react";
// import { toast } from "react-toastify";

// const NewApplicationPage = () => {
//   const [isModify] = useState(false);
//   const baseUrl = process.env.REACT_APP_API_BASE_URL;

//   const handleFormSubmit = async (data) => {
//     // First, check if applicant exists, if not, save applicant
//     const applicantData = {
//       idNo: data.personalDetails?.idNo || "",
//       idType: data.personalDetails?.idType || "NIC",
//       firstName: data.personalDetails?.firstName || "",
//       lastName: data.personalDetails?.lastName || "",
//       fullName: `${data.personalDetails?.firstName || ""} ${data.personalDetails?.lastName || ""}`.trim(),
//       streetAddress: data.personalDetails?.streetAddress || "",
//       suburb: data.personalDetails?.suburb || "",
//       city: data.personalDetails?.city || "",
//       postalCode: data.personalDetails?.postalCode || "",
//       email: data.personalDetails?.email || "",
//       telephoneNo: data.personalDetails?.telephoneNo || "",
//       mobileNo: data.personalDetails?.mobileNo || "",
//       preferredLanguage: data.personalDetails?.preferredLanguage || "SN",
//       cebEmployee: data.personalDetails?.cebEmployee || "n",
//       personalCorporate: "Per",
//       addDate: new Date().toISOString().split('T')[0],
//     };

//     console.log("this is  applicant data idno : ",applicantData.idNo);

//     try {

//       // Check if applicant exists
//       const applicantCheck = await fetch(`${baseUrl}/api/applicants/search?idNo=${applicantData.idNo}`, {
//         method: "GET",
//         headers: {
//           Authorization: "Basic " + btoa("user:admin123"),
//           "Content-Type": "application/json",
//         },
//       });

//       console.log("applicant check response: ", applicantCheck.ok);

//       if (!applicantCheck.ok) {
//         // Save new applicant
//         await fetch(`${baseUrl}/api/applicants/save`, {
//           method: "POST",
//           headers: {
//             Authorization: "Basic " + btoa("user:admin123"),
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(applicantData),
//         });
//       }
//     } catch (error) {
//       console.error("Error handling applicant:", error);
//       toast.error("Error saving applicant!");
//       return;
//     }

//     // Now save application
//     const currentDate = new Date().toISOString().split('T')[0];

//     const applicationData = {
//       applicationNo: data.appDetails?.applicationNo || "",
//       description: data.appDetails?.description || "",
//       applicationType: data.appDetails?.applicationType || "",
//       submitDate: currentDate,
//       idNo: data.personalDetails?.idNo || "",
//       isLoanApp: data.appDetails?.isLoanApp || "No",
//       status: "bn",
//       // Map more fields as needed
//       fromDate: data.appDetails?.fromDate, // If added in form
//       toDate: data.appDetails?.toDate,
//       // etc.
//     };

//     console.log("this is application submit data :",applicantData)

//     try {
//       const response = await fetch(`${baseUrl}/api/application/save`, {
//         method: "POST",
//         headers: {
//           Authorization: "Basic " + btoa("user:admin123"),
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(applicationData),
//       });

//       if (response.ok) {
//         toast.success("Form submitted successfully!");
//       } else {
//         toast.error("Form submission failed!");
//       }
//     } catch (error) {
//       toast.error("An error occurred!");
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <div className="flex justify-center">
//         <Application
//           onFormSubmit={handleFormSubmit}
//           isModify={isModify}
//         />
//       </div>
//     </div>
//   );
// };

// export default NewApplicationPage;



//new grok code 

// import Application from "components/Applicationss/NewApplication";
// import React, { useState } from "react";
// import { toast } from "react-toastify";

// const NewApplicationPage = () => {
//   const [isModify] = useState(false);
//   const baseUrl = process.env.REACT_APP_API_BASE_URL;

//   const handleFormSubmit = async (data) => {
//     // First, check if applicant exists, if not, save applicant
//     const applicantData = {
//       idNo: data.personalDetails?.idNo || "",
//       idType: data.personalDetails?.idType || "NIC",
//       firstName: data.personalDetails?.firstName || "",
//       lastName: data.personalDetails?.lastName || "",
//       fullName: `${data.personalDetails?.firstName || ""} ${data.personalDetails?.lastName || ""}`.trim(),
//       streetAddress: data.personalDetails?.streetAddress || "",
//       suburb: data.personalDetails?.suburb || "",
//       city: data.personalDetails?.city || "",
//       postalCode: data.personalDetails?.postalCode || "",
//       email: data.personalDetails?.email || "",
//       telephoneNo: data.personalDetails?.telephoneNo || "",
//       mobileNo: data.personalDetails?.mobileNo || "",
//       preferredLanguage: data.personalDetails?.preferredLanguage || "SN",
//       cebEmployee: data.personalDetails?.cebEmployee || "n",
//       personalCorporate: "Per",
//       addDate: new Date().toISOString().split('T')[0],
//     };

//     try {
//       // Check if applicant exists
//       const applicantCheck = await fetch(`${baseUrl}/api/applicants/search?idNo=${applicantData.idNo}`, {
//         method: "GET",
//         headers: {
//           Authorization: "Basic " + btoa("user:admin123"),
//           "Content-Type": "application/json",
//         },
//       });

//       if (!applicantCheck.ok) {
//         // Save new applicant
//         await fetch(`${baseUrl}/api/applicants/save`, {
//           method: "POST",
//           headers: {
//             Authorization: "Basic " + btoa("user:admin123"),
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(applicantData),
//         });
//       }
//     } catch (error) {
//       console.error("Error handling applicant:", error);
//       toast.error("Error saving applicant!");
//       return;
//     }

//     // Now save application
//     const currentDate = new Date().toISOString().split('T')[0];

//     const applicationData = {
//       applicationNo: data.appDetails?.applicationNo || "",
//       description: data.appDetails?.description || "",
//       applicationType: data.appDetails?.applicationType || "",
//       submitDate: currentDate,
//       idNo: data.personalDetails?.idNo || "",
//       isLoanApp: data.appDetails?.isLoanApp || "No",
//       status: "bn",
//       // Map other original fields
//       jobName: data.appDetails?.jobName || "",
//       date: data.appDetails?.date || "",
//       area: data.appDetails?.area || "",
//       costCenter: data.appDetails?.costCenter || "",
//       fundSource: data.appDetails?.fundSource || "",
//       representative1: data.appDetails?.representative1 || "",
//       consumerRef: data.appDetails?.consumerRef || "",
//       natureOfSupply: data.appDetails?.natureOfSupply || "",
//       supplyDuration: data.appDetails?.supplyDuration || "",
//       supplyValue: data.appDetails?.supplyValue || "",
//       // Personal
//       idType: data.personalDetails?.idType || "",
//       telephoneNo: data.personalDetails?.telephoneNo || "",
//       mobileNo: data.personalDetails?.mobileNo || "",
//       email: data.personalDetails?.email || "",
//       preferredLanguage: data.personalDetails?.preferredLanguage || "",
//       cebEmployee: data.personalDetails?.cebEmployee || "",
//       // Locational
//       streetAddress: data.locationalDetails?.streetAddress || "",
//       suburb: data.locationalDetails?.suburb || "",
//       city: data.locationalDetails?.city || "",
//       postalCode: data.locationalDetails?.postalCode || "",
//       district: data.locationalDetails?.district || "",
//       districtCode: data.locationalDetails?.districtCode || "",
//       divisionalSecretariat: data.locationalDetails?.divisionalSecretariat || "",
//       gsDivision: data.locationalDetails?.gsDivision || "",
//       electorate: data.locationalDetails?.electorate || "",
//       electorateCode: data.locationalDetails?.electorateCode || "",
//       agaDivision: data.locationalDetails?.agaDivision || "",
//       csc: data.locationalDetails?.csc || "",
//       cscCode: data.locationalDetails?.cscCode || "",
//       ownership: data.locationalDetails?.ownership || "",
//       ownerCertified: data.locationalDetails?.ownerCertified || "",
//       isGovernmentPlace: data.locationalDetails?.isGovernmentPlace || "",
//       // Tech
//       meteringType: data.techDetails?.meteringType || "",
//       hasExistingSupply: data.techDetails?.hasExistingSupply || "",
//       capacity: data.techDetails?.capacity || "",
//       meteringPoints: data.techDetails?.meteringPoints || "",
//       accountNumbers: data.techDetails?.accountNumbers || "",
//       supplyType: data.techDetails?.supplyType || "",
//       // Documents would need separate handling, e.g., upload API
//     };

//     try {
//       const response = await fetch(`${baseUrl}/api/application/save`, {
//         method: "POST",
//         headers: {
//           Authorization: "Basic " + btoa("user:admin123"),
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(applicationData),
//       });

//       if (response.ok) {
//         toast.success("Form submitted successfully!");
//       } else {
//         toast.error("Form submission failed!");
//       }
//     } catch (error) {
//       toast.error("An error occurred!");
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <div className="flex justify-center">
//         <Application
//           onFormSubmit={handleFormSubmit}
//           isModify={isModify}
//         />
//       </div>
//     </div>
//   );
// };

// export default NewApplicationPage;



// import NewApplication from "components/Applicationss/NewApplication";
// import { useState } from "react";
// import { toast } from "react-toastify";

// const NewApp = () => {
//   const [isModify] = useState(false);
//   const baseUrl = process.env.REACT_APP_API_BASE_URL;

//   const handleFormSubmit = async (data) => {
//     // Flatten data from sections
//     const mergedData = {
//       applicationId: data.application?.applicationId || "",
//       description: data.application?.description || "",
//       jobName: data.application?.jobName || "",
//       date: data.application?.date || new Date().toISOString().split('T')[0],
//       area: data.application?.area || "",
//       costCenter: data.application?.costCenter || "",
//       applicationType: data.application?.applicationType || "",
//       fundSource: data.application?.fundSource || "",
//       representative1: data.application?.representative1 || "",
//       consumerRef: data.application?.consumerRef || "",
//       natureOfSupply: data.application?.natureOfSupply || "",
//       supplyDuration: data.application?.supplyDuration || "",
//       supplyValue: data.application?.supplyValue || "",
//       isLoanApp: data.application?.isLoanApp || "No",
//       submitDate: new Date().toISOString().split('T')[0],
//       status: "bn", // Keep default if not in form
//       idNo: data.personal?.idNo || "",
//       idType: data.personal?.idType || "NIC",
//       fname: data.personal?.fname || "",
//       lname: data.personal?.lname || "",
//       streetAddress: data.personal?.streetAddress || "",
//       suburb: data.personal?.suburb || "",
//       city: data.personal?.city || "",
//       postalCode: data.personal?.postalCode || "",
//       telephoneNo: data.personal?.telephoneNo || "",
//       mobileNo: data.personal?.mobileNo || "",
//       email: data.personal?.email || "",
//       preferredLanguage: data.personal?.preferredLanguage || "",
//       cebEmployee: data.personal?.cebEmployee || "",
//       // Locational fields
//       serviceStreetAddress: data.locational?.streetAddress || "",
//       serviceSuburb: data.locational?.suburb || "",
//       serviceCity: data.locational?.city || "",
//       servicePostalCode: data.locational?.postalCode || "",
//       district: data.locational?.district || "",
//       districtCode: data.locational?.districtCode || "",
//       divisionalSecretariat: data.locational?.divisionalSecretariat || "",
//       gsDivision: data.locational?.gsDivision || "",
//       electorate: data.locational?.electorate || "",
//       electorateCode: data.locational?.electorateCode || "",
//       agaDivision: data.locational?.agaDivision || "",
//       csc: data.locational?.csc || "",
//       cscCode: data.locational?.cscCode || "",
//       ownership: data.locational?.ownership || "owner",
//       ownerCertified: data.locational?.ownerCertified || "Yes",
//       isGovernmentPlace: data.locational?.isGovernmentPlace || "No",
//       // Technical fields
//       meteringType: data.technical?.meteringType || "HT",
//       hasExistingSupply: data.technical?.hasExistingSupply || "Yes",
//       capacity: data.technical?.capacity || "",
//       meteringPoints: data.technical?.meteringPoints || "",
//       accountNumbers: data.technical?.accountNumbers || "",
//       supplyType: data.technical?.supplyType || "",
//       // Documents not included (handle separately if needed)
//     };

//     try {
//       const response = await fetch(`${baseUrl}/api/application/save`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Basic " + btoa("user:admin123"),
//         },
//         credentials: "include",
//         body: JSON.stringify(mergedData),
//       });

//       if (response.ok) {
//         toast.success("Form submitted successfully!");
//       } else {
//         toast.error("Form submission failed!");
//       }
//     } catch (error) {
//       toast.error("An error occurred!");
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <div className="flex justify-center">
//         <NewApplication
//           onFormSubmit={handleFormSubmit}
//           isModify={isModify}
//         />
//       </div>
//     </div>
//   );
// };

// export default NewApp;



import NewApplication from "components/Applicationss/NewApplication";
import { useState } from "react";
import { toast } from "react-toastify";

const NewApp = () => {
  const [isModify] = useState(false);
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const handleFormSubmit = async (data) => {
    const mergedData = {
      applicationId: data.application?.applicationId || "",
      description: data.application?.description || "",
      jobName: data.application?.jobName || "",
      date: data.application?.date || new Date().toISOString().split('T')[0],
      area: data.application?.area || "",
      costCenter: data.application?.costCenter || "",
      applicationType: data.application?.applicationType || "",
      fundSource: data.application?.fundSource || "",
      representative1: data.application?.representative1 || "",
      consumerRef: data.application?.consumerRef || "",
      natureOfSupply: data.application?.natureOfSupply || "",
      supplyDuration: data.application?.supplyDuration || "",
      supplyValue: data.application?.supplyValue || "",
      isLoanApp: data.application?.isLoanApp || "No",
      submitDate: new Date().toISOString().split('T')[0],
      status: "bn",
      idNo: data.personal?.idNo || "",
      idType: data.personal?.idType || "NIC",
      firstName: data.personal?.firstName || "",
      lastName: data.personal?.lastName || "",
      streetAddress: data.personal?.streetAddress || "",
      suburb: data.personal?.suburb || "",
      city: data.personal?.city || "",
      postalCode: data.personal?.postalCode || "",
      telephoneNo: data.personal?.telephoneNo || "",
      mobileNo: data.personal?.mobileNo || "",
      email: data.personal?.email || "",
      preferredLanguage: data.personal?.preferredLanguage || "",
      cebEmployee: data.personal?.cebEmployee || "",
      // Locational
      serviceStreetAddress: data.locational?.streetAddress || "",
      serviceSuburb: data.locational?.suburb || "",
      serviceCity: data.locational?.city || "",
      servicePostalCode: data.locational?.postalCode || "",
      district: data.locational?.district || "",
      districtCode: data.locational?.districtCode || "",
      divisionalSecretariat: data.locational?.divisionalSecretariat || "",
      gsDivision: data.locational?.gsDivision || "",
      electorate: data.locational?.electorate || "",
      electorateCode: data.locational?.electorateCode || "",
      agaDivision: data.locational?.agaDivision || "",
      csc: data.locational?.csc || "",
      cscCode: data.locational?.cscCode || "",
      ownership: data.locational?.ownership || "owner",
      ownerCertified: data.locational?.ownerCertified || "Yes",
      isGovernmentPlace: data.locational?.isGovernmentPlace || "No",
      // Technical
      meteringType: data.technical?.meteringType || "HT",
      hasExistingSupply: data.technical?.hasExistingSupply || "Yes",
      capacity: data.technical?.capacity || "",
      meteringPoints: data.technical?.meteringPoints || "",
      accountNumbers: data.technical?.accountNumbers || "",
      supplyType: data.technical?.supplyType || "",
    };

    try {
      const response = await fetch(`${baseUrl}/api/application/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("user:admin123"),
        },
        credentials: "include",
        body: JSON.stringify(mergedData),
      });

      if (response.ok) {
        toast.success("Form submitted successfully!");
      } else {
        toast.error("Form submission failed!");
      }
    } catch (error) {
      toast.error("An error occurred!");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-center">
        <NewApplication
          onFormSubmit={handleFormSubmit}
          isModify={isModify}
        />
      </div>
    </div>
  );
};

export default NewApp;