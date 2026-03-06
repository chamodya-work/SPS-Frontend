// import React, { useState, useEffect } from "react";

// const PersonalDetails = ({ onInputChange, data }) => {
//   const [personalData, setpersonalData] = useState({
//     idType: "",
//     idNo: "",
//     fname: "",
//     lname: "",
//   });

//   const baseUrl = process.env.REACT_APP_API_BASE_URL;

//   useEffect(() => {
//       if (data) {
//         setpersonalData(data);
//       }
//     }, [data]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const newData = { ...personalData, [name]: value };
//     setpersonalData(newData);
//     onInputChange(newData);
//   };

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (!personalData.idNo) {
//       alert("Please enter an ID number");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `${baseUrl}/api/v1/search?nicno=${personalData.idNo}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Basic " + btoa("user:admin123"),
//           },
//           credentials: "include",
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json(); // Parse JSON response properly

//       setpersonalData((prevData) => ({
//         ...prevData,
//         fname: data.fname || "",
//         lname: data.lname || "",
//       }));

//       // Call onInputChange with updated state
//       onInputChange({
//         ...personalData,
//         fname: data.fname || "",
//         lname: data.lname || "",
//       });
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       alert("Failed to retrieve details. Please check the ID number.");
//     }
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
//                 Id Type
//               </label>
//               <input
//                 type="text"
//                 name="idType"
//                 value={personalData.idType}
//                 onChange={handleChange}
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
//                 Id No
//               </label>
//               <div className="flex ">
//                 <input
//                   type="text"
//                   name="idNo"
//                   value={personalData.idNo}
//                   onChange={handleChange}
//                   className="w-full h-10 px-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
//                 />
//                 <button
//                   onClick={handleSearch}
//                   style={{backgroundColor:"#7c0000"}}
//                   className="px-4 py-2 ml-2 mr-1 text-sm text-white transition-all duration-150 ease-linear rounded shadow outline-none active:bg-lightBlue-600 hover:shadow-md focus:outline-none"
//                 >
//                   Search
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="w-full px-4 lg:w-6/12">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block mb-2 text-sm text-blueGray-600"
//                 htmlFor="grid-password"
//               >
//                 First Name (Initials)
//               </label>
//               <input
//                 type="text"
//                 disabled
//                 name="fname"
//                 value={personalData.fname}
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
//                 Last Name
//               </label>
//               <input
//                 type="text"
//                 disabled
//                 name="lname"
//                 value={personalData.lname}
//                 className="w-full h-10 px-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-wrap">
//           <div className="w-full px-4 lg:w-3/12">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block mb-2 text-sm text-blueGray-600"
//                 htmlFor="grid-password"
//               >
//                 Street Address
//               </label>
//               <input
//                 type="text"
//                 disabled
//                 className="w-full h-10 px-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
//               />
//             </div>
//           </div>
//           <div className="w-full px-4 lg:w-3/12">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block mb-2 text-sm text-blueGray-600"
//                 htmlFor="grid-password"
//               >
//                 Suburb
//               </label>
//               <input
//                 type="text"
//                 disabled
//                 className="w-full h-10 px-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
//               />
//             </div>
//           </div>
//           <div className="w-full px-4 lg:w-3/12">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block mb-2 text-sm text-blueGray-600"
//                 htmlFor="grid-password"
//               >
//                 City
//               </label>
//               <input
//                 type="text"
//                 disabled
//                 className="w-full h-10 px-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
//               />
//             </div>
//           </div>
//           <div className="w-full px-4 lg:w-3/12">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block mb-2 text-sm text-blueGray-600"
//                 htmlFor="grid-password"
//               >
//                 Postal Code
//               </label>
//               <input
//                 type="text"
//                 disabled
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
//                 Telephone No
//               </label>
//               <input
//                 type="text"
//                 disabled
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
//                 Mobile No
//               </label>
//               <input
//                 type="text"
//                 disabled
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
//                 Email
//               </label>
//               <input
//                 type="Email"
//                 disabled
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
//                 Preferred Language
//               </label>
//               <input
//                 type="text"
//                 disabled
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
//                 CEB Employee
//               </label>
//               <input
//                 type="text"
//                 disabled
//                 className="w-full h-10 px-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
//               />
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PersonalDetails;


// import React, { useState, useEffect } from "react";

// const PersonalDetails = ({ onInputChange, data }) => {
//   const [personalData, setPersonalData] = useState({
//     idType: "",
//     idNo: "",
//     fname: "",
//     lname: "",
//     streetAddress: "",
//     suburb: "",
//     city: "",
//     postalCode: "",
//     telephoneNo: "",
//     mobileNo: "",
//     email: "",
//     preferredLanguage: "",
//     cebEmployee: "",
//   });

//   const baseUrl = process.env.REACT_APP_API_BASE_URL;

//   useEffect(() => {
//     if (data) {
//       setPersonalData((prev) => ({ ...prev, ...data }));
//     }
//   }, [data]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const newData = { ...personalData, [name]: value };
//     setPersonalData(newData);
//     onInputChange(newData);
//   };

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (!personalData.idNo) {
//       alert("Please enter an ID number");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `${baseUrl}/api/v1/search?nicno=${personalData.idNo}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Basic " + btoa("user:admin123"),
//           },
//           credentials: "include",
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();

//       const updatedData = {
//         ...personalData,
//         fname: data.fname || "",
//         lname: data.lname || "",
//         streetAddress: data.streetAddress || "",
//         suburb: data.suburb || "",
//         city: data.city || "",
//         postalCode: data.postalCode || "",
//         telephoneNo: data.telephoneNo || "",
//         mobileNo: data.mobileNo || "",
//         email: data.email || "",
//       };

//       setPersonalData(updatedData);
//       onInputChange(updatedData);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       alert("Failed to retrieve details. Please check the ID number.");
//     }
//   };

//   return (
//     <div className="flex-auto">
//       <form>
//         <div className="flex flex-wrap">
//           {/* ID Type */}
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label className="block text-gray-700 text-sm mb-2">
//                 ID Type
//               </label>
//               <select
//                 name="idType"
//                 value={personalData.idType || ""}
//                 onChange={handleChange}
//                 className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
//               >
//                 <option value="">Select ID Type</option>
//                 <option value="NIC">NIC</option>
//                 <option value="Passport">Passport</option>
//                 <option value="Driving License">Driving License</option>
//               </select>
//             </div>
//           </div>

//           {/* ID No with Search */}
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label className="block text-gray-700 text-sm mb-2">
//                 ID No
//               </label>
//               <div className="flex">
//                 <input
//                   type="text"
//                   name="idNo"
//                   value={personalData.idNo || ""}
//                   onChange={handleChange}
//                   placeholder="Enter ID Number"
//                   className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
//                 />
//                 <button
//                   onClick={handleSearch}
//                   className="ml-2 bg-[#7c0000] text-white text-sm px-4 py-2 rounded shadow hover:bg-[#a00000] focus:outline-none focus:ring-2 focus:ring-[#7c0000] focus:ring-opacity-50"
//                 >
//                   Search
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* First Name */}
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label className="block text-gray-700 text-sm mb-2">
//                 First Name (Initials)
//               </label>
//               <input
//                 type="text"
//                 name="fname"
//                 value={personalData.fname || ""}
//                 onChange={handleChange}
//                 placeholder="First Name"
//                 className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
//               />
//             </div>
//           </div>

//           {/* Last Name */}
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label className="block text-gray-700 text-sm mb-2">
//                 Last Name
//               </label>
//               <input
//                 type="text"
//                 name="lname"
//                 value={personalData.lname || ""}
//                 onChange={handleChange}
//                 placeholder="Last Name"
//                 className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
//               />
//             </div>
//           </div>

//           {/* Street Address */}
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label className="block text-gray-700 text-sm mb-2">
//                 Street Address
//               </label>
//               <input
//                 type="text"
//                 name="streetAddress"
//                 value={personalData.streetAddress || ""}
//                 onChange={handleChange}
//                 placeholder="Street Address"
//                 className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
//               />
//             </div>
//           </div>

//           {/* Suburb */}
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label className="block text-gray-700 text-sm mb-2">
//                 Suburb
//               </label>
//               <input
//                 type="text"
//                 name="suburb"
//                 value={personalData.suburb || ""}
//                 onChange={handleChange}
//                 placeholder="Suburb"
//                 className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
//               />
//             </div>
//           </div>

//           {/* City */}
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label className="block text-gray-700 text-sm mb-2">
//                 City
//               </label>
//               <input
//                 type="text"
//                 name="city"
//                 value={personalData.city || ""}
//                 onChange={handleChange}
//                 placeholder="City"
//                 className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
//               />
//             </div>
//           </div>

//           {/* Postal Code */}
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label className="block text-gray-700 text-sm mb-2">
//                 Postal Code
//               </label>
//               <input
//                 type="text"
//                 name="postalCode"
//                 value={personalData.postalCode || ""}
//                 onChange={handleChange}
//                 placeholder="Postal Code"
//                 className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
//               />
//             </div>
//           </div>

//           {/* Telephone No */}
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label className="block text-gray-700 text-sm mb-2">
//                 Telephone No
//               </label>
//               <input
//                 type="text"
//                 name="telephoneNo"
//                 value={personalData.telephoneNo || ""}
//                 onChange={handleChange}
//                 placeholder="Telephone Number"
//                 className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
//               />
//             </div>
//           </div>

//           {/* Mobile No */}
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label className="block text-gray-700 text-sm mb-2">
//                 Mobile No
//               </label>
//               <input
//                 type="text"
//                 name="mobileNo"
//                 value={personalData.mobileNo || ""}
//                 onChange={handleChange}
//                 placeholder="Mobile Number"
//                 className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
//               />
//             </div>
//           </div>

//           {/* Email */}
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label className="block text-gray-700 text-sm mb-2">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={personalData.email || ""}
//                 onChange={handleChange}
//                 placeholder="Email"
//                 className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
//               />
//             </div>
//           </div>

//           {/* Preferred Language */}
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label className="block text-gray-700 text-sm mb-2">
//                 Preferred Language
//               </label>
//               <select
//                 name="preferredLanguage"
//                 value={personalData.preferredLanguage || ""}
//                 onChange={handleChange}
//                 className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
//               >
//                 <option value="">Select Language</option>
//                 <option value="English">English</option>
//                 <option value="Sinhala">Sinhala</option>
//                 <option value="Tamil">Tamil</option>
//               </select>
//             </div>
//           </div>

//           {/* CEB Employee */}
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label className="block text-gray-700 text-sm mb-2">
//                 CEB Employee
//               </label>
//               <div className="flex gap-4 mt-2">
//                 <label className="flex items-center text-sm">
//                   <input
//                     type="radio"
//                     name="cebEmployee"
//                     value="Yes"
//                     checked={personalData.cebEmployee === "Yes"}
//                     onChange={handleChange}
//                     className="mr-2 text-[#7c0000] focus:ring-[#7c0000]"
//                   />
//                   Yes
//                 </label>
//                 <label className="flex items-center text-sm">
//                   <input
//                     type="radio"
//                     name="cebEmployee"
//                     value="No"
//                     checked={personalData.cebEmployee === "No"}
//                     onChange={handleChange}
//                     className="mr-2 text-[#7c0000] focus:ring-[#7c0000]"
//                   />
//                   No
//                 </label>
//               </div>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PersonalDetails;


// import { useState } from "react";

// const PersonalDetails = ({ onInputChange, data, errors = {}, searchLoading, setSearchLoading }) => {
//   const [personalData, setPersonalData] = useState({
//     idType: "NIC",
//     idNo: "",
//     firstName: "",
//     lastName: "",
//     streetAddress: "",
//     suburb: "",
//     city: "",
//     postalCode: "",
//     telephoneNo: "",
//     mobileNo: "",
//     email: "",
//     preferredLanguage: "SN",
//     cebEmployee: "y",
//   });

//   const baseUrl = process.env.REACT_APP_API_BASE_URL;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const newData = { ...personalData, [name]: value };
//     setPersonalData(newData);
//     onInputChange(newData);
//   };

//   const handleSearch = async () => {
//     if (!personalData.idNo) {
//       alert("Please enter an ID number before searching.");
//       return;
//     }

//     setSearchLoading(true);
//     try {
//       const response = await fetch(`${baseUrl}/api/applicants/search?idNo=${personalData.idNo}`, {
//         method: "GET",
//         headers: {
//           Authorization: "Basic " + btoa("user:admin123"),
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) throw new Error("ID not found");
//       const fetchedData = await response.json();

