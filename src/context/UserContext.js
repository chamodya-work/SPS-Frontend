// // JavaScript
// import React, { createContext, useContext, useState, useEffect } from 'react';

// // Creates a "context" - like a global storage that can be accessed by any component
// //  without passing props manually
// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [userRole, setUserRole] = useState(null);
//   const [mainMenus, setMainMenus] = useState([]);
//   const [menusLoading, setMenusLoading] = useState(false);
//   const [menuTasks, setMenuTasks] = useState({});

//   // Fetch menus when user info changes
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     // console.log("this is user blnn check krl", user);
//     if (user && user.userId) {
//       setUserRole(user.userLevel);
//       setMenusLoading(true);
//       fetch(`http://localhost:8088/SPS/api/login/main-menus?userId=${user.userId}`)
//           .then(res => res.json())
//           .then(data => {
//             setMainMenus(Array.isArray(data) ? data : []);
//           })
//           .catch(() => setMainMenus([]))
//           .finally(() => setMenusLoading(false));
//     } else {
//       setMainMenus([]);
//     }
//   }, []);

//   const logout = () => {
//     setUserRole(null);
//     setMainMenus([]);
//     localStorage.removeItem('user');
//   };

//   // Fetch tasks for a menu
//   const fetchTasksForMenu = async (userId, menuCode) => {
//     if (!userId || !menuCode) return;
//     try {
//       //i changes this to 8088 to check with my backend

//       //this is the place come sub sidebar things like Add & Modify
//       const res = await fetch(`http://localhost:8088/SPS/api/login/menu-tasks?userId=${userId}&menuCode=${menuCode}`);
//       const data = await res.json();
//       setMenuTasks(prev => ({ ...prev, [menuCode]: data }));
//     } catch {
//       setMenuTasks(prev => ({ ...prev, [menuCode]: [] }));
//     }
//   };


//   return (
//       <UserContext.Provider value={{
//         userRole, setUserRole, mainMenus, setMainMenus, menusLoading, logout,
//         menuTasks, fetchTasksForMenu
//       }}>
//         {children}
//       </UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);



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

  const logout = (manual = true) => {
    setUserRole(null);
    setMainMenus([]);
    setMenuTasks({});
    
    if (window.toast && window.toast.dismiss) {
      window.toast.dismiss();
    }
    
    localStorage.removeItem('user');
    sessionStorage.clear();
    
    ['userId', 'userLevel', 'deptId', 'userName', 'sessionStart', 'lastActivity'].forEach(
      key => localStorage.removeItem(key)
    );
    
    if (manual) {
      if (window.toast && window.toast.info) {
        window.toast.info("You have been logged out");
      }
    }
    
    window.location.href = "/auth/login";
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

      // ADD THIS FUNCTION:
    const isSessionValid = () => {
      const userData = localStorage.getItem('user') || sessionStorage.getItem('user');
      const sessionStart = sessionStorage.getItem('sessionStart');
      
      if (!userData || !sessionStart) return false;
      
      const sessionAge = Date.now() - parseInt(sessionStart);
      return sessionAge < (10 * 60 * 1000); // 10 minutes
    };

    // ADD THIS FUNCTION:
    const getRemainingSessionTime = () => {
      const sessionStart = sessionStorage.getItem('sessionStart');
      if (!sessionStart) return 0;
      
      const sessionAge = Date.now() - parseInt(sessionStart);
      const remaining = (10 * 60 * 1000) - sessionAge;
      return Math.max(0, remaining);
    };

  return (
      <UserContext.Provider value={{
        userRole, setUserRole, mainMenus, setMainMenus, menusLoading, logout,
        menuTasks, fetchTasksForMenu,refreshMenus,isSessionValid,getRemainingSessionTime
      }}>
        {children}
      </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);