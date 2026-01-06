// // components/PrintUtility/PrintUtility.js
// import React, { useState, useRef } from "react";
// import { toast } from "react-toastify";

// // Custom hook for print functionality
// export const usePrint = () => {
//   const [printData, setPrintData] = useState(null);
//   const [isPrintLoading, setIsPrintLoading] = useState(false);
//   const printContentRef = useRef();

//   const handleSimplePrint = () => {
//     if (!printData) return;
    
//     const printWindow = window.open('', '_blank');
//     const printContent = document.getElementById('print-content');
    
//     if (!printContent) {
//       toast.error("Print content not found!");
//       return;
//     }

//     const printHTML = `
//       <!DOCTYPE html>
//       <html>
//         <head> 
//           <title>Order Card - ${printData.formData.orderCardNo || printData.formData.projectNo}</title>
//           <!-- this is how save the pdf file  eg: Order Card - 480.20_ORD_25_01.pdf -->
            
//           <style>
//             body { font-family: Arial, sans-serif; margin: 20px; }
//             .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; }
//             .section { margin: 20px 0; }
//             table { width: 100%; border-collapse: collapse; margin: 10px 0; }
//             th, td { border: 1px solid #000; padding: 8px; text-align: left; }
//             th { background-color: #f2f2f2; }
//             .signature { display: flex; justify-content: space-between; margin-top: 50px; }
//             .signature-box { text-align: center; width: 30%; }
//             @media print {
//               body { margin: 0; }
//               @page { margin: 20mm; }
//             }
//           </style>
//         </head>
//         <body>
//           ${printContent.innerHTML}
//         </body>
//       </html>
//     `;

//     printWindow.document.write(printHTML);
//     printWindow.document.close();
    
//     printWindow.onload = () => {
//       printWindow.focus();
//       printWindow.print();
//       printWindow.onafterprint = () => {
//         printWindow.close();
//         toast.success("Print completed!");
//         setPrintData(null);
//       };
//     };
//   };

//   const resetPrintData = () => {
//     setPrintData(null);
//   };

//   return {
//     printData,
//     setPrintData,
//     isPrintLoading,
//     setIsPrintLoading,
//     printContentRef,
//     handleSimplePrint,
//     resetPrintData
//   };
// };

// // Function to fetch order card data for printing
// export const fetchOrderCardPrintData = async (baseUrl, projectNumber, deptId) => {
//   try {
//     const response = await fetch(
//       `${baseUrl}/api/order-cards/by-project-dept?projectNo=${encodeURIComponent(projectNumber.trim())}&deptId=${encodeURIComponent(deptId.trim())}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Basic " + btoa("user:admin123"),
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Order card not found");
//     }

//     const orderCardData = await response.json();

//     // Prepare formData
//     const formData = {
//       projectNo: orderCardData.projectNo || "",
//       orderCardNo: orderCardData.orderCardNo || "",
//       dateIssued: orderCardData.connectedDate || "",
//       nameOfConsumer: orderCardData.customerName || "",
//       addressOfSupply: orderCardData.addressOfSupply || "",
//       contactDemand: orderCardData.contractDemand || "",
//       customerCategory: orderCardData.customerCategory || "",
//       natureOfSupplyCategory: orderCardData.natureOfSupplyCategory || "",
//       isicNumber: orderCardData.isicNumber || "",
//       customerOwnershipType: orderCardData.customerOwnershipType || "",
//       tariffType: orderCardData.tariffType || "",
//       transformerNo: orderCardData.transformerNumber || "",
//       sin: orderCardData.sinNumber || "",
//       areaCode: orderCardData.areaCode || "",
//       depoCode: orderCardData.depotCode || "",
//       estPivNumber: orderCardData.estPivNumber || "",
//       estAmount: orderCardData.estAmount || "",
//       estPayDate: orderCardData.estPayDate || "",
//       depPivNumber: orderCardData.depPivNumber || "",
//       depositAmount: orderCardData.depositAmount || "",
//       depositDate: orderCardData.depositDate || "",
//       isLoanApp: orderCardData.isLoanApp || "",
//       loanAmount: orderCardData.loanAmount || "",
//       loanType: orderCardData.loanType || "",
//       deptId: orderCardData.deptId || deptId,
//     };

