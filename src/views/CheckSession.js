// import { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";

// const SessionCheck = () => {
//   const history = useHistory();
//   const [sessionExpired, setSessionExpired] = useState(false);

//   useEffect(() => {
//     const checkSession = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8088/SPSProjectBackend-0.0.1-SNAPSHOT/api/v1/session", {
//           method: "GET",
//           credentials: "include",
//         });

//         if (response.status === 401 && !sessionExpired) {
//           setSessionExpired(true);
//           alert("Session expired! Please log in again.");
//           sessionStorage.clear(); // Clear stored session
//           history.push("/auth/login");
//         }
//       } catch (error) {
//         console.error("Session check failed:", error);
//       }
//     };

//     // Check session every 30 seconds
//     const interval = setInterval(checkSession, 30000);

//     return () => clearInterval(interval); // Cleanup on unmount
//   }, [history, sessionExpired]);

//   return null;
// };

// export default SessionCheck;






import { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const SessionCheck = () => {
  const history = useHistory();
  const logoutInProgressRef = useRef(false);
  const lastActivityRef = useRef(Date.now());

  const updateLastActivity = () => {
    lastActivityRef.current = Date.now();
    sessionStorage.setItem("lastActivity", Date.now().toString());
  };

  const checkSession = () => {
    if (logoutInProgressRef.current) return;

    const userData =
      localStorage.getItem("user") || sessionStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;

    const lastActivity =
      sessionStorage.getItem("lastActivity") || Date.now().toString();

    const currentTime = Date.now();
    const fifteenMinutes =  15 * 60 * 1000; // inactivity timeout only

    //  REMOVED sessionStart logic
    if (!user || !user.userId) {
      handleSessionExpiration("Session data missing");
      return;
    }

    //  ONLY inactivity-based logout
    if (currentTime - Number(lastActivity) > fifteenMinutes) {
      handleSessionExpiration("User inactive for too long");
      return;
    }

    //  Warning before inactivity timeout (2 minutes left)
    const timeLeft =
      fifteenMinutes - (currentTime - Number(lastActivity));

    if (timeLeft > 0 && timeLeft <= 2 * 60 * 1000) {
      const minutesLeft = Math.ceil(timeLeft / (60 * 1000));
      toast.warning(
        `Session expires in ${minutesLeft} minute${
          minutesLeft > 1 ? "s" : ""
        } due to inactivity`,
        {
          toastId: "session-warning",
          autoClose: false,
        }
      );
    }
  };

  const handleSessionExpiration = (reason) => {
    if (logoutInProgressRef.current) return;

    logoutInProgressRef.current = true;

    toast.dismiss();
    toast.error("Session expired! Please log in again.");

    localStorage.removeItem("user");
    sessionStorage.clear();

    ["userId", "userLevel", "deptId", "userName", "lastActivity"].forEach(
      (key) => {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
      }
    );

    setTimeout(() => {
      history.push("/auth/login");
      logoutInProgressRef.current = false;
    }, 100);
  };

  useEffect(() => {
    const activityEvents = [
      "mousedown",
      "keypress",
      "click",
      "scroll",
      "touchstart",
      "mousemove"
    ];

    const handleActivity = () => {
      updateLastActivity();
      toast.dismiss("session-warning");
    };

    activityEvents.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });

    updateLastActivity();

    const interval = setInterval(checkSession, 60 * 1000);

    return () => {
      clearInterval(interval);
      activityEvents.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [history]);

  return null;
};

export default SessionCheck;