//       const updatedData = {
//         ...personalData,
//         firstName: fetchedData.firstName || "",
//         lastName: fetchedData.lastName || "",
//         streetAddress: fetchedData.streetAddress || "",
//         suburb: fetchedData.suburb || "",
//         city: fetchedData.city || "",
//         postalCode: fetchedData.postalCode || "",
//         email: fetchedData.email || "",
//         telephoneNo: fetchedData.telephoneNo || "",
//         mobileNo: fetchedData.mobileNo || "",
//         preferredLanguage: fetchedData.preferredLanguage || "SN",
//         cebEmployee: fetchedData.cebEmployee || "y",
//       };

//       setPersonalData(updatedData);
//       onInputChange(updatedData);
//       alert("Data loaded successfully!");
//     } catch (error) {
//       alert(error.message);
//     } finally {
//       setSearchLoading(false);
//     }
//   };

//   return (
//     <div className="flex-auto px-4 lg:px-10 py-10 pt-2">
//       <form onSubmit={(e) => e.preventDefault()}>
//         <div className="flex flex-wrap">
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label className="block text-gray-700 text-sm mb-2">ID Type</label>
//               <select
//                 name="idType"
//                 value={personalData.idType || "NIC"}
//                 onChange={handleChange}
//                 className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
//               >
//                 <option value="NIC">NIC</option>
//                 <option value="BRN">BRN</option>
//               </select>
//             </div>
//           </div>

