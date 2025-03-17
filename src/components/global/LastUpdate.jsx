import React, { useEffect, useState, useCallback } from "react";
import { SCRIPT } from "../../services/config";
import { Typography } from "@mui/material";
import axios from "axios";

const LastUpdate = () => {
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    const fetchLastUpdate = async () => {
      try {
        const res = await axios.get(`${SCRIPT}/tools/last-updated`);
        setLastUpdate(res.data.lastUpdated);
      } catch (error) {
        console.error("Failed to fetch last update:", error);
        setLastUpdate(null);
      }
    };

    fetchLastUpdate();
  }, []);

  const formatTimestamp = useCallback((timestamp) => {
    if (!timestamp) return "---";

    const date = new Date(timestamp);
    return `${date.getUTCDate()} ${getMonthName(
      date.getUTCMonth()
    )} ${date.getUTCFullYear()} 
            ${padTime(date.getUTCHours())}:${padTime(
      date.getUTCMinutes()
    )}:${padTime(date.getUTCSeconds())} UTC`;
  }, []);

  const getMonthName = (monthIndex) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[monthIndex];
  };

  const padTime = (time) => time.toString().padStart(2, "0");

  return (
    <div style={{ paddingTop: "20px", paddingBottom: "10px" }}>
      <Typography
        style={{ display: "block", textAlign: "center" }}
        color="primary.sec"
      >
        Last updated: {formatTimestamp(lastUpdate)}
      </Typography>
    </div>
  );
};

export default LastUpdate;
