// import React, { useState, useEffect } from "react";
// import "./TreeView.css";

// const TreeNode = ({ node, onSelect }) => {
//   const [expanded, setExpanded] = useState(false);
//   const hasChildren = node.children && node.children.length > 0;

//   const handleClick = () => {
//     if (hasChildren) {
//       setExpanded(!expanded);
//     } else {
//       onSelect(node);
//     }
//   };

//   return (
//     <li className={hasChildren ? (expanded ? "expanded" : "") : "file"}>
//       <span onClick={handleClick}>{node.description}</span>
//       {hasChildren && (
//         <ul style={{ display: expanded ? "block" : "none" }}>
//           {node.children.map((child) => (
//             <TreeNode
//               key={child.sectionTypeId}
//               node={child}
//               onSelect={onSelect}
//             />
//           ))}
//         </ul>
//       )}
//     </li>
//   );
// };

// const TreeView = () => {
//   const [treeData, setTreeData] = useState([]);
//   const [selectedNode, setSelectedNode] = useState(null);
//   const [tableData, setTableData] = useState([]);
//   const [selectedItems, setSelectedItems] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8081/api/spnormsgroup")
//       .then((res) => res.json())
//       .then((data) => setTreeData(buildTree(data)))
//       .catch((err) => console.error("fetch error:", err));
//   }, []);

//   const buildTree = (data) => {
//     const map = new Map();
//     const roots = [];
//     data.forEach((item) =>
//       map.set(item.sectionTypeId, { ...item, children: [] })
//     );
//     data.forEach((item) => {
//       if (item.lineParentId) {
//         const parent = map.get(item.lineParentId);
//         if (parent) parent.children.push(map.get(item.sectionTypeId));
//       } else {
//         roots.push(map.get(item.sectionTypeId));
//       }
//     });
//     return roots;
//   };

//   const handleSelect = (node) => {
//     setSelectedNode(node);
//     fetch(
//       `http://localhost:8081/api/standard-rates-by-parent?lineParentId=${node.sectionTypeId}`
//     )
//       .then((res) => res.json())
//       .then((data) => setTableData(data))
//       .catch((err) => console.error("table fetch error:", err));
//   };

//   const handleCheckboxChange = (item, checked) => {
//     if (checked) {
//       setSelectedItems((prev) => [...prev, item]);
//     } else {
//       setSelectedItems((prev) =>
//         prev.filter((i) => i.lineSectionTypeId !== item.lineSectionTypeId)
//       );
//     }
//   };

//   const getTotalCost = () => {
//     return selectedItems.reduce(
//       (sum, item) => sum + parseFloat(item.standardCost || 0),
//       0
//     );
//   };

//   return (
//     <div
//       className="tree-table-wrapper"
//       style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
//     >
//       <div className="tree-container">
//         <ul className="tree">
//           {treeData.map((node) => (
//             <TreeNode
//               key={node.sectionTypeId}
//               node={node}
//               onSelect={handleSelect}
//             />
//           ))}
//         </ul>
//       </div>

