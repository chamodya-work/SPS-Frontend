import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const MANAGER_FIELD_STYLE = "bg-red-100";



const OrderCardPopupNew = ({ isOpen, onClose, estimateNo,projectNumber,deptId,status }) => {


const [userLevel, setUserLevel] = useState(null); // Add this line to store user level

 
  const [formData, setFormData] = useState({
    newAccountNo: "",
    accountNo: "",
    orderCardNo: "",
    projectNo: "",
    ocRefNo: "",
    dateIssued: "",
    nameOfConsumer: "",
    addressOfSupply: "",
    ncrNo: "",
    pivNo: "",
    pivDate: "",
    contactDemand: "",
    // tariff: "",
    deposit: "",
    kvaMeterNo: "",
    kvaRatio: "",
    kwhMeterNo: "",
    kwhRatio: "",
    ctRatio: "",
    multiplyingFactorKva: "",
    multiplyingFactorKwh: "",
    meterFixedRemoved: "",
    meterNo: "",
    readingKwhKva: "",
    dateInstalled: "",
    meterRatio: "",
    sin: "",
    capacityKva: "",
    transformerNo: "",
    meterType: "",
    meterInstalledBy: "",
    installedDate: "",
    esCscName: "",
    esCscDate: "",
    areaEngineerCert: "",
    multFactorConfirm: "",
    mtr1Set: "",
    mtr2Set: "",
    mtr3Set: "",
    mtrSeq: "",
    mtrOrder: "",
    mtrType: "",
    noOfPhases: "",
    mtrNbr: "",
    prsntRdn: "",
    ctRatioAdditional: "",
    mtrRatioAdditional: "",
    mFactor: "",
    effctDate: "",
    brCode: "",
    fixMeter: false,
    testMeter: false,
    connectMeter: false,
    readMeter: false,
    disconnectMains: false,
    removeMains: false,
    reconnectMains: false,
    refixMeter: false,
    specialReading: false,
    changeMeter: false,
    consumerChange: false,
    customerCategory: "",
    natureOfSupplyCategory: "",
    mtrsetType: "",
    areaCode: "",
    depoCode: "",
    estPivNumber: "",
    estAmount: "",
    estPayDate: "",
    depPivNumber: "",
    depositAmount: "",
    depositDate: "",
    tariffJobDetails: "",
    totalSecDeposit: "",
    connectionDate: "",
    numberOfPhase: "",
    taxNumber: "",
    deptId:deptId,
    isicNumber:"",
    customerOwnershipType:"",
    tariffType:"",
    loanAmount: "",
    isLoanApp: "",
    loanType:"A04",
    jobType:"",
    voltageLevel:"",
    sectionId:""
  });
  // this is for testing dept code 

  console.log("this is test estimate :",estimateNo);
  console.log("this is trim estimate:",estimateNo.trim());
  console.log("this is test project :",projectNumber)
  console.log("this is loan amount"+ formData.loanAmount)

  console.log("this is dept  form deep id test "+ formData.deptId);
  // this for table expanded or no
  const [isTableExpanded, setIsTableExpanded] = useState(false);
  // state to hold table data
  const [tableData, setTableData] = useState([]);
  // state to hold the mtr types
  const [mtrTypes, setMtrTypes] = useState([]);
  const [loading, setLoading] = useState(false);


  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  // Fetch applicant data when estimateNo changes
  // useEffect(() => {
  //   if (estimateNo && isOpen) {
  //     fetchApplicantData();
  //   }
  // }, [estimateNo, isOpen]);

  // Fetch applicant data from API
  // const fetchApplicantData = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await fetch(
  //       `${baseUrl}/api/applicants/by-estimate?estimateNo=${encodeURIComponent(estimateNo)}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Basic " + btoa("user:admin123"),
  //         },
  //       }
  //     );

  //     if (response.ok) {
  //       const data = await response.json();
  //       if (data && data.length > 0) {
  //         const applicant = data[0];
          
  //         // Update form data with applicant information
  //         setFormData(prev => ({
  //           ...prev,
  //           nameOfConsumer: applicant.fullName || "",
  //           addressOfSupply: applicant.streetAddress || "",
  //           projectNo:projectNumber || "",
            

  //           // Add more fields as needed from the API response
  //           // You can map additional fields here based on your form requirements
  //         }));
          
  //         console.log("Applicant data loaded:", applicant);
  //       }
  //     } else {
  //       throw new Error("Failed to fetch applicant data");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching applicant data:", error);
  //     toast.error("Failed to load applicant data!");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

    // Fetch all data when estimateNo changes
    useEffect(() => {
      if (estimateNo && isOpen) {
        fetchAllData();
      }
    }, [estimateNo, isOpen]);

    // Fetch all data when estimateNo changes
  useEffect(() => {
    if (estimateNo && isOpen) {
      fetchAllData();
    }
  }, [estimateNo, isOpen]);

    // Fetch next order card number
    const fetchNextOrderCardNo = async () => {
      try {
        const response = await fetch(
          // `${baseUrl}/api/order-cards/next-order-card-no?projectNo=${encodeURIComponent(projectNumber)}`,
          `${baseUrl}/api/order-cards/next-order-card-no?deptId=${encodeURIComponent(deptId)}`,
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
          setFormData(prev => ({
            ...prev,
            orderCardNo: data.nextOrderCardNo
          }));
          console.log("Generated Order Card No:", data.nextOrderCardNo);
        } else {
          throw new Error("Failed to generate order card number");
        }
      } catch (error) {
        console.error("Error generating order card number:", error);
        toast.error("Failed to generate order card number!");
        // Fallback: Set empty if API fails
        setFormData(prev => ({
          ...prev,
          orderCardNo: ""
        }));
      }
    };


  // Fetch all data from multiple APIs

  // ---------this is commented because i tested new fetchAll data endpoint

  const fetchAllData = async () => {
    try {
      setLoading(true);

      const userLevel = sessionStorage.getItem("userLevel"); //for get the user Level
      // Store user level in state
      setUserLevel(userLevel);


    // Set current date automatically in CUSTOMER & JOB DETAILS
    const currentDate = new Date().toISOString().split('T')[0];

    
    console.log("this is current data :",currentDate);
    // const estimateNo=estimateNo.trim();
      
      // Define all API endpoints
      const apiEndpoints = [
        {
          url: `${baseUrl}/api/applicants/by-estimate?estimateNo=${encodeURIComponent(estimateNo.trim())}`,
          processor: (data) => {
            if (data && data.length > 0) {
              const applicant = data[0];
              return {
                nameOfConsumer: applicant.fullName || "",

                // //THIS IS FOR TESTING NAME IS AVAILABLE IN THE TEST DATABSE
                // nameOfConsumer: applicant.firstName || "",


                // addressOfSupply: applicant.streetAddress || "",
                projectNo: projectNumber,
                dateIssued: currentDate,
              };
            }
            return {};
          }
        },
        {
          url: `${baseUrl}/api/application/details?estimateNo=${encodeURIComponent(estimateNo.trim())}`,
          processor: (data) => {
            if (data && data.length > 0) {
              const application = data[0];
              return {
                contactDemand: application.demand || "",
                addressOfSupply:application.fullAddress || "",
              };
            }
            return {};
          }
        },

        //  THIS NEW API ENDPOINT FOR PIV DETAILS
      {
        url: `${baseUrl}/api/piv-details/by-estimate?estimateNo=${encodeURIComponent(estimateNo.trim())}`,
        processor: (data) => {
          if (data && data.length > 0) {
            const pivData = {};
            
            // Process each PIV item in the response array
            data.forEach(item => {
              if (item.referenceType === "SEC") {
                // Map to deposit fields
                pivData.depPivNumber = item.pivNo || "";
                pivData.depositDate = item.pivDate || "";
                pivData.depositAmount = item.securityDeposit || "";
              } else if (item.referenceType === "EST") {
                // Map to estimate fields
                pivData.estPivNumber = item.pivNo || "";
                pivData.estPayDate = item.pivDate || "";
                pivData.estAmount = item.serConnOrElecSch || "";
              }
            });
            
            return pivData;
          }
          return {};
        }
      },
      // NEW: Added loan details API endpoint
      {
        url: `${baseUrl}/api/loan-details/by-estimate?estimateNo=${encodeURIComponent(estimateNo.trim())}`,
        processor: (data) => {
          if (data && data.length > 0) {
            const loanDetail = data[0];
            return {
              loanAmount: loanDetail.loanAmount || 0, //when no loan amount we show  0
              isLoanApp: loanDetail.isLoanApp  || ""
            };
          }
          return {};
        }
      }
        // Add more APIs here as needed
      ];

      // Fetch all data
      // const responses = await Promise.all(  I COMMENTED Promise.all because sometime all endpoint not executed
      const responses = await Promise.all(
        apiEndpoints.map(endpoint =>
          fetch(endpoint.url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Basic " + btoa("user:admin123"),
            },
          })
        )
      );

      let updatedFormData = { ...formData }; 

      // Process all responses
      for (let i = 0; i < responses.length; i++) {
        if (responses[i].ok) {
          const data = await responses[i].json();
          const processedData = apiEndpoints[i].processor(data);
          updatedFormData = { ...updatedFormData, ...processedData };
        } else {
          console.error(`Failed to fetch from: ${apiEndpoints[i].url}`);
        }
      }


      // this is new for get area code
      // Fetch application details to get applicationId (note: this is already fetched in apiEndpoints, but to ensure)
    const applicationResponse = await fetch(
      `${baseUrl}/api/application/details?estimateNo=${encodeURIComponent(estimateNo.trim())}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("user:admin123"),
        },
      }
    );


    if (applicationResponse.ok) {
      const applicationData = await applicationResponse.json();
      if (applicationData && applicationData.length > 0) {
        const { applicationId } = applicationData[0];

        console.log("this is application id: " +applicationId)

        // Fetch area code using the new API with applicationId as parameter for get area code
        const areaCodeResponse = await fetch(
          `${baseUrl}/api/area-code?applicationId=${encodeURIComponent(applicationId.trim())}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Basic " + btoa("user:admin123"),
            },
          }
        );

        if (areaCodeResponse.ok) {
          const areaCodeData = await areaCodeResponse.json();

          //this line have issue like when i set depCode it going to crach the application
          // the reason is casting  they expect Char but i use String in here
          // updatedFormData = { ...updatedFormData, areaCode: areaCodeData.areaCode || "", depoCode: areaCodeData.deptCode || "" };
          updatedFormData = { ...updatedFormData, areaCode: areaCodeData.areaCode || "" };
          console.log("Fetched Area Code:", areaCodeData.areaCode);
        } else {
          console.error("Failed to fetch area code");
        }
      }
    }


      setFormData(updatedFormData);
      // After setting basic data, fetch the order card number
      await fetchNextOrderCardNo();
  
      
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load some data!");
    } finally {
      setLoading(false);
    }
  };
      


