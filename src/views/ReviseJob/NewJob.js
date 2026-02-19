// import JobRevision from "components/JobRevision/JobRevision";
// import { useState, useEffect } from "react";
// const NewJob = () => {
//   const [isModify, setisModify] = useState(false);

//   const [formData, setFormData] = useState({
//     jrgeneral: {},
//     jrcostmeasure: {},
//     jrpegging: {},
//   });

//   const baseUrl = process.env.REACT_APP_API_BASE_URL;

//   const handleFormSubmit = async (data) => {
//     const hardcodedData = {
//     };

//     // Merge hardcoded data with form data
//     const mergedData = {
//       ...data,
//       costcenter: data.jrgeneral?.costcenter || "",
//       warehouse: data.jrgeneral?.warehouse || "",
//       projectNumber: data.jrgeneral?.projectNumber || "",
//       description: data.jrgeneral?.description || "",
//       ...hardcodedData,
//     };

//     setFormData(mergedData);
//     console.log(mergedData);
//     // Send the data to the backend via REST API
//     try {
//       const response = await fetch(
//         "http://localhost:8081/api/application/save",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Basic " + btoa("user:admin123"),
//           },
//           credentials: "include",
//           body: JSON.stringify(mergedData),
//         }
//       );

//       if (response.ok) {
//         alert("Form submitted successfully!");
//       } else {
//         alert("Form submission failed!");
//       }
//     } catch (error) {
//       alert("An error occurred!");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="container mx-auto rounded-lg">
//       <div className="flex justify-center px-4 mb-5 mx-48 mt-5 md:px-10 lg:px-20 rounded-lg">
//         <JobRevision onFormSubmit={handleFormSubmit} isModify={isModify} formData={formData} setFormData={setFormData}/>
//       </div>
//     </div>
//   );
// };

// export default NewJob;

import JobRevision from "components/JobRevision/JobRevision";
import { useState } from "react";

const NewJob = () => {
  const [isModify, setisModify] = useState(false);

  const [formData, setFormData] = useState({
    jrgeneral: {},
    jrcostmeasure: {},
    jrpegging: {},
  });

  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const handleFormSubmit = async (data) => {
    const hardcodedData = {};

    // Merge hardcoded data with form data
    const mergedData = {
      ...data,
      costcenter: data.jrgeneral?.costcenter || "",
      warehouse: data.jrgeneral?.warehouse || "",
      projectNumber: data.jrgeneral?.projectNumber || "",
      description: data.jrgeneral?.description || "",
      ...hardcodedData,
    };

    setFormData(mergedData);
    console.log(mergedData);
    
    // Send the data to the backend via REST API
    try {
      const response = await fetch(
        "http://localhost:8081/api/application/save",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa("user:admin123"),
          },
          credentials: "include",
          body: JSON.stringify(mergedData),
        }
      );

      if (response.ok) {
        alert("Form submitted successfully!");
      } else {
        alert("Form submission failed!");
      }
    } catch (error) {
      alert("An error occurred!");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-center">
        <JobRevision onFormSubmit={handleFormSubmit} isModify={isModify} formData={formData} setFormData={setFormData}/>
      </div>
    </div>
  );
};

export default NewJob;