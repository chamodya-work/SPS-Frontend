// import { useState } from "react";

// const OrderCardPopup = ({ isOpen, onClose, estimateData }) => {
//   const [orderCardData, setOrderCardData] = useState({
//     newAccountNo: "",
//     accountNo: "",
//     dateIssued: "",
//     consumerName: "",
//     orderCardNo: "",
//     ocRefNo: "",
//     addressOfSupply: "",
//     tasks: {
//       fixMeter: false,
//       testMeter: false,
//       connectMeter: false,
//       readMeter: false,
//       disconnectMains: false,
//       removeMains: false,
//       reconnectMains: false,
//       refixMeter: false,
//       specialReading: false,
//       changeMeter: false,
//       consumerChange: false
//     },
//     contactDemand: "",
//     ncrNo: "",
//     preparedBy: "",
//     kvaMeterNo: "",
//     kvaRatio: "",
//     kwhMeterNo: "",
//     kwhRatio: "",
//     ctRatio: "",
//     multiplyingFactorKVA: "",
//     multiplyingFactorKWH: "",
//     tariff: "",
//     deposit: "",
//     pivNo: "",
//     pivDate: "",
//     commercialEngineer: "",
//     commercialEngineerDate: ""
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
    
//     if (name.startsWith("task_")) {
//       const taskName = name.replace("task_", "");
//       setOrderCardData(prev => ({
//         ...prev,
//         tasks: {
//           ...prev.tasks,
//           [taskName]: checked
//         }
//       }));
//     } else {
//       setOrderCardData(prev => ({
//         ...prev,
//         [name]: value
//       }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     console.log("Order Card Data:", orderCardData);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="bg-red-800 text-white p-4 rounded-t-lg">
//           <div className="text-center">
//             <div className="font-bold text-lg">CEYLON ELECTRICITY BOARD</div>
//             <div className="text-sm mt-1">
//               ORDER CARD FOR CONNECTION OF BULK SUPPLY CONSUMER
//             </div>
//           </div>
//         </div>

//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-white hover:text-gray-200 text-2xl"
//         >
//           ×
//         </button>

//         {/* Form Content */}
//         <div className="p-6">
//           <form onSubmit={handleSubmit}>
//             {/* First Row - Basic Information */}
//             <div className="flex flex-wrap mb-6">
//               <div className="w-full lg:w-1/3 px-2 mb-4">
//                 <div className="relative w-full">
//                   <label className="block text-blueGray-600 text-sm mb-1 font-medium">
//                     New Account No
//                   </label>
//                   <input
//                     type="text"
//                     name="newAccountNo"
//                     value={orderCardData.newAccountNo}
//                     onChange={handleChange}
//                     className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                   />
//                 </div>
//               </div>
              
//               <div className="w-full lg:w-1/3 px-2 mb-4">
//                 <div className="relative w-full">
//                   <label className="block text-blueGray-600 text-sm mb-1 font-medium">
//                     Account No
//                   </label>
//                   <input
//                     type="text"
//                     name="accountNo"
//                     value={orderCardData.accountNo}
//                     onChange={handleChange}
//                     className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                   />
//                 </div>
//               </div>
              
//               <div className="w-full lg:w-1/3 px-2 mb-4">
//                 <div className="relative w-full">
//                   <label className="block text-blueGray-600 text-sm mb-1 font-medium">
//                     Date Issued
//                   </label>
//                   <input
//                     type="date"
//                     name="dateIssued"
//                     value={orderCardData.dateIssued}
//                     onChange={handleChange}
//                     className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Consumer Name */}
//             <div className="flex flex-wrap mb-6">
//               <div className="w-full px-2">
//                 <div className="relative w-full">
//                   <label className="block text-blueGray-600 text-sm mb-1 font-medium">
//                     Name of Consumer
//                   </label>
//                   <input
//                     type="text"
//                     name="consumerName"
//                     value={orderCardData.consumerName}
//                     onChange={handleChange}
//                     className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Order Card Details */}
//             <div className="flex flex-wrap mb-6">
//               <div className="w-full lg:w-1/2 px-2 mb-4">
//                 <div className="relative w-full">
//                   <label className="block text-blueGray-600 text-sm mb-1 font-medium">
//                     Order Card No
//                   </label>
//                   <input
//                     type="text"
//                     name="orderCardNo"
//                     value={orderCardData.orderCardNo}
//                     onChange={handleChange}
//                     className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                   />
//                 </div>
//               </div>
              
