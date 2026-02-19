// import React, { useState } from "react";
// import { useDropzone } from "react-dropzone";
// import { FaCloudUploadAlt, FaTrash, FaCheck } from "react-icons/fa";

// const TechDetails = () => {
//   const [files, setFiles] = useState([]);
//   const [selectedDoc, setSelectedDoc] = useState("");

//   const { getRootProps, getInputProps } = useDropzone({
//     accept: "image/*,application/pdf",
//     maxSize: 1024 * 1024, // 1MB limit
//     onDrop: (acceptedFiles) => {
//       setFiles([...files, ...acceptedFiles]);
//     },
//   });

//   const removeFile = (name) => {
//     setFiles(files.filter((file) => file.name !== name));
//   };

//   return (
//     <div className="flex-auto px-4 pt-2 lg:px-10">
//       <form>
//         <div className="flex flex-wrap">
//           <div className="w-full px-4 lg:w-3/12">
//             <div className="relative w-full mb-2">
//               <label
//                 className="block mb-1 text-sm text-blueGray-600"
//                 htmlFor="grid-password"
//               >
//                 HT/LT Metering
//               </label>
//               <div className="flex gap-4 mt-4">
//                 <label className="mr-4 text-sm">
//                   <input
//                     type="radio"
//                     name="metering"
//                     defaultChecked
//                     value="HT"
//                   />{" "}
//                   HT
//                 </label>
//                 <label className="text-sm">
//                   <input type="radio" name="metering" value="LT" /> LT
//                 </label>
//               </div>
//             </div>
//           </div>
//           <div className="w-full px-4 lg:w-6/12">
//             <div className="relative w-full mb-2">
//               <label
//                 className="block mb-2 text-sm text-blueGray-600"
//                 htmlFor="grid-password"
//               >
//                 Does Premises already have electricity supply
//               </label>
//               <div className="flex gap-4 mt-4">
//                 <label className="mr-4 text-sm">
//                   <input
//                     type="radio"
//                     name="exixtelec"
//                     defaultChecked
//                     value="Yes"
//                   />{" "}
//                   Yes
//                 </label>
//                 <label className="text-sm">
//                   <input type="radio" name="existelec" value="No" /> No
//                 </label>
//               </div>
//             </div>
//           </div>
//           <div className="w-full px-4 lg:w-3/12">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block mb-2 text-sm text-blueGray-600"
//                 htmlFor="grid-password"
//               >
//                 Capacity of Service
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
//                 No of metering points
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
//                 Account Numbers
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
//                 Type of Supply
//               </label>
//               <select
//                 name="supplytype"
//                 className="w-full h-10 px-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
//               >
//                 <option value="Industry">Industry</option>
//                 <option value="AREA - OTHER">OTHER</option>
//               </select>
//             </div>
//           </div>
//           <div className="w-full px-4 lg:w-6/12">
//             <label className="block mb-2 text-sm text-blueGray-600">
//               Document to Be Submitted
//             </label>
//             <select
//               className="w-full h-10 px-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
//               onChange={(e) => setSelectedDoc(e.target.value)}
//             >
//               <option value="">Select Document</option>
//               <option value="id_proof">ID Proof</option>
//               <option value="address_proof">Address Proof</option>
//             </select>

//             <div
//               {...getRootProps()}
//               className="p-8 mt-4 text-center border-2 border-blue-600 border-dashed rounded-lg cursor-pointer"
//             >
//               <input {...getInputProps()} />
//               <FaCloudUploadAlt size={35} className="mx-auto text-gray-500" />
//               <p className="block mb-2 text-sm text-blueGray-600">
//                 Drag & Drop files here or click to upload
//               </p>
//             </div>

//             <div className="mt-4 space-y-2">
//               {files.map((file) => (
//                 <div
//                   key={file.name}
//                   className="flex items-center justify-between p-2 border rounded-lg"
//                 >
//                   <span className="truncate">{file.name}</span>
//                   <FaTrash
//                     className="text-red-500 cursor-pointer"
//                     onClick={() => removeFile(file.name)}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/*  */}
//           <div className="w-full px-4 lg:w-6/12">
//             <label className="block mb-2 text-sm text-blueGray-600">
//               Document to Be Submitted
//             </label>
//             <select
//               className="w-full h-10 px-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
//               onChange={(e) => setSelectedDoc(e.target.value)}
//             >
//               <option value="">Select Document</option>
//               <option value="id_proof">ID Proof</option>
//               <option value="address_proof">Address Proof</option>
//             </select>

//             <div
//               {...getRootProps()}
//               className="p-8 mt-4 text-center border-2 border-blue-600 border-dashed rounded-lg cursor-pointer"
//             >
//               <input {...getInputProps()} />
//               <FaCloudUploadAlt size={35} className="mx-auto text-gray-500" />
//               <p className="block mb-2 text-sm text-blueGray-600">
//                 Drag & Drop files here or click to upload
//               </p>
//             </div>

//             <div className="mt-4 space-y-2">
//               {files.map((file) => (
//                 <div
//                   key={file.name}
//                   className="flex items-center justify-between p-2 border rounded-lg"
//                 >
//                   <span className="truncate">{file.name}</span>
//                   <FaTrash
//                     className="text-red-500 cursor-pointer"
//                     onClick={() => removeFile(file.name)}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//           {/*  */}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default TechDetails;


import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";

