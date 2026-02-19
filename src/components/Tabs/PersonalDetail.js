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


import React, { useState, useEffect } from "react";

const PersonalDetails = ({ onInputChange, data }) => {
  const [personalData, setPersonalData] = useState({
    idType: "",
    idNo: "",
    fname: "",
    lname: "",
    streetAddress: "",
    suburb: "",
    city: "",
    postalCode: "",
    telephoneNo: "",
    mobileNo: "",
    email: "",
    preferredLanguage: "",
    cebEmployee: "",
  });

  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    if (data) {
      setPersonalData((prev) => ({ ...prev, ...data }));
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...personalData, [name]: value };
    setPersonalData(newData);
    onInputChange(newData);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!personalData.idNo) {
      alert("Please enter an ID number");
      return;
    }

    try {
      const response = await fetch(
        `${baseUrl}/api/v1/search?nicno=${personalData.idNo}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa("user:admin123"),
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      const updatedData = {
        ...personalData,
        fname: data.fname || "",
        lname: data.lname || "",
        streetAddress: data.streetAddress || "",
        suburb: data.suburb || "",
        city: data.city || "",
        postalCode: data.postalCode || "",
        telephoneNo: data.telephoneNo || "",
        mobileNo: data.mobileNo || "",
        email: data.email || "",
      };

      setPersonalData(updatedData);
      onInputChange(updatedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to retrieve details. Please check the ID number.");
    }
  };

  return (
    <div className="flex-auto">
      <form>
        <div className="flex flex-wrap">
          {/* ID Type */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                ID Type
              </label>
              <select
                name="idType"
                value={personalData.idType || ""}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              >
                <option value="">Select ID Type</option>
                <option value="NIC">NIC</option>
                <option value="Passport">Passport</option>
                <option value="Driving License">Driving License</option>
              </select>
            </div>
          </div>

          {/* ID No with Search */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                ID No
              </label>
              <div className="flex">
                <input
                  type="text"
                  name="idNo"
                  value={personalData.idNo || ""}
                  onChange={handleChange}
                  placeholder="Enter ID Number"
                  className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
                />
                <button
                  onClick={handleSearch}
                  className="ml-2 bg-[#7c0000] text-white text-sm px-4 py-2 rounded shadow hover:bg-[#a00000] focus:outline-none focus:ring-2 focus:ring-[#7c0000] focus:ring-opacity-50"
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* First Name */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                First Name (Initials)
              </label>
              <input
                type="text"
                name="fname"
                value={personalData.fname || ""}
                onChange={handleChange}
                placeholder="First Name"
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>

          {/* Last Name */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lname"
                value={personalData.lname || ""}
                onChange={handleChange}
                placeholder="Last Name"
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>

          {/* Street Address */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Street Address
              </label>
              <input
                type="text"
                name="streetAddress"
                value={personalData.streetAddress || ""}
                onChange={handleChange}
                placeholder="Street Address"
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>

          {/* Suburb */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Suburb
              </label>
              <input
                type="text"
                name="suburb"
                value={personalData.suburb || ""}
                onChange={handleChange}
                placeholder="Suburb"
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>

          {/* City */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={personalData.city || ""}
                onChange={handleChange}
                placeholder="City"
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>

          {/* Postal Code */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Postal Code
              </label>
              <input
                type="text"
                name="postalCode"
                value={personalData.postalCode || ""}
                onChange={handleChange}
                placeholder="Postal Code"
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>

          {/* Telephone No */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Telephone No
              </label>
              <input
                type="text"
                name="telephoneNo"
                value={personalData.telephoneNo || ""}
                onChange={handleChange}
                placeholder="Telephone Number"
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>

          {/* Mobile No */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Mobile No
              </label>
              <input
                type="text"
                name="mobileNo"
                value={personalData.mobileNo || ""}
                onChange={handleChange}
                placeholder="Mobile Number"
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>

          {/* Email */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={personalData.email || ""}
                onChange={handleChange}
                placeholder="Email"
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>

          {/* Preferred Language */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Preferred Language
              </label>
              <select
                name="preferredLanguage"
                value={personalData.preferredLanguage || ""}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              >
                <option value="">Select Language</option>
                <option value="English">English</option>
                <option value="Sinhala">Sinhala</option>
                <option value="Tamil">Tamil</option>
              </select>
            </div>
          </div>

          {/* CEB Employee */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                CEB Employee
              </label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center text-sm">
                  <input
                    type="radio"
                    name="cebEmployee"
                    value="Yes"
                    checked={personalData.cebEmployee === "Yes"}
                    onChange={handleChange}
                    className="mr-2 text-[#7c0000] focus:ring-[#7c0000]"
                  />
                  Yes
                </label>
                <label className="flex items-center text-sm">
                  <input
                    type="radio"
                    name="cebEmployee"
                    value="No"
                    checked={personalData.cebEmployee === "No"}
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

export default PersonalDetails;