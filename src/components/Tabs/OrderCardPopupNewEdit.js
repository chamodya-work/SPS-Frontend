// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";

// const MANAGER_FIELD_STYLE = "bg-red-100";

// const OrderCardPopupNew = ({ isOpen, onClose, estimateNo,projectNumber,deptId }) => {
//   const [formData, setFormData] = useState({
//     newAccountNo: "",
//     accountNo: "",
//     orderCardNo: "",
//     projectNo: "",
//     ocRefNo: "",
//     dateIssued: "",
//     nameOfConsumer: "",
//     addressOfSupply: "",
//     ncrNo: "",
//     pivNo: "",
//     pivDate: "",
//     contactDemand: "",
//     // tariff: "",
//     deposit: "",
//     kvaMeterNo: "",
//     kvaRatio: "",
//     kwhMeterNo: "",
//     kwhRatio: "",
//     ctRatio: "",
//     multiplyingFactorKva: "",
//     multiplyingFactorKwh: "",
//     meterFixedRemoved: "",
//     meterNo: "",
//     readingKwhKva: "",
//     dateInstalled: "",
//     meterRatio: "",
//     sin: "",
//     capacityKva: "",
//     transformerNo: "",
//     meterType: "",
//     meterInstalledBy: "",
//     installedDate: "",
//     esCscName: "",
//     esCscDate: "",
//     areaEngineerCert: "",
//     multFactorConfirm: "",
//     mtr1Set: "",
//     mtr2Set: "",
//     mtr3Set: "",
//     mtrSeq: "",
//     mtrOrder: "",
//     mtrType: "",
//     noOfPhases: "",
//     mtrNbr: "",
//     prsntRdn: "",
//     ctRatioAdditional: "",
//     mtrRatioAdditional: "",
//     mFactor: "",
//     effctDate: "",
//     brCode: "",
//     fixMeter: false,
//     testMeter: false,
//     connectMeter: false,
//     readMeter: false,
//     disconnectMains: false,
//     removeMains: false,
//     reconnectMains: false,
//     refixMeter: false,
//     specialReading: false,
//     changeMeter: false,
//     consumerChange: false,
//     customerCategory: "",
//     natureOfSupplyCategory: "",
//     mtrsetType: "",
//     areaCode: "",
//     depoCode: "",
//     estPivNumber: "",
//     estAmount: "",
//     estPayDate: "",
//     depPivNumber: "",
//     depositAmount: "",
//     depositDate: "",
//     tariffJobDetails: "",
//     totalSecDeposit: "",
//     connectionDate: "",
//     numberOfPhase: "",
//     taxNumber: "",
//     deptId:deptId,
//     isicNumber:"",
//     customerOwnershipType:"",
//     tariffType:"",
//     loanAmount: "",
//     isLoanApp: "",
//     loanType:"A04",
//   });
//   // this is for testing dept code 


//   console.log("this is loan amount"+ formData.loanAmount)

//   console.log("this is dept  form deep id test "+ formData.deptId);
//   // this for table expanded or no
//   const [isTableExpanded, setIsTableExpanded] = useState(false);
//   // state to hold table data
//   const [tableData, setTableData] = useState([]);
//   // state to hold the mtr types
//   const [mtrTypes, setMtrTypes] = useState([]);
//   const [loading, setLoading] = useState(false);


//   const baseUrl = process.env.REACT_APP_API_BASE_URL;

//   // Fetch applicant data when estimateNo changes
//   // useEffect(() => {
//   //   if (estimateNo && isOpen) {
//   //     fetchApplicantData();
//   //   }
//   // }, [estimateNo, isOpen]);

//   // Fetch applicant data from API
//   // const fetchApplicantData = async () => {
//   //   try {
//   //     setLoading(true);
//   //     const response = await fetch(
//   //       `${baseUrl}/api/applicants/by-estimate?estimateNo=${encodeURIComponent(estimateNo)}`,
//   //       {
//   //         method: "GET",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //           Authorization: "Basic " + btoa("user:admin123"),
//   //         },
//   //       }
//   //     );

//   //     if (response.ok) {
//   //       const data = await response.json();
//   //       if (data && data.length > 0) {
//   //         const applicant = data[0];
          
//   //         // Update form data with applicant information
//   //         setFormData(prev => ({
//   //           ...prev,
//   //           nameOfConsumer: applicant.fullName || "",
//   //           addressOfSupply: applicant.streetAddress || "",
//   //           projectNo:projectNumber || "",
            

//   //           // Add more fields as needed from the API response
//   //           // You can map additional fields here based on your form requirements
//   //         }));
          
//   //         console.log("Applicant data loaded:", applicant);
//   //       }
//   //     } else {
//   //       throw new Error("Failed to fetch applicant data");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching applicant data:", error);
//   //     toast.error("Failed to load applicant data!");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//     // Fetch all data when estimateNo changes
//     useEffect(() => {
//       if (estimateNo && isOpen) {
//         fetchAllData();
//       }
//     }, [estimateNo, isOpen]);

//     // Fetch all data when estimateNo changes
//   useEffect(() => {
//     if (estimateNo && isOpen) {
//       fetchAllData();
//     }
//   }, [estimateNo, isOpen]);

//     // Fetch next order card number
//     const fetchNextOrderCardNo = async () => {
//       try {
//         const response = await fetch(
//           // `${baseUrl}/api/order-cards/next-order-card-no?projectNo=${encodeURIComponent(projectNumber)}`,
//           `${baseUrl}/api/order-cards/next-order-card-no?deptId=${encodeURIComponent(deptId)}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: "Basic " + btoa("user:admin123"),
//             },
//           }
//         );
  
//         if (response.ok) {
//           const data = await response.json();
//           setFormData(prev => ({
//             ...prev,
//             orderCardNo: data.nextOrderCardNo
//           }));
//           console.log("Generated Order Card No:", data.nextOrderCardNo);
//         } else {
//           throw new Error("Failed to generate order card number");
//         }
//       } catch (error) {
//         console.error("Error generating order card number:", error);
//         toast.error("Failed to generate order card number!");
//         // Fallback: Set empty if API fails
//         setFormData(prev => ({
//           ...prev,
//           orderCardNo: ""
//         }));
//       }
//     };


//   // Fetch all data from multiple APIs
//   const fetchAllData = async () => {
//     try {
//       setLoading(true);

//     // Set current date automatically in CUSTOMER & JOB DETAILS
//     const currentDate = new Date().toISOString().split('T')[0];

    
//     console.log("this is current data :",currentDate);
      
//       // Define all API endpoints
//       const apiEndpoints = [
//         {
//           url: `${baseUrl}/api/applicants/by-estimate?estimateNo=${encodeURIComponent(estimateNo.trim())}`,
//           processor: (data) => {
//             if (data && data.length > 0) {
//               const applicant = data[0];
//               return {
//                 nameOfConsumer: applicant.fullName || "",
//                 // addressOfSupply: applicant.streetAddress || "",
//                 projectNo: projectNumber,
//                 dateIssued: currentDate,
//               };
//             }
//             return {};
//           }
//         },
//         {
//           url: `${baseUrl}/api/application/details?estimateNo=${encodeURIComponent(estimateNo.trim())}`,
//           processor: (data) => {
//             if (data && data.length > 0) {
//               const application = data[0];
//               return {
//                 contactDemand: application.demand || "",
//                 addressOfSupply:application.fullAddress || "",
//               };
//             }
//             return {};
//           }
//         },

//         //  THIS NEW API ENDPOINT FOR PIV DETAILS
//       {
//         url: `${baseUrl}/api/piv-details/by-estimate?estimateNo=${encodeURIComponent(estimateNo.trim())}`,
//         processor: (data) => {
//           if (data && data.length > 0) {
//             const pivData = {};
            
//             // Process each PIV item in the response array
//             data.forEach(item => {
//               if (item.referenceType === "SEC") {
//                 // Map to deposit fields
//                 pivData.depPivNumber = item.pivNo || "";
//                 pivData.depositDate = item.pivDate || "";
//                 pivData.depositAmount = item.securityDeposit || "";
//               } else if (item.referenceType === "EST") {
//                 // Map to estimate fields
//                 pivData.estPivNumber = item.pivNo || "";
//                 pivData.estPayDate = item.pivDate || "";
//                 pivData.estAmount = item.serConnOrElecSch || "";
//               }
//             });
            
