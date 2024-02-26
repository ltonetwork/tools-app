import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import DateComponent from "../components/global/DateComponent";
import { EXT_URL } from "../utils/config";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";

const Generators = () => {
  const [generators, setGenerators] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("24");

  useEffect(() => {
    axios.get(`${EXT_URL}/generators`).then((res) => {
      setGenerators(res.data);
    });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePeriodClick = (period) => {
    setSelectedPeriod(period);
  };

  const filteredGenerators = generators.filter(
    (generator) =>
      generator.name &&
      generator.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { field: "id", headerName: "#", width: 50 },
    { field: "address", headerName: "Address", width: 300 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "blocksMined", headerName: "Blocks Mined", width: 150 },
    { field: "effectiveBalance", headerName: "Effective Balance", width: 150 },
    { field: "ltoFees", headerName: "LTO Fees", width: 120 },
    { field: "lastMinted", headerName: "Last Minted", width: 200 },
  ];

  const rows = filteredGenerators.map((generator, index) => ({
    id: index + 1,
    address: generator.address,
    name: generator.name ? generator.name : "-",
    blocksMined:
      selectedPeriod === "24"
        ? generator.stats.day.blocks
        : selectedPeriod === "seven"
        ? generator.stats.week.blocks
        : generator.stats.month.blocks,
    effectiveBalance: generator.effectiveBalance,
    ltoFees:
      selectedPeriod === "24"
        ? generator.stats.day.fees
        : selectedPeriod === "seven"
        ? generator.stats.week.fees
        : generator.stats.month.fees,
    lastMinted: new Date(generator.lastMinted).toLocaleString(),
  }));

  return (
    <div>
      <DateComponent />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <TextField
          size="small"
          label="Search by Name"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          sx={{ margin: 1 }}
          onClick={() => handlePeriodClick("24")}
          variant={selectedPeriod === "24" ? "contained" : "outlined"}
          size="small"
        >
          Last 24hrs
        </Button>
        <Button
          sx={{ margin: 1 }}
          onClick={() => handlePeriodClick("seven")}
          variant={selectedPeriod === "seven" ? "contained" : "outlined"}
          size="small"
        >
          Last 7days
        </Button>
        <Button
          sx={{ margin: 1 }}
          onClick={() => handlePeriodClick("thirty")}
          variant={selectedPeriod === "thirty" ? "contained" : "outlined"}
          size="small"
        >
          Last 30days
        </Button>
      </Box>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection={false}
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};

export default Generators;
