import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import DateComponent from "../components/global/DateComponent";
import MassTransfers from "./stats/MassTransfers";
import AllTransfers from "./stats/AllTransfers";
import BurnChart from "./stats/BurnChart";
import LeaseChart from "./stats/LeaseChart";
import AnchorChart from "./stats/AnchorChart";
import AssociationsChart from "./stats/AssociationsChart";
import GeneratorShare from "./stats/GeneratorShare";
import AllTransactions from "./stats/AllTransactions";
import OperationsChart from "./stats/OperationsChart";

const Stats = () => {
  return (
    <div style={{ paddingTop: "15px", height: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography sx={{ fontSize: "20px" }}>{"[Stats]"}</Typography>
      </Box>
      <DateComponent />
      <Typography style={{ textAlign: "center", paddingBottom: "15px" }}>
        Chain stats for the last 3 months to the current date
      </Typography>

      <Grid container spacing={1} sx={{ minWidth: 300, padding: 2 }}>
        <Grid item xs={12} md={12} lg={12}>
          <OperationsChart />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <MassTransfers />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <AllTransfers />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <BurnChart />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <LeaseChart />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <AnchorChart />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <AssociationsChart />
        </Grid>
      </Grid>
      {/* <Grid
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
      >
        <Grid item xs={12} md={6} lg={6}>
          <GeneratorShare />
        </Grid>
        <Grid item xs={12} md={6} lg={6}></Grid>
      </Grid> */}
    </div>
  );
};

export default Stats;
