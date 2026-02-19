

// //import AddProgress from "components/AddProgress/AddProgress";
// import Allocation from "components/Allocation/Allocation";


// import React, { useState } from "react";

// const AllocationOCJ1 = () => {


//   return (
//     <div className="container mx-auto rounded-lg">
//       <div className="flex justify-center px-4 mb-5 mx-48 mt-5 md:px-10 lg:px-20 rounded-lg">
//         <Allocation/>
//       </div>

//       {/* add select button */}
//       <div>
         
//       <div className="flex flex-wrap ">
//           <div className="w-full lg:w-4/12 px-4">
//       <div className="relative w-full mb-3">
//               <label
//                 className="block  text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                   Con/Mnt/Area/Phm
//               </label>
//               <select
//                 name="ApplicationType"
//                 className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//               >
//                 <option value="BS"> Construction Job Allocation</option>
//                 <option value="BS"> Allocation of Construction-Originated Jobs</option>
//                 <option value="BS"> Variance Estimation</option>
//                 <option value="BS"> Job Number Assignment</option>
//                 <option value="BS"> Contractor Proposal</option>
//                 <option value="BS"> Construction Job Completion</option>
//                 <option value="BS"> Handover of Completed Job</option>
//                 <option value="BS"> Asset Transfer of Completed Job</option>
//                 <option value="BS"> Final Job Report</option>
//                 <option value="BS">Job Termination</option>
//               </select>
//             </div>
//             </div>

//             <div className="w-full lg:w-4/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block  text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                   Maintenace
//               </label>
//               <select
//                 name="ApplicationType"
//                 className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//               >
//                 <option value="BS">Maintenace</option>
              
//               </select>
//             </div>
//             </div>

//             <div className="w-full lg:w-4/12 px-4">
//             <div className="relative w-full mb-3">
//               <label
//                 className="block  text-blueGray-600 text-sm mb-2"
//                 htmlFor="grid-password"
//               >
//                   Area
//               </label>
//               <select
//                 name="ApplicationType"
//                 className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//               >
//                 <option value="BS">Area</option>
             
//               </select>
//             </div>

//             </div>
//             </div>
// </div>
//             {/* add select button end */}
//     </div>
//   );
// };

// export default AllocationOCJ1;


import React, { useState } from "react";
import Allocation from "components/Allocation/Allocation";

const AllocationOCJ1 = () => {
  const [selectedOptions, setSelectedOptions] = useState({
    jobType: "Construction Job Allocation",
    maintenance: "Maintenance",
    area: "Area"
  });

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setSelectedOptions(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-center mb-6">
        <Allocation />
      </div>

      {/* Additional select options */}
      <div className="flex justify-center">
        <div className="w-full bg-white rounded-lg shadow-lg p-6">
          <div className="bg-gray-50 rounded-lg border p-6">
            <div className="flex flex-wrap">
              {/* Con/Mnt/Area/Phm */}
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block text-gray-700 text-sm mb-2">
                    Con/Mnt/Area/Phm
                  </label>
                  <select
                    name="jobType"
                    value={selectedOptions.jobType}
                    onChange={handleSelectChange}
                    className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
                  >
                    <option value="Construction Job Allocation">Construction Job Allocation</option>
                    <option value="Allocation of Construction-Originated Jobs">Allocation of Construction-Originated Jobs</option>
                    <option value="Variance Estimation">Variance Estimation</option>
                    <option value="Job Number Assignment">Job Number Assignment</option>
                    <option value="Contractor Proposal">Contractor Proposal</option>
                    <option value="Construction Job Completion">Construction Job Completion</option>
                    <option value="Handover of Completed Job">Handover of Completed Job</option>
                    <option value="Asset Transfer of Completed Job">Asset Transfer of Completed Job</option>
                    <option value="Final Job Report">Final Job Report</option>
                    <option value="Job Termination">Job Termination</option>
                  </select>
                </div>
              </div>

              {/* Maintenance */}
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block text-gray-700 text-sm mb-2">
                    Maintenance
                  </label>
                  <select
                    name="maintenance"
                    value={selectedOptions.maintenance}
                    onChange={handleSelectChange}
                    className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
                  >
                    <option value="Maintenance">Maintenance</option>
                    <option value="Preventive Maintenance">Preventive Maintenance</option>
                    <option value="Corrective Maintenance">Corrective Maintenance</option>
                  </select>
                </div>
              </div>

              {/* Area */}
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block text-gray-700 text-sm mb-2">
                    Area
                  </label>
                  <select
                    name="area"
                    value={selectedOptions.area}
                    onChange={handleSelectChange}
                    className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
                  >
                    <option value="Area">Area</option>
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="East">East</option>
                    <option value="West">West</option>
                    <option value="Central">Central</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllocationOCJ1;