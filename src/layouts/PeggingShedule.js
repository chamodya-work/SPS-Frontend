import React from "react";
import { Switch, Route } from "react-router-dom";
import Sidebar from "components/Sidebar/Sidebar.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// Import your Commission component

import HeaderStatsWithoutCards from "components/Headers/HeaderStatsWithoutCards";
import PaggingSchedule from "views/PaggingSchedule"

// src/layouts/Commission.js
export default function PeggingSheduleLayout() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <HeaderStatsWithoutCards />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
             <Route path="/admin/peggingShedule" exact component={PaggingSchedule} />
            
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
