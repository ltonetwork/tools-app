import React, { useState } from "react";
import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Topbar from "./components/global/Topbar";
import Sidebar from "./components/global/Sidebar";
import { theme } from "./theme";
import { ThemeProvider } from "@emotion/react";
import { BG_Wave } from "./assets";

const App = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <ThemeProvider theme={theme}>
      <div>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />

          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <div
              style={{
                padding: "10px",
                backgroundColor: "#f0f3fa",
                backgroundImage: `url(${BG_Wave})`,
                height: "100vh",
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
