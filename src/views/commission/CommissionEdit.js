// //this is working code without support print function

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import "./commission.css";
// import OrderCardPopup from "components/Tabs/OrderCardPopup";
// import OrderCardPopupTest from "components/Tabs/OrderCardPopupTest";

// // from grok
// // import OrderCardPopupNew from "components/Tabs/OrderCardPopupNew";
// import OrderCardPopupNewEdit from "components/Tabs/OrderCardPopupNewEdit";

// export default function CommissionEdit({ color }) {
//   const [commissions, setCommissions] = useState([]); // Stores the original data from API
//   const [filteredCommissions, setFilteredCommissions] = useState([]); // Stores filtered/search results
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   // New state to track expanded rows (using Set for unique estimateNo)
//   const [expandedRows, setExpandedRows] = useState(new Set());

//   // //this is for OrderCardPopup changes
//   // const [showOrderCardPopup, setShowOrderCardPopup] = useState(false);

//   // // Simple function to open the popup
//   // const openOrderCard = () => {
//   //   setShowOrderCardPopup(true);
//   // };

//   // // Simple function to close the popup
//   // const closeOrderCard = () => {
//   //   setShowOrderCardPopup(false);
//   // };

//   // grok
//   // const [isPopupOpen, setIsPopupOpen] = useState(false);  // Removed global popup state

//   const baseUrl = process.env.REACT_APP_API_BASE_URL;

//   // Fetch commission details from API
//   const fetchCommissionDetails = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const response = await fetch(`${baseUrl}/api/commission/details/edit`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Basic " + btoa("user:admin123"),
//         },
//       });

//       if (response.ok) {
//         const data = await response.json(); // Converts response body from JSON to JavaScript object

//         // Transform the API data to match our component structure
//         const transformedData = data.map((item, index) => ({
//           id: index + 1,
//           estimateNo: item.estimateNo, // Ensure this is the full estimateNo (e.g., "501.20/BS/13/0001/1")
//           projectNo:item.projectNo,
//           totalCost: item.totalCost,
//           deptId: item.deptId,
//           description: item.description,
//           status: getStatusText(item.status),
//           statusCode: item.status,
//         }));

//         setCommissions(transformedData);
//         setFilteredCommissions(transformedData);
//         toast.success("Commission data loaded successfully!");
//       } else {
//         throw new Error(`Failed to fetch data: ${response.status}`);
//       }
//     } catch (error) {
//       console.error("Error fetching commission details:", error);
//       setError(error.message);
//       toast.error("Failed to load commission data!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Convert numeric status to readable text
//   const getStatusText = (statusCode) => {
//     switch (statusCode) {
//       case 1:
//         return "pending";
//       case 2:
//         return "approved";
//       case 3:
//         return "rejected";
//       case 4:
//         return "forwarded";
//       default:
//         return "pending";
//     }
//   };

//   // Get status display text
//   const getStatusDisplayText = (status) => {
//     switch (status) {
//       case "approved":
//         return "Approved";
//       case "rejected":
//         return "Rejected";
//       case "forwarded":
//         return "Forwarded";
//       default:
//         return "Pending";
//     }
//   };

//   // useEffect runs once when component mounts
//   // Calls fetchCommissionDetails() to load data
//   useEffect(() => {
//     fetchCommissionDetails();
//   }, []);


//   useEffect(() => {
//     let result = commissions;
//     if (statusFilter !== "all") {
//       result = result.filter((c) => c.status === statusFilter);
//     }
//     if (searchTerm) {
//       result = result.filter((c) =>
//         [c.estimateNo, c.deptId, c.description].some(
//           (val) =>
//             val &&
//             val.toString().toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//     }
//     setFilteredCommissions(result);
//     setCurrentPage(1);
//   }, [searchTerm, statusFilter, commissions]);

//   // this is added nwly for refresh data
//   useEffect(()=>{
//     // This will run when the component mounts and whenever expandedRows changes
//   // It will refresh data when any popup closes (when expandedRows gets smaller)
//   },[expandedRows]);

//   const totalPages = Math.ceil(filteredCommissions.length / rowsPerPage);
//   const currentData = filteredCommissions.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   const getStatusBadgeClass = (status) => {
//     switch (status) {
//       case "approved":
//         return "status-approved";
//       case "rejected":
//         return "status-rejected";
//       case "forwarded":
//         return "status-forwarded";
//       default:
//         return "status-pending";
//     }
//   };

//   // Function to toggle expansion for a specific row
//   const toggleRow = (estimateNo) => {
//     setExpandedRows((prev) => {
//       const newExpanded = new Set(prev);
//       if (newExpanded.has(estimateNo)) {
//         newExpanded.delete(estimateNo);
//         // Refresh data when closing a popup 
//         //this added newly to fix the of status updated as 10 immediately
//       fetchCommissionDetails();
//       } else {
//         newExpanded.add(estimateNo);
//       }
//       return newExpanded;
//     });
//   };

//   if (loading) {
//     return (
//       <div className="commission-container">
//         <div className="commission-wrapper">
//           <div className="commission-card">
//             <div className="loading-container">
//               <div className="loading-text">Loading commission data...</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="commission-container">
//         <div className="commission-wrapper">
//           <div className="commission-card">
//             <div className="error-container">
//               <div className="error-text">Error: {error}</div>
//               <button onClick={fetchCommissionDetails} className="retry-button">
//                 Retry
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="commission-container">
//       <div className="commission-wrapper">
//         <div className="commission-card">
//           <div className="commission-header">
//             {/* <h2 className={`commission-title ${color}`}>
//               Commission Management
//             </h2> */}
//             <h2 className={`commission-title ${color}`}>
//             EDIT ORDER CARD
//             </h2>
//           </div>

//           {/* Removed global popup rendering */}

//           {/* new for order card  */}
//           {/* {showOrderCardPopup && (
//         <OrderCardPopup
//           isOpen={showOrderCardPopup}
//           onClose={closeOrderCard}
//         />
//       )} */}

//           {/* Filters and Search */}
//           <div className="filters-container">
//             <div className="filters-left">
//               <div className="show-entries">
//                 <label>Show</label>
//                 <select
//                   value={rowsPerPage}
//                   onChange={(e) => setRowsPerPage(Number(e.target.value))}
//                 >
//                   {[5, 10, 20, 50].map((num) => (
//                     <option key={num} value={num}>
//                       {num}
//                     </option>
//                   ))}
//                 </select>

//                 <label>entries</label>
//               </div>

//               <div className="spacer"></div>

//               <div className="status-filter">
//                 <label>Status:</label>
//                 <select
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                 >
//                   {["all", "pending", "approved", "rejected", "forwarded"].map(
//                     (status) => (
//                       <option key={status} value={status}>
//                         {status.charAt(0).toUpperCase() + status.slice(1)}
//                       </option>
//                     )
//                   )}
//                 </select>
//               </div>
//             </div>

//             <input
//               type="text"
//               placeholder="Search Estimate No, Dept ID, or Description..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="search-input"
//             />
//           </div>

