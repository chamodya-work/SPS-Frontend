import { useState, useEffect } from "react";

const AppDetails = ({ onInputChange, isModify, data, handleSearch }) => {
  const [appData, setAppData] = useState({
    applicationId: "",
    description: "",
    jobName: "",
  });

  useEffect(() => {
    if (data) {
      setAppData(data);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...appData, [name]: value };
    setAppData(newData);
    onInputChange(newData);
  };

  return (
    <div className="flex-auto px-4 py-10 pt-2 lg:px-10">
      <form>
        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                Temporary ID
              </label>
              <div className="flex ">
                <input
                  type="text"
                  name="applicationId"
                  value={appData.applicationId}
                  onChange={handleChange}
                  className="w-full h-10 px-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                  placeholder="430.00/ABS/25/xxxx"
                />
                {isModify && (
                  <button
                    className="px-4 py-2 ml-2 mr-1 text-sm text-white transition-all duration-150 ease-linear rounded shadow outline-none active:bg-lightBlue-600 hover:shadow-md focus:outline-none"
                    style={{ backgroundColor: "#7c0000" }}
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                Date
              </label>
              <input
                type="date"
                name="date"
                className="w-full px-3 py-2 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                Area
              </label>
              <select
                name="area"
                className="w-full h-10 px-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
              >
                <option value="AREA - MAWANELLA">Area - Mawanella</option>
                <option value="AREA - OTHER">Area - Other</option>
              </select>
            </div>
          </div>
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                CostCenter
              </label>
              <input
                type="text"
                className="w-full h-10 px-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                placeholder="430.00"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                Application Type
              </label>
              <select
                name="ApplicationType"
                className="w-full h-10 px-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
              >
                <option value="BS">BS</option>
                <option value="Other">OTHER</option>
              </select>
            </div>
          </div>
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                Found Source
              </label>
              <select
                name="FoundSource"
                className="w-full h-10 px-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
              >
                <option value="ADB">ADB</option>
                <option value="Other">OTHER</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                Representative 1
              </label>
              <input
                type="text"
                className="w-full h-10 px-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                Description
              </label>
              <input
                type="text"
                name="description"
                value={appData.description}
                onChange={handleChange}
                className="w-full h-10 px-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                Consumer Reference
              </label>
              <input
                type="text"
                className="w-full h-10 px-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                Job Name
              </label>
              <input
                type="text"
                name="jobName"
                value={appData.jobName}
                onChange={handleChange}
                className="w-full h-10 px-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                Nature of Supply
              </label>
              <div className="flex ">
                <select
                  name="FoundSource"
                  className="w-full h-10 px-3 mr-2 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                >
                  <option value="permanent">Permanent</option>
                  <option value="Other">OTHER</option>
                </select>
                <select
                  name="FoundSource"
                  className="w-full h-10 px-3 mr-2 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                >
                  <option value="Years">Years</option>
                  <option value="Other">OTHER</option>
                </select>
                <input
                  type="text"
                  className="w-full h-10 px-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                />
              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-sm text-blueGray-600"
                htmlFor="grid-password"
              >
                Is Loan App
              </label>
              <div className="flex gap-4 mt-4">
                <label className="mr-4 text-sm">
                  <input
                    type="radio"
                    name="isLoanApp"
                    defaultChecked
                    value="Yes"
                  />{" "}
                  Yes - 75% Loan Scheme
                </label>
                <label className="text-sm">
                  <input type="radio" name="isLoanApp" value="No" /> No
                </label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AppDetails;
