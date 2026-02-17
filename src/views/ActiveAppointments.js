import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const ActiveAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  // Get logged-in user's username (adjust based on your auth system)
  const getLoggedInUsername = () => {
    // Method 1: From localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        return user.username || user.userId || user.email || "DEFAULT_USER";
      } catch (e) {
        console.error("Error parsing user data:", e);
        return "DEFAULT_USER";
      }
    }
    
    // Method 2: From sessionStorage
    const sessionUser = sessionStorage.getItem("username");
    if (sessionUser) return sessionUser;
    
    
    return "DEFAULT_USER"; // Fallback
  };

  // Function to fetch appointments from API
  const fetchAppointments = async (allocatedTo) => {
    try {
      setLoading(true);
      setError(null);
      
      // Base URL from environment variables
      const baseURL = process.env.REACT_APP_API_BASE_URL || "http://10.128.1.59:8080/SPSNEW";
      
      const response = await axios.get(
        `${baseURL}/api/v1/spestedycon/appointments/${allocatedTo}`,
        {
          timeout: 10000, // 10 second timeout
          headers: {
            'Content-Type': 'application/json',
            // Add authorization header if needed
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      // Transform API response to match expected format
      const transformedData = response.data.map((item, index) => {
        // Assuming API returns array of [westimateNo, description] or objects
        if (Array.isArray(item)) {
          return {
            id: index + 1,
            westimateNo: item[0] || "N/A",
            description: item[1] || "No description"
          };
        } else if (typeof item === 'object') {
          return {
            id: index + 1,
            westimateNo: item.westimateNo || item.westimateNumber || "N/A",
            description: item.description || "No description"
          };
        }
        return {
          id: index + 1,
          westimateNo: "N/A",
          description: "Invalid data format"
        };
      });
      
      setAppointments(transformedData);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      
      // Error handling
      if (err.response) {
        // Server responded with error status
        if (err.response.status === 404) {
          setError(`No appointments found for user: ${allocatedTo}`);
        } else if (err.response.status === 401) {
          setError("Unauthorized. Please login again.");
          // Redirect to login if unauthorized
          history.push("/login");
        } else {
          setError(`Server error: ${err.response.status} - ${err.response.data?.message || err.response.statusText}`);
        }
      } else if (err.request) {
        // Request made but no response
        setError("Network error. Please check your connection.");
      } else {
        // Other errors
        setError(`Error: ${err.message}`);
      }
      
      // Fallback to dummy data for testing (remove in production)
      console.warn("Using dummy data due to API error");
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const username = getLoggedInUsername();
    
    if (username) {
      fetchAppointments(username);
    } else {
      setError("User not logged in. Please login first.");
      // Optionally redirect to login
      // history.push("/login");
    }
  }, []); // Empty dependency array means run once on mount

  const handleWestimateNoClick = (westimateNo) => {
    const username = getLoggedInUsername();
    
    // Store in sessionStorage so EstimationTable can access it
    sessionStorage.setItem("westimateNo", westimateNo);
    sessionStorage.setItem("allocatedTo", username);
    
    // Or pass via state
    history.push({
      pathname: "/admin/peggingSchedule",
      state: { 
        westimateNo: westimateNo,
        allocatedTo: username 
      }
    });
  };

    // Function to download user guide PDF
  const downloadUserGuide = () => {
    // Replace this URL with the actual path to your user guide PDF
    const userGuideUrl = "/User_guide.pdf"; // Relative path to your PDF in public folder
    
    // Alternatively, if you have an absolute URL:
    // const userGuideUrl = "https://your-domain.com/path/to/user-guide.pdf";
    
    // Create a temporary anchor element to trigger download
    const link = document.createElement("a");
    link.href = userGuideUrl;
    link.download = "User_Guide.pdf"; // Name of the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Refresh appointments
  const handleRefresh = () => {
    const username = getLoggedInUsername();
    if (username) {
      fetchAppointments(username);
    }
  };

  if (loading) {
    return (
      <div className="w-full p-4">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <div className="ml-3 text-gray-500">Loading appointments...</div>
        </div>
      </div>
    );
  }

  if (error && appointments.length === 0) {
    return (
      <div className="w-full p-4">
        <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg">
          <div className="font-semibold">Error</div>
          <div className="mt-1">{error}</div>
          <div className="mt-3">
            <button 
              onClick={handleRefresh}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
            >
              Retry
            </button>
            <button 
              onClick={() => history.push("/login")}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-2 sm:px-3 md:px-4">
      <div className="relative flex flex-row w-full min-w-0 p-4 bg-white rounded shadow-lg">
        <div className="w-full">
          {/* Header section with refresh button */}
          <div className="mb-4">
            <div className="flex justify-between items-center px-3 py-2 bg-blue-100 rounded-t-lg">
              <h2 className="text-sm font-semibold text-blueGray-700">
                Active Appointments
              </h2>
              <button
                onClick={downloadUserGuide}
                className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
                title="Download User Guide PDF"
              >
                <svg 
                  className="w-4 h-4 mr-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
                User Guide
              </button>
            </div>
          </div>
          
          {/* Content area */}
          <div className="p-4 bg-white border rounded-b-lg">
            {error && (
              <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded text-yellow-700 text-sm">
                <strong>Note:</strong> {error} (Showing cached/dummy data)
              </div>
            )}
            
            {appointments.length === 0 ? (
              <div className="text-center p-8 text-gray-500">
                <div className="text-lg mb-2">No active appointments found</div>
                <div className="text-sm">
                  No appointments allocated to user: <strong>{getLoggedInUsername()}</strong>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-bold text-black uppercase tracking-wider">
                        Work Estimation Number
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-bold text-black uppercase tracking-wider">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {appointments.map((appointment) => (
                      <tr key={appointment.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <button
                            onClick={() => handleWestimateNoClick(appointment.westimateNo)}
                            className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300 rounded px-2 py-1"
                            title="Click to view pegging schedule"
                          >
                            {appointment.westimateNo}
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm text-gray-700">
                            {appointment.description}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-gray-200 text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="mb-2 sm:mb-0">
                Showing {appointments.length} appointment(s) for user:{" "}
                <strong>{getLoggedInUsername()}</strong>
              </div>
              <div className="text-right">
                <div>Last updated: {new Date().toLocaleTimeString()}</div>
                <button
                  onClick={handleRefresh}
                  className="mt-1 text-blue-500 hover:text-blue-700 text-xs"
                >
                  Refresh now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveAppointments;