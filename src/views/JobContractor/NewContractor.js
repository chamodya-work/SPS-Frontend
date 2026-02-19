// import NewJobContractor from "components/JobContractor/NewJobContractor";
// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";

// const NewContractor = () => {
//   const [isModify, setisModify] = useState(false);

//   const [formData, setFormData] = useState({});

//   const baseUrl = process.env.REACT_APP_API_BASE_URL;

//   const handleFormSubmit = async (data) => {
//     const contractordata = {
//       contractorId: data.contractorDetails?.contractorId || "",
//       name: data.contractorDetails?.name || "",
//       address: data.contractorDetails?.address || "",
//       deptId: data.contractorDetails?.deptId || "",
//     };

//     setFormData(contractordata);
//     console.log(contractordata);
//     try {
//       const response = await fetch(`${baseUrl}/api/spestcnd/save`, {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json',
//               Authorization: "Basic " + btoa("user:admin123"),
//           },
//           credentials: 'include',
//           body: JSON.stringify(contractordata)
//       });

//       if (response.ok) {
//           const data = await response.json();
//           console.log("Response data:", data);
//           toast.success("Saved Successfully!");
//       } else {
//           toast.error("Error saving data. Status: " + response.status);
//       }
//   } catch (error) {
//       console.error("Error:", error);
//       toast.error("Failed to connect to server.");
//   }
//   };

//   return (
//     <div className="container mx-auto rounded-lg">
//       <div className="flex justify-center px-4 mb-5 mx-48 mt-5 md:px-10 lg:px-20 rounded-lg">
//         <NewJobContractor onFormSubmit={handleFormSubmit} isModify={isModify} formData={formData} setFormData={setFormData}/>
//       </div>
//     </div>
//   );
// };

// export default NewContractor;


import NewJobContractor from "components/JobContractor/NewJobContractor";
import { useState } from "react";
import { toast } from "react-toastify";

const NewContractor = () => {
  const [isModify] = useState(false);
  const [formData, setFormData] = useState({});

  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const handleFormSubmit = async (data) => {
    const contractordata = {
      contractorId: data.contractorDetails?.contractorId || "",
      name: data.contractorDetails?.name || "",
      address: data.contractorDetails?.address || "",
      deptId: data.contractorDetails?.deptId || "",
    };

    setFormData(contractordata);
    console.log(contractordata);
    
    try {
      const response = await fetch(`${baseUrl}/api/spestcnd/save`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              Authorization: "Basic " + btoa("user:admin123"),
          },
          credentials: 'include',
          body: JSON.stringify(contractordata)
      });

      if (response.ok) {
          const data = await response.json();
          console.log("Response data:", data);
          toast.success("Saved Successfully!");
      } else {
          toast.error("Error saving data. Status: " + response.status);
      }
  } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to connect to server.");
  }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-center">
        <NewJobContractor onFormSubmit={handleFormSubmit} isModify={isModify} formData={formData} setFormData={setFormData}/>
      </div>
    </div>
  );
};

export default NewContractor;