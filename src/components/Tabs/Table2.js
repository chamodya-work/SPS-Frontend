// import React from "react";
// import PropTypes from "prop-types";

// // components

// import TableDropdown from "components/Dropdowns/TableDropdown.js";

// export default function Table2({ color }) {
//   return (
//     <>
//       <div
//         className={
//           "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
//           (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
//         }
//       >
//         <div className="rounded-t mb-0 px-4 border-0">
//           <div className="flex flex-wrap items-center">
//             <div className="relative w-full px-4 max-w-full flex-grow flex-1">
//               {/* <h3
//                 className={
//                   "font-semibold text-lg " +
//                   (color === "light" ? "text-blueGray-700" : "text-white")
//                 }
//               >
//                 Card Tables
//               </h3> */}
//             </div>
//           </div>
//         </div>
//         <div className="block w-full overflow-x-auto">
//           {/* Projects table */}
//           <table className="items-center w-full bg-transparent border-collapse">
//             <thead>
//               <tr>
//                 <th
//                   className={
//                     "px-6 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
//                     (color === "light"
//                       ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
//                       : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
//                   }
//                 >
//                   Code Number
//                 </th>
//                 <th
//                   className={
//                     "px-6 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
//                     (color === "light"
//                       ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
//                       : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
//                   }
//                 >
//                   Description
//                 </th>
//                 <th
//                   className={
//                     "px-6 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
//                     (color === "light"
//                       ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
//                       : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
//                   }
//                 ></th>

//                 <th
//                   className={
//                     "px-6 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
//                     (color === "light"
//                       ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
//                       : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
//                   }
//                 >
//                   Amount Cents
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               <tr>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm text-blueGray-600 whitespace-nowrap p-4">
//                   1300
//                 </td>

//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm  text-blueGray-600 whitespace-nowrap p-4">
//                   Miscellaneous Income
//                 </td>

//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4"></td>

//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
//                   <div className="flex items-center">
//                     {/* edit */}
//                     <div className="w-full  px-4">
//                       <div className="relative w-full mb-3">
//                         <input
//                           type="text"
//                           className="border-0 px-3 h-0.5 bg-blueGray-50 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                         />
//                       </div>
//                     </div>
//                     {/* edit end */}
//                   </div>
//                 </td>
//               </tr>

//               {/* row 2 */}
//               <tr>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm text-blueGray-600 whitespace-nowrap p-4">
//                   3600
//                 </td>

//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm  text-blueGray-600 whitespace-nowrap p-4">
//                   Electricity Debtors
//                 </td>

//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4"></td>

//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
//                   <div className="flex items-center">
//                     {/* edit */}
//                     <div className="w-full  px-4">
//                       <div className="relative w-full mb-3">
//                         <input
//                           type="text"
//                           className="border-0 px-3 h-0.5 bg-blueGray-50 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                         />
//                       </div>
//                     </div>
//                     {/* edit end */}
//                   </div>
//                 </td>
//               </tr>

//               {/* raw 3 */}
//               <tr>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm text-blueGray-600 whitespace-nowrap p-4">
//                   5600
//                 </td>

//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm  text-blueGray-600 whitespace-nowrap p-4">
//                   Security Deposit
//                 </td>

//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4"></td>

//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
//                   <div className="flex items-center">
//                     {/* edit */}
//                     <div className="w-full  px-4">
//                       <div className="relative w-full mb-3">
//                         <input
//                           type="text"
//                           className="border-0 px-3 h-0.5 bg-blueGray-50 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                         />
//                       </div>
//                     </div>
//                     {/* edit end */}
//                   </div>
//                 </td>
//               </tr>

//               {/* raw 4 */}
//               <tr>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm text-blueGray-600 whitespace-nowrap p-4">
//                   5610
//                 </td>

//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm  text-blueGray-600 whitespace-nowrap p-4">
//                   Service Connection/ Electricity Schemes
//                 </td>

//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4"></td>

//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
//                   <div className="flex items-center">
//                     {/* edit */}
//                     <div className="w-full  px-4">
//                       <div className="relative w-full mb-3">
//                         <input
//                           type="text"
//                           className="border-0 px-3 h-0.5 bg-blueGray-50 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                         />
//                       </div>
//                     </div>
//                     {/* edit end */}
//                   </div>
//                 </td>
//               </tr>

//               {/* raw 5 */}
//               <tr>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm text-blueGray-600 whitespace-nowrap p-4">
//                   5640
//                 </td>

//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm  text-blueGray-600 whitespace-nowrap p-4">
//                   Tender Deposit
//                 </td>

//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4"></td>

//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
//                   <div className="flex items-center">
//                     {/* edit */}
//                     <div className="w-full  px-4">
//                       <div className="relative w-full mb-3">
//                         <input
//                           type="text"
//                           className="border-0 px-3 h-0.5 bg-blueGray-50 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                         />
//                       </div>
//                     </div>
//                     {/* edit end */}
//                   </div>
//                 </td>
//               </tr>

//               {/* raw 6 */}
//               <tr>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm text-blueGray-600 whitespace-nowrap p-4">
//                   5660
//                 </td>

//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm  text-blueGray-600 whitespace-nowrap p-4">
//                   Miscellaneous Deposit
//                 </td>

//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4"></td>

