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
import Loader from "../../components/global/Loader";

const OverviewBottom = () => {
  const theme = useTheme();
  const Navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [nodes, setNodes] = useState([]);
  const [generators, setGenerators] = useState([]);
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
    } else if (action === "transactions") {
      Navigate("/transactions");
    }
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} md={6}>
        <Card
          sx={{
            minWidth: { xs: 150, sm: 300, md: 500 },
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
                      {loading ? (
                        <Loader />
                      ) : (gen.name?.length ?? 0) <= 15 ? (
                        gen.name
                      ) : (
                        `${gen.name.slice(0, 18)}...`
                      )}
                    </Typography>
                  </div>

                  <Typography color="primary.sec">
                    {loading ? (
                      <Loader />
                    ) : gen.address.length <= 15 ? (
                      gen.address
                    ) : (
                      `${gen.address.slice(0, 12)}...`
                    )}
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
              See all
            </Button>
          </CardActions>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={6}>
        <Card
          sx={{
            minWidth: { xs: 150, sm: 300, md: 500 },
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
                      {node.peerName.length <= 14
                        ? node.peerName
                        : `${node.peerName.slice(0, 15)}...`}
                    </Typography>
                  </div>
                  <Typography color="primary.sec">
                    {node.declaredAddress.split(":")[0]}
                  </Typography>
                  <Typography color="primary.sec">
                    {node.applicationVersion}
                  </Typography>
                </div>
              );
            })}
          </CardContent>
          <CardActions>
            <Button onClick={() => handleClick("nodes")} size="small">
              See all
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default OverviewBottom;
