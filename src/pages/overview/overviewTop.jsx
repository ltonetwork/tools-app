import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
import { BASE_URL, EXT_URL, EXT_URL2, STATS } from "../../utils/config";
import { getApy } from "../../utils/getAPY";

const OverviewTop = () => {
  const theme = useTheme();
  const Navigate = useNavigate();
  const [coinPrice, setCoinPrice] = useState(null);
  const [nodes, setNodes] = useState(null);
  const [apy, setApy] = useState(null);
  const [generators, setGenerators] = useState([]);
  const [burned, setBurned] = useState(0);
  const [supply, setSupply] = useState(0);
  const [blockHeight, setBlockHeight] = useState();
  // const [loading, setLoading] = useState(true);
  const [marketCap, setMarketCap] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supplyResponse = await axios.get(`${STATS}/suuply/total`);
        const res = await axios.get(`${BASE_URL}supply`);
        setBlockHeight(res.data.height);
        setBurned(res.data.burned / 100000000);
        setSupply(supplyResponse);

        // Fetch peer data
        const peersResponse = await axios.get(`${EXT_URL2}/nodes/json`);
        const peersData = peersResponse.data;
        const numberOfNodes = peersData.length;
        setNodes(numberOfNodes);

        // Fetch generator data
        const generatorsResponse = await axios.get(`${EXT_URL}/generators`);
        const generatorsData = generatorsResponse.data;
        let value = generatorsData.length;
        setGenerators(value);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        // const priceResponse = await axios.get(
        //   "https://api.binance.com/api/v3/ticker/price?symbol=LTOUSDT"
        // );

        const marketResponse = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price",
          {
            params: {
              ids: "lto-network",
              vs_currencies: "usd",
              include_market_cap: true,
            },
          }
        );

        const apyData = await getApy();
        setApy(apyData.toFixed(3) + "%");

        const marketData = marketResponse.data;
        setCoinPrice(marketData["lto-network"].usd);
        setMarketCap(marketData["lto-network"].usd_market_cap);
        const price = priceResponse.data.price;
        setCoinPrice(parseFloat(price).toFixed(3));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  const handleClick = (action) => {
    if (action === "nodes") {
      Navigate("/nodes");
    } else if (action === "generators") {
      Navigate("/generators");
    } else if (action == "stats") {
      Navigate("/stats");
    } else if (action == "blocks") {
      Navigate("/blocks");
    }
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <Card
            sx={{
              minWidth: { xs: 150, sm: 250, md: 250 },
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
          <Button size="small">more</Button>
        </CardActions> */}
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={3}>
          <Card
            sx={{
              minWidth: { xs: 150, sm: 250, md: 250 },
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
          <Button size="small">more</Button>
        </CardActions> */}
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={3}>
          <Card
            sx={{
              minWidth: { xs: 150, sm: 250, md: 250 },
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
                Estimated APY
              </Typography>
              <Typography
                style={{
                  fontSize: "28px",
                  fontWeight: 500,
                }}
                color="primary.sec"
                component="div"
              >
                {apy}
              </Typography>
              {/* <Typography sx={{ mb: 1.5, mt: 2 }} color="primary.sec">
            (More Stats)
          </Typography> */}
            </CardContent>
            <CardActions>
              <Link
                to="https://blog.ltonetwork.com/tokenomics-update/"
                target="_blank"
              >
                <Button size="small">more</Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={3}>
          <Card
            sx={{
              minWidth: { xs: 150, sm: 250, md: 250 },
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
                Total Supply
              </Typography>
              <Typography
                style={{
                  fontSize: "28px",
                  fontWeight: 500,
                }}
                color="primary.sec"
                component="div"
              >
                {Math.floor(supply)} LTO
              </Typography>
              {/* <Typography sx={{ mb: 1.5, mt: 2 }} color="primary.sec">
            (Coingecko)
          </Typography> */}
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => {
                  handleClick("stats");
                }}
              >
                more
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={3}>
          <Card
            sx={{
              minWidth: { xs: 110, sm: 250, md: 250 },
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
                {Math.floor(burned)} LTO
              </Typography>
              {/* <Typography sx={{ mb: 1.5, mt: 2 }} color="primary.sec">
            (Coingecko)
          </Typography> */}
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => {
                  handleClick("stats");
                }}
              >
                more
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={3}>
          <Card
            sx={{
              minWidth: { xs: 150, sm: 250, md: 250 },
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
                more
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={3}>
          <Card
            sx={{
              minWidth: { xs: 150, sm: 250, md: 250 },
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
                Generators
              </Typography>
              <Typography
                style={{
                  fontSize: "28px",
                  fontWeight: 500,
                }}
                color="primary.sec"
                component="div"
              >
                {generators}
              </Typography>
              {/* <Typography sx={{ mb: 1.5, mt: 2 }} color="primary.sec">
            
          </Typography> */}
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => handleClick("generators")}>
                more
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={3}>
          <Card
            sx={{
              minWidth: { xs: 150, sm: 250, md: 250 },
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
                Current Block Height
              </Typography>
              <Typography
                style={{
                  fontSize: "28px",
                  fontWeight: 500,
                }}
                color="primary.sec"
                component="div"
              >
                {blockHeight}
              </Typography>
              {/* <Typography sx={{ mb: 1.5, mt: 2 }} color="primary.sec">
            
          </Typography> */}
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => handleClick("blocks")}>
                more
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
export default OverviewTop;
