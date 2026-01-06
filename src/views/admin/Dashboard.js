import React from "react";

// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import CardBar from "components/Cards/CardBar";
import CardPieChart from "components/Cards/CardPieChart.js";
import JobStatusPie from "./JobStatusPie";
import ApplicationStatusChart from "./ApplicationStatusChart";

export default function Dashboard() {
  return (
    <>

      <div className="flex flex-wrap">
        <div className="w-full xl:w-4/12 mt-24 xl:mb-0 px-4">
          {/* <JobStatusPie /> */}
        </div>
        <div className="w-full xl:w-8/12 mt-24 xl:mb-0 px-4">
          {/* <ApplicationStatusChart /> */}
        </div>
      </div>
       <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-4/12 mb-12 xl:mb-0 px-4">
        {/* <p>this is CardBar</p> */}
          {/* <CardBar /> */}
        </div>
        <div className="w-full xl:w-6/12 px-4">
        {/* <p>this is CardPieChart</p> */}
          {/* <CardPieChart /> */}
        </div>
      </div>
      
      <div className="flex flex-wrap mt-8">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          {/* <CardPageVisits /> */}
        </div>
        <div className="w-full xl:w-4/12 px-4">
          {/* <CardSocialTraffic /> */}
        </div>
      </div>
    </>
  );
}
