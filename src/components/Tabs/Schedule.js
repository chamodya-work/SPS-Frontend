// import React, { useState } from "react";

// function Schedule({ isModify, initialData = {}, onSubmit, onCancel }) {
//   const [formData, setFormData] = useState({
//     costCenter: initialData.costCenter || "",
//     applicationNumber: initialData.applicationNumber || "",
//     applicationType: initialData.applicationType || "",
//     allocatedTo: initialData.allocatedTo || "",
//     selecteddate: initialData.selecteddate || "",
//     description: initialData.description || "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (onSubmit) {
//       onSubmit(formData);
//     }
//   };

//   return (
//     <>
//       <div className="flex flex-col justify-center bg-gray-100">
//         <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
//           <h2 className="text-sm font-bold text-center text-blueGray-700">
//             Schedule
//           </h2>
//           <form onSubmit={handleSubmit}>
//             <div className="flex flex-wrap mt-2">
//               <div className="w-full px-4 lg:w-6/12">
//                 <div className="relative w-full mb-3">
//                   <label
//                     className="block mb-2 text-sm text-blueGray-600"
//                     htmlFor="grid-password"
//                   >
//                     Cost Center
//                   </label>
//                   <input
//                     type="text"
//                     id="costCenter"
//                     name="costCenter"
//                     value={formData.costCenter}
//                     onChange={handleInputChange}
//                     className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                   />
//                 </div>
//               </div>
//               <div className="w-full px-4 lg:w-6/12">
//                 <div className="relative w-full mb-3">
//                   <label
//                     className="block mb-2 text-sm text-blueGray-600"
//                     htmlFor="grid-password"
//                   >
//                     Application Number
//                   </label>
//                   <input
//                     type="text"
//                     id="applicationNumber"
//                     name="applicationNumber"
//                     value={formData.applicationNumber}
//                     onChange={handleInputChange}
//                     className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="flex flex-wrap">
//               <div className="w-full px-4 lg:w-6/12">
//                 <div className="relative w-full mb-3">
//                   <label
//                     className="block mb-2 text-sm text-blueGray-600"
//                     htmlFor="grid-password"
//                   >
//                     Application Type
//                   </label>
//                   <input
//                     type="text"
//                     className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                   />
//                 </div>
//               </div>
//               <div className="w-full px-4 lg:w-6/12">
//                 <div className="relative w-full mb-3">
//                   <label
//                     className="block mb-2 text-sm text-blueGray-600"
//                     htmlFor="grid-password"
//                   >
//                     Allocated To
//                   </label>
//                   <input
//                     type="text"
//                     name="allocatedTo"
//                     className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="flex flex-wrap">
//               <div className="w-full px-4 lg:w-6/12">
//                 <div className="relative w-full mb-3">
//                   <label
//                     className="block mb-2 text-sm text-blueGray-600"
//                     htmlFor="grid-password"
//                   >
//                     Date
//                   </label>
//                   <input
//                     type="date"
//                     name="selecteddate"
//                     placeholder="DD/MM/YYYY"
//                     className="w-full px-3 py-2 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
//                   />
//                 </div>
//               </div>
//               <div className="w-full px-4 lg:w-6/12">
//                 <div className="relative w-full mb-3">
//                   <label
//                     className="block mb-2 text-sm text-blueGray-600"
//                     htmlFor="grid-password"
//                   >
//                     Description
//                   </label>
//                   <textarea
//                     rows="1"
//                     type="text"
//                     name="description"
//                     className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                   ></textarea>
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center justify-center px-12 mt-2 mb-4">
//               <div>
//                 <button className="px-6 py-2 mr-1 text-sm text-white transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-400 active:bg-emerald-600 hover:shadow-md focus:outline-none">
//                   {isModify ? "Update" : "Add"}
//                 </button>
//                 {onCancel && (
//                   <button
//                     type="button"
//                     onClick={onCancel}
//                     className="px-6 py-2 text-sm text-white transition-all duration-150 ease-linear bg-gray-400 rounded shadow outline-none active:bg-gray-600 hover:shadow-md focus:outline-none"
//                   >
//                     Cancel
//                   </button>
//                 )}
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Schedule;

import React, { useState } from "react";

function Schedule({ isModify = false, initialData = {}, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    costCenter: initialData.costCenter || "",
    applicationNumber: initialData.applicationNumber || "",
    applicationType: initialData.applicationType || "",
    allocatedTo: initialData.allocatedTo || "",
    selecteddate: initialData.selecteddate || "",
    description: initialData.description || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className="w-full p-4 bg-white border rounded-lg">
      <div className="mb-3 text-center">
        <h3 className="font-bold text-gray-800 text-md">Schedule</h3>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap">
          {/* Cost Center */}
          <div className="w-full px-2 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-1 text-sm text-gray-700">
                Cost Center
              </label>
              <input
                type="text"
                name="costCenter"
                value={formData.costCenter}
                onChange={handleInputChange}
                placeholder="Enter Cost Center"
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>

          {/* Application Number */}
          <div className="w-full px-2 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-1 text-sm text-gray-700">
                Application Number
              </label>
              <input
                type="text"
                name="applicationNumber"
                value={formData.applicationNumber}
                onChange={handleInputChange}
                placeholder="Enter Application No"
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>

          {/* Application Type */}
          <div className="w-full px-2 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-1 text-sm text-gray-700">
                Application Type
              </label>
              <select
                name="applicationType"
                value={formData.applicationType}
                onChange={handleInputChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              >
                <option value="">Select Type</option>
                <option value="New Connection">New Connection</option>
                <option value="Modification">Modification</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
          </div>

          {/* Allocated To */}
          <div className="w-full px-2 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-1 text-sm text-gray-700">
                Allocated To
              </label>
              <input
                type="text"
                name="allocatedTo"
                value={formData.allocatedTo}
                onChange={handleInputChange}
                placeholder="Enter Allocated To"
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>

          {/* Date */}
          <div className="w-full px-2 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-1 text-sm text-gray-700">
                Date
              </label>
              <input
                type="date"
                name="selecteddate"
                value={formData.selecteddate}
                onChange={handleInputChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>

          {/* Description */}
          <div className="w-full px-2 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-1 text-sm text-gray-700">
                Description
              </label>
              <textarea
                rows="2"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter Description"
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center mt-4 space-x-3">
          <button
            type="submit"
            className="bg-[#7c0000] text-white text-sm px-4 py-2 rounded shadow hover:bg-[#a00000] focus:outline-none focus:ring-2 focus:ring-[#7c0000] focus:ring-opacity-50"
          >
            {isModify ? "Update" : "Add"}
          </button>
          
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm text-white bg-gray-500 rounded shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Schedule;
