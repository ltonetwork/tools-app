import React from "react";
import { Typography } from "@mui/material";

const OperationsList = ({ operations, isMobile }) => {
  return (
    <>
      {operations
        .slice(0, 3)
        .reverse()
        .map((op, index) => (
          <div
            key={index}
            style={{
              display: isMobile ? "inline" : "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
            }}
          >
            <div>
              <Typography color="primary.sec">
                Date: {op.period.split(" ")[0]}
              </Typography>
            </div>
            <Typography
              style={{
                fontWeight: "bold",
              }}
              color="primary.sec"
            >
              Total: {op.count}
            </Typography>
          </div>
        ))}
    </>
  );
};

export default OperationsList;
