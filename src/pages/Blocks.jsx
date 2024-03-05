import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Box,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DateComponent from "../components/global/DateComponent";
import SearchIcon from "@mui/icons-material/Search";
import { SCRIPT } from "../utils/config";

const Blocks = () => {
  const [blocksDaily, setBlocksDaily] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get(`${SCRIPT}/blocks-daily`).then((res) => {
      setBlocksDaily(res.data);
    });
  }, []);

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

  // Extract time and filter rows for today's date
  const today = new Date();
  const todayRows = blocksDaily
    .slice()
    .reverse()
    .filter((block) => {
      const timestampDate = new Date(block.timestamp);
      return (
        timestampDate.getDate() === today.getDate() &&
        timestampDate.getMonth() === today.getMonth() &&
        timestampDate.getFullYear() === today.getFullYear()
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

  //search
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRows = todayRows.filter((row) =>
    row.generator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <DateComponent />

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
