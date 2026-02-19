// import { useState, useEffect } from "react";

// const AppDetails = ({ onInputChange, isModify, data, handleSearch }) => {
//   const [appData, setAppData] = useState({
//     applicationId: "",
//     description: "",
//     jobName: "",
//   });

//   useEffect(() => {
//     if (data) {
//       setAppData(data);
//     }
//   }, [data]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const newData = { ...appData, [name]: value };
//     setAppData(newData);
//     onInputChange(newData);
//   };

//   return (
//     <div className="flex-auto px-4 py-10 pt-2 lg:px-10">
//       <form>
//         <div className="flex flex-wrap">
//           <div className="w-full px-4 lg:w-6/12">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block mb-2 text-sm text-blueGray-600"
//                 htmlFor="grid-password"
//               >
//                 Temporary ID
//               </label>
//               <div className="flex ">
//                 <input
//                   type="text"
//                   name="applicationId"
//                   value={appData.applicationId}
//                   onChange={handleChange}
//                   className="w-full h-10 px-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
//                   placeholder="430.00/ABS/25/xxxx"
//                 />
//                 {isModify && (
//                   <button
//                     className="px-4 py-2 ml-2 mr-1 text-sm text-white transition-all duration-150 ease-linear rounded shadow outline-none active:bg-lightBlue-600 hover:shadow-md focus:outline-none"
//                     style={{ backgroundColor: "#7c0000" }}
//                     onClick={handleSearch}
//                   >
//                     Search
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//           <div className="w-full px-4 lg:w-6/12">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block mb-2 text-sm text-blueGray-600"
//                 htmlFor="grid-password"
//               >
//                 Date
//               </label>
//               <input
//                 type="date"
//                 name="date"
//                 className="w-full px-3 py-2 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
//               />
//             </div>
//           </div>
//           <div className="w-full px-4 lg:w-6/12">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block mb-2 text-sm text-blueGray-600"
//                 htmlFor="grid-password"
//               >
//                 Area
//               </label>
//               <select
//                 name="area"
//                 className="w-full h-10 px-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
//               >
//                 <option value="AREA - MAWANELLA">Area - Mawanella</option>
//                 <option value="AREA - OTHER">Area - Other</option>
//               </select>
//             </div>
//           </div>
//           <div className="w-full px-4 lg:w-6/12">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block mb-2 text-sm text-blueGray-600"
//                 htmlFor="grid-password"
//               >
//                 CostCenter
//               </label>
//               <input
//                 type="text"
//                 className="w-full h-10 px-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
//                 placeholder="430.00"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-wrap">
//           <div className="w-full px-4 lg:w-6/12">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block mb-2 text-sm text-blueGray-600"
//                 htmlFor="grid-password"
//               >
//                 Application Type
//               </label>
//               <select
//                 name="ApplicationType"
//                 className="w-full h-10 px-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
//               >
//                 <option value="BS">BS</option>
//                 <option value="Other">OTHER</option>
//               </select>
//             </div>
//           </div>
//           <div className="w-full px-4 lg:w-6/12">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block mb-2 text-sm text-blueGray-600"
//                 htmlFor="grid-password"
//               >
//                 Found Source
//               </label>
//               <select
//                 name="FoundSource"
//                 className="w-full h-10 px-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
//               >
//                 <option value="ADB">ADB</option>
//                 <option value="Other">OTHER</option>
//               </select>
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-wrap">
//           <div className="w-full px-4 lg:w-6/12">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block mb-2 text-sm text-blueGray-600"
//                 htmlFor="grid-password"
//               >
//                 Representative 1
//               </label>
//               <input
//                 type="text"
//                 className="w-full h-10 px-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
//               />
//             </div>
//           </div>
//           <div className="w-full px-4 lg:w-6/12">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block mb-2 text-sm text-blueGray-600"
//                 htmlFor="grid-password"
//               >
//                 Description
//               </label>
//               <input
//                 type="text"
//                 name="description"
//                 value={appData.description}
//                 onChange={handleChange}
//                 className="w-full h-10 px-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-wrap">
//           <div className="w-full px-4 lg:w-6/12">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block mb-2 text-sm text-blueGray-600"
//                 htmlFor="grid-password"
//               >
//                 Consumer Reference
//               </label>
//               <input
//                 type="text"
//                 className="w-full h-10 px-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
//               />
//             </div>
//           </div>
//           <div className="w-full px-4 lg:w-6/12">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block mb-2 text-sm text-blueGray-600"
//                 htmlFor="grid-password"
//               >
//                 Job Name
//               </label>
//               <input
//                 type="text"
//                 name="jobName"
//                 value={appData.jobName}
//                 onChange={handleChange}
//                 className="w-full h-10 px-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-wrap">
//           <div className="w-full px-4 lg:w-6/12">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block mb-2 text-sm text-blueGray-600"
//                 htmlFor="grid-password"
//               >
//                 Nature of Supply
//               </label>
//               <div className="flex ">
//                 <select
//                   name="FoundSource"
//                   className="w-full h-10 px-3 mr-2 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
//                 >
//                   <option value="permanent">Permanent</option>
//                   <option value="Other">OTHER</option>
//                 </select>
//                 <select
//                   name="FoundSource"
//                   className="w-full h-10 px-3 mr-2 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
//                 >
//                   <option value="Years">Years</option>
//                   <option value="Other">OTHER</option>
//                 </select>
//                 <input
//                   type="text"
//                   className="w-full h-10 px-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="w-full px-4 lg:w-6/12">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block mb-2 text-sm text-blueGray-600"
//                 htmlFor="grid-password"
//               >
//                 Is Loan App
//               </label>
//               <div className="flex gap-4 mt-4">
//                 <label className="mr-4 text-sm">
//                   <input
//                     type="radio"
//                     name="isLoanApp"
//                     defaultChecked
//                     value="Yes"
//                   />{" "}
//                   Yes - 75% Loan Scheme
//                 </label>
//                 <label className="text-sm">
//                   <input type="radio" name="isLoanApp" value="No" /> No
//                 </label>
//               </div>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AppDetails;


