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
import { DataGrid } from "@mui/x-data-grid";
import LastUpdate from "../components/global/LastUpdate";
import SearchIcon from "@mui/icons-material/Search";
import { SCRIPT } from "../utils/config";
import Loader from "../components/global/Loader";

const Blocks = () => {
  const [blocksDaily, setBlocksDaily] = useState([]);
  const [blocksWeekly, setBlocksWeekly] = useState([]);
  const [blocksMonthly, setBlocksMonthly] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("daily");
  const [loading, setLoading] = useState(true);
  const [loadingWeekly, setLoadingWeekly] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dailyRes, weeklyRes, monthlyRes] = await Promise.all([
          axios.get(`${SCRIPT}/blocks-daily`),
          axios.get(`${SCRIPT}/blocks-weekly`),
          //axios.get(`${SCRIPT}/blocks-monthly`),
        ]);
        setBlocksDaily(dailyRes.data);
        setBlocksWeekly(weeklyRes.data);
        //setBlocksMonthly(monthlyRes.data);
        setDataLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (!dataLoaded) {
      fetchData();
    }
  }, [dataLoaded]);

  const handlePeriodClick = async (period) => {
    setSelectedPeriod(period);
    if (period === "weekly" && blocksWeekly.length === 0) {
      setLoadingWeekly(true);
      try {
        const res = await axios.get(`${SCRIPT}/blocks-weekly`);
        setBlocksWeekly(res.data);
      } catch (error) {
        console.error("Error fetching weekly data:", error);
      } finally {
        setLoadingWeekly(false);
      }
    } else if (period === "monthly" && blocksMonthly.length === 0) {
      setLoadingMonthly(true);
      try {
        const res = await axios.get(`${SCRIPT}/blocks-monthly`);
        setBlocksMonthly(res.data);
      } catch (error) {
        console.error("Error fetching monthly data:", error);
      } finally {
        setLoadingMonthly(false);
      }
    }
  };

  const columns = [
    { field: "id", headerName: "#", width: 30 },
    { field: "height", headerName: "Block height", width: 120 },
    { field: "generator", headerName: "Generator", width: 350 },
    { field: "date", headerName: "Date", width: 100 },
    { field: "time", headerName: "Time", width: 120 },
    { field: "blocksize", headerName: "Blocksize", width: 90 },
    { field: "transactionCount", headerName: "Transactions", width: 120 },
    { field: "fee", headerName: "Fees(LTO)", width: 100 },
    { field: "burnedFees", headerName: "Burned fees", width: 120 },
    { field: "miningReward", headerName: "Mining reward", width: 120 },
    { field: "generatorReward", headerName: "Generator reward", width: 150 },
  ];

  const dayAgo = new Date();
  dayAgo.setDate(dayAgo.getDate() - 1);
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const selectedData =
    selectedPeriod === "daily"
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
        (selectedPeriod === "daily" && dayAgo) ||
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
      date: new Date(block.timestamp).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
      }),
      time: new Date(block.timestamp).toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "UTC",
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
    <div style={{ paddingTop: "15px", paddingBottom: "15%" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography sx={{ fontSize: "20px" }}>{"[Blocks]"}</Typography>
      </Box>
      {loading && <Loader />} <LastUpdate />
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Button
          style={{
            backgroundColor: selectedPeriod === "daily" ? "#17054B" : "white",
            color: selectedPeriod === "daily" ? "white" : "#17054B",
          }}
          sx={{ margin: 1 }}
          onClick={() => handlePeriodClick("daily")}
          variant={selectedPeriod === "daily" ? "outlined" : "contained"}
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
        {/* <Button
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
        </Button> */}
      </Box>
      <Card sx={{ margin: 2 }}>
        <CardContent>
          <Box
            display="flex"
            alignItems="center"
            style={{ marginBottom: "5px" }}
          >
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
          <div style={{ height: 600 }}>
            <DataGrid
              rows={searchedRows}
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
