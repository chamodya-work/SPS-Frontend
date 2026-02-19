// import { useState, useEffect } from "react";

// const LocationalDetails = ({ onInputChange, data }) => {
//   const [locationalData, setLocationalData] = useState({
//     streetAddress: "",
//     suburb: "",
//     city: "",
//     postalCode: "",
//   });

//   useEffect(() => {
//       if (data) {
//         setLocationalData(data);
//       }
//     }, [data]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const newData = { ...locationalData, [name]: value };
//     setLocationalData(newData);
//     onInputChange(newData);
//   };

//   return (
//     <div className="flex-auto px-4 py-10 pt-2 lg:px-10">
//       <form>
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
//                 name="streetAddress"
//                 value={locationalData.streetAddress}
//                 onChange={handleChange}
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
//                 name="suburb"
//                 value={locationalData.suburb}
//                 onChange={handleChange}
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
//                 name="city"
//                 value={locationalData.city}
//                 onChange={handleChange}
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
//               <div className="flex">
//                 <input
//                   type="text"
//                   name="postalCode"
//                   value={locationalData.postalCode}
//                   onChange={handleChange}
//                   className="w-full h-10 px-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
//                 />
//                 <button className="px-4 py-2 ml-3 mr-1 text-sm text-white transition-all duration-150 ease-linear rounded shadow outline-none bg-lightBlue-500 active:bg-lightBlue-600 hover:shadow-md focus:outline-none" style={{ backgroundColor: "#7c0000" }}>
//                   Search
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="w-full px-4 lg:w-4/12">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block mb-2 text-sm text-blueGray-600"
//                 htmlFor="grid-password"
//               >
//                 District
//               </label>
//               <div className="flex ">
//                 <input
//                   type="text"
//                   className="w-full h-10 px-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
//                 />
//                 <select
//                   name="district"
//                   className="w-full h-10 ml-2 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
//                 >
//                   <option value="G">G</option>
//                   <option value="OTHER">OTHER</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//           <div className="w-full px-4 lg:w-4/12">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block mb-2 text-sm text-blueGray-600"
//                 htmlFor="grid-password"
//               >
//                 Devisional Sectrait
//               </label>
//               <input
//                 type="text"
//                 className="w-full h-10 px-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
//               />
//             </div>
//           </div>
//           <div className="w-full px-4 lg:w-4/12">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block mb-2 text-sm text-blueGray-600"
//                 htmlFor="grid-password"
//               >
//                 GS Division
//               </label>
//               <input
//                 type="text"
//                 className="w-full h-10 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow x-3 placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
//               />
//             </div>
//           </div>
//           <div className="w-full px-4 lg:w-4/12">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block mb-2 text-sm text-blueGray-600"
//                 htmlFor="grid-password"
//               >
//                 Electorate
//               </label>
//               <div className="flex ">
//                 <input
//                   type="text"
//                   className="w-full h-10 px-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
//                 />
//                 <select
//                   name="electorate"
//                   className="w-full h-10 ml-2 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
//                 >
//                   <option value="AN">AN</option>
//                   <option value="OTHER">OTHER</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//           <div className="w-full px-4 lg:w-4/12">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block mb-2 text-sm text-blueGray-600"
//                 htmlFor="grid-password"
//               >
//                 AGA Division
//               </label>
//               <input
//                 type="text"
//                 className="w-full h-10 px-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
//               />
//             </div>
//           </div>
//           <div className="w-full px-4 lg:w-4/12">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block mb-2 text-sm text-blueGray-600"
//                 htmlFor="grid-password"
//               >
//                 C S C
//               </label>
//               <div className="flex ">
//                 <input
//                   type="text"
//                   className="w-full h-10 px-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
//                 />
//                 <select
//                   name="csc"
//                   className="w-full h-10 ml-2 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
//                 >
//                   <option value="AB">AB</option>
//                   <option value="OTHER">OTHER</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//           <div className="w-full px-4 lg:w-4/12">
//             <div className="relative w-full mb-2">
//               <label
//                 className="block mb-1 text-sm text-blueGray-600"
//                 htmlFor="grid-password"
//               >
//                 Ownership
//               </label>
//               <div className="flex gap-4 mt-4">
//                 <label className="mr-4 text-sm">
//                   <input
//                     type="radio"
//                     name="ownership"
//                     defaultChecked
//                     value="owner"
//                   />{" "}
//                   Owner
//                 </label>
//                 <label className="mr-4 text-sm">
//                   <input type="radio" name="ownership" value="rent" /> Rent
//                 </label>
//                 <label className="text-sm">
//                   <input type="radio" name="ownership" value="tenant" /> Tenant
//                 </label>
//               </div>
//             </div>
//           </div>
//           <div className="w-full px-4 lg:w-4/12">
//             <div className="relative w-full mb-2">
//               <label
//                 className="block mb-1 text-sm text-blueGray-600"
//                 htmlFor="grid-password"
//               >
//                 Occupy / Owner Certified
//               </label>
//               <div className="flex gap-4 mt-4">
//                 <label className="mr-4 text-sm">
//                   <input
//                     type="radio"
//                     name="ownercertify"
//                     defaultChecked
//                     value="Yes"
//                   />{" "}
//                   Yes
//                 </label>
//                 <label className="text-sm">
//                   <input type="radio" name="ownercertify" value="No" /> No
//                 </label>
//               </div>
//             </div>
//           </div>
//           <div className="w-full px-4 lg:w-4/12">
//             <div className="relative w-full mb-2">
//               <label
//                 className="block mb-1 text-sm text-blueGray-600"
//                 htmlFor="grid-password"
//               >
//                 Is Government Place
//               </label>
//               <div className="flex gap-4 mt-4">
//                 <label className="mr-4 text-sm">
//                   <input
//                     type="radio"
//                     name="isgovern"
//                     defaultChecked
//                     value="Yes"
//                   />{" "}
//                   Yes
//                 </label>
//                 <label className="text-sm">
//                   <input type="radio" name="isgovern" value="No" /> No
//                 </label>
//               </div>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default LocationalDetails;


