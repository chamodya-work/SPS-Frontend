// import { useState,useEffect } from "react";
// import FileUpload from "./FileUpload";
// import ModifyProgress from "layouts/ModifyProgress";
// import axios from "axios";


// const AllocationOCJ = () => {
//   const [estimateNo, setEstimateNo] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   // Get department ID from session
//   const [deptId, setDeptId] = useState("");

//   useEffect(() => {
//     // Get department ID from session storage
//     try {
//       const user = JSON.parse(sessionStorage.getItem("user") || "{}");
//       if (user.deptId) {
//         setDeptId(user.deptId);
//         console.log("Department ID from session:", user.deptId);
//       } else {
//         console.warn("Department ID not found in session");
//       }
//     } catch (error) {
//       console.error("Error retrieving department ID from session:", error);
//     }
//   }, []);
//   const handleInputChange = (e) => {
//     setEstimateNo(e.target.value);
//   };

//   const handlePrintReport = async (e) => {
//     e.preventDefault();
    
//     if (!estimateNo.trim()) {
//       setError("Please enter an estimate number");
//       return;
//     }

//     if (!deptId) {
//       setError("Department ID not found. Please login again.");
//       return;
//     }
//     try {
//       setLoading(true);
//       setError(null);
      
//       // Generate PDF in a new tab/window by creating a URL with query parameters
//       const url = `http://localhost:8081/report/appli?applicationNo=${estimateNo}&deptId=${deptId}`;
      
//       console.log("Making request with deptId:", deptId);
      
//       // Using fetch with Basic Authentication
//       const response = await fetch(url, {
//         method: "GET",
//         headers: {
//           Authorization: "Basic " + btoa("user:admin123"),
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//       });
//       if (response.ok) {
//         // Get the blob from response
//         const blob = await response.blob();
        
//         // Create a blob URL
//         const blobUrl = URL.createObjectURL(blob);
        
//         // Open in new tab
//         window.open(blobUrl, '_blank');
//       } else {
//         throw new Error(`Server returned ${response.status}: ${response.statusText}`);
//       }
      
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//       setError("Failed to generate PDF. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex-auto px-4 lg:px-10 py-10 pt-2">
//       <form onSubmit={handlePrintReport}>
//         {/* <div className="block  text-blueGray-600 text-m font-bold mb-3 ml-3">Download Letters</div> */}

//         {/* //new */}
//         <div className="flex flex-wrap ">
//           <div className="flex"></div>

//           {/* drop down */}

//           {/* drop doun end */}

//           {/* second field row */}

//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block  text-blueGray-600 text-sm mb-2"
//                 htmlFor="estimateNo"
//               >
//                 Estimate Number
//               </label>
//               <div className="flex ">
//                 <input
//                    type="text"
//                    name="estimateNo"
//                    id="estimateNo"
//                    value={estimateNo}
//                    onChange={handleInputChange}
//                   className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                 />
//                 <button
//                 type="submit"
//                 disabled={loading}
//                   className="ml-2 bg-lightBlue-500 text-white active:bg-lightBlue-600 text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
//                   style={{
//                     backgroundColor: "#7c0000",
//                   }}
//                 >
//                     {loading ? "Processing..." : "Print"}
                
//                 </button>
//               </div>
//             </div>
//           </div>
//           {/* second field row end */}

//           {/* Display error message if there is one */}
//           {error && (
//           <div className="w-full px-4 mt-2">
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//               <span className="block sm:inline">{error}</span>
//             </div>
//           </div>
//         )}
//         </div>

//         {/* test */}
//       </form>
//     </div>
//   );
// };

// export default AllocationOCJ;


import { useState, useEffect } from "react";
import axios from "axios";

const AllocationOCJ = () => {
  const [estimateNo, setEstimateNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deptId, setDeptId] = useState("");

  useEffect(() => {
    // Get department ID from session storage
    try {
      const user = JSON.parse(sessionStorage.getItem("user") || "{}");
      if (user.deptId) {
        setDeptId(user.deptId);
        console.log("Department ID from session:", user.deptId);
      } else {
        console.warn("Department ID not found in session");
      }
    } catch (error) {
      console.error("Error retrieving department ID from session:", error);
    }
  }, []);

  const handleInputChange = (e) => {
    setEstimateNo(e.target.value);
    if (error) setError(null);
  };

  const handlePrintReport = async (e) => {
    e.preventDefault();
    
    if (!estimateNo.trim()) {
      setError("Please enter an estimate number");
      return;
    }

    if (!deptId) {
      setError("Department ID not found. Please login again.");
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const url = `http://localhost:8081/report/appli?applicationNo=${estimateNo}&deptId=${deptId}`;
      
      console.log("Making request with deptId:", deptId);
      
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa("user:admin123"),
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, '_blank');
      } else {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }
      
    } catch (error) {
      console.error("Error generating PDF:", error);
      setError("Failed to generate PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-auto">
      <form onSubmit={handlePrintReport}>
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
                  onChange={handleInputChange}
                  placeholder="Enter Estimate Number"
                  className={`p-2 w-1/2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150 ${
                    error ? "border-red-500" : ""
                  }`}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="ml-2 bg-[#7c0000] text-white text-sm px-4 py-2 rounded shadow hover:bg-[#a00000] focus:outline-none focus:ring-2 focus:ring-[#7c0000] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed min-w-[80px]"
                >
                  {loading ? "..." : "Print"}
                </button>
              </div>
              
              {error && (
                <p className="text-red-500 text-xs mt-1">{error}</p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AllocationOCJ;