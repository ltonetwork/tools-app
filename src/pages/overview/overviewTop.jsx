import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { BASE_URL, STATS } from "../../utils/config";
import { getApy, getGenerators, getNodeNumber, MarketInfo } from "../../utils";
import Loader from "../../components/global/Loader";

const OverviewTop = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [coinPrice, setCoinPrice] = useState(null);
  const [nodes, setNodes] = useState(null);
  const [apy, setApy] = useState(null);
  const [generators, setGenerators] = useState([]);
  const [burned, setBurned] = useState(0);
  const [supply, setSupply] = useState(0);
  const [blockHeight, setBlockHeight] = useState();
  const [loading, setLoading] = useState(true); // Loading state
  const [marketCap, setMarketCap] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supplyResponse = await axios.get(
          `${STATS}/stats/supply/circulating`
        );

        setSupply(supplyResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setNodes(await getNodeNumber());
        setGenerators(await getGenerators());

        const res = await axios.get(`${BASE_URL}supply`);
        setBlockHeight(res.data.height);
        setBurned(res.data.burned / 100000000);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const apyData = await getApy();
        setApy(apyData.toFixed(3) + "%");

        const marketData = await MarketInfo.getMarketInfo();

        setCoinPrice(
          marketData?.geckoPrice
            ? marketData?.geckoPrice
            : marketData.binancePrice
        );
        setMarketCap(
          marketData?.geckoMarketCap
            ? marketData?.geckoMarketCap
            : marketData.estimatedMarketCap
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  const handleClick = (action) => {
    if (action === "nodes") {
      navigate("/nodes");
    } else if (action === "generators") {
      navigate("/generators");
    } else if (action === "stats") {
      navigate("/stats");
    } else if (action === "blocks") {
      navigate("/blocks");
    }
  };

  return (
    <div>
      {loading && (
        <div
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            background: "rgba(255, 255, 255, 0.8)",
            zIndex: 9999,
          }}
        >
          <Loader />
        </div>
      )}
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
                Circulating Supply
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

        {/* <Grid item xs={12} sm={6} md={6} lg={3}>
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
        </Grid> */}

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
                Generators (last 30 days)
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