//             return pivData;
//           }
//           return {};
//         }
//       },
//       // NEW: Added loan details API endpoint
//       {
//         url: `${baseUrl}/api/loan-details/by-estimate?estimateNo=${encodeURIComponent(estimateNo.trim())}`,
//         processor: (data) => {
//           if (data && data.length > 0) {
//             const loanDetail = data[0];
//             return {
//               loanAmount: loanDetail.loanAmount || "",
//               isLoanApp: loanDetail.isLoanApp  || ""
//             };
//           }
//           return {};
//         }
//       }
//         // Add more APIs here as needed
//       ];

//       // Fetch all data
//       const responses = await Promise.all(
//         apiEndpoints.map(endpoint =>
//           fetch(endpoint.url, {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: "Basic " + btoa("user:admin123"),
//             },
//           })
//         )
//       );

//       let updatedFormData = { ...formData }; 

//       // Process all responses
//       for (let i = 0; i < responses.length; i++) {
//         if (responses[i].ok) {
//           const data = await responses[i].json();
//           const processedData = apiEndpoints[i].processor(data);
//           updatedFormData = { ...updatedFormData, ...processedData };
//         } else {
//           console.error(`Failed to fetch from: ${apiEndpoints[i].url}`);
//         }
//       }


//       // this is new for get area code
//       // Fetch application details to get applicationId (note: this is already fetched in apiEndpoints, but to ensure)
//     const applicationResponse = await fetch(
//       `${baseUrl}/api/application/details?estimateNo=${encodeURIComponent(estimateNo.trim())}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Basic " + btoa("user:admin123"),
//         },
//       }
//     );


//     if (applicationResponse.ok) {
//       const applicationData = await applicationResponse.json();
//       if (applicationData && applicationData.length > 0) {
//         const { applicationId } = applicationData[0];

//         console.log("this is application id: " +applicationId)

//         // Fetch area code using the new API with applicationId as parameter for get area code
//         const areaCodeResponse = await fetch(
//           `${baseUrl}/api/area-code?applicationId=${encodeURIComponent(applicationId.trim())}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: "Basic " + btoa("user:admin123"),
//             },
//           }
//         );

//         if (areaCodeResponse.ok) {
//           const areaCodeData = await areaCodeResponse.json();

//           //this line have issue like when i set depCode it going to crach the application
//           // the reason is casting  they expect Char but i use String in here
//           // updatedFormData = { ...updatedFormData, areaCode: areaCodeData.areaCode || "", depoCode: areaCodeData.deptCode || "" };
//           updatedFormData = { ...updatedFormData, areaCode: areaCodeData.areaCode || "" };
//           console.log("Fetched Area Code:", areaCodeData.areaCode);
//         } else {
//           console.error("Failed to fetch area code");
//         }
//       }
//     }


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
      


//   // Fetch MTR types when category or mtrsetType changes
//   useEffect(() => {
//     const fetchMtrTypes = async () => {
//       if (formData.customerCategory && formData.mtrsetType) {
//         try {
//           const response = await fetch(
//             `${baseUrl}/api/mtrset/mtr-types?cusCat=${formData.customerCategory}&mtrsetType=${parseInt(formData.mtrsetType)}`
//           );

//           if (response.ok) {
//             const data = await response.json();
//             setMtrTypes(data);

//             // Create table data based on the fetched MTR types
//             const newTableData = data.map((mtrType, index) => ({
//               mtr: mtrType.mtrType,
//               test1: "",
//               test2: "",
//               test3: "",
//               test4: "",
//               test5: "",
//               // test6: "",
//               // test7: "",
//             }));

//             setTableData(newTableData);
//           } else {
//             console.error("Failed to fetch MTR types");
//             setMtrTypes([]);
//             setTableData([]);
//           }
//         } catch (error) {
//           console.error("Error fetching MTR types:", error);
//           setMtrTypes([]);
//           setTableData([]);
//         }
//       } else {
//         setMtrTypes([]);
//         setTableData([]);
//       }
//     };

//     fetchMtrTypes();
//   }, [formData.customerCategory, formData.mtrsetType]);

//   // Handle MTR Set Type change to dynamically create table rows
//   const handleMtrSetTypeChange = (e) => {
//     const value = e.target.value;
//     setFormData({ ...formData, mtrsetType: value });
//   };

//   // Handle customerCategory change
//   const handleCategoryChange = (e) => {
//     const value = e.target.value;
//     setFormData({ ...formData, customerCategory: value });
//   };

//   // Handle natureCategory change
//   const handleNatureCategoryChange = (e) => {
//     const value = e.target.value;
//     setFormData({ ...formData, natureOfSupplyCategory: value });
//   };

//   // Handle customer owership type 
//   const handleCustomerOwnershipChange =(e)=>{
//     const value = e.target.value;
//     setFormData({ ...formData, customerOwnershipType: value });
//   };


// // Handle tariff type change
//   const handleTariffTypeChange=(e)=>{
//     const value=e.target.value;
//     setFormData({...formData,tariffType:value});
//   }


//   // Handle table input changes
//   const handleTableChange = (index, field, value) => {
//     const updatedTableData = [...tableData];
//     updatedTableData[index][field] = value;
//     setTableData(updatedTableData);
//   };

//   // Toggle table visibility
//   const toggleTable = () => {
//     setIsTableExpanded(!isTableExpanded);
//   };

//   // Handle change for other inputs
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle checkbox changes
//   const handleCheckboxChange = (e) => {
//     const { name, checked } = e.target;
//     setFormData({ ...formData, [name]: checked });
//   };

//   // Handle Enter key to move to next field instead of submitting
//   const handleFormKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
      
//       // Get all focusable elements in the form
//       const focusableElements = Array.from(
//         e.currentTarget.querySelectorAll(
//           'input:not([readonly]):not([type="checkbox"]), select:not([readonly]), textarea:not([readonly])'
//         )
//       );
      
//       // Find current focused element index
//       const currentIndex = focusableElements.indexOf(document.activeElement);
      
//       // Focus next element if exists
//       if (currentIndex > -1 && currentIndex < focusableElements.length - 1) {
//         focusableElements[currentIndex + 1].focus();
//       }
//     }
//   };
//   //this for update status as 10 pcesthmt table when submitting form
//   const updateEstimateStatus = async (estimateNo, deptId) => {
//     try {
//       const response = await fetch(
//         `${baseUrl}/api/pcesthmt/update-status?estimateNo=${encodeURIComponent(estimateNo)}&deptId=${encodeURIComponent(deptId)}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Basic " + btoa("user:admin123"),
//           },
//         }
//       );
  
//       if (!response.ok) {
//         throw new Error("Failed to update estimate status");
//       }
//       console.log("Status updated successfully for estimate:", estimateNo);
//       return true;
//     } catch (error) {
//       console.error("Error updating estimate status:", error);
//       throw error; // Re-throw to handle in the main function
//     }
//   };



//   // Handle form submission only just submit not save in the databse 
//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   console.log("Form submitted:", formData);
//   //   console.log("Table data:", tableData);
//   //   console.log("Estimate No:", estimateNo);
//   //   toast.success("Form submitted successfully!");
//   //   onClose();
//   // };
//   // if (!isOpen) return null;


//   //new handle submit with save the form to ordercard
//   // Handle form submission


//   //this is commented because i am checking  meterDetailsData 
//   // this is support only ordercard submission
  
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     setLoading(true);
      
//   //     // Prepare order card data for submission
//   //     const orderCardData = {
//   //       projectNo: formData.projectNo,
//   //       deptId: formData.deptId, // You might want to get this from somewhere
//   //       orderCardNo: formData.orderCardNo,
//   //       areaCode: formData.areaCode,
//   //       depotCode:formData.depoCode, //this is represent the CSC in the ui
//   //       customerName:formData.nameOfConsumer,
//   //       addressOfSupply:formData.addressOfSupply,
//   //       contractDemand:formData.contactDemand,
//   //       customerCategory:formData.customerCategory,
//   //       natureOfSupplyCategory:formData.natureOfSupplyCategory,
//   //       isicNumber:formData.isicNumber,
//   //       customerOwnershipType:formData.customerOwnershipType,
//   //       tariffType:formData.tariffType,
//   //       //newly added field from meter information
//   //       transformerNumber:formData.transformerNo,
//   //       sinNumber:formData.sin,

//   //       // depotCode: formData.depoCode,// this have issue if we save in the database
//   //       connectedDate: formData.dateIssued ? new Date(formData.dateIssued).toISOString() : null,

