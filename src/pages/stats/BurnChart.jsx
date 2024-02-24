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
import { getStats } from "./getStats";
import Loader from "../../components/global/Loader";

const BurnChart = () => {
  let period = "2024-01-13 00:00:00";
  let count = 0;
  const [burn, setBurn] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStats("burn");
      setBurn(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const chartData = burn.map(({ period, count }) => ({
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
              Burn
            </Typography>
            <LineChart
              width={700}
              height={300}
              data={chartData}
              style={{ margin: "auto" }}
            >
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="period" />
              <YAxis domain={[0, maxCount]} />
              <Line type="linear" dataKey="count" stroke="#cf1504" />
            </LineChart>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default BurnChart;