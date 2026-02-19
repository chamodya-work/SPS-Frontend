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
//         <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
//           <h2 className="text-blueGray-700 text-sm font-bold text-center">
//             Schedule
//           </h2>
//           <form onSubmit={handleSubmit}>
//             <div className="flex flex-wrap mt-2">
//               <div className="w-full lg:w-6/12 px-4">
//                 <div className="relative w-full mb-3">
//                   <label
//                     className="block text-blueGray-600 text-sm mb-2"
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
//               <div className="w-full lg:w-6/12 px-4">
//                 <div className="relative w-full mb-3">
//                   <label
//                     className="block text-blueGray-600 text-sm mb-2"
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
//               <div className="w-full lg:w-6/12 px-4">
//                 <div className="relative w-full mb-3">
//                   <label
//                     className="block text-blueGray-600 text-sm mb-2"
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
//               <div className="w-full lg:w-6/12 px-4">
//                 <div className="relative w-full mb-3">
//                   <label
//                     className="block text-blueGray-600 text-sm mb-2"
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
//               <div className="w-full lg:w-6/12 px-4">
//                 <div className="relative w-full mb-3">
//                   <label
//                     className="block text-blueGray-600 text-sm mb-2"
//                     htmlFor="grid-password"
//                   >
//                     Date
//                   </label>
//                   <input
//                     type="date"
//                     name="selecteddate"
//                     placeholder="DD/MM/YYYY"
//                     className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                   />
//                 </div>
//               </div>
//               <div className="w-full lg:w-6/12 px-4">
//                 <div className="relative w-full mb-3">
//                   <label
//                     className="block text-blueGray-600 text-sm mb-2"
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
//             <div className="px-12 flex justify-center items-center mt-2 mb-4">
//               <div>
//                 <button className="bg-emerald-400 text-white active:bg-emerald-600 text-sm px-6 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
//                   {isModify ? "Update" : "Add"}
//                 </button>
//                 {onCancel && (
//                   <button
//                     type="button"
//                     onClick={onCancel}
//                     className="bg-gray-400 text-white active:bg-gray-600 text-sm px-6 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
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
    <div className="w-full bg-white rounded-lg border p-4">
      <div className="text-center mb-3">
        <h3 className="text-md font-bold text-gray-800">Schedule</h3>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap">
          {/* Cost Center */}
          <div className="w-full lg:w-6/12 px-2">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-1">
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
          <div className="w-full lg:w-6/12 px-2">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-1">
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
          <div className="w-full lg:w-6/12 px-2">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-1">
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
          <div className="w-full lg:w-6/12 px-2">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-1">
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
          <div className="w-full lg:w-6/12 px-2">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-1">
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
          <div className="w-full lg:w-6/12 px-2">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-1">
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
        <div className="flex justify-center space-x-3 mt-4">
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
              className="bg-gray-500 text-white text-sm px-4 py-2 rounded shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
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
