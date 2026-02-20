
// // working siderbar without dynamic backend details
// // i commented this because i check with new siderbar

// /*eslint-disable*/
// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import ceb from "../../assets/img/ceb.png";

// import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
// import UserDropdown from "components/Dropdowns/UserDropdown.js";
// import AdminNavbar from "components/Navbars/AdminNavbar";
// import colors from "tailwindcss/colors";



// export default function Sidebar() {
//   const location = useLocation();
//   const [collapseShow, setCollapseShow] = React.useState("hidden");
//   return (
//     <>
//       <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 px-6">
//         <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
//           {/* Toggler */}
//           <button
//             className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
//             type="button"
//             onClick={() => setCollapseShow("bg-white m-2 py-3 px-2")}
//           >
//             <i className="fas fa-bars"></i>
//           </button>
//           {/* Brand */}
//           <Link
//             className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold pt-2 mt-2 px-0"
//             to="/"
//           >
//             <div className="flex justify-center items-center sticky">
//               <img alt="ceb logo" className="w-20 h-20" src={ceb} />
//             </div>
//           </Link>
//           {/* User */}
//           <ul className="md:hidden items-center flex flex-wrap list-none">
//             <li className="inline-block relative">
//               <NotificationDropdown />
//             </li>
//             <li className="inline-block relative">
//               <UserDropdown />
//             </li>
//           </ul>
//           {/* Collapse */}
//           <div
//             className={
//               "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
//               collapseShow
//             }
//           >
//             {/* Collapse header */}
//             <div className="md:min-w-full md:hidden block border-b border-solid border-blueGray-200">
//               <div className="flex flex-wrap">
//                 <div className="w-6/12">
//                   <Link
//                     className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
//                     to="/"
//                   >
//                     <div className="flex justify-center items-center">
//                       <img alt="ceb logo" className="w-20 h-20" src={ceb} />
//                     </div>
//                   </Link>
//                 </div>
//                 <div className="w-6/12 flex justify-end">
//                   <button
//                     type="button"
//                     className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
//                     onClick={() => setCollapseShow("hidden")}
//                   >
//                     <i className="fas fa-times"></i>
//                   </button>
//                 </div>
//               </div>
//             </div>
//             {/* Form */}
//             <form className="mt-2 mb-4 md:hidden">
//               <div className="mb-3 pt-0">
//                 <input
//                   type="text"
//                   placeholder="Search"
//                   className="border-0 px-3 py-2 h-12  border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
//                 />
//               </div>
//             </form>

