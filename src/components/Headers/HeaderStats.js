import React, { useState, useEffect } from "react";
import CardStats from "components/Cards/CardStats.js";
import { useHistory } from "react-router-dom";
import axios from "axios";

//NEW: Import useUser hook to get dynamic menu data
import { useUser } from "context/UserContext";

export default function HeaderStats() {
  // State for storing data from backend
  const [pendingAllocationData, setPendingAllocationData] = useState([]);
  const [standardEstimatesData, setStandardEstimatesData] = useState([]);
  const [applicationNumberData, setApplicationNumberData] = useState([]);
  const [confirmedPiviiData, setConfirmedPiviiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [estimatesLoading, setEstimatesLoading] = useState(true); // Add loading state for estimates
  const [error, setError] = useState(null);
  const [estimatesError, setEstimatesError] = useState(null); // Add error state for estimates
  const history = useHistory();

  //state for Commission data
  const [commissionData, setCommissionData] = useState([]);

  // NEW: Get menu data from UserContext
  const { mainMenus, menuTasks } = useUser();

  // NEW: Get commission menu tasks dynamically
  const getCommissionTasks = () => {
    // Find the commission menu (you might need to adjust the condition based on your actual menu structure)
    const commissionMenu = mainMenus.find(menu => 
      menu.menuCode === 'CCM' || "CCA" || "CCC" || 
      menu.displayName?.toLowerCase().includes('commission')
    );
    
    if (commissionMenu && menuTasks[commissionMenu.menuCode]) {
      return menuTasks[commissionMenu.menuCode];
    }
    return [];
  };

  const commissionTasks = getCommissionTasks();

  console.log("this is commissionTasks:", commissionTasks );



  // Updated click handler to pass application number
  const handlePendingAllocationClick = (applicationNo = null) => {
    console.log("Pending Allocation number clicked:", applicationNo);

    if (applicationNo) {
      // Navigate to schedule2 with application number as URL parameter
      history.push(
        `/schedule2?applicationNo=${encodeURIComponent(applicationNo)}`
      );
    } else {
      // Navigate to schedule2 without specific application number
      history.push("/schedule2");
    }
  };

  // Fetch estimates data from the backend
  useEffect(() => {
    const fetchEstimatesData = async () => {
      try {
        setEstimatesLoading(true);
        console.log("Starting API call to fetch estimates data...");

        const response = await fetch(
          "http://127.0.0.1:8081/SPSNEW/api/application/all",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Basic " + btoa("user:admin123"),
            },
            credentials: "include",
          }
        );

        console.log("Estimates API Response status:", response.status);
        console.log("Estimates API Response ok:", response.ok);

        if (!response.ok) {
          const errorText = await response.text();
          console.error(
            `HTTP error! Status: ${response.status}, Response: ${errorText}`
          );
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Estimates API Response data:", data);

        // Process the estimates data to include application numbers
        if (Array.isArray(data)) {
          const formattedData = data.map((applicationNo) => ({
            value: applicationNo,
            applicationNo: applicationNo, // Store the application number for clicking
            label: `App: ${applicationNo}`,
          }));
          setPendingAllocationData(formattedData);
        } else {
          console.warn("Unexpected estimates data format from API:", data);
          setPendingAllocationData([]);
        }

        setEstimatesLoading(false);
      } catch (err) {
        console.error("Error fetching estimates data:", err);
        setEstimatesError("Failed to load estimates data");
        setEstimatesLoading(false);
        setPendingAllocationData([]);
      }
    };

    fetchEstimatesData();
  }, []);

  // Fetch application data from the backend (existing code)
  useEffect(() => {
    const fetchApplicationData = async () => {
      try {
        setLoading(true);
        console.log("Starting API call to fetch application data...");

        const response = await fetch(
          "http://127.0.0.1:8081/SPSNEW/api/application/all",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Basic " + btoa("user:admin123"),
            },
            credentials: "include",
          }
        );

        console.log("API Response status:", response.status);
        console.log("API Response ok:", response.ok);

        if (!response.ok) {
          const errorText = await response.text();
          console.error(
            `HTTP error! Status: ${response.status}, Response: ${errorText}`
          );
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response data:", data);

        if (Array.isArray(data)) {
          const formattedData = data.map((applicationNo) => ({
            value: applicationNo,
          }));
          setApplicationNumberData(formattedData);
        } else if (data && Array.isArray(data.applications)) {
          const formattedData = data.applications.map((applicationNo) => ({
            value: applicationNo,
          }));
          setApplicationNumberData(formattedData);
        } else {
          console.warn("Unexpected data format from API:", data);
          setApplicationNumberData([]);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching application data:", err);
        setError("Failed to load application data");
        setLoading(false);
        setApplicationNumberData([]);
      }
    };

    fetchApplicationData();
  }, []);

  // Static data for other cards
  useEffect(() => {
    setStandardEstimatesData([
      { label: "Residential", value: 32 },
      { label: "Commercial", value: 25 },
      { label: "Industrial", value: 20 },
      { label: "Total", value: 77 },
    ]);

    setConfirmedPiviiData([
      { label: "Last 24 Hours", value: 5 },
      { label: "Last 7 Days", value: 9 },
      { label: "Total", value: 14 },
    ]);
  }, []);

  //useEffect for commisson data
  useEffect(() => {
    setStandardEstimatesData([
      { label: "Residential", value: 32 },
      { label: "Commercial", value: 25 },
      { label: "Industrial", value: 20 },
      { label: "Total", value: 77 },
    ]);

    setConfirmedPiviiData([
      { label: "Last 24 Hours", value: 5 },
      { label: "Last 7 Days", value: 9 },
      { label: "Total", value: 14 },
    ]);

    // Commission dummy data
    setCommissionData([
      { label: "Approved", value: 6 },
      { label: "Pending", value: 3 },
      { label: "Rejected", value: 2 },
      { label: "Total", value: 11 },
    ]);
  }, []);

  // Extract application numbers for validation
  const applicationNumbers = applicationNumberData.map((item) => item.value);

  // Extract estimate numbers for validation
  const estimateNumbers = pendingAllocationData.map((item) => item.value);

  return (
    <>
      {/* Header */}
      <div
        style={{ backgroundColor: "#b23200" }}
        className="relative md:pt-24 pb-16 pt-12"
      >
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              {/* <div className="w-full lg:w-6/12 xl:w-3/12 px-4 pt-4">
                <CardStats
                  statSubtitle={`Pending Allocation (${pendingAllocationData.length})`}
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                  statsData={pendingAllocationData}
                  navigatePath="/schedule2"
                  isLoading={estimatesLoading}
                  hasError={estimatesError}
                  validNumbers={estimateNumbers}
                  onNumberClick={() => handlePendingAllocationClick()} // General click
                  onItemClick={handlePendingAllocationClick} // Individual item click with applicationNo
                  isClickable={true}
                  showItemList={true} // Add this prop to show the list
                />
              </div> */}
              {/* <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Standard Estimates Pending Data Entry (77)"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                  statsData={standardEstimatesData}
                  navigatePath="/estimation/estimate"
                />
              </div> */}
              {/* <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle={`Application Number (${applicationNumberData.length})`}
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                  statsData={applicationNumberData}
                  navigatePath="/application/new"
                  isLoading={loading}
                  hasError={error}
                  validNumbers={applicationNumbers}
                />
              </div> */}
              {/* <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Confirmed PIVII (New Format) (14)"
                  statIconName="fas fa-percent"
                  statIconColor="bg-lightBlue-500"
                  statsData={confirmedPiviiData}
                  navigatePath="/piv/newPiv"
                />
              </div> */}

            {/* OLD STATIC CARDS - COMMENTED OUT FOR REFERENCE */}
              {/* Add the Commission Card */}


              {/* this is the previous commisson card */}
              {/* <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mt-4">
                <CardStats
                  statSubtitle={`Commission (${commissionData.reduce(
                    (sum, item) => sum + item.value,
                    0
                  )})`}
                  statTitle={commissionData
                    .reduce((sum, item) => sum + item.value, 0)
                    .toString()}
                  statIconName="fas fa-balance-scale"
                  // statIconColor="bg-lightBlue-500"
                  statIconColor="bg-red-500"
                  statsData={commissionData}
                  navigatePath="/admin/commission"
                  isClickable={true}
                  onItemClick={() => history.push("/admin/commission")} // Add this handler
                />
              </div> */}
              
              {/* this for edit Commission  card */}
              {/* this is the previous edit commisson card */}
              {/* <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mt-4">
                <CardStats
                  statSubtitle={`Edit Commission (${commissionData.reduce(
                    (sum, item) => sum + item.value,
                    0
                  )})`}
                  statTitle={commissionData
                    .reduce((sum, item) => sum + item.value, 0)
                    .toString()}
                  statIconName="fas fa-balance-scale"
                  // statIconColor="bg-lightBlue-500"
                  statIconColor="bg-red-500"
                  statsData={commissionData}
                  navigatePath="/admin/commission/edit"
                  isClickable={true}
                  onItemClick={() => history.push("/admin/commission/edit")} // Add this handler
                />
              </div> */}



              {/* DYNAMIC COMMISSION CARDS */}
              {/* NEW: Render commission cards dynamically based on backend tasks */}
              {/* previous working code without pathmatching */}
              {/* {commissionTasks.map((task, index) => (
                <div key={task.activityCode} className="w-full lg:w-6/12 xl:w-3/12 px-4 mt-4">
                  <CardStats
                  //IN HERE YOU CAN MODIFY BACKEND DYNAMIC OUTPUT 
                  //RELATED TO FRONTEND EXPECTED UI
                    statSubtitle={`${task.activityName} (${commissionData.reduce(
                      (sum, item) => sum + item.value,
                      0
                    )})`}
                    statTitle={commissionData
                      .reduce((sum, item) => sum + item.value, 0)
                      .toString()}
                    statIconName="fas fa-balance-scale"
                    statIconColor="bg-red-500"
                    statsData={commissionData}
                    navigatePath={
                      task.activityName.toLowerCase().includes('add') 
                        ? "/admin/commission" 
                        : "/admin/commission/edit"
                    }
                    isClickable={true}
                    onItemClick={() => 
                      task.activityName.toLowerCase().includes('add')
                        ? history.push("/admin/commission")
                        : history.push("/admin/commission/edit")
                    }
                  />
                </div>
              ))} */}

              
               {/* NEW: DYNAMIC COMMISSION CARDS WITH STRUCTURED MAPPING */}
              {/* CHANGED: Updated commission cards mapping with structured path mapping */}
              {commissionTasks.map((task, index) => {
                // NEW: Define path mappings for different activity types
                const pathMappings = {
                  add: "/admin/commission",
                  create: "/admin/commission",
                  edit: "/admin/commission/edit",
                  update: "/admin/commission/edit",
                  forward: "/admin/commission/forward",
                  validate:"/admin/commission/validate",
                  verify:"/admin/commission/verify",
                  pegging:"/admin/peggingShedule",
                  default: "/admin/commission/default"
                };

                // NEW: Find the matching path based on activity name
                const getNavigatePath = (activityName) => {
                  const lowerName = activityName.toLowerCase();
                  
                  for (const [key, path] of Object.entries(pathMappings)) {
                    if (lowerName.includes(key) && key !== 'default') {
                      return path;
                    }
                  }
                  
                  return pathMappings.default;
                };

                const navigatePath = getNavigatePath(task.activityName);

                return (
                  <div key={task.activityCode} className="w-full lg:w-6/12 xl:w-3/12 px-4 mt-4">
                    <CardStats
                    //IN HERE YOU CAN MODIFY BACKEND DYNAMIC OUTPUT 
                    //RELATED TO FRONTEND EXPECTED UI

                    //this statSubtitle comment because 
                    // the showing number part is not working correcctly
                      // statSubtitle={`${task.activityName} (${commissionData.reduce(
                      //   (sum, item) => sum + item.value,
                      //   0
                      // )})`}

                      statSubtitle={`${task.activityName}`}
                      statTitle={commissionData
                        .reduce((sum, item) => sum + item.value, 0)
                        .toString()}
                      statIconName="fas fa-balance-scale"
                      statIconColor="bg-red-500"
                      statsData={commissionData}
                      navigatePath={navigatePath}
                      isClickable={true}
                      onItemClick={() => history.push(navigatePath)}
                    />
                  </div>
                );
              })}




              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