//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
//                   <div className="flex items-center">
//                     {/* edit */}
//                     <div className="w-full  px-4">
//                       <div className="relative w-full mb-3">
//                         <input
//                           type="text"
//                           className="border-0 px-3 h-0.5 bg-blueGray-50 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                         />
//                       </div>
//                     </div>
//                     {/* edit end */}
//                   </div>
//                 </td>
//               </tr>

//               {/* raw 7 */}
//               <tr>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm text-blueGray-600 whitespace-nowrap p-4">
//                   5800
//                 </td>

//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm  text-blueGray-600 whitespace-nowrap p-4">
//                   Cash in Transit
//                 </td>

//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm  whitespace-nowrap p-4"></td>

//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
//                   <div className="flex items-center">
//                     {/* edit */}
//                     <div className="w-full  px-4">
//                       <div className="relative w-full mb-3">
//                         <input
//                           type="text"
//                           className="border-0 px-3 h-0.5 bg-blueGray-50 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                         />
//                       </div>
//                     </div>
//                     {/* edit end */}
//                   </div>
//                 </td>
//               </tr>

//               {/* raw 8 */}
//               <tr>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm text-blueGray-600 whitespace-nowrap p-4">
//                   5910
//                 </td>

//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm  text-blueGray-600 whitespace-nowrap p-4">
//                   For Dishonoured Cheque
//                 </td>

//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4"></td>

//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
//                   <div className="flex items-center">
//                     {/* edit */}
//                     <div className="w-full  px-4">
//                       <div className="relative w-full mb-3">
//                         <input
//                           type="text"
//                           className="border-0 px-3 h-0.5 bg-blueGray-50 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                         />
//                       </div>
//                     </div>
//                     {/* edit end */}
//                   </div>
//                 </td>
//               </tr>

//               {/* raw 8 */}
//               <tr>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm text-blueGray-600 whitespace-nowrap p-4">
//                   1380
//                 </td>

//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm  text-blueGray-600 whitespace-nowrap p-4">
//                   Application Fee
//                 </td>

//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4"></td>

//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
//                   <div className="flex items-center">
//                     {/* edit */}
//                     <div className="w-full  px-4">
//                       <div className="relative w-full mb-3">
//                         <input
//                           type="text"
//                           className="border-0 px-3 h-0.5 bg-blueGray-50 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                         />
//                       </div>
//                     </div>
//                     {/* edit end */}
//                   </div>
//                 </td>
//               </tr>

//               {/* raw 9 */}
//               <tr>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm text-blueGray-600 whitespace-nowrap p-4">
//                   5222
//                 </td>

//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm  text-blueGray-600 whitespace-nowrap p-4">
//                   Sub Total
//                 </td>

//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4"></td>

//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
//                   <div className="flex items-center">
//                     {/* edit */}
//                     <div className="w-full  px-4">
//                       <div className="relative w-full mb-3">
//                         <input
//                           type="text"
//                           className="border-0 px-3 h-0.5 bg-blueGray-50 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                         />
//                       </div>
//                     </div>
//                     {/* edit end */}
//                   </div>
//                 </td>
//               </tr>

//               {/* raw 10 */}
//               <tr>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm text-blueGray-600 whitespace-nowrap p-4">
//                   1300
//                 </td>

//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm  text-blueGray-600 whitespace-nowrap p-4">
//                   Grand Total
//                 </td>

//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4"></td>

//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
//                   <div className="flex items-center">
//                     {/* edit */}
//                     <div className="w-full  px-4">
//                       <div className="relative w-full mb-3">
//                         <input
//                           type="text"
//                           className="border-0 px-3 h-0.5 bg-blueGray-50 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                         />
//                       </div>
//                     </div>
//                     {/* edit end */}
//                   </div>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// }

// // CardTable.defaultProps = {
// //   color: "light",
// // };

// // CardTable.propTypes = {
// //   color: PropTypes.oneOf(["light", "dark"]),
// // };


import React from "react";

export default function Table2() {
  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 align-middle border border-gray-300 py-3 text-sm font-semibold text-left bg-gray-100 text-gray-700">
                Code Number
              </th>
              <th className="px-6 align-middle border border-gray-300 py-3 text-sm font-semibold text-left bg-gray-100 text-gray-700">
                Description
              </th>
              <th className="px-6 align-middle border border-gray-300 py-3 text-sm font-semibold text-left bg-gray-100 text-gray-700"></th>
              <th className="px-6 align-middle border border-gray-300 py-3 text-sm font-semibold text-left bg-gray-100 text-gray-700">
                Amount Cents
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["1300", "Miscellaneous Income"],
              ["3600", "Electricity Debtors"],
              ["5600", "Security Deposit"],
              ["5610", "Service Connection/ Electricity Schemes"],
              ["5640", "Tender Deposit"],
              ["5660", "Miscellaneous Deposit"],
              ["5800", "Cash in Transit"],
              ["5910", "For Dishonoured Cheque"],
              ["1380", "Application Fee"],
              ["5222", "Sub Total"],
              ["1300", "Grand Total"],
            ].map(([code, description], idx) => (
              <tr key={idx}>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm text-gray-700 whitespace-nowrap p-4 border border-gray-300">
                  {code}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm text-gray-700 whitespace-nowrap p-4 border border-gray-300">
                  {description}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 border border-gray-300"></td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 border border-gray-300">
                  <div className="flex items-center">
                    <input
                      type="text"
                      className="p-1 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}