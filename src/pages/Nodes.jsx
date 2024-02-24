import React, { useEffect, useState } from "react";
import axios from "axios";
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
import DateComponent from "../components/global/DateComponent";
import { EXT_URL } from "../utils/config";

const Nodes = () => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    axios.get(`${EXT_URL}/peers`).then((res) => {
      setNodes(res.data);
    });
  });

  return (
    <div>
      <DateComponent />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Node Name</TableCell>
              <TableCell align="left">IP Address</TableCell>
              <TableCell align="left">Country</TableCell>
              <TableCell align="left">Network</TableCell>
              <TableCell align="left">Version</TableCell>
              <TableCell align="left">P2P</TableCell>
              <TableCell align="left">Last Seen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nodes.map((node, index) => (
              <TableRow
                key={index + 1}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{node.peerName}</TableCell>
                <TableCell align="left">{node.ip}</TableCell>
                <TableCell align="left">{node.location.country}</TableCell>
                <TableCell align="left">{node.isp}</TableCell>
                <TableCell align="left">{node.applicationVersion}</TableCell>
                <TableCell align="left">
                  {node.p2pport == ":6868" || ":6863" ? "open" : "-"}
                </TableCell>
                <TableCell align="left">
                  {new Date(node.lastSeen).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Nodes;
