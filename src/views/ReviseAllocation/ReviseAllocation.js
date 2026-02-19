// import HeaderStatsWithoutCards from "components/Headers/HeaderStatsWithoutCards";
// import Sidebar from "components/Sidebar/Sidebar";
// import Schedule from "components/Tabs/Schedule";
// import React, { useEffect, useState } from "react";

// function ReviseAllocation() {
//   const [isModify, setIsModify] = useState(false);
//   const today = new Date().toLocaleDateString("en-GB");
//   const [rows, setRows] = useState([]);
//   const baseUrl = process.env.REACT_APP_API_BASE_URL;
//   const deptId = sessionStorage.getItem("deptId");

//   useEffect(() => {
//     const fetchTableData = async () => {
//       try {
//         const response = await fetch(
//           `${baseUrl}/api/v1/spestedycon/dept/${deptId}`,
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

//         if (contentType && contentType.includes("application/json")) {
//           data = await response.json();
//         } else {
//           data = await response.text();
//           console.error("Non-JSON response:", data);
//           return;
//         }

//         if (response.ok) {
//           setRows(data);
//         } else {
//           console.error("Fetch failed:", data);
//         }
//       } catch (error) {
//         console.error("Error fetching table data:", error);
//       }
//     };

//     fetchTableData();
//   }, []);

//   return (
//     <>
//       <Sidebar />
//       <div className="relative md:ml-64 bg-blueGray-100">
//         {/* <div className="bg-lightBlue-600 pt-24">
//             </div> */}
//         <HeaderStatsWithoutCards />
//         <div className="relative px-4 md:px-10 mx-auto w-full h-screen -m-24">
//           <div className="container mx-auto rounded-lg">
//             <div className="flex justify-center px-4 mb-5 mx-48 mt-5 md:px-10 lg:px-20 rounded-lg">
//               <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
//                 {/* Content */}
//                 <div className="p-6 bg-blueGray-100 rounded-lg mt-4">
//                   <div className="flex flex-wrap py-2">
//                     <div className="w-full lg:w-6/12 px-4">
//                       <div className="relative w-full mb-3">
//                         <label
//                           className="block text-blueGray-600 text-sm mb-2"
//                           htmlFor="grid-password"
//                         >
//                           Today
//                         </label>
//                         <div className="flex ">
//                           <input
//                             value={today}
//                             type="text"
//                             dissabled
//                             name="today"
//                             className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="w-full lg:w-6/12 px-4">
//                       <div className="relative w-full mb-3">
//                         <label
//                           className="block text-blueGray-600 text-sm mb-2"
//                           htmlFor="grid-password"
//                         >
//                           Selected Date
//                         </label>
//                         <input
//                           type="date"
//                           name="selecteddate"
//                           placeholder="DD/MM/YYYY"
//                           className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex justify-center px-12 ml-2 mb-2 mt-4">
//                   <h3 className="text-blueGray-700 text-sm font-bold">
//                     Diary Schedules
//                   </h3>
//                 </div>

