import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { EXT_URL } from "../../utils/config";

const OverviewBottom = () => {
  const theme = useTheme();
  const Navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [nodes, setNodes] = useState([]);
  const [generators, setGenerators] = useState([]);
  const [operations, setOperations] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 700) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    const past = new Date(currentDate);
    past.setDate(past.getDate() - 3);

    axios
      .get(`${BASE_URL}peers/connected`)
      .then((res) => {
        const nodes = res.data.peers;
        setNodes(nodes);
      })
      .catch((error) => {
        console.error("Errors fetching the node data", error);
      });

    axios
      .get(`${BASE_URL}index/stats/operations/${past}/${currentDate}`)
      .then((res) => {
        const response = res.data;
        setOperations(response);
      })
      .catch((error) => {
        console.error("Errors fetching the node data", error);
      });

    axios
      .get(`${EXT_URL}/generators`)
      .then((res) => {
        const gen = res.data;
        const value = gen.filter((val) => val.name && val.name.length > 1);
        setGenerators(value);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Errors fetching the node data", error);
      });
  }, []);

  const handleClick = (action) => {
    if (action === "nodes") {
      Navigate("/nodes");
    } else if (action === "generators") {
      Navigate("/generators");
    } else if (action === "operations") {
      Navigate("/stats");
    }
  };

  return (
    <Grid container spacing={1}>
      {/* <Grid item xs={12} sm={12} md={6}>
        <Card
          sx={{
            minWidth: { xs: 150, sm: 250, md: 300 },
            margin: 2,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fefeff",
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                fontSize: 18,
              }}
              color="primary.sec"
              gutterBottom
            >
              <span
                style={{
                  background: "linear-gradient(to right, #c2c5f0, #d3e9f6)",
                  paddingTop: "4px",
                  paddingBottom: "4px",
                  paddingLeft: "8px",
                  paddingRight: "8px",
                  borderRadius: "4px",
                }}
              >
                Generators
              </span>
            </Typography>

            {generators.slice(0, 3).map((gen) => {
              return (
                <div
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
                      {isMobile && (gen.name?.length ?? 0) >= 15
                        ? `${gen.name.slice(0, 20)}...`
                        : gen.name ||
                          (!isMobile && (gen.name?.length ?? 0) >= 15)
                        ? `${gen.name.slice(0, 12)}...`
                        : gen.name}
                    </Typography>
                  </div>

                  <Typography color="primary.sec">
                    {isMobile && gen.address.length >= 10
                      ? `addr: ${gen.address.slice(0, 16)}...`
                      : gen.address || (!isMobile && gen.address.length >= 15)
                      ? `addr: ${gen.address.slice(0, 9)}...`
                      : gen.address}
                  </Typography>

                  <Typography color="primary.sec">
                    {gen.effectiveBalance} LTO
                  </Typography>
                </div>
              );
            })}
          </CardContent>
          <CardActions>
            <Button onClick={() => handleClick("nodes")} size="small">
              more
            </Button>
          </CardActions>
        </Card>
      </Grid> */}

      <Grid item xs={12} sm={12} md={6}>
        <Card
          sx={{
            minWidth: { xs: 150, sm: 250, md: 300 },
            margin: 2,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fefeff",
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                fontSize: 18,
              }}
              color="primary.sec"
              gutterBottom
            >
              <span
                style={{
                  background: "linear-gradient(to right, #c2c5f0, #d3e9f6)",
                  paddingTop: "4px",
                  paddingBottom: "4px",
                  paddingLeft: "8px",
                  paddingRight: "8px",
                  borderRadius: "4px",
                }}
              >
                Operations
              </span>
            </Typography>

            {operations
              .slice(0, 3)
              .reverse()
              .map((op) => {
                return (
                  <div
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

                    {/* <Typography color="primary.sec">
                    {gen.effectiveBalance} LTO
                  </Typography> */}
                  </div>
                );
              })}
          </CardContent>
          <CardActions>
            <Button onClick={() => handleClick("operations")} size="small">
              more
            </Button>
          </CardActions>
        </Card>
      </Grid>

      <Grid item xs={12} sm={12} md={6}>
        <Card
          sx={{
            minWidth: { xs: 150, sm: 250, md: 300 },
            margin: 2,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fefeff",
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                fontSize: 18,
              }}
              color="primary.sec"
              gutterBottom
            >
              <span
                style={{
                  background: "linear-gradient(to right, #c2c5f0, #d3e9f6)",
                  paddingTop: "4px",
                  paddingBottom: "4px",
                  paddingLeft: "8px",
                  paddingRight: "8px",
                  borderRadius: "4px",
                }}
              >
                Nodes
              </span>
            </Typography>

            {nodes.slice(0, 3).map((node) => {
              return (
                <div
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
                        : node.peerName ||
                          (!isMobile && node.peerName.length >= 17)
                        ? `${node.peerName.slice(0, 17)}`
                        : node.peerName}
                    </Typography>
                  </div>
                  <Typography color="primary.sec">
                    {node.declaredAddress.split(":")[0]}
                  </Typography>
                  <Typography color="primary.sec">
                    {`v${node.applicationVersion}`}
                  </Typography>
                </div>
              );
            })}
          </CardContent>
          <CardActions>
            <Button onClick={() => handleClick("nodes")} size="small">
              more
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default OverviewBottom;
