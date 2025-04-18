import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { fetchMarketData } from "../../store/slices/marketSlice";
import { fetchNetworkData } from "../../store/slices/networkSlice";
import {
  selectPrice,
  selectMarketCap,
  selectApy,
  selectMarketLoading,
  selectMarketError,
} from "../../store/selectors/marketSelectors";
import {
  selectNodes,
  selectGenerators,
  selectBlockHeight,
  selectNetworkLoading,
  selectNetworkError,
} from "../../store/selectors/networkSelectors";
import ErrorDisplay from "../../components/global/ErrorDisplay";
import StatCard from "../../components/global/StatCard";
import SkeletonStatCard from "../../components/global/SkeletonStatCard";
import { fetchTokenSupply } from "../../store/slices/tokenSupplySlice";

const OverviewTop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const price = useSelector(selectPrice);
  const marketCap = useSelector(selectMarketCap);
  const apy = useSelector(selectApy);
  const marketLoading = useSelector(selectMarketLoading);
  const marketError = useSelector(selectMarketError);

  const nodes = useSelector(selectNodes);
  const generators = useSelector(selectGenerators);
  const blockHeight = useSelector(selectBlockHeight);
  const networkLoading = useSelector(selectNetworkLoading);
  const networkError = useSelector(selectNetworkError);

  const { burnedSupply, circulatingMainnet } = useSelector(
    (state) => state.tokenSupply
  );

  useEffect(() => {
    // Initial data fetch
    dispatch(fetchMarketData());
    dispatch(fetchNetworkData());
    dispatch(fetchTokenSupply());

    // Set up market data refresh interval
    const marketInterval = setInterval(() => {
      dispatch(fetchMarketData());
    }, 60000); // Refresh every minute

    // Set up network data refresh interval
    const networkInterval = setInterval(() => {
      dispatch(fetchNetworkData());
    }, 30000); // Refresh every 30 seconds

    return () => {
      clearInterval(marketInterval);
      clearInterval(networkInterval);
    };
  }, [dispatch]);

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

  if (marketError || networkError) {
    return <ErrorDisplay message={marketError || networkError} />;
  }

  const isLoading = marketLoading || networkLoading;

  return (
    <div>
      <Grid container spacing={2}>
        {isLoading ? (
          // Show skeleton loaders
          Array(6)
            .fill(0)
            .map((_, index) => (
              <Grid key={index} item xs={12} sm={6} md={6} lg={3}>
                <SkeletonStatCard />
              </Grid>
            ))
        ) : (
          // Show actual data
          <>
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <StatCard
                title="Price"
                value={`$${price || "---"}`}
                subtitle="(Coingecko)"
                subtitleLink="https://www.coingecko.com/en/coins/lto-network"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={3}>
              <StatCard
                title="Market Cap"
                value={`$${
                  marketCap ? Math.floor(marketCap).toLocaleString() : "---"
                }`}
                subtitle="(Coingecko)"
                subtitleLink="https://www.coingecko.com/en/coins/lto-network"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={3}>
              <StatCard
                title="Estimated APY"
                value={apy || "---"}
                action="more"
                onActionClick={() =>
                  window.open(
                    "https://blog.ltonetwork.com/tokenomics-update/",
                    "_blank"
                  )
                }
              />
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={3}>
              <StatCard
                title="Nodes"
                value={nodes || "---"}
                action="more"
                onActionClick={() => handleClick("nodes")}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={3}>
              <StatCard
                title="Generators (last 30 days)"
                value={generators || "---"}
                action="more"
                onActionClick={() => handleClick("generators")}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={3}>
              <StatCard
                title="Current Block Height"
                value={blockHeight || "---"}
                action="more"
                onActionClick={() => handleClick("blocks")}
              />
            </Grid>

            {/* <Grid item xs={12} sm={6} md={6} lg={3}>
              <StatCard
                title="Circulating Supply"
                value={circulatingMainnet?.toLocaleString() || "---"}
                icon="🔄"
                description="LTO tokens in circulation on mainnet"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={3}>
              <StatCard
                title="Burned Supply"
                value={burnedSupply?.toLocaleString() || "---"}
                icon="🔥"
                description="Total LTO tokens burned"
              />
            </Grid> */}
          </>
        )}
      </Grid>
    </div>
  );
};

export default OverviewTop;