//             <div className="overflow-y-auto h-full">
//               <ul className="md:flex-col md:min-w-full flex flex-col list-none">
//                 {/* <li className="items-center">
//                   <Link
//                     className={
//                       "text-sm mb-3 block " +
//                       (window.location.href.indexOf(
//                         "/applicant/newapplicant"
//                       ) !== -1
//                         ? ""
//                         : "text-blueGray-700 hover:text-blueGray-500")
//                     }
//                     style={
//                       window.location.href.indexOf(
//                         "/applicant/newapplicant"
//                       ) !== -1
//                         ? { color: "#b23200" }
//                         : {}
//                     }
//                     to="/applicant/newapplicant"
//                   >
//                     <i
//                       className={
//                         "fas fa-tv mr-2 text-sm " +
//                         (window.location.href.indexOf(
//                           "/applicant/newapplicant"
//                         ) !== -1
//                           ? "opacity-75"
//                           : "text-blueGray-300")
//                       }
//                     ></i>{" "}
//                     Applicant Profile
//                   </Link>
//                 </li> */}
//                 {/* <li className="items-center">
//                   <Link
//                     className={
//                       "text-sm py-3 block " +
//                       (window.location.href.indexOf("/application/new") !== -1
//                         ? "text-lightBlue-500 hover:text-lightBlue-600"
//                         : "text-blueGray-700 hover:text-blueGray-500")
//                     }
//                     style={
//                       window.location.href.indexOf("/application/new") !== -1
//                         ? { color: "#b23200" }
//                         : {}
//                     }
//                     to="/application/new"
//                   >
//                     <i
//                       className={
//                         "fas fa-tv mr-2 text-sm " +
//                         (window.location.href.indexOf("/application/new") !== -1
//                           ? "opacity-75"
//                           : "text-blueGray-300")
//                       }
//                     ></i>{" "}
//                     Application Submission
//                   </Link>
//                 </li> */}
//                 {/* <li className="items-center">
//                   <Link
//                     className={
//                       "text-sm py-3 block " +
//                       (window.location.href.indexOf("/piv/newPiv") !== -1
//                         ? "text-lightBlue-500 hover:text-lightBlue-600"
//                         : "text-blueGray-700 hover:text-blueGray-500")
//                     }
//                     style={
//                       window.location.href.indexOf("/piv/newPiv") !== -1
//                         ? { color: "#b23200" }
//                         : {}
//                     }
//                     to="/piv/newPiv"
//                   >
//                     <i
//                       className={
//                         "fas fa-tv mr-2 text-sm " +
//                         (window.location.href.indexOf("/piv/newPiv") !== -1
//                           ? "opacity-75"
//                           : "text-blueGray-300")
//                       }
//                     ></i>{" "}
//                     Generate PIV
//                   </Link>
//                 </li> */}
//                 {/* <li className="items-center">
//                   <Link
//                     className={
//                       "text-sm py-3 block " +
//                       (window.location.href.indexOf("/estimation/estimate") !==
//                       -1
//                         ? "text-lightBlue-500 hover:text-lightBlue-600"
//                         : "text-blueGray-700 hover:text-blueGray-500")
//                     }
//                     style={
//                       window.location.href.indexOf("/estimation/estimate") !==
//                       -1
//                         ? { color: "#b23200" }
//                         : {}
//                     }
//                     to="/estimation/estimate"
//                   >
//                     <i
//                       className={
//                         "fas fa-tv mr-2 text-sm " +
//                         (window.location.href.indexOf(
//                           "/estimation/estimate"
//                         ) !== -1
//                           ? "opacity-75"
//                           : "text-blueGray-300")
//                       }
//                     ></i>{" "}
//                     Standard Cost Estimate
//                   </Link>
//                 </li> */}
//                 {/* <li className="items-center">
//                   <Link
//                     className={
//                       "text-sm py-3 block " +
//                       (window.location.href.indexOf(
//                         "/estimation/standard-rates"
//                       ) !== -1
//                         ? "text-lightBlue-500 hover:text-lightBlue-600"
//                         : "text-blueGray-700 hover:text-blueGray-500")
//                     }
//                     style={
//                       window.location.href.indexOf(
//                         "/estimation/standard-rates"
//                       ) !== -1
//                         ? { color: "#b23200" }
//                         : {}
//                     }
//                     to="/estimation/standard-rates"
//                   >
//                     <i
//                       className={
//                         "fas fa-tv mr-2 text-sm " +
//                         (window.location.href.indexOf(
//                           "/estimation/standard-rates"
//                         ) !== -1
//                           ? "opacity-75"
//                           : "text-blueGray-300")
//                       }
//                     ></i>{" "}
//                     Approved Rate Schedule
//                   </Link>
//                 </li> */}
//                 {/* <li className="items-center">
//                   <Link
//                     className={
//                       "text-sm py-3 block " +
//                       (window.location.href.indexOf(
//                         "/estimate/estimateform"
//                       ) !== -1
//                         ? "text-lightBlue-500 hover:text-lightBlue-600"
//                         : "text-blueGray-700 hover:text-blueGray-500")
//                     }
//                     style={
//                       window.location.href.indexOf("/estimate/estimateform") !==
//                       -1
//                         ? { color: "#b23200" }
//                         : {}
//                     }
//                     to="/estimate/estimateform"
//                   >
//                     <i
//                       className={
//                         "fas fa-tv mr-2 text-sm " +
//                         (window.location.href.indexOf(
//                           "/estimate/estimateform"
//                         ) !== -1
//                           ? "opacity-75"
//                           : "text-blueGray-300")
//                       }
//                     ></i>{" "}
//                     Detailed Work Estimate
//                   </Link>
//                 </li> */}
//                 {/* <li className="items-center">
//                   <Link
//                     className={
//                       "text-sm py-3 block " +
//                       (window.location.href.indexOf("/jobrevision/new") !== -1
//                         ? "text-lightBlue-500 hover:text-lightBlue-600"
//                         : "text-blueGray-700 hover:text-blueGray-500")
//                     }
//                     style={
//                       window.location.href.indexOf("/jobrevision/new") !== -1
//                         ? { color: "#b23200" }
//                         : {}
//                     }
//                     to="/jobrevision/new"
//                   >
//                     <i
//                       className={
//                         "fas fa-tv mr-2 text-sm " +
//                         (window.location.href.indexOf("/jobrevision/new") !== -1
//                           ? "opacity-75"
//                           : "text-blueGray-300")
//                       }
//                     ></i>{" "}
//                     Job Revision
//                   </Link>
//                 </li> */}
//                 {/* <li className="items-center">
//                   <Link
//                     className={
//                       "text-sm py-3 block " +
//                       (window.location.href.indexOf("/jobcontractor/new") !== -1
//                         ? "text-lightBlue-500 hover:text-lightBlue-600"
//                         : "text-blueGray-700 hover:text-blueGray-500")
//                     }
//                     style={
//                       window.location.href.indexOf("/jobcontractor/new") !== -1
//                         ? { color: "#b23200" }
//                         : {}
//                     }
//                     to="/jobcontractor/new"
//                   >
//                     <i
//                       className={
//                         "fas fa-tv mr-2 text-sm " +
//                         (window.location.href.indexOf("/jobcontractor/new") !==
//                         -1
//                           ? "opacity-75"
//                           : "text-blueGray-300")
//                       }
//                     ></i>{" "}
//                     Contractor Assignment
//                   </Link>
//                 </li> */}
//                 {/* <li className="items-center"> */}
//                   {/* <Link
//                   className={
//                     "text-sm py-3 block " +
//                     (window.location.href.indexOf(
//                       "/modifyProgress/addProMile"
//                     ) !== -1
//                       ? "text-lightBlue-500 hover:text-lightBlue-600"
//                       : "text-blueGray-700 hover:text-blueGray-500")
//                   }
//                   style={
//                     window.location.href.indexOf("/modifyProgress/addProMile") !== -1
//                       ? { color: "#b23200" }
//                       : {  }
//                   }
//                   to="/modifyProgress/addProMile"
//                 >
//                   <i
//                     className={
//                       "fas fa-tv mr-2 text-sm " +
//                       (window.location.href.indexOf(
//                         "/modifyProgress/addProMile"
//                       ) !== -1
//                         ? "opacity-75"
//                         : "text-blueGray-300")
//                     }
//                   ></i>{" "}
//                   Progress Dashboard
//                 </Link> */}