//   //        // mapping for PIV  details
//   //       estPivNumber: formData.estPivNumber,
//   //       estAmount:formData.estAmount,
//   //       estPayDate:formData.estPayDate ? new Date(formData.estPayDate).toISOString(): null,
//   //       depPivNumber:formData.depPivNumber,
//   //       depositAmount:formData.depositAmount,
//   //       depositDate:formData.depositDate ? new Date(formData.depositDate).toISOString(): null,

//   //        // for loan deatils
//   //       isLoanApp:formData.isLoanApp,
//   //       loanAmount:formData.loanAmount,
//   //       //ensure only isLoanApp is yes we pass the loanType as A04
//   //       loanType: formData.isLoanApp === "Y" ? formData.loanType :  null,
              



//   //       // Add other fields as needed from your form data
//   //     };

//   //     // Submit to order card API
//   //     const response = await fetch(`${baseUrl}/api/order-cards`, {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //         Authorization: "Basic " + btoa("user:admin123"),
//   //       },
//   //       body: JSON.stringify(orderCardData),
//   //     });

//   //     if (response.ok) {
//   //       console.log("Form submitted:", formData);
//   //       console.log("Table data:", tableData);
//   //       console.log("Estimate No:", estimateNo);
//   //       toast.success("Order card created successfully!");
//   //       onClose();
//   //     } else {
//   //       throw new Error("Failed to create order card");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error submitting form:", error);
//   //     toast.error("Failed to submit form!");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // Handle both form ordercard and meter detail submission (this is final version)
//   // without implementing rollback functions)

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     setLoading(true);
    
//     // Prepare order card data for submission
//     const orderCardData = {
//       projectNo: formData.projectNo,
//       deptId: formData.deptId,
//       orderCardNo: formData.orderCardNo,
//       areaCode: formData.areaCode,
//       depotCode: formData.depoCode,
//       customerName: formData.nameOfConsumer,
//       addressOfSupply: formData.addressOfSupply,
//       contractDemand: formData.contactDemand,
//       customerCategory: formData.customerCategory,
//       natureOfSupplyCategory: formData.natureOfSupplyCategory,
//       isicNumber: formData.isicNumber,
//       customerOwnershipType: formData.customerOwnershipType,
//       tariffType: formData.tariffType,
//       transformerNumber: formData.transformerNo,
//       sinNumber: formData.sin,
//       //commented for checking time zone issues in the data
//       connectedDate: formData.dateIssued ? new Date(formData.dateIssued).toISOString() : null,
//       // connectedDate: formData.dateIssued,
      


//       // mapping for PIV  details
//       estPivNumber: formData.estPivNumber,
//       estAmount:formData.estAmount,
//       estPayDate:formData.estPayDate ? new Date(formData.estPayDate).toISOString(): null,
//       depPivNumber:formData.depPivNumber,
//       depositAmount:formData.depositAmount,
//       depositDate:formData.depositDate ? new Date(formData.depositDate).toISOString(): null,

//       //for loan deatils
//       isLoanApp:formData.isLoanApp,
//       loanAmount:formData.loanAmount,
//       //ensure only isLoanApp is yes we pass the loanType as A04
//       loanType: formData.isLoanApp === "Y" ? formData.loanType :  null,

//     };

//     // Submit to order card API
//     const orderCardResponse = await fetch(`${baseUrl}/api/order-cards`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Basic " + btoa("user:admin123"),
//       },
//       body: JSON.stringify(orderCardData),
//     });

//     if (!orderCardResponse.ok) {
//       throw new Error("Failed to create order card");
//     }

//     // Prepare meter details data from tableData
//     const meterDetailsData = tableData.map((row, index) => ({
//       orderCardNo: formData.orderCardNo,
//       mtrType: row.mtr.trim(), // Remove any extra spaces
//       mtrNbr: formData.meterNo,
//       brCode: formData.brCode,
//       setType: formData.mtrsetType ? parseFloat(formData.mtrsetType) : null,
//       prsntRdn: row.test1 ? parseFloat(row.test1) : null, // Initial Reading -> PRSNT_RDN
//       mtrFactor:row.test2 ||null, // Multiplication Factor -> M_FACTOR
//       ctRatio: row.test3 || null, // CT Ratio -> CT_RATIO
//       mtrRatio: row.test4 || null, // Meter Ratio -> MTR_RATIO
//       mtrOrder: row.test5 ? parseFloat(row.test5) : (index + 1), // Meter Order -> MTR_ORDER
//       noOfPhases: formData.numberOfPhase,
//       effctDate: formData.effctDate ? new Date(formData.effctDate).toISOString() : null,
//       areaCd: formData.areaCode,
//       dpCode: formData.depoCode,
//       noMtrSets:mtrTypes.length, //this is for mapping like this sentence=> (Found 3 Meter types for Category B and Set Type 2) ui 
//       // Add other fields that you want to set with default values
//       userId: "SYSTEM", // You can set this to the actual user
//       editedUserId: "SYSTEM",
//     }));

//     // Submit meter details to API (batch)
//     if (meterDetailsData.length > 0) {
//       const meterDetailsResponse = await fetch(`${baseUrl}/api/meter-details/batch`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Basic " + btoa("user:admin123"),
//         },
//         body: JSON.stringify(meterDetailsData),
//       });

//       if (!meterDetailsResponse.ok) {
//         throw new Error("Failed to create meter details");
//       }
//     }

//     //  Update status ONLY after both order card and meter details are successful
//     await updateEstimateStatus(estimateNo, deptId);

//     console.log("Form submitted:", formData);
//     console.log("Table data:", tableData);
//     console.log("Estimate No:", estimateNo);

//     // console.log("connected date: " ,orderCardData.connectedDate);
//     toast.success("Order card and meter details created successfully!");
//     onClose();
//   } catch (error) {
//     console.error("Error submitting form:", error);
//     toast.error("Failed to submit form!");
//   } finally {
//     setLoading(false);
//   }
// };





//   if (!isOpen) return null;

//   return (
//     // Removed modal styles; now inline with w-full to match table width
//     <div className="bg-white rounded-lg shadow-lg w-full p-4">
//       <div className="flex justify-between items-center border-b pb-2 mb-4">
//       {/* <div className="flex-1"></div> Left spacer */}
//         <h2 className="text-black-gray-100 text-lg font-bold">
//           ORDER CARD DETAILS
//         </h2>
//         {/* <div className="flex-1"></div> Right spacer */}
//         {/* <button
//           onClick={onClose}
//           className="text-blueGray-600 text-xl font-bold"
//         >
//           &times;
//         </button> */}

//         {loading && (
//           <div className="text-sm text-gray-600">Loading data...</div>
//         )}

//       </div>
//       <div className="px-4 lg:px-10 py-4">
//         <form onSubmit={handleSubmit} onKeyDown={handleFormKeyDown} autoComplete="off">
//           {/* Customer & Job Details Section */}
//           <div className="bg-gray-50 rounded-lg p-4 mb-4">
//             <h4 className="font-semibold text-lg mb-3 text-[#7c0000] border-b pb-2">
//               <i className="fas fa-user mr-2"></i>Customer Information
//             </h4>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Project No 
//                 </label>
//                 <input
//                   type="text"
//                   name="projectNo"
//                   value={formData.projectNo}
//                   onChange={handleChange}
//                   readOnly
//                   className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Order Card No
//                 </label>
//                 <input
//                   type="text"
//                   name="orderCardNo"
//                   value={formData.orderCardNo}
//                   onChange={handleChange}
//                   readOnly
//                   className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
//                 />
//               </div>

