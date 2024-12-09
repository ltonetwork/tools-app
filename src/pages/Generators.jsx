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
import { EXT_URL2, STATS } from "../services/config";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";
import { generatorNames } from "../services/data";
import Loader from "../components/global/Loader";

const Generators = () => {
  const [gen, setGen] = useState([]);
  const [allGenerators, setAllGenerators] = useState([]);
  const [genWeekly, setGenWeekly] = useState([]);
  const [genMonthly, setGenMonthly] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("24");
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [genRes, genWeeklyRes, genMonthlyRes, allGeneratorsRes] =
          await Promise.all([
            axios.get(`${EXT_URL2}generators/json`),
            axios.get(`${EXT_URL2}generators-weekly/json`),
            axios.get(`${EXT_URL2}generators-monthly/json`),
            axios.get(`${STATS}/generator/all`),
          ]);
        setGen(genRes.data);
        setGenWeekly(genWeeklyRes.data);
        setGenMonthly(genMonthlyRes.data);
        setAllGenerators(allGeneratorsRes.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePeriodClick = (period) => {
    if (period !== "all") {
      setSelectedPeriod(period);
    } else {
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
    selectedPeriod === "24"
      ? genDay
      : selectedPeriod === "weekly"
      ? genWeek
      : selectedPeriod === "monthly"
      ? genMonth
      : allGen;

  const searchResults = rows.filter(
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
              backgroundColor: selectedPeriod === "" ? "#17054B" : "white",
              color: selectedPeriod === "" ? "white" : "#17054B",
            }}
            sx={{ margin: 1 }}
            onClick={() => handlePeriodClick("all")}
            variant={selectedPeriod === "" ? "outlined" : "contained"}
            size="small"
          >
            All time
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
        <Card sx={{ margin: 2 }}>
          <CardContent>
            <div style={{ width: "100%" }}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
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
              {loading ? (
                <Loader />
              ) : (
                <DataGrid
                  rows={searchResults}
                  columns={
                    selectedPeriod === "" ? allGeneratorsColumn : columns
                  }
                  pageSize={isMobile ? 5 : 10}
                  rowsPerPageOptions={[25, 50, 100]}
                  pagination
                  autoHeight
                  checkboxSelection={false}
                  disableSelectionOnClick
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Generators;
