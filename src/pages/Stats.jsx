import React, { useEffect, useState } from "react";
import { Button, Typography, Grid, useTheme } from "@mui/material";
import DateComponent from "../components/global/DateComponent";
// import OperationsChart from "./stats/OperationsChart";
import MassTransfers from "./stats/MassTransfers";
import AllTransfers from "./stats/AllTransfers";
import BurnChart from "./stats/BurnChart";
import LeaseChart from "./stats/LeaseChart";
import AnchorChart from "./stats/AnchorChart";
import AssociationsChart from "./stats/AssociationsChart";
import GeneratorShare from "./stats/GeneratorShare";

const Stats = () => {
  return (
    <div>
      <DateComponent />
      <Typography style={{ textAlign: "center", paddingBottom: "15px" }}>
        Chain stats for the last 3 months to the current date
      </Typography>
      <Grid container spacing={1}>
        <Grid item sm={12} md={6}>
          <GeneratorShare />
        </Grid>
        <Grid item sm={12} md={6}>
          <MassTransfers />
        </Grid>
        <Grid item sm={12} md={6}>
          <AllTransfers />
        </Grid>
        <Grid item sm={12} md={6}>
          <BurnChart />
        </Grid>
        <Grid item sm={12} md={6}>
          <LeaseChart />
        </Grid>
        <Grid item sm={12} md={6}>
          <AnchorChart />
        </Grid>
        <Grid item sm={12} md={6}>
          <AssociationsChart />
        </Grid>
      </Grid>
    </div>
  );
};

export default Stats;
