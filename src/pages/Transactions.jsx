import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Card, CardContent, Typography } from "@mui/material";
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
    { field: "date", headerName: "Date", width: 200 },
    { field: "all", headerName: "All Tx", width: 120 },
    { field: "anchor", headerName: "Anchor", width: 120 },
    { field: "transfer", headerName: "Transfer", width: 120 },
    { field: "mass_transfer", headerName: "Mass Transfer", width: 150 },
    { field: "all_transfers", headerName: "All Transfers", width: 150 },
    { field: "burn", headerName: "Burn", width: 120 },
    { field: "lease", headerName: "Lease", width: 120 },
    { field: "association", headerName: "Association", width: 150 },
    { field: "script", headerName: "Script", width: 120 },
    { field: "sponsor", headerName: "Sponsor", width: 120 },
    { field: "data", headerName: "Data", width: 120 },
    { field: "statement", headerName: "Statement", width: 150 },
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
    <div style={{ paddingTop: "15px", paddingBottom: "10%" }}>
      <LastUpdate />
      <Card sx={{ margin: 2, width: "90vw" }}>
        <CardContent>
          <div style={{ height: 500, width: "100%", marginTop: 20 }}>
            <DataGrid rows={reversedRows} columns={columns} pageSize={5} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Transactions;
