import React, { useState } from "react";
import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Topbar from "./components/global/Topbar";
//import Sidebar from "./components/global/Sidebar";
import ResponsiveMenu from "./components/global/ResponsiveMenu";
import { theme } from "./theme";
import { ThemeProvider } from "@emotion/react";
import { BG_Wave } from "./assets";

const App = () => {
  //const [isSidebar, setIsSidebar] = useState(true);
  return (
    <ThemeProvider theme={theme}>
      <div>
        <CssBaseline />
        <div className="app">
          <ResponsiveMenu />
          {/* <Sidebar isSidebar={isSidebar} /> */}

          <main className="content">
            <Topbar />
            <div
              style={{
                padding: "10px",
                backgroundColor: "#f0f3fa",
                backgroundImage: `url(${BG_Wave})`,
                height: "100%",
              }}
            >
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
