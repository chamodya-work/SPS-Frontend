// // components/AddNodes/ComponentsTree.js
// import React, { useEffect, useState, useMemo, useRef } from "react";
// import { getIconForItem } from "components/PaggingSchedule/helpers";

// // Helper functions - Copied from ComponentsTreeView.js
// const flattenTree = (nodes) => {
//   if (!Array.isArray(nodes)) return [];
  
//   const result = [];
//   const seenIds = new Set();
  
//   const traverse = (node) => {
//     if (!node || seenIds.has(node.id)) return;
    
//     seenIds.add(node.id);
//     result.push(node);
    
//     if (node.children && Array.isArray(node.children)) {
//       node.children.forEach(traverse);
//     }
//   };
  
//   nodes.forEach(traverse);
//   return result;
// };

// const buildTree = (data) => {
//   if (!Array.isArray(data) || data.length === 0) return [];
  
//   const nodeMap = new Map();
//   const seenIds = new Set();
  
//   data.forEach((item) => {
//     const id = String(item.id || "");
//     if (id && !seenIds.has(id)) {
//       seenIds.add(id);
//       nodeMap.set(id, {
//         ...item,
//         children: []
//       });
//     }
//   });

//   const tree = [];
//   const processedNodes = new Set();
  
//   const processNode = (nodeId) => {
//     if (processedNodes.has(nodeId)) return null;
    
//     const node = nodeMap.get(nodeId);
//     if (!node) return null;
    
//     processedNodes.add(nodeId);
    
//     const processedNode = {
//       id: node.id,
//       name: node.name,
//       parentId: node.parentId,
//       children: []
//     };
    
//     nodeMap.forEach((potentialChild, childId) => {
//       if (!processedNodes.has(childId) && 
//           String(potentialChild.parentId) === String(nodeId)) {
//         const childNode = processNode(childId);
//         if (childNode) {
//           const childExists = processedNode.children.some(
//             child => child.name === childNode.name
//           );
//           if (!childExists) {
//             processedNode.children.push(childNode);
//           }
//         }
//       }
//     });
    
//     return processedNode;
//   };
  
//   nodeMap.forEach((node, nodeId) => {
//     const parentId = String(node.parentId || "");
//     const isRoot = !parentId || 
//                    parentId === "1" || 
//                    parentId === "0" || 
//                    !nodeMap.has(parentId);
    
//     if (isRoot && !processedNodes.has(nodeId)) {
//       const rootNode = processNode(nodeId);
//       if (rootNode) {
//         const rootExists = tree.some(root => root.name === rootNode.name);
//         if (!rootExists) {
//           tree.push(rootNode);
//         }
//       }
//     }
//   });
  
//   return tree;
// };

// const normalizeFlatNodes = (arr) => {
//   if (!Array.isArray(arr)) return [];
  
//   const uniqueItems = [];
//   const seenCombinations = new Set();
  
//   arr.forEach((it) => {
//     const raw = it.name || it.resName || it.RES_NAME || "";
//     let name = String(raw || "");
//     name = name.replace(/[\u2295\+\u25A0\u25B2\u25CF]/g, "");
//     name = name.replace(/\s+/g, " ").trim();
    
//     const id = String(it.id || it.resCd || "");
//     const parentId = String(it.parentId || it.parentID || "");
    
//     if (name && id) {
//       const key = `${name.toLowerCase()}-${id}-${parentId}`;
      
//       if (!seenCombinations.has(key)) {
//         seenCombinations.add(key);
//         uniqueItems.push({ 
//           ...it, 
//           name,
//           id,
//           parentId
//         });
//       }
//     }
//   });
  
//   return uniqueItems;
// };

// // TreeNode Component - Copied from ComponentsTreeView.js
// const TreeNode = ({ node, level = 0, onSelect, getIconForItem, selectedNodeId }) => {
//   const [expanded, setExpanded] = useState(false);
//   const [showIdBadge, setShowIdBadge] = useState(false);
//   const badgeTimerRef = useRef(null);
//   const hasChildren = node.children && node.children.length > 0;
//   const iconUrl = getIconForItem ? getIconForItem(node.name) : null;
//   const isMaterialRoot = (node.name || "").toString().trim().toLowerCase() === "material";
//   const isSelected = selectedNodeId === node.id;

