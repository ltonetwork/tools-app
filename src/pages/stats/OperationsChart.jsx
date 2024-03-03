import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Button, Typography } from "@mui/material";
import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Area,
  Tooltip,
} from "recharts";
import Loader from "../../components/global/Loader";
import { getOperations } from "./getStats";
import OperationsWeek from "./OperationsWeek";

const OperationsChart = () => {
  const [allTxs, setAllTxs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  const handlePeriodClick = (period) => {
    setSelectedPeriod(period);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allTx = await getOperations();
        setAllTxs(allTx);
      } catch (error) {
        console.error("Error fetching all tx data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const chartData = allTxs.map(({ period, count }) => ({
    period: period,
    count,
  }));

  const maxCount = Math.max(...chartData.map((item) => item.count));

  return (
    <div style={{ width: "100%", margin: 2 }}>
      <Card>
        {loading ? (
          <Loader />
        ) : (
          <CardContent
            style={{
              paddingTop: "15px",
              paddingBottom: "15px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
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
              Network Operations
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
              <Button
                sx={{ margin: 1 }}
                onClick={() => handlePeriodClick("week")}
                variant={selectedPeriod === "week" ? "contained" : "outlined"}
                size="small"
              >
                Week
              </Button>
              <Button
                sx={{ margin: 1 }}
                onClick={() => handlePeriodClick("month")}
                variant={selectedPeriod === "month" ? "contained" : "outlined"}
                size="small"
              >
                Last 3 months
              </Button>
            </Box>
            {selectedPeriod === "week" ? (
              <OperationsWeek />
            ) : selectedPeriod === "month" && chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData} fontSize={12}>
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8F61D0" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8F61D0" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="period" />
                  <YAxis domain={[0, maxCount]} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#8F61D0"
                    strokeWidth={2} // Thickness of line border
                    fill="url(#colorUv)" // Fill with linear gradient
                    fillOpacity={1}
                  />
                </AreaChart>
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

export default OperationsChart;
