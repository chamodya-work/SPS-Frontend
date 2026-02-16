// import { useState } from "react";
// import FileUpload from "./FileUpload";

// const nicRegex = /^(\d{9}[Vv]|\d{12})$/; // Validates both old and new NIC formats

// const ApplicantInfo = ({
//   applicant = {},
//   onInputChange,
//   onSearch,
//   handleSearch,
//   isModify,
//   data = {},
//   appData = {},
//   setAppData = () => {},
// }) => {
//   //const [appData, setAppData] = useState({});
//   const [nicError, setNicError] = useState(""); // State to handle error messages
//   const [loading, setLoading] = useState(false); // To show loading state during API call

//   // Now safely access applicant.idNo with a fallback
//   const idNo = applicant?.idNo || "";

//   const handleChange = (e) => {
//     console.log("Handling change for:", e.target.name);
//     const { name, value } = e.target;
//     // const newData = { ...appData, [name]: value };
//     //setAppData(newData); // Ensure this is a valid function
//     onInputChange({ [name]: value });

//     // Validate NIC number
//     if (name === "idNo") {
//       if (!nicRegex.test(value)) {
//         setNicError("Invalid NIC number. Use 9 digits with v or 12 digits.");
//       } else {
//         setNicError(""); // Clear error if valid
//       }
//     }

//     // Make sure appData is defined before spreading it
//     const newData = { ...(appData || {}), [name]: value };
//     console.log("New Data:", newData);

//     // Only call setAppData if it's a function
//     if (typeof setAppData === "function") {
//       setAppData(newData);
//     }

//     // Call onInputChange with the updated field
//     if (typeof onInputChange === "function") {
//       onInputChange({ [name]: value });
//     }
//   };

//   return (
//     <div className="flex-auto px-4 lg:px-10 py-10 pt-2">
//       <form>
//         {/* <div className="block text-blueGray-600 text-m font-bold mb-3 ml-3">Applicant Information</div> */}

//         {/* //new */}
//         <div className="flex flex-wrap ">
//           <div className="flex"></div>
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label className="block text-blueGray-600 text-sm mb-2">
//                 ID Type
//               </label>
//               <div className="flex gap-4 mt-2">
//                 <label className="text-sm mr-4">
//                   <input
//                     type="radio"
//                     name="idType"
//                     value="NIC"
//                     defaultChecked
//                     //checked={appData.idType === "NIC"}
//                     className="mr-1"
//                     onChange={handleChange}
//                   />
//                   NIC
//                 </label>
//                 {/* <label className="mr-3">
//                   <input type="radio" name="idType" value="PAS"
//                     //checked={appData.idType === "PAS"}
//                     onChange={handleChange}
//                     className="form-radio accent-blue-600" />
//                   Passport
//                 </label> */}
//                 <label className="text-sm">
//                   <input
//                     type="radio"
//                     name="idType"
//                     value="BRN"
//                     // checked={appData.idType === "BRN"}
//                     className="mr-1"
//                     onChange={handleChange}
//                   />
//                   Business Registration Number
//                 </label>
//               </div>
//             </div>
//           </div>

//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                 ID Number
//               </label>

//               <div className="flex">
//                 <input
//                   type="text"
//                   name="idNo"
//                   value={appData && appData.idNo}
//                   onChange={handleChange}
//                   className={`border-0 px-3 h-0.5  placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
//                     nicError ? "border-red-500" : ""
//                   }`}
//                   placeholder="NIC No"
//                 />
//                 {/* 
// //{isModify && ( */}
//                 <button
//                   className="bg-lightBlue-500 text-white text-sm px-4 rounded ml-2"
//                   style={{
//                     backgroundColor: "#7c0000",
//                   }}
//                   type="button"
//                   onClick={handleSearch}
//                   disabled={loading}
//                 >
//                   {loading ? "Searching..." : "Search"}
//                 </button>
//                 {/* //)} */}
//               </div>
//               {nicError && (
//                 <p className="text-red-500 text-xs mt-1">{nicError}</p>
//               )}
//             </div>
//           </div>

//           {/* raw 2  with file uplaod and ID no*/}

//           {/* <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
//                 htmlFor="grid-password"
//               >
//                 ID NO
//               </label>
//               <input
//                 type="text"
//                 name="idNo"
//                 value={appData.idNo}
//                 onChange={handleChange}
//                 className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                 defaultValue="ID Nomber"
//               />
//             </div>
//           </div>
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//             <div className="w-full lg:w-24/12 px-4">
            