//   useEffect(() => {
//     if (isMaterialRoot) setExpanded(true);
//   }, [isMaterialRoot]);

//   const toggleExpand = (e) => {
//     e.stopPropagation();
//     setExpanded(!expanded);
//   };

//   const handleNodeClick = (e) => {
//     e.stopPropagation();
    
//     setShowIdBadge(true);
//     if (badgeTimerRef.current)
//       window.clearTimeout(badgeTimerRef.current);
//     badgeTimerRef.current = window.setTimeout(
//       () => setShowIdBadge(false),
//       4000
//     );
    
//     onSelect && onSelect(node);
//   };

//   return (
//     <li className="tree-node mb-2" style={{ marginBottom: 8 }}>
//       <div className="tree-node-content" style={{ display: "flex", alignItems: "center" }}>
//         {/* Expand/Collapse Icon - Only for folders */}
//         {hasChildren ? (
//           <span 
//             onClick={toggleExpand}
//             className="tree-expand-icon cursor-pointer mr-1 text-gray-600 hover:text-gray-800"
//             style={{ width: 20, display: "inline-block" }}
//           >
//             <i className={`fas ${expanded ? "fa-minus-square" : "fa-plus-square"} text-blue-600`}></i>
//           </span>
//         ) : (
//           <span className="tree-expand-icon mr-1" style={{ width: 20, display: "inline-block" }}></span>
//         )}

//         {/* Folder/File Icon */}
//         <span className="tree-icon mr-2">
//           <i className={`fas ${
//             hasChildren 
//               ? expanded 
//                 ? "fa-folder-open text-yellow-500" 
//                 : "fa-folder text-yellow-500"
//               : "fa-file text-gray-400"
//           }`}></i>
//         </span>

//         {/* Node Label with ID Badge */}
//         <div
//           onClick={handleNodeClick}
//           style={{
//             cursor: "pointer",
//             display: "flex",
//             alignItems: "center",
//             gap: 6,
//             padding: "4px 8px",
//             borderRadius: 6,
//             background: isSelected ? "#dbeafe" : "#f8fafc",
//             transition: "0.2s all",
//             boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//             flex: 1,
//             border: isSelected ? "1px solid #3b82f6" : "none"
//           }}
//         >
//           {iconUrl && (
//             <img src={iconUrl} alt="" style={{ width: 18, height: 18 }} />
//           )}
//           <span className="tree-label" style={{ fontWeight: isSelected ? 600 : 400 }}>{node.name}</span>
//           {showIdBadge && (
//             <span
//               className="node-id-badge"
//               title={`ID: ${node.id} (click to copy)`}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 try {
//                   navigator.clipboard?.writeText(String(node.id));
//                 } catch {}
//               }}
//               style={{
//                 fontSize: "11px",
//                 background: "#e2e8f0",
//                 padding: "2px 6px",
//                 borderRadius: "12px",
//                 color: "#334155",
//                 marginLeft: "8px"
//               }}
//             >
//               {String(node.id)}
//             </span>
//           )}
//         </div>
//       </div>

//       {/* Children Nodes */}
//       {hasChildren && expanded && (
//         <ul className="tree-children" style={{ paddingLeft: 28, marginTop: 4 }}>
//           {node.children.map((child) => (
//             <TreeNode
//               key={`${child.id}-${child.name}`}
//               node={child}
//               level={level + 1}
//               onSelect={onSelect}
//               getIconForItem={getIconForItem}
//               selectedNodeId={selectedNodeId}
//             />
//           ))}
//         </ul>
//       )}
//     </li>
//   );
// };

// // Main ComponentsTree Component
// const ComponentsTree = ({ onSelectNode, selectedNodeId }) => {
//   // Get API base URL from environment variables
//   const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
//   const baseUrl = `${API_BASE_URL}/api/sppeg`;
  
//   const [treeData, setTreeData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
  
//   // Search state
//   const [query, setQuery] = useState("");
//   const [appliedQuery, setAppliedQuery] = useState("");
//   const [openSuggest, setOpenSuggest] = useState(false);
//   const [showSearch, setShowSearch] = useState(false);
//   const [flatTreeNodes, setFlatTreeNodes] = useState([]);

