import App from "../App.jsx";
import { Navigate } from "react-router-dom";
import {
  Overview,
  Generators,
  Nodes,
  Balances,
  Stats,
  NodeMaps,
  Blocks,
  RewardCalculator,
  Activity,
  OwnablesTrack,
} from "../pages/index.js";
import ErrorBoundary from "../components/global/ErrorBoundary.jsx";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Navigate to="/overview" replace />,
      },
      {
        path: "overview",
        element: <Overview />,
      },
      {
        path: "generators",
        element: <Generators />,
      },
      {
        path: "nodes",
        element: <Nodes />,
      },
      {
        path: "activity",
        element: <Activity />,
      },
      {
        path: "stats",
        element: <Stats />,
      },
      {
        path: "balances",
        element: <Balances />,
      },
      {
        path: "node-maps",
        element: <NodeMaps />,
      },

      {
        path: "blocks",
        element: <Blocks />,
      },
      {
        path: "rewards-calc",
        element: <RewardCalculator />,
      },
      {
        path: "ownables-track",
        element: <OwnablesTrack />,
      },
      {
        path: "*",
        element: <ErrorBoundary />,
      },
    ],
  },
];
