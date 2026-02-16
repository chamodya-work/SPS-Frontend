import { useState } from "react";

const phoneRegex =
  /^\+?([1-9]{1,3})?[-.\s]?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})(?:\s*x(\d+))?$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ApplicantContact = ({ onInputChange, data = {} }) => {
  // const [appData, setAppData] = useState({
  //   mobileNo: "",
  //   email: "",
  //   telephoneNo: "",
  //   streetAddress: "",
  //   suburb: "",
  //   city: "",
  //   postalCode: "",
  // });

  const [errors, setErrors] = useState({});

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   const newData = { ...appData, [name]: value };
  //   setAppData(newData);
  //   onInputChange(newData);

  //   setErrors((prevErrors) => {
  //     let updatedErrors = { ...prevErrors };

  //     if (name === "mobileNo") {
  //       updatedErrors.mobileNo = phoneRegex.test(value.trim())
  //         ? ""
  //         : "Invalid phone number format";
  //     }

  //     if (name === "email") {
  //       updatedErrors.email = emailRegex.test(value.trim())
  //         ? ""
  //         : "Invalid email format";
  //     }

  //     return updatedErrors;
  //   });
  // };


  const handleChange = (e) => {
    const { name, value } = e.target;
  
    onInputChange({ [name]: value });
  
    setErrors((prevErrors) => {
      let updatedErrors = { ...prevErrors };
  
      if (name === "mobileNo") {
        updatedErrors.mobileNo = phoneRegex.test(value.trim())
          ? ""
          : "Invalid phone number format";
      }
  
      if (name === "email") {
        updatedErrors.email = emailRegex.test(value.trim())
          ? ""
          : "Invalid email format";
      }
  
      return updatedErrors;
    });
  };
  

  return (
    <div className="flex-auto px-4 lg:px-10 py-10 pt-1">
      <form>
        {/* Mobile & Email Row */}
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Mobile Number
              </label>
              <input
                type="text"
                name="mobileNo"
                value={data.mobileNo}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
                placeholder="Enter your mobile number"
              />
              {errors.mobileNo && (
                <p className="text-red-500 text-xs mt-1">{errors.mobileNo}</p>
              )}
            </div>
          </div>

          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
          </div>
        </div>

        {/* Land & Street Address Row */}
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Land
              </label>
              <input
                type="text"
                name="telephoneNo"
                value={data.telephoneNo}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
                placeholder="Enter your land number"
              />
            </div>
          </div>

          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Street Address
              </label>
              <input
                type="text"
                name="streetAddress"
                value={data.streetAddress}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
                placeholder="Enter street address"
              />
            </div>
          </div>
        </div>

        {/* Suburb, City, Postal Code Row */}
        <div className="flex flex-wrap">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Suburb
              </label>
              <input
                type="text"
                name="suburb"
                value={data.suburb}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
                placeholder="Enter suburb"
              />
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={data.city}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
                placeholder="Enter city"
              />
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                Postal Code
              </label>
              <input
                type="text"
                name="postalCode"
                value={data.postalCode}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#7c0000] focus:shadow-[0_0_0_2px_rgba(124,0,0,0.1)] transition-all duration-150"
                placeholder="Enter postal code"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ApplicantContact;