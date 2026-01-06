// // src/components/OrderCardPopup.js
// import { useState } from "react";

// const OrderCardPopup = ({ isOpen, onClose }) => {
//   const [formData, setFormData] = useState({
//     newAccountNo: "",
//     accountNo: "",
//     orderCardNo: "",
//     dateIssued: "",
//     ocRefNo: "",
//     nameOfConsumer: "",
//     addressOfSupply: "",
//     fixMeter: "",
//     testMeter: "",
//     connectMeter: "",
//     readMeter: "",
//     disconnectMains: "",
//     removeMains: "",
//     reconnectMains: "",
//     kvaMeterNo: "",
//     kvaRatio: "",
//     refixMeter: "",
//     kwhMeterNo: "",
//     kwhRatio: "",
//     specialReading: "",
//     ctRatio: "",
//     changeMeter: "",
//     multiplyingFactor: "",
//     kwh: "",
//     contactDemand: "",
//     tariff: "",
//     deposit: "",
//     ncrNo: "",
//     pivNo: "",
//     datePiv: "",
//     preparedBy: "",
//     commercialEngineer: "",
//     date: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white w-11/12 lg:w-3/4 xl:w-2/3 p-6 rounded shadow-lg overflow-y-auto max-h-screen">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold">Order Card - Bulk Supply Consumer</h2>
//           <button
//             onClick={onClose}
//             className="text-white px-3 py-1 rounded"
//             style={{ backgroundColor: "#7c0000" }}
//           >
//             Close
//           </button>
//         </div>

//         {/* Form Content */}
//         <form>
//           {/* Example Fields */}
//           <div className="flex flex-wrap">
//             <div className="w-full lg:w-6/12 px-4">
//               <label className="block text-blueGray-600 text-sm mb-2">
//                 New Account No
//               </label>
//               <input
//                 type="text"
//                 name="newAccountNo"
//                 value={formData.newAccountNo}
//                 onChange={handleChange}
//                 className="border-0 px-3 py-2 rounded shadow text-sm w-full"
//               />
//             </div>
//             <div className="w-full lg:w-6/12 px-4">
//               <label className="block text-blueGray-600 text-sm mb-2">
//                 Account No
//               </label>
//               <input
//                 type="text"
//                 name="accountNo"
//                 value={formData.accountNo}
//                 onChange={handleChange}
//                 className="border-0 px-3 py-2 rounded shadow text-sm w-full"
//               />
//             </div>
//           </div>

//           {/* Add rest of the fields like earlier code (Fix Meter, Test Meter, etc.) */}

//         </form>
//       </div>
//     </div>
//   );
// };

// export default OrderCardPopup;