//                   {/* <div className="relative">
//                     <button
//                       className="text-sm py-3 block w-full text-left focus:outline-none"
//                       onClick={() =>
//                         setCollapseShow(
//                           collapseShow === "progress" ? "" : "progress"
//                         )
//                       }
//                       style={
//                         window.location.href.indexOf(
//                           "/modifyProgress/addProMile"
//                         ) !== -1
//                           ? { color: "#b23200" }
//                           : {}
//                       }
//                     >
//                       <i
//                         className={
//                           "fas fa-tv mr-2 text-sm " +
//                           (window.location.href.indexOf(
//                             "/modifyProgress/addProMile"
//                           ) !== -1
//                             ? "opacity-75"
//                             : "text-blueGray-300")
//                         }
//                       ></i>{" "}
//                       Progress Dashboard
//                     </button>
//                     {collapseShow === "progress" && (
//                       <ul className="ml-4 px-4">
//                         <li>
//                           <Link
//                             className="text-sm py-2 block text-blueGray-700 hover:text-blueGray-500"
//                             to=""
//                           >
//                             <i
//                               className={
//                                 "fas fa-envelope mr-2 text-sm " +
//                                 (window.location.href.indexOf("/letters/") !==
//                                 -1
//                                   ? "opacity-75"
//                                   : "text-blueGray-300")
//                               }
//                             ></i>{" "}
//                             Progress Overview
//                           </Link>
//                         </li>
//                         <li>
//                           <Link
//                             className="text-sm py-2 block text-blueGray-700 hover:text-blueGray-500"
//                             to="/modifyProgress/addProMile"
//                           >
//                             <i
//                               className={
//                                 "fas fa-envelope mr-2 text-sm " +
//                                 (window.location.href.indexOf("/letters/") !==
//                                 -1
//                                   ? "opacity-75"
//                                   : "text-blueGray-300")
//                               }
//                             ></i>{" "}
//                             Add Progress Milestone
//                           </Link>
//                         </li>
//                         <li>
//                           <Link
//                             className="text-sm py-2 block text-blueGray-700 hover:text-blueGray-500"
//                             to="/modifyProgress/progressBar"
//                           >
//                             <i
//                               className={
//                                 "fas fa-envelope mr-2 text-sm " +
//                                 (window.location.href.indexOf("/letters/") !==
//                                 -1
//                                   ? "opacity-75"
//                                   : "text-blueGray-300")
//                               }
//                             ></i>{" "}
//                             Progress Bar
//                           </Link>
//                         </li>
//                       </ul>
//                     )}
//                   </div> */}
//                 {/* </li> */}
//                 {/* <li className="items-center">
//                   <Link
//                     className={
//                       "text-sm py-3 block " +
//                       (window.location.href.indexOf(
//                         "/allocation/allocationOCJ1"
//                       ) !== -1
//                         ? "text-lightBlue-500 hover:text-lightBlue-600"
//                         : "text-blueGray-700 hover:text-blueGray-500")
//                     }
//                     style={
//                       window.location.href.indexOf(
//                         "/allocation/allocationOCJ1"
//                       ) !== -1
//                         ? { color: "#b23200" }
//                         : {}
//                     }
//                     to="/allocation/allocationOCJ1"
//                   >
//                     <i
//                       className={
//                         "fas fa-tv mr-2 text-sm " +
//                         (window.location.href.indexOf(
//                           "/allocation/allocationOCJ1"
//                         ) !== -1
//                           ? "opacity-75"
//                           : "text-blueGray-300")
//                       }
//                     ></i>{" "}
//                     Official Correspondence
//                   </Link>
//                 </li> */}
//                 {/* <li className="items-center">
//                   <Link
//                     className={
//                       "text-sm py-3 block " +
//                       (window.location.href.indexOf("/reviseallocation") !== -1
//                         ? "text-lightBlue-500 hover:text-lightBlue-600"
//                         : "text-blueGray-700 hover:text-blueGray-500")
//                     }
//                     style={
//                       window.location.href.indexOf("/reviseallocation") !== -1
//                         ? { color: "#b23200" }
//                         : {}
//                     }
//                     to="/reviseallocation"
//                   >
//                     <i
//                       className={
//                         "fas fa-tv mr-2 text-sm " +
//                         (window.location.href.indexOf("/reviseallocation") !==
//                         -1
//                           ? "opacity-75"
//                           : "text-blueGray-300")
//                       }
//                     ></i>{" "}
//                     Revise Allocation
//                   </Link> */}

//                   {/* // Remove this entire section from lines 486-512 */}
//                   {/* <Link
//                     className={
//                       "text-sm py-3 block " +
//                       (window.location.href.indexOf("/schedule2") !== -1
//                         ? "text-lightBlue-500 hover:text-lightBlue-600"
//                         : "text-blueGray-700 hover:text-blueGray-500")
//                     }
//                     style={
//                       window.location.href.indexOf("/schedule2") !== -1
//                         ? { color: "#b23200" }
//                         : {}
//                     }
//                     to="/schedule2"
//                   > */}
//                     {/* <i
//               className={
//                 "fas fa-calendar mr-2 text-sm " +
//                 (window.location.href.indexOf("/schedule2") !== -1
//                   ? "opacity-75"
//                   : "text-blueGray-300")
//               }
//             ></i>{" "}
//             Schedule 2 */}
//                   {/* </Link>
//                 </li> */}


                
//                 <li className="items-center">
//                   <Link
//                     className={
//                       "text-sm py-3 inline-flex " +
//                       (location.pathname === "/admin/commission"
//                         ? "text-lightBlue-500 hover:text-lightBlue-600"
//                         : "text-blueGray-700 hover:text-blueGray-500")
//                     }
//                     style={
//                       location.pathname === "/admin/commission"
//                         ? { color: "#b23200" }
//                         : {}
//                     }
//                     to="/admin/commission"
//                   >
//                     <i
//                       className={
//                         "fas fa-percentage mr-2 text-sm " +
//                         (location.pathname === "/admin/commission"
//                           ? "opacity-75"
//                           : "text-blueGray-300")
//                       }
//                     ></i>{" "}
//                      New Commission Management
//                      {/* <span className="whitespace-nowrap">New Commission Management</span> */}

//                   </Link>
//                 </li>

//                 {/* this is for same as above but editing purpose        */}
//                 <li className="items-center">
//                   <Link
//                     className={
//                       "text-sm py-3 inline-flex " +
//                       (location.pathname === "/admin/commission/edit"
//                         ? "text-lightBlue-500 hover:text-lightBlue-600"
//                         : "text-blueGray-700 hover:text-blueGray-500")
//                     }
//                     style={
//                       location.pathname === "/admin/commission/edit"
//                         ? { color: "#b23200" }
//                         : {}
//                     }
//                     to="/admin/commission/edit"
//                   >
//                     <i
//                       className={
//                         "fas fa-percentage mr-2 text-sm " +
//                         (location.pathname === "/admin/commission/edit"
//                           ? "opacity-75"
//                           : "text-blueGray-300")
//                       }
//                     ></i>{" "}
//                      Edit Commission Management
//                      {/* <span className="whitespace-nowrap">New Commission Management</span> */}

//                   </Link>
//                 </li>


//               </ul>
//             </div>
//             {/* <hr className="my-2 md:min-w-full" /> */}
//           </div>
//           <div className="mt-64 sticky">
//             <AdminNavbar />
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// }








// // this is testing new side barissue is not show status correctly 
// like ADD
// // cheking to get dynamic backend deta

// /*eslint-disable*/
// import React, { useState } from "react";
// import { Link, useLocation,useHistory  } from "react-router-dom";
// import { FaChevronDown, FaChevronUp } from "react-icons/fa";
// import ceb from "../../assets/img/ceb.png";

// import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
// import UserDropdown from "components/Dropdowns/UserDropdown.js";
// import AdminNavbar from "components/Navbars/AdminNavbar";
// import colors from "tailwindcss/colors";

// // NEW: Import the actual UserContext hook
// import { useUser } from "context/UserContext";

// export default function Sidebar() {
//   const location = useLocation();
//   //new 
//   const history = useHistory()
//   const [collapseShow, setCollapseShow] = React.useState("hidden");


//   // NEW: Use the actual UserContext hook to get menu data from backend APIs
//   const { mainMenus, menusLoading, menuTasks, fetchTasksForMenu, logout } = useUser();

//   console.log("this is mainMenus: ",mainMenus);
  
//   // NEW: State for expanded menus
//   const [expandedMenu, setExpandedMenu] = useState(null);

//   // NEW: Function to get task path (from friend's code with adjustments)
//   const getTaskPath = (menu, task) => {
//     const menuName = (menu.displayName || '').toLowerCase();
//     const taskName = (task.activityName || '').toLowerCase();

//     // If user clicks "Add" under "New Estimate Service", go to Service Estimate Details page
//     if (menuName.includes('new estimate service') && taskName === 'add') {
//       return '/admin/service-estimation/details';
//     }

//     // Custom routing for commission management
//     if (menuName.includes('commission')) {
//       if (taskName.includes('new') || taskName.includes('add')) {
//         return '/admin/commission';
//       } else if (taskName.includes('edit') || taskName.includes('modify')) {
//         return '/admin/commission/edit';
//       }
//     }

