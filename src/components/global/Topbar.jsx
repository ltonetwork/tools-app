import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, IconButton, useTheme, Typography } from "@mui/material";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
import { ltoIcon } from "../../assets/index";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 800) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navigateTo = (route) => {
    navigate(route);
    handleClose();
  };

  return (
    <div style={{ backgroundColor: theme.palette.primary.main }}>
      <Box></Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        {!isMobile && (
          <img
            alt="lto-icon"
            width="40px"
            src={ltoIcon}
            style={{
              cursor: "pointer",
              marginRight: "2px",
              // borderRadius: "50%",
            }}
            onClick={() => navigateTo("/")}
          />
        )}
        {/* {isMobile && (
          <Box display="flex" backgroundColor="white" borderRadius="3px">
            <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
            <IconButton type="button" sx={{ p: 1 }}>
              <SearchIcon />
            </IconButton>
          </Box>
        )} */}
        <div>
          {isMobile && (
            <img
              alt="lto-icon"
              width="50px"
              src={ltoIcon}
              style={{
                cursor: "pointer",
                marginRight: "2px",
                borderRadius: "50%",
              }}
              onClick={() => navigateTo("/")}
            />
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <a
            href="https://docs.ltonetwork.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton
              sx={{
                display: "flex",
                color: "#e3d7f3",
                fontSize: "12px",
                mr: 1,
              }}
            >
              <Typography sx={{ fontSize: "14px", mr: 1 }}>Docs</Typography>
              <ArrowOutwardOutlinedIcon sx={{ fontSize: "16px" }} />
            </IconButton>
          </a>
          <a
            href="https://wallet.lto.network/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton
              sx={{ display: "flex", color: "#e3d7f3", fontSize: "12px" }}
            >
              <Typography sx={{ fontSize: "14px", mr: 1 }}>
                Web Wallet
              </Typography>
              <ArrowOutwardOutlinedIcon sx={{ fontSize: "16px" }} />
            </IconButton>
          </a>
        </div>
      </Box>
    </div>
  );
};

export default Topbar;