//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label className="block text-gray-700 text-sm mb-2">ID Number</label>
//               <div className="flex">
//                 <input
//                   type="text"
//                   name="idNo"
//                   value={personalData.idNo || ""}
//                   onChange={handleChange}
//                   className={`p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150 ${errors.idNo ? "border-red-500" : ""}`}
//                   placeholder="Enter ID Number"
//                 />
//                 <button
//                   type="button"
//                   onClick={handleSearch}
//                   disabled={searchLoading || !!errors.idNo}
//                   className="bg-[#7c0000] text-white text-sm px-4 rounded ml-2 hover:bg-[#a00000] focus:outline-none focus:ring-2 focus:ring-[#7c0000] focus:ring-opacity-50 disabled:opacity-50"
//                 >
//                   {searchLoading ? "Searching..." : "Search"}
//                 </button>
//               </div>
//               {errors.idNo && <p className="text-red-500 text-xs mt-1">{errors.idNo}</p>}
//             </div>
//           </div>

//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label className="block text-gray-700 text-sm mb-2">First Name</label>
//               <input
//                 type="text"
//                 name="firstName"
//                 value={personalData.firstName || ""}
//                 onChange={handleChange}
//                 className={`p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150 ${errors.firstName ? "border-red-500" : ""}`}
//                 placeholder="Enter First Name"
//               />
//               {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
//             </div>
//           </div>

