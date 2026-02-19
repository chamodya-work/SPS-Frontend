// import React from "react";
// //import ModifyProgressTabs from "components/Tabs/ModifyProgressTabs";
// import AddProgressMilestone from "components/Tabs/AddProgressMilestone";
// import AllocationOCJ from "components/Tabs/AllocationOCJ";

// export default function Allocation({}) {
//   return (
//     <div className="w-full max-w-2xl bg-white  rounded-lg">
//       <div class="flex justify-center items-center mt-6"></div>

//       <div className="flex justify-center px-12 ml-2">
//         <h3 className="block text-blueGray-600 text-sm font-bold mb-2">
//           Download Letters
//         </h3>
//       </div>

//       <div className="rounded-t bg-white  ">
//         <div className="flex justify-between items-center ">
//           {/* Tab Content */}
//           {/* <div className="p-6"> */}
//           <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-b-lg bg-blueGray-100 border-0">
//             <AllocationOCJ />

//             {/* Navigation Buttons and bottom white bar */}
//             <div className="rounded-t bg-white mb-0 px-6 py-6">
//               <div className="flex justify-end items-center">
//                 {/* Left-aligned "Previous" button */}
//                 {/* <button
      
//        type="button"
//         className="bg-emerald-400 text-white font-bold uppercase text-xs px-6 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
//         style={{
//           backgroundColor:"#620000",
//         }}
//       >
//        Submit
//       </button> */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//     // </div>
//   );
// }


import React from "react";
import AllocationOCJ from "components/Tabs/AllocationOCJ";

export default function Allocation() {
  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Download Letters</h2>
      </div>

      <div className="bg-gray-50 rounded-lg border">
        <div className="p-6">
          <AllocationOCJ />
        </div>
      </div>
    </div>
  );
}