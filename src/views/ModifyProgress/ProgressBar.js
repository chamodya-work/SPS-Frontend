
// import React, { useState } from "react";
// //import AddProgress from "components/AddProgress/ProgressBar";
// import axios from 'axios';
// import ProgressBar2 from "components/AddProgress/ProgressBar2";



// const ProgressBar = () => {
   
//   return (
//     <div className="container mx-auto rounded-lg">
//       <div className="flex justify-center px-4 mb-5 mx-48 mt-5 md:px-10 lg:px-20 rounded-lg">

//         <ProgressBar2 />
//       </div>
//     </div>
//   );
// };

// export default ProgressBar;


import React from "react";
import ProgressBar2 from "components/AddProgress/ProgressBar2";

const ProgressBar = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-center">
        <ProgressBar2 />
      </div>
    </div>
  );
};

export default ProgressBar;