//     return { formData, tableData: [], mtrTypes: [] };
//   } catch (error) {
//     console.error("Error fetching print data:", error);
//     throw error;
//   }
// };

// // Print Modal Component
// export const PrintModal = ({ 
//   printData, 
//   onClose, 
//   onPrint, 
//   isPrintLoading = false,
//   title = "Print Document",
//   customContent = null 
// }) => {
//   if (!printData) return null;

//   const styles = {
//     overlay: {
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       backgroundColor: 'rgba(0,0,0,0.5)',
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       zIndex: 1000,
//     },
//     content: {
//       backgroundColor: 'white',
//       padding: '30px',
//       borderRadius: '8px',
//       minWidth: '400px',
//       textAlign: 'center',
//       boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
//     },
//     buttons: {
//       marginTop: '20px',
//       display: 'flex',
//       gap: '10px',
//       justifyContent: 'center',
//     },
//     printButton: {
//       padding: '10px 20px',
//       backgroundColor: '#3498db',
//       color: 'white',
//       border: 'none',
//       borderRadius: '4px',
//       cursor: 'pointer',
//       fontSize: '16px',
//     },
//     cancelButton: {
//       padding: '10px 20px',
//       backgroundColor: '#e74c3c',
//       color: 'white',
//       border: 'none',
//       borderRadius: '4px',
//       cursor: 'pointer',
//       fontSize: '16px',
//     }
//   };

//   return (
//     <div style={styles.overlay}>
//       <div style={styles.content}>
//         <h3>{title}</h3>
        
//         {customContent || (
//           <>
//             <p>Order Card No: <strong>{printData.formData.orderCardNo || printData.formData.projectNo}</strong></p>
//             <p>Customer: {printData.formData.nameOfConsumer}</p>
//             {/* this define popup message details when clicking print order card */}
//           </>
//         )}

//         {/* Hidden print content */}
//         <div id="print-content" style={{ display: 'none' }}>
//           <div className="header">
//             <h2>CEYLON ELECTRICITY BOARD</h2>
//             <h3>ORDER CARD FOR CONNECTION OF BULK SUPPLY CONSUMER</h3>
//             <p><strong>Order Card No:</strong> {printData.formData.orderCardNo || printData.formData.projectNo}</p>
//             <p><strong>Date Issued:</strong> {printData.formData.dateIssued}</p>
//           </div>
          
//           <div className="section">
//             <h3>Customer Details</h3>
//             <p><strong>Project No:</strong> {printData.formData.projectNo}</p>
//             <p><strong>Customer Name:</strong> {printData.formData.nameOfConsumer}</p>
//             <p><strong>Address:</strong> {printData.formData.addressOfSupply}</p>
//             <p><strong>Dept ID:</strong> {printData.formData.deptId}</p>
//             <p><strong>Contract Demand:</strong> {printData.formData.contactDemand} kVA</p>
//             <p><strong>Tariff Type:</strong> {printData.formData.tariffType}</p>
//           </div>
          
//           <div className="section">
//             <h3>Financial Details</h3>
//             <p><strong>Estimate Amount:</strong> Rs. {printData.formData.estAmount}</p>
//             <p><strong>Deposit Amount:</strong> Rs. {printData.formData.depositAmount}</p>
//             <p><strong>Loan Amount:</strong> Rs. {printData.formData.loanAmount}</p>
//             <p><strong>Loan Type:</strong> {printData.formData.loanType}</p>
//           </div>
          
//           <div className="signature">
//             <div className="signature-box">
//               <div style={{ borderBottom: '1px solid #000', height: '20px', marginBottom: '5px' }}></div>
//               <div>Prepared By</div>
//             </div>
//             <div className="signature-box">
//               <div style={{ borderBottom: '1px solid #000', height: '20px', marginBottom: '5px' }}></div>
//               <div>Checked By</div>
//             </div>
//             <div className="signature-box">
//               <div style={{ borderBottom: '1px solid #000', height: '20px', marginBottom: '5px' }}></div>
//               <div>Approved By</div>
//             </div>
//           </div>
//         </div>