//             <FileUpload />
//           </div>
//             </div>
//           </div> */}
//           {/* end */}

//           {/* personalCorporate */}

//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                 First Name (Initials)/Company Name/Requested By
//               </label>
//               <input
//                 type="text"
//                 name="firstName"
//                 value={appData?.firstName || ""}
//                 onChange={handleChange}
//                 className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                 placeholder="Enter First Name"
//               />
//             </div>
//           </div>
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                 Last Name/Company Type
//               </label>
//               <input
//                 type="text"
//                 name="lastName"
//                 value={appData.lastName}
//                 onChange={handleChange}
//                 className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                 placeholder="Enter Last Name"
//               />
//             </div>
//           </div>

//           <div className="w-full lg:w-12/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                 Full Name/Requested By/Cost Center
//               </label>
//               <input
//                 type="text"
//                 name="fullName"
//                 value={appData.fullName}
//                 onChange={handleChange}
//                 className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                 placeholder="Enter Full Name"
//               />
//             </div>
//           </div>

//           {/* personal/corporate */}
//           <div className="w-full lg:w-12/12 px-4">
//             <div className="relative w-full mb-3">
//               <label className="block  text-blueGray-600 text-sm mb-2">
//                 Personal/Corporate
//               </label>
//               <select
//                 name="personalCorporate"
//                 // value={appData.personalCorporate}
//                 //value={appData.personalCorporate || ""}
//                 onChange={handleChange}
//                 className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//               >
//                 <option value="Per">Personal</option>
//                 <option value="Cop">Corporate</option>
//               </select>
//             </div>
//           </div>
//           {/* raw 2 */}

//           {/* raw 2 */}

//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label className="block text-blueGray-600 text-sm mb-2">
//                 CEB Employee
//               </label>
//               <div className="flex space-x-4 ">
//                 <label className="text-sm mr-4">
//                   <input
//                     type="radio"
//                     name="cebEmployee"
//                     value="y"
//                     className="mr-1"
//                     defaultChecked
//                     //  checked={appData.cebEmployee === "yes"}
//                     onChange={handleChange}
//                   />{" "}
//                   Yes
//                 </label>
//                 <label className="text-sm">
//                   <input
//                     type="radio"
//                     name="cebEmployee"
//                     value="n"
//                     className="mr-1"
//                     //   checked={appData.cebEmployee === "no"}
//                     onChange={handleChange}
//                   />{" "}
//                   No
//                 </label>
//               </div>
//             </div>
//           </div>
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label className="block text-blueGray-600 text-sm mb-2">
//                 Preferred Language
//               </label>
//               <div className="flex space-x-4">
//                 <label className="text-sm mr-4">
//                   <input
//                     type="radio"
//                     name="preferredLanguage"
//                     value="SN"
//                     className="mr-1"
//                     defaultChecked
//                     //   checked={appData.preferredLanguage === "SN"}
//                     onChange={handleChange}
//                   />{" "}
//                   Sinhala
//                 </label>
//                 <label className="text-sm">
//                   <input
//                     type="radio"
//                     name="preferredLanguage"
//                     value="EN"
//                     className="mr-1"
//                     //  checked={appData.preferredLanguage === "EN"}
//                     onChange={handleChange}
//                   />{" "}
//                   English
//                 </label>
//               </div>
//             </div>
//           </div>
//           {/* end */}
//         </div>

//         {/* test */}
//       </form>
//     </div>
//   );
// };

// export default ApplicantInfo;


import { useState } from "react";
import FileUpload from "./FileUpload";

const nicRegex = /^(\d{9}[Vv]|\d{12})$/; // Validates both old and new NIC formats

