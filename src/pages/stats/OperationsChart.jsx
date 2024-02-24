import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import axios from "axios";
import { getStats } from "./getStats";

const LegendComponent = () => (
  <div style={{ display: "flex", justifyContent: "center" }}>
    <div>
      <span style={{ color: "#8884d8", marginRight: "7px" }}>Data 1</span>
      <span style={{ color: "#82ca9d", marginRight: "7px" }}>Data 2</span>
      <span style={{ color: "#ffc658", marginRight: "7px" }}>Data 3</span>
      <span style={{ color: "#ff7300", marginRight: "7px" }}>Data 4</span>
      <span style={{ color: "#00bcd4", marginRight: "7px" }}>Data 5</span>
      <span style={{ color: "#ff0000", marginRight: "7px" }}>Data 6</span>
      <span style={{ color: "#00ff00" }}>Data 7</span>
    </div>
  </div>
);

const types = [
  "transfer",
  "lease",
  "mass_transfer",
  "all_transfers",
  "data",
  "anchor",
  "association",
  "burn",
];

const OperationsChart = () => {
  const [transfer, setTransfer] = useState([]);
  const [allTransfer, setAllTransfer] = useState([]);
  const [lease, setLease] = useState([]);
  const [massTransfer, setMassTransfer] = useState([]);
  const [anchor, setAnchor] = useState([]);
  const [association, setAssociation] = useState([]);
  const [burn, setBurn] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      for (const type of types) {
        let output = await getStats(type);
        switch (type) {
          case "transfer":
            setTransfer(output);
            break;
          case "lease":
            setLease(output);
            break;
          case "mass_transfer":
            setMassTransfer(output);
            break;
          case "all_transfers":
            setAllTransfer(output);
            break;
          case "association":
            setAssociation(output);
            break;
          case "anchor":
            setAnchor(output);
            break;
          case "burn":
            setBurn(output);
            break;
          default:
            break;
        }
      }
    };

    fetchData();
  }, []);

  // Combine all data into one array
  const allData = [
    ...transfer,
    ...allTransfer,
    ...lease,
    ...massTransfer,
    ...anchor,
    ...association,
    ...burn,
  ];

  // Find the maximum count value
  const maxCount = Math.max(...allData.map((item) => item.count));

  // Generate dates for the last 3 months
  const currentDate = new Date();
  const lastThreeMonths = [];
  for (let i = 1; i <= 90; i++) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - i);
    lastThreeMonths.push(date.toISOString().slice(0, 10)); // Assuming the API returns dates in ISO format
  }

  return (
    <div>
      <Card>
        <div
          style={{
            paddingTop: "15px",
            paddingBottom: "15px",
            textAlign: "center",
          }}
        >
          <LineChart
            width={1200}
            height={300}
            data={allData}
            style={{ margin: "auto" }}
          >
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="period" />
            <YAxis domain={[0, maxCount]} />
            {types.map((type, index) => (
              <Line
                key={index}
                type="linear"
                dataKey={`data${index + 1}`}
                stroke={getColor(type)}
              />
            ))}
          </LineChart>
          <LegendComponent />
        </div>
      </Card>
    </div>
  );
};

// Function to get color based on type
const getColor = (type) => {
  switch (type) {
    case "transfer":
      return "#8884d8";
    case "lease":
      return "#82ca9d";
    case "mass_transfer":
      return "#ffc658";
    case "all_transfers":
      return "#ff7300";
    case "association":
      return "#00bcd4";
    case "anchor":
      return "#ff0000";
    case "burn":
      return "#00ff00";
    default:
      return "#000000";
  }
};

export default OperationsChart;