//         <div style={styles.buttons}>
//           <button 
//             style={styles.printButton}
//             onClick={onPrint}
//             disabled={isPrintLoading}
//           >
//             {isPrintLoading ? "Loading..." : "🖨️ Print Now"}
//           </button>
//           <button 
//             style={styles.cancelButton}
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Optional: Function to generate print content for different templates
// export const generatePrintContent = {
//   orderCard: (data) => {
//     return `
//       <div class="header">
//         <h2>CEYLON ELECTRICITY BOARD</h2>
//         <h3>ORDER CARD FOR CONNECTION OF BULK SUPPLY CONSUMER</h3>
//         <p><strong>Order Card No:</strong> ${data.orderCardNo || data.projectNo}</p>
//         <p><strong>Date Issued:</strong> ${data.dateIssued}</p>
//       </div>
//       <div class="section">
//         <h3>Customer Details</h3>
//         <p><strong>Project No:</strong> ${data.projectNo}</p>
//         <p><strong>Customer Name:</strong> ${data.nameOfConsumer}</p>
//         <p><strong>Address:</strong> ${data.addressOfSupply}</p>
//         <p><strong>Dept ID:</strong> ${data.deptId}</p>
//         <p><strong>Contract Demand:</strong> ${data.contactDemand} kVA</p>
//         <p><strong>Tariff Type:</strong> ${data.tariffType}</p>
//       </div>
//       <div class="section">
//         <h3>Financial Details</h3>
//         <p><strong>Estimate Amount:</strong> Rs. ${data.estAmount}</p>
//         <p><strong>Deposit Amount:</strong> Rs. ${data.depositAmount}</p>
//         <p><strong>Loan Amount:</strong> Rs. ${data.loanAmount}</p>
//         <p><strong>Loan Type:</strong> ${data.loanType}</p>
//       </div>
//       <div class="signature">
//         <div class="signature-box">
//           <div style="border-bottom: 1px solid #000; height: 20px; margin-bottom: 5px;"></div>
//           <div>Prepared By</div>
//         </div>
//         <div class="signature-box">
//           <div style="border-bottom: 1px solid #000; height: 20px; margin-bottom: 5px;"></div>
//           <div>Checked By</div>
//         </div>
//         <div class="signature-box">
//           <div style="border-bottom: 1px solid #000; height: 20px; margin-bottom: 5px;"></div>
//           <div>Approved By</div>
//         </div>
//       </div>
//     `;
//   },
//   // Add more templates as needed
//   invoice: (data) => {
//     return `<h1>Invoice Template - ${data.invoiceNo}</h1>`;
//   }
// };




//this 2 code for testing wich support print with table mapping
// components/PrintUtility/PrintUtility.js
import { color } from "@mui/system";
import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { blue } from "tailwindcss/colors";

// Custom hook for print functionality
export const usePrint = () => {
  const [printData, setPrintData] = useState(null);
  const [isPrintLoading, setIsPrintLoading] = useState(false);
  const printContentRef = useRef();

  const handleSimplePrint = () => {
    if (!printData) return;
    
    const printWindow = window.open('', '_blank');
    const printContent = document.getElementById('print-content');
    
    if (!printContent) {
      toast.error("Print content not found!");
      return;
    }

    const printHTML = `
      <!DOCTYPE html>
      <html>
        <head> 
          <title>Order Card - ${printData.formData.orderCardNo || printData.formData.projectNo}</title>
          <!-- this is how save the pdf file  eg: Order Card - 480.20_ORD_25_01.pdf -->
            
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; }
            .section { margin: 20px 0; }
            table { width: 100%; border-collapse: collapse; margin: 10px 0; }
            th, td { border: 1px solid #000; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .signature { display: flex; justify-content: space-between; margin-top: 50px; }
            .signature-box { text-align: center; width: 30%; }
            /* Added: Flex row for two-column layout to match PDF structure */
            .flex-row { display: flex; justify-content: space-between; margin-bottom: 20px; }
            .field-left { width: 48%; }
            .field-right { width: 48%; }
            .numbered-list { margin: 10px 0; }
            .numbered-list p { margin: 2px 0; }
            .certification { font-size: 12px; margin-top: 20px; }

            .field-left:before, 
            .field-right:before,
            p:before {
                content: "";
                font-weight: bold;
            }

            @media print {
              body { margin: 0; }
              @page { margin: 20mm; }
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `;

    printWindow.document.write(printHTML);
    printWindow.document.close();
    
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
      printWindow.onafterprint = () => {
        printWindow.close();
        toast.success("Print completed!");
        setPrintData(null);
      };
    };
  };

  const resetPrintData = () => {
    setPrintData(null);
  };

  return {
    printData,
    setPrintData,
    isPrintLoading,
    setIsPrintLoading,
    printContentRef,
    handleSimplePrint,
    resetPrintData
  };
};