import { useState, useEffect } from "react";

const AppDetails = ({ onInputChange, isModify, data, handleSearch }) => {
  const [appData, setAppData] = useState({
    applicationId: "",
    description: "",
    jobName: "",
    date: "",
    area: "",
    costCenter: "",
    applicationType: "",
    fundSource: "",
    representative1: "",
    consumerRef: "",
    natureOfSupply: "",
    supplyDuration: "",
    supplyValue: "",
    isLoanApp: "Yes",
  });

  useEffect(() => {
    if (data) {
      setAppData((prev) => ({ ...prev, ...data }));
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === "radio" ? value : value;
    const newData = { ...appData, [name]: newValue };
    setAppData(newData);
    onInputChange(newData);
  };

  const handleSearchClick = () => { 
    if (handleSearch && appData.applicationId) {
      handleSearch(appData.applicationId);  
    }
  };

  return (
    <div className="flex-auto">
      <form>
        <div className="flex flex-wrap">
          {/* Temporary ID with Search */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Temporary ID
              </label>
              <div className="flex">
                <input
                  type="text"
                  name="applicationId"
                  value={appData.applicationId || ""}
                  onChange={handleChange}
                  placeholder="430.00/ABS/25/xxxx"
                  className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
                />
                {isModify && (
                  <button
                    onClick={handleSearchClick}
                    className="ml-2 bg-[#7c0000] text-white text-sm px-4 py-2 rounded shadow hover:bg-[#a00000] focus:outline-none focus:ring-2 focus:ring-[#7c0000] focus:ring-opacity-50"
                  >
                    Search
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Date */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={appData.date || ""}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>

          {/* Area */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Area
              </label>
              <select
                name="area"
                value={appData.area || ""}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              >
                <option value="">Select Area</option>
                <option value="AREA - MAWANELLA">Area - Mawanella</option>
                <option value="AREA - OTHER">Area - Other</option>
              </select>
            </div>
          </div>

          {/* Cost Center */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Cost Center
              </label>
              <input
                type="text"
                name="costCenter"
                value={appData.costCenter || ""}
                onChange={handleChange}
                placeholder="430.00"
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>

          {/* Application Type */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Application Type
              </label>
              <select
                name="applicationType"
                value={appData.applicationType || ""}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              >
                <option value="">Select Type</option>
                <option value="BS">BS</option>
                <option value="Other">OTHER</option>
              </select>
            </div>
          </div>

          {/* Fund Source */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Fund Source
              </label>
              <select
                name="fundSource"
                value={appData.fundSource || ""}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              >
                <option value="">Select Fund Source</option>
                <option value="ADB">ADB</option>
                <option value="Other">OTHER</option>
              </select>
            </div>
          </div>

          {/* Representative 1 */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Representative 1
              </label>
              <input
                type="text"
                name="representative1"
                value={appData.representative1 || ""}
                onChange={handleChange}
                placeholder="Enter Representative"
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>

          {/* Description */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Description
              </label>
              <input
                type="text"
                name="description"
                value={appData.description || ""}
                onChange={handleChange}
                placeholder="Enter Description"
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>

          {/* Consumer Reference */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Consumer Reference
              </label>
              <input
                type="text"
                name="consumerRef"
                value={appData.consumerRef || ""}
                onChange={handleChange}
                placeholder="Enter Consumer Reference"
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>

          {/* Job Name */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Job Name
              </label>
              <input
                type="text"
                name="jobName"
                value={appData.jobName || ""}
                onChange={handleChange}
                placeholder="Enter Job Name"
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>

          {/* Nature of Supply */}
          <div className="w-full lg:w-12/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Nature of Supply
              </label>
              <div className="flex flex-wrap gap-2">
                <select
                  name="natureOfSupply"
                  value={appData.natureOfSupply || ""}
                  onChange={handleChange}
                  className="p-2 flex-1 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
                >
                  <option value="">Select Type</option>
                  <option value="permanent">Permanent</option>
                  <option value="temporary">Temporary</option>
                </select>
                <select
                  name="supplyDuration"
                  value={appData.supplyDuration || ""}
                  onChange={handleChange}
                  className="p-2 flex-1 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
                >
                  <option value="">Duration</option>
                  <option value="Years">Years</option>
                  <option value="Months">Months</option>
                </select>
                <input
                  type="text"
                  name="supplyValue"
                  value={appData.supplyValue || ""}
                  onChange={handleChange}
                  placeholder="Value"
                  className="p-2 flex-1 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
                />
              </div>
            </div>
          </div>

          {/* Is Loan App */}
          <div className="w-full lg:w-12/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Is Loan App
              </label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center text-sm">
                  <input
                    type="radio"
                    name="isLoanApp"
                    value="Yes"
                    checked={appData.isLoanApp === "Yes"}
                    onChange={handleChange}
                    className="mr-2 text-[#7c0000] focus:ring-[#7c0000]"
                  />
                  Yes - 75% Loan Scheme
                </label>
                <label className="flex items-center text-sm">
                  <input
                    type="radio"
                    name="isLoanApp"
                    value="No"
                    checked={appData.isLoanApp === "No"}
                    onChange={handleChange}
                    className="mr-2 text-[#7c0000] focus:ring-[#7c0000]"
                  />
                  No
                </label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AppDetails;