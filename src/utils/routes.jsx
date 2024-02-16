import App from "../App.jsx";
import {
  Dashboard,
  Generators,
  Nodes,
  Balances,
  Transactions,
  NodeMaps,
  Faqs,
} from "../pages/index.js";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
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
        path: "faqs",
        element: <Faqs />,
      },
    ],
  },
];
