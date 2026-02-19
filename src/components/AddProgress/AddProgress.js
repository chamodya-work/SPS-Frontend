// import React from "react";
// //import ModifyProgressTabs from "components/Tabs/ModifyProgressTabs";
// import AddProgressMilestone from "components/Tabs/AddProgressMilestone";
// import { useHistory } from "react-router-dom";

// export default function AddProgress({
//   handleChange,
//   handleSubmit,
//   formData,
//   isModify = false,
// }) {
//   const history = useHistory();
//   // Add function to handle the edit button click
//   const handleUpdateClick = () => {
//     // Navigate to edit page or toggle edit mode
//     history.push("/modifyProgress/modProgress");
//     // Add your navigation or edit mode logic here
//   };

//   return (
//     <div className="w-full max-w-2xl bg-white  rounded-lg">
//       <div class="flex justify-center items-center mt-6"></div>

//       {/* Add the title and edit button here */}
//       <div className="flex justify-center px-12 ml-2 mb-2">
//         <h3 className="block text-blueGray-600 text-sm font-bold">
//           Add Progress Milestone
//         </h3>
//       </div>
//       {/* <div className="p-6"> */}

//       <div className="rounded-t bg-white  ">
//         <div className="flex justify-between items-center ">
//           {/* Tab Content */}
//           <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-b-lg bg-blueGray-100 border-0">
//             <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-b-lg bg-blueGray-100 border-0">
//               <AddProgressMilestone
//                 handleChange={(e) => {
//                   handleChange(e);
//                 }}
//                 formData={formData}
//               />

//               {/* Navigation Buttons and bottom white bar */}
//               <div className="rounded-t bg-white mb-0 px-6 py-2">
//                 <div className="flex justify-between items-center px-6">
//                   {/* Left-aligned "Previous" button */}
//                   {!isModify && (
//                     <button
//                       onClick={handleUpdateClick}
//                       className="bg-emerald-400 ml-2 mb-2 text-white active:bg-emerald-600 text-sm px-6 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-2 ease-linear transition-all duration-150 mt-2"
//                       style={{
//                         backgroundColor: "#7c0000",
//                       }}
//                     >
//                       Edit
//                     </button>
//                   )}
//                   <button
//                     onClick={handleSubmit}
//                     type="button"
//                     className="bg-emerald-400 mr-2 text-white bg-green text-sm px-6 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
//                   >
//                     Submit
//                   </button>
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
import AddProgressMilestone from "components/Tabs/AddProgressMilestone";
import { useHistory } from "react-router-dom";

export default function AddProgress({
  handleChange,
  handleSubmit,
  formData,
  isModify = false,
}) {
  const history = useHistory();

  const handleUpdateClick = () => {
    history.push("/modifyProgress/modProgress");
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Add Progress Milestone</h2>
      </div>

      <div className="bg-gray-50 rounded-lg border mb-4">
        <div className="p-6">
          <AddProgressMilestone
            handleChange={handleChange}
            formData={formData}
          />
        </div>
      </div>

      <div className="flex justify-between items-center bg-white rounded-b-lg px-2 py-2 border-t">
        <div>
          {!isModify && (
            <button
              onClick={handleUpdateClick}
              className="bg-[#7c0000] text-white text-sm px-4 py-2 rounded shadow hover:bg-[#a00000] focus:outline-none focus:ring-2 focus:ring-[#7c0000] focus:ring-opacity-50"
            >
              Edit
            </button>
          )}
        </div>
        <div>
          <button
            onClick={handleSubmit}
            type="button"
            className="bg-[#7c0000] text-white text-sm px-4 py-2 rounded shadow hover:bg-[#a00000] focus:outline-none focus:ring-2 focus:ring-[#7c0000] focus:ring-opacity-50"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}