//   // Fetch data
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await fetch(baseUrl, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
//         const data = await res.json();
//         const arr = Array.isArray(data) ? data : data?.data ?? [];
        
//         // STEP 1: Filter by deptId=4
//         let filteredData = arr.filter(item => item.deptId === "4");
        
//         // STEP 2: Exclude items with specific parent IDs
//         const excludedParentIds = ["C11512", "cc_l25", "cc_l26", "cc_l27"];
        
//         filteredData = filteredData.filter(item => {
//           if (excludedParentIds.includes(item.parentId)) {
//             console.log(`Excluding item: ${item.name} (ID: ${item.id}) because parentId=${item.parentId}`);
//             return false;
//           }
//           return true;
//         });
        
//         console.log('Original count:', arr.length);
//         console.log('After deptId=4 filter:', arr.filter(item => item.deptId === "4").length);
//         console.log('After parentId exclusion:', filteredData.length);
        
//         const cleanedData = normalizeFlatNodes(filteredData);
//         const rawTree = buildTree(cleanedData);
        
//         // Store flat nodes for search
//         setFlatTreeNodes(flattenTree(rawTree));
        
//         const materialKey = "material";
//         let materialNode = null;
//         const otherNodes = [];
        
//         rawTree.forEach(node => {
//           const nodeName = (node.name || "").toString().trim().toLowerCase();
//           if (nodeName === materialKey) {
//             materialNode = node;
//           } else {
//             otherNodes.push(node);
//           }
//         });
        
//         const finalTree = [];
        
//         if (materialNode) {
//           if (materialNode.children && materialNode.children.length > 0) {
//             const uniqueChildren = [];
//             const seenChildNames = new Set();
            
//             materialNode.children.forEach(child => {
//               const childName = (child.name || "").toString().trim().toLowerCase();
//               if (!seenChildNames.has(childName)) {
//                 seenChildNames.add(childName);
//                 uniqueChildren.push(child);
//               }
//             });
            
//             materialNode.children = uniqueChildren;
//           }
//           finalTree.push(materialNode);
//         }
        
//         const materialChildNames = new Set();
//         if (materialNode && materialNode.children) {
//           materialNode.children.forEach(child => {
//             materialChildNames.add((child.name || "").toString().trim().toLowerCase());
//           });
//         }
        
//         otherNodes.forEach(node => {
//           const nodeName = (node.name || "").toString().trim().toLowerCase();
//           if (!materialChildNames.has(nodeName)) {
//             finalTree.push(node);
//           }
//         });
        
//         setTreeData(finalTree);
        
//       } catch (err) {
//         setError(err?.message ?? String(err));
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [baseUrl]);

//   // Suggestions for search
//   const suggestions = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     if (!q) return [];
    
//     const seen = new Set();
//     const results = [];
    
//     for (const node of flatTreeNodes) {
//       const name = (node.name || "").toString().toLowerCase();
//       if (name.includes(q) && !seen.has(name)) {
//         seen.add(name);
//         results.push(node);
//       }
//       if (results.length >= 15) break;
//     }
    
//     return results;
//   }, [flatTreeNodes, query]);

//   // Filter tree function
//   const filterTree = (nodes, searchTerm) => {
//     if (!searchTerm) return nodes;
    
//     const searchLower = searchTerm.toLowerCase();
    
//     const filterNode = (node) => {
//       const nodeName = (node.name || "").toString().toLowerCase();
//       const matches = nodeName.includes(searchLower);
      
//       let filteredChildren = [];
//       if (node.children && node.children.length > 0) {
//         filteredChildren = node.children
//           .map(filterNode)
//           .filter(child => child !== null);
//       }
      
//       if (matches || filteredChildren.length > 0) {
//         return {
//           ...node,
//           children: filteredChildren
//         };
//       }
      
//       return null;
//     };
    
//     return nodes.map(filterNode).filter(node => node !== null);
//   };

//   const displayTree = useMemo(() => {
//     return filterTree(treeData, appliedQuery);
//   }, [treeData, appliedQuery]);

//   const applySelection = (text) => {
//     const value = (text || "").trim();
//     setAppliedQuery(value);
//     setOpenSuggest(false);
//   };

//   const clearFilter = () => {
//     setAppliedQuery("");
//     setQuery("");
//     setOpenSuggest(false);
//   };

//   const handleNodeSelect = (node) => {
//     if (onSelectNode) {
//       onSelectNode(node);
//     }
//   };

//   if (loading) return <div className="p-4">Loading tree...</div>;
//   if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

