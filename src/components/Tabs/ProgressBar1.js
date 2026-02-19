// import { useState } from "react";
// import FileUpload from "./FileUpload";
// import ModifyProgress from "layouts/ModifyProgress";
// import React, { useEffect } from "react";
// import axios from "axios";

// const ProgressBar1 = () => {
//   const [progress, setProgress] = useState(0); // Start with 0 progress
//   const [estimateNo, setEstimateNo] = useState(""); // State for the estimate number
//   const [error, setError] = useState(""); // State for error messages

//   // Function to check if estimate exists and update progress
//   const checkEstimateAndUpdateProgress = async () => {
//     if (!estimateNo.trim()) {
//       setError("Please enter an estimate number");
//       return;
//     }
//     try {
//       setError(""); // Clear any previous errors


//       // API call with Basic Authentication to check if the estimate exists
//       const response = await axios.get(`http://localhost:8081/api/progress/${estimateNo}`, {
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": "Basic " + btoa("user:admin123")
//         },
//         // Include credentials if your API requires cookies to be sent
//         withCredentials: true
//       });
//       // If the API returns true, set progress to 5%
//       if (response.data === true) {
//         setProgress(5);
//       } else {
//         setError("Estimate not found in database");
//       }
//     } catch (error) {
//       console.error("Error checking estimate:", error);
//       setError("Failed to check estimate. Please try again.");
//     }
//   };


//   return (
//     <div className="flex-auto px-4 lg:px-10 py-10 pt-2">
//       <form>
//         <div className="flex flex-wrap">
//           <div className="flex"></div>

//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block text-blueGray-600 text-sm mb-2"
//                 htmlFor="estimateNo"
//               >
//                 Estimate Number
//               </label>
//               <div className="flex">
//                 <input
//                   type="text"
//                   name="estimateNo"
//                   id="estimateNo"
//                   value={estimateNo}
//                   onChange={(e) => setEstimateNo(e.target.value)}
//                   className="border-0 px-3 h-8 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                 />
//                 <button
//                   type="button"
//                   onClick={checkEstimateAndUpdateProgress}
//                   //  onClick={() => setProgress(Math.min(100, progress + 5))}
//                   className="ml-2 text-white text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
//                   style={{
//                     backgroundColor: "#7c0000",
//                   }}
//                 >
//                   Print
//                 </button>
//               </div>
//               {/* Error message */}
//               {error && (
//                 <div className="text-red-500 text-xs mt-1">{error}</div>
//               )}

//               {/* --- Progress Bar --- */}
            
//               {/* Improved Progress Bar with both Tailwind and inline styles */}
//               <div className="w-full mt-6 p-3 border border-gray-200 rounded shadow-sm bg-white">
//                 {/* <h3 className="text-lg font-bold mb-2 text-blueGray-700">Project Status</h3> */}

//                 <div className="flex justify-between mb-1">
//                   <span className="text-base font-medium text-blue-700">Progress</span>
//                   <span className="text-sm font-medium text-blue-700">{progress}%</span>
//                 </div>
//                 {/* Progress bar container */}

//                 {/* Progress bar fill - using !important to override any conflicting styles */}
//                 <div
//                   className="h-5 rounded-full text-xs text-white flex items-center justify-center font-bold"
//                   style={{
//                     width: `${progress}%`,
//                     backgroundColor: "#10b981",
//                     minWidth: progress > 0 ? '30px' : '0'
//                   }}
//                 >
//                   {progress > 0 && `${progress}%`}
//                 </div>
//               </div>

//               {/* Controls to test if the progress bar works */}
//               <div className="flex justify-between mt-3">
               
//                 <button
//                   type="button"
//                   onClick={() => setProgress(0)}
//                   className="px-2 py-1 bg-blue-500 text-blue rounded text-xs"
//                 >
//                   Clear
//                 </button>
              
//               </div>
//             </div>
//             {/* --- End Progress Bar --- */}
//           </div>
//         </div>

//       </form>
//     </div>
//   );
// };

// export default ProgressBar1;

// import { useState } from "react";
// import FileUpload from "./FileUpload";
// import ModifyProgress from "layouts/ModifyProgress";
// import React, { useEffect } from "react";
// import axios from "axios";

