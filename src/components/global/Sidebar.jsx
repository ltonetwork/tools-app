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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box
      sx={{
        "& .sidebar-container": {
          height: "100vh",
        },
        "& .pro-sidebar": {
          height: "100vh",
          position: "sticky",
          top: 0,
          left: 0,
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
      <ProSidebar collapsed={isCollapsed}>
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
                  alt="profile-user"
                  width="40px"
                  src={ltoIcon}
                  style={{
                    cursor: "pointer",
                    marginRight: "2px",
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="h6" color="#17054b">
                  LTO TOOLS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="20px"
                  src={Logo}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
            </Box>
          )} */}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
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
              title="Balances"
              to="/balances"
              icon={<AccountBalanceWalletOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Transactions"
              to="/transactions"
              icon={<LibraryBooksOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Node Maps"
              to="/node-maps"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ"
              to="/faqs"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* <Typography
              variant="h6"
              color="#17054b"
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            
            <Item
              title="Gen Locations"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
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
    </Box>
  );
};

export default Sidebar;