//   return (
//     <div className="tree-view-container" style={{ 
//       position: "relative",
//       height: "calc(100vh - 250px)",
//       display: "flex",
//       flexDirection: "column",
//       backgroundColor: "#ffffff",
//       borderRadius: "8px",
//       boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
//     }}>
//       {/* Header with Title and Search */}
//       <div className="tree-header" style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//         background: "#f8fafc",
//         color: "#0f172a",
//         fontWeight: 600,
//         borderRadius: "8px 8px 0 0",
//         padding: "12px 16px",
//         borderBottom: "2px solid #e2e8f0",
//         flexShrink: 0
//       }}>
//         <span style={{ fontSize: "1.1rem" }}>📁 Material List</span>
//         <button
//           aria-label={showSearch ? "Hide search" : "Show search"}
//           onClick={() => {
//             setShowSearch((s) => !s);
//             setOpenSuggest(false);
//           }}
//           title="Search"
//           style={{
//             display: "inline-flex",
//             alignItems: "center",
//             justifyContent: "center",
//             width: 32,
//             height: 32,
//             borderRadius: "6px",
//             border: "1px solid #e2e8f0",
//             background: "#ffffff",
//             cursor: "pointer",
//             transition: "all 0.2s"
//           }}
//         >
//           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2">
//             <circle cx="11" cy="11" r="8"></circle>
//             <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
//           </svg>
//         </button>
//       </div>

//       {/* Search Section */}
//       {showSearch && (
//         <div className="search-section" style={{
//           background: "#ffffff",
//           padding: "12px 16px",
//           borderBottom: "1px solid #e2e8f0",
//           flexShrink: 0
//         }}>
//           <div style={{ position: "relative" }}>
//             <input
//               type="text"
//               placeholder="Search items by name..."
//               value={query}
//               onChange={(e) => {
//                 setQuery(e.target.value);
//                 setOpenSuggest(true);
//               }}
//               onFocus={(e) => {
//                 setOpenSuggest(true);
//                 e.target.style.borderColor = "#3b82f6";
//               }}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") applySelection(query);
//                 if (e.key === "Escape") setOpenSuggest(false);
//               }}
//               style={{
//                 width: "100%",
//                 padding: "10px 12px",
//                 border: "2px solid #e2e8f0",
//                 borderRadius: "8px",
//                 outline: "none",
//                 fontSize: "14px",
//                 transition: "border-color 0.2s"
//               }}
//               onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
//             />
//             {appliedQuery && (
//               <button
//                 onClick={clearFilter}
//                 style={{
//                   position: "absolute",
//                   right: 8,
//                   top: 8,
//                   padding: "6px 12px",
//                   background: "#f1f5f9",
//                   border: "none",
//                   borderRadius: "6px",
//                   cursor: "pointer",
//                   fontSize: "12px",
//                   fontWeight: 500,
//                   color: "#475569"
//                 }}
//                 title="Clear filter"
//               >
//                 Clear ×
//               </button>
//             )}
//             {openSuggest && suggestions.length > 0 && (
//               <ul
//                 style={{
//                   position: "absolute",
//                   zIndex: 20,
//                   left: 0,
//                   right: 0,
//                   maxHeight: 280,
//                   overflowY: "auto",
//                   background: "#ffffff",
//                   border: "1px solid #e2e8f0",
//                   borderRadius: "8px",
//                   marginTop: "4px",
//                   listStyle: "none",
//                   padding: "8px 0",
//                   boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//                 }}
//                 onMouseDown={(e) => e.preventDefault()}
//               >
//                 {suggestions.map((s) => (
//                   <li
//                     key={`${s.id}-${s.name}`}
//                     onClick={() => applySelection(s.name)}
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 12,
//                       padding: "10px 16px",
//                       cursor: "pointer",
//                       borderBottom: "1px solid #f1f5f9",
//                       transition: "background 0.2s"
//                     }}
//                     onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8fafc"}
//                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
//                   >
//                     {getIconForItem(s.name) && (
//                       <img src={getIconForItem(s.name)} alt="" style={{ width: 18, height: 18 }} />
//                     )}
//                     <span style={{ flex: 1, fontSize: "14px" }}>{s.name}</span>
//                     <span style={{ fontSize: "11px", color: "#64748b", background: "#f1f5f9", padding: "2px 8px", borderRadius: "12px" }}>
//                       ID: {s.id}
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Tree List - Scrollable area */}
//       <div style={{
//         flex: 1,
//         overflowY: "auto",
//         padding: "16px",
//         minHeight: 0,
//         backgroundColor: "#ffffff"
//       }}>
//         {displayTree.length > 0 ? (
//           <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
//             {displayTree.map((node) => (
//               <TreeNode
//                 key={`${node.id}-${node.name}`}
//                 node={node}
//                 onSelect={handleNodeSelect}
//                 getIconForItem={getIconForItem}
//                 selectedNodeId={selectedNodeId}
//               />
//             ))}
//           </ul>
//         ) : (
//           <div style={{ 
//             textAlign: "center", 
//             padding: "40px 20px", 
//             color: "#94a3b8",
//             fontSize: "14px"
//           }}>
//             No items found
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ComponentsTree;


// components/AddNodes/ComponentsTree.js
import React, { useEffect, useState, useMemo, useRef } from "react";
import { getIconForItem } from "components/PaggingSchedule/helpers";

// Helper functions - Copied from ComponentsTreeView.js
const flattenTree = (nodes) => {
  if (!Array.isArray(nodes)) return [];
  
  const result = [];
  const seenIds = new Set();
  
  const traverse = (node) => {
    if (!node || seenIds.has(node.id)) return;
    
    seenIds.add(node.id);
    result.push(node);
    
    if (node.children && Array.isArray(node.children)) {
      node.children.forEach(traverse);
    }
  };
  
  nodes.forEach(traverse);
  return result;
};

const buildTree = (data) => {
  if (!Array.isArray(data) || data.length === 0) return [];
  
  const nodeMap = new Map();
  const seenIds = new Set();
  
  data.forEach((item) => {
    const id = String(item.id || "");
    if (id && !seenIds.has(id)) {
      seenIds.add(id);
      nodeMap.set(id, {
        ...item,
        children: []
      });
    }
  });

  const tree = [];
  const processedNodes = new Set();
  
  const processNode = (nodeId) => {
    if (processedNodes.has(nodeId)) return null;
    
    const node = nodeMap.get(nodeId);
    if (!node) return null;
    
    processedNodes.add(nodeId);
    
    const processedNode = {
      id: node.id,
      name: node.name,
      parentId: node.parentId,
      children: []
    };
    
    nodeMap.forEach((potentialChild, childId) => {
      if (!processedNodes.has(childId) && 
          String(potentialChild.parentId) === String(nodeId)) {
        const childNode = processNode(childId);
        if (childNode) {
          const childExists = processedNode.children.some(
            child => child.name === childNode.name
          );
          if (!childExists) {
            processedNode.children.push(childNode);
          }
        }
      }
    });
    
    return processedNode;
  };
  
  nodeMap.forEach((node, nodeId) => {
    const parentId = String(node.parentId || "");
    const isRoot = !parentId || 
                   parentId === "1" || 
                   parentId === "0" || 
                   !nodeMap.has(parentId);
    
    if (isRoot && !processedNodes.has(nodeId)) {
      const rootNode = processNode(nodeId);
      if (rootNode) {
        const rootExists = tree.some(root => root.name === rootNode.name);
        if (!rootExists) {
          tree.push(rootNode);
        }
      }
    }
  });
  
  return tree;
};

const normalizeFlatNodes = (arr) => {
  if (!Array.isArray(arr)) return [];
  
  const uniqueItems = [];
  const seenCombinations = new Set();
  
  arr.forEach((it) => {
    const raw = it.name || it.resName || it.RES_NAME || "";
    let name = String(raw || "");
    name = name.replace(/[\u2295\+\u25A0\u25B2\u25CF]/g, "");
    name = name.replace(/\s+/g, " ").trim();
    
    const id = String(it.id || it.resCd || "");
    const parentId = String(it.parentId || it.parentID || "");
    
    if (name && id) {
      const key = `${name.toLowerCase()}-${id}-${parentId}`;
      
      if (!seenCombinations.has(key)) {
        seenCombinations.add(key);
        uniqueItems.push({ 
          ...it, 
          name,
          id,
          parentId
        });
      }
    }
  });
  
  return uniqueItems;
};

// TreeNode Component - Updated with Option 2
const TreeNode = ({ node, level = 0, onSelect, getIconForItem, selectedNodeId }) => {
  const [expanded, setExpanded] = useState(false);
  const [showIdBadge, setShowIdBadge] = useState(false);
  const badgeTimerRef = useRef(null);
  const hasChildren = node.children && node.children.length > 0;
  const iconUrl = getIconForItem ? getIconForItem(node.name) : null;
  const isMaterialRoot = (node.name || "").toString().trim().toLowerCase() === "material";
  const isSelected = selectedNodeId === node.id;

  useEffect(() => {
    if (isMaterialRoot) setExpanded(true);
  }, [isMaterialRoot]);

  const toggleExpand = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const handleNodeClick = (e) => {
    e.stopPropagation();
    
    setShowIdBadge(true);
    if (badgeTimerRef.current)
      window.clearTimeout(badgeTimerRef.current);
    badgeTimerRef.current = window.setTimeout(
      () => setShowIdBadge(false),
      4000
    );
    
    onSelect && onSelect(node);
  };

  return (
    <li className="tree-node mb-2" style={{ marginBottom: 8 }}>
      <div className="tree-node-content" style={{ 
        display: "flex", 
        alignItems: "center",
        whiteSpace: "nowrap", // Prevent text wrapping
        fontSize: "13px",
      }}>
        {/* Expand/Collapse Icon - Only for folders */}
        {hasChildren ? (
          <span 
            onClick={toggleExpand}
            className="tree-expand-icon cursor-pointer mr-1 text-gray-600 hover:text-gray-800"
            style={{ width: 20, display: "inline-block", flexShrink: 0 }}
          >
            <i className={`fas ${expanded ? "fa-minus-square" : "fa-plus-square"} text-blue-600`}></i>
          </span>
        ) : (
          <span className="tree-expand-icon mr-1" style={{ width: 20, display: "inline-block", flexShrink: 0 }}></span>
        )}

        {/* Folder/File Icon */}
        <span className="tree-icon mr-2" style={{ flexShrink: 0 }}>
          <i className={`fas ${
            hasChildren 
              ? expanded 
                ? "fa-folder-open text-yellow-500" 
                : "fa-folder text-yellow-500"
              : "fa-file text-gray-400"
          }`}></i>
        </span>

        {/* Node Label with ID Badge */}
        <div
          onClick={handleNodeClick}
          style={{
            cursor: "pointer",
            display: "inline-flex", // Changed to inline-flex
            alignItems: "center",
            gap: 6,
            padding: "4px 8px",
            borderRadius: 6,
            background: isSelected ? "#dbeafe" : "#f8fafc",
            transition: "0.2s all",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            flex: "0 1 auto", // Changed to auto grow
            border: isSelected ? "1px solid #3b82f6" : "none",
            maxWidth: "100%", // Allow it to grow
            whiteSpace: "nowrap" // Prevent text wrapping
          }}
        >
          {iconUrl && (
            <img src={iconUrl} alt="" style={{ width: 18, height: 18, flexShrink: 0 }} />
          )}
          <span className="tree-label" style={{ 
            fontWeight: isSelected ? 600 : 400,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "300px" // Adjust this value as needed
          }}>{node.name}</span>
          {showIdBadge && (
            <span
              className="node-id-badge"
              title={`ID: ${node.id} (click to copy)`}
              onClick={(e) => {
                e.stopPropagation();
                try {
                  navigator.clipboard?.writeText(String(node.id));
                } catch {}
              }}
              style={{
                fontSize: "11px",
                background: "#e2e8f0",
                padding: "2px 6px",
                borderRadius: "12px",
                color: "#334155",
                marginLeft: "8px",
                flexShrink: 0
              }}
            >
              {String(node.id)}
            </span>
          )}
        </div>
      </div>

      {/* Children Nodes */}
      {hasChildren && expanded && (
        <ul className="tree-children" style={{ 
          paddingLeft: 28, 
          marginTop: 4,
          whiteSpace: "nowrap" // Prevent text wrapping in children
        }}>
          {node.children.map((child) => (
            <TreeNode
              key={`${child.id}-${child.name}`}
              node={child}
              level={level + 1}
              onSelect={onSelect}
              getIconForItem={getIconForItem}
              selectedNodeId={selectedNodeId}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

// Main ComponentsTree Component
const ComponentsTree = ({ onSelectNode, selectedNodeId, refreshTrigger }) => {
  // Get API base URL from environment variables
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const baseUrl = `${API_BASE_URL}/api/sppeg`;
  
  const [treeData, setTreeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Search state
  const [query, setQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [openSuggest, setOpenSuggest] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [flatTreeNodes, setFlatTreeNodes] = useState([]);

  // Fetch data - now depends on refreshTrigger
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(baseUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const data = await res.json();
        const arr = Array.isArray(data) ? data : data?.data ?? [];
        
        // STEP 1: Filter by deptId=4
        let filteredData = arr.filter(item => item.deptId === "4");
        
        // STEP 2: Exclude items with specific parent IDs
        const excludedParentIds = ["C11512", "cc_l25", "cc_l26", "cc_l27"];
        
        filteredData = filteredData.filter(item => {
          if (excludedParentIds.includes(item.parentId)) {
            console.log(`Excluding item: ${item.name} (ID: ${item.id}) because parentId=${item.parentId}`);
            return false;
          }
          return true;
        });
        
        console.log('Original count:', arr.length);
        console.log('After deptId=4 filter:', arr.filter(item => item.deptId === "4").length);
        console.log('After parentId exclusion:', filteredData.length);
        
        const cleanedData = normalizeFlatNodes(filteredData);
        const rawTree = buildTree(cleanedData);
        
        // Store flat nodes for search
        setFlatTreeNodes(flattenTree(rawTree));
        
        const materialKey = "material";
        let materialNode = null;
        const otherNodes = [];
        
        rawTree.forEach(node => {
          const nodeName = (node.name || "").toString().trim().toLowerCase();
          if (nodeName === materialKey) {
            materialNode = node;
          } else {
            otherNodes.push(node);
          }
        });
        
        const finalTree = [];
        
        if (materialNode) {
          if (materialNode.children && materialNode.children.length > 0) {
            const uniqueChildren = [];
            const seenChildNames = new Set();
            
            materialNode.children.forEach(child => {
              const childName = (child.name || "").toString().trim().toLowerCase();
              if (!seenChildNames.has(childName)) {
                seenChildNames.add(childName);
                uniqueChildren.push(child);
              }
            });
            
            materialNode.children = uniqueChildren;
          }
          finalTree.push(materialNode);
        }
        
        const materialChildNames = new Set();
        if (materialNode && materialNode.children) {
          materialNode.children.forEach(child => {
            materialChildNames.add((child.name || "").toString().trim().toLowerCase());
          });
        }
        
        otherNodes.forEach(node => {
          const nodeName = (node.name || "").toString().trim().toLowerCase();
          if (!materialChildNames.has(nodeName)) {
            finalTree.push(node);
          }
        });
        
        setTreeData(finalTree);
        
      } catch (err) {
        setError(err?.message ?? String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [baseUrl, refreshTrigger]);

  // Suggestions for search
  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    
    const seen = new Set();
    const results = [];
    
    for (const node of flatTreeNodes) {
      const name = (node.name || "").toString().toLowerCase();
      if (name.includes(q) && !seen.has(name)) {
        seen.add(name);
        results.push(node);
      }
      if (results.length >= 15) break;
    }
    
    return results;
  }, [flatTreeNodes, query]);

  // Filter tree function
  const filterTree = (nodes, searchTerm) => {
    if (!searchTerm) return nodes;
    
    const searchLower = searchTerm.toLowerCase();
    
    const filterNode = (node) => {
      const nodeName = (node.name || "").toString().toLowerCase();
      const matches = nodeName.includes(searchLower);
      
      let filteredChildren = [];
      if (node.children && node.children.length > 0) {
        filteredChildren = node.children
          .map(filterNode)
          .filter(child => child !== null);
      }
      
      if (matches || filteredChildren.length > 0) {
        return {
          ...node,
          children: filteredChildren
        };
      }
      
      return null;
    };
    
    return nodes.map(filterNode).filter(node => node !== null);
  };

  const displayTree = useMemo(() => {
    return filterTree(treeData, appliedQuery);
  }, [treeData, appliedQuery]);

  const applySelection = (text) => {
    const value = (text || "").trim();
    setAppliedQuery(value);
    setOpenSuggest(false);
  };

  const clearFilter = () => {
    setAppliedQuery("");
    setQuery("");
    setOpenSuggest(false);
  };

  const handleNodeSelect = (node) => {
    if (onSelectNode) {
      onSelectNode(node);
    }
  };

  if (loading) return <div className="p-4">Loading tree...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="tree-view-container" style={{ 
      position: "relative",
      height: "calc(100vh - 250px)",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      minWidth: "300px", // Minimum width
      maxWidth: "100%", // Allow to expand
      overflowX: "auto" // Add horizontal scroll if needed
    }}>
      {/* Header with Title and Search */}
      <div className="tree-header" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#f8fafc",
        color: "#0f172a",
        fontWeight: 600,
        borderRadius: "8px 8px 0 0",
        padding: "12px 16px",
        borderBottom: "2px solid #e2e8f0",
        flexShrink: 0
      }}>
        <span style={{ fontSize: "1.1rem" }}>📁 Material List</span>
        <button
          aria-label={showSearch ? "Hide search" : "Show search"}
          onClick={() => {
            setShowSearch((s) => !s);
            setOpenSuggest(false);
          }}
          title="Search"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: "6px",
            border: "1px solid #e2e8f0",
            background: "#ffffff",
            cursor: "pointer",
            transition: "all 0.2s",
            flexShrink: 0
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>

      {/* Search Section */}
      {showSearch && (
        <div className="search-section" style={{
          background: "#ffffff",
          padding: "12px 16px",
          borderBottom: "1px solid #e2e8f0",
          flexShrink: 0
        }}>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Search items by name..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpenSuggest(true);
              }}
              onFocus={(e) => {
                setOpenSuggest(true);
                e.target.style.borderColor = "#3b82f6";
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") applySelection(query);
                if (e.key === "Escape") setOpenSuggest(false);
              }}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "2px solid #e2e8f0",
                borderRadius: "8px",
                outline: "none",
                fontSize: "14px",
                transition: "border-color 0.2s"
              }}
              onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
            />
            {appliedQuery && (
              <button
                onClick={clearFilter}
                style={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  padding: "6px 12px",
                  background: "#f1f5f9",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#475569",
                  flexShrink: 0
                }}
                title="Clear filter"
              >
                Clear ×
              </button>
            )}
            {openSuggest && suggestions.length > 0 && (
              <ul
                style={{
                  position: "absolute",
                  zIndex: 20,
                  left: 0,
                  right: 0,
                  maxHeight: 280,
                  overflowY: "auto",
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  marginTop: "4px",
                  listStyle: "none",
                  padding: "8px 0",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
                onMouseDown={(e) => e.preventDefault()}
              >
                {suggestions.map((s) => (
                  <li
                    key={`${s.id}-${s.name}`}
                    onClick={() => applySelection(s.name)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "10px 16px",
                      cursor: "pointer",
                      borderBottom: "1px solid #f1f5f9",
                      transition: "background 0.2s",
                      whiteSpace: "nowrap"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8fafc"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                  >
                    {getIconForItem(s.name) && (
                      <img src={getIconForItem(s.name)} alt="" style={{ width: 18, height: 18, flexShrink: 0 }} />
                    )}
                    <span style={{ flex: 1, fontSize: "14px", overflow: "hidden", textOverflow: "ellipsis" }}>{s.name}</span>
                    <span style={{ fontSize: "11px", color: "#64748b", background: "#f1f5f9", padding: "2px 8px", borderRadius: "12px", flexShrink: 0 }}>
                      ID: {s.id}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Tree List - Scrollable area */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        overflowX: "auto", // Allow horizontal scroll
        padding: "16px",
        minHeight: 0,
        backgroundColor: "#ffffff"
      }}>
        {displayTree.length > 0 ? (
          <ul style={{ 
            listStyle: "none", 
            paddingLeft: 0, 
            margin: 0,
            minWidth: "fit-content" // Ensure ul expands to fit content
          }}>
            {displayTree.map((node) => (
              <TreeNode
                key={`${node.id}-${node.name}`}
                node={node}
                onSelect={handleNodeSelect}
                getIconForItem={getIconForItem}
                selectedNodeId={selectedNodeId}
              />
            ))}
          </ul>
        ) : (
          <div style={{ 
            textAlign: "center", 
            padding: "40px 20px", 
            color: "#94a3b8",
            fontSize: "14px"
          }}>
            No items found
          </div>
        )}
      </div>
    </div>
  );
};

export default ComponentsTree;