// import { useState, useEffect } from "react";
// import Table2 from "./Table2";

// const PIV1 = ({ formData, handleChange }) => {
//   return (
//     <div className="flex-auto px-4 lg:px-10 py-10 pt-2">
//       <form>
//         <div className="flex flex-wrap">
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block  text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                 PIV Number
//               </label>
//               <div className="flex ">
//                 <input
//                   type="text"
//                   name="pivNo"
//                   id="pivNo"
//                   value={formData.pivNo}
//                   onChange={handleChange}
//                   className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                   placeholder="430.00/ABS/25/xxxx"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block  text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                 Vat Registration Number
//               </label>
//               <input
//                 type="text"
//                 className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//               />
//             </div>
//           </div>
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block  text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                 People's Bank Branch
//               </label>
//               <input
//                 type="text"
//                 className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//               />
//             </div>
//           </div>
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block  text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                 CEB Branch
//               </label>
//               <input
//                 type="text"
//                 className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-wrap">
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                 Job Description
//               </label>
//               <input
//                 type="text"
//                 className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//               />
//             </div>
//           </div>
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block  text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                 ID Number
//               </label>
//               <input
//                 type="text"
//                 className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-wrap">
//           <div className="w-full lg:w-4/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block  text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                 Cost Center Number
//               </label>
//               <input
//                 type="text"
//                 className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                 placeholder="430.00"
//               />
//             </div>
//           </div>
//           <div className="w-full lg:w-4/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block  text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                 Date
//               </label>
//               <input
//                 type="date"
//                 name="date"
//                 className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//               />
//             </div>
//           </div>
//           <div className="w-full lg:w-4/12 px-4">
//             {/* <div className="relative w-full mb-3">
//               <label
//                 className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
//                 htmlFor="grid-password"
//               >
//                 Reference No
//               </label>
//               <input
//                 type="text"
//                 className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                 placeholder="430.00"
//               />
//             </div> */}
//             <div className="relative w-full mb-3">
//               <label
//                 className="block  text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                 Reference Number
//               </label>
//               <select
//                 name="ApplicationType"
//                 className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//               >
//                 <option value="BS">Ref</option>
//                 <option value="Other">OTHER</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-wrap">
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                 Depositor's Name
//               </label>
//               <input
//                 type="text"
//                 className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//               />
//             </div>
//           </div>
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block  text-blueGray-600 text-sm mb-2"
//                 htmlFor="description"
//               >
//                 Address
//               </label>
//               <textarea
//                 name="description"
//                 rows="3"
//                 className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                 placeholder="Enter Address"
//               ></textarea>
//             </div>
//           </div>
//         </div>
//         {/* raw 4 */}
//         {/* <div className="w-full lg:w-6/12 px-4">
//   <div className="relative w-full mb-3">
//     <label
//       className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
//       htmlFor="description"
//     >
//       Description
//     </label>
//     <textarea
//       name="description"
//       rows="3"
//       className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//       placeholder="Enter description"
//     ></textarea>
//   </div>
// </div> */}

//         <div className="flex flex-wrap">
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block  text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                 Payment Mode
//               </label>
//               <div className="flex gap-4 mt-2">
//                 <label className="text-sm mr-4">
//                   <input
//                     type="radio"
//                     name="isLoanApp"
//                     defaultChecked
//                     value="Yes"
//                   />{" "}
//                   Cash
//                 </label>
//                 <label className="text-sm mr-4">
//                   <input type="radio" name="isLoanApp" value="No" /> Cheque
//                 </label>
//                 <label className="text-sm">
//                   <input type="radio" name="isLoanApp" value="No" /> CEB
//                 </label>
//               </div>
//             </div>
//           </div>

//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block  text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                 Pay Date
//               </label>
//               <input
//                 type="date"
//                 name="date"
//                 className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-wrap">
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block  text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                 Bank Code
//               </label>
//               <select
//                 name="ApplicationType"
//                 className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//               >
//                 <option value="BS">Bank1</option>
//                 <option value="Other">OTHER</option>
//               </select>
//             </div>
//           </div>
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block  text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                 Branch Code
//               </label>
//               <select
//                 name="ApplicationType"
//                 className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//               >
//                 <option value="BS">Branch1</option>
//                 <option value="Other">OTHER</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-wrap">
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block  text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                 Cheque Date
//               </label>
//               <input
//                 type="date"
//                 name="date"
//                 className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//               />
//             </div>
//           </div>
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block  text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                 Cheque Number
//               </label>
//               <input
//                 type="text"
//                 className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-wrap">
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block  text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                 Amount Allocated
//               </label>
//               <input
//                 type="text"
//                 className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//               />
//             </div>
//           </div>
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block  text-blueGray-600 text-sm mb-2"
//                 htmlFor="description"
//               >
//                 Amount In Words
//               </label>
//               <textarea
//                 name="description"
//                 rows="3"
//                 className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                 placeholder="Enter description"
//               ></textarea>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-wrap">
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                 Prepared By
//               </label>
//               <input
//                 type="text"
//                 className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//               />
//             </div>
//           </div>
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block  text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                 Certified By
//               </label>
//               <input
//                 type="text"
//                 className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-wrap">
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block  text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                 Depositor's Siqnature
//               </label>
//               <input
//                 type="text"
//                 className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//               />
//             </div>
//           </div>
//           <div className="w-full lg:w-6/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block  text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                 Bank Officer's Siqnature
//               </label>
//               <input
//                 type="text"
//                 className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="mt-3 ml-3 mr-3">
//           <Table2 color="light" />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PIV1;


