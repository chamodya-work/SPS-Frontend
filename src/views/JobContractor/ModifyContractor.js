import NewJobContractor from "components/JobContractor/NewJobContractor";
import { useState } from "react";
const ModifyContractor = () => {
  return (
    <div className="container mx-auto rounded-lg">
      <div className="flex justify-center px-4 mb-5 mx-48 mt-5 md:px-10 lg:px-20 rounded-lg">
        <NewJobContractor
          isModify={true}
        />
      </div>
    </div>
  );
};

export default ModifyContractor;