//               <div className="w-full lg:w-1/2 px-2 mb-4">
//                 <div className="relative w-full">
//                   <label className="block text-blueGray-600 text-sm mb-1 font-medium">
//                     OC Ref No
//                   </label>
//                   <input
//                     type="text"
//                     name="ocRefNo"
//                     value={orderCardData.ocRefNo}
//                     onChange={handleChange}
//                     className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Address */}
//             <div className="flex flex-wrap mb-6">
//               <div className="w-full px-2">
//                 <div className="relative w-full">
//                   <label className="block text-blueGray-600 text-sm mb-1 font-medium">
//                     Address of Supply
//                   </label>
//                   <textarea
//                     name="addressOfSupply"
//                     value={orderCardData.addressOfSupply}
//                     onChange={handleChange}
//                     rows={3}
//                     className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Tasks Section */}
//             <div className="mb-6">
//               <label className="block text-blueGray-600 text-sm mb-3 font-medium">
//                 Tasks
//               </label>
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//                 {[
//                   { key: "fixMeter", label: "Fix Meter" },
//                   { key: "testMeter", label: "Test Meter" },
//                   { key: "connectMeter", label: "Connect Meter" },
//                   { key: "readMeter", label: "Read Meter" },
//                   { key: "disconnectMains", label: "Disconnect Mains" },
//                   { key: "removeMains", label: "Remove Mains" },
//                   { key: "reconnectMains", label: "Reconnect Mains" },
//                   { key: "refixMeter", label: "Refix Meter" },
//                   { key: "specialReading", label: "Special Reading" },
//                   { key: "changeMeter", label: "Change Meter" },
//                   { key: "consumerChange", label: "Consumer Change" }
//                 ].map((task) => (
//                   <label key={task.key} className="flex items-center space-x-2 text-sm">
//                     <input
//                       type="checkbox"
//                       name={`task_${task.key}`}
//                       checked={orderCardData.tasks[task.key]}
//                       onChange={handleChange}
//                       className="rounded border-blueGray-300 text-red-600 focus:ring-red-500"
//                     />
//                     <span>{task.label}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Contact Demand and NCR */}
//             <div className="flex flex-wrap mb-6">
//               <div className="w-full lg:w-1/2 px-2 mb-4">
//                 <div className="relative w-full">
//                   <label className="block text-blueGray-600 text-sm mb-1 font-medium">
//                     Contact Demand
//                   </label>
//                   <input
//                     type="text"
//                     name="contactDemand"
//                     value={orderCardData.contactDemand}
//                     onChange={handleChange}
//                     className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                   />
//                 </div>
//               </div>
              
//               <div className="w-full lg:w-1/2 px-2 mb-4">
//                 <div className="relative w-full">
//                   <label className="block text-blueGray-600 text-sm mb-1 font-medium">
//                     NCR No
//                   </label>
//                   <input
//                     type="text"
//                     name="ncrNo"
//                     value={orderCardData.ncrNo}
//                     onChange={handleChange}
//                     className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Meter Details */}
//             <div className="mb-6">
//               <h3 className="text-blueGray-600 text-sm font-medium mb-3">Meter Details</h3>
//               <div className="flex flex-wrap">
//                 <div className="w-full lg:w-1/4 px-2 mb-4">
//                   <label className="block text-blueGray-600 text-xs mb-1">KVA Meter No</label>
//                   <input
//                     type="text"
//                     name="kvaMeterNo"
//                     value={orderCardData.kvaMeterNo}
//                     onChange={handleChange}
//                     className="border-0 px-3 py-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
//                   />
//                 </div>
//                 <div className="w-full lg:w-1/4 px-2 mb-4">
//                   <label className="block text-blueGray-600 text-xs mb-1">Ratio</label>
//                   <input
//                     type="text"
//                     name="kvaRatio"
//                     value={orderCardData.kvaRatio}
//                     onChange={handleChange}
//                     className="border-0 px-3 py-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
//                   />
//                 </div>
//                 <div className="w-full lg:w-1/4 px-2 mb-4">
//                   <label className="block text-blueGray-600 text-xs mb-1">kWH Meter No</label>
//                   <input
//                     type="text"
//                     name="kwhMeterNo"
//                     value={orderCardData.kwhMeterNo}
//                     onChange={handleChange}
//                     className="border-0 px-3 py-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
//                   />
//                 </div>
//                 <div className="w-full lg:w-1/4 px-2 mb-4">
//                   <label className="block text-blueGray-600 text-xs mb-1">Ratio</label>
//                   <input
//                     type="text"
//                     name="kwhRatio"
//                     value={orderCardData.kwhRatio}
//                     onChange={handleChange}
//                     className="border-0 px-3 py-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Additional Details */}
//             <div className="flex flex-wrap mb-6">
//               <div className="w-full lg:w-1/3 px-2 mb-4">
//                 <label className="block text-blueGray-600 text-sm mb-1 font-medium">CT Ratio</label>
//                 <input
//                   type="text"
//                   name="ctRatio"
//                   value={orderCardData.ctRatio}
//                   onChange={handleChange}
//                   className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
//                 />
//               </div>
//               <div className="w-full lg:w-1/3 px-2 mb-4">
//                 <label className="block text-blueGray-600 text-sm mb-1 font-medium">Multiplying Factor kVA</label>
//                 <input
//                   type="text"
//                   name="multiplyingFactorKVA"
//                   value={orderCardData.multiplyingFactorKVA}
//                   onChange={handleChange}
//                   className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
//                 />
//               </div>
//               <div className="w-full lg:w-1/3 px-2 mb-4">
//                 <label className="block text-blueGray-600 text-sm mb-1 font-medium">Multiplying Factor kWh</label>
//                 <input
//                   type="text"
//                   name="multiplyingFactorKWH"
//                   value={orderCardData.multiplyingFactorKWH}
//                   onChange={handleChange}
//                   className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
//                 />
//               </div>
//             </div>