//   //this  is new one from fetchAlldata
// // Fetch all data from multiple APIs
//   // (Changed: Replaced Promise.all with sequential fetches using a for-loop and individual try-catch.
//   // This ensures that if one endpoint fails (e.g., network glitch or server error), the others still execute.
//   // In your original code, Promise.all would fail entirely if any single promise rejected, which matches your comment about "sometime all endpoint not executed".
//   // Now, each fetch is independent, and errors are logged per endpoint without stopping the rest.
//   // Also added more logging for debugging why specific endpoints like /api/application/details might fail.)
//   const fetchAllData = async () => {
//     try {
//       setLoading(true);
//       // Set current date automatically in CUSTOMER & JOB DETAILS
//       const currentDate = new Date().toISOString().split("T")[0];

//       console.log("this is current data :", currentDate);

//       // Define all API endpoints (unchanged from your code)
//       const apiEndpoints = [
//         {
//           url: `${baseUrl}/api/applicants/by-estimate?estimateNo=${encodeURIComponent(estimateNo)}`,
//           processor: (data) => {
//             if (data && data.length > 0) {
//               const applicant = data[0];
//               return {
//                 nameOfConsumer: applicant.fullName || "",
//                 // //THIS IS FOR TESTING NAME IS AVAILABLE IN THE TEST DATABSE
//                 // nameOfConsumer: applicant.firstName || "",
//                 // addressOfSupply: applicant.streetAddress || "",
//                 projectNo: projectNumber,
//                 dateIssued: currentDate,
//               };
//             }
//             return {};
//           },
//         },
//         {
//           url: `${baseUrl}/api/application/details?estimateNo=${encodeURIComponent(estimateNo)}`,
//           processor: (data) => {
//             if (data && data.length > 0) {
//               const application = data[0];
//               return {
//                 contactDemand: application.demand || "",
//                 addressOfSupply: application.fullAddress || "",
//               };
//             }
//             return {};
//           },
//         },
//         // THIS NEW API ENDPOINT FOR PIV DETAILS
//         {
//           url: `${baseUrl}/api/piv-details/by-estimate?estimateNo=${encodeURIComponent(estimateNo)}`,
//           processor: (data) => {
//             if (data && data.length > 0) {
//               const pivData = {};

//               // Process each PIV item in the response array
//               data.forEach((item) => {
//                 if (item.referenceType === "SEC") {
//                   // Map to deposit fields
//                   pivData.depPivNumber = item.pivNo || "";
//                   pivData.depositDate = item.pivDate || "";
//                   pivData.depositAmount = item.securityDeposit || "";
//                 } else if (item.referenceType === "EST") {
//                   // Map to estimate fields
//                   pivData.estPivNumber = item.pivNo || "";
//                   pivData.estPayDate = item.pivDate || "";
//                   pivData.estAmount = item.serConnOrElecSch || "";
//                 }
//               });

//               return pivData;
//             }
//             return {};
//           },
//         },
//         // NEW: Added loan details API endpoint
//         {
//           url: `${baseUrl}/api/loan-details/by-estimate?estimateNo=${encodeURIComponent(estimateNo)}`,
//           processor: (data) => {
//             if (data && data.length > 0) {
//               const loanDetail = data[0];
//               return {
//                 loanAmount: loanDetail.loanAmount || 0, //when no loan amount we show 0
//                 isLoanApp: loanDetail.isLoanApp || "",
//               };
//             }
//             return {};
//           },
//         },
//         // Add more APIs here as needed
//       ];

//       let updatedFormData = { ...formData };

//       // Sequential fetches (new: loop with await and try-catch for each)
//       for (let i = 0; i < apiEndpoints.length; i++) {
//         try {
//           console.log(`Fetching from: ${apiEndpoints[i].url}`); // Added log to track which endpoint is being fetched
//           const response = await fetch(apiEndpoints[i].url, {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: "Basic " + btoa("user:admin123"),
//             },
//           });

//           if (response.ok) {
//             const data = await response.json();
//             console.log(`Data from ${apiEndpoints[i].url}:`, data); // Added log to see the raw data returned (helps debug why processor might not work)
//             const processedData = apiEndpoints[i].processor(data);
//             updatedFormData = { ...updatedFormData, ...processedData };
//             console.log(`Processed data from ${apiEndpoints[i].url}:`, processedData); // Added log to see what the processor outputs
//           } else {
//             console.error(`Failed to fetch from: ${apiEndpoints[i].url}, status: ${response.status}`);
//           }
//         } catch (error) {
//           console.error(`Error fetching from ${apiEndpoints[i].url}:`, error);
//         }
//       }

//       // this is new for get area code
//       // Fetch application details to get applicationId (note: this is already fetched in apiEndpoints, but to ensure)
//       // (Unchanged, but wrapped in its own try-catch for safety, similar to above)
//       try {
//         const applicationResponse = await fetch(
//           `${baseUrl}/api/application/details?estimateNo=${encodeURIComponent(estimateNo)}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: "Basic " + btoa("user:admin123"),
//             },
//           }
//         );
//         if (applicationResponse.ok) {
//           const applicationData = await applicationResponse.json();
//           if (applicationData && applicationData.length > 0) {
//             const { applicationId } = applicationData[0];
//             console.log("this is application id: " + applicationId);
//             // Fetch area code using the new API with applicationId as parameter for get area code
//             const areaCodeResponse = await fetch(
//               `${baseUrl}/api/area-code?applicationId=${encodeURIComponent(applicationId)}`,
//               {
//                 method: "GET",
//                 headers: {
//                   "Content-Type": "application/json",
//                   Authorization: "Basic " + btoa("user:admin123"),
//                 },
//               }
//             );
//             if (areaCodeResponse.ok) {
//               const areaCodeData = await areaCodeResponse.json();
//               //this line have issue like when i set depCode it going to crach the application
//               // the reason is casting they expect Char but i use String in here
//               // updatedFormData = { ...updatedFormData, areaCode: areaCodeData.areaCode || "", depoCode: areaCodeData.deptCode || "" };
//               updatedFormData = { ...updatedFormData, areaCode: areaCodeData.areaCode || "" };
//               console.log("Fetched Area Code:", areaCodeData.areaCode);
//             } else {
//               console.error("Failed to fetch area code");
//             }
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching application details or area code:", error);
//       }

//       setFormData(updatedFormData);
//       // After setting basic data, fetch the order card number
//       await fetchNextOrderCardNo();
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       toast.error("Failed to load some data!");
//     } finally {
//       setLoading(false);
//     }
//   };



  // Fetch MTR types when category or mtrsetType changes
  useEffect(() => {
    const fetchMtrTypes = async () => {
      if (formData.customerCategory && formData.mtrsetType) {
        try {
          const response = await fetch(
            `${baseUrl}/api/mtrset/mtr-types?cusCat=${formData.customerCategory}&mtrsetType=${parseInt(formData.mtrsetType)}`
          );

          if (response.ok) {
            const data = await response.json();
            setMtrTypes(data);

            // Create table data based on the fetched MTR types
            const newTableData = data.map((mtrType, index) => ({
              mtr: mtrType.mtrType,
              test1: "",
              test2: "",
              test3: "",
              test4: "",
              test5: "",
              // test6: "",
              // test7: "",
            }));

            setTableData(newTableData);
          } else {
            console.error("Failed to fetch MTR types");
            setMtrTypes([]);
            setTableData([]);
          }
        } catch (error) {
          console.error("Error fetching MTR types:", error);
          setMtrTypes([]);
          setTableData([]);
        }
      } else {
        setMtrTypes([]);
        setTableData([]);
      }
    };

    fetchMtrTypes();
  }, [formData.customerCategory, formData.mtrsetType]);

  // Handle MTR Set Type change to dynamically create table rows
  const handleMtrSetTypeChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, mtrsetType: value });
  };

  // Handle customerCategory change
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, customerCategory: value });
  };

  // Handle natureCategory change
  const handleNatureCategoryChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, natureOfSupplyCategory: value });
  };

  // Handle customer owership type 
  const handleCustomerOwnershipChange =(e)=>{
    const value = e.target.value;
    setFormData({ ...formData, customerOwnershipType: value });
  };


