import React from "react";

import DashboardCards from "../components/UserDashboardCard";

const Dashboard = () => {
  return (
    <div>
       <h2 className="text-2xl font-bold mb-4">Overview</h2>
       <DashboardCards />
     </div>
  );
};

export default Dashboard;