// const ProgressBar1 = () => {

//   const baseUrl = process.env.REACT_APP_API_BASE_URL;

//   const [progress, setProgress] = useState(0); // Start with 0 progress
//   const [estimateNo, setEstimateNo] = useState(""); // State for the estimate number
//    const [error, setError] = useState(""); // State for error messages
//   const [estimateDate, setEstimateDate] = useState(""); // State for storing estimate date
//    const [projectAssignDate, setProjectAssignDate] = useState(""); // State for storing project assignment date



//   // Function to check if estimate exists and update progress
//   const checkEstimateAndUpdateProgress = async () => {
//     if (!estimateNo.trim()) {
//       setError("Please enter an estimate number");
//       return;
//     }
//     try {
//       setError(""); // Clear any previous errors
//       setEstimateDate(""); // Clear any previous estimate date
//       setProjectAssignDate(""); // Clear any previous project assignment date


//       // API call with Basic Authentication to check if the estimate exists
//       const response = await axios.get(`${baseUrl}/api/pcesthmt/${estimateNo}`, {
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": "Basic " + btoa("user:admin123")
//         },
//         // Include credentials if your API requires cookies to be sent
//         withCredentials: true
//       });

//       console.log("API Response:", response.data); // Log to see what we're getting
    

//     // Check if we have response data
//     if (response.data) {
//       // Check if we have an estimate date
//       if (response.data.etimateDt) {
//         setProgress(10); // Set progress to 10% as required
//         setEstimateDate(response.data.etimateDt); // Store the estimate date
//       }
//        // Check if we have a project assignment date
//           if (response.data.prjAssDt) {
//             setProjectAssignDate(response.data.prjAssDt); // Store the project assignment date
//           }
//            else {
//         setError("Estimate found but missing date information");
//         setProgress(0);
//       }
//       } else {
//       setError("No data returned for this estimate number");
//       setProgress(0);
//     }
//     } catch (error) {
//       console.error("Error checking estimate:", error);
//       setError("Failed to check estimate. Please try again.");
//       setProgress(0);
//     }
//   };


//   return (
//     <div className="flex-auto px-4 lg:px-10 py-10 pt-2">
//       <form>
//         <div className="flex flex-wrap">
//           <div className="flex"></div>

//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block text-blueGray-600 text-sm mb-2"
//                 htmlFor="estimateNo"
//               >
//                 Estimate Number
//               </label>
//               <div className="flex">
//                 <input
//                   type="text"
//                   name="estimateNo"
//                   id="estimateNo"
//                   value={estimateNo}
//                   onChange={(e) => setEstimateNo(e.target.value)}
//                   className="border-0 px-3 h-8 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                 />
//                 <button
//                   type="button"
//                   onClick={checkEstimateAndUpdateProgress}
//                   //  onClick={() => setProgress(Math.min(100, progress + 5))}
//                   className="ml-2 text-white text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
//                   style={{
//                     backgroundColor: "#7c0000",
//                   }}
//                 >
//                   Print
//                 </button>
//               </div>
//               {/* Error message */}
//               {error && (
//                 <div className="text-red-500 text-xs mt-1">{error}</div>
//               )}

//               {/* Display estimate date if available */}
//               {estimateDate && (
//                 <div className="text-green-600 text-sm mt-2">
//                   <strong>Estimate Date:</strong> {estimateDate}
//                 </div>
//               )}
//                  {/* Display project assignment date if available */}
//               {projectAssignDate && (
//                 <div className="text-green-600 text-sm mt-2">
//                   <strong>Project Assign Date:</strong> {projectAssignDate}
//                 </div>
//               )}

//               {/* --- Progress Bar --- */}
            
//               {/* Improved Progress Bar with both Tailwind and inline styles */}
//               <div className="w-full mt-6 p-3 border border-gray-200 rounded shadow-sm bg-white">
//                 {/* <h3 className="text-lg font-bold mb-2 text-blueGray-700">Project Status</h3> */}

//                 <div className="flex justify-between mb-1">
//                   <span className="text-base font-medium text-blue-700">Progress</span>
//                   <span className="text-sm font-medium text-blue-700">{progress}%</span>
//                 </div>
//                 {/* Progress bar container */}