//             {/* Footer Section */}
//             <div className="flex flex-wrap mb-6">
//               <div className="w-full lg:w-1/2 px-2 mb-4">
//                 <label className="block text-blueGray-600 text-sm mb-1 font-medium">Prepared by</label>
//                 <input
//                   type="text"
//                   name="preparedBy"
//                   value={orderCardData.preparedBy}
//                   onChange={handleChange}
//                   className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
//                 />
//               </div>
//               <div className="w-full lg:w-1/2 px-2 mb-4">
//                 <label className="block text-blueGray-600 text-sm mb-1 font-medium">Tariff</label>
//                 <input
//                   type="text"
//                   name="tariff"
//                   value={orderCardData.tariff}
//                   onChange={handleChange}
//                   className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
//                 />
//               </div>
//             </div>

//             <div className="flex flex-wrap mb-6">
//               <div className="w-full lg:w-1/2 px-2 mb-4">
//                 <label className="block text-blueGray-600 text-sm mb-1 font-medium">Deposit</label>
//                 <input
//                   type="text"
//                   name="deposit"
//                   value={orderCardData.deposit}
//                   onChange={handleChange}
//                   className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
//                 />
//               </div>
//               <div className="w-full lg:w-1/2 px-2 mb-4">
//                 <label className="block text-blueGray-600 text-sm mb-1 font-medium">PIV No</label>
//                 <input
//                   type="text"
//                   name="pivNo"
//                   value={orderCardData.pivNo}
//                   onChange={handleChange}
//                   className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
//                 />
//               </div>
//             </div>

//             <div className="flex flex-wrap mb-6">
//               <div className="w-full lg:w-1/2 px-2 mb-4">
//                 <label className="block text-blueGray-600 text-sm mb-1 font-medium">Date PIV</label>
//                 <input
//                   type="date"
//                   name="pivDate"
//                   value={orderCardData.pivDate}
//                   onChange={handleChange}
//                   className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
//                 />
//               </div>
//               <div className="w-full lg:w-1/2 px-2 mb-4">
//                 <label className="block text-blueGray-600 text-sm mb-1 font-medium">Commercial Engineer</label>
//                 <input
//                   type="text"
//                   name="commercialEngineer"
//                   value={orderCardData.commercialEngineer}
//                   onChange={handleChange}
//                   className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
//                 />
//               </div>
//             </div>

//             <div className="flex flex-wrap">
//               <div className="w-full lg:w-1/2 px-2">
//                 <label className="block text-blueGray-600 text-sm mb-1 font-medium">Date</label>
//                 <input
//                   type="date"
//                   name="commercialEngineerDate"
//                   value={orderCardData.commercialEngineerDate}
//                   onChange={handleChange}
//                   className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
//                 />
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex justify-end space-x-3 mt-8 pt-4 border-t">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-6 py-2 bg-red-800 text-white rounded-md hover:bg-red-700 transition-colors"
//               >
//                 Save Order Card
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderCardPopup;