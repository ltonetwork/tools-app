import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  Box,
  TextField,
  InputAdornment,
  Typography,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DateComponent from "../components/global/DateComponent";
import SearchIcon from "@mui/icons-material/Search";
import { fetchNodes, setSearchTerm } from "../store/slices/nodesSlice";
import {
  selectFilteredNodes,
  selectSearchTerm,
  selectNodesLoading,
  selectNodesError,
} from "../store/selectors/nodesSelectors";
import Loader from "../components/global/Loader";
import ErrorDisplay from "../components/global/ErrorDisplay";

const columns = [
  { field: "id", headerName: "#", width: 90 },
  { field: "peerName", headerName: "Node Name", width: 200 },
  { field: "ip", headerName: "IP Address", width: 150 },
  { field: "location", headerName: "Country", width: 150 },
  { field: "network", headerName: "Network", width: 150 },
  { field: "networkDes", headerName: "Network Desc.", width: 150 },
  { field: "applicationVersion", headerName: "Version", width: 150 },
  { field: "p2pport", headerName: "P2P", width: 150 },
];

const Nodes = () => {
  const dispatch = useDispatch();
  const filteredNodes = useSelector(selectFilteredNodes);
  const searchTerm = useSelector(selectSearchTerm);
  const loading = useSelector(selectNodesLoading);
  const error = useSelector(selectNodesError);

  useEffect(() => {
    dispatch(fetchNodes());
  }, [dispatch]);

  const handleSearch = (event) => {
    dispatch(setSearchTerm(event.target.value));
  };

  const rows = filteredNodes.map((node, index) => ({
    id: index + 1,
    peerName: node.name,
    ip: node.ip,
    location: node.country,
    network: node.network,
    networkDes: node.netDescription,
    applicationVersion: node.version,
    p2pport: node.port6868,
  }));

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  return (
    <div style={{ paddingTop: "15px", paddingBottom: "15%" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography sx={{ fontSize: "20px" }}>{"[Nodes]"}</Typography>
      </Box>
      <DateComponent />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 2,
          marginRight: "10px",
        }}
      >
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

      <Card sx={{ margin: 2 }}>
        <CardContent>
          <div style={{ height: 600 }}>
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

export default Nodes;
