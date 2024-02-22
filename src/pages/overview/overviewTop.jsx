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

const OverviewTop = () => {
  const theme = useTheme();
  const Navigate = useNavigate();
  const [coinPrice, setCoinPrice] = useState(null);
  const [nodes, setNodes] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [marketCap, setMarketCap] = useState(null);
  axios
    .get("https://api.coingecko.com/api/v3/simple/price", {
      params: {
        ids: "lto-network",
        vs_currencies: "usd",
        include_market_cap: true,
      },
    })
    .then((response) => {
      const data = response.data;
      setCoinPrice(data["lto-network"].usd);
      setMarketCap(data["lto-network"].usd_market_cap);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  useEffect(() => {
    axios
      .get(`${BASE_URL}peers/connected`)
      .then((res) => {
        const data = res.data.peers;
        const numberOfNodes = data.reduce((count, item) => {
          return count + 1;
        }, 0);
        setNodes(numberOfNodes);
      })
      .catch((error) => {
        console.error("Errors fetching the node data", error);
      });
  }, []);

  const handleClick = (action) => {
    if (action === "nodes") {
      Navigate("/nodes");
    }
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{
            minWidth: { xs: 150, sm: 250, md: 300 },
            margin: 2,
            background: "linear-gradient(to right, #c2c5f0, #d3e9f6)",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", //v,h,spread,color
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
              Price
            </Typography>
            <Typography
              style={{
                fontSize: "28px",
                fontWeight: 500,
              }}
              color="primary.sec"
              component="div"
            >
              ${coinPrice ? coinPrice : "---"}
            </Typography>
            <Typography sx={{ mb: 1.5, mt: 2 }} color="primary.sec">
              (Coingecko)
            </Typography>
          </CardContent>
          {/* <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions> */}
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{
            minWidth: { xs: 150, sm: 250, md: 300 },
            margin: 2,
            background: "linear-gradient(to right, #c2c5f0, #d3e9f6)",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
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
              Market Cap
            </Typography>
            <Typography
              style={{
                fontSize: "28px",
                fontWeight: 500,
              }}
              color="primary.sec"
              component="div"
            >
              ${marketCap ? Math.floor(marketCap).toLocaleString() : "---"}
            </Typography>
            <Typography sx={{ mb: 1.5, mt: 2 }} color="primary.sec">
              (Coingecko)
            </Typography>
          </CardContent>
          {/* <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions> */}
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{
            minWidth: { xs: 150, sm: 250, md: 300 },
            margin: 2,
            background: "linear-gradient(to right, #c2c5f0, #d3e9f6)",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
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
              Current APR
            </Typography>
            <Typography
              style={{
                fontSize: "28px",
                fontWeight: 500,
              }}
              color="primary.sec"
              component="div"
            >
              14%
            </Typography>
            <Typography sx={{ mb: 1.5, mt: 2 }} color="primary.sec">
              (Chain)
            </Typography>
          </CardContent>
          {/* <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions> */}
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{
            minWidth: { xs: 150, sm: 250, md: 300 },
            margin: 2,
            background: "linear-gradient(to right, #c2c5f0, #d3e9f6)",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
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
              Burned Tokens
            </Typography>
            <Typography
              style={{
                fontSize: "28px",
                fontWeight: 500,
              }}
              color="primary.sec"
              component="div"
            >
              2,400,222M LTO
            </Typography>
            {/* <Typography sx={{ mb: 1.5, mt: 2 }} color="primary.sec">
              (Coingecko)
            </Typography> */}
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{
            minWidth: { xs: 150, sm: 250, md: 300 },
            margin: 2,
            background: "linear-gradient(to right, #c2c5f0, #d3e9f6)",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
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
              Nodes
            </Typography>
            <Typography
              style={{
                fontSize: "28px",
                fontWeight: 500,
              }}
              color="primary.sec"
              component="div"
            >
              {nodes ? nodes : "---"}
            </Typography>
            {/* <Typography sx={{ mb: 1.5, mt: 2 }} color="primary.sec">
              (Coingecko)
            </Typography> */}
          </CardContent>
          <CardActions>
            <Button onClick={() => handleClick("nodes")} size="small">
              Learn More
            </Button>
          </CardActions>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{
            minWidth: { xs: 150, sm: 250, md: 300 },
            margin: 2,
            background: "linear-gradient(to right, #c2c5f0, #d3e9f6)",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
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
              Addresses
            </Typography>
            <Typography
              style={{
                fontSize: "28px",
                fontWeight: 500,
              }}
              color="primary.sec"
              component="div"
            >
              17000
            </Typography>
            {/* <Typography sx={{ mb: 1.5, mt: 2 }} color="primary.sec">
              
            </Typography> */}
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};
export default OverviewTop;