//                 <div className="block w-full overflow-x-auto mt-2">
//                   <table className="items-center w-full bg-transparent border-collapse">
//                     <thead>
//                       <tr>
//                         <th
//                           className={
//                             "px-6 align-middle border border-solid py-3 mr-4 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
//                           }
//                         >
//                           Check
//                         </th>
//                         <th
//                           className={
//                             "px-6 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
//                           }
//                         >
//                           ID
//                         </th>
//                         <th
//                           className={
//                             "px-6 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
//                           }
//                         >
//                           Application No
//                         </th>
//                         <th
//                           className={
//                             "px-6 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
//                           }
//                         >
//                           Allocated By
//                         </th>
//                         <th
//                           className={
//                             "px-6 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
//                           }
//                         >
//                           Allocated To
//                         </th>
//                         <th
//                           className={
//                             "px-6 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
//                           }
//                         >
//                           Description
//                         </th>
//                         <th
//                           className={
//                             "px-6 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
//                           }
//                         >
//                           Cost Center
//                         </th>
//                         <th
//                           className={
//                             "px-6 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
//                           }
//                         >
//                           Appt Type
//                         </th>
//                         <th
//                           className={
//                             "px-6 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
//                           }
//                         >
//                           Status
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {rows.map((item, index) => (
//                         <tr key={index} className="hover:bg-gray-50">
//                           <td className="border px-4 py-2 text-blueGray-600 rounded text-sm">
//                             <input type="checkbox" />
//                           </td>
//                           <td className="border px-4 py-2 text-blueGray-600 rounded text-sm">
//                             {item.id?.appointmentId}
//                           </td>
//                           <td className="border px-4 py-2 text-blueGray-600 rounded text-sm">
//                             {item.referenceNo}
//                           </td>
//                           <td className="border px-4 py-2 text-blueGray-600 rounded text-sm">
//                             {item.allocatedBy}
//                           </td>
//                           <td className="border px-4 py-2 text-blueGray-600 rounded text-sm">
//                             {item.allocatedTo}
//                           </td>
//                           <td className="border px-4 py-2 text-blueGray-600 rounded text-sm">
//                             {item.description || "-"}
//                           </td>
//                           <td className="border px-4 py-2 text-blueGray-600 rounded text-sm">
//                             {item.id?.deptId}
//                           </td>
//                           <td className="border px-4 py-2 text-blueGray-600 rounded text-sm">
//                             {item.appoinmentType}
//                           </td>
//                           <td className="border px-4 py-2 text-blueGray-600 rounded text-sm">{item.status}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//                 <div className="flex justify-center px-12 ml-2 mb-2 mt-4">
//                   <Schedule isModify={false} />
//                 </div>

//                 {/* Navigation Buttons */}
//                 <div className="px-12 flex justify-between items-center mt-2 mb-4">
//                   <div>
//                     <button
//                       style={{ backgroundColor: "#7c0000" }}
//                       className="text-white active:bg-emerald-600 text-sm px-6 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-2 ease-linear transition-all duration-150 ml-2"
//                     >
//                       Edit
//                     </button>
//                   </div>
//                   <div>
//                     <button className="bg-emerald-400 text-white active:bg-emerald-600 text-sm px-6 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
//                       Add New
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ReviseAllocation;

import HeaderStatsWithoutCards from "components/Headers/HeaderStatsWithoutCards";
import Sidebar from "components/Sidebar/Sidebar";
import Schedule from "components/Tabs/Schedule";
import React, { useEffect, useState } from "react";

function ReviseAllocation() {
  const [isModify, setIsModify] = useState(false);
  const today = new Date().toLocaleDateString("en-GB");
  const [rows, setRows] = useState([]);
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const deptId = sessionStorage.getItem("deptId");

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/api/v1/spestedycon/dept/${deptId}`,
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

        if (contentType && contentType.includes("application/json")) {
          data = await response.json();
        } else {
          data = await response.text();
          console.error("Non-JSON response:", data);
          return;
        }

        if (response.ok) {
          setRows(data);
        } else {
          console.error("Fetch failed:", data);
        }
      } catch (error) {
        console.error("Error fetching table data:", error);
      }
    };

    fetchTableData();
  }, [baseUrl, deptId]);

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100 min-h-screen flex flex-col">
        <HeaderStatsWithoutCards />
        <div className="flex-grow">
          <div className="relative px-4 md:px-10 mx-auto w-full -mt-24">
            <div className="container mx-auto px-4 py-6">
              <div className="flex justify-center">
                <div className="w-full bg-white rounded-lg shadow-lg p-6">
                  {/* Today and Selected Date */}
                  <div className="bg-gray-50 rounded-lg border p-6 mb-6">
                    <div className="flex flex-wrap">
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block text-gray-700 text-sm mb-2">
                            Today
                          </label>
                          <input
                            value={today}
                            type="text"
                            disabled
                            name="today"
                            className="p-2 w-full border border-gray-300 rounded text-sm bg-gray-100 focus:outline-none cursor-not-allowed"
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block text-gray-700 text-sm mb-2">
                            Selected Date
                          </label>
                          <input
                            type="date"
                            name="selecteddate"
                            placeholder="DD/MM/YYYY"
                            className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Diary Schedules Title */}
                  <div className="text-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800">Diary Schedules</h2>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto mb-6 border rounded-lg">
                    <table className="min-w-full bg-white border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase border-b">Check</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase border-b">ID</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase border-b">Application No</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase border-b">Allocated By</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase border-b">Allocated To</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase border-b">Description</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase border-b">Cost Center</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase border-b">Appt Type</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase border-b">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.length > 0 ? (
                          rows.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50 border-b">
                              <td className="px-4 py-3 text-sm text-gray-700">
                                <input 
                                  type="checkbox" 
                                  className="rounded border-gray-300 text-[#7c0000] focus:ring-[#7c0000]"
                                />
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-700">{item.id?.appointmentId}</td>
                              <td className="px-4 py-3 text-sm text-gray-700">{item.referenceNo}</td>
                              <td className="px-4 py-3 text-sm text-gray-700">{item.allocatedBy}</td>
                              <td className="px-4 py-3 text-sm text-gray-700">{item.allocatedTo}</td>
                              <td className="px-4 py-3 text-sm text-gray-700">{item.description || "-"}</td>
                              <td className="px-4 py-3 text-sm text-gray-700">{item.id?.deptId}</td>
                              <td className="px-4 py-3 text-sm text-gray-700">{item.appoinmentType}</td>
                              <td className="px-4 py-3 text-sm text-gray-700">{item.status}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="9" className="text-center py-6 text-gray-500">
                              No data available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Schedule Component */}
                  <div className="mb-6">
                    <Schedule isModify={false} />
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between items-center border-t pt-4">
                    <div>
                      <button
                        className="bg-[#7c0000] text-white text-sm px-4 py-2 rounded shadow hover:bg-[#a00000] focus:outline-none focus:ring-2 focus:ring-[#7c0000] focus:ring-opacity-50"
                      >
                        Edit
                      </button>
                    </div>
                    <div>
                      <button className="bg-[#7c0000] text-white text-sm px-4 py-2 rounded shadow hover:bg-[#a00000] focus:outline-none focus:ring-2 focus:ring-[#7c0000] focus:ring-opacity-50">
                        Add New
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReviseAllocation;