//     // Default behavior: keep current pattern
//     return `/admin/${menu.menuCode}/${task.activityCode}`;
//   };

//   // NEW: Get userId from localStorage/sessionStorage
//   const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user") || "{}");
//   const userId = user.userId;

//   // NEW: Handle menu click to expand/collapse and fetch tasks
//   const handleMenuClick = (menuCode) => {
//     if (expandedMenu === menuCode) {
//       setExpandedMenu(null);
//     } else {
//       setExpandedMenu(menuCode);
//       // Fetch tasks for this menu if not already loaded
//       if (!menuTasks[menuCode]) {
//         fetchTasksForMenu(userId, menuCode);
//       }
//     }
//   };


//   return (
//     <>
//       <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 px-6">
//         <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
//           {/* Toggler */}
//           <button
//             className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
//             type="button"
//             onClick={() => setCollapseShow("bg-white m-2 py-3 px-2")}
//           >
//             <i className="fas fa-bars"></i>
//           </button>
//           {/* Brand */}
//           <Link
//             className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold pt-2 mt-2 px-0"
//             to="/"
//           >
//             <div className="flex justify-center items-center sticky">
//               <img alt="ceb logo" className="w-20 h-20" src={ceb} />
//             </div>
//           </Link>
//           {/* User */}
//           <ul className="md:hidden items-center flex flex-wrap list-none">
//             <li className="inline-block relative">
//               <NotificationDropdown />
//             </li>
//             <li className="inline-block relative">
//               <UserDropdown />
//             </li>
//           </ul>
//           {/* Collapse */}
//           <div
//             className={
//               "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
//               collapseShow
//             }
//           >
//             {/* Collapse header */}
//             <div className="md:min-w-full md:hidden block border-b border-solid border-blueGray-200">
//               <div className="flex flex-wrap">
//                 <div className="w-6/12">
//                   <Link
//                     className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
//                     to="/"
//                   >
//                     <div className="flex justify-center items-center">
//                       <img alt="ceb logo" className="w-20 h-20" src={ceb} />
//                     </div>
//                   </Link>
//                 </div>
//                 <div className="w-6/12 flex justify-end">
//                   <button
//                     type="button"
//                     className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
//                     onClick={() => setCollapseShow("hidden")}
//                   >
//                     <i className="fas fa-times"></i>
//                   </button>
//                 </div>
//               </div>
//             </div>
//             {/* Form */}
//             <form className="mt-2 mb-4 md:hidden">
//               <div className="mb-3 pt-0">
//                 <input
//                   type="text"
//                   placeholder="Search"
//                   className="border-0 px-3 py-2 h-12  border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
//                 />
//               </div>
//             </form>



//             {/* this is newly added  */}
//             <div className="overflow-y-auto h-full">
//               <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                
//                 {/* NEW: DYNAMIC MENU SECTION - Replaces static commission management items */}
//                 {/* This section now uses actual API data from UserContext */}
//                 {menusLoading ? (
//                   <li className="items-center">
//                     <div className="text-sm py-3 inline-flex text-blueGray-700">
//                       <i className="fas fa-spinner fa-spin mr-2 text-sm text-blueGray-300"></i>
//                       Loading menus...
//                     </div>
//                   </li>
//                 ) : mainMenus && mainMenus.length > 0 ? (
//                   mainMenus.map((menu) => (
//                     <li key={menu.menuCode} className="items-center">
//                       {/* Main menu item with dropdown toggle */}
//                       <div
//                         className={
//                           "text-sm py-3 inline-flex items-center justify-between w-full cursor-pointer " +
//                           (expandedMenu === menu.menuCode
//                             ? "text-lightBlue-500 hover:text-lightBlue-600"
//                             : "text-blueGray-700 hover:text-blueGray-500")
//                         }
//                         onClick={() => handleMenuClick(menu.menuCode)}
//                       >
//                         <div className="flex items-center">
//                           {/* NEW: Dynamic icons based on menu type - you can customize this */}
//                           <i
//                             className={
//                               `fas ${
//                                 menu.menuCode.includes('commission') ? 'fa-percentage' :
//                                 menu.menuCode.includes('estimate') ? 'fa-calculator' :
//                                 menu.menuCode.includes('application') ? 'fa-file' :
//                                 menu.menuCode.includes('progress') ? 'fa-chart-line' :
//                                 'fa-folder'
//                               } mr-2 text-sm ` +
//                               (expandedMenu === menu.menuCode
//                                 ? "opacity-75"
//                                 : "text-blueGray-300")
//                             }
//                           ></i>
//                           {menu.displayName}
//                         </div>
//                         {expandedMenu === menu.menuCode ? (
//                           <FaChevronUp className="text-xs" />
//                         ) : (
//                           <FaChevronDown className="text-xs" />
//                         )}
//                       </div>
                      
