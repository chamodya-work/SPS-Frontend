// import NewJobContractor from "components/JobContractor/NewJobContractor";
// import { useState } from "react";
// const ModifyContractor = () => {
//   return (
//     <div className="container mx-auto rounded-lg">
//       <div className="flex justify-center px-4 mb-5 mx-48 mt-5 md:px-10 lg:px-20 rounded-lg">
//         <NewJobContractor
//           isModify={true}
//         />
//       </div>
//     </div>
//   );
// };

// export default ModifyContractor;


import NewJobContractor from "components/JobContractor/NewJobContractor";
import { useState } from "react";

const ModifyContractor = () => {
  const [formData, setFormData] = useState({});

  const handleFormModify = async (data) => {
    console.log("Modify contractor:", data);
    // Add modify logic here
  };

  const handleSearch = async (contractorId) => {
    console.log("Searching for contractor:", contractorId);
    // Add search logic here
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-center">
        <NewJobContractor
          onFormSubmit={handleFormModify}
          isModify={true}
          formData={formData}
          setFormData={setFormData}
          handleSearch={handleSearch}
        />
      </div>
    </div>
  );
};

export default ModifyContractor;