//           // Add other fields similarly with errors

//         </div>
//       </form>
//     </div>
//   );
// };

// export default PersonalDetails;


// import React from "react";

// const PersonalDetails = ({
//   onInputChange,
//   data = {},
//   errors = {},
//   searchLoading,
//   handleSearch,
// }) => {
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     onInputChange({ [name]: value });
//   };

//   return (
//     <div className="flex-auto px-4 lg:px-10 py-10 pt-2">
//       <form onSubmit={(e) => e.preventDefault()}>
//         <div className="flex flex-wrap -mx-4">
//           {/* ID Type */}
//           <div className="w-full lg:w-6/12 px-4 mb-6">
//             <label className="block text-gray-700 text-sm mb-2">ID Type</label>
//             <select
//               name="idType"
//               value={data.idType || "NIC"}
//               onChange={handleChange}
//               className="p-2 w-full border border-gray-300 rounded text-sm focus:outline-none focus:border-[#7c0000]"
//             >
//               <option value="NIC">NIC</option>
//               <option value="BRN">Business Registration</option>
//               <option value="Passport">Passport</option>
//             </select>
//           </div>

//           {/* ID No + Search */}
//           <div className="w-full lg:w-6/12 px-4 mb-6">
//             <label className="block text-gray-700 text-sm mb-2">ID Number</label>
//             <div className="flex">
//               <input
//                 type="text"
//                 name="idNo"
//                 value={data.idNo || ""}
//                 onChange={handleChange}
//                 placeholder="Enter ID Number"
//                 className={`flex-1 p-2 border rounded-l text-sm focus:outline-none focus:border-[#7c0000] ${
//                   errors.idNo ? "border-red-500" : "border-gray-300"
//                 }`}
//               />
//               <button
//                 type="button"
//                 onClick={handleSearch}
//                 disabled={searchLoading || !data.idNo?.trim()}
//                 className="bg-[#7c0000] text-white px-5 rounded-r hover:bg-[#9a0000] disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {searchLoading ? "..." : "Search"}
//               </button>
//             </div>
//             {errors.idNo && <p className="text-red-500 text-xs mt-1">{errors.idNo}</p>}
//           </div>