// Handle tariff type change
  const handleTariffTypeChange=(e)=>{
    const value=e.target.value;
    setFormData({...formData,tariffType:value});
  }


  // Handle table input changes
  const handleTableChange = (index, field, value) => {
    const updatedTableData = [...tableData];
    updatedTableData[index][field] = value;
    setTableData(updatedTableData);
  };

  // Toggle table visibility
  const toggleTable = () => {
    setIsTableExpanded(!isTableExpanded);
  };

  // Handle change for other inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  // Handle Enter key to move to next field instead of submitting
  const handleFormKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      // Get all focusable elements in the form
      const focusableElements = Array.from(
        e.currentTarget.querySelectorAll(
          'input:not([readonly]):not([type="checkbox"]), select:not([readonly]), textarea:not([readonly])'
        )
      );
      
      // Find current focused element index
      const currentIndex = focusableElements.indexOf(document.activeElement);
      
      // Focus next element if exists
      if (currentIndex > -1 && currentIndex < focusableElements.length - 1) {
        focusableElements[currentIndex + 1].focus();
      }
    }
  };

  // //this for update status as 10 pcesthmt table when submitting form
  // const updateEstimateStatus = async (estimateNo, deptId) => {

  //   try {
  //     const response = await fetch(
  //       `${baseUrl}/api/pcesthmt/update-status-to-10?estimateNo=${encodeURIComponent(estimateNo)}&deptId=${encodeURIComponent(deptId)}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Basic " + btoa("user:admin123"),
  //         },
  //       }
  //     );
  
  //     if (!response.ok) {
  //       throw new Error("Failed to update estimate status");
  //     }
  //     console.log("Status updated successfully for estimate:", estimateNo);

  //     console.log("this is new state",status)

  //     // In the updateEstimateStatus function, replace the approval log call with:
  //     await createApprovalLog(estimateNo, deptId, status, 10); // From status 4 to status 10
      
  //     return true;
  //   } catch (error) {
  //     console.error("Error updating estimate status:", error);
  //     throw error; // Re-throw to handle in the main function
  //   }
  // };


  //new code for updateEstimateStatus with checking userLevels
  //this for update status as 10 pcesthmt table when submitting form
  const updateEstimateStatus = async (estimateNo, deptId) => {
    try {
      let endpoint = "";
      let newStatus = 0;

      // Check user level and set appropriate endpoint and status
      if (userLevel?.toLowerCase() === 'deo') {
        endpoint = `${baseUrl}/api/pcesthmt/update-status-to-10`;
        newStatus = 10;
      } else if (userLevel?.toLowerCase() === 'ee') {
        endpoint = `${baseUrl}/api/pcesthmt/update-status-to-11`;
        newStatus = 11;
      } else {
        throw new Error("Invalid user level for status update");
      }

      // Make the API call with the determined endpoint
      const response = await fetch(
        `${endpoint}?estimateNo=${encodeURIComponent(estimateNo)}&deptId=${encodeURIComponent(deptId)}`,
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
      await createApprovalLog(estimateNo, deptId, status, newStatus); // From status 4 to new status (10 or 11)
      
      return true;
    } catch (error) {
      console.error("Error updating estimate status:", error);
      throw error; // Re-throw to handle in the main function
    }
  };

      // Alternative version if you have access to both statuses
    const createApprovalLog = async (referenceNo, deptId, fromStatus, toStatus) => {
      try {
        // Get user details from session storage
        const userId = sessionStorage.getItem("userId") || "";
        const userLevel = sessionStorage.getItem("userLevel") || "";

        console.log("check the userId length: ",userId)
        
        // Format status to 2 digits (pad with leading zero)

        //icomment this because i supply the value for fromStatus
        // const formattedFromStatus = fromStatus.toString().padStart(2, '0');
        // const formattedToStatus = toStatus.toString().padStart(2, '0');
        
        console.log(`Creating approval log: ${referenceNo} status ${fromStatus} -> ${toStatus}`);
        
        // Prepare approval log data
        const approvalLogData = {
          referenceNo: referenceNo.trim(),
          deptId: deptId.trim(),
          approvalType: "ORD_CRT", // Order card approval "ORD_CRT" Mean ordercard created
          approvedLevel: userLevel,
          fromStatus: fromStatus,
          toStatus: toStatus,
          approvedBy: userId,
          reason: "Order card created",
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



  // Handle form submission only just submit not save in the databse 
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Form submitted:", formData);
  //   console.log("Table data:", tableData);
  //   console.log("Estimate No:", estimateNo);
  //   toast.success("Form submitted successfully!");
  //   onClose();
  // };
  // if (!isOpen) return null;


  //new handle submit with save the form to ordercard
  // Handle form submission


  //this is commented because i am checking  meterDetailsData 
  // this is support only ordercard submission
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     setLoading(true);
      
  //     // Prepare order card data for submission
  //     const orderCardData = {
  //       projectNo: formData.projectNo,
  //       deptId: formData.deptId, // You might want to get this from somewhere
  //       orderCardNo: formData.orderCardNo,
  //       areaCode: formData.areaCode,
  //       depotCode:formData.depoCode, //this is represent the CSC in the ui
  //       customerName:formData.nameOfConsumer,
  //       addressOfSupply:formData.addressOfSupply,
  //       contractDemand:formData.contactDemand,
  //       customerCategory:formData.customerCategory,
  //       natureOfSupplyCategory:formData.natureOfSupplyCategory,
  //       isicNumber:formData.isicNumber,
  //       customerOwnershipType:formData.customerOwnershipType,
  //       tariffType:formData.tariffType,
  //       //newly added field from meter information
  //       transformerNumber:formData.transformerNo,
  //       sinNumber:formData.sin,

  //       // depotCode: formData.depoCode,// this have issue if we save in the database
  //       connectedDate: formData.dateIssued ? new Date(formData.dateIssued).toISOString() : null,

  //        // mapping for PIV  details
  //       estPivNumber: formData.estPivNumber,
  //       estAmount:formData.estAmount,
  //       estPayDate:formData.estPayDate ? new Date(formData.estPayDate).toISOString(): null,
  //       depPivNumber:formData.depPivNumber,
  //       depositAmount:formData.depositAmount,
  //       depositDate:formData.depositDate ? new Date(formData.depositDate).toISOString(): null,

  //        // for loan deatils
  //       isLoanApp:formData.isLoanApp,
  //       loanAmount:formData.loanAmount,
  //       //ensure only isLoanApp is yes we pass the loanType as A04
  //       loanType: formData.isLoanApp === "Y" ? formData.loanType :  null,
              



  //       // Add other fields as needed from your form data
  //     };

  //     // Submit to order card API
  //     const response = await fetch(`${baseUrl}/api/order-cards`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Basic " + btoa("user:admin123"),
  //       },
  //       body: JSON.stringify(orderCardData),
  //     });

  //     if (response.ok) {
  //       console.log("Form submitted:", formData);
  //       console.log("Table data:", tableData);
  //       console.log("Estimate No:", estimateNo);
  //       toast.success("Order card created successfully!");
  //       onClose();
  //     } else {
  //       throw new Error("Failed to create order card");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //     toast.error("Failed to submit form!");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Handle both form ordercard and meter detail submission (this is final version)
  // without implementing rollback functions)

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    setLoading(true);
    
    // Prepare order card data for submission
    const orderCardData = {
      projectNo: formData.projectNo,
      deptId: formData.deptId,
      orderCardNo: formData.orderCardNo,
      areaCode: formData.areaCode,
      depotCode: formData.depoCode,
      customerName: formData.nameOfConsumer,
      addressOfSupply: formData.addressOfSupply,
      contractDemand: formData.contactDemand,
      customerCategory: formData.customerCategory,
      natureOfSupplyCategory: formData.natureOfSupplyCategory,
      isicNumber: formData.isicNumber,
      customerOwnershipType: formData.customerOwnershipType,
      tariffType: formData.tariffType,
      transformerNumber: formData.transformerNo,
      sinNumber: formData.sin,
      //commented for checking time zone issues in the data
      connectedDate: formData.dateIssued ? new Date(formData.dateIssued).toISOString() : null,
      // connectedDate: formData.dateIssued,
      


      // mapping for PIV  details
      estPivNumber: formData.estPivNumber,
      estAmount:formData.estAmount,
      estPayDate:formData.estPayDate ? new Date(formData.estPayDate).toISOString(): null,
      depPivNumber:formData.depPivNumber,
      depositAmount:formData.depositAmount,
      depositDate:formData.depositDate ? new Date(formData.depositDate).toISOString(): null,

      //for loan deatils
      isLoanApp:formData.isLoanApp,
      loanAmount:formData.loanAmount,
      //ensure only isLoanApp is yes we pass the loanType as A04
      loanType: formData.isLoanApp === "Y" ? formData.loanType :  null,

      //newly add 3 fields
      jobType:formData.jobType,
      voltageLevel:formData.voltageLevel,
      sectionId:formData.sectionId,

      vatRegNo:formData.taxNumber,

    };

    // Submit to order card API
    const orderCardResponse = await fetch(`${baseUrl}/api/order-cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("user:admin123"),
      },
      body: JSON.stringify(orderCardData),
    });

    if (!orderCardResponse.ok) {
      throw new Error("Failed to create order card");
    }

    // Prepare meter details data from tableData
    const meterDetailsData = tableData.map((row, index) => ({
      orderCardNo: formData.orderCardNo,
      mtrType: row.mtr.trim(), // Remove any extra spaces
      mtrNbr: formData.meterNo,
      brCode: formData.brCode,
      setType: formData.mtrsetType ? parseFloat(formData.mtrsetType) : null,
      prsntRdn: row.test1 ? parseFloat(row.test1) : null, // Initial Reading -> PRSNT_RDN
      mtrFactor:row.test2 ||null, // Multiplication Factor -> M_FACTOR
      ctRatio: row.test3 || null, // CT Ratio -> CT_RATIO
      mtrRatio: row.test4 || null, // Meter Ratio -> MTR_RATIO
      mtrOrder: row.test5 ? parseFloat(row.test5) : (index + 1), // Meter Order -> MTR_ORDER
      noOfPhases: formData.numberOfPhase,
      effctDate: formData.effctDate ? new Date(formData.effctDate).toISOString() : null,
      areaCd: formData.areaCode,
      dpCode: formData.depoCode,
      noMtrSets:mtrTypes.length, //this is for mapping like this sentence=> (Found 3 Meter types for Category B and Set Type 2) ui 
      // Add other fields that you want to set with default values
      userId: "SYSTEM", // You can set this to the actual user
      editedUserId: "SYSTEM",
    }));

    console.log("this is how pass meterdetailData : ",meterDetailsData)



    // Submit meter details to API (batch)
    if (meterDetailsData.length > 0) {
      const meterDetailsResponse = await fetch(`${baseUrl}/api/meter-details/batch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("user:admin123"),
        },
        body: JSON.stringify(meterDetailsData),
      });

      if (!meterDetailsResponse.ok) {
        throw new Error("Failed to create meter details");
      }
    }

    // Split the fullAddress string by commas and trim each part
    const addressParts = formData.addressOfSupply.split(',').map(part => part.trim());

    //this is for external data saving part in the informix db
    // Prepare both customerMeterData  for the additional API
     const customerMeterData = {
      jobNbr: formData.projectNo,
      areaCd: formData.areaCode,
      mtrNbr: formData.meterNo,
      noOfPhases: formData.numberOfPhase,
      // mtrSeq: formData.mtrSeq || "",
      mtrSeq:"",
      setType: formData.mtrsetType || "",
      noMtrSets: mtrTypes.length.toString(),
      // mtr1Set: formData.mtr1Set || "",
      // mtr2Set: formData.mtr2Set || "",
      // mtr3Set: formData.mtr3Set || "",
      mtr1Set:"",
      mtr2Set:"",
      mtr3Set:"",
      effctBlcy: "",
      effctDate: formData.effctDate || "",
      trCb: "",
      dpCode: formData.depoCode,
      brCode: formData.brCode,
      cnnctTrnpan: "",
      trnsfVolt: "",
      trnsfAmps: "",
      // userId: "SYSTEM",
      userId: "",
      cusCat: formData.customerCategory,
      natSup: formData.natureOfSupplyCategory,
      name: formData.nameOfConsumer,
      //in here you need to split addressOfSupply based on required format 
      // addressL1: formData.addressOfSupply,
      // addressL2: "",
      // city: "",
      // pCode: "",

      // Map the parts to respective addressParts fields
      addressL1: addressParts[0] || '',        
      addressL2: addressParts[1] || '',      
      city: addressParts[2] || '',            
      pCode: addressParts[3] || '',            

      telNbr: "",
      idNbr: "",
      idType: "",
      // issuedDt: formData.dateIssued,
      issuedDt: "",
      estAmnt: formData.estAmount,
      espayDt: formData.estPayDate,
      estPivNbr: formData.estPivNumber,
      cdPrmses: "",
      indType: "",
      depositAmt: formData.depositAmount,
      depDate: formData.depositDate,
      depPivNbr: formData.depPivNumber,
      addDepAmt: "",
      addDepDate: "",
      addDepPiv: "",
      totSecDep: "",
      cntrDmnd: formData.contactDemand,
      tariff: formData.tariffType,
      gstApl: "",
      taxInv: "",
      taxNum: formData.taxNumber,
      authLetter: "",
      agrmntNo: "",
      cnectDate: formData.dateIssued,
      opStat: "",
      ahArhStat: "",
      altAddrStat: "",
      adlDpstSt: "",
      slfGenSt: "",
      supsdAcc: "",
      refundDep: "",
      cstSt: "",
      zone: "",
      dateAddt: "",
      custCd: "",
      mobileNo: "",
      custType: "",
      netType: "",
      catCode: "",
      cnnctType: "",
      isicCode: formData.isicNumber,
      loanAmount: formData.loanAmount?.toString() || "0",
      loanType: formData.loanType || "",
      loanStatus: formData.isLoanApp,
      meterDetail: tableData.map((row, index) => ({
        meterType: row.mtr.trim(),
        initialReading: row.test1 || "",
        meterFactor: row.test2 || "",
        ctRatio: row.test3 || "",
        meterRatio: row.test4 || "",
        meterOrder: row.test5 ? row.test5.toString() : (index + 1).toString(),
      }))
    };

    // // Submit to the additional API
    // const customerMeterResponse = await fetch("http://10.128.1.59:5005/api/Customer/AddCustomerNMeter", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     // Add authorization if needed
    //     // Authorization: "Basic " + btoa("user:password"),
    //   },
    //   body: JSON.stringify(customerMeterData),
    // });

    // if (!customerMeterResponse.ok) {
    //   throw new Error("Failed to save data to customer meter database");
    // }


    //  Update status ONLY after both order card and meter details are successful
    await updateEstimateStatus(estimateNo, deptId);


    console.log("this is orderCardData: ", orderCardData);
    console.log("this is meterDetailsData: ",meterDetailsData);
    console.log("this is extenal cus&mtr data: ",customerMeterData )
    console.log("Form submitted:", formData);
    console.log("Table data:", tableData);
    console.log("Estimate No:", estimateNo);

    // console.log("connected date: " ,orderCardData.connectedDate);
    toast.success("Order card and meter details created successfully!");
    onClose();
  } catch (error) {
    console.error("Error submitting form:", error);
    toast.error("Failed to submit form!");
  } finally {
    setLoading(false);
  }
};





  if (!isOpen) return null;

  return (
    // Removed modal styles; now inline with w-full to match table width
    <div className="bg-white rounded-lg shadow-lg w-full p-4">
      <div className="flex justify-between items-center border-b pb-2 mb-4">
      {/* <div className="flex-1"></div> Left spacer */}
        <h2 className="text-black-gray-100 text-lg font-bold">
          ORDER CARD DETAILS 
        </h2>
        {/* <div className="flex-1"></div> Right spacer */}
        {/* <button
          onClick={onClose}
          className="text-blueGray-600 text-xl font-bold"
        >
          &times;
        </button> */}

        {loading && (
          <div className="text-sm text-gray-600">Loading data...</div>
        )}

      </div>
      <div className="px-4 lg:px-10 py-4">
        <form onSubmit={handleSubmit} onKeyDown={handleFormKeyDown} autoComplete="off">
          {/* Customer & Job Details Section */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-lg mb-3 text-[#7c0000] border-b pb-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3"> 
              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Type
                  </label>
                  <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    required
                    // maxLength={10}
                    // className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                    className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
                  >
                    <option value="">Select Job Type</option>
                    <option value="New Bulk Supply">New Bulk Supply</option>
                    <option value="New Solar Bulk Supply">New Solar Bulk Supply</option>
                    <option value="Meter Change">Meter Change</option>
                    <option value="Routine Meter Test - Bulk">Routine Meter Test - Bulk</option>
                    <option value="Meter Test - Area Request">Meter Test - Area Request</option>
                    <option value="Harmonic Test - Bulk">Harmonic Test - Bulk</option>
                    <option value="Harmonic Test - 30A 60A">Harmonic Test - 30A 60A</option>
                    <option value="Meter Shift - Bulk">Meter Shift - Bulk</option>
                    <option value="Load Profile at Site">Load Profile at Site</option>
                    <option value="MHP Meter test 1st">MHP Meter test 1st</option>
                    <option value="MHP Meter test 2nd">MHP Meter test 2nd</option>
                    <option value="HT Meter test 1st">HT Meter test 1st</option>
                    <option value="HT Meter test 2nd">HT Meter test 2nd</option>
                    <option value="Capacity Augmentation">Capacity Augmentation</option>
                    <option value="Energy Audit">Energy Audit</option>
                    <option value="Refurbishment-Bulk">Refurbishment-Bulk</option>
                    <option value="Substation Meter Test">Substation Meter Test</option>
                    <option value="Trouble Shooting">Trouble Shooting</option>
                    <option value="3 Phase Meter Test">3 Phase Meter Test</option>
                    <option value="Self Generation Meter Installation">Self Generation Meter Installation</option>
                    <option value="Self Generation Meter Test">Self Generation Meter Test</option>
                    <option value="Refurbishment - 3 Phase">Refurbishment - 3 Phase</option>
                    <option value="Boundary meter testing">Boundary meter testing</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
            </div>
           
              <i className="fas fa-user mr-2"></i>Customer Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project No 
                </label>
                <input
                  type="text"
                  name="projectNo"
                  value={formData.projectNo}
                  onChange={handleChange}
                  readOnly
                  className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order Card No
                </label>
                <input
                  type="text"
                  name="orderCardNo"
                  value={formData.orderCardNo}
                  onChange={handleChange}
                  readOnly
                  className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                />
              </div>

              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order Card No
                  {generatingOrderCard && (
                    <span className="text-xs text-gray-500 ml-1">(Generating...)</span>
                  )}
                </label>
                <input
                  type="text"
                  name="orderCardNo"
                  value={formData.orderCardNo}
                  onChange={handleChange}
                  readOnly
                  className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] bg-gray-100"
                  placeholder="Auto-generating..."
                />
              </div> */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Issued
                </label>
                <input
                  type="date"
                  name="dateIssued"
                  value={formData.dateIssued}
                  onChange={handleChange}
                  readOnly
                  className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {/* Name of Consumer */}
                  Customer Name
                </label>
                <input
                  type="text"
                  name="nameOfConsumer"
                  value={formData.nameOfConsumer}
                  onChange={handleChange}
                  readOnly
                  className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                />
              </div>
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {/* Address of Supply */}
                  Address
                </label>
                <input
                  type="text"
                  name="addressOfSupply"
                  value={formData.addressOfSupply}
                  onChange={handleChange}
                  readOnly
                  className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {/* Contact Demand */}
                  Contract Demand
                </label>
                <input
                  type="text"
                  name="contactDemand"
                  value={formData.contactDemand}
                  onChange={handleChange}
                  readOnly
                  className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                  //this is for red background to fields
                  // className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
                  
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Category
                </label>
                <select
                  name="customerCategory"
                  value={formData.customerCategory}
                  onChange={handleCategoryChange}
                  required
                  maxLength={1}
                  // className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                  className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
                >
                  <option value="">Select Category</option>
                  <option value="B">B (Bulk)</option>
                  <option value="O">O (Ordinary)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nature Of Supply
                </label>
                <select
                  name="natureOfSupplyCategory"
                  value={formData.natureOfSupplyCategory}
                  onChange={handleNatureCategoryChange}
                  // className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                  className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
                  maxLength={1}
                >
                  <option value="">Select Category</option>
                  <option value="C">C (Construction)</option>
                  <option value="P">P (Permanent)</option>
                </select>
              </div>
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tariff
                </label>
                <input
                  type="text"
                  name="tariff"
                  value={formData.tariff}
                  onChange={handleTariffTypeChange}
                  required
                  // className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                  className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
                />
              </div> */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Area Code
                </label>
                <input
                  type="text"
                  name="areaCode"
                  value={formData.areaCode}
                  onChange={handleChange}
                  readOnly
                  className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {/* Depo Code */}
                  CSC
                </label>
                <input
                  type="text"
                  name="depoCode"
                  value={formData.depoCode}
                  onChange={handleChange}
                  maxLength={1}
                  className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                />
              </div>
                
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                ISIC 
                </label>
                <input
                  type="text"
                  name="isicNumber"
                  value={formData.isicNumber}
                  onChange={handleChange}
                  minLength={4}
                  maxLength={5}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  placeholder="Enter 5-digit number"
                  required
                  // className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                  className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Ownership Type
                </label>
                <select
                  name="customerOwnershipType"
                  value={formData.customerOwnershipType}
                  onChange={handleCustomerOwnershipChange}
                  // className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                  maxLength={1}
                  className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
                >
                  <option value="">Select Ownership Type</option>
                  <option value="G">G (Government)</option>
                  <option value="P">P (Private)</option>
                  {/* <option value="SG">SG (Semi Government)</option> */}
                  <option value="S">S (Semi Government)</option>
                </select>
              </div>

                {/* this is for testing the tariff type temp */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tariff Type
                  </label>
                  <select
                    name="tariffType"
                    value={formData.tariffType}
                    onChange={handleTariffTypeChange}
                    maxLength={10}
                    // className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                    className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
                  >
                    {/* <option value="">Select Tariff Type</option>
                    <option value="I1">I1 (Industrial 1)</option>
                    <option value="I2">I2 (Industrial 2)</option>
                    <option value="I3">I3 (Industrial 3)</option>
                    <option value="H1">H1 (Hotel 1)</option>
                    <option value="H2">H2 (Hotel 2)</option>
                    <option value="H3">H3 (Hotel 3)</option> */}

                    <option value="">Select Tariff Type</option>
                    <option value="D-1">Domestic (D-1)</option>
                    <option value="D1-TOU">Domestic TOU (D1-TOU)</option>
                    <option value="I-1">Industrial 1 (I-1)</option>
                    <option value="I-1">Industrial 2 (I-1)</option>
                    <option value="G-1">General Purpose 1 (G-1)</option>
                    <option value="G-1">General Purpose 2 (G-1)</option>
                    <option value="GV1-UV">Government Univ (GV1-UV)</option>
                    <option value="GV1-SH">Government Sch/Hos (GV1-SH)</option>
                    <option value="H-1">Hotel (H-1)</option>
                    <option value="R-1">Religious & Charity (R-1)</option>
                    <option value="SL">Street Light (SL)</option>
                    <option value="IP13-TO">Domestic TOU (IP13-TO)</option>
                    <option value="NET++">NET PLUS PLUS (NET++)</option>
                  </select>
                </div>
                {/* NEW: Added Loan related fileds for the form */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Loan Status
                  </label>
                  <input
                    type="text"
                    name="isLoanApp"
                    value={formData.isLoanApp === "Y" ? "Yes": "No"}
                    onChange={handleChange}
                    readOnly
                    className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                    placeholder="Auto-filled from API"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Loan Amount
                  </label>
                  <input
                    type="text"
                    name="loanAmount"
                    value={formData.loanAmount}
                    onChange={handleChange}
                    readOnly
                    className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                    // placeholder="Auto-filled from API"
                  />
                </div>
            

            </div>
          </div>

          {/* Work Instructions & Meter Data Section */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-lg mb-3 text-red-800 border-b pb-2">
              <i className="fas fa-briefcase mr-2"></i> Meter Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="col-span-4">
                <label className="block text-sm font-medium text-gray-700 mb-1 ">
                  Work Checklist (Items 1-11)
                </label>
                <details className="border rounded-lg p-3 bg-white">
                  <summary className="cursor-pointer font-medium text-sm mb-2">
                    Click to view checklist
                  </summary>
                  <div className="flex flex-col bg-gray-100">
                    <label className="text-sm mb-1">
                      <input
                        type="checkbox"
                        name="fixMeter"
                        checked={formData.fixMeter}
                        onChange={handleCheckboxChange}
                      />{" "}
                      Fix Meter
                    </label>
                    <label className="text-sm mb-1">
                      <input
                        type="checkbox"
                        name="testMeter"
                        checked={formData.testMeter}
                        onChange={handleCheckboxChange}
                      />{" "}
                      Test Meter
                    </label>
                    <label className="text-sm mb-1">
                      <input
                        type="checkbox"
                        name="connectMeter"
                        checked={formData.connectMeter}
                        onChange={handleCheckboxChange}
                      />{" "}
                      Connect Meter
                    </label>
                    <label className="text-sm mb-1">
                      <input
                        type="checkbox"
                        name="readMeter"
                        checked={formData.readMeter}
                        onChange={handleCheckboxChange}
                      />{" "}
                      Read Meter
                    </label>
                    <label className="text-sm mb-1">
                      <input
                        type="checkbox"
                        name="disconnectMains"
                        checked={formData.disconnectMains}
                        onChange={handleCheckboxChange}
                      />{" "}
                      Disconnect Mains
                    </label>
                    <label className="text-sm mb-1">
                      <input
                        type="checkbox"
                        name="removeMains"
                        checked={formData.removeMains}
                        onChange={handleCheckboxChange}
                      />{" "}
                      Remove Mains
                    </label>
                    <label className="text-sm mb-1">
                      <input
                        type="checkbox"
                        name="reconnectMains"
                        checked={formData.reconnectMains}
                        onChange={handleCheckboxChange}
                      />{" "}
                      Reconnected Mains
                    </label>
                    <label className="text-sm mb-1">
                      <input
                        type="checkbox"
                        name="refixMeter"
                        checked={formData.refixMeter}
                        onChange={handleCheckboxChange}
                      />{" "}
                      Refix Meter
                    </label>
                    <label className="text-sm mb-1">
                      <input
                        type="checkbox"
                        name="specialReading"
                        checked={formData.specialReading}
                        onChange={handleCheckboxChange}
                      />{" "}
                      Special Reading
                    </label>
                    <label className="text-sm mb-1">
                      <input
                        type="checkbox"
                        name="changeMeter"
                        checked={formData.changeMeter}
                        onChange={handleCheckboxChange}
                      />{" "}
                      Change Meter
                    </label>
                    <label className="text-sm mb-1">
                      <input
                        type="checkbox"
                        name="consumerChange"
                        checked={formData.consumerChange}
                        onChange={handleCheckboxChange}
                      />{" "}
                      Consumer Change
                    </label>
                  </div>
                </details>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meter Number
                </label>
                <input
                  type="text"
                  name="meterNo"
                  value={formData.meterNo}
                  onChange={handleChange}
                  maxLength={10}
                  // className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                  className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
                />
              </div>

              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  No of Phases
                </label>
                <input
                  type="text"
                  name="noOfPhases"
                  value={formData.noOfPhases}
                  onChange={handleChange}
                  className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                />
              </div> */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand
                </label>
                <input
                  type="text"
                  name="brCode"
                  value={formData.brCode}
                  onChange={handleChange}
                  maxLength={2}
                  // className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                  className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
                />
              </div> */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand
                </label>
                <select
                  name="brCode"
                  value={formData.brCode}
                  onChange={handleChange}
                  className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
                >
                  <option value="">Select Brand</option>
                  <option value="B1">New Brand</option>
                  <option value="FJ">Fujitsu</option>
                  <option value="FR">Ferranti</option>
                  <option value="AB">ABB</option>
                  <option value="GE">G E C</option>
                  <option value="LN">L & G</option>
                  <option value="SG">Sangamo</option>
                  <option value="GN">Genius</option>
                  <option value="PR">Premier</option>
                  <option value="SC">Secure</option>
                  <option value="EM">Email</option>
                  <option value="ED">Edmi</option>
                  <option value="HX">Hexing</option>
                  <option value="AP">Apex</option>
                  <option value="HL">Holley</option>
                  <option value="SX">Sanxing</option>
                  <option value="MS">MicroStar</option>
                </select>
              </div>
            
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transformer Number
                </label>
                <input
                  type="text"
                  name="transformerNo"
                  value={formData.transformerNo}
                  onChange={handleChange}
                  // className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                  className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SIN (Substation Number)
                </label>
                <input
                  type="text"
                  name="sin"
                  value={formData.sin}
                  onChange={handleChange}
                  // className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                  className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meter Set Type
                </label>
                <input
                  type="number"
                  name="mtrsetType"
                  value={formData.mtrsetType}
                  onChange={handleMtrSetTypeChange}
                  min="0"
                  max="5"
                  // className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                  className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {/* Effective Date */}
                  Meter Install Date
                </label>
                <input
                  type="date"
                  name="effctDate"
                  value={formData.effctDate}
                  onChange={handleChange}
                  // className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                  className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Voltage Level
                </label>
                <select
                  name="voltageLevel"
                  value={formData.voltageLevel}
                  onChange={handleChange}
                  className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
                >
                  <option value="">Select Brand</option>
                  <option value="HT">HT</option>
                  <option value="LT">LT</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section Id
                </label>
                <input
                  type="text"
                  name="sectionId"
                  value={formData.sectionId}
                  onChange={handleChange}
                  // className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                  className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
                />
              </div>

              {tableData.length > 0 && (
                <div className="col-span-4 mt-4">
                  <div className="mb-2">
                    <span className="text-sm text-gray-600">
                      Found {mtrTypes.length} Meter types for Category {formData.customerCategory} and Set Type {formData.mtrsetType}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={toggleTable}
                    className="bg-[#7c0000] text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity mb-2"
                  >
                    {isTableExpanded ? "Shrink Table ▲ " : "Expand Table ▼ "}
                  </button>

                  {isTableExpanded && (
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="py-2 px-4 border-b border-gray-300 text-left">Meter Type</th>
                            <th className="py-2 px-4 border-b border-gray-300 text-left">Initial Reading</th>
                            {/* <th className="py-2 px-4 border-b border-gray-300 text-left">Meter Factor</th> */}
                            {/* <th className="py-2 px-4 border-b border-gray-300 text-left">Multification Factor</th> */}
                            <th className="py-2 px-4 border-b border-gray-300 text-left">Multiplication Factor</th>
                            <th className="py-2 px-4 border-b border-gray-300 text-left">CT Ratio</th>
                            <th className="py-2 px-4 border-b border-gray-300 text-left">Meter Ratio</th>
                            <th className="py-2 px-4 border-b border-gray-300 text-left">Meter Order</th>
                            {/* <th className="py-2 px-4 border-b border-gray-300 text-left">Tariff Rate</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {tableData.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="py-2 px-4 border-b border-gray-300 font-medium">
                                {row.mtr}
                              </td>
                              <td className="py-2 px-4 border-b border-gray-300">
                                <input
                                  type="text"
                                  value={row.test1}
                                  inputMode="numeric"
                                  pattern="[0-9]*"
                                  onChange={(e) => handleTableChange(index, "test1", e.target.value)}
                                  // className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000]"
                                  className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
                                />
                              </td>
                              <td className="py-2 px-4 border-b border-gray-300">
                                <input
                                  type="text"
                                  value={row.test2}
                                  inputMode="numeric"
                                  pattern="[0-9]*"
                                  onChange={(e) => handleTableChange(index, "test2", e.target.value)}
                                  // className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000]"
                                  className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
                                />
                              </td>
                              <td className="py-2 px-4 border-b border-gray-300">
                                <input
                                  type="text"
                                  value={row.test3}
                                  inputMode="numeric"
                                  pattern="[0-9]*"
                                  onChange={(e) => handleTableChange(index, "test3", e.target.value)}
                                  // className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000]"
                                  className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
                                />
                              </td>
                              <td className="py-2 px-4 border-b border-gray-300">
                                <input
                                  type="text"
                                  value={row.test4}
                                  inputMode="numeric"
                                  pattern="[0-9]*"
                                  onChange={(e) => handleTableChange(index, "test4", e.target.value)}
                                  // className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000]"
                                  className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
                                />
                              </td>
                              <td className="py-2 px-4 border-b border-gray-300">
                                <input
                                  type="text"
                                  // value={index+1}
                                  value={row.test5=index+1}
                                  readOnly
                                  onChange={(e) => handleTableChange(index, "test5", e.target.value)}
                                  className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000]"
                                />
                              </td>
                              {/* <td className="py-2 px-4 border-b border-gray-300">
                                <input
                                  type="text"
                                  value={row.test6}
                                  onChange={(e) => handleTableChange(index, "test6", e.target.value)}
                                  className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000]"
                                />
                              </td> */}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Technical Execution & Verification Section */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-lg mb-3 text-[#7c0000] border-b pb-2">
              <i className="fas fa-tachometer-alt mr-2"></i>Job Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estimate PIV Number
                </label>
                <input
                  type="text"
                  name="estPivNumber"
                  value={formData.estPivNumber}
                  onChange={handleChange}
                  readOnly
                  className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                Estimate Amount
                </label>
                <input
                  type="text"
                  name="estAmount"
                  value={formData.estAmount}
                  onChange={handleChange}
                  readOnly
                  className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                {/* Estimate Pay Date */}
                Estimate Paid Date
                </label>
                <input
                  type="date"
                  name="estPayDate"
                  value={formData.estPayDate}
                  onChange={handleChange}
                  readOnly
                  className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deposit PIV Number
                </label>
                <input
                  type="text"
                  name="depPivNumber"
                  value={formData.depPivNumber}
                  onChange={handleChange}
                  readOnly
                  className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deposit Amount
                </label>
                <input
                  type="text"
                  name="depositAmount"
                  value={formData.depositAmount}
                  onChange={handleChange}
                  readOnly
                  className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deposit Paid Date
                </label>
                <input
                  type="text"
                  name="depositDate"
                  value={formData.depositDate}
                  onChange={handleChange}
                  readOnly
                  className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                />
              </div>
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tariff
                </label>
                <input
                  type="text"
                  name="tariffJobDetails"
                  value={formData.tariffJobDetails}
                  onChange={handleChange}
                  className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                />
              </div> */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Sec Deposit
                </label>
                <input
                  type="text"
                  name="totalSecDeposit"
                  value={formData.totalSecDeposit}
                  onChange={handleChange}
                  className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                />
              </div> */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Connection Date
                </label>
                <input
                  type="date"
                  name="connectionDate"
                  value={formData.connectionDate}
                  onChange={handleChange}
                  className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                />
              </div> */}

              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Phase
                </label>
                <input
                  type="text"
                  name="numberOfPhase"
                  value={formData.numberOfPhase}
                  onChange={handleChange}
                  maxLength={1}
                  // className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                  className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
                />
              </div> */}

              {/* changed number of phases to dropdown */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Phase
                </label>
                <select
                  name="numberOfPhase"
                  value={formData.numberOfPhase}
                  onChange={handleChange}
                  className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
                >
                  <option value="">Select Phase</option>
                  <option value="1">Phase 1</option>
                  <option value="3">Phase 3</option>
                </select>
              </div>

              <div>
                {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tax Number
                </label> */}
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  VAT Registration Number
                </label>
                <input
                  type="text"
                  name="taxNumber"
                  value={formData.taxNumber}
                  onChange={handleChange}
                  // className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                  className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-[#7c0000] text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
              disabled={loading}
            >
              {loading ? "Loading": "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderCardPopupNew;