import App from "../App.jsx";
import {
  Overview,
  Generators,
  Nodes,
  Balances,
  Transactions,
  NodeMaps,
  Blocks,
} from "../pages/index.js";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
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
        path: "transactions",
        element: <Transactions />,
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
    ],
  },
];
