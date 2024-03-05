import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DateComponent from "../components/global/DateComponent";
import SearchIcon from "@mui/icons-material/Search";
import { SCRIPT } from "../utils/config";

const Blocks = () => {
  const [blocksDaily, setBlocksDaily] = useState([]);
  const [blocksWeekly, setBlocksWeekly] = useState([]);
  const [blocksMonthly, setBlocksMonthly] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("24");

  useEffect(() => {
    axios.get(`${SCRIPT}/blocks-daily`).then((res) => {
      setBlocksDaily(res.data);
    });

    axios.get(`${SCRIPT}/blocks-weekly`).then((res) => {
      setBlocksWeekly(res.data);
    });

    axios.get(`${SCRIPT}/blocks-monthly`).then((res) => {
      setBlocksMonthly(res.data);
    });
  }, []);

  const handlePeriodClick = (period) => {
    setSelectedPeriod(period);
  };

  const columns = [
    { field: "id", headerName: "#", width: 90 },
    { field: "height", headerName: "Block height", width: 150 },
    { field: "generator", headerName: "Generator", width: 350 },
    { field: "time", headerName: "Time", width: 150 },
    { field: "blocksize", headerName: "Blocksize", width: 90 },
    { field: "transactionCount", headerName: "Transactions", width: 90 },
    { field: "fee", headerName: "Fees(LTO)", width: 90 },
    { field: "burnedFees", headerName: "Burned fees", width: 120 },
    { field: "miningReward", headerName: "Mining reward", width: 120 },
    { field: "generatorReward", headerName: "Generator reward", width: 120 },
  ];

  const today = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const selectedData =
    selectedPeriod === "24"
      ? blocksDaily
      : selectedPeriod === "weekly"
      ? blocksWeekly
      : blocksMonthly;

  const filteredRows = selectedData
    .slice()
    .reverse()
    .filter((block) => {
      const timestampDate = new Date(block.timestamp);
      return (
        (selectedPeriod === "24" &&
          timestampDate.getDate() === today.getDate() &&
          timestampDate.getMonth() === today.getMonth() &&
          timestampDate.getFullYear() === today.getFullYear()) ||
        (selectedPeriod === "weekly" && timestampDate >= oneWeekAgo) ||
        (selectedPeriod === "monthly" &&
          timestampDate >= oneMonthAgo &&
          timestampDate <= new Date())
      );
    })
    .map((block, index) => ({
      id: index + 1,
      height: block.height,
      generator: block.generator,
      time: new Date(block.timestamp).toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
      }),
      blocksize: block.blockSize,
      transactionCount: block.transactionCount,
      fee: block.fee / 10000000,
      burnedFees: block.burnedFees / 10000000,
      miningReward: block.miningReward / 10000000,
      generatorReward: block.generatorReward / 10000000,
    }));

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedRows = filteredRows.filter((row) =>
    row.generator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <DateComponent />

      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Button
          style={{
            backgroundColor: selectedPeriod === "24" ? "#17054B" : "white",
            color: selectedPeriod === "24" ? "white" : "#17054B",
          }}
          sx={{ margin: 1 }}
          onClick={() => handlePeriodClick("24")}
          variant={selectedPeriod === "24" ? "outlined" : "contained"}
          size="small"
        >
          Last 24hrs
        </Button>

        <Button
          style={{
            backgroundColor: selectedPeriod === "weekly" ? "#17054B" : "white",
            color: selectedPeriod === "weekly" ? "white" : "#17054B",
          }}
          sx={{ margin: 1 }}
          onClick={() => handlePeriodClick("weekly")}
          variant={selectedPeriod === "weekly" ? "contained" : "outlined"}
          size="small"
        >
          Last 7days
        </Button>
        <Button
          style={{
            backgroundColor: selectedPeriod === "monthly" ? "#17054B" : "white",
            color: selectedPeriod === "monthly" ? "white" : "#17054B",
          }}
          sx={{ margin: 1 }}
          onClick={() => handlePeriodClick("monthly")}
          variant={selectedPeriod === "monthly" ? "contained" : "outlined"}
          size="small"
        >
          Last 30days
        </Button>
      </Box>

      <Card sx={{ margin: 2 }}>
        <CardContent>
          <Box
            display="flex"
            alignItems="center"
            style={{ marginBottom: "5px" }}
          >
            {/* Search Text Field */}
            <TextField
              id="search"
              label="Search generator"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {/* Search Icon Button */}
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <div style={{ height: 500 }}>
            <DataGrid
              rows={filteredRows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection={false}
              disableSelectionOnClick
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blocks;
