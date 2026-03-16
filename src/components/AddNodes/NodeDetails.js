// // components/AddNodes/NodeDetails.js
// import React, { useState } from "react";

// const NodeDetails = ({ node, onAddChild }) => {
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [newNodeName, setNewNodeName] = useState("");
//   const [newNodeId, setNewNodeId] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   if (!node) {
//     return (
//       <div className="bg-white rounded-lg shadow-md h-[calc(100vh-250px)] flex flex-col">
//         {/* Header with Node Details heading */}
//         <div className="p-4 border-b-2 border-gray-200 bg-gray-50 rounded-t-lg">
//           <h3 className="m-0 text-lg text-gray-800 flex items-center gap-2">
//             <span>📋 Node Details</span>
//           </h3>
//         </div>
        
//         {/* Empty State Content */}
//         <div className="flex items-center justify-center h-full min-h-[300px] bg-gray-50 rounded-lg text-gray-400 text-sm text-center p-5 m-5 flex-1">
//           Click on any node in the tree to view its details
//         </div>
//       </div>
//     );
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!newNodeName.trim() || !newNodeId.trim()) return;
    
//     setIsSubmitting(true);
    
//     const childNode = {
//       id: newNodeId,
//       name: newNodeName,
//       parentId: node.id,
//       deptId: node.deptId || "4",
//       children: []
//     };
    
//     onAddChild(childNode);
    
//     // Reset form
//     setNewNodeName("");
//     setNewNodeId("");
//     setShowAddForm(false);
//     setIsSubmitting(false);
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md h-[calc(100vh-250px)] flex flex-col">
//       {/* Header with Node Details heading and node ID badge */}
//       <div className="p-4 border-b-2 border-gray-200 bg-gray-50 rounded-t-lg">
//         <h3 className="m-0 text-lg text-gray-800 flex items-center gap-2">
//           <span>📋 Node Details</span>
//           <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
//             {node.id}
//           </span>
//         </h3>
//       </div>

//       {/* Details Content - Scrollable */}
//       <div className="flex-1 overflow-y-auto p-5">
//         {/* Node Information Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//           <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//             <div className="text-xs text-gray-500 mb-1">Node Name</div>
//             <div className="text-base font-semibold text-gray-800">{node.name}</div>
//           </div>

//           <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//             <div className="text-xs text-gray-500 mb-1">Node ID</div>
//             <div className="text-base font-semibold text-gray-800 font-mono">{node.id}</div>
//           </div>

//           <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//             <div className="text-xs text-gray-500 mb-1">Parent ID</div>
//             <div className="text-base font-semibold text-gray-800 font-mono">
//               {node.parentId || <span className="text-gray-400">Root Node</span>}
//             </div>
//           </div>

//           <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//             <div className="text-xs text-gray-500 mb-1">Department ID</div>
//             <div className="text-base font-semibold text-gray-800">{node.deptId || "4"}</div>
//           </div>
//         </div>

//         {/* Add Child Node Section */}
//         <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
//           {!showAddForm ? (
//             <button
//               onClick={() => setShowAddForm(true)}
//               className="w-full py-3 bg-blue-500 text-white border-none rounded-md text-sm font-semibold cursor-pointer flex items-center justify-center gap-2 transition-colors hover:bg-blue-600"
//             >
//               <span>➕</span> Add New Child Node to "{node.name}"
//             </button>
//           ) : (
//             <form onSubmit={handleSubmit}>
//               <h4 className="m-0 mb-4 text-sm text-blue-700">
//                 Add New Child Node
//               </h4>
              
//               <div className="mb-4">
//                 <label className="block text-xs text-gray-600 mb-1 font-medium">
//                   Parent Node
//                 </label>
//                 <div className="bg-white p-3 rounded-md border border-gray-300 text-sm text-gray-800">
//                   {node.name} (ID: {node.id})
//                 </div>
//               </div>

//               <div className="mb-4">
//                 <label className="block text-xs text-gray-600 mb-1 font-medium">
//                   New Node Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={newNodeName}
//                   onChange={(e) => setNewNodeName(e.target.value)}
//                   placeholder="Enter node name"
//                   required
//                   className="w-full p-2.5 border-2 border-gray-300 rounded-md text-sm outline-none transition-colors focus:border-blue-500"
//                 />
//               </div>

//               <div className="mb-5">
//                 <label className="block text-xs text-gray-600 mb-1 font-medium">
//                   New Node ID <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={newNodeId}
//                   onChange={(e) => setNewNodeId(e.target.value)}
//                   placeholder="Enter unique ID"
//                   required
//                   className="w-full p-2.5 border-2 border-gray-300 rounded-md text-sm outline-none transition-colors focus:border-blue-500"
//                 />
//               </div>

//               <div className="flex gap-3">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting || !newNodeName.trim() || !newNodeId.trim()}
//                   className={`flex-1 py-2.5 bg-green-500 text-white border-none rounded-md text-sm font-semibold cursor-pointer transition-colors hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed`}
//                 >
//                   {isSubmitting ? "Adding..." : "Add Node"}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowAddForm(false);
//                     setNewNodeName("");
//                     setNewNodeId("");
//                   }}
//                   className="px-6 py-2.5 bg-red-500 text-white border-none rounded-md text-sm font-semibold cursor-pointer transition-colors hover:bg-red-600"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NodeDetails;

// components/AddNodes/NodeDetails.js
import React, { useState, useEffect } from "react";

const NodeDetails = ({ node, onNodeAdded }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  
  // Form states
  const [newNodeName, setNewNodeName] = useState("");
  const [newNodeId, setNewNodeId] = useState("");
  const [editName, setEditName] = useState("");
  
  // UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Update edit form when selected node changes
  useEffect(() => {
    if (node) {
      setEditName(node.name || "");
    }
  }, [node]);

  if (!node) {
    return (
      <div className="bg-white rounded-lg shadow-md h-[calc(100vh-250px)] flex flex-col">
        {/* Header with Node Details heading */}
        <div className="p-4 border-b-2 border-gray-200 bg-gray-50 rounded-t-lg">
          <h3 className="m-0 text-lg text-gray-800 flex items-center gap-2">
            <span>📋 Node Details</span>
          </h3>
        </div>
        
        {/* Empty State Content */}
        <div className="flex items-center justify-center h-full min-h-[300px] bg-gray-50 rounded-lg text-gray-400 text-sm text-center p-5 m-5 flex-1">
          Click on any node in the tree to view its details
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newNodeName.trim() || !newNodeId.trim()) return;
    
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage("");
    
    try {
      // Make API call to add child node
      const response = await fetch(`${API_BASE_URL}/api/sppeg/add-child`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          parentId: node.id,
          deptId: node.deptId || "4",
          newNodeId: newNodeId,
          newNodeName: newNodeName,
          description: ""
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add node');
      }

      // Success
      setSuccessMessage(`Node "${newNodeName}" added successfully!`);
      
      // Call the callback to notify parent to refresh
      if (onNodeAdded) {
        onNodeAdded();
      }
      
      // Reset form
      setNewNodeName("");
      setNewNodeId("");
      setShowAddForm(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);
    setSuccessMessage("");
    
    try {
      // Make API call to delete node
      const response = await fetch(
        `${API_BASE_URL}/api/sppeg/delete/${node.id}/${node.parentId || '1'}/${node.deptId || '4'}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete node');
      }

      // Success
      setSuccessMessage(`Node "${node.name}" and its children deleted successfully!`);
      
      // Close the delete confirmation
      setShowDeleteConfirm(false);
      
      // Call the callback to notify parent to refresh
      if (onNodeAdded) {
        onNodeAdded();
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdateName = async (e) => {
    e.preventDefault();
    if (!editName.trim()) {
      setError("Node name cannot be empty");
      return;
    }
    
    setIsUpdating(true);
    setError(null);
    setSuccessMessage("");
    
    try {
      // Make API call to update node name
      const response = await fetch(
        `${API_BASE_URL}/api/sppeg/update-name/${node.id}/${node.parentId || '1'}/${node.deptId || '4'}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: editName.trim()
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update node name');
      }

      // Success
      setSuccessMessage(`Node name updated to "${editName}" successfully!`);
      
      // Close the edit form
      setShowEditForm(false);
      
      // Call the callback to notify parent to refresh
      if (onNodeAdded) {
        onNodeAdded();
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md h-[calc(100vh-250px)] flex flex-col">
      {/* Header with Node Details heading and action buttons */}
      <div className="p-4 border-b-2 border-gray-200 bg-gray-50 rounded-t-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-lg text-gray-800 flex items-center gap-2">
            <span>📋 Node Details</span>
            <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
              {node.id}
            </span>
          </h3>
          
          <div className="flex gap-2">
            {/* Edit Button - Show for all nodes */}
            <button
              onClick={() => {
                setEditName(node.name);
                setShowEditForm(true);
              }}
              className="flex items-center gap-2 px-3 py-2 bg-brown-500 text-white rounded-md hover:bg-brown-600 transition-colors text-sm font-medium"
              title="Edit node name"
            >
              Edit
            </button>

            {/* Delete Button - Only show for non-root nodes */}
            {node.parentId && node.parentId !== "1" && node.parentId !== "0" && (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm font-medium"
                title="Delete this node and all its children"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Edit Name Modal */}
      {showEditForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Node Name</h3>
            <form onSubmit={handleUpdateName}>
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-2 font-medium">
                  Node ID
                </label>
                <div className="bg-gray-100 p-3 rounded-md border border-gray-300 text-sm text-gray-800 font-mono">
                  {node.id}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-2 font-medium">
                  Current Name
                </label>
                <div className="bg-gray-100 p-3 rounded-md border border-gray-300 text-sm text-gray-800">
                  {node.name}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-2 font-medium">
                  New Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Enter new node name"
                  required
                  autoFocus
                  className="w-full p-3 border-2 border-gray-300 rounded-md text-sm outline-none transition-colors focus:border-blue-500"
                />
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                  Error: {error}
                </div>
              )}

              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditForm(false);
                    setError(null);
                    setEditName(node.name);
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                  disabled={isUpdating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating || !editName.trim() || editName === node.name}
                  className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors ${
                    isUpdating || !editName.trim() || editName === node.name ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isUpdating ? 'Updating...' : 'Update Name'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <span className="font-semibold">"{node.name}"</span> and all its children? This action cannot be undone.
            </p>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                Error: {error}
              </div>
            )}
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setError(null);
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={`px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors ${
                  isDeleting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-5">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {error && !showDeleteConfirm && !showEditForm && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
            Error: {error}
          </div>
        )}

        {/* Node Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-xs text-gray-500 mb-1">Node Name</div>
            <div className="text-base font-semibold text-gray-800">{node.name}</div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-xs text-gray-500 mb-1">Node ID</div>
            <div className="text-base font-semibold text-gray-800 font-mono">{node.id}</div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-xs text-gray-500 mb-1">Parent ID</div>
            <div className="text-base font-semibold text-gray-800 font-mono">
              {node.parentId || <span className="text-gray-400">Root Node</span>}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-xs text-gray-500 mb-1">Department ID</div>
            <div className="text-base font-semibold text-gray-800">{node.deptId || "4"}</div>
          </div>
        </div>

        {/* Additional Information */}
        {node.description && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
            <div className="text-xs text-gray-500 mb-1">Description</div>
            <div className="text-sm text-gray-800">{node.description}</div>
          </div>
        )}

        {/* Add Child Node Section */}
        <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
          {!showAddForm ? (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full py-3 bg-blue-500 text-white border-none rounded-md text-sm font-semibold cursor-pointer flex items-center justify-center gap-2 transition-colors hover:bg-blue-600"
            >
              <span>➕</span> Add New Child Node to "{node.name}"
            </button>
          ) : (
            <form onSubmit={handleSubmit}>
              <h4 className="m-0 mb-4 text-sm text-blue-700">
                Add New Child Node
              </h4>
              
              <div className="mb-4">
                <label className="block text-xs text-gray-600 mb-1 font-medium">
                  Parent Node
                </label>
                <div className="bg-white p-3 rounded-md border border-gray-300 text-sm text-gray-800">
                  {node.name} (ID: {node.id})
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs text-gray-600 mb-1 font-medium">
                  New Node Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newNodeName}
                  onChange={(e) => setNewNodeName(e.target.value)}
                  placeholder="Enter node name"
                  required
                  className="w-full p-2.5 border-2 border-gray-300 rounded-md text-sm outline-none transition-colors focus:border-blue-500"
                />
              </div>

              <div className="mb-5">
                <label className="block text-xs text-gray-600 mb-1 font-medium">
                  New Node ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newNodeId}
                  onChange={(e) => setNewNodeId(e.target.value)}
                  placeholder="Enter unique ID"
                  required
                  className="w-full p-2.5 border-2 border-gray-300 rounded-md text-sm outline-none transition-colors focus:border-blue-500"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting || !newNodeName.trim() || !newNodeId.trim()}
                  className={`flex-1 py-2.5 bg-green-500 text-white border-none rounded-md text-sm font-semibold cursor-pointer transition-colors hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isSubmitting ? "Adding..." : "Add Node"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setNewNodeName("");
                    setNewNodeId("");
                    setError(null);
                  }}
                  className="px-6 py-2.5 bg-red-500 text-white border-none rounded-md text-sm font-semibold cursor-pointer transition-colors hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default NodeDetails;