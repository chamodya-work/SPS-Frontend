// this is new code for testing with local and session
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const [userRole, setUserRole] = useState(null);
  const [mainMenus, setMainMenus] = useState([]);
  const [menusLoading, setMenusLoading] = useState(false);
  const [menuTasks, setMenuTasks] = useState({});

  // NEW: Function to manually refresh menus
  const refreshMenus = () => {
    
    const localUser = localStorage.getItem('user');
    const sessionUser = sessionStorage.getItem('user');
    
    const user = localUser ? JSON.parse(localUser) : 
                 sessionUser ? JSON.parse(sessionUser) : null;
    
    console.log("UserContext - Refreshing menus for user:", user);

    if (user && user.userId) {
      setUserRole(user.userLevel);
      setMenusLoading(true);
      
      fetch(`${baseUrl}/api/login/main-menus?userId=${user.userId}`)
          .then(res => {
            console.log("Menu API response status:", res.status);
            return res.json();
          })
          .then(data => {
            console.log("Menu API data received:", data);
            setMainMenus(Array.isArray(data) ? data : []);


            // NEW: Automatically fetch tasks for commission menu when main menus are loaded
            //because if not we cant show CardStats in first login
            // in \context\UserContext.js
            const commissionMenu = data.find(menu => 
              menu.menuCode === 'CCM' || 'CCA'||
              menu.displayName?.toLowerCase().includes('commission')
            );
            
            if (commissionMenu && user.userId) {
              console.log("Auto-fetching tasks for commission menu:", commissionMenu.menuCode);
              fetchTasksForMenu(user.userId, commissionMenu.menuCode);
            }
        

          })
          .catch((error) => {
            console.error("Error fetching menus:", error);
            setMainMenus([]);
          })
          .finally(() => {
            setMenusLoading(false);
            console.log("Menu loading completed");
          });
    } else {
      console.log("No user found in storage");
      setMainMenus([]);
    }
  };

  useEffect(()=>{
    refreshMenus();
  },[]);

  const logout = () => {
    setUserRole(null);
    setMainMenus([]);
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    // Also clear individual session items for backward compatibility
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userLevel");
    sessionStorage.removeItem("deptId");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("sessionStart");
  };

  // Fetch tasks for a menu
  const fetchTasksForMenu = async (userId, menuCode) => {
    if (!userId || !menuCode) return;
    try {
      console.log(`Fetching tasks for menu: ${menuCode}, user: ${userId}`);
      const res = await fetch(`${baseUrl}/api/login/menu-tasks?userId=${userId}&menuCode=${menuCode}`);
      const data = await res.json();
      console.log(`Tasks received for ${menuCode}:`, data);
      setMenuTasks(prev => ({ ...prev, [menuCode]: data }));
    } catch (error) {
      console.error(`Error fetching tasks for ${menuCode}:`, error);
      setMenuTasks(prev => ({ ...prev, [menuCode]: [] }));
    }
  };

  return (
      <UserContext.Provider value={{
        userRole, setUserRole, mainMenus, setMainMenus, menusLoading, logout,
        menuTasks, fetchTasksForMenu,refreshMenus
      }}>
        {children}
      </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);