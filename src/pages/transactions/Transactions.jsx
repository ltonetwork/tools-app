import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
// import { BASE_URL } from "../../utils/config";
// import { TYPES } from "./types";

const Transactions = () => {
  //   useEffect(() => {
  //     const [txs, setTxs] = useState(0);
  //     const from = "2019-01-12";
  //     const to = "plus 3 months";
  //     axios
  //       .get(`${BASE_URL}index/stats/transactions/${TYPES}/${from}/${to}`)
  //       .then((res) => {
  //         res.data;
  //       });
  //   }, []);
  return <div>Transactions</div>;
};

export default Transactions;