//               {/* <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Order Card No
//                   {generatingOrderCard && (
//                     <span className="text-xs text-gray-500 ml-1">(Generating...)</span>
//                   )}
//                 </label>
//                 <input
//                   type="text"
//                   name="orderCardNo"
//                   value={formData.orderCardNo}
//                   onChange={handleChange}
//                   readOnly
//                   className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] bg-gray-100"
//                   placeholder="Auto-generating..."
//                 />
//               </div> */}

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Date Issued
//                 </label>
//                 <input
//                   type="date"
//                   name="dateIssued"
//                   value={formData.dateIssued}
//                   onChange={handleChange}
//                   readOnly
//                   className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   {/* Name of Consumer */}
//                   Customer Name
//                 </label>
//                 <input
//                   type="text"
//                   name="nameOfConsumer"
//                   value={formData.nameOfConsumer}
//                   onChange={handleChange}
//                   readOnly
//                   className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
//                 />
//               </div>
//               <div className="lg:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   {/* Address of Supply */}
//                   Address
//                 </label>
//                 <input
//                   type="text"
//                   name="addressOfSupply"
//                   value={formData.addressOfSupply}
//                   onChange={handleChange}
//                   readOnly
//                   className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   {/* Contact Demand */}
//                   Contract Demand
//                 </label>
//                 <input
//                   type="text"
//                   name="contactDemand"
//                   value={formData.contactDemand}
//                   onChange={handleChange}
//                   readOnly
//                   className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
//                   //this is for red background to fields
//                   // className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
                  
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Customer Category
//                 </label>
//                 <select
//                   name="customerCategory"
//                   value={formData.customerCategory}
//                   onChange={handleCategoryChange}
//                   required
//                   maxLength={1}
//                   // className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
//                   className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
//                 >
//                   <option value="">Select Category</option>
//                   <option value="B">B (Bulk)</option>
//                   <option value="O">O (Ordinary)</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Nature Of Supply
//                 </label>
//                 <select
//                   name="natureOfSupplyCategory"
//                   value={formData.natureOfSupplyCategory}
//                   onChange={handleNatureCategoryChange}
//                   // className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
//                   className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
//                   maxLength={1}
//                 >
//                   <option value="">Select Category</option>
//                   <option value="C">C (Construction)</option>
//                   <option value="P">P (Permanent)</option>
//                 </select>
//               </div>
//               {/* <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Tariff
//                 </label>
//                 <input
//                   type="text"
//                   name="tariff"
//                   value={formData.tariff}
//                   onChange={handleTariffTypeChange}
//                   required
//                   // className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
//                   className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
//                 />
//               </div> */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Area Code
//                 </label>
//                 <input
//                   type="text"
//                   name="areaCode"
//                   value={formData.areaCode}
//                   onChange={handleChange}
//                   readOnly
//                   className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   {/* Depo Code */}
//                   CSC
//                 </label>
//                 <input
//                   type="text"
//                   name="depoCode"
//                   value={formData.depoCode}
//                   onChange={handleChange}
//                   maxLength={1}
//                   className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
//                 />
//               </div>
                
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                 ISIC 
//                 </label>
//                 <input
//                   type="text"
//                   name="isicNumber"
//                   value={formData.isicNumber}
//                   onChange={handleChange}
//                   minLength={4}
//                   maxLength={5}
//                   pattern="[0-9]*"
//                   inputMode="numeric"
//                   placeholder="Enter 5-digit number"
//                   required
//                   // className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
//                   className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Customer Ownership Type
//                 </label>
//                 <select
//                   name="customerOwnershipType"
//                   value={formData.customerOwnershipType}
//                   onChange={handleCustomerOwnershipChange}
//                   // className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
//                   maxLength={1}
//                   className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
//                 >
//                   <option value="">Select Ownership Type</option>
//                   <option value="G">G (Government)</option>
//                   <option value="P">P (Private)</option>
//                   {/* <option value="SG">SG (Semi Government)</option> */}
//                   <option value="S">S (Semi Government)</option>
//                 </select>
//               </div>

//                 {/* this is for testing the tariff type temp */}

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Tariff Type
//                   </label>
//                   <select
//                     name="tariffType"
//                     value={formData.tariffType}
//                     onChange={handleTariffTypeChange}
//                     maxLength={10}
//                     // className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
//                     className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
//                   >
//                     {/* <option value="">Select Tariff Type</option>
//                     <option value="I1">I1 (Industrial 1)</option>
//                     <option value="I2">I2 (Industrial 2)</option>
//                     <option value="I3">I3 (Industrial 3)</option>
//                     <option value="H1">H1 (Hotel 1)</option>
//                     <option value="H2">H2 (Hotel 2)</option>
//                     <option value="H3">H3 (Hotel 3)</option> */}

//                     <option value="">Select Tariff Type</option>
//                     <option value="D-1">Domestic (D-1)</option>
//                     <option value="D1-TOU">Domestic TOU (D1-TOU)</option>
//                     <option value="I-1">Industrial 1 (I-1)</option>
//                     <option value="I-1">Industrial 2 (I-1)</option>
//                     <option value="G-1">General Purpose 1 (G-1)</option>
//                     <option value="G-1">General Purpose 2 (G-1)</option>
//                     <option value="GV1-UV">Government Univ (GV1-UV)</option>
//                     <option value="GV1-SH">Government Sch/Hos (GV1-SH)</option>
//                     <option value="H-1">Hotel (H-1)</option>
//                     <option value="R-1">Religious & Charity (R-1)</option>
//                     <option value="SL">Street Light (SL)</option>
//                     <option value="IP13-TO">Domestic TOU (IP13-TO)</option>
//                     <option value="NET++">NET PLUS PLUS (NET++)</option>
//                   </select>
//                 </div>
//                 {/* NEW: Added Loan related fileds for the form */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Loan Status
//                   </label>
//                   <input
//                     type="text"
//                     name="isLoanApp"
//                     value={formData.isLoanApp === "Y" ? "Yes": "No"}
//                     onChange={handleChange}
//                     readOnly
//                     className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
//                     placeholder="Auto-filled from API"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Loan Amount
//                   </label>
//                   <input
//                     type="text"
//                     name="loanAmount"
//                     value={formData.loanAmount}
//                     onChange={handleChange}
//                     readOnly
//                     className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
//                     // placeholder="Auto-filled from API"
//                   />
//                 </div>
            

//             </div>
//           </div>

//           {/* Work Instructions & Meter Data Section */}
//           <div className="bg-gray-50 rounded-lg p-4 mb-4">
//             <h4 className="font-semibold text-lg mb-3 text-red-800 border-b pb-2">
//               <i className="fas fa-briefcase mr-2"></i> Meter Information
//             </h4>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               <div className="col-span-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1 ">
//                   Work Checklist (Items 1-11)
//                 </label>
//                 <details className="border rounded-lg p-3 bg-white">
//                   <summary className="cursor-pointer font-medium text-sm mb-2">
//                     Click to view checklist
//                   </summary>
//                   <div className="flex flex-col bg-gray-100">
//                     <label className="text-sm mb-1">
//                       <input
//                         type="checkbox"
//                         name="fixMeter"
//                         checked={formData.fixMeter}
//                         onChange={handleCheckboxChange}
//                       />{" "}
//                       Fix Meter
//                     </label>
//                     <label className="text-sm mb-1">
//                       <input
//                         type="checkbox"
//                         name="testMeter"
//                         checked={formData.testMeter}
//                         onChange={handleCheckboxChange}
//                       />{" "}
//                       Test Meter
//                     </label>
//                     <label className="text-sm mb-1">
//                       <input
//                         type="checkbox"
//                         name="connectMeter"
//                         checked={formData.connectMeter}
//                         onChange={handleCheckboxChange}
//                       />{" "}
//                       Connect Meter
//                     </label>
//                     <label className="text-sm mb-1">
//                       <input
//                         type="checkbox"
//                         name="readMeter"
//                         checked={formData.readMeter}
//                         onChange={handleCheckboxChange}
//                       />{" "}
//                       Read Meter
//                     </label>
//                     <label className="text-sm mb-1">
//                       <input
//                         type="checkbox"
//                         name="disconnectMains"
//                         checked={formData.disconnectMains}
//                         onChange={handleCheckboxChange}
//                       />{" "}
//                       Disconnect Mains
//                     </label>
//                     <label className="text-sm mb-1">
//                       <input
//                         type="checkbox"
//                         name="removeMains"
//                         checked={formData.removeMains}
//                         onChange={handleCheckboxChange}
//                       />{" "}
//                       Remove Mains
//                     </label>
//                     <label className="text-sm mb-1">
//                       <input
//                         type="checkbox"
//                         name="reconnectMains"
//                         checked={formData.reconnectMains}
//                         onChange={handleCheckboxChange}
//                       />{" "}
//                       Reconnected Mains
//                     </label>
//                     <label className="text-sm mb-1">
//                       <input
//                         type="checkbox"
//                         name="refixMeter"
//                         checked={formData.refixMeter}
//                         onChange={handleCheckboxChange}
//                       />{" "}
//                       Refix Meter
//                     </label>
//                     <label className="text-sm mb-1">
//                       <input
//                         type="checkbox"
//                         name="specialReading"
//                         checked={formData.specialReading}
//                         onChange={handleCheckboxChange}
//                       />{" "}
//                       Special Reading
//                     </label>
//                     <label className="text-sm mb-1">
//                       <input
//                         type="checkbox"
//                         name="changeMeter"
//                         checked={formData.changeMeter}
//                         onChange={handleCheckboxChange}
//                       />{" "}
//                       Change Meter
//                     </label>
//                     <label className="text-sm mb-1">
//                       <input
//                         type="checkbox"
//                         name="consumerChange"
//                         checked={formData.consumerChange}
//                         onChange={handleCheckboxChange}
//                       />{" "}
//                       Consumer Change
//                     </label>
//                   </div>
//                 </details>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Meter Number
//                 </label>
//                 <input
//                   type="text"
//                   name="meterNo"
//                   value={formData.meterNo}
//                   onChange={handleChange}
//                   maxLength={10}
//                   // className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
//                   className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
//                 />
//               </div>

