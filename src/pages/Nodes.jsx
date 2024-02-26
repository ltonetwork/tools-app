import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, TextField, InputAdornment, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DateComponent from "../components/global/DateComponent";
import SearchIcon from "@mui/icons-material/Search";
import { EXT_URL } from "../utils/config";

const Nodes = () => {
  const [nodes, setNodes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredNodes = nodes.filter(
    (node) =>
      node.peerName &&
      node.peerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    axios.get(`${EXT_URL}/peers`).then((res) => {
      setNodes(res.data);
    });
  }, []);

  const columns = [
    { field: "id", headerName: "#", width: 90 },
    { field: "peerName", headerName: "Node Name", width: 200 },
    { field: "ip", headerName: "IP Address", width: 150 },
    { field: "location", headerName: "Country", width: 150 },
    { field: "isp", headerName: "Network", width: 150 },
    { field: "applicationVersion", headerName: "Version", width: 150 },
    { field: "p2pport", headerName: "P2P", width: 150 },
    {
      field: "lastSeen",
      headerName: "Last Seen",
      width: 200,
      valueGetter: (params) => new Date(params.row.lastSeen).toLocaleString(),
    },
  ];

  const rows = filteredNodes.map((node, index) => ({
    id: index + 1,
    peerName: node.peerName,
    ip: node.ip,
    location: node.location.country,
    isp: node.isp,
    applicationVersion: node.applicationVersion,
    p2pport: node.p2pport,
    // node.p2pport === ":6868" || node.p2pport === ":6863" ? "open" : "-",
    lastSeen: node.lastSeen,
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
      </Box>
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
    </div>
  );
};

export default Nodes;