const ApplicantInfo = ({
  onInputChange,
  handleSearch,
  isModify,
  data = {},
}) => {
  const [nicError, setNicError] = useState("");
  const [loading, setLoading] = useState(false);

  // const idNo = applicant?.idNo || "";

  // const handleChange = (e) => {
  //   console.log("Handling change for:", e.target.name);
  //   const { name, value } = e.target;
  //   onInputChange({ [name]: value });

  //   if (name === "idNo") {
  //     if (!nicRegex.test(value)) {
  //       setNicError("Invalid NIC number. Use 9 digits with v or 12 digits.");
  //     } else {
  //       setNicError("");
  //     }
  //   }

  //   const newData = { ...(appData || {}), [name]: value };
  //   if (typeof setAppData === "function") {
  //     setAppData(newData);
  //   }
  //   if (typeof onInputChange === "function") {
  //     onInputChange({ [name]: value });
  //   }
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    onInputChange({ [name]: value });
  
    if (name === "idNo") {
      if (!nicRegex.test(value)) {
        setNicError("Invalid NIC number. Use 9 digits with v or 12 digits.");
      } else {
        setNicError("");
      }
    }
  };
  

  return (
    <div className="flex-auto px-4 lg:px-10 py-10 pt-2">
      <form>
        <div className="flex flex-wrap">
          {/* ID Type */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                ID Type
              </label>
              <div className="flex gap-4 mt-2">
                <label className="text-sm mr-4">
                  <input
                    type="radio"
                    name="idType"
                    value="NIC"
                    defaultChecked
                    className="mr-1"
                    onChange={handleChange}
                  />
                  NIC
                </label>
                <label className="text-sm">
                  <input
                    type="radio"
                    name="idType"
                    value="BRN"
                    className="mr-1"
                    onChange={handleChange}
                  />
                  Business Registration Number
                </label>
              </div>
            </div>
          </div>

          {/* ID Number with Search */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                ID Number
              </label>
              <div className="flex">
                <input
                  type="text"
                  name="idNo"
                  value={data?.idNo || ""}
                  onChange={handleChange}
                  className={`p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150 ${
                    nicError ? "border-red-500" : ""
                  }`}
                  placeholder="NIC No"
                />
                <button
                  type="button"
                  onClick={handleSearch}
                  disabled={loading}
                  className="bg-[#7c0000] text-white text-sm px-4 rounded ml-2 hover:bg-[#a00000] focus:outline-none focus:ring-2 focus:ring-[#7c0000] focus:ring-opacity-50 disabled:opacity-50"
                >
                  {loading ? "Searching..." : "Search"}
                </button>
              </div>
              {nicError && (
                <p className="text-red-500 text-xs mt-1">{nicError}</p>
              )}
            </div>
          </div>

          {/* First Name / Company Name */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                First Name (Initials)/Company Name/Requested By
              </label>
              <input
                type="text"
                name="firstName"
                value={data?.firstName || ""}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
                placeholder="Enter First Name"
              />
            </div>
          </div>

          {/* Last Name / Company Type */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Last Name/Company Type
              </label>
              <input
                type="text"
                name="lastName"
                value={data?.lastName || ""}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
                placeholder="Enter Last Name"
              />
            </div>
          </div>

          {/* Full Name / Requested By / Cost Center */}
          <div className="w-full lg:w-12/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Full Name/Requested By/Cost Center
              </label>
              <input
                type="text"
                name="fullName"
                value={data?.fullName || ""}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
                placeholder="Enter Full Name"
              />
            </div>
          </div>

          {/* Personal/Corporate */}
          <div className="w-full lg:w-12/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Personal/Corporate
              </label>
              <select
                name="personalCorporate"
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              >
                <option value="Per">Personal</option>
                <option value="Cop">Corporate</option>
              </select>
            </div>
          </div>

          {/* CEB Employee */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                CEB Employee
              </label>
              <div className="flex space-x-4">
                <label className="text-sm mr-4">
                  <input
                    type="radio"
                    name="cebEmployee"
                    value="y"
                    className="mr-1"
                    defaultChecked
                    onChange={handleChange}
                  />{" "}
                  Yes
                </label>
                <label className="text-sm">
                  <input
                    type="radio"
                    name="cebEmployee"
                    value="n"
                    className="mr-1"
                    onChange={handleChange}
                  />{" "}
                  No
                </label>
              </div>
            </div>
          </div>

          {/* Preferred Language */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Preferred Language
              </label>
              <div className="flex space-x-4">
                <label className="text-sm mr-4">
                  <input
                    type="radio"
                    name="preferredLanguage"
                    value="SN"
                    className="mr-1"
                    defaultChecked
                    onChange={handleChange}
                  />{" "}
                  Sinhala
                </label>
                <label className="text-sm">
                  <input
                    type="radio"
                    name="preferredLanguage"
                    value="EN"
                    className="mr-1"
                    onChange={handleChange}
                  />{" "}
                  English
                </label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ApplicantInfo;