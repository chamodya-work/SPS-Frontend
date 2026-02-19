// import React from "react";
// //import ModifyProgressTabs from "components/Tabs/ModifyProgressTabs";
// //import AddProgressMilestone from "components/Tabs/ProgressBar1";
// import { useHistory } from "react-router-dom";
// import ProgressBar1 from "components/Tabs/ProgressBar1";

// export default function ProgressBar2({

// }) {
 

//   return (
//     <div className="w-full max-w-2xl bg-white  rounded-lg">
//       <div class="flex justify-center items-center mt-6"></div>

//       {/* Add the title and edit button here */}
//       <div className="flex justify-center px-12 ml-2 mb-2">
//         <h3 className="block text-blueGray-600 text-sm font-bold">
//           Progress Bar
//         </h3>
//       </div>
//       {/* <div className="p-6"> */}

//       <div className="rounded-t bg-white  ">
//         <div className="flex justify-between items-center ">
//           {/* Tab Content */}
//           <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-b-lg bg-blueGray-100 border-0">
//             <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-b-lg bg-blueGray-100 border-0">
//               <ProgressBar1
               
//               />

//               {/* Navigation Buttons and bottom white bar */}
//               <div className="rounded-t bg-white mb-0 px-6 py-2">
//                 <div className="flex justify-between items-center px-6 mb-6">
//                   {/* Left-aligned "Previous" button */}
                  
//                   {/* <button
                  
//                     type="button"
//                     className="bg-emerald-400 mr-2 text-white bg-green text-sm px-6 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
//                   >
//                     Submit
//                   </button> */}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React from "react";
import { useHistory } from "react-router-dom";
import ProgressBar1 from "components/Tabs/ProgressBar1";

export default function ProgressBar2() {
  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Progress Bar</h2>
      </div>

      <div className="bg-gray-50 rounded-lg border mb-4">
        <div className="p-6">
          <ProgressBar1 />
        </div>
      </div>
    </div>
  );
}