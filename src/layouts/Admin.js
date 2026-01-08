// import React from "react";
// import { Switch, Route, Redirect } from "react-router-dom";

// // components
// import AdminNavbar from "components/Navbars/AdminNavbar.js";
// import Sidebar from "components/Sidebar/Sidebar.js";
// import HeaderStats from "components/Headers/HeaderStats.js";
// import FooterAdmin from "components/Footers/FooterAdmin.js";

// // views
// import Dashboard from "views/admin/Dashboard.js";
// import Maps from "views/admin/Maps.js";
// import Settings from "views/admin/Settings.js";
// import Tables from "views/admin/Tables.js";
// import JobStatusPie from "views/admin/JobStatusPie";
// import CardSocialTraffic from "components/Cards/CardSocialTraffic";

// export default function Admin() {
//   return (
//     <>
//       <Sidebar />
//       <div className="relative md:ml-64 bg-blueGray-100">
//         <HeaderStats />
//         {/* <div className="flex flex-wrap mb-24"> 
//           <div className="w-full xl:w-1/3">
//           <JobStatusPie />
//           </div>
//           <div className="w-full xl:w-2/3">
          
//                     <CardSocialTraffic />
//         </div>
//         </div> */}

//         <div className="px-4 md:px-10 mx-auto w-full -m-24">
//           <Switch>
//             <Route path="/admin/dashboard" exact component={Dashboard} />
//             <Route path="/admin/maps" exact component={Maps} />
//             <Route path="/admin/settings" exact component={Settings} />
//             <Route path="/admin/tables" exact component={Tables} />

//             <Redirect from="/admin" to="/admin/dashboard" />
//           </Switch>
//           <FooterAdmin />
//         </div>
        
//       </div>
      
//     </>
    
//   );
// }


import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views
import Dashboard from "views/admin/Dashboard.js";
import Maps from "views/admin/Maps.js";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";
import JobStatusPie from "views/admin/JobStatusPie";
import CardSocialTraffic from "components/Cards/CardSocialTraffic";

import PaggingSchedule from "views/PaggingSchedule";

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100 min-h-screen flex flex-col">
        <HeaderStats />


        <div className="px-4 md:px-10 mx-auto w-full -m-24 flex-grow">
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            {/* <Route path="/admin/peggingShedule" exact component={PaggingSchedule} /> */}
            <Route path="/admin/maps" exact component={Maps} />
            <Route path="/admin/settings" exact component={Settings} />
            <Route path="/admin/tables" exact component={Tables} />

            <Redirect from="/admin" to="/admin/dashboard" />
        
          </Switch>
        </div>
        
        {/* Footer placed outside the main content container */}
        <FooterAdmin />
      </div>
    </>
  );
}