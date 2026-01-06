import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt, FaTrash, FaCheck } from "react-icons/fa";

const TechDetails = () => {
  const [files, setFiles] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState("");

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*,application/pdf",
    maxSize: 1024 * 1024, // 1MB limit
    onDrop: (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles]);
    },
  });

  const removeFile = (name) => {
    setFiles(files.filter((file) => file.name !== name));
  };

  return (
    <div className="flex-auto px-4 lg:px-10 pt-2">
      <form>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-3/12 px-4">
            <div className="relative w-full mb-2">
              <label
                className="block text-blueGray-600 text-sm mb-1"
                htmlFor="grid-password"
              >
                HT/LT Metering
              </label>
              <div className="flex gap-4 mt-4">
                <label className="text-sm mr-4">
                  <input
                    type="radio"
                    name="metering"
                    defaultChecked
                    value="HT"
                  />{" "}
                  HT
                </label>
                <label className="text-sm">
                  <input type="radio" name="metering" value="LT" /> LT
                </label>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-2">
              <label
                className="block text-blueGray-600 text-sm mb-2"
                htmlFor="grid-password"
              >
                Does Premises already have electricity supply
              </label>
              <div className="flex gap-4 mt-4">
                <label className="text-sm mr-4">
                  <input
                    type="radio"
                    name="exixtelec"
                    defaultChecked
                    value="Yes"
                  />{" "}
                  Yes
                </label>
                <label className="text-sm">
                  <input type="radio" name="existelec" value="No" /> No
                </label>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-3/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block text-blueGray-600 text-sm mb-2"
                htmlFor="grid-password"
              >
                Capacity of Service
              </label>
              <input
                type="text"
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block text-blueGray-600 text-sm mb-2"
                htmlFor="grid-password"
              >
                No of metering points
              </label>
              <input
                type="text"
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block text-blueGray-600 text-sm mb-2"
                htmlFor="grid-password"
              >
                Account Numbers
              </label>
              <input
                type="text"
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block text-blueGray-600 text-sm mb-2"
                htmlFor="grid-password"
              >
                Type of Supply
              </label>
              <select
                name="supplytype"
                className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              >
                <option value="Industry">Industry</option>
                <option value="AREA - OTHER">OTHER</option>
              </select>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <label className="block text-blueGray-600 text-sm mb-2">
              Document to Be Submitted
            </label>
            <select
              className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              onChange={(e) => setSelectedDoc(e.target.value)}
            >
              <option value="">Select Document</option>
              <option value="id_proof">ID Proof</option>
              <option value="address_proof">Address Proof</option>
            </select>

            <div
              {...getRootProps()}
              className="mt-4 p-8 border-2 border-blue-600 border-dashed rounded-lg text-center cursor-pointer"
            >
              <input {...getInputProps()} />
              <FaCloudUploadAlt size={35} className="mx-auto text-gray-500" />
              <p className="block text-blueGray-600 text-sm mb-2">
                Drag & Drop files here or click to upload
              </p>
            </div>

            <div className="mt-4 space-y-2">
              {files.map((file) => (
                <div
                  key={file.name}
                  className="flex items-center justify-between p-2 border rounded-lg"
                >
                  <span className="truncate">{file.name}</span>
                  <FaTrash
                    className="text-red-500 cursor-pointer"
                    onClick={() => removeFile(file.name)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/*  */}
          <div className="w-full lg:w-6/12 px-4">
            <label className="block text-blueGray-600 text-sm mb-2">
              Document to Be Submitted
            </label>
            <select
              className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              onChange={(e) => setSelectedDoc(e.target.value)}
            >
              <option value="">Select Document</option>
              <option value="id_proof">ID Proof</option>
              <option value="address_proof">Address Proof</option>
            </select>

            <div
              {...getRootProps()}
              className="mt-4 p-8 border-2 border-blue-600 border-dashed rounded-lg text-center cursor-pointer"
            >
              <input {...getInputProps()} />
              <FaCloudUploadAlt size={35} className="mx-auto text-gray-500" />
              <p className="block text-blueGray-600 text-sm mb-2">
                Drag & Drop files here or click to upload
              </p>
            </div>

            <div className="mt-4 space-y-2">
              {files.map((file) => (
                <div
                  key={file.name}
                  className="flex items-center justify-between p-2 border rounded-lg"
                >
                  <span className="truncate">{file.name}</span>
                  <FaTrash
                    className="text-red-500 cursor-pointer"
                    onClick={() => removeFile(file.name)}
                  />
                </div>
              ))}
            </div>
          </div>
          {/*  */}
        </div>
      </form>
    </div>
  );
};

export default TechDetails;
