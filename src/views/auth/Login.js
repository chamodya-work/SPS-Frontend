import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { toast } from "react-toastify";

// NEW: Import useUser hook
import { useUser } from "context/UserContext";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  console.log("API Base URL:", baseUrl);
  // const appName = process.env.REACT_APP_APP_NAME || "Service Provision System";
  // const appVersion = process.env.REACT_APP_VERSION || "1.0.0";
  // const appCode = process.env.REACT_APP_APP_CODE || "CEB_SPS_";
  
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
        sessionStorage.setItem("userId", data.userId);
        sessionStorage.setItem("userLevel", data.userLevel);
        // sessionStorage.setItem("eAccountNo", data.eAccountNo);
        sessionStorage.setItem("deptId", data.costcenter);
        sessionStorage.setItem("userName", data.userName);	
        sessionStorage.setItem("sessionStart", Date.now().toString());

        // NEW: Store user data as a single object in the format UserContext expects
        const userData = {
          userId: data.userId,
          userLevel: data.userLevel,
          // Add other properties that your UserContext might need
          deptId: data.costcenter,
          userName: data.userName
        };

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
        toast.error(
          "If you have not account, register first. If you registered verify your email address. Otherwise check your email address and password"
        );
        console.error("Login failed", data);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred during login. Please try again.");
    }
  };
  return (
    <>
      <div className="container h-full px-4 mx-auto">
        <div className="flex items-center content-center justify-center h-full">
          <div className="w-full px-4 lg:w-4/12">
            <div className="relative flex flex-col w-full min-w-0 mb-6 break-words border-0 rounded-lg shadow-lg bg-blueGray-200">
              <div className="flex items-center justify-center">
                <img
                  alt="ceb logo"
                  className="w-20 h-20 mt-8"
                  src="/ceb.png"
                />
              </div>
              <div className="flex-auto px-4 py-10 pt-0 mt-2 lg:px-10">
                <div className="text-sm text-center text-blueGray-400">
                  Service Provisioning System
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block mb-2 text-sm text-blueGray-600"
                      htmlFor="grid-password"
                    >
                      User ID 
                    </label> 
                    <input
                      type="text"
                      className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                      placeholder="User ID"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block mb-2 text-sm text-blueGray-600"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
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
                        className="w-5 h-5 ml-1 transition-all duration-150 ease-linear border-0 rounded form-checkbox text-blueGray-700"
                      />
                      <span className="ml-2 text-sm text-blueGray-600">
                        Remember Me
                      </span>
                    </label>
                  </div> */}

                  <div className="mt-6 text-center">
                    <button
                      className="w-full px-6 py-2 mb-1 mr-1 text-sm text-white transition-all duration-150 ease-linear rounded shadow outline-none active:bg-red-200 hover:shadow-lg focus:outline-none"
                      type="submit"
                      style={{ backgroundColor: "#7c0000" }}
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {/* <div className="mt-2 text-center">
              <span className="inline-block px-3 py-2 text-xs bg-white rounded shadow text-blueGray-600">
                {appCode}{appVersion}
              </span>
            </div> */}
            <div className="relative flex flex-wrap mt-6">
              <div className="w-1/2">
                <Link to="/auth/forgot" className="text-sm text-blueGray-400">
                  Forgot password?
                </Link>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/auth/register" className="text-sm text-blueGray-400">
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
