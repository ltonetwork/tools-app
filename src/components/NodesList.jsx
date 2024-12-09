import React from "react";
import { Typography } from "@mui/material";

const NodesList = ({ nodes, isMobile }) => {
  return (
    <>
      {nodes.slice(0, 3).map((node, index) => (
        <div
          key={index}
          style={{
            display: isMobile ? "inline" : "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
          }}
        >
          <div>
            <Typography
              style={{
                fontWeight: "bold",
              }}
              color="primary.sec"
            >
              {isMobile && node.peerName.length >= 14
                ? `${node.peerName.slice(0, 25)}`
                : node.peerName || (!isMobile && node.peerName.length >= 17)
                ? `${node.peerName.slice(0, 17)}`
                : node.peerName}
            </Typography>
          </div>
          <Typography color="primary.sec">
            {node.declaredAddress.split(":")[0]}
          </Typography>
          <Typography color="primary.sec">{`v${node.applicationVersion}`}</Typography>
        </div>
      ))}
    </>
  );
};

export default NodesList;