//           {/* First Name */}
//           <div className="w-full lg:w-6/12 px-4 mb-6">
//             <label className="block text-gray-700 text-sm mb-2">First Name</label>
//             <input
//               type="text"
//               name="firstName"
//               value={data.firstName || ""}
//               onChange={handleChange}
//               className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] ${
//                 errors.firstName ? "border-red-500" : "border-gray-300"
//               }`}
//               placeholder="First Name"
//             />
//             {errors.firstName && (
//               <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
//             )}
//           </div>

//           {/* Last Name */}
//           <div className="w-full lg:w-6/12 px-4 mb-6">
//             <label className="block text-gray-700 text-sm mb-2">Last Name</label>
//             <input
//               type="text"
//               name="lastName"
//               value={data.lastName || ""}
//               onChange={handleChange}
//               className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] ${
//                 errors.lastName ? "border-red-500" : "border-gray-300"
//               }`}
//               placeholder="Last Name"
//             />
//             {errors.lastName && (
//               <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
//             )}
//           </div>

//           {/* Street Address */}
//           <div className="w-full lg:w-6/12 px-4 mb-6">
//             <label className="block text-gray-700 text-sm mb-2">Street Address</label>
//             <input
//               type="text"
//               name="streetAddress"
//               value={data.streetAddress || ""}
//               onChange={handleChange}
//               className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] ${
//                 errors.streetAddress ? "border-red-500" : "border-gray-300"
//               }`}
//               placeholder="Street Address"
//             />
//             {errors.streetAddress && (
//               <p className="text-red-500 text-xs mt-1">{errors.streetAddress}</p>
//             )}
//           </div>

//           {/* Suburb */}
//           <div className="w-full lg:w-6/12 px-4 mb-6">
//             <label className="block text-gray-700 text-sm mb-2">Suburb</label>
//             <input
//               type="text"
//               name="suburb"
//               value={data.suburb || ""}
//               onChange={handleChange}
//               className="p-2 w-full border border-gray-300 rounded text-sm focus:outline-none focus:border-[#7c0000]"
//               placeholder="Suburb"
//             />
//           </div>

//           {/* City */}
//           <div className="w-full lg:w-6/12 px-4 mb-6">
//             <label className="block text-gray-700 text-sm mb-2">City</label>
//             <input
//               type="text"
//               name="city"
//               value={data.city || ""}
//               onChange={handleChange}
//               className="p-2 w-full border border-gray-300 rounded text-sm focus:outline-none focus:border-[#7c0000]"
//               placeholder="City"
//             />
//           </div>

