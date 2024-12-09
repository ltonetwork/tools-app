import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { BASE_URL } from "../services/config";

const Balances = () => {
  const addresses = allAddresses;
  const [balances, setBalances] = useState({});

  // const value = lto.getBurned();
  // console.log(value);

  useEffect(() => {
    const fetchBalances = async () => {
      const balances = {};
      for (const address of addresses) {
        const balance = await getBalance(address);
        balances[address] = balance;
      }
      setBalances(balances);
    };
    fetchBalances();
  }, []);

  const getBalance = async (address) => {
    try {
      const response = await axios.get(
        `${BASE_URL}addresses/balance/${address}`
      );
      return response.data.balance;
    } catch (error) {
      console.error("Error fetching balance:", error);
      return 0;
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Address</TableCell>
            <TableCell align="left">Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {addresses.map((address, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell component="th" scope="row">
                {address}
              </TableCell>
              <TableCell align="left">
                {balances[address] || "Loading..."}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Balances;
