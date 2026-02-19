// import React from "react";
// //import ModifyProgressTabs from "components/Tabs/ModifyProgressTabs";
// import ModifyProgressTabs from "components/Tabs/ModifyProgressTab";

// export default function ModifyProgress() {
//   return (
//     <div className="w-full max-w-2xl bg-white  rounded-lg">
//       <div class="flex justify-center items-center mt-6"></div>

//       <div className="flex justify-center px-12 ml-2">
//         <h3 className="block text-blueGray-600 text-sm font-bold mb-2">
//           Modify Progress
//         </h3>
//       </div>

//       <div className="rounded-t bg-white  ">
//         <div className="flex justify-between items-center ">
//           {/* Tab Content */}
//           {/* <div className="p-6"> */}
//           <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-b-lg bg-blueGray-100 border-0">
//             <ModifyProgressTabs />

//             {/* Navigation Buttons and bottom white bar */}
//             <div className="rounded-t bg-white mb-0 px-6 py-2">
//               <div className="flex justify-end items-center px-6 mr-2">
//                 {/* Left-aligned "Previous" button */}
//                 <button className="bg-emerald-400 text-white bg-green text-sm px-6 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150">
//                   Update
//                 </button>
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
import ModifyProgressTabs from "components/Tabs/ModifyProgressTab";

export default function ModifyProgress() {
  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Modify Progress</h2>
      </div>

      <div className="bg-gray-50 rounded-lg border mb-4">
        <div className="p-6">
          <ModifyProgressTabs />
        </div>
      </div>

      <div className="flex justify-end items-center bg-white rounded-b-lg px-2 py-2 border-t">
        <button className="bg-[#7c0000] text-white text-sm px-4 py-2 rounded shadow hover:bg-[#a00000] focus:outline-none focus:ring-2 focus:ring-[#7c0000] focus:ring-opacity-50">
          Update
        </button>
      </div>
    </div>
  );
}