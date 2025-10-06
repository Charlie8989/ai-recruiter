import React from "react";
import CreateOptions from "./_components/CreateOptions";
import PreviousCreated from "./_components/LatestInterviewList";

const DashBoard = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold my-6">DashBoard</h2>
      <CreateOptions/>
      <h3 className="text-2xl font-bold my-6">Previously Created Interviews</h3>
      <PreviousCreated/>
    </div>
  );
};

export default DashBoard;
