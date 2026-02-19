// import { useState, useEffect } from "react";

// const JRGeneralInfo = ({ onInputChange, isModify, data, handleSearch }) => {
//   const baseUrl = process.env.REACT_APP_API_BASE_URL;
//   const [generalData, setgeneralData] = useState({
//     pno: "",
//     costcenter: "",
//     warehouse: "",
//     filereference: "",
//     edate: "",
//     ecategory: "",
//     revisereason: "",
//     rejectreason: "",
//     description: "",
//   });

//   useEffect(() => {
//     if (data) {
//       setgeneralData(data);
//     }
//   }, [data]);

//   const [projectNos, setProjectNos] = useState([]);
//   const [selectedProjectNo, setSelectedProjectNo] = useState("");
//   const [estimateData, setEstimateData] = useState(null);

//   useEffect(() => {
//     const fetchDropdownData = async () => {
//       try {
//         const response = await fetch(
//           `${baseUrl}/api/v1/estimates/dropdowndata`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: "Basic " + btoa("user:admin123"),
//             },
//             credentials: "include",
//           }
//         );

//         const contentType = response.headers.get("content-type");
//         let data;
//         if (contentType && contentType.indexOf("application/json") !== -1) {
//           data = await response.json();
//         } else {
//           throw new Error("Invalid content type");
//         }

//         if (data.projectNos) {
//           setProjectNos(data.projectNos);
//         }
//       } catch (error) {
//         console.error("Fetch dropdown data error:", error);
//       }
//     };

//     fetchDropdownData();
//   }, []);

//   useEffect(() => {
//     if (!selectedProjectNo) return;

//     const fetchEstimateData = async () => {
//       try {
//         const response = await fetch(
//           `${baseUrl}/api/v1/estimate/byproject?projectNo=${selectedProjectNo}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: "Basic " + btoa("user:admin123"),
//             },
//           }
//         );
//         const data = await response.json();
//         setEstimateData(data);
//         console.log("Estimate data fetched:", data);
//         if (data && data.length > 0) {
//           const estimateItem = data[0];
//           const updatedData = {
//             ...generalData,
//             pno: estimateItem.projectNo || selectedProjectNo,
//             warehouse: estimateItem.warehouse || "",
//             filereference: estimateItem.filereference || "",
//             edate: estimateItem.etimateDt || "",
//             ecategory: estimateItem.ecategory || "",
//             revisereason: estimateItem.revReason || "",
//             rejectreason: estimateItem.rejectReason || "",
//             description: estimateItem.descr || ""
//           };
//           setgeneralData(updatedData);
//           // Notify parent component of the changes
//           onInputChange(updatedData);
//         }
//       } catch (error) {
//         console.error("Estimate fetch error:", error);
//       }
//     };

//     fetchEstimateData();
//   }, [selectedProjectNo]);

//   const costcenter = sessionStorage.getItem("deptId");

//   useEffect(() => {
//     setgeneralData((prevData) => ({
//       ...prevData,
//       costcenter: costcenter || "",
//     }));
//   }, [costcenter]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const newData = { ...generalData, [name]: value };
//     setgeneralData(newData);
//     onInputChange(newData);
//   };

//   return (
//     <div className="flex-auto px-4 lg:px-10 py-10 pt-2">
//       <form>
//         <div className="flex flex-wrap">
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                 Project Number
//               </label>
//               <div className="flex ">
//                 <select
//                   name="pno"
//                   id="pno"
//                   value={generalData.pno || selectedProjectNo}
//                   onChange={(e) => setSelectedProjectNo(e.target.value)}
//                   className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                   defaultValue=""
//                 >
//                   <option value="" disabled>
//                     --Please Select--
//                   </option>
//                   {projectNos.map((projectNo) => (
//                     <option key={projectNo} value={projectNo}>
//                       {projectNo}
//                     </option>
//                   ))}
//                 </select>
//                 {isModify && (
//                   <button
//                     className="ml-2 text-white active:bg-lightBlue-600 text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
//                     style={{ backgroundColor: "#7c0000" }}
//                     onClick={handleSearch}
//                   >
//                     Search
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                 Cost Center
//               </label>
//               <input
//                 type="text"
//                 disabled
//                 name="costcenter"
//                 value={costcenter}
//                 className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//               />
//             </div>
//           </div>
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                 Ware House
//               </label>
//               <select
//                 defaultValue=""
//                 name="warehouse"
//                 id="warehouse"
//                 value={generalData.warehouse}
//                 onChange={handleChange}
//                 className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//               >
//                 <option value="" disabled>
//                   --Please Select--
//                 </option>
//               </select>
//             </div>
//           </div>
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                 File Reference
//               </label>
//               <input
//                 type="text"
//                 name="filereference"
//                 value={generalData.filereference}
//                 onChange={handleChange}
//                 className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-wrap">
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                 Estimate Date
//               </label>
//               <input
//                 type="date"
//                 name="edate"
//                 value={generalData.edate}
//                 onChange={handleChange}
//                 className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//               />
//             </div>
//           </div>
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                 Estimate Category
//               </label>
//               <select
//                 defaultValue=""
//                 id="ecategory"
//                 name="ecategory"
//                 value={generalData.ecategory}
//                 onChange={handleChange}
//                 className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//               >
//                 <option value="" disabled>
//                   --Please Select--
//                 </option>
//               </select>
//             </div>
//           </div>
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                 Revise Reason
//               </label>
//               <textarea
//                 type="textarea"
//                 placeholder="Enter Reason"
//                 name="revisereason"
//                 value={generalData.revisereason}
//                 onChange={handleChange}
//                 className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//               />
//             </div>
//           </div>
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                 Reject Reason
//               </label>
//               <textarea
//                 type="textarea"
//                 placeholder="Enter Reason"
//                 name="rejectreason"
//                 value={generalData.rejectreason}
//                 onChange={handleChange}
//                 className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//               />
//             </div>
//           </div>
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                 Description
//               </label>
//               <textarea
//                 type="textarea"
//                 placeholder="Enter Description"
//                 name="description"
//                 value={generalData.description}
//                 onChange={handleChange}
//                 className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//               />
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default JRGeneralInfo;


