import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Card, CardContent, Box, Typography } from "@mui/material";
import LastUpdate from "../components/global/LastUpdate";
import { SCRIPT } from "../utils/config";
import axios from "axios";

function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get(`${SCRIPT}/transactions`).then((res) => {
      setTransactions(res.data);
    });
  }, []);

  const columns = [
    { field: "date", headerName: "Date", width: 120 },
    { field: "all", headerName: "All Tx", width: 100 },
    { field: "anchor", headerName: "Anchor", width: 100 },
    { field: "transfer", headerName: "Transfer", width: 100 },
    { field: "mass_transfer", headerName: "Mass Transfer", width: 120 },
    { field: "all_transfers", headerName: "All Transfers", width: 120 },
    { field: "burn", headerName: "Burn", width: 90 },
    { field: "lease", headerName: "Lease", width: 90 },
    { field: "association", headerName: "Association", width: 120 },
    { field: "script", headerName: "Script", width: 90 },
    { field: "sponsor", headerName: "Sponsor", width: 120 },
    { field: "data", headerName: "Data", width: 90 },
    //{ field: "statement", headerName: "Statement", width: 120 },
  ];

  const rows = transactions.flatMap((transaction) => {
    const { period, ...data } = transaction;
    return Object.entries(data).map(([date, types]) => ({
      id: `${period}-${date}`,
      date: date.split(" ")[0],
      ...types,
    }));
  });

  const reversedRows = [...rows].reverse();

  return (
    <div style={{ paddingTop: "15px", paddingBottom: "20%" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography sx={{ fontSize: "20px" }}>{"[Transactions]"}</Typography>
      </Box>
      <LastUpdate />
      <Card sx={{ margin: 2 }}>
        <CardContent>
          <div style={{ height: 600, width: "100%", marginTop: 20 }}>
            <DataGrid rows={reversedRows} columns={columns} pageSize={5} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Transactions;
