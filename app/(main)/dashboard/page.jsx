import React from "react";
import WelcomeContainer from "./_components/WelcomeContainer";
import CreateOptions from "./_components/CreateOptions";
import PreviousCreated from "./_components/PreviousCreated";

const DashBoard = () => {
  return (
    <div>
      <WelcomeContainer />
      <h2 className="text-2xl font-bold my-6">DashBoard</h2>
      <CreateOptions/>
      <h3 className="text-2xl font-bold my-6">Previously Created Interviews</h3>
      <PreviousCreated/>
    </div>
  );
};

export default DashBoard;