import React from "react";
import Table2 from "./Table2";

const PIV1 = ({ formData, handleChange }) => {
  return (
    <div className="flex-auto px-4 lg:px-10 py-10 pt-2">
      <form>
        {/* Row 1 */}
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">PIV Number</label>
              <input
                type="text"
                name="pivNo"
                value={formData.pivNo}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
                placeholder="430.00/ABS/25/xxxx"
              />
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">Vat Registration Number</label>
              <input
                type="text"
                name="vatRegNo"
                value={formData.vatRegNo}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">People's Bank Branch</label>
              <input
                type="text"
                name="peoplesBankBranch"
                value={formData.peoplesBankBranch}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">CEB Branch</label>
              <input
                type="text"
                name="cebBranch"
                value={formData.cebBranch}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>
        </div>

        {/* Row 3 */}
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">Job Description</label>
              <input
                type="text"
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">ID Number</label>
              <input
                type="text"
                name="idNo"
                value={formData.idNo}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>
        </div>

        {/* Row 4 */}
        <div className="flex flex-wrap">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">Cost Center Number</label>
              <input
                type="text"
                name="costCenterNo"
                value={formData.costCenterNo}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
                placeholder="430.00"
              />
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">Reference Number</label>
              <select
                name="referenceNo"
                value={formData.referenceNo}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              >
                <option value="Ref">Ref</option>
                <option value="OTHER">OTHER</option>
              </select>
            </div>
          </div>
        </div>

        {/* Row 5 */}
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">Depositor's Name</label>
              <input
                type="text"
                name="depositorName"
                value={formData.depositorName}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">Address</label>
              <textarea
                name="address"
                rows="3"
                value={formData.address}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
                placeholder="Enter Address"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Row 6 */}
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">Payment Mode</label>
              <div className="flex gap-4 mt-2">
                <label className="text-sm mr-4">
                  <input
                    type="radio"
                    name="paymentMode"
                    value="Cash"
                    checked={formData.paymentMode === "Cash"}
                    onChange={handleChange}
                    className="mr-1"
                  />{" "}
                  Cash
                </label>
                <label className="text-sm mr-4">
                  <input
                    type="radio"
                    name="paymentMode"
                    value="Cheque"
                    checked={formData.paymentMode === "Cheque"}
                    onChange={handleChange}
                    className="mr-1"
                  />{" "}
                  Cheque
                </label>
                <label className="text-sm">
                  <input
                    type="radio"
                    name="paymentMode"
                    value="CEB"
                    checked={formData.paymentMode === "CEB"}
                    onChange={handleChange}
                    className="mr-1"
                  />{" "}
                  CEB
                </label>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">Pay Date</label>
              <input
                type="date"
                name="payDate"
                value={formData.payDate}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>
        </div>

        {/* Row 7 */}
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">Bank Code</label>
              <select
                name="bankCode"
                value={formData.bankCode}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              >
                <option value="Bank1">Bank1</option>
                <option value="OTHER">OTHER</option>
              </select>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">Branch Code</label>
              <select
                name="branchCode"
                value={formData.branchCode}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              >
                <option value="Branch1">Branch1</option>
                <option value="OTHER">OTHER</option>
              </select>
            </div>
          </div>
        </div>

        {/* Row 8 */}
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">Cheque Date</label>
              <input
                type="date"
                name="chequeDate"
                value={formData.chequeDate}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">Cheque Number</label>
              <input
                type="text"
                name="chequeNo"
                value={formData.chequeNo}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>
        </div>

        {/* Row 9 */}
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">Amount Allocated</label>
              <input
                type="text"
                name="amountAllocated"
                value={formData.amountAllocated}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">Amount In Words</label>
              <textarea
                name="amountInWords"
                rows="3"
                value={formData.amountInWords}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
                placeholder="Enter amount in words"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Row 10 */}
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">Prepared By</label>
              <input
                type="text"
                name="preparedBy"
                value={formData.preparedBy}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">Certified By</label>
              <input
                type="text"
                name="certifiedBy"
                value={formData.certifiedBy}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>
        </div>

        {/* Row 11 */}
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">Depositor's Signature</label>
              <input
                type="text"
                name="depositorSignature"
                value={formData.depositorSignature}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">Bank Officer's Signature</label>
              <input
                type="text"
                name="bankOfficerSignature"
                value={formData.bankOfficerSignature}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mt-6 px-4">
          <Table2 />
        </div>
      </form>
    </div>
  );
};

export default PIV1;