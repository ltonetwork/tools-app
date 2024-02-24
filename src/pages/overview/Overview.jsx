import React from "react";
import OverviewTop from "./overviewTop";
import OverviewBottom from "./overviewBottom";
import DateComponent from "../../components/global/DateComponent";

const Overview = () => {
  return (
    <div style={{ paddingTop: "15px", paddingBottom: "15px" }}>
      <DateComponent />
      <OverviewTop />
      <OverviewBottom />
    </div>
  );
};

export default Overview;