import { useState, useEffect } from "react";

const LocationalDetails = ({ onInputChange, data }) => {
  const [locationalData, setLocationalData] = useState({
    streetAddress: "",
    suburb: "",
    city: "",
    postalCode: "",
    district: "",
    districtCode: "",
    divisionalSecretariat: "",
    gsDivision: "",
    electorate: "",
    electorateCode: "",
    agaDivision: "",
    csc: "",
    cscCode: "",
    ownership: "owner",
    ownerCertified: "Yes",
    isGovernmentPlace: "No",
  });

  useEffect(() => {
    if (data) {
      setLocationalData((prev) => ({ ...prev, ...data }));
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === "radio" ? value : value;
    const newData = { ...locationalData, [name]: newValue };
    setLocationalData(newData);
    onInputChange(newData);
  };

  const handleSearchPostalCode = () => {
    // Implement postal code search logic here
    console.log("Searching for postal code:", locationalData.postalCode);
  };

  return (
    <div className="flex-auto">
      <form>
        <div className="flex flex-wrap">
          {/* Street Address */}
          <div className="w-full lg:w-3/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Street Address
              </label>
              <input
                type="text"
                name="streetAddress"
                value={locationalData.streetAddress || ""}
                onChange={handleChange}
                placeholder="Street Address"
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>

          {/* Suburb */}
          <div className="w-full lg:w-3/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Suburb
              </label>
              <input
                type="text"
                name="suburb"
                value={locationalData.suburb || ""}
                onChange={handleChange}
                placeholder="Suburb"
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>

          {/* City */}
          <div className="w-full lg:w-3/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={locationalData.city || ""}
                onChange={handleChange}
                placeholder="City"
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>

          {/* Postal Code with Search */}
          <div className="w-full lg:w-3/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Postal Code
              </label>
              <div className="flex">
                <input
                  type="text"
                  name="postalCode"
                  value={locationalData.postalCode || ""}
                  onChange={handleChange}
                  placeholder="Postal Code"
                  className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
                />
                <button
                  type="button"
                  onClick={handleSearchPostalCode}
                  className="ml-2 bg-[#7c0000] text-white text-sm px-4 py-2 rounded shadow hover:bg-[#a00000] focus:outline-none focus:ring-2 focus:ring-[#7c0000] focus:ring-opacity-50"
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* District with Code */}
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                District
              </label>
              <div className="flex">
                <input
                  type="text"
                  name="district"
                  value={locationalData.district || ""}
                  onChange={handleChange}
                  placeholder="District"
                  className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
                />
                <select
                  name="districtCode"
                  value={locationalData.districtCode || ""}
                  onChange={handleChange}
                  className="p-2 ml-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
                >
                  <option value="">Code</option>
                  <option value="G">G</option>
                  <option value="K">K</option>
                  <option value="M">M</option>
                </select>
              </div>
            </div>
          </div>

          {/* Divisional Secretariat */}
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Divisional Secretariat
              </label>
              <input
                type="text"
                name="divisionalSecretariat"
                value={locationalData.divisionalSecretariat || ""}
                onChange={handleChange}
                placeholder="Divisional Secretariat"
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>

          {/* GS Division */}
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                GS Division
              </label>
              <input
                type="text"
                name="gsDivision"
                value={locationalData.gsDivision || ""}
                onChange={handleChange}
                placeholder="GS Division"
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>

          {/* Electorate with Code */}
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Electorate
              </label>
              <div className="flex">
                <input
                  type="text"
                  name="electorate"
                  value={locationalData.electorate || ""}
                  onChange={handleChange}
                  placeholder="Electorate"
                  className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
                />
                <select
                  name="electorateCode"
                  value={locationalData.electorateCode || ""}
                  onChange={handleChange}
                  className="p-2 ml-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
                >
                  <option value="">Code</option>
                  <option value="AN">AN</option>
                  <option value="BN">BN</option>
                </select>
              </div>
            </div>
          </div>

          {/* AGA Division */}
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                AGA Division
              </label>
              <input
                type="text"
                name="agaDivision"
                value={locationalData.agaDivision || ""}
                onChange={handleChange}
                placeholder="AGA Division"
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>

          {/* CSC with Code */}
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                CSC
              </label>
              <div className="flex">
                <input
                  type="text"
                  name="csc"
                  value={locationalData.csc || ""}
                  onChange={handleChange}
                  placeholder="CSC"
                  className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
                />
                <select
                  name="cscCode"
                  value={locationalData.cscCode || ""}
                  onChange={handleChange}
                  className="p-2 ml-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
                >
                  <option value="">Code</option>
                  <option value="AB">AB</option>
                  <option value="CD">CD</option>
                </select>
              </div>
            </div>
          </div>

          {/* Ownership */}
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Ownership
              </label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center text-sm">
                  <input
                    type="radio"
                    name="ownership"
                    value="owner"
                    checked={locationalData.ownership === "owner"}
                    onChange={handleChange}
                    className="mr-2 text-[#7c0000] focus:ring-[#7c0000]"
                  />
                  Owner
                </label>
                <label className="flex items-center text-sm">
                  <input
                    type="radio"
                    name="ownership"
                    value="rent"
                    checked={locationalData.ownership === "rent"}
                    onChange={handleChange}
                    className="mr-2 text-[#7c0000] focus:ring-[#7c0000]"
                  />
                  Rent
                </label>
                <label className="flex items-center text-sm">
                  <input
                    type="radio"
                    name="ownership"
                    value="tenant"
                    checked={locationalData.ownership === "tenant"}
                    onChange={handleChange}
                    className="mr-2 text-[#7c0000] focus:ring-[#7c0000]"
                  />
                  Tenant
                </label>
              </div>
            </div>
          </div>

          {/* Owner Certified */}
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Owner Certified
              </label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center text-sm">
                  <input
                    type="radio"
                    name="ownerCertified"
                    value="Yes"
                    checked={locationalData.ownerCertified === "Yes"}
                    onChange={handleChange}
                    className="mr-2 text-[#7c0000] focus:ring-[#7c0000]"
                  />
                  Yes
                </label>
                <label className="flex items-center text-sm">
                  <input
                    type="radio"
                    name="ownerCertified"
                    value="No"
                    checked={locationalData.ownerCertified === "No"}
                    onChange={handleChange}
                    className="mr-2 text-[#7c0000] focus:ring-[#7c0000]"
                  />
                  No
                </label>
              </div>
            </div>
          </div>

          {/* Is Government Place */}
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Is Government Place
              </label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center text-sm">
                  <input
                    type="radio"
                    name="isGovernmentPlace"
                    value="Yes"
                    checked={locationalData.isGovernmentPlace === "Yes"}
                    onChange={handleChange}
                    className="mr-2 text-[#7c0000] focus:ring-[#7c0000]"
                  />
                  Yes
                </label>
                <label className="flex items-center text-sm">
                  <input
                    type="radio"
                    name="isGovernmentPlace"
                    value="No"
                    checked={locationalData.isGovernmentPlace === "No"}
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

export default LocationalDetails;