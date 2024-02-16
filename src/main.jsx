import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./utils/redux/store.js";
import { routes } from "./utils/routes.jsx";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const router = createBrowserRouter(routes);

const theme = createTheme({
  palette: {
    primary: {
      main: "#17054b",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
);
