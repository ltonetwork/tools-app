import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { BASE_URL } from "../utils/config";

const Nodes = () => {
  const [data, setData] = useState([]);
  const [ipInfo, setIpInfo] = useState({});

  useEffect(() => {
    axios
      .get(`${BASE_URL}peers/connected`)
      .then((res) => {
        const nodes = res.data.peers;
        setData(nodes);
        console.log(nodes);

        // Fetch IP information for all nodes
        const fetchIpInfoPromises = nodes.map((node) =>
          fetchIpInfo(getIP(node.declaredAddress))
        );

        // Wait for all IP information requests to complete
        Promise.all(fetchIpInfoPromises)
          .then((ipInfos) => {
            const ipInfoMap = {};
            ipInfos.forEach((ipInfo, index) => {
              const ip = nodes[index].declaredAddress.split(":")[0];
              ipInfoMap[ip] = ipInfo;
            });
            setIpInfo(ipInfoMap);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => {
        console.error("Errors fetching the node data", error);
      });
  }, []);

  const getIP = (address) => {
    const ip = address.split(":");
    return ip[0];
  };

  const fetchIpInfo = async (ipAddress) => {
    try {
      const res = await axios.get(`http://ip-api.com/json/${ipAddress}`);
      const ipinfo = res.data;
      return { countryCode: ipinfo.countryCode, isp: ipinfo.isp };
    } catch (error) {
      console.error(error);
      return { countryCode: "", isp: "" };
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Node name</TableCell>
            <TableCell align="center">IP address</TableCell>
            <TableCell align="center">Country</TableCell>
            <TableCell align="center">ISP</TableCell>
            <TableCell align="center">Version</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((node, index) => (
            <TableRow
              key={node.peerName}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell component="th" scope="row">
                {node.peerName}
              </TableCell>
              <TableCell align="center">
                {getIP(node.declaredAddress)}
              </TableCell>
              <TableCell align="center">
                {ipInfo[getIP(node.declaredAddress)]?.countryCode}
              </TableCell>
              <TableCell align="center">
                {ipInfo[getIP(node.declaredAddress)]?.isp}
              </TableCell>
              <TableCell align="center">{node.applicationVersion}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Nodes;
