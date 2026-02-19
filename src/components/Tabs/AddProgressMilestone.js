// import { useState } from "react";
// import FileUpload from "./FileUpload";
// import ModifyProgress from "layouts/ModifyProgress";
// import React, { useEffect } from "react";
// import axios from "axios";

// const nicRegex = /^(\d{9}[Vv]|\d{12})$/; // Validates both old and new NIC formats

// const AddProgressMilestone = ({ handleChange, formData = {} }) => {
//   const [deptId, setDeptId] = useState("");

//   useEffect(() => {
//     // Fetch session data from the backend
//     axios
//       .get("http://localhost:8081/api/v1/session-info", {
//         withCredentials: true, // Include cookies/session credentials
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Basic " + btoa("user:admin123"),
//         },
//       })
//       .then((response) => {
//         if (response.data.deptId) {
//           setDeptId(response.data.deptId);

//           // Update formData with the deptId
//           if (handleChange) {
//             handleChange({
//               target: {
//                 name: "deptId",
//                 value: response.data.deptId,
//               },
//             });
//           }
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching session data:", error);
//         // Set a fallback value or show a user-friendly message
//         setDeptId("Not authenticated - please log in");

//         // Optionally redirect to login if needed
//         // if (error.response && error.response.status === 401) {
//         //   window.location.href = '/auth/login';
//         // }
//       });
//   }, [handleChange]);

//   return (
//     <div className="flex-auto px-4 lg:px-10 py-10 pt-2">
//       <form>
//         {/* <div className="block  text-blueGray-600 text-m font-bold mb-3 ml-3">Add Progress Milestone</div> */}

//         {/* //new */}
//         <div className="flex flex-wrap ">
//           <div className="flex"></div>

//           {/* drop down */}
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block  text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                 Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name || ""}
//                 onChange={handleChange}
//                 className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//               />
//             </div>
//           </div>

//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block  text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                 Progress Milestone ID Number
//               </label>
//               <input
//                 type="text"
//                 name="id"
//                 value={formData.id || ""}
//                 onChange={handleChange}
//                 className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//               />
//             </div>
//           </div>

//           {/* drop doun end */}

//           {/* second field row */}
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block  text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                 Department ID
//               </label>
//               <input
//                 type="text"
//                 name="deptId"
//                 value={deptId}
//                 // onChange={handleChange}
//                 className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                 readOnly
//               />
//             </div>
//           </div>
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block  text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                 Percentage
//               </label>
//               <input
//                 type="text"
//                 name="percentage"
//                 value={formData.percentage || ""}
//                 onChange={handleChange}
//                 className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//               />
//             </div>
//           </div>
//           {/* second field row end */}

//           {/* <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
//                 htmlFor="grid-password"
//               >
//                 Commercial Reference
//               </label>
//               <input
//                 type="text"
//                 name="idType"
               
//                 className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//               />
//             </div>
//           </div> */}

//           {/* raw 4 */}

//           {/* raw 4 end */}

//           {/* Progress Milestone*/}
//         </div>

//         {/* test */}
//       </form>
//     </div>
//   );
// };

// export default AddProgressMilestone;


import { useState, useEffect } from "react";
import axios from "axios";

const AddProgressMilestone = ({ handleChange, formData = {} }) => {
  const [deptId, setDeptId] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/v1/session-info", {
        withCredentials: true,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("user:admin123"),
        },
      })
      .then((response) => {
        if (response.data.deptId) {
          setDeptId(response.data.deptId);
          if (handleChange) {
            handleChange({
              target: {
                name: "deptId",
                value: response.data.deptId,
              },
            });
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching session data:", error);
        setDeptId("Not authenticated - please log in");
      });
  }, [handleChange]);

  return (
    <div className="flex-auto">
      <form>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                placeholder="Enter Name"
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>

          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Progress Milestone ID Number
              </label>
              <input
                type="text"
                name="id"
                value={formData.id || ""}
                onChange={handleChange}
                placeholder="Enter ID"
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>

          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Department ID
              </label>
              <input
                type="text"
                name="deptId"
                value={deptId}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-gray-100 focus:outline-none cursor-not-allowed"
                readOnly
              />
            </div>
          </div>
          
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Percentage
              </label>
              <input
                type="text"
                name="percentage"
                value={formData.percentage || ""}
                onChange={handleChange}
                placeholder="Enter Percentage"
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProgressMilestone;