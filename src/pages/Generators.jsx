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

const Generators = () => {
  const [generators, setGenerators] = useState([]);
  const [twenty4, setTwenty4] = useState(false);
  const [seven, setSeven] = useState(false);
  const [thirty, setThirty] = useState(false);

  useEffect(() => {
    axios.get(`${EXT_URL}/generators`).then((res) => {
      setGenerators(res.data);
    });
  });

  const handleClick = (action) => {
    if (action === "24") {
      setSeven(false);
      setThirty(false);
      setTwenty4(true);
    } else if (action === "seven") {
      setTwenty4(false);
      setThirty(false);
      setSeven(true);
    } else if (action === "thirty") {
      setTwenty4(false);
      setSeven(false);
      setThirty(true);
    }
  };

  return (
    <div>
      <DateComponent />
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <Button
          sx={{ margin: 1 }}
          onClick={() => handleClick("24")}
          variant="outlined"
          size="small"
        >
          Last 24hrs
        </Button>
        <Button
          sx={{ margin: 1 }}
          onClick={() => handleClick("seven")}
          variant="outlined"
          size="small"
        >
          Last 7days
        </Button>
        <Button
          sx={{ margin: 1 }}
          onClick={() => handleClick("thirty")}
          variant="outlined"
          size="small"
        >
          Last 30days
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Address</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Blocks Mined</TableCell>
              {twenty4 ? (
                <TableCell align="left">Blocks Mined (24hrs)</TableCell>
              ) : null}
              {seven ? (
                <TableCell align="left">Blocks Mined (week)</TableCell>
              ) : null}
              {thirty ? (
                <TableCell align="left">Blocks Mined(Month)</TableCell>
              ) : null}
              <TableCell align="left">Effective Balance</TableCell>
              <TableCell align="left">LTO Fees</TableCell>
              {twenty4 ? (
                <TableCell align="left">Fees (24hrs)</TableCell>
              ) : null}
              {seven ? <TableCell align="left">Fees (week)</TableCell> : null}
              {thirty ? <TableCell align="left">Fees (Month)</TableCell> : null}
              <TableCell align="left">Last Minted</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {generators.map((generator, index) => (
              <TableRow
                key={index + 1}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{generator.address}</TableCell>
                <TableCell align="left">
                  {generator.name ? generator.name : "-"}
                </TableCell>
                <TableCell align="left">{generator.blocksMined}</TableCell>
                {twenty4 ? (
                  <TableCell align="left">
                    {generator.stats.day.blocks}
                  </TableCell>
                ) : null}
                {seven ? (
                  <TableCell align="left">
                    {generator.stats.week.blocks}
                  </TableCell>
                ) : null}
                {thirty ? (
                  <TableCell align="left">
                    {generator.stats.month.blocks}
                  </TableCell>
                ) : null}
                <TableCell align="left">{generator.effectiveBalance}</TableCell>
                <TableCell align="left">{generator.fees}</TableCell>
                {twenty4 ? (
                  <TableCell align="left">{generator.stats.day.fees}</TableCell>
                ) : null}
                {seven ? (
                  <TableCell align="left">
                    {generator.stats.week.fees}
                  </TableCell>
                ) : null}
                {thirty ? (
                  <TableCell align="left">
                    {generator.stats.month.fees}
                  </TableCell>
                ) : null}
                <TableCell align="left">
                  {new Date(generator.lastMinted).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Generators;
