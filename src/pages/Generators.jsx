import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import DateComponent from "../components/global/DateComponent";
import { EXT_URL2, STATS } from "../utils/config";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";
import { generatorNames } from "../utils/data";

const Generators = () => {
  generatorNames;

  const [gen, setGen] = useState([]);
  const [allGenerators, setAllGenerators] = useState([]);
  const [all, setAll] = useState("");
  const [genWeekly, setGenWeekly] = useState([]);
  const [genMonthly, setGenMonthly] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("24");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 700) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    axios.get(`${EXT_URL2}generators/json`).then((res) => {
      setGen(res.data);
    });
    axios.get(`${EXT_URL2}generators-weekly/json`).then((res) => {
      setGenWeekly(res.data);
    });
    axios.get(`${EXT_URL2}generators-monthly/json`).then((res) => {
      setGenMonthly(res.data);
    });
    axios.get(`${STATS}/generator/all`).then((res) => {
      setAllGenerators(res.data);
      console.log(res.data);
    });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePeriodClick = (period) => {
    if (period != "all") {
      setSelectedPeriod(period);
      setAll("");
    } else {
      setAll("all");
      setSelectedPeriod("");
    }
  };

  const columns = [
    { field: "id", headerName: "#", width: 50 },
    { field: "address", headerName: "Address", width: 350 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "blocks", headerName: "Blocks", width: 150 },
    { field: "effectiveBalance", headerName: "Effective balance", width: 150 },
    { field: "ltoFees", headerName: "LTO fees", width: 120 },
    { field: "burned", headerName: "LTO burned", width: 150 },
    { field: "pr", headerName: "Perf. ratio", width: 100 },
  ];

  const allGeneratorsColumn = [
    { field: "id", headerName: "#", width: 50 },
    { field: "address", headerName: "Address", width: 350 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "blocks", headerName: "Blocks", width: 150 },
    { field: "earnings", headerName: "Earnings", width: 150 },
    { field: "share", headerName: "Share", width: 200 },
  ];

  const allGen = allGenerators.map((gen, index) => ({
    id: index + 1,
    address: gen.generator,
    name: generatorNames[gen.generator] || "",
    blocks: gen.blocks,
    earnings: gen.earnings,
    share: gen.share,
  }));

  const genDay = gen.map((gen, index) => ({
    id: index + 1,
    address: gen.generator,
    name: generatorNames[gen.generator] || "",
    blocks: gen.blocks,
    effectiveBalance: gen.balance,
    ltoFees: gen.fees,
    burned: gen.burned,
    pr: gen.pr,
  }));

  const genWeek = genWeekly.map((gen, index) => ({
    id: index + 1,
    address: gen.generator,
    name: generatorNames[gen.generator] || "",
    blocks: gen.blocks,
    effectiveBalance: gen.balance,
    ltoFees: gen.fees,
    burned: gen.burned,
    pr: gen.pr,
  }));

  const genMonth = genMonthly.map((gen, index) => ({
    id: index + 1,
    address: gen.generator,
    name: generatorNames[gen.generator] || "",
    blocks: gen.blocks,
    effectiveBalance: gen.balance,
    ltoFees: gen.fees,
    burned: gen.burned,
    pr: gen.pr,
  }));

  const rows =
    selectedPeriod == "24"
      ? genDay
      : selectedPeriod == "weekly"
      ? genWeek
      : genMonth;

  let searchGenerators = rows.filter(
    (generator) =>
      (generator.name &&
        generator.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (generator.address &&
        generator.address.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  let searchAllGenerators = allGen.filter(
    (generator) =>
      (generator.name &&
        generator.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (generator.address &&
        generator.address.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <div style={{ paddingTop: "15px", paddingBottom: "15%" }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography sx={{ fontSize: "20px" }}>{"[Generators]"}</Typography>
        </Box>

        <DateComponent />

        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Button
            style={{
              backgroundColor: all === "all" ? "#17054B" : "white",
              color: all === "all" ? "white" : "#17054B",
            }}
            sx={{ margin: 1 }}
            onClick={() => handlePeriodClick("all")}
            variant={all === "all" ? "outlined" : "contained"}
            size="small"
          >
            All
          </Button>

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
              backgroundColor:
                selectedPeriod === "weekly" ? "#17054B" : "white",
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
              backgroundColor:
                selectedPeriod === "monthly" ? "#17054B" : "white",
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
        {all != "all" ? (
          <Card sx={{ margin: 2 }}>
            <CardContent>
              <div style={{ height: 600, width: "100%" }}>
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}
                >
                  <TextField
                    size="small"
                    label="Search Name | Address"
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
                </Box>
                <DataGrid
                  rows={searchGenerators}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection={false}
                  disableSelectionOnClick
                />
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card sx={{ margin: 2 }}>
            <CardContent>
              <div style={{ height: 600, width: "100%" }}>
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}
                >
                  <TextField
                    size="small"
                    label="Search Name | Address"
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
                </Box>
                <DataGrid
                  rows={searchAllGenerators}
                  columns={allGeneratorsColumn}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection={false}
                  disableSelectionOnClick
                />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default Generators;
