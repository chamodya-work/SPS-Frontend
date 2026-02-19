// import React from "react";
// import { Switch, Route, Redirect } from "react-router-dom";

// // components
// import Sidebar from "components/Sidebar/Sidebar.js";

// //views
// import HeaderStatsWithoutCards from "components/Headers/HeaderStatsWithoutCards";
// import AdminNavbar from "components/Navbars/AdminNavbar";
// import NewContractor from "views/JobContractor/NewContractor";
// import ModifyContractor from "views/JobContractor/ModifyContractor";

// export default function JobContractor() {
//     return (
//         <>
//           <Sidebar />
//           <div className="relative md:ml-64 bg-blueGray-100">
//             {/* <div className="bg-lightBlue-600 pt-24">
//             </div> */}
//             <HeaderStatsWithoutCards />
//             <div className="relative px-4 md:px-10 mx-auto w-full h-screen -m-24">
//               <Switch>
//                 <Route path="/jobcontractor/new" exact component={NewContractor} />
//                 <Route path="/jobcontractor/modify" exact component={ModifyContractor} />
//               </Switch>
//             </div>
//           </div>
//         </>
//       );
//   }

import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components
import Sidebar from "components/Sidebar/Sidebar.js";

//views
import HeaderStatsWithoutCards from "components/Headers/HeaderStatsWithoutCards";
import NewContractor from "views/JobContractor/NewContractor";
import ModifyContractor from "views/JobContractor/ModifyContractor";

export default function JobContractor() {
    return (
        <>
          <Sidebar />
          <div className="relative md:ml-64 bg-blueGray-100 min-h-screen flex flex-col">
            <HeaderStatsWithoutCards />
            <div className="flex-grow">
              <div className="relative px-4 md:px-10 mx-auto w-full -mt-24">
                <Switch>
                  <Route path="/jobcontractor/new" exact component={NewContractor} />
                  <Route path="/jobcontractor/modify" exact component={ModifyContractor} />
                  <Redirect from="/jobcontractor" to="/jobcontractor/new" />
                </Switch>
              </div>
            </div>
          </div>
        </>
      );
  }