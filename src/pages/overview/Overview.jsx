import React, { useState } from "react";
import { IconButton, Box, Button, Typography, Grid } from "@mui/material";
import OverviewTop from "./overviewTop";
import OverviewBottom from "./overviewBottom";
import DateComponent from "../../components/global/DateComponent";
import OperationsChart from "../stats/OperationsChart";

const Overview = () => {
  return (
    <div style={{ paddingTop: "15px", paddingBottom: "15px" }}>
      <DateComponent />
      <Grid
        container
        spacing={1}
        sx={{
          maxWidth: "100%",
          margin: "0 auto",
          "@media (min-width: 600px)": {
            maxWidth: 600,
          },
          "@media (min-width: 960px)": {
            maxWidth: 960,
          },
          "@media (min-width: 1280px)": {
            maxWidth: 1280,
          },
        }}
        item
        xs={12}
        md={12}
        lg={12}
      >
        <OperationsChart />
      </Grid>
      <OverviewTop />

      <OverviewBottom />
    </div>
  );
};

export default Overview;
