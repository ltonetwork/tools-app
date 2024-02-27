import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Button, Typography } from "@mui/material";
import { PieChart, Pie, Tooltip, Legend } from "recharts";
import Loader from "../../components/global/Loader";
import { EXT_URL } from "../../utils/config";

const GeneratorShare = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [generators, setGenerators] = useState([]);
  const [twenty4, setTwenty4] = useState(true);
  const [seven, setSeven] = useState(false);
  const [thirty, setThirty] = useState(false);

  const [w, setW] = useState(500);
  const [h, setH] = useState(300);
  const [r, setR] = useState(120);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 400) {
        setW(300);
        setH(200);
        setR(70);
      } else if (window.innerWidth > 400 && window.innerWidth <= 800) {
        setW(500);
        setH(300);
        setR(100);
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
        const response = await axios.get(`${EXT_URL}/generators`);
        const sortedGenerators = response.data.sort(
          (a, b) => b.stats.day.blocks - a.stats.day.blocks
        );
        setGenerators(sortedGenerators.slice(0, 15));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    transformChart();
  }, [twenty4, seven, thirty, generators]);

  const transformChart = () => {
    const transformedData = generators.map((generator) => ({
      name: generator.name,
      blocks: twenty4
        ? generator.stats.day.blocks
        : seven
        ? generator.stats.week.blocks
        : generator.stats.month.blocks,
    }));
    setData(transformedData);
  };

  const handleClick = (action) => {
    if (action === "24") {
      setSeven(false);
      setThirty(false);
      setTwenty4(true);
    } else if (action === "seven") {
      setTwenty4(false);
      setThirty(false);
      setSeven(true);
    } else if (action === "thirty") {
      setTwenty4(false);
      setSeven(false);
      setThirty(true);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={{ width: "100%" }}>
      <Card>
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
            Blocks Minted by Top 15 Generators
          </Typography>
          <div style={{ textAlign: "center", marginBottom: "5px" }}>
            <Button
              sx={{ margin: 1 }}
              onClick={() => handleClick("24")}
              variant={twenty4 ? "contained" : "outlined"}
              size="small"
            >
              Last 24hrs
            </Button>
            <Button
              sx={{ margin: 1 }}
              onClick={() => handleClick("seven")}
              variant={seven ? "contained" : "outlined"}
              size="small"
            >
              Last 7days
            </Button>
            <Button
              sx={{ margin: 1 }}
              onClick={() => handleClick("thirty")}
              variant={thirty ? "contained" : "outlined"}
              size="small"
            >
              Last 30days
            </Button>
          </div>
          {generators.length > 0 ? (
            <PieChart width={w} height={h} style={{ textAlign: "center" }}>
              <Pie
                data={data}
                dataKey="blocks"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={r}
                fill="#8884d8"
                label
              />
              <Tooltip />
              {/* <Legend /> */}
            </PieChart>
          ) : (
            <Typography>No data available</Typography>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneratorShare;
