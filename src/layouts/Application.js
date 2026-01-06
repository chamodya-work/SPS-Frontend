import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components
import Sidebar from "components/Sidebar/Sidebar.js";

//views
import NewApp from "views/application/Application";
import ModifyApp from "views/application/ModifyApplication";
import HeaderStatsWithoutCards from "components/Headers/HeaderStatsWithoutCards";
import AdminNavbar from "components/Navbars/AdminNavbar";
import FooterAdmin from "components/Footers/FooterAdmin";

export default function Application() {
    return (
        <>
          <Sidebar />
          <div className="relative md:ml-64 bg-blueGray-100">
            {/* <div className="bg-lightBlue-600 pt-24">
            </div> */}
            <HeaderStatsWithoutCards />
            <div className="relative px-4 md:px-10 mx-auto w-full h-screen -m-24">
              <Switch>
                <Route path="/application/new" exact component={NewApp} />
                <Route path="/application/modify" exact component={ModifyApp} />
              </Switch>
            </div>
          </div>
          {/* Footer Always at Bottom */}
          {/* <FooterAdmin /> */}
        </>
      );
  }