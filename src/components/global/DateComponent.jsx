import React, { useState, useEffect } from "react";
import { useTheme, Typography } from "@mui/material";

const DateComponent = () => {
  const theme = useTheme();
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    getFormattedDate();
  }, []);

  const getFormattedDate = () => {
    const currentDate = new Date();
    const options = {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "UTC",
    };
    const formattedDateString = currentDate.toLocaleString("en-US", options);
    setFormattedDate(formattedDateString);
  };

  return (
    <div style={{ paddingTop: "20px", paddingBottom: "10px" }}>
      <Typography
        style={{ display: "block", textAlign: "center" }}
        color="primary.sec"
      >
        current date: {formattedDate} UTC
      </Typography>
    </div>
  );
};

export default DateComponent;
