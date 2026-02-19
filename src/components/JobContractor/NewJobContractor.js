// import JobContractor from "components/Tabs/JobContractor";
// import { useState } from "react";
// import React from "react";
// import { useHistory } from "react-router-dom";

// const NewJobContractor = ({
//   onFormSubmit,
//   isModify,
//   formData,
//   setFormData,
//   handleSearch,
// }) => {
//   const history = useHistory();
//   // const downloadUserReport = () => {
//   //   fetch("http://localhost:8081/api/users/report/download", {
//   //     method: "GET",
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //       Authorization: "Basic " + btoa("user:admin123"),
//   //     },
//   //     credentials: "include",
//   //   })
//   //     .then((response) => {
//   //       if (!response.ok) {
//   //         throw new Error("Failed to fetch PDF");
//   //       }
//   //       return response.blob();
//   //     })
//   //     .then((blob) => {
//   //       const url = window.URL.createObjectURL(new Blob([blob]));
//   //       const link = document.createElement("a");
//   //       link.href = url;
//   //       link.setAttribute("download", `user_report.pdf`);
//   //       document.body.appendChild(link);
//   //       link.click();
//   //       link.parentNode.removeChild(link);
//   //     })
//   //     .catch((error) => {
//   //       console.error("Error downloading the report:", error);
//   //     });
//   // };

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
//     history.push("/jobcontractor/modify");
//   };

//   return (
//     <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg">
//       <div className="flex justify-center px-12 ml-2 mb-2 mt-6">
//         <h3 className="text-blueGray-700 text-sm font-bold">
//           {isModify ? "Update Contractor" : "Add Contractor"}
//         </h3>
//         {/* {!isModify && (
//           <button
//             onClick={handleUpdateClick}
//             style={{backgroundColor: "#7c0000"}}
//             className="text-white active:bg-emerald-600 font-bold text-xs px-6 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-2 ease-linear transition-all duration-150 mt-2"
//           >
//             Edit
//           </button>
//           )} */}
//       </div>
//       {/* Content */}
//       <div className="p-6 bg-blueGray-100 rounded-lg">
//         <JobContractor
//           onInputChange={(data) => handleInputChange("contractorDetails", data)}
//           isModify={isModify}
//           data={formData.contractorDetails}
//           handleSearch={handleSearch}
//         />
//       </div>

//       {/* Navigation Buttons */}
//       <div className="px-12 flex justify-between items-center mt-2 mb-4">
//         <div>
//           {!isModify && (
//             <button
//               onClick={handleUpdateClick}
//               style={{ backgroundColor: "#7c0000" }}
//               className="text-white active:bg-emerald-600 text-sm px-6 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-2 ease-linear transition-all duration-150 ml-2"
//             >
//               Edit
//             </button>
//           )}
//         </div>
//         <div>
//           <button
//             onClick={handleSubmit}
//             className="bg-emerald-400 text-white active:bg-emerald-600 text-sm px-6 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
//           >
//             {isModify ? "Update" : "Submit"}
//           </button>
//           {/* <button
//             onClick={downloadUserReport}
//             style={{ backgroundColor: "#7c0000" }}
//             className="text-white active:bg-emerald-600 text-sm px-6 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-2 ease-linear transition-all duration-150"
//           >
//             Download
//           </button> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewJobContractor;


import JobContractor from "components/Tabs/JobContractor";
import { useState } from "react";
import React from "react";
import { useHistory } from "react-router-dom";

const NewJobContractor = ({
  onFormSubmit,
  isModify,
  formData,
  setFormData,
  handleSearch,
}) => {
  const history = useHistory();

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
    history.push("/jobcontractor/modify");
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">
          {isModify ? "Update Contractor" : "Add Contractor"}
        </h2>
      </div>

      {/* Content */}
      <div className="bg-gray-50 rounded-lg border mb-4">
        <div className="p-6">
          <JobContractor
            onInputChange={(data) => handleInputChange("contractorDetails", data)}
            isModify={isModify}
            data={formData.contractorDetails}
            handleSearch={handleSearch}
          />
        </div>
      </div>

      {/* Bottom navigation */}
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

        <div>
          <button
            onClick={handleSubmit}
            className="bg-[#7c0000] text-white text-sm px-4 py-2 rounded shadow hover:bg-[#a00000] focus:outline-none focus:ring-2 focus:ring-[#7c0000] focus:ring-opacity-50"
          >
            {isModify ? "Update" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewJobContractor;