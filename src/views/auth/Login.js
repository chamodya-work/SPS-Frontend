// import React, { useState } from "react";
// import { Link, useHistory } from "react-router-dom";
// import ceb from "../../assets/img/ceb.png"
// import { toast } from "react-toastify";

// export default function Login() {
//   const [userId, setuserId] = useState("");
//   const [password, setPassword] = useState("");
//   const history = useHistory();
//   const baseUrl = process.env.REACT_APP_API_BASE_URL;
//   // console.log("this is base url:",baseUrl);

//   console.log("this is previous baseurl: ", baseUrl);


//   const handleSubmit = async (e) => {
//     //history.push("/jobtypeset");
//     e.preventDefault();
//     try {

//       const response = await fetch(`${baseUrl}/api/v1/auth/login`, {

//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Basic " + btoa("user:admin123"),
//         },
//         body: JSON.stringify({ userId, password }),
//         credentials: "include",
//       });
//       // const data = await response.json();
//       const contentType = response.headers.get("content-type");
//       let data;
//       if (contentType && contentType.indexOf("application/json") !== -1) {
//         data = await response.json();
//       } else {
//         data = await response.text();
//       }
//       if (response.ok) {
//         // Store in sessionStorage
//         sessionStorage.setItem("userId", data.userId);
//         sessionStorage.setItem("userLevel", data.userLevel);
//         // sessionStorage.setItem("eAccountNo", data.eAccountNo);
//         sessionStorage.setItem("deptId", data.costcenter);
//         sessionStorage.setItem("userName", data.userName);	
//         sessionStorage.setItem("sessionStart", Date.now().toString());
  
//         const userlevel = data.userLevel;
  
//         console.log("Session storage saved:", {
//           userId: sessionStorage.getItem("userId"),
//           userLevel: sessionStorage.getItem("userLevel"),
//           deptId: sessionStorage.getItem("deptId"),
//           userName: sessionStorage.getItem("userName"),
//           sessionStart: sessionStorage.getItem("sessionStart"),
//         });

//         if (userlevel === "CE") {
//           history.push("/admin/dashboardCE");
//         } else if (userlevel === "EE") {
//           history.push("/admin/dashboardEE");
//         } else {
//           history.push("/jobtypeset"); // Default page
//         }
//         toast.success("Login successfully!");
//         console.log("Login successful", data);
//       } else {
//         // Handle login error
//         toast.error(
//           "If you have not account, register first. If you registered verify your email address. Otherwise check your email address and password"
//         );
//         console.error("Login failed", data);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };
//   return (
//     <>
//       <div className="container mx-auto px-4 h-full">
//         <div className="flex content-center items-center justify-center h-full">
//           <div className="w-full lg:w-4/12 px-4">
//             <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
//               <div className="flex justify-center items-center">
//                 <img
//                   alt="ceb logo"
//                   className="w-20 h-20 mt-8"
//                   src={ceb}
//                 />
//               </div>
//               <div className="flex-auto px-4 lg:px-10 py-10 pt-0 mt-2">
//                 <div className="text-blueGray-400 text-center text-sm">
//                   Sign In With Credentials
//                 </div>
//                 <form onSubmit={handleSubmit}>
//                   <div className="relative w-full mb-3">
//                     <label
//                       className="block text-blueGray-600 text-sm mb-2"
//                       htmlFor="grid-password"
//                     >

//                       User Name
//                     </label>
//                     <input
//                       type="text"
//                      className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"

//                       placeholder="userId"
//                       value={userId}
//                       onChange={(e) => setuserId(e.target.value)}
//                     />
//                   </div>

//                   <div className="relative w-full mb-3">
//                     <label
//                       className="block text-blueGray-600 text-sm mb-2"
//                       htmlFor="grid-password"
//                     >
//                       Password
//                     </label>
//                     <input
//                       type="password"
//                       className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                       placeholder="Password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                     />
//                   </div>
//                   {/* <div>
//                     <label className="inline-flex items-center cursor-pointer">
//                       <input
//                         id="customCheckLogin"
//                         type="checkbox"
//                         className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
//                       />
//                       <span className="ml-2 text-sm text-blueGray-600">
//                         Remember Me
//                       </span>
//                     </label>
//                   </div> */}

//                   <div className="text-center mt-6">
//                     <button
//                       className="text-white active:bg-red-200 text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
//                       type="submit"
//                       style={{ backgroundColor: "#7c0000" }}
//                     >
//                       Sign In
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//             <div className="flex flex-wrap mt-6 relative">
//               <div className="w-1/2">
//                 <Link to="/auth/forgot" className="text-blueGray-400 text-sm">
//                   Forgot password?
//                 </Link>
//               </div>
//               <div className="w-1/2 text-right">
//                 <Link to="/auth/register" className="text-blueGray-400 text-sm">
//                   Create new account
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


//new code

