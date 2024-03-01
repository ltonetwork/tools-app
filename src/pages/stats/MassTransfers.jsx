import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { getStats } from "./getStats";
import Loader from "../../components/global/Loader";

const MassTransfers = () => {
  const [massTransfer, setMassTransfer] = useState([]);
  const [loading, setLoading] = useState(true);

  const [w, setW] = useState(600);
  const [h, setH] = useState(300);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 250 && window.innerWidth <= 400) {
        setW(250);
        setH(180);
      } else if (window.innerWidth > 400 && window.innerWidth <= 800) {
        setW(400);
        setH(300);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const massTransferData = await getStats("mass_transfer");
        setMassTransfer(massTransferData);
      } catch (error) {
        console.error("Error fetching mass transfer data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Extracting dates and counts from massTransfer data and formatting the date
  const chartData = massTransfer.map(({ period, count }) => ({
    period: period ? period : "",
    count,
  }));

  // the maximum count value
  const maxCount = Math.max(...chartData.map((item) => item.count));

  return (
    <div style={{ width: "100%" }}>
      <Card>
        {loading ? (
          <Loader />
        ) : (
          <CardContent
            style={{
              paddingTop: "15px",
              paddingBottom: "15px",
              textAlign: "center",
              width: "100%",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: 18,
              }}
              color="primary.sec"
              gutterBottom
            >
              Mass Transfer
            </Typography>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData} fontSize={12}>
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="period" />
                  <YAxis domain={[0, maxCount]} />
                  <Tooltip />
                  <Line type="linear" dataKey="count" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <Typography>No data available</Typography>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default MassTransfers;