const TechDetails = ({ onInputChange, data }) => {
  const [techData, setTechData] = useState({
    meteringType: "HT",
    hasExistingSupply: "Yes",
    capacity: "",
    meteringPoints: "",
    accountNumbers: "",
    supplyType: "",
    documents: [],
  });

  const [files, setFiles] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState("");

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*,application/pdf",
    maxSize: 1024 * 1024,
    onDrop: (acceptedFiles) => {
      const newFiles = [...files, ...acceptedFiles];
      setFiles(newFiles);
      setTechData((prev) => ({ ...prev, documents: newFiles }));
      if (onInputChange) {
        onInputChange({ ...techData, documents: newFiles });
      }
    },
  });

  const removeFile = (name) => {
    const newFiles = files.filter((file) => file.name !== name);
    setFiles(newFiles);
    setTechData((prev) => ({ ...prev, documents: newFiles }));
    if (onInputChange) {
      onInputChange({ ...techData, documents: newFiles });
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === "radio" ? value : value;
    const newData = { ...techData, [name]: newValue };
    setTechData(newData);
    if (onInputChange) {
      onInputChange(newData);
    }
  };

  return (
    <div className="flex-auto">
      <form>
        <div className="flex flex-wrap">
          {/* HT/LT Metering */}
          <div className="w-full lg:w-3/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                HT/LT Metering
              </label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center text-sm">
                  <input
                    type="radio"
                    name="meteringType"
                    value="HT"
                    checked={techData.meteringType === "HT"}
                    onChange={handleChange}
                    className="mr-2 text-[#7c0000] focus:ring-[#7c0000]"
                  />
                  HT
                </label>
                <label className="flex items-center text-sm">
                  <input
                    type="radio"
                    name="meteringType"
                    value="LT"
                    checked={techData.meteringType === "LT"}
                    onChange={handleChange}
                    className="mr-2 text-[#7c0000] focus:ring-[#7c0000]"
                  />
                  LT
                </label>
              </div>
            </div>
          </div>

          {/* Does Premises already have electricity supply */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Does Premises already have electricity supply
              </label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center text-sm">
                  <input
                    type="radio"
                    name="hasExistingSupply"
                    value="Yes"
                    checked={techData.hasExistingSupply === "Yes"}
                    onChange={handleChange}
                    className="mr-2 text-[#7c0000] focus:ring-[#7c0000]"
                  />
                  Yes
                </label>
                <label className="flex items-center text-sm">
                  <input
                    type="radio"
                    name="hasExistingSupply"
                    value="No"
                    checked={techData.hasExistingSupply === "No"}
                    onChange={handleChange}
                    className="mr-2 text-[#7c0000] focus:ring-[#7c0000]"
                  />
                  No
                </label>
              </div>
            </div>
          </div>

          {/* Capacity of Service */}
          <div className="w-full lg:w-3/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Capacity of Service
              </label>
              <input
                type="text"
                name="capacity"
                value={techData.capacity || ""}
                onChange={handleChange}
                placeholder="Enter Capacity"
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>

          {/* No of metering points */}
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                No of metering points
              </label>
              <input
                type="text"
                name="meteringPoints"
                value={techData.meteringPoints || ""}
                onChange={handleChange}
                placeholder="Enter Number"
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>

          {/* Account Numbers */}
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Account Numbers
              </label>
              <input
                type="text"
                name="accountNumbers"
                value={techData.accountNumbers || ""}
                onChange={handleChange}
                placeholder="Enter Account Numbers"
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>

          {/* Type of Supply */}
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Type of Supply
              </label>
              <select
                name="supplyType"
                value={techData.supplyType || ""}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              >
                <option value="">Select Type</option>
                <option value="Industry">Industry</option>
                <option value="Commercial">Commercial</option>
                <option value="Residential">Residential</option>
              </select>
            </div>
          </div>

          {/* Document Upload Section 1 */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Document to Be Submitted
              </label>
              <select
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150 mb-3"
                onChange={(e) => setSelectedDoc(e.target.value)}
                value={selectedDoc}
              >
                <option value="">Select Document</option>
                <option value="id_proof">ID Proof</option>
                <option value="address_proof">Address Proof</option>
              </select>

              <div
                {...getRootProps()}
                className="p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 cursor-pointer hover:border-[#7c0000] transition-colors duration-150"
              >
                <input {...getInputProps()} />
                <FaCloudUploadAlt size={35} className="mx-auto text-gray-400 mb-2" />
                <p className="text-gray-600 text-sm text-center">
                  Drag & Drop files here or click to upload
                </p>
              </div>
            </div>
          </div>

          {/* Document Upload Section 2 */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Additional Document
              </label>
              <select
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150 mb-3"
                onChange={(e) => setSelectedDoc(e.target.value)}
                value={selectedDoc}
              >
                <option value="">Select Document</option>
                <option value="agreement">Agreement</option>
                <option value="certificate">Certificate</option>
              </select>

              <div
                {...getRootProps()}
                className="p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 cursor-pointer hover:border-[#7c0000] transition-colors duration-150"
              >
                <input {...getInputProps()} />
                <FaCloudUploadAlt size={35} className="mx-auto text-gray-400 mb-2" />
                <p className="text-gray-600 text-sm text-center">
                  Drag & Drop files here or click to upload
                </p>
              </div>
            </div>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="w-full lg:w-12/12 px-4">
              <div className="mt-2 space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Uploaded Files</h4>
                {files.map((file) => (
                  <div
                    key={file.name}
                    className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded-lg"
                  >
                    <span className="text-sm text-gray-700 truncate max-w-[300px]">
                      {file.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(file.name)}
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default TechDetails;