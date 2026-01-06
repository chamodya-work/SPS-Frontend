// // src/views/commission/PivDetails.js
// import React, { useState, useEffect } from "react";

// const PivDetails = ({ estimateNo }) => {
//   const [pivData, setPivData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPivDetails = async () => {
//       try {
//         setLoading(true);
//         setError(null);


//         // Trim and encode the estimate number for the query parameter
//         // const cleanedEstimateNo = estimateNo.trim();
//         // const encodedEstimateNo = encodeURIComponent(cleanedEstimateNo);

//         const response = await fetch(
//           `http://localhost:8088/SPS/api/piv-details/by-estimate?estimateNo=${estimateNo}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: "Basic " + btoa("user:admin123"),
//             },
//           }
//         );

  

//         if (!response.ok) {
//           throw new Error(`Failed to fetch PIV details: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log(data[0]);
//         setPivData(data);
//       } catch (err) {
//         console.error("Error fetching PIV details:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (estimateNo) {
//       fetchPivDetails();
//     }
//   }, [estimateNo]);

//   // Filter PIV data based on type (APP vs EST)
//   // const applicationPivs = pivData.filter(
//   //   (item) => item.pivNo && item.pivNo.startsWith("PIV")
//   // );

//   // const estimatePivs = pivData.filter(
//   //   (item) => item.pivNo && item.pivNo.startsWith("EST")
//   // );

//   // CORRECTED: Filter PIV data based on referenceType (SEC vs EST)
//   const securityDepositPivs = pivData.filter(
//     (item) => item.referenceType === "SEC"
//   );

//   const estimatePivs = pivData.filter(
//     (item) => item.referenceType === "EST"
//   );

//   const getStatusBadgeClass = (status) => {
//     switch (status) {
//       case "C":
//         return "status-approved"; // Confirmed
//       case "P":
//         return "status-pending"; // Pending
//       case "N":
//         return "status-rejected"; // New
//       default:
//         return "status-pending";
//     }
//   };

//   const getStatusText = (status) => {
//     switch (status) {
//       case "C":
//         return "Confirmed";
//       case "P":
//         return "Pending";
//       case "N":
//         return "New";
//       default:
//         return status;
//     }
//   };

//   // CORRECTED: Function to get the appropriate amount based on referenceType
//   const getPivAmount = (item) => {
//     if (item.referenceType === "SEC") {
//       return item.securityDeposit; // Use securityDeposit for SEC type
//     } else if (item.referenceType === "EST") {
//       return item.serConnOrElecSch; // Use serConnOrElecSch for EST type
//     }
//     return {}; // Fallback to pivAmount
//   };

//   if (loading) {
//     return (
//       <div className="form-container">
//         <h3 className="form-title">PIV Details</h3>
//         <div className="loading-text">Loading PIV details...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="form-container">
//         <h3 className="form-title">PIV Details</h3>
//         <div className="error-text">Error: {error}</div>
//         <button
//           onClick={() => window.location.reload()}
//           className="retry-button"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="form-container">
//       <h3 className="form-title">PIV Details</h3>

//       {/* Application PIV Details Table */}
//       <div style={{ marginBottom: "2rem" }}>
//         <div className="table-container">
//           <table className="commission-table">
//             <thead>
//               <tr className="table-header">
//                 <th>PIV Number</th>
//                 <th>Amount</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td colSpan="3" className="table-section-header">
//                   Application PIV Details
//                 </td>
//               </tr>
//               {applicationPivs.length > 0 ? (
//                 applicationPivs.map((item, index) => (
//                   <tr key={`app-${index}`} className="table-row">
//                     <td className="table-cell">{item.pivNo}</td>
//                     <td className="table-cell">
//                       Rs. {item.pivAmount.toLocaleString()}
//                     </td>
//                     <td className="table-cell">
//                       <span
//                         className={`status-badge ${getStatusBadgeClass(
//                           item.status
//                         )}`}
//                       >
//                         {getStatusText(item.status)}
//                       </span>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="3" className="no-data">
//                     No application PIV data found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Estimate PIV Details Table */}
//       <div>
//         <div className="table-container">
//           <table className="commission-table">
//             <thead>
//               <tr className="table-header">
//                 <th>PIV Number</th>
//                 <th>Amount</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td colSpan="3" className="table-section-header">
//                   Estimate PIV Details
//                 </td>
//               </tr>
//               {estimatePivs.length > 0 ? (
//                 estimatePivs.map((item, index) => (
//                   <tr key={`est-${index}`} className="table-row">
//                     <td className="table-cell">{item.pivNo}</td>
//                     <td className="table-cell">
//                       Rs. {item.pivAmount.toLocaleString()}
//                     </td>
//                     <td className="table-cell">
//                       <span
//                         className={`status-badge ${getStatusBadgeClass(
//                           item.status
//                         )}`}
//                       >
//                         {getStatusText(item.status)}
//                       </span>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="3" className="no-data">
//                     No estimate PIV data found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Status Legend */}
//         <div className="status-legend">
//           <div>
//             <span className="status-dot status-approved"></span> C = Confirmed
//           </div>
//           <div>
//             <span className="status-dot status-pending"></span> P = Pending
//           </div>
//           <div>
//             <span className="status-dot status-rejected"></span> N = New
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PivDetails;


