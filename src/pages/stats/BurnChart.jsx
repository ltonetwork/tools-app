import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { getStats } from "./getStats";
import Loader from "../../components/global/Loader";

const BurnChart = () => {
  const [burn, setBurn] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStats("burn");
        setBurn(data);
      } catch (error) {
        console.error("Error fetching burn data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartData = burn.map(({ period, count }) => ({
    period: period ? period.split(" ")[0] : "",
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