// Updated Login.js
// Changes:
// - Fixed state setter name: setuserId -> setUserId (consistent camelCase)
// - Fixed input CSS: "h-0.5" -> "py-3" (to add proper padding and visibility; assuming Tailwind-like classes)
// - Changed label from "User Name" to "User ID" to match the field
// - Removed unnecessary Authorization header (backend doesn't seem to require Basic Auth; Postman works without it)
// - Added basic validation for empty fields with toast error
// - Ensured credentials: "include" for session cookies
// - No other major changes; kept existing logic

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { toast } from "react-toastify";

// NEW: Import useUser hook
import { useUser } from "context/UserContext";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [showGuide, setShowGuide] = useState(false);

  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  
  // console.log("this is base url:",baseUrl);

  console.log("this is previous baseurl: ", baseUrl);

// this is for testing to get details of useUser
  const { mainMenus, menusLoading, menuTasks, fetchTasksForMenu, logout } = useUser();
  

  // NEW: Get refreshMenus from UserContext
  const { refreshMenus } = useUser();

  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !password) {
      toast.error("User ID and password are required");
      return;
    }
    try {
      const response = await fetch(`${baseUrl}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, password }),
        credentials: "include",
      });
      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      } else {
        data = await response.text();
      }
      if (response.ok) {
        // Store in sessionStorage
        sessionStorage.setItem("userId", data.userId.trim());
        sessionStorage.setItem("userLevel", data.userLevel.trim());
        // sessionStorage.setItem("eAccountNo", data.eAccountNo);
        sessionStorage.setItem("deptId", data.costcenter.trim());
        sessionStorage.setItem("userName", data.userName.trim());	
        sessionStorage.setItem("sessionStart", Date.now().toString());

        // NEW: Store user data as a single object in the format UserContext expects
        const userData = {
          userId: data.userId.trim(),
          userLevel: data.userLevel.trim(),
          // Add other properties that your UserContext might need
          deptId: data.costcenter.trim(),
          userName: data.userName.trim()
        };

        // ADD THESE 3 LINES:
        const currentTime = Date.now().toString();
        sessionStorage.setItem("sessionStart", currentTime);
        sessionStorage.setItem("lastActivity", currentTime);

        // Store in both sessionStorage and localStorage for UserContext compatibility
        sessionStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("user", JSON.stringify(userData));

        // NEW: Refresh menus immediately after login
        refreshMenus();
  


        console.log("User data stored for UserContext:", userData);

        

        console.log("Session storage saved:", {
          userId: sessionStorage.getItem("userId"),
          userLevel: sessionStorage.getItem("userLevel"),
          deptId: sessionStorage.getItem("deptId"),
          userName: sessionStorage.getItem("userName"),
          sessionStart: sessionStorage.getItem("sessionStart"),
        });


  
        const userlevel = data.userLevel;
  
       

        //IN HERE I CHANGED USER LEVEL CE TO DEO
        // DEO (DATA ENTRY OPERATOR)
        
        if (userlevel === "DEO" || "EE" || "ES" || "DGM") {
          history.push("/admin/dashboardCE");
        } 
        // else if (userlevel === "EE") {
        //   history.push("/admin/dashboardEE");
        // } 
        
        else {
          history.push("/jobtypeset"); // Default page
          console.log(history.push("/jobtypeset"))
        }
        toast.success("Login successfully!");
        console.log("Login successful", data);
      } else {
        // Handle login error
        // toast.error(
        //   "If you have not account, register first. If you registered verify your email address. Otherwise check your email address and password"
        // );
        toast.error("Incorrect User ID or Password. Please try again.");
        console.error("Login failed", data);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred during login. Please try again.");
    }
  };
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="flex justify-center items-center">
                <img
                  alt="ceb logo"
                  className="w-20 h-20 mt-8"
                  src="/ceb.png"
                />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0 mt-2">
                <div className="text-blueGray-400 text-center text-sm">
                  {/* Sign In With Credentials */}
                  Service Provisioning System
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block text-blueGray-600 text-sm mb-2"
                      htmlFor="grid-password"
                    >
                      User ID
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="User ID"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block text-blueGray-600 text-sm mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {/* <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm text-blueGray-600">
                        Remember Me
                      </span>
                    </label>
                  </div> */}

                  <div className="text-center mt-6">
                    <button
                      className="text-white active:bg-red-200 text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                      style={{ backgroundColor: "#7c0000" }}
                    >
                      Sign In
                    </button>
                  </div>
                </form>

            {/* Need Help - User Manual */}
              {/* <div className="text-center mt-4">
                <a
                  href="https://app.guidemaker.com/guide/73ead221-d03e-4551-be47-a8e4973c8344"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blueGray-500 underline hover:text-blueGray-700"
                >
                  Need Help?
                </a>
              </div> */}
                
              </div>
            </div>

            {/* this is for adding SPS version number           */}
            <div className="text-center mt-0 mb-0">
              <span className="text-blueGray-400 text-[10px]">
                CEB SPS_NEW v1.0.2
              </span>
            </div>

            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <Link to="/auth/forgot" className="text-blueGray-400 text-sm">
                  Forgot password?
                </Link>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/auth/register" className="text-blueGray-400 text-sm">
                  Create new account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
