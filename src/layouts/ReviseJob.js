import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components
import Sidebar from "components/Sidebar/Sidebar.js";

//views
import HeaderStatsWithoutCards from "components/Headers/HeaderStatsWithoutCards";
import NewJob from "views/ReviseJob/NewJob";
import EditJob from "views/ReviseJob/EditJob";

export default function ReviceJob() {
    return (
        <>
          <Sidebar />
          <div className="relative md:ml-64 bg-blueGray-100">
            {/* <div className="bg-lightBlue-600 pt-24">
            </div> */}
            <HeaderStatsWithoutCards />
            <div className="relative px-4 md:px-10 mx-auto w-full h-screen -m-24">
              <Switch>
                <Route path="/jobrevision/new" exact component={NewJob} />
                <Route path="/jobrevision/modify" exact component={EditJob} />
              </Switch>
            </div>
          </div>
          {/* Footer Always at Bottom */}
          {/* <FooterAdmin /> */}
        </>
      );
  }