// src/views/commission/PivDetails.js
import React, { useState, useEffect } from "react";

const PivDetails = ({ estimateNo }) => {
  const [pivData, setPivData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPivDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `http://localhost:8088/SPS/api/piv-details/by-estimate?estimateNo=${estimateNo}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Basic " + btoa("user:admin123"),
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch PIV details: ${response.status}`);
        }

        const data = await response.json();
        console.log("PIV Data:", data);
        setPivData(data);
      } catch (err) {
        console.error("Error fetching PIV details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (estimateNo) {
      fetchPivDetails();
    }
  }, [estimateNo]);

  // CORRECTED: Filter PIV data based on referenceType (SEC vs EST)
  const securityDepositPivs = pivData.filter(
    (item) => item.referenceType === "SEC"
  );

  const estimatePivs = pivData.filter(
    (item) => item.referenceType === "EST"
  );

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "C":
        return "status-approved"; // Confirmed
      case "P":
        return "status-pending"; // Pending
      case "N":
        return "status-rejected"; // New
      default:
        return "status-pending";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "C":
        return "Confirmed";
      case "P":
        return "Pending";
      case "N":
        return "New";
      default:
        return status;
    }
  };

  // CORRECTED: Function to get the appropriate amount based on referenceType
  const getPivAmount = (item) => {
    if (item.referenceType === "SEC") {
      return item.securityDeposit; // Use securityDeposit for SEC type
    } else if (item.referenceType === "EST") {
      return item.serConnOrElecSch; // Use serConnOrElecSch for EST type
    }
    return item.pivAmount; // Fallback to pivAmount
  };

  if (loading) {
    return (
      <div className="form-container">
        <h3 className="form-title">PIV Details</h3>
        <div className="loading-text">Loading PIV details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="form-container">
        <h3 className="form-title">PIV Details</h3>
        <div className="error-text">Error: {error}</div>
        <button
          onClick={() => window.location.reload()}
          className="retry-button"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    // <div className="form-container">
    //   <h3 className="form-title">PIV Details</h3>

    //   {/* Security Deposit PIV Details Table (was incorrectly called Application PIV) */}
    //   <div style={{ marginBottom: "2rem" }}>
    //     <div className="table-container">
    //       <table className="commission-table">
    //         <thead>
    //           <tr className="table-header">
    //             <th>PIV Number</th>
    //             <th>PIV Date</th>
    //             <th>Amount</th>
    //             <th>Payment Mode</th>
    //             <th>Status</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           <tr>
    //             <td colSpan="5" className="table-section-header">
    //               Security Deposit PIV Details
    //             </td>
    //           </tr>
    //           {securityDepositPivs.length > 0 ? (
    //             securityDepositPivs.map((item, index) => (
    //               <tr key={`sec-${index}`} className="table-row">
    //                 <td className="table-cell">{item.pivNo}</td>
    //                 <td className="table-cell">{item.pivDate}</td>
    //                 <td className="table-cell">
    //                   Rs. {item.securityDeposit?.toLocaleString() || "0"}
    //                 </td>
    //                 <td className="table-cell">
    //                   {item.paymentMode === "C" ? "Cash" : 
    //                    item.paymentMode === "CQ" ? "Cheque" : 
    //                    item.paymentMode || "N/A"}
    //                 </td>
    //                 <td className="table-cell">
    //                   <span
    //                     className={`status-badge ${getStatusBadgeClass(
    //                       item.status
    //                     )}`}
    //                   >
    //                     {getStatusText(item.status)}
    //                   </span>
    //                 </td>
    //               </tr>
    //             ))
    //           ) : (
    //             <tr>
    //               <td colSpan="5" className="no-data">
    //                 No security deposit PIV data found
    //               </td>
    //             </tr>
    //           )}
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>

    //   {/* Estimate PIV Details Table */}
    //   <div>
    //     <div className="table-container">
    //       <table className="commission-table">
    //         <thead>
    //           <tr className="table-header">
    //             <th>PIV Number</th>
    //             <th>PIV Date</th>
    //             <th>Amount</th>
    //             <th>Payment Mode</th>
    //             <th>Status</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           <tr>
    //             <td colSpan="5" className="table-section-header">
    //               Estimate PIV Details
    //             </td>
    //           </tr>
    //           {estimatePivs.length > 0 ? (
    //             estimatePivs.map((item, index) => (
    //               <tr key={`est-${index}`} className="table-row">
    //                 <td className="table-cell">{item.pivNo}</td>
    //                 <td className="table-cell">{item.pivDate}</td>
    //                 <td className="table-cell">
    //                   Rs. {item.serConnOrElecSch?.toLocaleString() || "0"}
    //                 </td>
    //                 <td className="table-cell">
    //                   {item.paymentMode === "C" ? "Cash" : 
    //                    item.paymentMode === "CQ" ? "Cheque" : 
    //                    item.paymentMode || "N/A"}
    //                 </td>
    //                 <td className="table-cell">
    //                   <span
    //                     className={`status-badge ${getStatusBadgeClass(
    //                       item.status
    //                     )}`}
    //                   >
    //                     {getStatusText(item.status)}
    //                   </span>
    //                 </td>
    //               </tr>
    //             ))
    //           ) : (
    //             <tr>
    //               <td colSpan="5" className="no-data">
    //                 No estimate PIV data found
    //               </td>
    //             </tr>
    //           )}
    //         </tbody>
    //       </table>
    //     </div>

    <div className="form-container">
    <h3 className="form-title">PIV Details</h3>

    {/* Security Deposit PIV Details Table */}
    <div style={{ marginBottom: "2rem" }}>
      <div className="table-container">
        <table className="commission-table" style={{ tableLayout: 'fixed', width: '100%' }}>
          <colgroup>
            <col style={{ width: '25%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '20%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '15%' }} />
          </colgroup>
          <thead>
            <tr className="table-header">
              <th>PIV Number</th>
              <th>PIV Date</th>
              <th>Amount</th>
              <th>Payment Mode</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="5" className="table-section-header">
                Security Deposit PIV Details
              </td>
            </tr>
            {securityDepositPivs.length > 0 ? (
              securityDepositPivs.map((item, index) => (
                <tr key={`sec-${index}`} className="table-row">
                  <td className="table-cell" style={{ wordWrap: 'break-word' }}>{item.pivNo}</td>
                  <td className="table-cell">{item.pivDate}</td>
                  <td className="table-cell">
                    Rs. {item.securityDeposit?.toLocaleString() || "0"}
                  </td>
                  <td className="table-cell">
                    {item.paymentMode === "C" ? "Cash" : 
                     item.paymentMode === "CQ" ? "Cheque" : 
                     item.paymentMode || "N/A"}
                  </td>
                  <td className="table-cell">
                    <span
                      className={`status-badge ${getStatusBadgeClass(
                        item.status
                      )}`}
                    >
                      {getStatusText(item.status)}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">
                  No security deposit PIV data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>

    {/* Estimate PIV Details Table */}
    <div>
      <div className="table-container">
        <table className="commission-table" style={{ tableLayout: 'fixed', width: '100%' }}>
          <colgroup>
            <col style={{ width: '25%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '20%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '15%' }} />
          </colgroup>
          <thead>
            <tr className="table-header">
              <th>PIV Number</th>
              <th>PIV Date</th>
              <th>Amount</th>
              <th>Payment Mode</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="5" className="table-section-header">
                Estimate PIV Details
              </td>
            </tr>
            {estimatePivs.length > 0 ? (
              estimatePivs.map((item, index) => (
                <tr key={`est-${index}`} className="table-row">
                  <td className="table-cell" style={{ wordWrap: 'break-word' }}>{item.pivNo}</td>
                  <td className="table-cell">{item.pivDate}</td>
                  <td className="table-cell">
                    Rs. {item.serConnOrElecSch?.toLocaleString() || "0"}
                  </td>
                  <td className="table-cell">
                    {item.paymentMode === "C" ? "Cash" : 
                     item.paymentMode === "CQ" ? "Cheque" : 
                     item.paymentMode || "N/A"}
                  </td>
                  <td className="table-cell">
                    <span
                      className={`status-badge ${getStatusBadgeClass(
                        item.status
                      )}`}
                    >
                      {getStatusText(item.status)}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">
                  No estimate PIV data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

        {/* Additional Information */}
        {/* <div style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#666" }}>
          <p><strong>Note:</strong></p>
          <ul>
            <li><strong>SEC</strong> (Security Deposit): Used for security deposit payments</li>
            <li><strong>EST</strong> (Estimate): Used for service connection/electricity scheme payments</li>
            <li>Payment Modes: C = Cash, CQ = Cheque</li>
          </ul>
        </div> */}

        {/* Status Legend */}
        {/* <div className="status-legend">
          <div>
            <span className="status-dot status-approved"></span> C = Confirmed
          </div>
          <div>
            <span className="status-dot status-pending"></span> P = Pending
          </div>
          <div>
            <span className="status-dot status-rejected"></span> N = New
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default PivDetails;