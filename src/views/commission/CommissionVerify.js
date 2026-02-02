import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./commission.css";
import OrderCardPopup from "components/Tabs/OrderCardPopup";
import OrderCardPopupTest from "components/Tabs/OrderCardPopupTest";

// from grok
// import OrderCardPopupNew from "components/Tabs/OrderCardPopupNew";
import OrderCardPopupNewEdit from "components/Tabs/OrderCardPopupNewEdit";

export default function CommissionVerify({ color }) {
  const [commissions, setCommissions] = useState([]); // Stores the original data from API
  const [filteredCommissions, setFilteredCommissions] = useState([]); // Stores filtered/search results
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // New state to track expanded rows (using Set for unique estimateNo)
  const [expandedRows, setExpandedRows] = useState(new Set());

  // //this is for OrderCardPopup changes
  // const [showOrderCardPopup, setShowOrderCardPopup] = useState(false);

  // // Simple function to open the popup
  // const openOrderCard = () => {
  //   setShowOrderCardPopup(true);
  // };

  // // Simple function to close the popup
  // const closeOrderCard = () => {
  //   setShowOrderCardPopup(false);
  // };

  // grok
  // const [isPopupOpen, setIsPopupOpen] = useState(false);  // Removed global popup state

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
        const data = await response.json(); // Converts response body from JSON to JavaScript object

        // Transform the API data to match our component structure
        const transformedData = data.map((item, index) => ({
          id: index + 1,
          estimateNo: item.estimateNo, // Ensure this is the full estimateNo (e.g., "501.20/BS/13/0001/1")
          projectNo:item.projectNo,
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
      case 1:
        return "pending";
      case 2:
        return "approved";
      case 3:
        return "rejected";
      case 4:
        return "forwarded";
      default:
        return "pending";
    }
  };

  // Get status display text
  const getStatusDisplayText = (status) => {
    switch (status) {
      case "approved":
        return "Approved";
      case "rejected":
        return "Rejected";
      case "forwarded":
        return "Forwarded";
      default:
        return "Pending";
    }
  };

  // useEffect runs once when component mounts
  // Calls fetchCommissionDetails() to load data
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

  // this is added nwly for refresh data
  useEffect(()=>{
    // This will run when the component mounts and whenever expandedRows changes
  // It will refresh data when any popup closes (when expandedRows gets smaller)
  },[expandedRows]);

  const totalPages = Math.ceil(filteredCommissions.length / rowsPerPage);
  const currentData = filteredCommissions.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "approved":
        return "status-approved";
      case "rejected":
        return "status-rejected";
      case "forwarded":
        return "status-forwarded";
      default:
        return "status-pending";
    }
  };

  // Function to toggle expansion for a specific row
  const toggleRow = (estimateNo) => {
    setExpandedRows((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(estimateNo)) {
        newExpanded.delete(estimateNo);
        // Refresh data when closing a popup 
        //this added newly to fix the of status updated as 10 immediately
      fetchCommissionDetails();
      } else {
        newExpanded.add(estimateNo);
      }
      return newExpanded;
    });
  };

  //this for update status as 10 pcesthmt table when click forward button
  //basically doing is status 10 means .that only show edit,and forward state
  const updateEstimateStatus10 = async (estimateNo, deptId) => {
    try {
      const response = await fetch(
        `${baseUrl}/api/pcesthmt/update-status-to-10?estimateNo=${encodeURIComponent(estimateNo)}&deptId=${encodeURIComponent(deptId)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa("user:admin123"),
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to update estimate status");
      }
      console.log("Status updated successfully for estimate:", estimateNo);
      toast.success("Forwarded order card successfully!");

      // Refresh the data from API to get updated status
      fetchCommissionDetails();

      return true;
    } catch (error) {
      console.error("Error updating estimate status:", error);
      throw error; // Re-throw to handle in the main function
    }
  };

  const updateEstimateStatus11 = async (estimateNo, deptId) => {
    try {
      const response = await fetch(
        `${baseUrl}/api/pcesthmt/update-status-to-11?estimateNo=${encodeURIComponent(estimateNo)}&deptId=${encodeURIComponent(deptId)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa("user:admin123"),
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to update estimate status");
      }
      console.log("Status updated successfully for estimate:", estimateNo);

      // Create approval log with the appropriate status
      await createApprovalLog(estimateNo, deptId, 12, 11); // From status 12 to new status (13)

      toast.success("Rejected order card successfully!");

      // Refresh the data from API to get updated status
      fetchCommissionDetails();

      return true;
    } catch (error) {
      console.error("Error updating estimate status:", error);
      throw error; // Re-throw to handle in the main function
    }
  };
  

  //this for update status as 12 pcesthmt table when click forward button
  //basically doing is status 12 means that only show to area enginer
  const updateEstimateStatus13 = async (estimateNo, deptId) => {
    try {
      const response = await fetch(
        `${baseUrl}/api/pcesthmt/update-status-to-13?estimateNo=${encodeURIComponent(estimateNo)}&deptId=${encodeURIComponent(deptId)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa("user:admin123"),
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to update estimate status");
      }
      console.log("Status updated successfully for estimate:", estimateNo);

      // Create approval log with the appropriate status
      await createApprovalLog(estimateNo, deptId, 12, 13); // From status 12 to new status (13)

      toast.success("Forwarded order card successfully!");

      // Refresh the data from API to get updated status
      fetchCommissionDetails();

      return true;
    } catch (error) {
      console.error("Error updating estimate status:", error);
      throw error; // Re-throw to handle in the main function
    }
  };


    // this fn for update logs when forward order card
    const createApprovalLog = async (referenceNo, deptId, fromStatus, toStatus) => {
      try {
        // Get user details from session storage
        const userId = sessionStorage.getItem("userId") || "";
        const userLevel = sessionStorage.getItem("userLevel") || "";
        
        // Format status to 2 digits (pad with leading zero)

        //icomment this because i supply the value for fromStatus
        // const formattedFromStatus = fromStatus.toString().padStart(2, '0');
        // const formattedToStatus = toStatus.toString().padStart(2, '0');
        
        console.log(`Creating approval log: ${referenceNo} status ${fromStatus} -> ${toStatus}`);
        
        // Prepare approval log data
        const approvalLogData = {
          referenceNo: referenceNo.trim(),
          deptId: deptId.trim(),
          // approvalType: "ORD_VLDT", // Order card approval "ORD_VLDT" Mean ordercard Validated
          approvalType: (fromStatus<toStatus) ? "ORD_VRFD" : "ORD_RJCT",
          approvedLevel: userLevel,
          fromStatus: fromStatus,
          toStatus: toStatus,
          approvedBy: userId,
          reason:  (fromStatus<toStatus) ? "Order card Verified" : "Order card Rejected",
          // standardCost: 0, // You can pass actual values if available
          // detailedCost: formData.estAmount || 0, // Using estimate amount as detailed cost
          systemBy: "SPS"
        };

        // Call the approval log API
        const response = await fetch(
          `${baseUrl}/api/approval-log/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Basic " + btoa("user:admin123"),
            },
            body: JSON.stringify(approvalLogData),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to create approval log");
        }

        const approvalResponse = await response.json();
        console.log("Approval log created:", approvalResponse);
        return approvalResponse;
        
      } catch (error) {
        console.error("Error creating approval log:", error);
        toast.warning("Approval log creation failed");
        return null;
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
            {/* <h2 className={`commission-title ${color}`}>
              Commission Management
            </h2> */}
            <h2 className={`commission-title ${color}`}>
            VERIFY ORDER CARD 
            </h2>
          </div>

          {/* Removed global popup rendering */}

          {/* new for order card  */}
          {/* {showOrderCardPopup && (
        <OrderCardPopup
          isOpen={showOrderCardPopup}
          onClose={closeOrderCard}
        />
      )} */}

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
                  <th>Total Cost ( LKR)</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                  
                  
                </tr>
              </thead>
              <tbody>
                {currentData.length > 0 ? (
                  currentData.map((c) => (
                    <>
                      <tr key={`${c.estimateNo}-${c.id}`} className="table-row">
                        <td className="table-cell">{c.estimateNo}</td>
                        <td className="table-cell">{c.projectNo}</td>
                        <td className="table-cell">{c.deptId}</td>
                        <td className="table-cell text-right" >
                          {/* Rs. {c.totalCost?.toLocaleString() || 0} */}
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
                          <span
                            className={`status-badge ${getStatusBadgeClass(
                              c.status
                            )}`}
                          >
                            {getStatusDisplayText(c.status)}
                          </span>
                        </td>
                        <td className="table-cell">
                          <div className="action-buttons">
                            {/* this is uri encoded uri */}
                            <Link
                              to={`/admin/commission/verify/${encodeURIComponent(
                                c.estimateNo
                              )}`}
                            >
                              <button className="view-button">View</button>
                            </Link>

                            {/* this is new buton */}
                            <button
                              className="view-button"
                              onClick={() => toggleRow(c.estimateNo)}
                            >
                              View Order Card {expandedRows.has(c.estimateNo) ? '▲' : '▼'}
                            </button>

                            {/* grok - Modified to toggle expand/collapse */}
                            <button 
                              className="view-button accept"
                              onClick={() => updateEstimateStatus13(c.estimateNo,c.deptId)}
                            >
                              {/* Edit Order Card {expandedRows.has(c.estimateNo) ? '▲' : '▼'} */}
                            Forward To Area
                            </button>

                            <button 
                              className="view-button"
                              onClick={() => updateEstimateStatus11(c.estimateNo,c.deptId)}
                            >
                              {/* Edit Order Card {expandedRows.has(c.estimateNo) ? '▲' : '▼'} */}
                            Reject
                            </button>
                           
                          </div>
                        </td>
                      </tr>
                      {/* Expanded row for OrderCardPopupNewEdit */}
                      {expandedRows.has(c.estimateNo) && (
                        <tr>
                          <td colSpan="7">
                            <OrderCardPopupNewEdit
                              isOpen={true}
                              onClose={() => toggleRow(c.estimateNo)}
                              estimateNo={c.estimateNo} //parsing estimate number as prop to ordercard
                              projectNumber={c.projectNo} //parsing project number as prop to ordercard 
                              deptId={c.deptId} // parsing deptId as a prop to orderCard
                              submitDisabled={true}  // or false based on your condition
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
    </div>
  );
}