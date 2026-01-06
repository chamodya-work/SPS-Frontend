//this 2 code  new Sidebar.js 
// to check navigation correcly
/eslint-disable/
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

  //   return /admin/${menu.menuCode}/${task.activityCode};
  // };

    //this is new getTaskPath function (with optimise routes)

    const getTaskPath = (menu, task) => {
      const menuName = (menu.displayName || '').toLowerCase();
      const taskName = (task.activityName || '').toLowerCase();
    
      console.log("this is menu display name: ", menuName);
      console.log("this is task name: ", taskName);
      
      // Service Estimation Route - EXISTING
      if (menuName.includes('new estimate service') && taskName === 'add') {
        return '/admin/service-estimation/details';
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
      <nav className="relative z-10 flex flex-wrap items-center justify-between px-6 bg-white shadow-xl md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden md:w-64">
        <div className="flex flex-wrap items-center justify-between w-full px-0 mx-auto md:flex-col md:items-stretch md:min-h-full md:flex-nowrap">
          {/* Toggler - EXISTING CODE */}
          <button
            className="px-3 py-1 text-xl leading-none text-black bg-transparent border border-transparent border-solid rounded opacity-50 cursor-pointer md:hidden"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-2")}
          >
            <i className="fas fa-bars"></i>
          </button>
          
          {/* Brand - EXISTING CODE */}
          {/* this is commented because i now use handleLogoClick with onclick */}

          {/* <Link
            className="inline-block px-0 pt-2 mt-2 mr-0 text-sm font-bold text-left uppercase md:block md:pb-2 text-blueGray-600 whitespace-nowrap"
            to="/"
          >
            <div className="sticky flex items-center justify-center">
              <img alt="ceb logo" className="w-20 h-20" src={ceb} />
            </div>
          </Link> */}

          {/* Brand - UPDATED: Added onClick handler for logout */}
          <div
            className="inline-block px-0 pt-2 mt-2 mr-0 text-sm font-bold text-left uppercase cursor-pointer md:block md:pb-2 text-blueGray-600 whitespace-nowrap"
            onClick={handleLogoClick}
          >
            <div className="sticky flex items-center justify-center">
              <img alt="ceb logo" className="w-20 h-20" src="/ceb.png" />
            </div>
          </div>


          
          {/* User - EXISTING CODE */}
          <ul className="flex flex-wrap items-center list-none md:hidden">
            <li className="relative inline-block">
              <NotificationDropdown />
            </li>
            <li className="relative inline-block">
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
            <div className="block border-b border-solid md:min-w-full md:hidden border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="inline-block p-4 px-0 mr-0 text-sm font-bold text-left uppercase md:block md:pb-2 text-blueGray-600 whitespace-nowrap"
                    to="/"
                  >
                    <div className="flex items-center justify-center">
                      <img alt="ceb logo" className="w-20 h-20" src="/ceb.png" />
                    </div>
                  </Link>
                </div>
                <div className="flex justify-end w-6/12">
                  <button
                    type="button"
                    className="px-3 py-1 text-xl leading-none text-black bg-transparent border border-transparent border-solid rounded opacity-50 cursor-pointer md:hidden"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Form - EXISTING CODE */}
            <form className="mt-2 mb-4 md:hidden">
              <div className="pt-0 mb-3">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full h-12 px-3 py-2 text-base font-normal leading-snug bg-white border-0 border-solid rounded shadow-none outline-none border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 focus:outline-none"
                />
              </div>
            </form>

            <div className="h-full overflow-y-auto">
              <ul className="flex flex-col list-none md:flex-col md:min-w-full">
                
                {/* DYNAMIC MENU SECTION */}
                {menusLoading ? (
                  <li className="items-center">
                    <div className="inline-flex py-3 text-sm text-blueGray-700">
                      <i className="mr-2 text-sm fas fa-spinner fa-spin text-blueGray-300"></i>
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
                                  to={getTaskPath(menu, task)}
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
                            <li className="py-2 pl-3 text-sm text-blueGray-500">
                              <i className="mr-2 text-xs fas fa-spinner fa-spin"></i>
                              Loading tasks...
                            </li>
                          )}
                        </ul>
                      )}
                    </li>
                  ))
                ) : (
                  <li className="items-center">
                    <div className="inline-flex py-3 text-sm text-blueGray-700">
                      <i className="mr-2 text-sm fas fa-exclamation-circle text-blueGray-300"></i>
                      No menus available
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
          
          <div className="sticky mt-64">
            <AdminNavbar />
          </div>
        </div>
      </nav>
    </>
  );
}