//           {/* Table */}
//           <div className="table-container">
//             <table className="commission-table">
//               <thead>
//                 <tr className="table-header">
//                   <th>Estimate No</th>
//                   <th>Project No</th>
//                   <th>Dept ID</th>
//                   <th>Total Cost ( LKR)</th>
//                   <th>Description</th>
//                   <th>Status</th>
//                   <th>Actions</th>
                  
                  
                  
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentData.length > 0 ? (
//                   currentData.map((c) => (
//                     <>
//                       <tr key={`${c.estimateNo}-${c.id}`} className="table-row">
//                         <td className="table-cell">{c.estimateNo}</td>
//                         <td className="table-cell">{c.projectNo}</td>
//                         <td className="table-cell">{c.deptId}</td>
//                         <td className="table-cell text-right" >
//                           {/* Rs. {c.totalCost?.toLocaleString() || 0} */}
//                           {(c.totalCost || 0).toLocaleString('en-US', {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2
//   })}
//                         </td>
//                         <td className="table-cell" title={c.description}>
//                           {c.description && c.description.length > 50
//                             ? `${c.description.substring(0, 50)}...`
//                             : c.description}
//                         </td>
//                         <td className="table-cell">
//                           <span
//                             className={`status-badge ${getStatusBadgeClass(
//                               c.status
//                             )}`}
//                           >
//                             {getStatusDisplayText(c.status)}
//                           </span>
//                         </td>
//                         <td className="table-cell">
//                           <div className="action-buttons">
//                             {/* this is uri encoded uri */}
//                             <Link
//                               to={`/admin/commission/edit/${encodeURIComponent(
//                                 c.estimateNo
//                               )}`}
//                             >
//                               <button className="view-button">View</button>
//                             </Link>

//                             {/* grok - Modified to toggle expand/collapse */}
//                             <button
//                               className="view-button"
//                               onClick={() => toggleRow(c.estimateNo)}
//                             >
//                               Edit Order Card {expandedRows.has(c.estimateNo) ? '▲' : '▼'}
//                             </button>
//                             <button>
//                               Print order card
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                       {/* Expanded row for OrderCardPopupNewEdit */}
//                       {expandedRows.has(c.estimateNo) && (
//                         <tr>
//                           <td colSpan="7">
//                             <OrderCardPopupNewEdit
//                               isOpen={true}
//                               onClose={() => toggleRow(c.estimateNo)}
//                               estimateNo={c.estimateNo} //parsing estimate number as prop to ordercard
//                               projectNumber={c.projectNo} //parsing project number as prop to ordercard 
//                               deptId={c.deptId} // parsing deptId as a prop to orderCard
                              
//                             />
//                           </td>
//                         </tr>
//                       )}
//                     </>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="7" className="no-data">
//                       No commission data found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="pagination-container">
//             <div className="pagination-info">
//               Showing{" "}
//               {filteredCommissions.length === 0
//                 ? 0
//                 : (currentPage - 1) * rowsPerPage + 1}{" "}
//               to{" "}
//               {Math.min(currentPage * rowsPerPage, filteredCommissions.length)}{" "}
//               of {filteredCommissions.length} entries
//             </div>
//             <div className="pagination-buttons">
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="pagination-button"
//               >
//                 Previous
//               </button>
//               <span className="pagination-info-text">
//                 Page {currentPage} of {totalPages}
//               </span>
//               <button
//                 onClick={() =>
//                   setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                 }
//                 disabled={currentPage === totalPages || totalPages === 0}
//                 className="pagination-button"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// // // Updated CommissionEdit.js - support with print function (full code with integrations) 
// // //given grok
// // import { useEffect, useState, useRef } from "react";
// // import { Link } from "react-router-dom";
// // import { toast } from "react-toastify";
// // import "./commission.css";
// // import OrderCardPopup from "components/Tabs/OrderCardPopup";
// // import OrderCardPopupTest from "components/Tabs/OrderCardPopupTest";

// // // from grok
// // // import OrderCardPopupNew from "components/Tabs/OrderCardPopupNew";
// // import OrderCardPopupNewEdit from "components/Tabs/OrderCardPopupNewEdit";
// // import { useReactToPrint } from 'react-to-print';
// // import OrderCardPrint from "components/Tabs/OrderCardPrint"; // Adjust path if needed

// // export default function CommissionEdit({ color }) {
// //   const [commissions, setCommissions] = useState([]); // Stores the original data from API
// //   const [filteredCommissions, setFilteredCommissions] = useState([]); // Stores filtered/search results
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [statusFilter, setStatusFilter] = useState("all");
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [rowsPerPage, setRowsPerPage] = useState(10);

// //   // New state to track expanded rows (using Set for unique estimateNo)
// //   const [expandedRows, setExpandedRows] = useState(new Set());

// //   // //this is for OrderCardPopup changes
// //   // const [showOrderCardPopup, setShowOrderCardPopup] = useState(false);

// //   // // Simple function to open the popup
// //   // const openOrderCard = () => {
// //   //   setShowOrderCardPopup(true);
// //   // };

// //   // // Simple function to close the popup
// //   // const closeOrderCard = () => {
// //   //   setShowOrderCardPopup(false);
// //   // };

// //   // grok
// //   // const [isPopupOpen, setIsPopupOpen] = useState(false);  // Removed global popup state

// //   const baseUrl = process.env.REACT_APP_API_BASE_URL;

// //   // Fetch commission details from API
// //   const fetchCommissionDetails = async () => {
// //     try {
// //       setLoading(true);
// //       setError(null);

// //       const response = await fetch(`${baseUrl}/api/commission/details/edit`, {
// //         method: "GET",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: "Basic " + btoa("user:admin123"),
// //         },
// //       });

// //       if (response.ok) {
// //         const data = await response.json(); // Converts response body from JSON to JavaScript object

// //         // Transform the API data to match our component structure
// //         const transformedData = data.map((item, index) => ({
// //           id: index + 1,
// //           estimateNo: item.estimateNo, // Ensure this is the full estimateNo (e.g., "501.20/BS/13/0001/1")
// //           projectNo:item.projectNo,
// //           totalCost: item.totalCost,
// //           deptId: item.deptId,
// //           description: item.description,
// //           status: getStatusText(item.status),
// //           statusCode: item.status,
// //         }));

// //         setCommissions(transformedData);
// //         setFilteredCommissions(transformedData);
// //         toast.success("Commission data loaded successfully!");
// //       } else {
// //         throw new Error(`Failed to fetch data: ${response.status}`);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching commission details:", error);
// //       setError(error.message);
// //       toast.error("Failed to load commission data!");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Convert numeric status to readable text
// //   const getStatusText = (statusCode) => {
// //     switch (statusCode) {
// //       case 1:
// //         return "pending";
// //       case 2:
// //         return "approved";
// //       case 3:
// //         return "rejected";
// //       case 4:
// //         return "forwarded";
// //       default:
// //         return "pending";
// //     }
// //   };

// //   // Get status display text
// //   const getStatusDisplayText = (status) => {
// //     switch (status) {
// //       case "approved":
// //         return "Approved";
// //       case "rejected":
// //         return "Rejected";
// //       case "forwarded":
// //         return "Forwarded";
// //       default:
// //         return "Pending";
// //     }
// //   };

// //   // useEffect runs once when component mounts
// //   // Calls fetchCommissionDetails() to load data
// //   useEffect(() => {
// //     fetchCommissionDetails();
// //   }, []);


// //   useEffect(() => {
// //     let result = commissions;
// //     if (statusFilter !== "all") {
// //       result = result.filter((c) => c.status === statusFilter);
// //     }
// //     if (searchTerm) {
// //       result = result.filter((c) =>
// //         [c.estimateNo, c.deptId, c.description].some(
// //           (val) =>
// //             val &&
// //             val.toString().toLowerCase().includes(searchTerm.toLowerCase())
// //         )
// //       );
// //     }
// //     setFilteredCommissions(result);
// //     setCurrentPage(1);
// //   }, [searchTerm, statusFilter, commissions]);

// //   // this is added nwly for refresh data
// //   useEffect(()=>{
// //     // This will run when the component mounts and whenever expandedRows changes
// //   // It will refresh data when any popup closes (when expandedRows gets smaller)
// //   },[expandedRows]);

// //   const totalPages = Math.ceil(filteredCommissions.length / rowsPerPage);
// //   const currentData = filteredCommissions.slice(
// //     (currentPage - 1) * rowsPerPage,
// //     currentPage * rowsPerPage
// //   );

// //   const getStatusBadgeClass = (status) => {
// //     switch (status) {
// //       case "approved":
// //         return "status-approved";
// //       case "rejected":
// //         return "status-rejected";
// //       case "forwarded":
// //         return "status-forwarded";
// //       default:
// //         return "status-pending";
// //     }
// //   };

// //   // Function to toggle expansion for a specific row
// //   const toggleRow = (estimateNo) => {
// //     setExpandedRows((prev) => {
// //       const newExpanded = new Set(prev);
// //       if (newExpanded.has(estimateNo)) {
// //         newExpanded.delete(estimateNo);
// //         // Refresh data when closing a popup 
// //         //this added newly to fix the of status updated as 10 immediately
// //       fetchCommissionDetails();
// //       } else {
// //         newExpanded.add(estimateNo);
// //       }
// //       return newExpanded;
// //     });
// //   };

// //   // New print functionality
// //   const [printData, setPrintData] = useState(null); // Holds { formData, tableData, mtrTypes }
// //   const componentRef = useRef();

// //   const handlePrint = useReactToPrint({
// //     content: () => componentRef.current,
// //     documentTitle: 'Order Card',
// //     onAfterPrint: () => setPrintData(null), // Clear after print
// //     removeAfterPrint: true, // Optional: Clean up
// //   });

// //   // NEW: UseEffect to trigger print AFTER printData updates
// // useEffect(() => {
// //   if (printData) {
// //     // CHANGED: Increased delay slightly (from 100ms to 300ms) to give more time for ref to attach and component to render
// //     // This helps in cases where rendering is slow; adjust lower if needed after testing
// //     setTimeout(() => {
// //       handlePrint();
// //     }, 300); // 300ms delay to ensure ref is ready
// //   }
// // }, [printData, handlePrint]);

// //   const fetchPrintData = async (projectNumber, deptId) => {
// //     try {
// //       // Reuse fetch logic from OrderCardPopupNewEdit.js
// //       const orderCardResponse = await fetch(
// //         `${baseUrl}/api/order-cards/by-project-dept?projectNo=${encodeURIComponent(projectNumber.trim())}&deptId=${encodeURIComponent(deptId.trim())}`,
// //         {
// //           method: "GET",
// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: "Basic " + btoa("user:admin123"),
// //           },
// //         }
// //       );
// //       if (!orderCardResponse.ok) throw new Error("Order card not found");

// //       const orderCardData = await orderCardResponse.json();

// //       const meterResponse = await fetch(
// //         `${baseUrl}/api/meter-details/by-order-card?orderCardNo=${encodeURIComponent(orderCardData.orderCardNo)}`,
// //         {
// //           method: "GET",
// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: "Basic " + btoa("user:admin123"),
// //           },
// //         }
// //       );
// //       if (!meterResponse.ok) throw new Error("Failed to fetch meter details");

// //       let meterData = await meterResponse.json();

// //       if (meterData.length === 0) {
// //         toast.info("No meter details found for printing.");
// //         return; // Don't set printData if no data
// //       }

// //       meterData.sort((a, b) => (a.mtrOrder || 0) - (b.mtrOrder || 0));

// //       const formData = {
// //         // Map as in your fetchAllData
// //         projectNo: orderCardData.projectNo || "",
// //         orderCardNo: orderCardData.orderCardNo || "",
// //         dateIssued: orderCardData.connectedDate ? orderCardData.connectedDate.split("T")[0] : "",
// //         nameOfConsumer: orderCardData.customerName || "",
// //         addressOfSupply: orderCardData.addressOfSupply || "",
// //         contactDemand: orderCardData.contractDemand || "",
// //         customerCategory: orderCardData.customerCategory || "",
// //         natureOfSupplyCategory: orderCardData.natureOfSupplyCategory || "",
// //         isicNumber: orderCardData.isicNumber || "",
// //         customerOwnershipType: orderCardData.customerOwnershipType || "",
// //         tariffType: orderCardData.tariffType || "",
// //         transformerNo: orderCardData.transformerNumber || "",
// //         sin: orderCardData.sinNumber || "",
// //         areaCode: orderCardData.areaCode || "",
// //         depoCode: orderCardData.depotCode || "",
// //         estPivNumber: orderCardData.estPivNumber || "",
// //         estAmount: orderCardData.estAmount || "",
// //         estPayDate: orderCardData.estPayDate ? orderCardData.estPayDate.split("T")[0] : "",
// //         depPivNumber: orderCardData.depPivNumber || "",
// //         depositAmount: orderCardData.depositAmount || "",
// //         depositDate: orderCardData.depositDate ? orderCardData.depositDate.split("T")[0] : "",
// //         isLoanApp: orderCardData.isLoanApp || "",
// //         loanAmount: orderCardData.loanAmount || "",
// //         loanType: orderCardData.loanType || "",
// //         deptId: orderCardData.deptId || deptId,
// //         // Defaults for other fields, including checkboxes
// //         newAccountNo: "",
// //         accountNo: "",
// //         ocRefNo: "",
// //         ncrNo: "",
// //         pivNo: "",
// //         pivDate: "",
// //         deposit: "",
// //         kvaMeterNo: "",
// //         kvaRatio: "",
// //         kwhMeterNo: "",
// //         kwhRatio: "",
// //         ctRatio: "",
// //         multiplyingFactorKva: "",
// //         multiplyingFactorKwh: "",
// //         meterFixedRemoved: "",
// //         meterNo: "",
// //         readingKwhKva: "",
// //         dateInstalled: "",
// //         meterRatio: "",
// //         capacityKva: "",
// //         meterType: "",
// //         meterInstalledBy: "",
// //         installedDate: "",
// //         esCscName: "",
// //         esCscDate: "",
// //         areaEngineerCert: "",
// //         multFactorConfirm: "",
// //         taxNumber: "",
// //         // Checkboxes default to false - update if API provides
// //         fixMeter: false,
// //         testMeter: false,
// //         connectMeter: false,
// //         readMeter: false,
// //         disconnectMains: false,
// //         removeMains: false,
// //         reconnectMains: false,
// //         refixMeter: false,
// //         specialReading: false,
// //         changeMeter: false,
// //         consumerChange: false,
// //       };

// //       // If meterData has data, update formData with first meter (as in your code)
// //       if (meterData.length > 0) {
// //         const firstMeter = meterData[0];
// //         formData.meterNo = firstMeter.mtrNbr || "";
// //         formData.brCode = firstMeter.brCode || "";
// //         formData.mtrsetType = firstMeter.setType || "";
// //         formData.numberOfPhase = firstMeter.noOfPhases || "";
// //         formData.effctDate = firstMeter.effctDate ? firstMeter.effctDate.split("T")[0] : "";
// //         formData.areaCode = firstMeter.areaCd || formData.areaCode;
// //         formData.depoCode = firstMeter.dpCode || formData.depoCode;
// //         // Map other meter fields if available, e.g., ctRatio from table
// //       }

// //       const tableData = meterData.map((item, index) => ({
// //         mtr: item.mtrType,
// //         test1: item.prsntRdn || "",
// //         test2: item.mtrFactor || "",
// //         test3: item.ctRatio || "",
// //         test4: item.mtrRatio || "",
// //         test5: item.mtrOrder || index + 1,
// //       }));

// //       const mtrTypes = meterData.map((item) => ({ mtrType: item.mtrType }));

// //       setPrintData({ formData, tableData, mtrTypes });
// //       // handlePrint(); // Trigger print immediately after setting data
// //       // NO LONGER call handlePrint() here – useEffect handles it
// //     } catch (error) {
// //       console.error("Error fetching print data:", error);
// //       toast.error("Failed to load order card for printing! " + error.message);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="commission-container">
// //         <div className="commission-wrapper">
// //           <div className="commission-card">
// //             <div className="loading-container">
// //               <div className="loading-text">Loading commission data...</div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="commission-container">
// //         <div className="commission-wrapper">
// //           <div className="commission-card">
// //             <div className="error-container">
// //               <div className="error-text">Error: {error}</div>
// //               <button onClick={fetchCommissionDetails} className="retry-button">
// //                 Retry
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="commission-container">
// //       <div className="commission-wrapper">
// //         <div className="commission-card">
// //           <div className="commission-header">
// //             {/* <h2 className={`commission-title ${color}`}>
// //               Commission Management
// //             </h2> */}
// //             <h2 className={`commission-title ${color}`}>
// //             EDIT ORDER CARD
// //             </h2>
// //           </div>

// //           {/* Removed global popup rendering */}

// //           {/* new for order card  */}
// //           {/* {showOrderCardPopup && (
// //         <OrderCardPopup
// //           isOpen={showOrderCardPopup}
// //           onClose={closeOrderCard}
// //         />
// //       )} */}

// //           {/* Filters and Search */}
// //           <div className="filters-container">
// //             <div className="filters-left">
// //               <div className="show-entries">
// //                 <label>Show</label>
// //                 <select
// //                   value={rowsPerPage}
// //                   onChange={(e) => setRowsPerPage(Number(e.target.value))}
// //                 >
// //                   {[5, 10, 20, 50].map((num) => (
// //                     <option key={num} value={num}>
// //                       {num}
// //                     </option>
// //                   ))}
// //                 </select>

// //                 <label>entries</label>
// //               </div>

// //               <div className="spacer"></div>

// //               <div className="status-filter">
// //                 <label>Status:</label>
// //                 <select
// //                   value={statusFilter}
// //                   onChange={(e) => setStatusFilter(e.target.value)}
// //                 >
// //                   {["all", "pending", "approved", "rejected", "forwarded"].map(
// //                     (status) => (
// //                       <option key={status} value={status}>
// //                         {status.charAt(0).toUpperCase() + status.slice(1)}
// //                       </option>
// //                     )
// //                   )}
// //                 </select>
// //               </div>
// //             </div>

// //             <input
// //               type="text"
// //               placeholder="Search Estimate No, Dept ID, or Description..."
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //               className="search-input"
// //             />
// //           </div>

// //           {/* Table */}
// //           <div className="table-container">
// //             <table className="commission-table">
// //               <thead>
// //                 <tr className="table-header">
// //                   <th>Estimate No</th>
// //                   <th>Project No</th>
// //                   <th>Dept ID</th>
// //                   <th>Total Cost ( LKR)</th>
// //                   <th>Description</th>
// //                   <th>Status</th>
// //                   <th>Actions</th>
                  
                  
                  
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {currentData.length > 0 ? (
// //                   currentData.map((c) => (
// //                     <>
// //                       <tr key={`${c.estimateNo}-${c.id}`} className="table-row">
// //                         <td className="table-cell">{c.estimateNo}</td>
// //                         <td className="table-cell">{c.projectNo}</td>
// //                         <td className="table-cell">{c.deptId}</td>
// //                         <td className="table-cell text-right" >
// //                           {/* Rs. {c.totalCost?.toLocaleString() || 0} */}
// //                           {(c.totalCost || 0).toLocaleString('en-US', {
// //     minimumFractionDigits: 2,
// //     maximumFractionDigits: 2
// //   })}
// //                         </td>
// //                         <td className="table-cell" title={c.description}>
// //                           {c.description && c.description.length > 50
// //                             ? `${c.description.substring(0, 50)}...`
// //                             : c.description}
// //                         </td>
// //                         <td className="table-cell">
// //                           <span
// //                             className={`status-badge ${getStatusBadgeClass(
// //                               c.status
// //                             )}`}
// //                           >
// //                             {getStatusDisplayText(c.status)}
// //                           </span>
// //                         </td>
// //                         <td className="table-cell">
// //                           <div className="action-buttons">
// //                             {/* this is uri encoded uri */}
// //                             <Link
// //                               to={`/admin/commission/edit/${encodeURIComponent(
// //                                 c.estimateNo
// //                               )}`}
// //                             >
// //                               <button className="view-button">View</button>
// //                             </Link>

// //                             {/* grok - Modified to toggle expand/collapse */}
// //                             <button
// //                               className="view-button"
// //                               onClick={() => toggleRow(c.estimateNo)}
// //                             >
// //                               Edit Order Card {expandedRows.has(c.estimateNo) ? '▲' : '▼'}
// //                             </button>
// //                             <button className="view-button" onClick={() => fetchPrintData(c.projectNo, c.deptId)}>
// //                               Print order card
// //                             </button>
// //                           </div>
// //                         </td>
// //                       </tr>
// //                       {/* Expanded row for OrderCardPopupNewEdit */}
// //                       {expandedRows.has(c.estimateNo) && (
// //                         <tr>
// //                           <td colSpan="7">
// //                             <OrderCardPopupNewEdit
// //                               isOpen={true}
// //                               onClose={() => toggleRow(c.estimateNo)}
// //                               estimateNo={c.estimateNo} //parsing estimate number as prop to ordercard
// //                               projectNumber={c.projectNo} //parsing project number as prop to ordercard 
// //                               deptId={c.deptId} // parsing deptId as a prop to orderCard
                              
// //                             />
// //                           </td>
// //                         </tr>
// //                       )}
// //                     </>
// //                   ))
// //                 ) : (
// //                   <tr>
// //                     <td colSpan="7" className="no-data">
// //                       No commission data found
// //                     </td>
// //                   </tr>
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>

// //           {/* Pagination */}
// //           <div className="pagination-container">
// //             <div className="pagination-info">
// //               Showing{" "}
// //               {filteredCommissions.length === 0
// //                 ? 0
// //                 : (currentPage - 1) * rowsPerPage + 1}{" "}
// //               to{" "}
// //               {Math.min(currentPage * rowsPerPage, filteredCommissions.length)}{" "}
// //               of {filteredCommissions.length} entries
// //             </div>
// //             <div className="pagination-buttons">
// //               <button
// //                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
// //                 disabled={currentPage === 1}
// //                 className="pagination-button"
// //               >
// //                 Previous
// //               </button>
// //               <span className="pagination-info-text">
// //                 Page {currentPage} of {totalPages}
// //               </span>
// //               <button
// //                 onClick={() =>
// //                   setCurrentPage((prev) => Math.min(prev + 1, totalPages))
// //                 }
// //                 disabled={currentPage === totalPages || totalPages === 0}
// //                 className="pagination-button"
// //               >
// //                 Next
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Hidden print component */}
// //       {printData && (
// //         <div style={{ display: 'none' }}>
// //           <OrderCardPrint
// //             ref={componentRef}
// //             formData={printData.formData}
// //             tableData={printData.tableData}
// //             mtrTypes={printData.mtrTypes}
// //           />
// //         </div>
// //       )}


// //     </div>
// //   );
// // }





// //new clean commissionedit.js support print function with importing from "components/PrintUtility/PrintUtility.js file";
// // CommissionEdit.js
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import "./commission.css";

// // Import components
// import OrderCardPopupNewEdit from "components/Tabs/OrderCardPopupNewEdit";
// import { usePrint, fetchOrderCardPrintData, PrintModal } from "components/PrintUtility/PrintUtility";

// export default function CommissionEdit({ color }) {
//   const [commissions, setCommissions] = useState([]);
//   const [filteredCommissions, setFilteredCommissions] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [expandedRows, setExpandedRows] = useState(new Set());

//   // Use the print hook from PrintUtility
//   const {
//     printData,
//     setPrintData,
//     isPrintLoading,
//     setIsPrintLoading,
//     handleSimplePrint,
//     resetPrintData
//   } = usePrint();

//   const baseUrl = process.env.REACT_APP_API_BASE_URL;

//   // Fetch commission details from API
//   const fetchCommissionDetails = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const response = await fetch(`${baseUrl}/api/commission/details/edit`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Basic " + btoa("user:admin123"),
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         const transformedData = data.map((item, index) => ({
//           id: index + 1,
//           estimateNo: item.estimateNo,
//           projectNo: item.projectNo,
//           totalCost: item.totalCost,
//           deptId: item.deptId,
//           description: item.description,
//           status: getStatusText(item.status),
//           statusCode: item.status,
//         }));

//         setCommissions(transformedData);
//         setFilteredCommissions(transformedData);
//         toast.success("Commission data loaded successfully!");
//       } else {
//         throw new Error(`Failed to fetch data: ${response.status}`);
//       }
//     } catch (error) {
//       console.error("Error fetching commission details:", error);
//       setError(error.message);
//       toast.error("Failed to load commission data!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Convert numeric status to readable text
//   const getStatusText = (statusCode) => {
//     switch (statusCode) {
//       case 1: return "pending";
//       case 2: return "approved";
//       case 3: return "rejected";
//       case 4: return "forwarded";
//       default: return "pending";
//     }
//   };

//   // Get status display text
//   const getStatusDisplayText = (status) => {
//     switch (status) {
//       case "approved": return "Approved";
//       case "rejected": return "Rejected";
//       case "forwarded": return "Forwarded";
//       default: return "Pending";
//     }
//   };

//   useEffect(() => {
//     fetchCommissionDetails();
//   }, []);

//   useEffect(() => {
//     let result = commissions;
//     if (statusFilter !== "all") {
//       result = result.filter((c) => c.status === statusFilter);
//     }
//     if (searchTerm) {
//       result = result.filter((c) =>
//         [c.estimateNo, c.deptId, c.description].some(
//           (val) =>
//             val &&
//             val.toString().toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//     }
//     setFilteredCommissions(result);
//     setCurrentPage(1);
//   }, [searchTerm, statusFilter, commissions]);

//   const totalPages = Math.ceil(filteredCommissions.length / rowsPerPage);
//   const currentData = filteredCommissions.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   const getStatusBadgeClass = (status) => {
//     switch (status) {
//       case "approved": return "status-approved";
//       case "rejected": return "status-rejected";
//       case "forwarded": return "status-forwarded";
//       default: return "status-pending";
//     }
//   };

//   // Function to toggle expansion for a specific row
//   const toggleRow = (estimateNo) => {
//     setExpandedRows((prev) => {
//       const newExpanded = new Set(prev);
//       if (newExpanded.has(estimateNo)) {
//         newExpanded.delete(estimateNo);
//         fetchCommissionDetails();
//       } else {
//         newExpanded.add(estimateNo);
//       }
//       return newExpanded;
//     });
//   };

//   // Fetch data for printing using function from PrintUtility
//   const handlePrintOrderCard = async (projectNumber, deptId) => {
//     try {
//       setIsPrintLoading(true);
//       toast.info("Loading order card data for printing...");

//       const printData = await fetchOrderCardPrintData(baseUrl, projectNumber, deptId);
//       setPrintData(printData);
//       toast.success("Order card data loaded! Ready to print.");
      
//     } catch (error) {
//       console.error("Error fetching print data:", error);
//       toast.error("Failed to load order card for printing! " + error.message);
//     } finally {
//       setIsPrintLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="commission-container">
//         <div className="commission-wrapper">
//           <div className="commission-card">
//             <div className="loading-container">
//               <div className="loading-text">Loading commission data...</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="commission-container">
//         <div className="commission-wrapper">
//           <div className="commission-card">
//             <div className="error-container">
//               <div className="error-text">Error: {error}</div>
//               <button onClick={fetchCommissionDetails} className="retry-button">
//                 Retry
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="commission-container">
//       <div className="commission-wrapper">
//         <div className="commission-card">
//           <div className="commission-header">
//             <h2 className={`commission-title ${color}`}>
//               EDIT ORDER CARD
//             </h2>
//           </div>

//           {/* Filters and Search */}
//           <div className="filters-container">
//             <div className="filters-left">
//               <div className="show-entries">
//                 <label>Show</label>
//                 <select
//                   value={rowsPerPage}
//                   onChange={(e) => setRowsPerPage(Number(e.target.value))}
//                 >
//                   {[5, 10, 20, 50].map((num) => (
//                     <option key={num} value={num}>
//                       {num}
//                     </option>
//                   ))}
//                 </select>
//                 <label>entries</label>
//               </div>
//               <div className="spacer"></div>
//               <div className="status-filter">
//                 <label>Status:</label>
//                 <select
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                 >
//                   {["all", "pending", "approved", "rejected", "forwarded"].map(
//                     (status) => (
//                       <option key={status} value={status}>
//                         {status.charAt(0).toUpperCase() + status.slice(1)}
//                       </option>
//                     )
//                   )}
//                 </select>
//               </div>
//             </div>
//             <input
//               type="text"
//               placeholder="Search Estimate No, Dept ID, or Description..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="search-input"
//             />
//           </div>

//           {/* Table */}
//           <div className="table-container">
//             <table className="commission-table">
//               <thead>
//                 <tr className="table-header">
//                   <th>Estimate No</th>
//                   <th>Project No</th>
//                   <th>Dept ID</th>
//                   <th>Total Cost (LKR)</th>
//                   <th>Description</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentData.length > 0 ? (
//                   currentData.map((c) => (
//                     <tr key={`${c.estimateNo}-${c.id}`}>
//                       <td className="table-cell">{c.estimateNo}</td>
//                       <td className="table-cell">{c.projectNo}</td>
//                       <td className="table-cell">{c.deptId}</td>
//                       <td className="table-cell text-right">
//                         {(c.totalCost || 0).toLocaleString('en-US', {
//                           minimumFractionDigits: 2,
//                           maximumFractionDigits: 2
//                         })}
//                       </td>
//                       <td className="table-cell" title={c.description}>
//                         {c.description && c.description.length > 50
//                           ? `${c.description.substring(0, 50)}...`
//                           : c.description}
//                       </td>
//                       <td className="table-cell">
//                         <span
//                           className={`status-badge ${getStatusBadgeClass(c.status)}`}
//                         >
//                           {getStatusDisplayText(c.status)}
//                         </span>
//                       </td>
//                       <td className="table-cell">
//                         <div className="action-buttons">
//                           <Link
//                             to={`/admin/commission/edit/${encodeURIComponent(c.estimateNo)}`}
//                           >
//                             <button className="view-button">View</button>
//                           </Link>
//                           <button
//                             className="view-button"
//                             onClick={() => toggleRow(c.estimateNo)}
//                           >
//                             Edit Order Card {expandedRows.has(c.estimateNo) ? '▲' : '▼'}
//                           </button>
//                           <button 
//                             className="view-button" 
//                             onClick={() => handlePrintOrderCard(c.projectNo, c.deptId)}
//                             disabled={isPrintLoading}
//                           >
//                             {isPrintLoading ? "Loading..." : "Print order card"}
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="7" className="no-data">
//                       No commission data found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Expanded rows for OrderCardPopupNewEdit */}
//           {Array.from(expandedRows).map((estimateNo) => {
//             const commission = commissions.find(c => c.estimateNo === estimateNo);
//             if (!commission) return null;
            
//             return (
//               <div key={`expanded-${estimateNo}`} className="expanded-row">
//                 <OrderCardPopupNewEdit
//                   isOpen={true}
//                   onClose={() => toggleRow(estimateNo)}
//                   estimateNo={commission.estimateNo}
//                   projectNumber={commission.projectNo}
//                   deptId={commission.deptId}
//                 />
//               </div>
//             );
//           })}

//           {/* Pagination */}
//           <div className="pagination-container">
//             <div className="pagination-info">
//               Showing{" "}
//               {filteredCommissions.length === 0
//                 ? 0
//                 : (currentPage - 1) * rowsPerPage + 1}{" "}
//               to{" "}
//               {Math.min(currentPage * rowsPerPage, filteredCommissions.length)}{" "}
//               of {filteredCommissions.length} entries
//             </div>
//             <div className="pagination-buttons">
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="pagination-button"
//               >
//                 Previous
//               </button>
//               <span className="pagination-info-text">
//                 Page {currentPage} of {totalPages}
//               </span>
//               <button
//                 onClick={() =>
//                   setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                 }
//                 disabled={currentPage === totalPages || totalPages === 0}
//                 className="pagination-button"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Print Modal from PrintUtility */}
//       <PrintModal
//         printData={printData}
//         onClose={resetPrintData}
//         onPrint={handleSimplePrint}
//         isPrintLoading={isPrintLoading}
//         title="Print Order Card"
//       />
//     </div>
//   );
// }





// //this is working code we changed because in here exapand row related to table
// // CommissionEdit.js
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import "./commission.css";

// // Import components
// import OrderCardPopupNewEdit from "components/Tabs/OrderCardPopupNewEdit";
// import { usePrint, fetchOrderCardPrintData, PrintModal } from "components/PrintUtility/PrintUtility";

// export default function CommissionEdit({ color }) {
//   const [commissions, setCommissions] = useState([]);
//   const [filteredCommissions, setFilteredCommissions] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [expandedRows, setExpandedRows] = useState(new Set());

//   // Use the print hook from PrintUtility
//   const {
//     printData,
//     setPrintData,
//     isPrintLoading,
//     setIsPrintLoading,
//     handleSimplePrint,
//     resetPrintData
//   } = usePrint();

//   const baseUrl = process.env.REACT_APP_API_BASE_URL;

//   // Fetch commission details from API
//   const fetchCommissionDetails = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//        //get userId from the session storage
//        const userId=sessionStorage.getItem("userId");
//        console.log("this is session storage userId :",userId);

//       const response = await fetch(`${baseUrl}/api/commission/details/user/edit?userId=${encodeURIComponent(userId)}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Basic " + btoa("user:admin123"),
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         const transformedData = data.map((item, index) => ({
//           id: index + 1,
//           estimateNo: item.estimateNo,
//           projectNo: item.projectNo,
//           totalCost: item.totalCost,
//           deptId: item.deptId,
//           description: item.description,
//           status: getStatusText(item.status),
//           statusCode: item.status,
//         }));

//         setCommissions(transformedData);
//         setFilteredCommissions(transformedData);
//         toast.success("Commission data loaded successfully!");
//       } else {
//         throw new Error(`Failed to fetch data: ${response.status}`);
//       }
//     } catch (error) {
//       console.error("Error fetching commission details:", error);
//       setError(error.message);
//       toast.error("Failed to load commission data!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Convert numeric status to readable text
//   const getStatusText = (statusCode) => {
//     switch (statusCode) {
//       case 1: return "pending";
//       case 2: return "approved";
//       case 3: return "rejected";
//       case 4: return "forwarded";
//       default: return "pending";
//     }
//   };

//   // Get status display text
//   const getStatusDisplayText = (status) => {
//     switch (status) {
//       case "approved": return "Approved";
//       case "rejected": return "Rejected";
//       case "forwarded": return "Forwarded";
//       default: return "Pending";
//     }
//   };

//   useEffect(() => {
//     fetchCommissionDetails();
//   }, []);

//   useEffect(() => {
//     let result = commissions;
//     if (statusFilter !== "all") {
//       result = result.filter((c) => c.status === statusFilter);
//     }
//     if (searchTerm) {
//       result = result.filter((c) =>
//         [c.estimateNo, c.deptId, c.description].some(
//           (val) =>
//             val &&
//             val.toString().toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//     }
//     setFilteredCommissions(result);
//     setCurrentPage(1);
//   }, [searchTerm, statusFilter, commissions]);

//   const totalPages = Math.ceil(filteredCommissions.length / rowsPerPage);
//   const currentData = filteredCommissions.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   const getStatusBadgeClass = (status) => {
//     switch (status) {
//       case "approved": return "status-approved";
//       case "rejected": return "status-rejected";
//       case "forwarded": return "status-forwarded";
//       default: return "status-pending";
//     }
//   };

//   // Function to toggle expansion for a specific row
//   const toggleRow = (estimateNo) => {
//     setExpandedRows((prev) => {
//       const newExpanded = new Set(prev);
//       if (newExpanded.has(estimateNo)) {
//         newExpanded.delete(estimateNo);
//         fetchCommissionDetails();
//       } else {
//         newExpanded.add(estimateNo);
//       }
//       return newExpanded;
//     });
//   };

//   // Fetch data for printing using function from PrintUtility
//   const handlePrintOrderCard = async (projectNumber, deptId) => {
//     try {
//       setIsPrintLoading(true);
//       toast.info("Loading order card data for printing...");

//       const printData = await fetchOrderCardPrintData(baseUrl, projectNumber, deptId);
//       setPrintData(printData);
//       toast.success("Order card data loaded! Ready to print.");
      
//     } catch (error) {
//       console.error("Error fetching print data:", error);
//       toast.error("Failed to load order card for printing! " + error.message);
//     } finally {
//       setIsPrintLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="commission-container">
//         <div className="commission-wrapper">
//           <div className="commission-card">
//             <div className="loading-container">
//               <div className="loading-text">Loading commission data...</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="commission-container">
//         <div className="commission-wrapper">
//           <div className="commission-card">
//             <div className="error-container">
//               <div className="error-text">Error: {error}</div>
//               <button onClick={fetchCommissionDetails} className="retry-button">
//                 Retry
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="commission-container">
//       <div className="commission-wrapper">
//         <div className="commission-card">
//           <div className="commission-header">
//             <h2 className={`commission-title ${color}`}>
//               EDIT ORDER CARD
//             </h2>
//           </div>

//           {/* Filters and Search */}
//           <div className="filters-container">
//             <div className="filters-left">
//               <div className="show-entries">
//                 <label>Show</label>
//                 <select
//                   value={rowsPerPage}
//                   onChange={(e) => setRowsPerPage(Number(e.target.value))}
//                 >
//                   {[5, 10, 20, 50].map((num) => (
//                     <option key={num} value={num}>
//                       {num}
//                     </option>
//                   ))}
//                 </select>
//                 <label>entries</label>
//               </div>
//               <div className="spacer"></div>
//               <div className="status-filter">
//                 <label>Status:</label>
//                 <select
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                 >
//                   {["all", "pending", "approved", "rejected", "forwarded"].map(
//                     (status) => (
//                       <option key={status} value={status}>
//                         {status.charAt(0).toUpperCase() + status.slice(1)}
//                       </option>
//                     )
//                   )}
//                 </select>
//               </div>
//             </div>
//             <input
//               type="text"
//               placeholder="Search Estimate No, Dept ID, or Description..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="search-input"
//             />
//           </div>

//           {/* Table */}
//           <div className="table-container">
//             <table className="commission-table">
//               <thead>
//                 <tr className="table-header">
//                   <th>Estimate No</th>
//                   <th>Project No</th>
//                   <th>Dept ID</th>
//                   <th>Total Cost (LKR)</th>
//                   <th>Description</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentData.length > 0 ? (
//                   currentData.map((c) => (
//                     <tr key={`${c.estimateNo}-${c.id}`}>
//                       <td className="table-cell">{c.estimateNo}</td>
//                       <td className="table-cell">{c.projectNo}</td>
//                       <td className="table-cell">{c.deptId}</td>
//                       <td className="table-cell text-right">
//                         {(c.totalCost || 0).toLocaleString('en-US', {
//                           minimumFractionDigits: 2,
//                           maximumFractionDigits: 2
//                         })}
//                       </td>
//                       <td className="table-cell" title={c.description}>
//                         {c.description && c.description.length > 50
//                           ? `${c.description.substring(0, 50)}...`
//                           : c.description}
//                       </td>
//                       <td className="table-cell">
//                         <span
//                           className={`status-badge ${getStatusBadgeClass(c.status)}`}
//                         >
//                           {getStatusDisplayText(c.status)}
//                         </span>
//                       </td>
//                       <td className="table-cell">
//                         <div className="action-buttons">
//                           <Link
//                             to={`/admin/commission/edit/${encodeURIComponent(c.estimateNo)}`}
//                           >
//                             <button className="view-button">View</button>
//                           </Link>
//                           <button
//                             className="view-button"
//                             onClick={() => toggleRow(c.estimateNo)}
//                           >
//                             Edit Order Card{expandedRows.has(c.estimateNo) ? '▲' : '▼'} 
//                           </button>
//                           <button 
//                             className="view-button" 
//                             onClick={() => handlePrintOrderCard(c.projectNo, c.deptId)}
//                             disabled={isPrintLoading}
//                           >
//                             {isPrintLoading ? "Loading..." : "Print order card"}
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="7" className="no-data">
//                       No commission data found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Expanded rows for OrderCardPopupNewEdit */}
//           {Array.from(expandedRows).map((estimateNo) => {
//             const commission = commissions.find(c => c.estimateNo === estimateNo);
//             if (!commission) return null;
            
//             return (
//               <div key={`expanded-${estimateNo}`} className="expanded-row">
//                 <OrderCardPopupNewEdit
//                   isOpen={true}
//                   onClose={() => toggleRow(estimateNo)}
//                   estimateNo={commission.estimateNo}
//                   projectNumber={commission.projectNo}
//                   deptId={commission.deptId}
//                 />
//               </div>
//             );
//           })}

//           {/* Pagination */}
//           <div className="pagination-container">
//             <div className="pagination-info">
//               Showing{" "}
//               {filteredCommissions.length === 0
//                 ? 0
//                 : (currentPage - 1) * rowsPerPage + 1}{" "}
//               to{" "}
//               {Math.min(currentPage * rowsPerPage, filteredCommissions.length)}{" "}
//               of {filteredCommissions.length} entries
//             </div>
//             <div className="pagination-buttons">
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="pagination-button"
//               >
//                 Previous
//               </button>
//               <span className="pagination-info-text">
//                 Page {currentPage} of {totalPages}
//               </span>
//               <button
//                 onClick={() =>
//                   setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                 }
//                 disabled={currentPage === totalPages || totalPages === 0}
//                 className="pagination-button"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Print Modal from PrintUtility */}
//       <PrintModal
//         printData={printData}
//         onClose={resetPrintData}
//         onPrint={handleSimplePrint}
//         isPrintLoading={isPrintLoading}
//         title="Print Order Card"
//       />
//     </div>
//   );
// }




//this is newwly updated print with table mapping 02 code testing
// CommissionEdit.js
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./commission.css";

// Import components
import OrderCardPopupNewEdit from "components/Tabs/OrderCardPopupNewEdit";
import { usePrint, fetchOrderCardPrintData, PrintModal } from "components/PrintUtility/PrintUtility";

export default function CommissionEdit({ color }) {
  const [commissions, setCommissions] = useState([]);
  const [filteredCommissions, setFilteredCommissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [expandedRows, setExpandedRows] = useState(new Set());

  // Use the print hook from PrintUtility
  const {
    printData,
    setPrintData,
    isPrintLoading,
    setIsPrintLoading,
    handleSimplePrint,
    resetPrintData
  } = usePrint();

  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const getApiEndpointByUserLevel = async (userLevel, deptId) => {
    const endpointMap = {
      'deo': 'edit',
      'es': 'verify',
      'ddo': 'approve',
      'hos': 'authorize',
      'fo': 'finalize'
    };
    
    // Default to 'edit' if userLevel is not found in map
    if (userLevel?.toLowerCase() !== 'ee') {
      return endpointMap[userLevel?.toLowerCase()] || 'edit';
    }
    
    // For EE user level, check department type
    try {
      const response = await fetch(
        `${baseUrl}/api/login/dept-type?deptId=${encodeURIComponent(deptId)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa("user:admin123"),
          },
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        const deptType = data.deptType; // "PROVINCIAL" or "AREA"

        console.log("this is api fetch dept type",deptType)
        
        // Strict check for exactly "AREA" or "PROVINCIAL"
        if (deptType === "AREA") {
          return "validateAreaEE";
        } else if (deptType === "PROVINCIAL") {
          return "validate";
        } else {
          // If deptType is neither AREA nor PROVINCIAL, throw an error
          console.error("Unexpected department type:", deptType);
          throw new Error(`Invalid department type: ${deptType}. Expected "AREA" or "PROVINCIAL".`);
        }
      } else {
        console.error("Failed to fetch department type for deptId:", deptId);
        throw new Error("Failed to fetch department type");
      }
    } catch (error) {
      console.error("Error fetching department type:", error);
      // Don't return a default - let the error propagate
      throw error;
    }
  };

  // Fetch commission details from API
  const fetchCommissionDetails = async () => {
    try {
      setLoading(true);
      setError(null);

       //get userId from the session storage
       const userId=sessionStorage.getItem("userId");
       const userLevel = sessionStorage.getItem("userLevel");
       const deptId = sessionStorage.getItem("deptId");
       console.log("User ID:", userId, "User Level:", userLevel);
      
      console.log("User ID:", userId, "User Level:", userLevel, "Dept ID:", deptId);

       // Get the appropriate API endpoint based on user level and department type
    const apiEndpoint = await getApiEndpointByUserLevel(userLevel, deptId);


      const response = await fetch(`${baseUrl}/api/commission/details/user/${apiEndpoint}?userId=${encodeURIComponent(userId)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("user:admin123"),
        },
      });

      if (response.ok) {
        const data = await response.json();
        const transformedData = data.map((item, index) => ({
          id: index + 1,
          estimateNo: item.estimateNo,
          projectNo: item.projectNo,
          totalCost: item.totalCost,
          deptId: item.deptId,
          description: item.description,
          status: getStatusText(item.status),
          statusCode: item.status,
        }));

        setCommissions(transformedData);
        setFilteredCommissions(transformedData);
        toast.success("Commission data loaded successfully!");
      } else {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching commission details:", error);
      setError(error.message);
      toast.error("Failed to load commission data!");
    } finally {
      setLoading(false);
    }
  };

  // Convert numeric status to readable text
  const getStatusText = (statusCode) => {
    switch (statusCode) {
      case 1: return "pending";
      case 2: return "approved";
      case 3: return "rejected";
      case 4: return "forwarded";
      default: return "pending";
    }
  };

  // Get status display text
  const getStatusDisplayText = (status) => {
    switch (status) {
      case "approved": return "Approved";
      case "rejected": return "Rejected";
      case "forwarded": return "Forwarded";
      default: return "Pending";
    }
  };

  useEffect(() => {
    fetchCommissionDetails();
  }, []);

  useEffect(() => {
    let result = commissions;
    if (statusFilter !== "all") {
      result = result.filter((c) => c.status === statusFilter);
    }
    if (searchTerm) {
      result = result.filter((c) =>
        [c.estimateNo, c.deptId, c.description].some(
          (val) =>
            val &&
            val.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    setFilteredCommissions(result);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, commissions]);

  const totalPages = Math.ceil(filteredCommissions.length / rowsPerPage);
  const currentData = filteredCommissions.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "approved": return "status-approved";
      case "rejected": return "status-rejected";
      case "forwarded": return "status-forwarded";
      default: return "status-pending";
    }
  };

  // Function to toggle expansion for a specific row
  const toggleRow = (estimateNo) => {
    setExpandedRows((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(estimateNo)) {
        newExpanded.delete(estimateNo);
        fetchCommissionDetails();
      } else {
        newExpanded.add(estimateNo);
      }
      return newExpanded;
    });
  };

  // Fetch data for printing using function from PrintUtility
  const handlePrintOrderCard = async (projectNumber, deptId) => {
    try {
      setIsPrintLoading(true);
      toast.info("Loading order card data for printing...");

      const printData = await fetchOrderCardPrintData(baseUrl, projectNumber, deptId);
      setPrintData(printData);
      toast.success("Order card data loaded! Ready to print.");
      
    } catch (error) {
      console.error("Error fetching print data:", error);
      toast.error("Failed to load order card for printing! " + error.message);
    } finally {
      setIsPrintLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="commission-container">
        <div className="commission-wrapper">
          <div className="commission-card">
            <div className="loading-container">
              <div className="loading-text">Loading commission data...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="commission-container">
        <div className="commission-wrapper">
          <div className="commission-card">
            <div className="error-container">
              <div className="error-text">Error: {error}</div>
              <button onClick={fetchCommissionDetails} className="retry-button">
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="commission-container">
      <div className="commission-wrapper">
        <div className="commission-card">
          <div className="commission-header">
            <h2 className={`commission-title ${color}`}>
              EDIT ORDER CARD
            </h2>
          </div>

          {/* Filters and Search */}
          <div className="filters-container">
            <div className="filters-left">
              <div className="show-entries">
                <label>Show</label>
                <select
                  value={rowsPerPage}
                  onChange={(e) => setRowsPerPage(Number(e.target.value))}
                >
                  {[5, 10, 20, 50].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
                <label>entries</label>
              </div>
              <div className="spacer"></div>
              <div className="status-filter">
                <label>Status:</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  {["all", "pending", "approved", "rejected", "forwarded"].map(
                    (status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
            <input
              type="text"
              placeholder="Search Estimate No, Dept ID, or Description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Table */}
          <div className="table-container">
            <table className="commission-table">
              <thead>
                <tr className="table-header">
                  <th>Estimate No</th>
                  <th>Project No</th>
                  <th>Dept ID</th>
                  <th>Total Cost (LKR)</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentData.length > 0 ? (
                  currentData.map((c) => (
                    <>
                      <tr key={`${c.estimateNo}-${c.id}`}>
                        <td className="table-cell">{c.estimateNo}</td>
                        <td className="table-cell">{c.projectNo}</td>
                        <td className="table-cell">{c.deptId}</td>
                        <td className="table-cell text-right">
                          {(c.totalCost || 0).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </td>
                        <td className="table-cell" title={c.description}>
                          {c.description && c.description.length > 50
                            ? `${c.description.substring(0, 50)}...`
                            : c.description}
                        </td>
                        <td className="table-cell">
                          <span className={`status-badge ${getStatusBadgeClass(c.status)}`}>
                            {getStatusDisplayText(c.status)}
                          </span>
                        </td>
                        <td className="table-cell">
                          <div className="action-buttons">
                            <Link to={`/admin/commission/edit/${encodeURIComponent(c.estimateNo)}`}>
                              <button className="view-button">View</button>
                            </Link>

                            <button
                              className="view-button"
                              onClick={() => toggleRow(c.estimateNo)}
                            >
                              Edit Order Card {expandedRows.has(c.estimateNo) ? '▲' : '▼'}
                            </button>

                            <button
                              className="view-button"
                              onClick={() => handlePrintOrderCard(c.projectNo, c.deptId)}
                              disabled={isPrintLoading}
                            >
                              {isPrintLoading ? "Loading..." : "Print order card"}
                            </button>
                          </div>
                        </td>
                      </tr>

                      {expandedRows.has(c.estimateNo) && (
                        <tr>
                          <td colSpan="7">
                            <OrderCardPopupNewEdit
                              isOpen={true}
                              onClose={() => toggleRow(c.estimateNo)}
                              estimateNo={c.estimateNo}
                              projectNumber={c.projectNo}
                              deptId={c.deptId}
                            />
                          </td>
                        </tr>
                      )}
                    </>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="no-data">
                      No commission data found
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
          {/* Pagination */}
          <div className="pagination-container">
            <div className="pagination-info">
              Showing{" "}
              {filteredCommissions.length === 0
                ? 0
                : (currentPage - 1) * rowsPerPage + 1}{" "}
              to{" "}
              {Math.min(currentPage * rowsPerPage, filteredCommissions.length)}{" "}
              of {filteredCommissions.length} entries
            </div>
            <div className="pagination-buttons">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="pagination-button"
              >
                Previous
              </button>
              <span className="pagination-info-text">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages || totalPages === 0}
                className="pagination-button"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Print Modal from PrintUtility */}
      <PrintModal
        printData={printData}
        onClose={resetPrintData}
        onPrint={handleSimplePrint}
        isPrintLoading={isPrintLoading}
        title="Print Order Card"
      />
    </div>
  );
}