import React, { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, Typography, IconButton, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { LOGO, ltoIcon } from "../../assets/index";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import ViewDayOutlinedIcon from "@mui/icons-material/ViewDayOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = theme.palette.primary.main;
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: "#17054b",
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const [selected, setSelected] = useState("Dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setIsMobile(true);
        setIsCollapsed(true);
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

  const handleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Box
      sx={{
        "& .sidebar-container": {
          height: "100vh",
        },
        "& .pro-sidebar": {
          display: isMobile ? (isCollapsed ? "none" : "block") : "block",
          height: "100vh",
          position: "sticky",
          top: 0,
          left: 0,
          width: isCollapsed ? "80px" : "250px", // Adjusted width based on collapsed state
          transition: "width 0.3s ease",
        },
        "& .pro-sidebar-inner": {
          backgroundColor: "#e9e9e9",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#9A1DB1 !important",
        },
        "& .pro-inner-item:active": {
          color: "#9A1DB1 !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed} collapsedWidth="80px">
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 50px 0",
              color: "#17054b",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <img
                  alt="lto-icon"
                  width="40px"
                  src={ltoIcon}
                  style={{
                    cursor: "pointer",
                    marginRight: "2px",
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="h6" color="#17054b">
                  DASHBOARD
                </Typography>
                <IconButton onClick={() => setIsCollapsed(true)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Overview"
              to="/overview"
              icon={<DashboardCustomizeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Generators"
              to="/generators"
              icon={<ViewDayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Nodes"
              to="/nodes"
              icon={<AccountTreeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Stats"
              to="/stats"
              icon={<QueryStatsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Rewards Calc"
              to="/rewards-calc"
              icon={<CalculateOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>

          {!isCollapsed && (
            <Box mt="70px" mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="150px"
                  src={LOGO}
                  style={{ cursor: "pointer" }}
                />
              </Box>
            </Box>
          )}
        </Menu>
      </ProSidebar>

      {/* Icon for mobile */}
      {isMobile && (
        <Box
          sx={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: "999",
          }}
        >
          <IconButton
            style={{ color: "white", backgroundColor: "#17054B" }}
            onClick={() => handleCollapsed()}
          >
            <MenuOutlinedIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;
