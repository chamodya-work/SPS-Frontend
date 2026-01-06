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