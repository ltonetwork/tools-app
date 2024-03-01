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
  Area,
  Tooltip,
} from "recharts";
import Loader from "../../components/global/Loader";
import { getOperations } from "./getStats";

const OperationsWeek = () => {
  const [allTxs, setAllTxs] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const filteredData = allTxs?.filter(({ period }) => {
    const currentDate = new Date();
    const txDate = new Date(period);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(currentDate.getDate() - 7);
    return txDate >= oneWeekAgo;
  });

  const chartData = filteredData.map(({ period, count }) => ({
    period: period.split(" ")[0],
    count,
  }));

  const maxCount = Math.max(...chartData.map((item) => item.count));

  return (
    <div style={{ width: "100%", margin: 2 }}>
      {chartData.length > 0 && (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} fontSize={12}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="period" />
            <YAxis domain={[0, maxCount]} />
            <Tooltip />
            <Line
              type="linear"
              dataKey="count"
              stroke="#9225B2"
              // dot={false}
            />
            <Area
              type="monotone"
              dataKey="count"
              fill="#9225B2"
              fillOpacity={0.3}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default OperationsWeek;
