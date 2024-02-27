import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
  useTheme,
} from "@mui/material";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import Loader from "../../components/global/Loader";
import { getStats } from "./getStats";

const AllTransfers = () => {
  const [allTransfers, setAllTransfers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [w, setW] = useState(600);
  const [h, setH] = useState(300);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 400) {
        setW(300);
        setH(200);
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
        const allTransfersData = await getStats("all_transfers");
        setAllTransfers(allTransfersData);
      } catch (error) {
        console.error("Error fetching all transfers data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartData = allTransfers.map(({ period, count }) => ({
    period: period.split(" ")[0],
    count,
  }));

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
              All Transfer
            </Typography>
            {chartData.length > 0 ? (
              <LineChart
                width={w}
                height={h}
                data={chartData}
                fontSize={12}
                style={{ margin: "auto" }}
              >
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="period" />
                <YAxis domain={[0, maxCount]} />
                <Line type="linear" dataKey="count" stroke="#ffc658" />
              </LineChart>
            ) : (
              <Typography>No data available</Typography>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default AllTransfers;
