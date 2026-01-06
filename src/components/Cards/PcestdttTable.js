import React, { useEffect, useState } from "react";

function PcestdttTable({ onInteraction, estimateData }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (estimateData && estimateData.length > 0) {
      setData((prev) => {
        const newData = [...prev];
        estimateData.forEach((newEstimate) => {
          const existingIndex = newData.findIndex(
            (item) => item.resCd === newEstimate.resCd && item.estimateNo === newEstimate.estimateNo
          );
          if (existingIndex === -1) {
            newData.push(newEstimate);
          } else {
            newData[existingIndex] = { ...newData[existingIndex], ...newEstimate };
          }
        });
        return newData;
      });
    }
  }, [estimateData]);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/pcestdtt");
      if (!response.ok) throw new Error("Failed to fetch data");
      const result = await response.json();
      setData(result);
      setLoading(false);
      onInteraction?.({ action: "table_loaded", data: result });
    } catch (err) {
      setError(err.message);
      setLoading(false);
      onInteraction?.({ action: "table_error", error: err.message });
    }
  };

  const handleDeleteClick = async (item) => {
    const { estimateNo, revNo, deptId, resCd } = item;
    if (window.confirm(`Are you sure you want to delete resource code ${resCd}?`)) {
      try {
        const newData = data.filter((row) => row.resCd !== resCd);
        setData(newData);

        const response = await fetch(
          `/api/pcestdtt/${estimateNo}/${revNo}/${deptId}/${resCd}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to delete data: ${errorText}`);
        }

        onInteraction?.({ action: "row_deleted", resCd });
      } catch (err) {
        console.error("Error deleting row:", err);
        setError(err.message);
        fetchData();
      }
    }
  };

  const startEditing = (item, field, value) => {
    setEditingCell({ resCd: item.resCd, field });
    setEditValue(value.toString());
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const saveEdit = async (item) => {
    const { estimateNo, revNo, deptId, resCd } = item;
    const { field } = editingCell;
    const updatedValue = editValue;

    try {
      const response = await fetch(
        `/api/pcestdtt/${estimateNo}/${revNo}/${deptId}/${resCd}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ [field]: updatedValue }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update data: ${errorText}`);
      }

      const updatedData = data.map((row) =>
        row.resCd === resCd ? { ...row, [field]: updatedValue } : row
      );
      setData(updatedData);
      onInteraction?.({ action: "row_updated", resCd, field, value: updatedValue });
    } catch (err) {
      console.error("Error updating row:", err);
      setError(err.message);
      fetchData();
    } finally {
      setEditingCell(null);
      setEditValue("");
    }
  };

  const handleKeyPress = (e, item) => {
    if (e.key === "Enter") {
      saveEdit(item);
    }
  };

  const cancelEdit = () => {
    setEditingCell(null);
    setEditValue("");
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-4">Error: {error}</div>;

  const headers = [
    "CD",
    "Resource Name",
    "UOM",
    "Unit Price",
    "Estimate Quantity",
    "Estimate Cost",
    "Rebate Quantity",
    "Rebate Cost",
    "Reusable Quantity",
    "Off Charge Quantity",
    "Actions",
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.resCd} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
              <td className="px-4 py-2 text-sm text-gray-700">{item.resCd}</td>
              {[
                "resType",
                "uom",
                "unitPrice",
                "estimateQty",
                "estimateCost",
                "returnedQty",
                "returnedCost",
                "approvedQty",
                "damageQty",
              ].map((field) => (
                <td
                  key={field}
                  className="px-4 py-2 text-sm text-gray-700"
                  onClick={() => startEditing(item, field, item[field])}
                >
                  {editingCell?.resCd === item.resCd && editingCell?.field === field ? (
                    <input
                      type="text"
                      value={editValue}
                      onChange={handleEditChange}
                      onBlur={() => saveEdit(item)}
                      onKeyPress={(e) => handleKeyPress(e, item)}
                      className="border rounded px-2 py-1 text-sm w-full"
                      autoFocus
                    />
                  ) : (
                    item[field]
                  )}
                </td>
              ))}
              <td className="px-4 py-2 text-sm flex space-x-2">
                <button
                  type="button"
                  onClick={() => handleDeleteClick(item)}
                  className="px-2 py-1 bg-red-500 text-white rounded text-xs"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PcestdttTable;