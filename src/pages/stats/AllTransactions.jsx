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
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Loader from "../../components/global/Loader";
import { getStats } from "./getStats";

const AllTransactions = () => {
  const [allTxs, setAllTxs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allTx = await getStats("all");
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
              Transactions
            </Typography>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData} fontSize={12}>
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="period" />
                  <YAxis domain={[0, maxCount]} />
                  <Tooltip />
                  <Line type="linear" dataKey="count" stroke="#9225B2" />
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

export default AllTransactions;