//               {/* <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   No of Phases
//                 </label>
//                 <input
//                   type="text"
//                   name="noOfPhases"
//                   value={formData.noOfPhases}
//                   onChange={handleChange}
//                   className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
//                 />
//               </div> */}
//               {/* <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Brand
//                 </label>
//                 <input
//                   type="text"
//                   name="brCode"
//                   value={formData.brCode}
//                   onChange={handleChange}
//                   maxLength={2}
//                   // className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
//                   className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
//                 />
//               </div> */}

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Brand
//                 </label>
//                 <select
//                   name="brCode"
//                   value={formData.brCode}
//                   onChange={handleChange}
//                   className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
//                 >
//                   <option value="">Select Brand</option>
//                   <option value="B1">New Brand</option>
//                   <option value="FJ">Fujitsu</option>
//                   <option value="FR">Ferranti</option>
//                   <option value="AB">ABB</option>
//                   <option value="GE">G E C</option>
//                   <option value="LN">L & G</option>
//                   <option value="SG">Sangamo</option>
//                   <option value="GN">Genius</option>
//                   <option value="PR">Premier</option>
//                   <option value="SC">Secure</option>
//                   <option value="EM">Email</option>
//                   <option value="ED">Edmi</option>
//                   <option value="HX">Hexing</option>
//                   <option value="AP">Apex</option>
//                   <option value="HL">Holley</option>
//                   <option value="SX">Sanxing</option>
//                   <option value="MS">MicroStar</option>
//                 </select>
//               </div>
            
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Transformer Number
//                 </label>
//                 <input
//                   type="text"
//                   name="transformerNo"
//                   value={formData.transformerNo}
//                   onChange={handleChange}
//                   // className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
//                   className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   SIN (Substation Number)
//                 </label>
//                 <input
//                   type="text"
//                   name="sin"
//                   value={formData.sin}
//                   onChange={handleChange}
//                   // className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
//                   className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Meter Set Type
//                 </label>
//                 <input
//                   type="number"
//                   name="mtrsetType"
//                   value={formData.mtrsetType}
//                   onChange={handleMtrSetTypeChange}
//                   min="0"
//                   max="5"
//                   // className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
//                   className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   {/* Effective Date */}
//                   Meter Install Date
//                 </label>
//                 <input
//                   type="date"
//                   name="effctDate"
//                   value={formData.effctDate}
//                   onChange={handleChange}
//                   // className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
//                   className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
//                 />
//               </div>

//               {tableData.length > 0 && (
//                 <div className="col-span-4 mt-4">
//                   <div className="mb-2">
//                     <span className="text-sm text-gray-600">
//                       Found {mtrTypes.length} Meter types for Category {formData.customerCategory} and Set Type {formData.mtrsetType}
//                     </span>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={toggleTable}
//                     className="bg-[#7c0000] text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity mb-2"
//                   >
//                     {isTableExpanded ? "Shrink Table ▲ " : "Expand Table ▼ "}
//                   </button>

