import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Topbar from "./components/global/Topbar";
import ResponsiveMenu from "./components/global/ResponsiveMenu";
import { theme } from "./theme";
import { ThemeProvider } from "@emotion/react";
import { Wave } from "./assets";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <CssBaseline />
        <div className="app" style={{ width: "100vw" }}>
          <ResponsiveMenu />
          <main className="content" style={{ position: "relative" }}>
            <Topbar />
            <div
              style={{
                padding: "10px",
                backgroundColor: "#f0f3fa",
                backgroundImage: `url(${Wave})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100%",
                width: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: -1,
              }}
            />
            <Outlet maxWidth="lg" />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
