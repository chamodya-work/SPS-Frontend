import NewApplication from "components/Applicationss/NewApplication";
import Schedule2 from "components/Tabs/Schedule2";

import { useState, useEffect } from "react";
import {toast} from "react-toastify";

const NewApp = () => {
  return (
    <div className="container mx-auto rounded-lg">
      <div className="flex justify-center px-4 mb-5 mx-48 mt-5 md:px-10 lg:px-20 rounded-lg">
        <Schedule2 />
      </div>
    </div>
  );
};

export default NewApp;