//                   {isTableExpanded && (
//                     <div className="overflow-x-auto">
//                       <table className="min-w-full bg-white border border-gray-300">
//                         <thead>
//                           <tr className="bg-gray-100">
//                             <th className="py-2 px-4 border-b border-gray-300 text-left">Meter Type</th>
//                             <th className="py-2 px-4 border-b border-gray-300 text-left">Initial Reading</th>
//                             {/* <th className="py-2 px-4 border-b border-gray-300 text-left">Meter Factor</th> */}
//                             {/* <th className="py-2 px-4 border-b border-gray-300 text-left">Multification Factor</th> */}
//                             <th className="py-2 px-4 border-b border-gray-300 text-left">Multiplication Factor</th>
//                             <th className="py-2 px-4 border-b border-gray-300 text-left">CT Ratio</th>
//                             <th className="py-2 px-4 border-b border-gray-300 text-left">Meter Ratio</th>
//                             <th className="py-2 px-4 border-b border-gray-300 text-left">Meter Order</th>
//                             {/* <th className="py-2 px-4 border-b border-gray-300 text-left">Tariff Rate</th> */}
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {tableData.map((row, index) => (
//                             <tr key={index} className="hover:bg-gray-50">
//                               <td className="py-2 px-4 border-b border-gray-300 font-medium">
//                                 {row.mtr}
//                               </td>
//                               <td className="py-2 px-4 border-b border-gray-300">
//                                 <input
//                                   type="text"
//                                   value={row.test1}
//                                   inputMode="numeric"
//                                   pattern="[0-9]*"
//                                   onChange={(e) => handleTableChange(index, "test1", e.target.value)}
//                                   // className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000]"
//                                   className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
//                                 />
//                               </td>
//                               <td className="py-2 px-4 border-b border-gray-300">
//                                 <input
//                                   type="text"
//                                   value={row.test2}
//                                   inputMode="numeric"
//                                   pattern="[0-9]*"
//                                   onChange={(e) => handleTableChange(index, "test2", e.target.value)}
//                                   // className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000]"
//                                   className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
//                                 />
//                               </td>
//                               <td className="py-2 px-4 border-b border-gray-300">
//                                 <input
//                                   type="text"
//                                   value={row.test3}
//                                   inputMode="numeric"
//                                   pattern="[0-9]*"
//                                   onChange={(e) => handleTableChange(index, "test3", e.target.value)}
//                                   // className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000]"
//                                   className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
//                                 />
//                               </td>
//                               <td className="py-2 px-4 border-b border-gray-300">
//                                 <input
//                                   type="text"
//                                   value={row.test4}
//                                   inputMode="numeric"
//                                   pattern="[0-9]*"
//                                   onChange={(e) => handleTableChange(index, "test4", e.target.value)}
//                                   // className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000]"
//                                   className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
//                                 />
//                               </td>
//                               <td className="py-2 px-4 border-b border-gray-300">
//                                 <input
//                                   type="text"
//                                   // value={index+1}
//                                   value={row.test5=index+1}
//                                   readOnly
//                                   onChange={(e) => handleTableChange(index, "test5", e.target.value)}
//                                   className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000]"
//                                 />
//                               </td>
//                               {/* <td className="py-2 px-4 border-b border-gray-300">
//                                 <input
//                                   type="text"
//                                   value={row.test6}
//                                   onChange={(e) => handleTableChange(index, "test6", e.target.value)}
//                                   className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000]"
//                                 />
//                               </td> */}
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Technical Execution & Verification Section */}
//           <div className="bg-gray-50 rounded-lg p-4 mb-4">
//             <h4 className="font-semibold text-lg mb-3 text-[#7c0000] border-b pb-2">
//               <i className="fas fa-tachometer-alt mr-2"></i>Job Information
//             </h4>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Estimate PIV Number
//                 </label>
//                 <input
//                   type="text"
//                   name="estPivNumber"
//                   value={formData.estPivNumber}
//                   onChange={handleChange}
//                   readOnly
//                   className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Estimate Amount
//                 </label>
//                 <input
//                   type="text"
//                   name="estAmount"
//                   value={formData.estAmount}
//                   onChange={handleChange}
//                   readOnly
//                   className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                 {/* Estimate Pay Date */}
//                 Estimate Paid Date
//                 </label>
//                 <input
//                   type="date"
//                   name="estPayDate"
//                   value={formData.estPayDate}
//                   onChange={handleChange}
//                   readOnly
//                   className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Deposit PIV Number
//                 </label>
//                 <input
//                   type="text"
//                   name="depPivNumber"
//                   value={formData.depPivNumber}
//                   onChange={handleChange}
//                   readOnly
//                   className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Deposit Amount
//                 </label>
//                 <input
//                   type="text"
//                   name="depositAmount"
//                   value={formData.depositAmount}
//                   onChange={handleChange}
//                   readOnly
//                   className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Deposit Paid Date
//                 </label>
//                 <input
//                   type="text"
//                   name="depositDate"
//                   value={formData.depositDate}
//                   onChange={handleChange}
//                   readOnly
//                   className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
//                 />
//               </div>
//               {/* <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Tariff
//                 </label>
//                 <input
//                   type="text"
//                   name="tariffJobDetails"
//                   value={formData.tariffJobDetails}
//                   onChange={handleChange}
//                   className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
//                 />
//               </div> */}
//               {/* <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Total Sec Deposit
//                 </label>
//                 <input
//                   type="text"
//                   name="totalSecDeposit"
//                   value={formData.totalSecDeposit}
//                   onChange={handleChange}
//                   className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
//                 />
//               </div> */}
//               {/* <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Connection Date
//                 </label>
//                 <input
//                   type="date"
//                   name="connectionDate"
//                   value={formData.connectionDate}
//                   onChange={handleChange}
//                   className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
//                 />
//               </div> */}

//               {/* <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Number of Phase
//                 </label>
//                 <input
//                   type="text"
//                   name="numberOfPhase"
//                   value={formData.numberOfPhase}
//                   onChange={handleChange}
//                   maxLength={1}
//                   // className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
//                   className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
//                 />
//               </div> */}

//               {/* changed number of phases to dropdown */}

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Number of Phase
//                 </label>
//                 <select
//                   name="numberOfPhase"
//                   value={formData.numberOfPhase}
//                   onChange={handleChange}
//                   className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
//                 >
//                   <option value="">Select Phase</option>
//                   <option value="1">Phase 1</option>
//                   <option value="3">Phase 3</option>
//                 </select>
//               </div>

//               <div>
//                 {/* <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Tax Number
//                 </label> */}
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   VAT Registration Number
//                 </label>
//                 <input
//                   type="text"
//                   name="taxNumber"
//                   value={formData.taxNumber}
//                   onChange={handleChange}
//                   // className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
//                   className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-end mt-4">
//             <button
//               type="submit"
//               className="bg-[#7c0000] text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
//               disabled={loading}
//             >
//               {loading ? "Loading": "Submit"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default OrderCardPopupNew;




//new code for getting form details from ordercard table and temp meter details
//also support edit fn to edit form and save data

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const MANAGER_FIELD_STYLE = "bg-red-100";

const OrderCardPopupNew = ({ isOpen, onClose, estimateNo, projectNumber, deptId, submitDisabled = false}) => {

  //  //get userId from the session storage
  //  const userId=sessionStorage.getItem("userId");
  //  console.log("this is session storage userId :",userId);

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
    deptId: deptId,
    isicNumber: "",
    customerOwnershipType: "",
    tariffType: "",
    loanAmount: "",
    isLoanApp: "",
    loanType: "A04",
    jobType:"",
    voltageLevel:"",
    sectionId:""
  });

  // this is for testing dept code
  console.log("this is loan amount" + formData.loanAmount);
  console.log("this is dept form deep id test " + formData.deptId);
  // this for table expanded or no
  const [isTableExpanded, setIsTableExpanded] = useState(false);
  // state to hold table data
  const [tableData, setTableData] = useState([]);
  // state to hold the mtr types
  const [mtrTypes, setMtrTypes] = useState([]);

  //this loading state for get meterdetail to table 
  const [isLoadingData, setIsLoadingData] = useState(true);

  // NEW: State to hold full meter details for update merging
  const [fullMeterDetails, setFullMeterDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  // REMOVED: Old useEffect for fetching applicant data
  // REMOVED: fetchApplicantData function
  // REMOVED: fetchNextOrderCardNo function, as we now fetch existing order card
  // CHANGED: useEffect now triggers fetchAllData when isOpen and projectNumber/deptId change
  useEffect(() => {
    if (projectNumber && deptId && isOpen) {
      fetchAllData();
    }
  }, [projectNumber, deptId, isOpen]);

  // CHANGED: fetchAllData now fetches from two new endpoints: order-cards/by-project-dept and meter-details/by-order-card
  // REMOVED: All old apiEndpoints and multiple fetches
  // REMOVED: Separate area code fetch
  // ADDED: Fetch order card first, then meter details if order card exists
  // ADDED: Error handling if order card not found (assume edit mode, toast error)
  // ADDED: Mapping of fetched data to formData and tableData
  // ADDED: Set fullMeterDetails for later update merging
  // ADDED: Date formatting for input fields
  const fetchAllData = async () => {
    try {
      setLoading(true);

      // Fetch order card data
      const orderCardResponse = await fetch(
        `${baseUrl}/api/order-cards/by-project-dept?projectNo=${encodeURIComponent(projectNumber.trim())}&deptId=${encodeURIComponent(deptId.trim())}`,
        // `${baseUrl}/api/order-cards/by-project-dept?projectNo=${encodeURIComponent(projectNumber)}&deptId=${encodeURIComponent(deptId)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa("user:admin123"),
          },
        }
      );

      if(!orderCardResponse.ok){
        console.log("your ordercard response have issue", orderCardResponse);
      }

      if (orderCardResponse.ok) {
        const orderCardData = await orderCardResponse.json();
        console.log("check the ordercard data : ",orderCardData)

        // Update formData with fetched order card data
        setFormData((prev) => ({
          ...prev,
          projectNo: orderCardData.projectNo || "",
          orderCardNo: orderCardData.orderCardNo || "",
          dateIssued: orderCardData.connectedDate ? orderCardData.connectedDate.split("T")[0] : "",
          nameOfConsumer: orderCardData.customerName || "",
          addressOfSupply: orderCardData.addressOfSupply || "",
          contactDemand: orderCardData.contractDemand || "",
          customerCategory: orderCardData.customerCategory || "",
          natureOfSupplyCategory: orderCardData.natureOfSupplyCategory || "",
          isicNumber: orderCardData.isicNumber || "",
          customerOwnershipType: orderCardData.customerOwnershipType || "",
          tariffType: orderCardData.tariffType || "",
          transformerNo: orderCardData.transformerNumber || "",
          sin: orderCardData.sinNumber || "",
          areaCode: orderCardData.areaCode || "",
          depoCode: orderCardData.depotCode || "",
          estPivNumber: orderCardData.estPivNumber || "",
          estAmount: orderCardData.estAmount || "",
          estPayDate: orderCardData.estPayDate ? orderCardData.estPayDate.split("T")[0] : "",
          depPivNumber: orderCardData.depPivNumber || "",
          depositAmount: orderCardData.depositAmount || "",
          depositDate: orderCardData.depositDate ? orderCardData.depositDate.split("T")[0] : "",
          isLoanApp: orderCardData.isLoanApp || "",
          loanAmount: orderCardData.loanAmount || "",
          loanType: orderCardData.loanType || "",
          deptId: orderCardData.deptId || deptId,
          jobType:orderCardData.jobType || "",
          voltageLevel:orderCardData.voltageLevel || "",
          sectionId:orderCardData.sectionId || "",
          taxNumber:orderCardData.vatRegNo || "",
        }));

        // Fetch meter details using orderCardNo
        const meterResponse = await fetch(
          `${baseUrl}/api/meter-details/by-order-card?orderCardNo=${encodeURIComponent(orderCardData.orderCardNo)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Basic " + btoa("user:admin123"),
            },
          }
        );

        

        if (meterResponse.ok) {
          let meterData = await meterResponse.json();

          console.log("meter data from orderCard : ",meterData);
          // Sort by mtrOrder
          meterData.sort((a, b) => (a.mtrOrder || 0) - (b.mtrOrder || 0));

          // Set fullMeterDetails
          setFullMeterDetails(meterData);

          // Derive mtrTypes from fetched meter data
          setMtrTypes(meterData.map((item) => ({ mtrType: item.mtrType })));

          console.log("this is fetch mtrType :",mtrTypes);


          // Set tableData from fetched meter data
          const newTableData = meterData.map((item, index) => ({
            mtr: item.mtrType,
            test1: item.prsntRdn || "",
            test2: item.mtrFactor || "",
            test3: item.ctRatio || "",
            test4: item.mtrRatio || "",
            test5: item.mtrOrder || index + 1,
          }));
          setTableData(newTableData);

          // Update additional form fields from first meter detail (assuming consistent across sets)
          if (meterData.length > 0) {
            const firstMeter = meterData[0];
            setFormData((prev) => ({
              ...prev,
              meterNo: firstMeter.mtrNbr || "",
              brCode: firstMeter.brCode || "",
              mtrsetType: firstMeter.setType || "",
              numberOfPhase: firstMeter.noOfPhases || "",
              effctDate: firstMeter.effctDate ? firstMeter.effctDate.split("T")[0] : "",
              areaCode: firstMeter.areaCd || prev.areaCode,
              depoCode: firstMeter.dpCode || prev.depoCode,
            }));
          }

          // Expand table by default for edit
          setIsTableExpanded(true);
        } else {
          throw new Error("Failed to fetch meter details");
        }
      } else {
        // If order card not found, handle as error (assuming this is edit mode)
        throw new Error("Order card not found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data! " + error.message);
    } finally {
      setLoading(false);
      setIsLoadingData(false);
    }
  };

  // REMOVED: useEffect for fetching mtrTypes on category/mtrsetType change, as now loaded from fetched data
  // But kept for potential reset if user changes category/setType

  useEffect(() => {
    
    const fetchMtrTypes = async () => {
      if(isLoadingData) return;
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
    //this is added for because if user change customerCategoury 
    //api auto run and get details because table can be conflict when user select another item in customer categoury
    // fetchAllData();
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
  const handleCustomerOwnershipChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, customerOwnershipType: value });
  };

  // Handle tariff type change
  const handleTariffTypeChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, tariffType: value });
  };

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
    if (e.key === "Enter") {
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

  



  // REMOVED: updateEstimateStatus function, as this is now for edit mode

  // CHANGED: handleSubmit now uses PUT for order card and meter details batch update
  // ADDED: Merge changes into fullMeterDetails for meter details update
  // ADDED: Include accNbr as String(index + 1) if not present
  // REMOVED: POST calls and creation logic
  // REMOVED: Call to updateEstimateStatus
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Prepare order card data for update
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
        connectedDate: formData.dateIssued ? new Date(formData.dateIssued).toISOString() : null,

        // mapping for PIV details
        estPivNumber: formData.estPivNumber,
        estAmount: formData.estAmount,
        estPayDate: formData.estPayDate ? new Date(formData.estPayDate).toISOString() : null,
        depPivNumber: formData.depPivNumber,
        depositAmount: formData.depositAmount,
        depositDate: formData.depositDate ? new Date(formData.depositDate).toISOString() : null,
        // for loan details
        isLoanApp: formData.isLoanApp,
        loanAmount: formData.loanAmount,
        loanType: formData.isLoanApp === "Y" ? formData.loanType : null,

         //newly add 3 fields
        jobType:formData.jobType,
        voltageLevel:formData.voltageLevel,
        sectionId:formData.sectionId,
        vatRegNo:formData.taxNumber,
      };

      console.log("response projectno :",formData.projectNo.trim());
      console.log("response deptId :",formData.deptId.trim());
      console.log("this is ordercard body :",JSON.stringify(orderCardData));

      // Update order card via PUT
      const orderCardResponse = await fetch(
        // make sure when calling this api dont use trim like formData.projectNo.trim() and formData.deptId.trim()
        //becasue what we doing is we get the deatils in database and trying to update so database have trailing space issue

        `${baseUrl}/api/order-cards?projectNo=${encodeURIComponent(formData.projectNo)}&deptId=${encodeURIComponent(formData.deptId)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa("user:admin123"),
          },
          body: JSON.stringify(orderCardData),
        }
      );

      if (!orderCardResponse.ok) {
        throw new Error("Failed to update order card");
      }

      // below previous code commented because we have to modify updatade meter detail logic 
      //because  endpoint only support for PUT

      // // Prepare updated meter details by merging form/table changes into fullMeterDetails
      // const updatedMeterDetails = fullMeterDetails.map((detail, index) => ({
      //   ...detail,
      //   mtrNbr: formData.meterNo,
      //   brCode: formData.brCode,
      //   setType: formData.mtrsetType ? parseFloat(formData.mtrsetType) : detail.setType,
      //   prsntRdn: tableData[index]?.test1 ? parseFloat(tableData[index].test1) : detail.prsntRdn,
      //   mtrFactor: tableData[index]?.test2 || detail.mtrFactor,
      //   ctRatio: tableData[index]?.test3 || detail.ctRatio,
      //   mtrRatio: tableData[index]?.test4 || detail.mtrRatio,
      //   mtrOrder: tableData[index]?.test5 ? parseFloat(tableData[index].test5) : detail.mtrOrder,
      //   noOfPhases: formData.numberOfPhase,
      //   effctDate: formData.effctDate ? new Date(formData.effctDate).toISOString() : detail.effctDate,
      //   areaCd: formData.areaCode,
      //   dpCode: formData.depoCode,
      //   noMtrSets: mtrTypes.length,
      //   editedUserId: "SYSTEM",
      //   // Set accNbr if not present
      //   accNbr: detail.accNbr || String(index + 1),
      // }));

      // // Update meter details batch via PUT
      // if (updatedMeterDetails.length > 0) {
      //   const meterDetailsResponse = await fetch(`${baseUrl}/api/meter-details/batch`, {
      //     method: "PUT",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: "Basic " + btoa("user:admin123"),
      //     },
      //     body: JSON.stringify(updatedMeterDetails),
      //   });

      //   if (!meterDetailsResponse.ok) {
      //     throw new Error("Failed to update meter details");
      //   }
      // }


      //new code with update meter details "POST" and "PUT" according to logic
      // Prepare meter details - handle both cases: existing details and new entries
        let meterDetailsToSend = [];

        // If we have table data (user entered data in the form)
        if (tableData.length > 0) {
          // If fullMeterDetails is empty (no existing records), create new ones
          // if (fullMeterDetails.length === 0) {

            // Create new meter detail objects from tableData
            meterDetailsToSend = tableData.map((row, index) => ({
              orderCardNo: formData.orderCardNo,
              mtrNbr: formData.meterNo,
              brCode: formData.brCode,
              mtrType: row.mtr,
              setType: formData.mtrsetType ? parseFloat(formData.mtrsetType) : null,
              prsntRdn: row.test1 ? parseFloat(row.test1) : null,
              mtrFactor: row.test2 || null,
              ctRatio: row.test3 || null,
              mtrRatio: row.test4 || null,
              mtrOrder: row.test5 ? parseFloat(row.test5) : index + 1,
              noOfPhases: formData.numberOfPhase,
              effctDate: formData.effctDate ? new Date(formData.effctDate).toISOString() : null,
              areaCd: formData.areaCode,
              dpCode: formData.depoCode,
              noMtrSets: mtrTypes.length,
              editedUserId: "SYSTEM",
              accNbr: String(index + 1),
            }));
          // } else {
          //   // Update existing meter details (your original code)
          //   meterDetailsToSend = fullMeterDetails.map((detail, index) => ({
          //     ...detail,
          //     mtrNbr: formData.meterNo,
          //     brCode: formData.brCode,
          //     setType: formData.mtrsetType ? parseFloat(formData.mtrsetType) : detail.setType,
          //     prsntRdn: tableData[index]?.test1 ? parseFloat(tableData[index].test1) : detail.prsntRdn,
          //     mtrFactor: tableData[index]?.test2 || detail.mtrFactor,
          //     ctRatio: tableData[index]?.test3 || detail.ctRatio,
          //     mtrRatio: tableData[index]?.test4 || detail.mtrRatio,
          //     mtrOrder: tableData[index]?.test5 ? parseFloat(tableData[index].test5) : detail.mtrOrder,
          //     noOfPhases: formData.numberOfPhase,
          //     effctDate: formData.effctDate ? new Date(formData.effctDate).toISOString() : detail.effctDate,
          //     areaCd: formData.areaCode,
          //     dpCode: formData.depoCode,
          //     noMtrSets: mtrTypes.length,
          //     editedUserId: "SYSTEM",
          //     accNbr: detail.accNbr || String(index + 1),
          //   }));
          // }
        }

        // Update meter details batch via PUT (use appropriate method - POST for new, PUT for existing)
        if (meterDetailsToSend.length > 0) {
          // const method = fullMeterDetails.length === 0 ? "POST" : "PUT";
          const method="POST"
         
          // const endpoint = fullMeterDetails.length === 0 ? "/api/meter-details/batch" : "/api/meter-details/batch"; //we have same end point in backend
          const endpoint="/api/meter-details/batch-replace" //this endpoint deleted existent data and add new fresh data 
          
          const meterDetailsResponse = await fetch(`${baseUrl}${endpoint}`, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              Authorization: "Basic " + btoa("user:admin123"),
            },
            body: JSON.stringify(meterDetailsToSend),
          });

          if (!meterDetailsResponse.ok) {
            throw new Error(`Failed to ${method === "POST" ? "create" : "update"} meter details`);
          }
        }

      console.log("Form submitted:", formData);
      console.log("Table data:", tableData);
      console.log("Estimate No:", estimateNo);
      toast.success("Order card and meter details updated successfully!");
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
        <h2 className="text-black-gray-100 text-lg font-bold">ORDER CARD DETAILS</h2>
        {/* <div className="flex-1"></div> Right spacer */}
        {/* <button
          onClick={onClose}
          className="text-blueGray-600 text-xl font-bold"
        >
          &times;
        </button> */}
        {loading && <div className="text-sm text-gray-600">Loading data...</div>}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Project No</label>
                <input
                  type="text"
                  name="projectNo"
                  value={formData.projectNo}
                  onChange={handleChange}
                  readOnly // Keep readOnly as key field
                  className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order Card No</label>
                <input
                  type="text"
                  name="orderCardNo"
                  value={formData.orderCardNo}
                  onChange={handleChange}
                  readOnly // Keep readOnly as key field
                  className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Issued</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Contract Demand</label>
                <input
                  type="text"
                  name="contactDemand"
                  value={formData.contactDemand}
                  onChange={handleChange}
                  readOnly
                  // className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
                  className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Category</label>
                <select
                  name="customerCategory"
                  value={formData.customerCategory}
                  onChange={handleCategoryChange}
                  required
                  maxLength={1}
                  // readOnly
                  // disabled
                  className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
                >
                  <option value="">Select Category</option>
                  <option value="B">B (Bulk)</option>
                  <option value="O">O (Ordinary)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nature Of Supply</label>
                <select
                  name="natureOfSupplyCategory"
                  value={formData.natureOfSupplyCategory}
                  onChange={handleNatureCategoryChange}
                  className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
                  maxLength={1}
                >
                  <option value="">Select Category</option>
                  <option value="C">C (Construction)</option>
                  <option value="P">P (Permanent)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Area Code</label>
                <input
                  type="text"
                  name="areaCode"
                  value={formData.areaCode}
                  onChange={handleChange}
                  // REMOVED: readOnly, to allow edit
                  readOnly
                  className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CSC</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">ISIC</label>
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
                  className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Ownership Type</label>
                <select
                  name="customerOwnershipType"
                  value={formData.customerOwnershipType}
                  onChange={handleCustomerOwnershipChange}
                  maxLength={1}
                  className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
                >
                  <option value="">Select Ownership Type</option>
                  <option value="G">G (Government)</option>
                  <option value="P">P (Private)</option>
                  <option value="S">S (Semi Government)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tariff Type</label>
                <select
                  name="tariffType"
                  value={formData.tariffType}
                  onChange={handleTariffTypeChange}
                  maxLength={10}
                  className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
                >
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loan Status</label>
                <input
                  type="text"
                  name="isLoanApp"
                  value={formData.isLoanApp === "Y" ? "Yes" : "No"}
                  onChange={handleChange}
                  readOnly // Keep readOnly as per current definition
                  className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                  placeholder="Auto-filled from API"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount</label>
                <input
                  type="text"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleChange}
                  readOnly // Keep readOnly as per current definition
                  className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
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
                <label className="block text-sm font-medium text-gray-700 mb-1 ">Work Checklist (Items 1-11)</label>
                <details className="border rounded-lg p-3 bg-white">
                  <summary className="cursor-pointer font-medium text-sm mb-2">Click to view checklist</summary>
                  <div className="flex flex-col bg-gray-100">
                    <label className="text-sm mb-1">
                      <input type="checkbox" name="fixMeter" checked={formData.fixMeter} onChange={handleCheckboxChange} /> Fix Meter
                    </label>
                    <label className="text-sm mb-1">
                      <input type="checkbox" name="testMeter" checked={formData.testMeter} onChange={handleCheckboxChange} /> Test Meter
                    </label>
                    <label className="text-sm mb-1">
                      <input type="checkbox" name="connectMeter" checked={formData.connectMeter} onChange={handleCheckboxChange} /> Connect Meter
                    </label>
                    <label className="text-sm mb-1">
                      <input type="checkbox" name="readMeter" checked={formData.readMeter} onChange={handleCheckboxChange} /> Read Meter
                    </label>
                    <label className="text-sm mb-1">
                      <input type="checkbox" name="disconnectMains" checked={formData.disconnectMains} onChange={handleCheckboxChange} /> Disconnect Mains
                    </label>
                    <label className="text-sm mb-1">
                      <input type="checkbox" name="removeMains" checked={formData.removeMains} onChange={handleCheckboxChange} /> Remove Mains
                    </label>
                    <label className="text-sm mb-1">
                      <input type="checkbox" name="reconnectMains" checked={formData.reconnectMains} onChange={handleCheckboxChange} /> Reconnected Mains
                    </label>
                    <label className="text-sm mb-1">
                      <input type="checkbox" name="refixMeter" checked={formData.refixMeter} onChange={handleCheckboxChange} /> Refix Meter
                    </label>
                    <label className="text-sm mb-1">
                      <input type="checkbox" name="specialReading" checked={formData.specialReading} onChange={handleCheckboxChange} /> Special Reading
                    </label>
                    <label className="text-sm mb-1">
                      <input type="checkbox" name="changeMeter" checked={formData.changeMeter} onChange={handleCheckboxChange} /> Change Meter
                    </label>
                    <label className="text-sm mb-1">
                      <input type="checkbox" name="consumerChange" checked={formData.consumerChange} onChange={handleCheckboxChange} /> Consumer Change
                    </label>
                  </div>
                </details>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meter Number</label>
                <input
                  type="text"
                  name="meterNo"
                  value={formData.meterNo}
                  onChange={handleChange}
                  maxLength={10}
                  className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Transformer Number</label>
                <input
                  type="text"
                  name="transformerNo"
                  value={formData.transformerNo}
                  onChange={handleChange}
                  className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SIN (Substation Number)</label>
                <input
                  type="text"
                  name="sin"
                  value={formData.sin}
                  onChange={handleChange}
                  className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meter Set Type</label>
                <input
                  type="number"
                  name="mtrsetType"
                  value={formData.mtrsetType}
                  onChange={handleMtrSetTypeChange}
                  min="0"
                  max="5"
                  // readOnly
                  className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meter Install Date</label>
                <input
                  type="date"
                  name="effctDate"
                  value={formData.effctDate}
                  onChange={handleChange}
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
                            <th className="py-2 px-4 border-b border-gray-300 text-left">Multiplication Factor</th>
                            <th className="py-2 px-4 border-b border-gray-300 text-left">CT Ratio</th>
                            <th className="py-2 px-4 border-b border-gray-300 text-left">Meter Ratio</th>
                            <th className="py-2 px-4 border-b border-gray-300 text-left">Meter Order</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tableData.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="py-2 px-4 border-b border-gray-300 font-medium">{row.mtr}</td>
                              <td className="py-2 px-4 border-b border-gray-300">
                                <input
                                  type="text"
                                  value={row.test1}
                                  inputMode="numeric"
                                  pattern="[0-9]*"
                                  onChange={(e) => handleTableChange(index, "test1", e.target.value)}
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
                                  className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
                                />
                              </td>
                              <td className="py-2 px-4 border-b border-gray-300">
                                <input
                                  type="text"
                                  // value={row.test5}
                                  value={row.test5=index+1}

                                  onChange={(e) => handleTableChange(index, "test5", e.target.value)}
                                  className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000]"
                                />
                              </td>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Estimate PIV Number</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Estimate Amount</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Estimate Paid Date</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Deposit PIV Number</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Deposit Amount</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Deposit Paid Date</label>
                <input
                  type="text"
                  name="depositDate"
                  value={formData.depositDate}
                  onChange={handleChange}
                  // CHANGED: type to date for consistency
                  // type="date"
                  readOnly
                  className="p-2 w-full bg-white border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Phase</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">VAT Registration Number</label>
                <input
                  type="text"
                  name="taxNumber"
                  value={formData.taxNumber}
                  onChange={handleChange}
                  className={`p-2 w-full border rounded text-sm focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] ${MANAGER_FIELD_STYLE}`}
                />
              </div>
            </div>
          </div>

              
        

          
          {/* Submit Button - Only show if not disabled */}
          {!submitDisabled &&
          (
            <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-[#7c0000] text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
              disabled={loading ||submitDisabled} // Add submitDisabled here
            >
              {loading ? "Loading" : "Submit"}
            </button>
          </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default OrderCardPopupNew;