//                       {/* Submenu items - dynamically loaded from API */}
//                       {expandedMenu === menu.menuCode && (
//                         <ul className="ml-6 border-l border-blueGray-200">
//                           {menuTasks[menu.menuCode] && 
//                            menuTasks[menu.menuCode].length > 0 ? (
//                             menuTasks[menu.menuCode].map((task) => (
//                               <li key={task.activityCode} className="items-center">
//                                 <Link
//                                   className={
//                                     "text-sm py-2 block pl-3 " +
//                                     (location.pathname === getTaskPath(menu, task)
//                                       ? "text-lightBlue-500 hover:text-lightBlue-600"
//                                       : "text-blueGray-700 hover:text-blueGray-500")
//                                   }
//                                   style={
//                                     location.pathname === getTaskPath(menu, task)
//                                       ? { color: "#b23200" }
//                                       : {}
//                                   }
//                                   to={getTaskPath(menu, task)}
//                                   onClick={() => setCollapseShow("hidden")} // Close mobile menu on link click
//                                 >
//                                   <i
//                                     className={
//                                       "fas fa-circle mr-2 text-xs " +
//                                       (location.pathname === getTaskPath(menu, task)
//                                         ? "opacity-75"
//                                         : "text-blueGray-300")
//                                     }
//                                   ></i>
//                                   {task.activityName}
//                                 </Link>
//                               </li>
//                             ))
//                           ) : (
//                             <li className="text-sm py-2 pl-3 text-blueGray-500">
//                               <i className="fas fa-spinner fa-spin mr-2 text-xs"></i>
//                               Loading tasks...
//                             </li>
//                           )}
//                         </ul>
//                       )}
//                     </li>
//                   ))
//                 ) : (
//                   <li className="items-center">
//                     <div className="text-sm py-3 inline-flex text-blueGray-700">
//                       <i className="fas fa-exclamation-circle mr-2 text-sm text-blueGray-300"></i>
//                       No menus available
//                     </div>
//                   </li>
//                 )}

//                 {/* REMOVED: Static commission management items - Now handled dynamically above */}
//                 {/* The following static items have been replaced by dynamic data from backend: */}
//                 {/* 
//                 <li className="items-center">
//                   <Link to="/admin/commission">New Commission Management</Link>
//                 </li>
//                 <li className="items-center">
//                   <Link to="/admin/commission/edit">Edit Commission Management</Link>
//                 </li>
//                 */}

//               </ul>
//             </div>
//           </div>
        
      
//           <div className="mt-64 sticky">
//             <AdminNavbar />
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// }



//this 2 code  new Sidebar.js 
// to check navigation correcly
/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
import UserDropdown from "components/Dropdowns/UserDropdown.js";
import AdminNavbar from "components/Navbars/AdminNavbar";

import { useUser } from "context/UserContext";
import { toast } from "react-toastify";