//                 {/* Progress bar fill - using !important to override any conflicting styles */}
//                 <div
//                   className="h-5 rounded-full text-xs text-white flex items-center justify-center font-bold"
//                   style={{
//                     width: `${progress}%`,
//                     backgroundColor: "#10b981",
//                     minWidth: progress > 0 ? '30px' : '0'
//                   }}
//                 >
//                   {progress > 0 && `${progress}%`}
//                 </div>
//               </div>

//               {/* Controls to test if the progress bar works */}
//               <div className="flex justify-between mt-3">
               
//                 <button
//                   type="button"
//                    onClick={() => {
//                     setProgress(0);
//                     setEstimateDate("");
//                     setProjectAssignDate("");
//                   }}
//                   className="px-2 py-1 bg-blue-500 text-blue rounded text-xs"
//                 >
//                   Clear
//                 </button>
              
//               </div>
//             </div>
//             {/* --- End Progress Bar --- */}
//           </div>
//         </div>

//       </form>
//     </div>
//   );
// };

// export default ProgressBar1;



import { useState } from "react";
import axios from "axios";

const ProgressBar1 = () => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const [progress, setProgress] = useState(0);
  const [estimateNo, setEstimateNo] = useState("");
  const [error, setError] = useState("");
  const [estimateDate, setEstimateDate] = useState("");
  const [projectAssignDate, setProjectAssignDate] = useState("");

  const checkEstimateAndUpdateProgress = async () => {
    if (!estimateNo.trim()) {
      setError("Please enter an estimate number");
      return;
    }
    try {
      setError("");
      setEstimateDate("");
      setProjectAssignDate("");

      const response = await axios.get(`${baseUrl}/api/pcesthmt/${estimateNo}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic " + btoa("user:admin123")
        },
        withCredentials: true
      });

      console.log("API Response:", response.data);

      if (response.data) {
        if (response.data.etimateDt) {
          setProgress(10);
          setEstimateDate(response.data.etimateDt);
        }
        if (response.data.prjAssDt) {
          setProjectAssignDate(response.data.prjAssDt);
        } else {
          setError("Estimate found but missing date information");
          setProgress(0);
        }
      } else {
        setError("No data returned for this estimate number");
        setProgress(0);
      }
    } catch (error) {
      console.error("Error checking estimate:", error);
      setError("Failed to check estimate. Please try again.");
      setProgress(0);
    }
  };

  return (
    <div className="flex-auto">
      <form>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-12/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2" htmlFor="estimateNo">
                Estimate Number
              </label>
              <div className="flex">
                <input
                  type="text"
                  name="estimateNo"
                  id="estimateNo"
                  value={estimateNo}
                  onChange={(e) => setEstimateNo(e.target.value)}
                  placeholder="Enter Estimate Number"
                  className="p-2 w-1/2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
                />
                <button
                  type="button"
                  onClick={checkEstimateAndUpdateProgress}
                  className="ml-2 bg-[#7c0000] text-white text-sm px-4 py-2 rounded shadow hover:bg-[#a00000] focus:outline-none focus:ring-2 focus:ring-[#7c0000] focus:ring-opacity-50"
                >
                  Print
                </button>
              </div>
              
              {error && (
                <div className="text-red-500 text-xs mt-1">{error}</div>
              )}

              {estimateDate && (
                <div className="text-green-600 text-sm mt-2">
                  <strong>Estimate Date:</strong> {estimateDate}
                </div>
              )}
              
              {projectAssignDate && (
                <div className="text-green-600 text-sm mt-2">
                  <strong>Project Assign Date:</strong> {projectAssignDate}
                </div>
              )}

              <div className="w-full mt-4 p-3 border border-gray-200 rounded shadow-sm bg-white">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm font-medium text-gray-700">{progress}%</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-5">
                  <div
                    className="h-5 rounded-full text-xs text-white flex items-center justify-center font-bold transition-all duration-300"
                    style={{
                      width: `${progress}%`,
                      backgroundColor: "#10b981",
                    }}
                  >
                    {progress > 0 && `${progress}%`}
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setProgress(0);
                    setEstimateDate("");
                    setProjectAssignDate("");
                    setEstimateNo("");
                  }}
                  className="px-3 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProgressBar1;