// Function to fetch order card data for printing
export const fetchOrderCardPrintData = async (baseUrl, projectNumber, deptId) => {
  try {
    const response = await fetch(
      `${baseUrl}/api/order-cards/by-project-dept?projectNo=${encodeURIComponent(projectNumber.trim())}&deptId=${encodeURIComponent(deptId.trim())}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("user:admin123"),
        },
      }
    );

    if (!response.ok) {
      throw new Error("Order card not found");
    }

    const orderCardData = await response.json();

    /* Added: Fetch meter details using orderCardNo, similar to OrderCardPopupNewEdit.js */
    let tableData = [];
    let mtrTypes = [];
    if (orderCardData.orderCardNo) {
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
        // Sort by mtrOrder, as in OrderCardPopupNewEdit.js
        meterData.sort((a, b) => (a.mtrOrder || 0) - (b.mtrOrder || 0));

        // Derive mtrTypes from fetched meter data
        mtrTypes = meterData.map((item) => ({ mtrType: item.mtrType }));

        // Set tableData from fetched meter data, mapping to table structure
        tableData = meterData.map((item, index) => ({
          mtr: item.mtrType || '',
          test1: item.prsntRdn || '',  // Initial Reading
          test2: item.mtrFactor || '', // Multiplication Factor
          test3: item.ctRatio || '',   // CT Ratio
          test4: item.mtrRatio || '',  // Meter Ratio
          test5: item.mtrOrder || index + 1, // Meter Order
          /* Added: Additional meter fields for detailed mapping */
          mtrNbr: item.mtrNbr || '',
          brCode: item.brCode || '',
          noOfPhases: item.noOfPhases || '',
          effctDate: item.effctDate ? item.effctDate.split("T")[0] : '',
          areaCd: item.areaCd || '',
          dpCode: item.dpCode || '',
        }));
      }
    }

    // Prepare formData
    const formData = {
      projectNo: orderCardData.projectNo || "",
      orderCardNo: orderCardData.orderCardNo || "",
      dateIssued: orderCardData.connectedDate || "",
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
      estPayDate: orderCardData.estPayDate || "",
      depPivNumber: orderCardData.depPivNumber || "",
      depositAmount: orderCardData.depositAmount || "",
      depositDate: orderCardData.depositDate || "",
      isLoanApp: orderCardData.isLoanApp || "",
      loanAmount: orderCardData.loanAmount || "",
      loanType: orderCardData.loanType || "",
      deptId: orderCardData.deptId || deptId,
      /* Added: Additional fields to match PDF template structure (assuming they might be in orderCardData; defaults to empty if not present) */
      newAccountNo: orderCardData.newAccountNo || "",
      accountNo: orderCardData.accountNo || "",
      ocRefNo: orderCardData.ocRefNo || "",
      kvaMeterNo: orderCardData.kvaMeterNo || "",
      kvaRatio: orderCardData.kvaRatio || "",
      kwhMeterNo: orderCardData.kwhMeterNo || "",
      kwhRatio: orderCardData.kwhRatio || "",
      ctRatio: orderCardData.ctRatio || "",
      multiplyingFactorKva: orderCardData.multiplyingFactorKva || "",
      multiplyingFactorKwh: orderCardData.multiplyingFactorKwh || "",
      ncrNo: orderCardData.ncrNo || "",
      pivNo: orderCardData.pivNo || orderCardData.depPivNumber || "",
      datePiv: orderCardData.datePiv || orderCardData.depositDate || "",
      meterFixed: orderCardData.meterFixed || "",
      meterRemoved: orderCardData.meterRemoved || "",
      kwhReading: orderCardData.kwhReading || "",
      kvaReading: orderCardData.kvaReading || "",
      dateInstalled: orderCardData.dateInstalled || "",
      meterRatio: orderCardData.meterRatio || "",
      capacityKva: orderCardData.capacityKva || orderCardData.contractDemand || "",
      meterType: orderCardData.meterType || "",
      ppmConvention: orderCardData.ppmConvention || "",
      meterInstalledBy: orderCardData.meterInstalledBy || "",
      es: orderCardData.es || "",
      cscName: orderCardData.cscName || "",
      areaEngineer: orderCardData.areaEngineer || "",
      areaName: orderCardData.areaName || "",
      /* Added: Populate additional form fields from first meter detail if available (assuming consistent across sets) */
      meterNo: tableData.length > 0 ? tableData[0].mtrNbr : "",
      brCode: tableData.length > 0 ? tableData[0].brCode : "",
      mtrsetType: orderCardData.mtrsetType || (tableData.length > 0 ? tableData[0].setType : ""),
      numberOfPhase: tableData.length > 0 ? tableData[0].noOfPhases : "",
      effctDate: tableData.length > 0 ? tableData[0].effctDate : "",
      /* Added: If specific meter types for kVA/kWh, extract; otherwise use first/second if applicable */
      kvaMeterNo: tableData.find(row => row.mtr?.toLowerCase().includes('kva'))?.mtrNbr || (tableData[1]?.mtrNbr || ""),
      kvaRatio: tableData.find(row => row.mtr?.toLowerCase().includes('kva'))?.test4 || (tableData[1]?.test4 || ""),
      kwhMeterNo: tableData.find(row => row.mtr?.toLowerCase().includes('kwh'))?.mtrNbr || (tableData[0]?.mtrNbr || ""),
      kwhRatio: tableData.find(row => row.mtr?.toLowerCase().includes('kwh'))?.test4 || (tableData[0]?.test4 || ""),
      ctRatio: tableData[0]?.test3 || "",
      multiplyingFactorKva: tableData.find(row => row.mtr?.toLowerCase().includes('kva'))?.test2 || (tableData[1]?.test2 || ""),
      multiplyingFactorKwh: tableData.find(row => row.mtr?.toLowerCase().includes('kwh'))?.test2 || (tableData[0]?.test2 || ""),
      kwhReading: tableData.find(row => row.mtr?.toLowerCase().includes('kwh'))?.test1 || (tableData[0]?.test1 || ""),
      kvaReading: tableData.find(row => row.mtr?.toLowerCase().includes('kva'))?.test1 || (tableData[1]?.test1 || ""),
      dateInstalled: tableData[0]?.effctDate || "",
    };

    return { formData, tableData, mtrTypes };
  } catch (error) {
    console.error("Error fetching print data:", error);
    throw error;
  }
};

// Print Modal Component
export const PrintModal = ({ 
  printData, 
  onClose, 
  onPrint, 
  isPrintLoading = false,
  title = "Print Document",
  customContent = null 
}) => {
  if (!printData) return null;

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    content: {
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '8px',
      minWidth: '400px',
      textAlign: 'center',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    },
    buttons: {
      marginTop: '20px',
      display: 'flex',
      gap: '10px',
      justifyContent: 'center',
    },
    printButton: {
      padding: '10px 20px',
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
    },
    cancelButton: {
      padding: '10px 20px',
      backgroundColor: '#e74c3c',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.content}>
        <h3>{title}</h3>
        
        {customContent || (
          <>
            <p>Order Card No: <strong>{printData.formData.orderCardNo || printData.formData.projectNo}</strong></p>
            <p>Customer: {printData.formData.nameOfConsumer}</p>
            {/* this define popup message details when clicking print order card */}
            {/* Added: More details in popup for better preview, including some new fields */}
            {/* <p>Contract Demand: {printData.formData.contactDemand} kVA</p>
            <p>Tariff: {printData.formData.tariffType}</p> */}
          </>
        )}

        {/* Hidden print content */}
        <div id="print-content" style={{ display: 'none' }}>
          <div className="header">
            <h2 style={{color:"#7A0000"}}>CEYLON ELECTRICITY BOARD</h2>
            <h3 style={{color:'#7A0000'}}>ORDER CARD FOR CONNECTION OF BULK SUPPLY CONSUMER</h3>
          </div>
          
          {/* Added: Restructured to match PDF layout with flex rows for two-column fields */}
          <div className="section">
            <div className="flex-row">
              <div className="field-left">New Account No: {printData.formData.newAccountNo}</div>
              <div className="field-right">Order Card No: {printData.formData.orderCardNo}</div>
            </div>
            <div className="flex-row">
              <div className="field-left">Account No: {printData.formData.accountNo}</div>
              <div className="field-right">OC Ref No: {printData.formData.ocRefNo}</div>
            </div>
            <div className="flex-row">
              <div className="field-left">Date Issued: {printData.formData.dateIssued?.split('T')[0]}</div>
            </div>
            <div className="flex-row">
              <div className="field-left">Name of Consumer: {printData.formData.nameOfConsumer}</div>
              <div className="field-right">Address of Supply:{printData.formData.addressOfSupply}</div>
            </div>
          </div>
          
          <div className="section">
            {/* Added: Static numbered list from PDF */}
            {/* <div className="numbered-list">
              <p>1. Fix Meter</p>
              <p>2. Test Meter</p>
              <p>3. Connect Meter</p>
              <p>4. Read Meter</p>
              <p>5. Disconnect Mains</p>
              <p>6. Remove Mains</p>
              <p>7. Reconnect Mains</p>
              <p>8. Refix Meter</p>
              <p>9. Special Reading</p>
              <p>10. Change Meter</p>
              <p>11. Consumer Change</p>
            </div> */}
            
            <div className="flex-row">
              <div className="field-left">Contact Demand: {printData.formData.contactDemand}</div>
              <div className="field-right">NCR No: {printData.formData.ncrNo}</div>
            </div>
            
            <div className="flex-row">
              <div className="field-left">kVA Meter No: {printData.formData.kvaMeterNo}</div>
              <div className="field-right">Ratio: {printData.formData.kvaRatio}</div>
            </div>
            <div className="flex-row">
              <div className="field-left">kWH Meter No: {printData.formData.kwhMeterNo}</div>
              <div className="field-right">Ratio: {printData.formData.kwhRatio}</div>
            </div>
            <div className="flex-row">
              <div className="field-left">CT Ratio: {printData.formData.ctRatio}</div>
            </div>
            <div className="flex-row">
              <div className="field-left">Multiplying Factor kVA: {printData.formData.multiplyingFactorKva}</div>
              <div className="field-right">kWh: {printData.formData.multiplyingFactorKwh}</div>
            </div>
            <div className="flex-row">
              <div className="field-left">Tariff: {printData.formData.tariffType}</div>
              <div className="field-right">Deposit: {printData.formData.depositAmount}</div>
            </div>
            <div className="flex-row">
              <div className="field-left">PIV No.: {printData.formData.pivNo}</div>
              <div className="field-right">Date PIV: {printData.formData.datePiv}</div>
            </div>
            
            {/* Added: Other formData fields integrated where relevant */}
            <p>Project No: {printData.formData.projectNo}</p>
            <p>Customer Category: {printData.formData.customerCategory}</p>
            <p>Nature of Supply Category: {printData.formData.natureOfSupplyCategory}</p>
            <p>ISIC Number: {printData.formData.isicNumber}</p>
            <p>Customer Ownership Type: {printData.formData.customerOwnershipType}</p>
            <p>Area Code: {printData.formData.areaCode}</p>
            <p>Depo Code: {printData.formData.depoCode}</p>
            <p>Estimate PIV Number: {printData.formData.estPivNumber}</p>
            <p>Estimate Amount: Rs. {printData.formData.estAmount}</p>
            <p>Estimate Pay Date: {printData.formData.estPayDate}</p>
            <p>Is Loan App: {printData.formData.isLoanApp}</p>
            <p>Loan Amount: Rs. {printData.formData.loanAmount}</p>
            <p>Loan Type: {printData.formData.loanType}</p>
            <p>Dept ID: {printData.formData.deptId}</p>
          </div>
          
          <div className="signature">
            <div className="signature-box">
              <div style={{ borderBottom: '1px solid #000', height: '20px', marginBottom: '5px' }}></div>
              <div>Prepared By</div>
            </div>
            <div className="signature-box">
              <div style={{ borderBottom: '1px solid #000', height: '20px', marginBottom: '5px' }}></div>
              <div>Commercial Engineer</div>
            </div>
            <div className="signature-box">
              <div style={{ borderBottom: '1px solid #000', height: '20px', marginBottom: '5px' }}></div>
              <div>Date</div>
            </div>
          </div>
          
          {/* Added: For Area Use section from PDF */}
          <div className="section">
            <h3>For Area Use</h3>
            <div className="flex-row">
              <div className="field-left">Meter Fixed: {printData.formData.meterFixed}</div>
              <div className="field-right">Meter Removed: {printData.formData.meterRemoved}</div>
            </div>
            <div className="flex-row">
              <div className="field-left">Multiplying Factor</div>
            </div>
            <div className="flex-row">
              <div className="field-left">Meter No (kWh): {printData.formData.kwhMeterNo}</div>
              <div className="field-right">Reading: {printData.formData.kwhReading}</div>
              <div className="field-right">Date Installed: {printData.formData.dateInstalled}</div>
            </div>
            <div className="flex-row">
              <div className="field-left">Meter No (kVA): {printData.formData.kvaMeterNo}</div>
              <div className="field-right">Reading: {printData.formData.kvaReading}</div>
              <div className="field-right">Date Installed: {printData.formData.dateInstalled}</div>
            </div>
            <div className="flex-row">
              <div className="field-left">Meter Ratio: {printData.formData.meterRatio}</div>
            </div>
            <div className="flex-row">
              <div className="field-left">SIN (Substation No): {printData.formData.sin}</div>
              <div className="field-right">Capacity (KVA): {printData.formData.capacityKva}</div>
            </div>
            <div className="flex-row">
              <div className="field-left">Transformer No.: {printData.formData.transformerNo}</div>
              <div className="field-right">Meter Type: {printData.formData.meterType}</div>
            </div>
            <div className="flex-row">
              <div className="field-left">PPM/Convention: {printData.formData.ppmConvention}</div>
              <div className="field-right">Meter Installed by: {printData.formData.meterInstalledBy}</div>
            </div>
            <div className="flex-row">
              <div className="field-left">Date: {printData.formData.dateInstalled}</div>
            </div>
            <div className="flex-row">
              <div className="field-left">ES: {printData.formData.es}</div>
              <div className="field-right">CSC Name: {printData.formData.cscName}</div>
            </div>
            <div className="flex-row">
              <div className="field-left">Date: {printData.formData.dateInstalled}</div>
            </div>
          </div>

           {/* Added: Optional table for meter details if tableData is populated (supports future table data for meters) */}
          {/* Updated: Adjusted columns to match the table in OrderCardPopupNewEdit.js */}
          {printData.tableData && printData.tableData.length > 0 && (
            <div className="section">
              <h3>Meter Details Table</h3>
              <table>
                <thead>
                  <tr>
                    <th>Meter Type</th>
                    <th>Initial Reading</th>
                    <th>Multiplication Factor</th>
                    <th>CT Ratio</th>
                    <th>Meter Ratio</th>
                    <th>Meter Order</th>
                    {/* Added: Extra columns for more meter details from tableData */}
                    {/* <th>Meter Number</th>
                    <th>Brand Code</th>
                    <th>No. of Phases</th>
                    <th>Effective Date</th> */}
                  </tr>
                </thead>
                <tbody>
                  {printData.tableData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.mtr || ''}</td>
                      <td>{row.test1 || ''}</td>
                      <td>{row.test2 || ''}</td>
                      <td>{row.test3 || ''}</td>
                      <td>{row.test4 || ''}</td>
                      <td>{row.test5 || ''}</td>
                      {/* <td>{row.mtrNbr || ''}</td>
                      <td>{row.brCode || ''}</td>
                      <td>{row.noOfPhases || ''}</td>
                      <td>{row.effctDate || ''}</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {/* Added: Certification text from PDF */}
          <div className="certification">
            <p>I certify that the meter wiring has been tested by me and that a new tamper proof cubicle has been installed order card has been dispatched to Accountant Revenue immediately.</p>
            <p>Area Engineer should confirm that the Multiplication Factor is correct.</p>
          </div>
          
          {/* Added: Additional signature for Area Engineer */}
          <div className="signature">
            <div className="signature-box">
              <div style={{ borderBottom: '1px solid #000', height: '20px', marginBottom: '5px' }}></div>
              <div>Area Engineer: {printData.formData.areaEngineer}</div>
            </div>
            <div className="signature-box">
              <div style={{ borderBottom: '1px solid #000', height: '20px', marginBottom: '5px' }}></div>
              <div>Area Name: {printData.formData.areaName}</div>
            </div>
            <div className="signature-box">
              <div style={{ borderBottom: '1px solid #000', height: '20px', marginBottom: '5px' }}></div>
              <div>Date</div>
            </div>
          </div>
          
         
        </div>

        <div style={styles.buttons}>
          <button 
            style={styles.printButton}
            onClick={onPrint}
            disabled={isPrintLoading}
          >
            {isPrintLoading ? "Loading..." : "🖨️ Print Now"}
          </button>
          <button 
            style={styles.cancelButton}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Optional: Function to generate print content for different templates
export const generatePrintContent = {
  orderCard: (data) => {
    return `
      <div class="header">
        <h2>CEYLON ELECTRICITY BOARD</h2>
        <h3>ORDER CARD FOR CONNECTION OF BULK SUPPLY CONSUMER</h3>
        <p><strong>Order Card No:</strong> ${data.orderCardNo || data.projectNo}</p>
        <p><strong>Date Issued:</strong> ${data.dateIssued}</p>
      </div>
      <div class="section">
        <h3>Customer Details</h3>
        <p><strong>Project No:</strong> ${data.projectNo}</p>
        <p><strong>Customer Name:</strong> ${data.nameOfConsumer}</p>
        <p><strong>Address:</strong> ${data.addressOfSupply}</p>
        <p><strong>Dept ID:</strong> ${data.deptId}</p>
        <p><strong>Contract Demand:</strong> ${data.contactDemand} kVA</p>
        <p><strong>Tariff Type:</strong> ${data.tariffType}</p>
      </div>
      <div class="section">
        <h3>Financial Details</h3>
        <p><strong>Estimate Amount:</strong> Rs. ${data.estAmount}</p>
        <p><strong>Deposit Amount:</strong> Rs. ${data.depositAmount}</p>
        <p><strong>Loan Amount:</strong> Rs. ${data.loanAmount}</p>
        <p><strong>Loan Type:</strong> ${data.loanType}</p>
      </div>
      <div class="signature">
        <div class="signature-box">
          <div style="border-bottom: 1px solid #000; height: 20px; margin-bottom: 5px;"></div>
          <div>Prepared By</div>
        </div>
        <div class="signature-box">
          <div style="border-bottom: 1px solid #000; height: 20px; margin-bottom: 5px;"></div>
          <div>Checked By</div>
        </div>
        <div class="signature-box">
          <div style="border-bottom: 1px solid #000; height: 20px; margin-bottom: 5px;"></div>
          <div>Approved By</div>
        </div>
      </div>
    `;
  },
  // Add more templates as needed
  invoice: (data) => {
    return `<h1>Invoice Template - ${data.invoiceNo}</h1>`;
  }
};