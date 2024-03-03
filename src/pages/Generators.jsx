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
import DateComponent from "../components/global/DateComponent";
import { EXT_URL2 } from "../utils/config";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";

const generatorNames = {
  "3Jhkp3Xtg2wyT6NoEtJB2VQPAHiYuqYUVBp": "Baza",
  "3Jfb7VJzmJjXyQDQ5Nw8R7G2MiasM5fm3Uy": "Binance",
  "3JqTwkbDFbtCPo9z5bFa9WfLmjEr7PXNode": "LTO Edge Node",
  "3JnZLvmVBXsc2XMug4e6yjyvPehr1Fjx9oM": "Lowsea Leasing",
  "3Jq3F3njrrR1ZvM3JhwLX2Sh56LQDtuEyu9": "Stakely.io",
  "3JffJmwV2G158V6N27ouzkoRTgEVPLFqxPy": "ThePhonenixNest",
  "3JsZN7TwprVdXr9CbQ9EUvLSBG2YSZgdPGB": "BlackTurtleNode",
  "3JnN8psLjuEyiPbH2bYcEFKUFpcamxzwFiv": "LTONode.com",
  "3JwUPNbGzguXqvZoAyPYsVDjqURMFVXp9WX": "StockholmBlockBuilders",
  "3JmcAJMQhdLKj296xoDkng9r1McCmBSFiEX": "ltoleasing",
  "3JkfhvV51FTDnCNpgZt3wjXNYbPehgFdaZA": "FillTheDoc",
  "3Jt1mBoziZmoGDaYe1UbGygGMsGS493vkgN": "Knight's Bay Leasing",
  "3Jq8mnhRquuXCiFUwTLZFVSzmQt3Fu6F7HQ": "LegalThings",
  "3Jg3DZyhBnNacHiY13624NQDsxBmnwnqNRQ": "LTO Blockchain Node",
  "3JtBYdoHJoQbgf8hYvEz1pyp7jj9URWvvbB": "CryptoBieb Lease",
  "3JqGGBMvkMtQQqNhGVD6knEzhncb55Y7JJ5": "KruptosNomisma-BiWeekly",
  "3JyXXG6zMKrVkeNdcg3cTRBLRJcbDZcf6RR": "zolnode",
  "3JnYB1TzHYS3gYDvczYtNUnmEbJsgmsdWY3": "LunarWhale Node",
  "3Jn6jpPBVmi1RLRpUtQGKVibNZpeTRACK2P": "KruptosNomisma-Monthly",
  "3JujV7o14LM3vo9bpXtZmqAkyBFwzVJJWdn": "Stats Support Node",
  "3Jp9rSY8BCk8DbfDRcqeULNrecWRRP7ShLr": "LTO MoonBase Node",
  "3JiNi1B3LVdF9Aa2P3cBA2NNwLP7XNaV9A5": "LTO.lease | Thor",
  "3JbXLTSZoU5os2JsTkMorhvvna6Z2dvhBUC": "Binnostake",
  "3Jv111Z8F2TMV2pWyFLJnBuoQaysUUiLEAS": "ltonod.es",
  "3JsyNRBHaU97DUVKMJKMARVHnJiGjAxMsCV": "LTO Stream Node",
  "3JgFnajhMZPidSzXQ1VrEmvfY2fARZ8FPsR": "zolnode2",
  "3JgZdq3LgP2qdB8cPFbuhdDV61u3qdqx2MP": "LTO Elites Leasing",
};

const Generators = () => {
  const [gen, setGen] = useState([]);
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
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePeriodClick = (period) => {
    setSelectedPeriod(period);
  };

  // const filteredGenerators = gen.filter(
  //   (generator) =>
  //     generator.name &&
  //     generator.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const columns = [
    { field: "id", headerName: "#", width: 50 },
    { field: "address", headerName: "Address", width: 350 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "blocks", headerName: "Blocks mined", width: 150 },
    { field: "effectiveBalance", headerName: "Effective balance", width: 150 },
    { field: "ltoFees", headerName: "LTO fees", width: 120 },
    { field: "burned", headerName: "LTO burned", width: 150 },
    { field: "pr", headerName: "Perf. ratio", width: 100 },
  ];

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

  return (
    <div>
      <DateComponent />
      {/* <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
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
      </Box> */}

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        {/* {!isMobile && (
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
        )} */}
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
          <div style={{ height: 500, width: "100%" }}>
            <DataGrid
              rows={rows}
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

export default Generators;
