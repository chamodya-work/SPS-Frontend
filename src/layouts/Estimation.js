// import React from "react";
// import { Switch, Route, Redirect } from "react-router-dom";

// import Sidebar from "components/Sidebar/Sidebar.js";
// import AdminNavbar from "components/Navbars/AdminNavbar.js";
// import FooterAdmin from "components/Footers/FooterAdmin.js";

// import StandardEstimate from "views/estimate/StandardEstimate.js";
// import StandardRates from "views/estimate/StandardRates.js";
// import ModifyEstimate from "views/estimate/ModifyEstimate";
// import HeaderStatsWithoutCards from "components/Headers/HeaderStatsWithoutCards";

// export default function Estimation() {
//   return (
//     <>
//       <Sidebar />
//       <div className="relative md:ml-64 bg-blueGray-100">
//         {/* Header */}
//         <HeaderStatsWithoutCards/>
//         <div className="px-4 md:px-10 mx-auto w-full -m-24">
//           <Switch>
//             <Route path="/estimation/estimate" exact component={StandardEstimate} />
//             <Route path="/estimation/standard-rates" exact component={StandardRates} />
//             <Route path="/estimation/modify-estimate" exact component={ModifyEstimate} />

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

import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStatsWithoutCards from "components/Headers/HeaderStatsWithoutCards";

import StandardEstimate from "views/estimate/StandardEstimate.js";
import StandardRates from "views/estimate/StandardRates.js";
import ModifyEstimate from "views/estimate/ModifyEstimate";

export default function Estimation() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100 min-h-screen flex flex-col">
        {/* Header */}
        <HeaderStatsWithoutCards />
        <div className="flex-grow">
          <div className="relative px-4 md:px-10 mx-auto w-full -mt-24">
            <Switch>
              <Route path="/estimation/estimate" exact component={StandardEstimate} />
              <Route path="/estimation/standard-rates" exact component={StandardRates} />
              <Route path="/estimation/modify-estimate" exact component={ModifyEstimate} />
              <Redirect from="/estimation" to="/estimation/estimate" />
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
}