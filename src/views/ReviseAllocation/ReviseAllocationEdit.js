import HeaderStatsWithoutCards from "components/Headers/HeaderStatsWithoutCards";
import Sidebar from "components/Sidebar/Sidebar";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

function ReviseAllocationEdit() {
  const today = new Date().toLocaleDateString("en-GB");
  const [rows, setRows] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const deptId = sessionStorage.getItem("deptId");

  useEffect(() => {
    fetchTableData();
    fetchStaffList();
  }, []);

  // Fetch table data
  const fetchTableData = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/v1/spestedycon/dept/${deptId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("user:admin123"),
        },
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) setRows(data);
      else console.error("Fetch failed:", data);
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  // Fetch staff list
  const fetchStaffList = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/v1/auth/users/dept/${deptId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("user:admin123"),
        },
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) setStaffList(data.map((name) => name.trim()));
    } catch (error) {
      console.error("Error fetching staff list:", error);
    }
  };

  // Handle Allocated To change
  const handleAllocatedToChange = (index, value) => {
    const updatedRows = [...rows];
    updatedRows[index].allocatedTo = value;
    setRows(updatedRows);
  };

  // Handle save for each row
  const handleEditSubmit = async (item) => {
    try {
      if (!item.allocatedTo) {
        alert("Please select a staff before saving!");
        return;
      }

      const payload = {
        id: item.id, // send the embedded ID
        allocatedTo: item.allocatedTo,
      };

      const response = await fetch(`${baseUrl}/api/v1/spestedycon/update-allocated-to`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("user:admin123"),
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Updated successfully!");
        fetchTableData(); // refresh table
      } else {
        const errorData = await response.json();
        console.error("Update failed:", errorData);
        alert("Update failed.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("An error occurred while updating.");
    }
  };

  return (
    <>
      <Sidebar />
      <div className="relative flex flex-col min-h-screen md:ml-64 bg-blueGray-100">
        <HeaderStatsWithoutCards />

        <div className="flex-grow">
          <div className="relative w-full px-3 mx-auto -mt-24 md:px-10">
            <div className="container px-3 py-6 mx-auto">
              <div className="flex justify-center">
                <div className="w-full p-6 bg-white rounded-lg shadow-lg">

                  {/* DATE SECTION */}
                  <div className="p-6 mb-6 border rounded-lg bg-gray-50">
                    <div className="flex flex-wrap">
                      <div className="w-full px-3 lg:w-6/12">
                        <label className="block mb-2 text-sm text-gray-700">Today</label>
                        <input
                          value={today}
                          type="text"
                          disabled
                          className="w-full p-2 text-sm bg-gray-100 border border-gray-300 rounded cursor-not-allowed"
                        />
                      </div>

                      <div className="w-full px-3 lg:w-6/12">
                        <label className="block mb-2 text-sm text-gray-700">Selected Date</label>
                        <input
                          type="date"
                          className="w-full p-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#7c0000]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* TITLE */}
                  <div className="mb-4 text-center">
                    <h2 className="text-lg font-bold text-gray-800">Diary Schedules</h2>
                  </div>

                  {/* TABLE */}
                  <div className="mb-6 overflow-x-auto border rounded-lg">
                    <table className="min-w-full bg-white border-collapse">
                      <thead>
                        <tr className="bg-red-800">
                          <th className="px-3 py-3 text-xs font-semibold text-left text-white uppercase border-b">Check</th>
                          <th className="px-3 py-3 text-xs font-semibold text-left text-white uppercase border-b">ID</th>
                          <th className="px-3 py-3 text-xs font-semibold text-left text-white uppercase border-b">Application No</th>
                          <th className="px-3 py-3 text-xs font-semibold text-left text-white uppercase border-b">Allocated By</th>
                          <th className="px-3 py-3 text-xs font-semibold text-left text-white uppercase border-b" style={{ width: '180px' }}>Allocated To</th>
                          <th className="px-3 py-3 text-xs font-semibold text-left text-white uppercase border-b">Description</th>
                          <th className="px-3 py-3 text-xs font-semibold text-left text-white uppercase border-b">Cost Center</th>
                          <th className="px-3 py-3 text-xs font-semibold text-left text-white uppercase border-b">Appt Type</th>
                          <th className="px-3 py-3 text-xs font-semibold text-left text-white uppercase border-b">Status</th>
                          <th className="px-3 py-3 text-xs font-semibold text-center text-white uppercase border-b">Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {rows.length > 0 ? (
                          rows.map((item, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                              <td className="px-3 py-3 text-sm text-gray-700">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-[#7c0000] focus:ring-[#7c0000]"
                                />
                              </td>

                              <td className="px-3 py-3 text-sm text-gray-700">{item.id?.appointmentId}</td>
                              <td className="px-3 py-3 text-sm text-gray-700">{item.referenceNo}</td>
                              <td className="px-3 py-3 text-sm text-gray-700">{item.allocatedBy}</td>

                              <td className="px-3 py-3 text-sm text-gray-700" style={{ width: '180px' }}>
                                <select
                                  value={item.allocatedTo || ""}
                                  onChange={(e) => handleAllocatedToChange(index, e.target.value)}
                                  className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#7c0000] focus:border-[#7c0000]"
                                >
                                  <option value="">Select Staff</option>
                                  {staffList.map((value, i) => (
                                    <option key={i} value={value}>{value}</option>
                                  ))}
                                </select>
                              </td>

                              <td className="px-3 py-3 text-sm text-gray-700">{item.description || "-"}</td>
                              <td className="px-3 py-3 text-sm text-gray-700">{item.id?.deptId}</td>
                              <td className="px-3 py-3 text-sm text-gray-700">{item.appoinmentType}</td>
                              <td className="px-3 py-3 text-sm text-gray-700">{item.status}</td>

                              <td className="px-3 py-3 text-sm text-center">
                                <button
                                  onClick={() => handleEditSubmit(item)}
                                  className="text-[#7c0000] hover:text-[#a00000]"
                                  title="Edit & Save"
                                >
                                  <FaEdit size={16} />
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="10" className="py-6 text-sm text-center text-gray-500">
                              No data available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReviseAllocationEdit;