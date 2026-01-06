// components/PaggingSchedule/TreeView.js
import React, { useEffect, useMemo, useState, useRef } from "react";

// Helper functions - MAKE SURE ALL ARE DEFINED BEFORE EXPORT

// 1. flattenTree function
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

// 2. buildTree function
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

// 3. normalizeFlatNodes function
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

// 4. dedupeNodes function
const dedupeNodes = (nodes) => {
  if (!Array.isArray(nodes) || nodes.length === 0) return [];
  
  const seenNames = new Map();
  const result = [];
  
  for (const n of nodes) {
    const normalizedName = (n.name || "").toString().trim().toLowerCase();
    
    if (!seenNames.has(normalizedName)) {
      seenNames.set(normalizedName, true);
      
      const cleanNode = {
        id: n.id,
        name: n.name,
        parentId: n.parentId,
        children: Array.isArray(n.children) ? [...n.children] : []
      };
      
      if (cleanNode.children.length > 0) {
        cleanNode.children = dedupeNodes(cleanNode.children);
      }
      
      result.push(cleanNode);
    }
  }
  
  result.sort((a, b) => {
    const na = (a.name || "").toString().toUpperCase();
    const nb = (b.name || "").toString().toUpperCase();
    return na < nb ? -1 : na > nb ? 1 : 0;
  });
  
  return result;
};

// Hook for filtering
const useCallbackQueryFilter = (query) => {
  return useMemo(() => {
    const q = (query || "").trim().toLowerCase();
    if (!q) {
      return (nodes) => nodes;
    }
    
    const walk = (node) => {
      const name = (node.name || "").toString();
      const matched = name.toLowerCase().includes(q);
      const nextChildren = Array.isArray(node.children)
        ? node.children.map(walk).filter(Boolean)
        : [];
      
      if (matched || nextChildren.length > 0) {
        return { ...node, children: nextChildren };
      }
      return null;
    };
    
    return (nodes) => (Array.isArray(nodes) ? nodes.map(walk).filter(Boolean) : []);
  }, [query]);
};

// TreeNode Component
export const TreeNode = ({ node, level = 0, onSelect, getIconForItem, isHybridBase = false }) => {
  const [expanded, setExpanded] = useState(false);
  const [showIdBadge, setShowIdBadge] = useState(false);
  const badgeTimerRef = useRef(null);
  const dragImgRef = useRef(null);
  const hasChildren = node.children && node.children.length > 0;
  const iconUrl = getIconForItem(node.name);
  const isMaterialRoot = (node.name || "").toString().trim().toLowerCase() === "material";

  useEffect(() => {
    if (isMaterialRoot) setExpanded(true);
  }, [isMaterialRoot]);

  return (
    <li style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {hasChildren && !isMaterialRoot ? (
          <button
            aria-label={expanded ? "collapse" : "expand"}
            onClick={() => setExpanded((s) => !s)}
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              border: "1px solid #64748b",
              background: "#f1f5f9",
              cursor: "pointer",
            }}
          >
            {expanded ? "−" : "+"}
          </button>
        ) : (
          <div style={{ width: 24 }} />
        )}
        <div
          onClick={() => {
            onSelect && onSelect(node);
            setShowIdBadge(true);
            if (badgeTimerRef.current)
              window.clearTimeout(badgeTimerRef.current);
            badgeTimerRef.current = window.setTimeout(
              () => setShowIdBadge(false),
              4000
            );
          }}
          draggable={!!iconUrl}
          onDragStart={(e) => {
            if (!iconUrl) return;
            e.dataTransfer.setData(
              "text/plain",
              JSON.stringify({ name: node.name, id: node.id })
            );
            if (isHybridBase) {
              try {
                const inRowImg = e.currentTarget.querySelector('img');
                const img = inRowImg ? inRowImg.cloneNode(true) : document.createElement('img');
                if (!inRowImg) img.src = iconUrl;
                img.style.filter = 'invert(1) brightness(2)';
                img.style.width = '20px';
                img.style.height = '20px';
                img.style.position = 'absolute';
                img.style.left = '-9999px';
                img.style.top = '-9999px';
                document.body.appendChild(img);
                dragImgRef.current = img;
                e.dataTransfer.setDragImage(img, 10, 10);
              } catch {}
            }
          }}
          onDragEnd={() => {
            try {
              if (dragImgRef.current && dragImgRef.current.parentNode) {
                dragImgRef.current.parentNode.removeChild(dragImgRef.current);
              }
            } catch {}
            dragImgRef.current = null;
          }}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 8px",
            borderRadius: 6,
            background: "#f8fafc",
            transition: "0.2s all",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          {iconUrl && (
            <img src={iconUrl} alt="" style={{ width: 18, height: 18 }} />
          )}
          <span className="tree-label">{node.name}</span>
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
            >
              {String(node.id)}
            </span>
          )}
        </div>
      </div>
      {hasChildren && (isMaterialRoot || expanded) && (
        <ul style={{ paddingLeft: 16, marginTop: 6 }}>
          {node.children.map((child) => (
            <TreeNode
              key={`${child.id}-${child.name}`}
              node={child}
              level={level + 1}
              onSelect={onSelect}
              getIconForItem={getIconForItem}
              isHybridBase={isHybridBase}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

// TreeView Component
export const TreeView = ({ baseUrl, onSelectNode, getIconForItem, isHybridBase = false }) => {
  const [treeData, setTreeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Search state
  const [query, setQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [openSuggest, setOpenSuggest] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

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
        
        const cleanedData = normalizeFlatNodes(arr);
        const rawTree = buildTree(cleanedData);
        
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
  }, [baseUrl]);

  const flatNodes = useMemo(() => {
    return flattenTree(treeData);
  }, [treeData]);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    
    const seen = new Set();
    const results = [];
    
    for (const node of flatNodes) {
      const name = (node.name || "").toString().toLowerCase();
      if (name.includes(q) && !seen.has(name)) {
        seen.add(name);
        results.push(node);
      }
      if (results.length >= 15) break;
    }
    
    return results;
  }, [flatNodes, query]);

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

  if (loading) return <div>Loading tree...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#ffffff",
          border: "none",
          color: "#0f172a",
          fontWeight: 600,
          borderRadius: 6,
          padding: "8px 10px",
          marginBottom: 8,
        }}
      >
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
            width: 28,
            height: 28,
            borderRadius: "50%",
            border: "none",
            background: "#ffffff",
            cursor: "pointer",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>

      {showSearch && (
        <div
          style={{
            background: "#ffffff",
            border: "none",
            borderRadius: 6,
            padding: 8,
            marginBottom: 8,
          }}
        >
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Search items by name..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpenSuggest(true);
              }}
              onFocus={() => setOpenSuggest(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter") applySelection(query);
                if (e.key === "Escape") setOpenSuggest(false);
              }}
              style={{
                width: "100%",
                padding: "8px 10px",
                border: "none",
                borderRadius: 6,
                outline: "none",
              }}
            />
            {appliedQuery && (
              <button
                onClick={clearFilter}
                style={{
                  position: "absolute",
                  right: 6,
                  top: 6,
                  padding: "6px 8px",
                  background: "#f1f5f9",
                  border: "none",
                  borderRadius: 4,
                  cursor: "pointer",
                }}
                title="Clear filter"
              >
                Clear
              </button>
            )}
            {openSuggest && suggestions.length > 0 && (
              <ul
                style={{
                  position: "absolute",
                  zIndex: 20,
                  left: 0,
                  right: 0,
                  maxHeight: 240,
                  overflowY: "auto",
                  background: "#ffffff",
                  border: "none",
                  borderRadius: 6,
                  marginTop: 6,
                  listStyle: "none",
                  padding: 6,
                  boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
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
                      gap: 8,
                      padding: "6px 8px",
                      borderRadius: 6,
                      cursor: "pointer",
                    }}
                  >
                    {getIconForItem?.(s.name) && (
                      <img src={getIconForItem(s.name)} alt="" style={{ width: 16, height: 16 }} />
                    )}
                    <span>{s.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {displayTree.map((node) => (
          <TreeNode
            key={`${node.id}-${node.name}`}
            node={node}
            onSelect={onSelectNode}
            getIconForItem={getIconForItem}
            isHybridBase={isHybridBase}
          />
        ))}
      </ul>
    </div>
  );
};

// EXPORT ALL FUNCTIONS AT THE END - MAKE SURE flattenTree IS INCLUDED
export { 
  buildTree, 
  flattenTree, 
  dedupeNodes, 
  normalizeFlatNodes 
};