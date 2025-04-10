import React from "react";
import MarketStats from "../components/MarketStats";
import NetworkStats from "../components/NetworkStats";
import NodeStats from "../components/NodeStats";
import TokenSupplyStats from "../components/TokenSupplyStats";

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">LTO Network Dashboard</h1>
      <div className="space-y-8">
        <TokenSupplyStats />
        <MarketStats />
        <NetworkStats />
        <NodeStats />
      </div>
    </div>
  );
};

export default Dashboard;