export default function Sidebar() {
  const location = useLocation();
  const history = useHistory();
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  
  const { mainMenus, menusLoading, menuTasks, fetchTasksForMenu, logout } = useUser();
  
  const [expandedMenu, setExpandedMenu] = useState(null);

  //new useEffect to solove the fetch menu problem
    useEffect(() => {
      // Refresh all menu tasks when component mounts
      const refreshAllTasks = async () => {
        const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user") || "{}");
        if (user.userId && mainMenus.length > 0) {
          // Force refetch for any menu that has tasks
          mainMenus.forEach(menu => {
            if (menuTasks[menu.menuCode]) {
              fetchTasksForMenu(user.userId, menu.menuCode);
            }
          });
        }
      };
      
      // Run after a short delay to ensure component is mounted
      const timer = setTimeout(refreshAllTasks, 100);
      return () => clearTimeout(timer);
    }, [mainMenus.length]); // Only run when mainMenus changes

  // NEW: Auto-expand menu based on current route
  useEffect(() => {
    if (mainMenus && mainMenus.length > 0) {
      // Find which menu contains the current path
      for (const menu of mainMenus) {
        const tasks = menuTasks[menu.menuCode] || [];
        for (const task of tasks) {
          const taskPath = getTaskPath(menu, task);
          if (location.pathname === taskPath || 
              location.pathname.startsWith(taskPath + '/')) {
            setExpandedMenu(menu.menuCode);
            return;
          }
        }
      }
    }
  }, [location.pathname, mainMenus, menuTasks]);


  // //this is commented because we have updated getTaskPath according to 
  // //headerstat routes
  // const getTaskPath = (menu, task) => {
  //   const menuName = (menu.displayName || '').toLowerCase();
  //   const taskName = (task.activityName || '').toLowerCase();

  //   console.log("this is menu display name: ",menuName);
  //   console.log("this is task name: ",taskName);
    

  //   if (menuName.includes('new estimate service') && taskName === 'add') {
  //     return '/admin/service-estimation/details';
  //   }



  //   // Custom routing for commission management
  //   if (menuName.includes('commission')) {
  //     if (taskName.includes('new') || taskName.includes('add')) {
  //       return '/admin/commission';
  //     } else if (taskName.includes('edit') || taskName.includes('modify')) {
  //       return '/admin/commission/edit';
  //     }
  //   }

  //   console.log("this is menu code & activity code: ",menu.menuCode +" "+ task.activityCode);

  //   return `/admin/${menu.menuCode}/${task.activityCode}`;
  // };

    //this is new getTaskPath function (with optimise routes)

    const getTaskPath = (menu, task) => {

      //new two lines added for testing
      const rawMenuName = (menu.displayName || '').toLowerCase();
      const taskName = (task.activityName || '').toLowerCase();

       // Normalize: replace any whitespace (including non-breaking spaces) with a single space
        const normalizeString = (str) => str.replace(/[\s\u00A0]+/g, ' ').trim();
        const menuName = normalizeString(rawMenuName);

        console.log("this is menu display name (normalized): ", menuName);
        console.log("this is task name: ", taskName);

      //   //below lines are previous working things

      // const menuName = (menu.displayName || '').toLowerCase();
      // const taskName = (task.activityName || '').toLowerCase();
    
      // console.log("this is menu display name: ", menuName);
      // console.log("this is task name: ", taskName);
      
      // Service Estimation Route - EXISTING
      if (menuName.includes('new estimate service') && taskName === 'add') {
        return '/admin/service-estimation/details';
      }

      // for pegging schedule
      // if (menuName.includes('active appointments') ) {
      //   return '/admin/peggingShedule';
      // }
      if (menuName.includes('active appointments') ) {
        return '/admin/activeappointments';
      }
    
      // NEW: Updated Commission Management Routes with structured mapping
      if (menuName.includes('new connection management')) {
        // Define path mappings for commission tasks
        const commissionPathMappings = {
          add: "/admin/commission",
          create: "/admin/commission",
          edit: "/admin/commission/edit",
          forward: "/admin/commission/forward",
          validate:"/admin/commission/validate",
          verify:"/admin/commission/verify",
        };
    
        // Find matching path based on task name
        for (const [key, path] of Object.entries(commissionPathMappings)) {
          if (taskName.includes(key)) {
            return path;
          }
        }
        
        // Default commission path if no match found
        return "/admin/commission/default";
      }


       // NEW: Simplified array-based mapping for all other paths
        const menuMappings = [
          { name: 'applicant profile', path: '/applicant/newapplicant' },
          { name: 'application submission', path: '/application/new' },
          { name: 'approved rate schedule', path: '/estimation/standard-rates' },
          { name: 'contractor assignment', path: '/jobcontractor/new' },
          { name: 'detailed work estimate', path: '/estimate/estimateform' },
          { name: 'generate piv', path: '/piv/newPiv' },
          { name: 'job revision', path: '/jobrevision/new' },
          { name: 'official correspondence', path: '/allocation/allocationOCJ1' },
          { name: 'progress dashboard', path: '/modifyProgress/addProMile' },
          { name: 'change allocation', path: '/reviseallocation' },
          { name: 'standard cost estimate', path: '/estimation/estimate' }
        ];

        const matchedMenu = menuMappings.find(m => menuName.includes(m.name));
        if (matchedMenu) {
          return matchedMenu.path;
        }

       
    
      
      // Default route for other menus - EXISTING
      console.log("this is menu code & activity code: ", menu.menuCode + " " + task.activityCode);
      return `/admin/${menu.menuCode}/${task.activityCode}`;
    };



  const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user") || "{}");
  const userId = user.userId;

  const handleMenuClick = (menuCode) => {
    if (expandedMenu === menuCode) {
      setExpandedMenu(null);
    } else {
      setExpandedMenu(menuCode);
      if (!menuTasks[menuCode]) {
        fetchTasksForMenu(userId, menuCode);
      }
    }
  };


  // NEW: Handle main menu item click to navigate to dashboard
  const handleMainMenuClick = (menuCode, e) => {
    // Check if the click is on the chevron icon or the main menu text
    const isChevronClick = e.target.closest('svg') || e.target.classList.contains('text-xs');
    
    if (!isChevronClick) {
      // Navigate to dashboard when clicking the main menu text/icon area
      history.push('/admin/dashboard');
    }
    
    // Always toggle the expand/collapse when clicking the main menu area
    if (expandedMenu === menuCode) {
      setExpandedMenu(null);
    } else {
      setExpandedMenu(menuCode);
      if (!menuTasks[menuCode]) {
        fetchTasksForMenu(userId, menuCode);
      }
    }
  };

  // NEW: Handle logo click for logout
  const handleLogoClick = (e) => {
    e.preventDefault(); // Prevent default link behavior
    // Show confirmation dialog
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      history.push("/auth"); // Redirect to login page
    }
  };


  // NEW: Check if a task is active
  const isTaskActive = (menu, task) => {
    const taskPath = getTaskPath(menu, task);

    console.log("this is dynnamic taskpath: ",taskPath);
    console.log("this is system location: ",location.pathname);

    // return location.pathname === taskPath || location.pathname.startsWith(taskPath + '/');
    return location.pathname===taskPath;
  };

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler - EXISTING CODE */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-2")}
          >
            <i className="fas fa-bars"></i>
          </button>
          
          {/* Brand - EXISTING CODE */}
          {/* this is commented because i now use handleLogoClick with onclick */}

          {/* <Link
            className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold pt-2 mt-2 px-0"
            to="/"
          >
            <div className="flex justify-center items-center sticky">
              <img alt="ceb logo" className="w-20 h-20" src={ceb} />
            </div>
          </Link> */}

          {/* Brand - UPDATED: Added onClick handler for logout */}
          <div
            className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold pt-2 mt-2 px-0 cursor-pointer"
            onClick={handleLogoClick}
          >
            <div className="flex justify-center items-center sticky">
              <img alt="ceb logo" className="w-20 h-20" src="/ceb.png" />
            </div>
          </div>


          
          {/* User - EXISTING CODE */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <NotificationDropdown />
            </li>
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          
          {/* Collapse - EXISTING CODE */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header - EXISTING CODE */}
            <div className="md:min-w-full md:hidden block border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    to="/"
                  >
                    <div className="flex justify-center items-center">
                      <img alt="ceb logo" className="w-20 h-20" src="/ceb.png" />
                    </div>
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Form - EXISTING CODE */}
            <form className="mt-2 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-0 px-3 py-2 h-12  border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>

            <div className="overflow-y-auto h-full">
              <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                
                {/* DYNAMIC MENU SECTION */}
                {menusLoading ? (
                  <li className="items-center">
                    <div className="text-sm py-3 inline-flex text-blueGray-700">
                      <i className="fas fa-spinner fa-spin mr-2 text-sm text-blueGray-300"></i>
                      Loading menus...
                    </div>
                  </li>
                ) : mainMenus && mainMenus.length > 0 ? (
                  mainMenus.map((menu) => (
                    <li key={menu.menuCode} className="items-center">
                      {/* Main menu item with dropdown toggle */}
                      <div
                        className={
                          "text-sm py-3 inline-flex items-center justify-between w-full cursor-pointer " +
                          (expandedMenu === menu.menuCode
                            ? "text-lightBlue-500 hover:text-lightBlue-600"
                            : "text-blueGray-700 hover:text-blueGray-500")
                        }
                        // onClick={() => handleMenuClick(menu.menuCode)}

                        //modified fn to navigate to /admin/dashboard
                        // as well as handleMenuClick
                        onClick={(e)=>handleMainMenuClick(menu.menuCode,e)}
                      >
                        <div className="flex items-center">
                          <i
                            className={
                              //THIS IS THE PLACE WE define icon related to menucode
                              //default is folder icon
                        
                              `fas ${
                                menu.menuCode.includes('commission') ? 'fa-percentage' :
                                menu.menuCode.includes('estimate') ? 'fa-calculator' :
                                menu.menuCode.includes('application') ? 'fa-file' :
                                menu.menuCode.includes('progress') ? 'fa-chart-line' :
                                'fa-folder'
                              } mr-2 text-sm ` +
                              (expandedMenu === menu.menuCode
                                ? "opacity-75"
                                : "text-blueGray-300")
                            }
                          ></i>
                         
                          {menu.displayName}
                        </div>
                        {expandedMenu === menu.menuCode ? (
                          <FaChevronUp className="text-xs" />
                        ) : (
                          <FaChevronDown className="text-xs" />
                        )}
                      </div>
                      
                      {/* Submenu items */}
                      {expandedMenu === menu.menuCode && (
                        <ul className="ml-6 border-l border-blueGray-200">
                          {menuTasks[menu.menuCode] && 
                           menuTasks[menu.menuCode].length > 0 ? (
                            menuTasks[menu.menuCode].map((task) => (
                              <li key={task.activityCode} className="items-center">
                             
                                <Link
                                  className={
                                    "text-sm py-2 block pl-3 " +
                                    (isTaskActive(menu, task)
                                      ? "text-lightBlue-500 hover:text-lightBlue-600 font-medium"
                                      : "text-blueGray-700 hover:text-blueGray-500")
                                  }
                                  style={
                                    isTaskActive(menu, task)
                                      ? { color: "#b23200" }
                                      : {}
                                  }
                                  to={getTaskPath(menu, task)} //this is used to link sub menus when clicking
                                  onClick={() => setCollapseShow("hidden")}
                                >
                                  <i
                                    className={
                                      "fas fa-circle mr-2 text-xs " +
                                      (isTaskActive(menu, task)
                                        ? "opacity-75"
                                        : "text-blueGray-300")
                                    }
                                  ></i>
                                  {task.activityName}

                                  {/* {isTaskActive(menu, task) && (

                                    
                                    //this is place the red dot show when active
                                    <span className="ml-2 text-xs">●</span>
                                  )} */}
                                </Link>
                              </li>
                            ))
                          ) : (
                            <li className="text-sm py-2 pl-3 text-blueGray-500">
                              <i className="fas fa-spinner fa-spin mr-2 text-xs"></i>
                              Loading tasks...
                            </li>
                          )}
                        </ul>
                      )}
                    </li>
                  ))
                ) : (
                  <li className="items-center">
                    <div className="text-sm py-3 inline-flex text-blueGray-700">
                      <i className="fas fa-exclamation-circle mr-2 text-sm text-blueGray-300"></i>
                      No menus available
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
          
          <div className="mt-64 sticky">
            <AdminNavbar />
          </div>
        </div>
      </nav>
    </>
  );
}