import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "@fortawesome/fontawesome-free/css/all.min.css";
// import "assets/styles/tailwind.css";
//import "./assets/styles/index.css";
import "./assets/styles/tailwind.css";

// NEW: Import UserProvider
import { UserProvider } from "context/UserContext";


// layouts
import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
import Estimate from "layouts/Estimate";
import Application from "layouts/Application.js";
import JobContractor from "layouts/JobContractor.js";
import Estimation from "layouts/Estimation.js";

// views without layouts
import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";
import Applicant from "layouts/Applicant";
import SessionCheck from "views/CheckSession";
import JobTypeSet from "views/JobTypeSet";
import ModifyProgress from "layouts/ModifyProgress";
import PIV from "layouts/PIV";
import Allocation from "layouts/Allocation";
import ReviceJob from "layouts/ReviseJob";
import ReviseAllocation from "views/ReviseAllocation/ReviseAllocation";
import Schedule2Layout from "layouts/Schedule2Layout";
import CommissionLayout from "layouts/Commission";
import CommissionEditLayout from "layouts/CommissionEdit";
import CommissionDetails from "views/commission/CommissionDetails";
import CommissionDetailsEdit from "views/commission/CommissionDetailsEdit";

import CommissionDetailsValidate from "views/commission/CommissionDetailsValidate";
import CommissionDetailsVerify from "views/commission/CommissionDetailsVerify"

import PeggingSheduleLayout from "layouts/PeggingShedule";

// import OrderCardPopup from "components/Tabs/OrderCardPopup";
// import OrderPopupNew from "components/Tabs/OrderCardPopupNew";
import OrderCardPopupNew from "components/Tabs/OrderCardPopupNew";
import CommissionForwardLayout from "layouts/CommissionForward";
import CommissionValidateLayout from "layouts/CommissionValidate";
import CommissionVerifyLayout from "layouts/CommissionVerify"
import CommissionDetailsForward from "views/commission/CommissionDetailsForward";

//this is snow animation
import Snowfall from "components/SnowAnimation/Snowfall";
import ActiveAppointmentsLayout from "layouts/ActiveAppointments";



ReactDOM.render(
  <BrowserRouter>

    <UserProvider>

      <>
      {/* 🌨️ Global Snow Effect */}
      {/* <Snowfall /> */}

          <SessionCheck />
          <Switch>
            {/* add routes with layouts */}

            {/* this is for testing orderpopu.js */}
            <Route path="/OrderCardPopupNew"  component={OrderCardPopupNew} />
            
            {/* Commission Routes - Order matters! More specific first */}

            <Route path="/admin/commission/verify" component={CommissionVerifyLayout} />

            <Route path="/admin/commission/validate" component={CommissionValidateLayout} />

            <Route path="/admin/commission/forward" component={CommissionForwardLayout} />

          
            <Route path="/admin/commission/edit" component={CommissionEditLayout} />
            <Route path="/admin/commission" component={CommissionLayout} />
            
            {/* this is for pagging path */}
            <Route path="/admin/activeappointments" component={ActiveAppointmentsLayout} />
            <Route path="/admin/peggingSchedule" component={PeggingSheduleLayout} />

            <Route path="/admin" component={Admin} />
            <Route path="/auth" component={Auth} />
            <Route path="/applicant" component={Applicant} />
            <Route path="/modifyProgress" component={ModifyProgress} />
            <Route path="/application" component={Application} />
            <Route path="/jobcontractor" component={JobContractor} />
            <Route path="/estimation" component={Estimation} />
            <Route path="/estimate" component={Estimate} />
            <Route path="/jobrevision" component={ReviceJob} />
            <Route path="/schedule2" component={Schedule2Layout} />
            <Route path="/admin/commission/:id" component={CommissionDetails} /> // this is for commission details routes
            <Route path="/admin/commission/edit/:id" component={CommissionDetailsEdit} /> // this is for edit commission details routes

            <Route path="/admin/commission/verify/:id" component={CommissionDetailsVerify} /> // this is for verify commission details routes

            <Route path="/admin/commission/validate/:id" component={CommissionDetailsValidate} /> // this is for edit commission details routes


            <Route path="/admin/commission/forward/:id" component={CommissionDetailsForward}/> //this is for forward Commission details routes



            {/* add routes without layouts */}
            <Route path="/piv" component={PIV} />
            <Route path="/allocation" component={Allocation} />
            <Route path="/landing" exact component={Landing} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/index" exact component={Index} />
            <Route path="/auth" exact component={Index} />
            <Route path="/jobtypeset" exact component={JobTypeSet} />
            <Route path="/reviseallocation" exact component={ReviseAllocation} />

            

            {/* add redirect for first page */}
            <Redirect from="*" to="/auth" />
          </Switch>
          <ToastContainer position="top-right" autoClose={3000} />
        </>
    </UserProvider>
    
  </BrowserRouter>,
  document.getElementById("root")
);
