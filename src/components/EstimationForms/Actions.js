// const Actions = ({ handleSubmit }) => {
//   return (
//     <div className="flex justify-center mt-4">
//       <button
//         onClick={handleSubmit}
//         className="bg-emerald-400 text-white text-sm px-6 py-2 rounded shadow hover:shadow-md transition duration-150"
//       >
//         Submit
//       </button>
//     </div>
//   );
// };

// export default Actions;


import React from "react";

const Actions = ({ handleSubmit }) => {
  return (
    <div className="flex justify-center">
      <button
        onClick={handleSubmit}
        className="bg-[#7c0000] text-white text-sm px-6 py-2 rounded shadow hover:bg-[#a00000] focus:outline-none focus:ring-2 focus:ring-[#7c0000] focus:ring-opacity-50"
      >
        Submit
      </button>
    </div>
  );
};

export default Actions;