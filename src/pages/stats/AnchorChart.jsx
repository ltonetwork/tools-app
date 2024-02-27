import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { getStats } from "./getStats";
import Loader from "../../components/global/Loader";

const AnchorChart = () => {
  const [anchor, setAnchor] = useState([]);
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
        const data = await getStats("anchor");
        setAnchor(data);
      } catch (error) {
        console.error("Error fetching anchor data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartData = anchor.map(({ period, count }) => ({
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
              Anchor
            </Typography>
            {chartData.length > 0 ? (
              <LineChart
                width={w}
                height={h}
                fontSize={12}
                data={chartData}
                style={{ margin: "auto" }}
              >
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="period" />
                <YAxis domain={[0, maxCount]} />
                <Line type="linear" dataKey="count" stroke="#18a86a" />
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

export default AnchorChart;
