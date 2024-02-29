import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import Sidebar from "./Sidebar";
import MobileMenu from "./MobileMenu";

const ResponsiveMenu = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return isMobile ? <MobileMenu /> : <Sidebar />;
};

export default ResponsiveMenu;
