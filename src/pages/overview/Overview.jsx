import React, { useState } from "react";
import { IconButton, Box, Button, Typography, Grid } from "@mui/material";
import OverviewTop from "./overviewTop";
import OverviewBottom from "./overviewBottom";
import DateComponent from "../../components/global/DateComponent";
import OperationsChart from "../stats/OperationsChart";

const Overview = () => {
  return (
    <div style={{ paddingTop: "5%", paddingBottom: "15%" }}>
      <DateComponent />
      <OverviewTop />
      <OverviewBottom />
    </div>
  );
};

export default Overview;