import { useState, useEffect } from "react";

const JRGeneralInfo = ({ onInputChange, isModify, data, handleSearch }) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const [generalData, setGeneralData] = useState({
    pno: "",
    costcenter: "",
    warehouse: "",
    filereference: "",
    edate: "",
    ecategory: "",
    revisereason: "",
    rejectreason: "",
    description: "",
  });

  useEffect(() => {
    if (data) {
      setGeneralData(data);
    }
  }, [data]);

  const [projectNos, setProjectNos] = useState([]);
  const [selectedProjectNo, setSelectedProjectNo] = useState("");
  const [estimateData, setEstimateData] = useState(null);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/api/v1/estimates/dropdowndata`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Basic " + btoa("user:admin123"),
            },
            credentials: "include",
          }
        );

        const contentType = response.headers.get("content-type");
        let data;
        if (contentType && contentType.indexOf("application/json") !== -1) {
          data = await response.json();
        } else {
          throw new Error("Invalid content type");
        }

        if (data.projectNos) {
          setProjectNos(data.projectNos);
        }
      } catch (error) {
        console.error("Fetch dropdown data error:", error);
      }
    };

    fetchDropdownData();
  }, [baseUrl]);

  useEffect(() => {
    if (!selectedProjectNo) return;

    const fetchEstimateData = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/api/v1/estimate/byproject?projectNo=${selectedProjectNo}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Basic " + btoa("user:admin123"),
            },
          }
        );
        const data = await response.json();
        setEstimateData(data);
        console.log("Estimate data fetched:", data);
        if (data && data.length > 0) {
          const estimateItem = data[0];
          const updatedData = {
            ...generalData,
            pno: estimateItem.projectNo || selectedProjectNo,
            warehouse: estimateItem.warehouse || "",
            filereference: estimateItem.filereference || "",
            edate: estimateItem.etimateDt || "",
            ecategory: estimateItem.ecategory || "",
            revisereason: estimateItem.revReason || "",
            rejectreason: estimateItem.rejectReason || "",
            description: estimateItem.descr || ""
          };
          setGeneralData(updatedData);
          // Notify parent component of the changes
          onInputChange(updatedData);
        }
      } catch (error) {
        console.error("Estimate fetch error:", error);
      }
    };

    fetchEstimateData();
  }, [selectedProjectNo, baseUrl, generalData, onInputChange]);

  const costcenter = sessionStorage.getItem("deptId");

  useEffect(() => {
    setGeneralData((prevData) => ({
      ...prevData,
      costcenter: costcenter || "",
    }));
  }, [costcenter]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...generalData, [name]: value };
    setGeneralData(newData);
    onInputChange(newData);
  };

  return (
    <div className="flex-auto">
      <form>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Project Number
              </label>
              <div className="flex">
                <select
                  name="pno"
                  id="pno"
                  value={generalData.pno || selectedProjectNo}
                  onChange={(e) => setSelectedProjectNo(e.target.value)}
                  className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
                >
                  <option value="">--Please Select--</option>
                  {projectNos.map((projectNo) => (
                    <option key={projectNo} value={projectNo}>
                      {projectNo}
                    </option>
                  ))}
                </select>
                {isModify && (
                  <button
                    className="ml-2 bg-[#7c0000] text-white text-sm px-4 py-2 rounded shadow hover:bg-[#a00000] focus:outline-none focus:ring-2 focus:ring-[#7c0000] focus:ring-opacity-50"
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Cost Center
              </label>
              <input
                type="text"
                disabled
                name="costcenter"
                value={costcenter}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-gray-100 focus:outline-none cursor-not-allowed"
              />
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Ware House
              </label>
              <select
                name="warehouse"
                id="warehouse"
                value={generalData.warehouse}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              >
                <option value="">--Please Select--</option>
                <option value="WH001">WH001</option>
                <option value="WH002">WH002</option>
              </select>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                File Reference
              </label>
              <input
                type="text"
                name="filereference"
                value={generalData.filereference}
                onChange={handleChange}
                placeholder="Enter File Reference"
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Estimate Date
              </label>
              <input
                type="date"
                name="edate"
                value={generalData.edate}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Estimate Category
              </label>
              <select
                id="ecategory"
                name="ecategory"
                value={generalData.ecategory}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              >
                <option value="">--Please Select--</option>
                <option value="CAPEX">CAPEX</option>
                <option value="OPEX">OPEX</option>
              </select>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Revise Reason
              </label>
              <textarea
                rows="3"
                placeholder="Enter Reason"
                name="revisereason"
                value={generalData.revisereason}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Reject Reason
              </label>
              <textarea
                rows="3"
                placeholder="Enter Reason"
                name="rejectreason"
                value={generalData.rejectreason}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full lg:w-12/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Description
              </label>
              <textarea
                rows="3"
                placeholder="Enter Description"
                name="description"
                value={generalData.description}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default JRGeneralInfo;