// import react from "react";

// const generalinfo = ({
//   formData,
//   handleChange,
//   editMode,
//   onSearch,
//   loadingSearch,
// }) => {
//   return (
//     <form>
//       <div className="flex flex-wrap">
//         {/* application reference no */}
//         <div className="w-full lg:w-6/12 px-4 py-1">
//           <label className="text-gray-600 text-sm mb-2">
//             application reference no
//           </label>
//           <div className="flex space-x-2 mt-2">
//             <input
//               type="text"
//               name="appNo"
//               value={formData.appNo || ""}
//               onChange={handleChange}
//               className="border-0 px-3 h-0.5 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
//             />
//             {editMode && (
//               <button
//                 type="button"
//                 onClick={onSearch}
//                 disabled={loadingSearch}
//                 style={{ backgroundColor: "#7c0000" }}
//                 className="text-white px-4 py-2 rounded text-sm ml-2 shadow hover:shadow-md transition duration-150 disabled:opacity-50"
//               >
//                 {loadingSearch ? "loading..." : "search"}
//               </button>
//             )}
//           </div>
//         </div>

//         {/* name */}
//         <div className="w-full lg:w-6/12 px-4 py-2">
//           <label className="block text-blueGray-600 text-sm mb-2">name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name || ""}
//             onChange={handleChange}
//             className="border-0 px-3 h-0.5 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
//           />
//         </div>

//         {/* address */}
//         <div className="w-full lg:w-6/12 px-4 py-2">
//           <label className="block text-blueGray-600 text-sm mb-2">
//             address
//           </label>
//           <input
//             type="text"
//             name="address"
//             value={formData.address || ""}
//             onChange={handleChange}
//             className="border-0 px-3 h-0.5 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
//           />
//         </div>

//         {/* job description */}
//         <div className="w-full lg:w-6/12 px-4 py-2">
//           <label className="block text-blueGray-600 text-sm mb-2">
//             job description
//           </label>
//           <input
//             type="text"
//             name="jobDescription"
//             value={formData.jobDescription || ""}
//             onChange={handleChange}
//             className="border-0 px-3 h-0.5 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
//           />
//         </div>

//         {/* no of beneficiaries */}
//         <div className="w-full lg:w-6/12 px-4 py-2">
//           <label className="block text-blueGray-600 text-sm mb-2">
//             no of beneficiaries
//           </label>
//           <input
//             type="text"
//             name="beneficiaries"
//             value={formData.beneficiaries || ""}
//             onChange={handleChange}
//             className="border-0 px-3 h-0.5 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
//           />
//         </div>

//         {/* power to supply */}
//         <div className="w-full lg:w-6/12 px-4 py-2">
//           <label className="block text-blueGray-600 text-sm mb-2">
//             power to supply
//           </label>
//           <input
//             type="text"
//             name="powerSupply"
//             value={formData.powerSupply || ""}
//             onChange={handleChange}
//             className="border-0 px-3 h-0.5 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
//           />
//         </div>

//         {/* rejected reason */}
//         <div className="w-full lg:w-6/12 px-4 py-2">
//           <label className="block text-blueGray-600 text-sm mb-2">
//             rejected reason
//           </label>
//           <input
//             type="text"
//             name="rejectedReason"
//             value={formData.rejectedReason || ""}
//             onChange={handleChange}
//             className="border-0 px-3 h-0.5 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
//           />
//         </div>
//       </div>
//     </form>
//   );
// };

// export default generalinfo;


import React from "react";

const GeneralInfo = ({
  formData,
  handleChange,
  editMode,
  onSearch,
  loadingSearch,
}) => {
  return (
    <div className="flex-auto">
      <form>
        <div className="flex flex-wrap">
          {/* Application reference no */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Application Reference No
              </label>
              <div className="flex">
                <input
                  type="text"
                  name="appNo"
                  value={formData.appNo || ""}
                  onChange={handleChange}
                  placeholder="Enter Reference No"
                  className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
                />
                {editMode && (
                  <button
                    type="button"
                    onClick={onSearch}
                    disabled={loadingSearch}
                    className="ml-2 bg-[#7c0000] text-white text-sm px-4 py-2 rounded shadow hover:bg-[#a00000] focus:outline-none focus:ring-2 focus:ring-[#7c0000] focus:ring-opacity-50 disabled:opacity-50 min-w-[80px]"
                  >
                    {loadingSearch ? "..." : "Search"}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Name */}
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

          {/* Address */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
                placeholder="Enter Address"
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>

          {/* Job Description */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Job Description
              </label>
              <input
                type="text"
                name="jobDescription"
                value={formData.jobDescription || ""}
                onChange={handleChange}
                placeholder="Enter Job Description"
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>

          {/* No of Beneficiaries */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                No of Beneficiaries
              </label>
              <input
                type="text"
                name="beneficiaries"
                value={formData.beneficiaries || ""}
                onChange={handleChange}
                placeholder="Enter Number"
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>

          {/* Power to Supply */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Power to Supply
              </label>
              <input
                type="text"
                name="powerSupply"
                value={formData.powerSupply || ""}
                onChange={handleChange}
                placeholder="Enter Power Supply"
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>

          {/* Rejected Reason */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Rejected Reason
              </label>
              <input
                type="text"
                name="rejectedReason"
                value={formData.rejectedReason || ""}
                onChange={handleChange}
                placeholder="Enter Rejected Reason"
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GeneralInfo;