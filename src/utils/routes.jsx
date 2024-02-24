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
} from "../pages/index.js";

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
    ],
  },
];