//       <div className="table-container">
//         {selectedNode && (
//           <>
//             <table border="1">
//               <thead>
//                 <tr>
//                   <th />
//                   <th style={{ fontWeight: "bold", paddingRight: "30px" }}>
//                     Line ID
//                   </th>
//                   <th style={{ fontWeight: "bold", paddingRight: "30px" }}>
//                     UOM
//                   </th>
//                   <th style={{ fontWeight: "bold", paddingRight: "30px" }}>
//                     Description
//                   </th>
//                   <th style={{ fontWeight: "bold" }}>
//                     Standard Cost
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {tableData.map((row, idx) => {
//                   const isSelected = selectedItems.some(
//                     (item) => item.lineSectionTypeId === row.lineSectionTypeId
//                   );
//                   return (
//                     <tr key={idx}>
//                       <td style={{ paddingRight: "20px" }}>
//                         <input
//                           type="checkbox"
//                           checked={isSelected}
//                           onChange={(e) =>
//                             handleCheckboxChange(row, e.target.checked)
//                           }
//                         />
//                       </td>
//                       <td style={{ paddingRight: "20px" }}>
//                         {row.lineSectionTypeId}
//                       </td>
//                       <td style={{ paddingRight: "20px" }}>{row.uom}</td>
//                       <td style={{ paddingRight: "20px" }}>
//                         {row.description}
//                       </td>
//                       <td>{row.standardCost}</td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>

//             {selectedItems.length > 0 && (
//               <div style={{ marginTop: "2rem" }}>
//                 <h4 style={{ fontWeight: "bold" }}>Selected Items</h4>

//                 <div style={{ paddingLeft: '40px' }}>
//                 <table border="1">
//                   <thead>
//                     <tr>
//                       <th style={{ paddingRight: "30px" }}>Line ID</th>
//                       <th style={{ paddingRight: "30px" }}>UOM</th>
//                       <th style={{ paddingRight: "30px" }}>Description</th>
//                       <th>Standard Cost</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {selectedItems.map((item, idx) => (
//                       <tr key={idx}>
//                         <td style={{ paddingRight: "20px" }}>
//                           {item.lineSectionTypeId}
//                         </td>
//                         <td style={{ paddingRight: "20px" }}>
//                           {item.uom}
//                         </td>
//                         <td style={{ paddingRight: "20px" }}>
//                           {item.description}
//                         </td>
//                         <td>{item.standardCost}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//                 </div>
//                 <p style={{ marginTop: "1rem", fontWeight: "bold" }}>
//                   Total Cost: {getTotalCost().toFixed(2)}
//                 </p>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TreeView;

import React, { useState, useEffect } from "react";

const TreeNode = ({ node, onSelect }) => {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      setExpanded(!expanded);
    } else {
      onSelect(node);
    }
  };

  return (
    <li className={`mb-1 ${hasChildren ? "font-medium" : ""}`}>
      <span
        onClick={handleClick}
        className={`cursor-pointer text-gray-700 hover:text-[#7c0000] ${
          hasChildren ? "font-bold" : ""
        }`}
      >
        {hasChildren && (
          <span className="mr-2 text-[#7c0000]">{expanded ? "▼" : "▶"}</span>
        )}
        {node.description || node.name}
      </span>
      {hasChildren && expanded && (
        <ul className="pl-4 mt-1">
          {node.children.map((child) => (
            <TreeNode
              key={child.sectionTypeId}
              node={child}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const TreeView = () => {
  const [treeData, setTreeData] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/api/spnormsgroup")
      .then((res) => res.json())
      .then((data) => setTreeData(buildTree(data)))
      .catch((err) => console.error("fetch error:", err));
  }, []);

  const buildTree = (data) => {
    const map = new Map();
    const roots = [];
    data.forEach((item) =>
      map.set(item.sectionTypeId, { ...item, children: [] })
    );
    data.forEach((item) => {
      if (item.lineParentId) {
        const parent = map.get(item.lineParentId);
        if (parent) parent.children.push(map.get(item.sectionTypeId));
      } else {
        roots.push(map.get(item.sectionTypeId));
      }
    });
    return roots;
  };

  const handleSelect = (node) => {
    setSelectedNode(node);
    fetch(
      `http://localhost:8081/api/standard-rates-by-parent?lineParentId=${node.sectionTypeId}`
    )
      .then((res) => res.json())
      .then((data) => setTableData(data))
      .catch((err) => console.error("table fetch error:", err));
  };

  const handleCheckboxChange = (item, checked) => {
    if (checked) {
      setSelectedItems((prev) => [...prev, item]);
    } else {
      setSelectedItems((prev) =>
        prev.filter((i) => i.lineSectionTypeId !== item.lineSectionTypeId)
      );
    }
  };

  const getTotalCost = () => {
    return selectedItems.reduce(
      (sum, item) => sum + parseFloat(item.standardCost || 0),
      0
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-lg p-4">
        <ul className="list-none">
          {treeData.map((node) => (
            <TreeNode
              key={node.sectionTypeId}
              node={node}
              onSelect={handleSelect}
            />
          ))}
        </ul>
      </div>

      {selectedNode && (
        <div className="bg-white border rounded-lg p-4 overflow-x-auto">
          <h3 className="text-md font-bold text-gray-800 mb-3">
            Items for {selectedNode.description || selectedNode.name}
          </h3>
          
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border">Select</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border">Line ID</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border">UOM</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border">Description</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border">Standard Cost</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => {
                const isSelected = selectedItems.some(
                  (item) => item.lineSectionTypeId === row.lineSectionTypeId
                );
                return (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-700 border">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => handleCheckboxChange(row, e.target.checked)}
                        className="rounded border-gray-300 text-[#7c0000] focus:ring-[#7c0000]"
                      />
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700 border">{row.lineSectionTypeId}</td>
                    <td className="px-4 py-2 text-sm text-gray-700 border">{row.uom}</td>
                    <td className="px-4 py-2 text-sm text-gray-700 border">{row.description}</td>
                    <td className="px-4 py-2 text-sm text-gray-700 border">{row.standardCost}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {selectedItems.length > 0 && (
            <div className="mt-6">
              <h4 className="text-md font-bold text-gray-800 mb-3">Selected Items</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border">Line ID</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border">UOM</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border">Description</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border">Standard Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedItems.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm text-gray-700 border">{item.lineSectionTypeId}</td>
                        <td className="px-4 py-2 text-sm text-gray-700 border">{item.uom}</td>
                        <td className="px-4 py-2 text-sm text-gray-700 border">{item.description}</td>
                        <td className="px-4 py-2 text-sm text-gray-700 border">{item.standardCost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-right font-bold text-gray-800">
                Total Cost: Rs. {getTotalCost().toFixed(2)}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TreeView;
