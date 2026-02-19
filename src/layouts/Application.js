// import React from "react";
// import { Switch, Route, Redirect } from "react-router-dom";

// // components
// import Sidebar from "components/Sidebar/Sidebar.js";

// //views
// import NewApp from "views/application/Application";
// import ModifyApp from "views/application/ModifyApplication";
// import HeaderStatsWithoutCards from "components/Headers/HeaderStatsWithoutCards";
// import AdminNavbar from "components/Navbars/AdminNavbar";
// import FooterAdmin from "components/Footers/FooterAdmin";

// export default function Application() {
//     return (
//         <>
//           <Sidebar />
//           <div className="relative md:ml-64 bg-blueGray-100">
//             {/* <div className="pt-24 bg-lightBlue-600">
//             </div> */}
//             <HeaderStatsWithoutCards />
//             <div className="relative w-full h-screen px-4 mx-auto -m-24 md:px-10">
//               <Switch>
//                 <Route path="/application/new" exact component={NewApp} />
//                 <Route path="/application/modify" exact component={ModifyApp} />
//               </Switch>
//             </div>
//           </div>
//           {/* Footer Always at Bottom */}
//           {/* <FooterAdmin /> */}
//         </>
//       );
//   }
// Updated: sanjula
// import React from "react";
// import { Switch, Route } from "react-router-dom";

// import Sidebar from "components/Sidebar/Sidebar.js";
// import NewApp from "views/application/Application";
// import ModifyApp from "views/application/ModifyApplication";
// import HeaderStatsWithoutCards from "components/Headers/HeaderStatsWithoutCards";

// export default function Application() {
//   return (
//     <>
//       <Sidebar />
//       <div className="relative min-h-screen bg-gray-100 md:ml-64">
//         <HeaderStatsWithoutCards />

//         <div className="px-6 py-8">
//           <Switch>
//             <Route path="/application/new" exact component={NewApp} />
//             <Route path="/application/modify" exact component={ModifyApp} />
//           </Switch>
//         </div>
//       </div>
//     </>
//   );
// }


import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Sidebar from "components/Sidebar/Sidebar.js";
import NewApp from "views/application/Application";
import ModifyApp from "views/application/ModifyApplication";
import HeaderStatsWithoutCards from "components/Headers/HeaderStatsWithoutCards";

export default function Application() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100 min-h-screen flex flex-col">
        <HeaderStatsWithoutCards />
        <div className="flex-grow">
          <div className="relative px-4 md:px-10 mx-auto w-full -mt-24">
            <Switch>
              <Route path="/application/new" exact component={NewApp} />
              <Route path="/application/modify" exact component={ModifyApp} />
              <Redirect from="/application" to="/application/new" />
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
}