//           {/* Email */}
//           <div className="w-full lg:w-6/12 px-4 mb-6">
//             <label className="block text-gray-700 text-sm mb-2">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={data.email || ""}
//               onChange={handleChange}
//               className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] ${
//                 errors.email ? "border-red-500" : "border-gray-300"
//               }`}
//               placeholder="example@email.com"
//             />
//             {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
//           </div>

//           {/* Mobile No */}
//           <div className="w-full lg:w-6/12 px-4 mb-6">
//             <label className="block text-gray-700 text-sm mb-2">Mobile No</label>
//             <input
//               type="tel"
//               name="mobileNo"
//               value={data.mobileNo || ""}
//               onChange={handleChange}
//               className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] ${
//                 errors.mobileNo ? "border-red-500" : "border-gray-300"
//               }`}
//               placeholder="07xxxxxxxx"
//             />
//             {errors.mobileNo && (
//               <p className="text-red-500 text-xs mt-1">{errors.mobileNo}</p>
//             )}
//           </div>

//           {/* Preferred Language */}
//           <div className="w-full lg:w-6/12 px-4 mb-6">
//             <label className="block text-gray-700 text-sm mb-2">Preferred Language</label>
//             <select
//               name="preferredLanguage"
//               value={data.preferredLanguage || "SN"}
//               onChange={handleChange}
//               className="p-2 w-full border border-gray-300 rounded text-sm focus:outline-none focus:border-[#7c0000]"
//             >
//               <option value="SN">Sinhala</option>
//               <option value="EN">English</option>
//               <option value="TA">Tamil</option>
//             </select>
//           </div>

//           {/* CEB Employee */}
//           <div className="w-full px-4 mb-6">
//             <label className="block text-gray-700 text-sm mb-2">CEB Employee</label>
//             <div className="flex gap-6">
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   name="cebEmployee"
//                   value="y"
//                   checked={data.cebEmployee === "y"}
//                   onChange={handleChange}
//                   className="mr-2"
//                 />
//                 Yes
//               </label>
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   name="cebEmployee"
//                   value="n"
//                   checked={data.cebEmployee === "n"}
//                   onChange={handleChange}
//                   className="mr-2"
//                 />
//                 No
//               </label>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PersonalDetails;


import React from "react";

