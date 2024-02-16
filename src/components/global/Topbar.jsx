import React from "react";
import { Link } from "react-router-dom";
import { Box, IconButton, useTheme, Typography } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";

const Topbar = () => {
  const theme = useTheme();

  return (
    <div style={{ backgroundColor: theme.palette.primary.main }}>
      <Box display="flex" justifyContent="space-between" p={2}>
        <Box display="flex" backgroundColor="white" borderRadius="3px">
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>

        <Link to="https://wallet.lto.network/" target="_blank">
          <IconButton
            sx={{ display: "flex", color: "#e3d7f3", fontSize: "12px" }}
          >
            <Typography sx={{ fontSize: "14px" }}>Web Wallet</Typography>
            <ArrowOutwardOutlinedIcon sx={{ fontSize: "16px" }} />
          </IconButton>
        </Link>
      </Box>
    </div>
  );
};

export default Topbar;
