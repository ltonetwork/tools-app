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

const AssociationsChart = () => {
  const [associations, setAssociations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStats("association");
      setAssociations(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const chartData = associations.map(({ period, count }) => ({
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
              Associations
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
              <Line type="linear" dataKey="count" stroke="#18a86a" />
            </LineChart>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default AssociationsChart;
