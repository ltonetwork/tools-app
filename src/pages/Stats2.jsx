import React, { useState, useEffect } from "react";
import DateComponent from "../components/global/DateComponent";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Menu,
  MenuItem,
} from "@mui/material";
import LTO, { transactions } from "@ltonetwork/lto";
const lto = new LTO("L");

import axios from "axios";
import { BASE_URL } from "../utils/config";

const Stats2 = () => {
  const [stats, setStats] = useState([]);
  const [type, setType] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (type === "mass_transfer") {
      typeHeader(type);
      getStat(type);
    }
  }, [type]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTypeSelection = (selectedType) => {
    setType(selectedType);
    setAnchorEl(null);
  };

  const typeHeader = (type) => {
    if (type === "mass_transfer") {
      setType("Mass transfer");
    }
  };

  async function getStat(type) {
    try {
      const from = new Date("2019-01-12");
      const to = new Date(); // Current date
      const interval = 50; // Interval of 50 days

      let txBodies = [];
      let currentDate = new Date(from); // Initialize currentDate

      while (currentDate < to) {
        const nextIntervalDate = new Date(currentDate);
        nextIntervalDate.setDate(nextIntervalDate.getDate() + interval);
        const toDate = nextIntervalDate > to ? to : nextIntervalDate;

        const fromDateStr = currentDate.toISOString().split("T")[0];
        const toDateStr = toDate.toISOString().split("T")[0];

        const response = await axios.get(
          `${BASE_URL}index/stats/transactions/${type}/${fromDateStr}/${toDateStr}`
        );

        txBodies.push(response.data);
        currentDate = nextIntervalDate;
        setLoading(false);
      }
      txBodies = txBodies.flat();
      txBodies = txBodies.reverse();
      setStats(txBodies);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div>
      <Grid item xs={12} sm={6} md={4}>
        <DateComponent />
        <Card
          sx={{
            minWidth: { xs: 150, sm: 250, md: 300 },
            margin: 2,
            background: "linear-gradient(to right, #c2c5f0, #d3e9f6)",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardContent>
            {/* <Typography
              variant="h6"
              sx={{
                fontSize: 18,
              }}
              color="primary.sec"
              gutterBottom
            >
              Stats
            </Typography> */}
            <Typography
              style={{
                fontSize: "28px",
                fontWeight: 500,
              }}
              color="primary.sec"
              component="div"
            >
              Stats
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              style={{ border: "solid", borderColor: "#6558BF" }}
              size="small"
              onClick={handleClick}
            >
              Explore Transactions
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleTypeSelection("mass_transfer")}>
                Mass Transfer
              </MenuItem>
              {/* Add more menu items for other types if needed */}
            </Menu>
          </CardActions>
        </Card>
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="left">{type}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stats.map((stat, index) => (
              <TableRow
                key={index + 1}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {stat.period}
                </TableCell>
                <TableCell align="left">{stat.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Stats2;