const PersonalDetails = ({
  onInputChange,
  data = {},
  errors = {},
  handleSearch,
  searchLoading,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onInputChange({ [name]: value });
  };

  return (
    <div className="flex-auto px-4 lg:px-10 py-10 pt-2">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-wrap -mx-4">
          {/* ID Type */}
          <div className="w-full lg:w-6/12 px-4 mb-6">
            <label className="block text-gray-700 text-sm mb-2">ID Type</label>
            <select
              name="idType"
              value={data.idType || ""}
              onChange={handleChange}
              className="p-2 w-full border border-gray-300 rounded text-sm focus:outline-none focus:border-[#7c0000]"
            >
              <option value="">Select ID Type</option>
              <option value="NIC">NIC</option>
              <option value="Passport">Passport</option>
              <option value="Driving License">Driving License</option>
            </select>
          </div>

          {/* ID No with Search */}
          <div className="w-full lg:w-6/12 px-4 mb-6">
            <label className="block text-gray-700 text-sm mb-2">ID No</label>
            <div className="flex">
              <input
                type="text"
                name="idNo"
                value={data.idNo || ""}
                onChange={handleChange}
                placeholder="Enter ID Number"
                className={`p-2 flex-1 border rounded text-sm focus:outline-none focus:border-[#7c0000] ${
                  errors.idNo ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={handleSearch}
                disabled={searchLoading}
                className="ml-2 bg-[#7c0000] text-white px-4 rounded hover:bg-[#a00000] disabled:opacity-50"
              >
                {searchLoading ? "Searching..." : "Search"}
              </button>
            </div>
            {errors.idNo && <p className="text-red-500 text-xs mt-1">{errors.idNo}</p>}
          </div>

          {/* First Name (Initials) */}
          <div className="w-full lg:w-6/12 px-4 mb-6">
            <label className="block text-gray-700 text-sm mb-2">First Name (Initials)</label>
            <input
              type="text"
              name="firstName"
              value={data.firstName || ""}
              onChange={handleChange}
              className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="First Name"
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div className="w-full lg:w-6/12 px-4 mb-6">
            <label className="block text-gray-700 text-sm mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={data.lastName || ""}
              onChange={handleChange}
              className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Last Name"
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>

          {/* Street Address */}
          <div className="w-full lg:w-6/12 px-4 mb-6">
            <label className="block text-gray-700 text-sm mb-2">Street Address</label>
            <input
              type="text"
              name="streetAddress"
              value={data.streetAddress || ""}
              onChange={handleChange}
              className="p-2 w-full border border-gray-300 rounded text-sm focus:outline-none focus:border-[#7c0000]"
              placeholder="Street Address"
            />
          </div>

          {/* Suburb */}
          <div className="w-full lg:w-6/12 px-4 mb-6">
            <label className="block text-gray-700 text-sm mb-2">Suburb</label>
            <input
              type="text"
              name="suburb"
              value={data.suburb || ""}
              onChange={handleChange}
              className="p-2 w-full border border-gray-300 rounded text-sm focus:outline-none focus:border-[#7c0000]"
              placeholder="Suburb"
            />
          </div>

          {/* City */}
          <div className="w-full lg:w-6/12 px-4 mb-6">
            <label className="block text-gray-700 text-sm mb-2">City</label>
            <input
              type="text"
              name="city"
              value={data.city || ""}
              onChange={handleChange}
              className="p-2 w-full border border-gray-300 rounded text-sm focus:outline-none focus:border-[#7c0000]"
              placeholder="City"
            />
          </div>

          {/* Postal Code */}
          <div className="w-full lg:w-6/12 px-4 mb-6">
            <label className="block text-gray-700 text-sm mb-2">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={data.postalCode || ""}
              onChange={handleChange}
              className="p-2 w-full border border-gray-300 rounded text-sm focus:outline-none focus:border-[#7c0000]"
              placeholder="Postal Code"
            />
          </div>

          {/* Telephone No */}
          <div className="w-full lg:w-6/12 px-4 mb-6">
            <label className="block text-gray-700 text-sm mb-2">Telephone No</label>
            <input
              type="text"
              name="telephoneNo"
              value={data.telephoneNo || ""}
              onChange={handleChange}
              className="p-2 w-full border border-gray-300 rounded text-sm focus:outline-none focus:border-[#7c0000]"
              placeholder="Telephone Number"
            />
          </div>

          {/* Mobile No */}
          <div className="w-full lg:w-6/12 px-4 mb-6">
            <label className="block text-gray-700 text-sm mb-2">Mobile No</label>
            <input
              type="text"
              name="mobileNo"
              value={data.mobileNo || ""}
              onChange={handleChange}
              className="p-2 w-full border border-gray-300 rounded text-sm focus:outline-none focus:border-[#7c0000]"
              placeholder="Mobile Number"
            />
          </div>

          {/* Email */}
          <div className="w-full lg:w-6/12 px-4 mb-6">
            <label className="block text-gray-700 text-sm mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={data.email || ""}
              onChange={handleChange}
              className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Preferred Language */}
          <div className="w-full lg:w-6/12 px-4 mb-6">
            <label className="block text-gray-700 text-sm mb-2">Preferred Language</label>
            <select
              name="preferredLanguage"
              value={data.preferredLanguage || ""}
              onChange={handleChange}
              className="p-2 w-full border border-gray-300 rounded text-sm focus:outline-none focus:border-[#7c0000]"
            >
              <option value="">Select Language</option>
              <option value="English">English</option>
              <option value="Sinhala">Sinhala</option>
              <option value="Tamil">Tamil</option>
            </select>
          </div>

          {/* CEB Employee */}
          <div className="w-full px-4 mb-6">
            <label className="block text-gray-700 text-sm mb-2">CEB Employee</label>
            <div className="flex" style={{ gap: '3rem' }}>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="cebEmployee"
                  value="y"
                  checked={data.cebEmployee === "y"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="cebEmployee"
                  value="n"
                  checked={data.cebEmployee === "n"}
                  onChange={handleChange}
                  className="mr-2"
                />
                No
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetails;