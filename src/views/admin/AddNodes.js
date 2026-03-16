// // views/admin/AddNodes.js
// import React, { useState } from "react";
// import Sidebar from "components/Sidebar/Sidebar.js";
// import FooterAdmin from "components/Footers/FooterAdmin.js";
// import HeaderStatsWithoutCards from "components/Headers/HeaderStatsWithoutCards";

// // components
// import ComponentsTree from "components/AddNodes/ComponentsTree";
// import NodeDetails from "components/AddNodes/NodeDetails";

// export default function AdminAddNodes() {
//   const [selectedNode, setSelectedNode] = useState(null);

//   const handleNodeSelect = (node) => {
//     console.log('Selected node:', node);
//     setSelectedNode(node);
//   };

//   const handleAddChild = (childNode) => {
//     // Here you would typically make an API call to save the new node
//     console.log('Adding new child node:', childNode);
    
//     // Show success message
//     alert(`Child node "${childNode.name}" added successfully to "${selectedNode.name}"`);
    
//     // You can refresh the tree data here if needed
//     // This would require passing a refresh function to ComponentsTree
//   };

//   return (
//     <>
//       <Sidebar />
//       <div className="relative md:ml-64 bg-blueGray-100 min-h-screen flex flex-col">
//         <HeaderStatsWithoutCards />
        
//         {/* Main content with proper spacing - matches Active Appointments layout */}
//         <div className="px-4 md:px-10 mx-auto w-full -m-24 flex-grow">
//           {/* Page Title */}
//           <div className="mb-8">
//             <h1 className="text-2xl font-semibold text-blueGray-700">Add New Nodes</h1>
//           </div>
          
//           {/* Two Column Layout */}
//           <div className="flex flex-wrap">
//             {/* Left Column - Components Tree (4/12 width) */}
//             <div className="w-full lg:w-4/12 px-4 mb-6">
//               <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-white">
//                 <div className="px-4 py-4">
//                   <ComponentsTree 
//                     onSelectNode={handleNodeSelect}
//                     selectedNodeId={selectedNode?.id}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Right Column - Node Details (8/12 width) */}
//             <div className="w-full lg:w-8/12 px-4 mb-6">
//               <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-white">
//                 <div className="px-4 py-4">
//                   <NodeDetails 
//                     node={selectedNode}
//                     onAddChild={handleAddChild}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <FooterAdmin />
//       </div>
//     </>
//   );
// }

// views/admin/AddNodes.js
// views/admin/AddNodes.js
import React, { useState } from "react";
import Sidebar from "components/Sidebar/Sidebar.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import HeaderStatsWithoutCards from "components/Headers/HeaderStatsWithoutCards";

// components
import ComponentsTree from "components/AddNodes/ComponentsTree";
import NodeDetails from "components/AddNodes/NodeDetails";

export default function AdminAddNodes() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleNodeSelect = (node) => {
    console.log('Selected node:', node);
    setSelectedNode(node);
  };

  const handleNodeAdded = () => {
    // Increment refresh trigger to reload the tree
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100 min-h-screen flex flex-col">
        <HeaderStatsWithoutCards />
        
        {/* Main content with proper spacing - matches Active Appointments layout */}
        <div className="px-4 md:px-10 mx-auto w-full -m-24 flex-grow">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-blueGray-700">Add New Nodes</h1>
          </div>
          
          {/* Two Column Layout */}
          <div className="flex flex-wrap">
            {/* Left Column - Components Tree (4/12 width) */}
            <div className="w-full lg:w-4/12 px-4 mb-6">
              <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-white">
                <div className="px-4 py-4">
                  <ComponentsTree 
                    onSelectNode={handleNodeSelect}
                    selectedNodeId={selectedNode?.id}
                    refreshTrigger={refreshTrigger}
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Node Details (8/12 width) */}
            <div className="w-full lg:w-8/12 px-4 mb-6">
              <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-white">
                <div className="px-4 py-4">
                  <NodeDetails 
                    node={selectedNode}
                    onNodeAdded={handleNodeAdded}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <FooterAdmin />
      </div>
    </>
  );
}