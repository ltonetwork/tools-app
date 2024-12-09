import React, { useEffect, useState } from "react";
import { SCRIPT } from "../../services/config";
import { Typography } from "@mui/material";
import axios from "axios";

const LastUpdate = () => {
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    axios
      .get(`${SCRIPT}/blocks-daily`)
      .then((res) => {
        const responses = res.data;
        let timestamps = responses
          .slice()
          .reverse()
          .map((res) => {
            return res.timestamp;
          });
        const latestTimestamp = timestamps.length > 0 ? timestamps[0] : null;
        setLastUpdate(latestTimestamp);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "---";
    const date = new Date(timestamp);
    return `${date.getUTCDate()} ${getMonthName(
      date.getUTCMonth()
    )} ${date.getUTCFullYear()} ${padTime(date.getUTCHours())}:${padTime(
      date.getUTCMinutes()
    )}:${padTime(date.getUTCSeconds())} UTC`;
  };

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

  const padTime = (time) => {
    return time.toString().padStart(2, "0");
  };

  return (
    <div style={{ paddingTop: "20px", paddingBottom: "10px" }}>
      <Typography
        style={{ display: "block", textAlign: "center" }}
        color="primary.sec"
      >
        last updated: {formatTimestamp(lastUpdate)}
      </Typography>
    </div>
  );
};

export default LastUpdate;
