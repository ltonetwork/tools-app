import * as React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import ViewDayOutlinedIcon from "@mui/icons-material/ViewDayOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const MobileMenu = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const navigateTo = (route) => {
    navigate(route);
    handleClose();
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        position: "fixed",
        bottom: "10px", // Adjust bottom position
        right: "10px", // Adjust right position
        zIndex: 999,
      }}
    >
      <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          style={{
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            minWidth: "unset",
            padding: 0,
            color: "white",
            backgroundColor: "#17054B",
          }}
        >
          <MenuOutlinedIcon />
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem
                      onClick={() => navigateTo("/overview")}
                      sx={{ color: "#17054B" }}
                    >
                      <DashboardCustomizeOutlinedIcon sx={{ mr: 1 }} />
                      Overview
                    </MenuItem>

                    <MenuItem
                      onClick={() => navigateTo("/generators")}
                      sx={{ color: "#17054B" }}
                    >
                      <ViewDayOutlinedIcon sx={{ mr: 1 }} />
                      Generators
                    </MenuItem>

                    <MenuItem
                      onClick={() => navigateTo("/nodes")}
                      sx={{ color: "#17054B" }}
                    >
                      <AccountTreeOutlinedIcon sx={{ mr: 1 }} />
                      Nodes
                    </MenuItem>

                    <MenuItem
                      onClick={() => navigateTo("/activity")}
                      sx={{ color: "#17054B" }}
                    >
                      <SettingsOutlinedIcon sx={{ mr: 1 }} />
                      Network Activity
                    </MenuItem>

                    <MenuItem
                      onClick={() => navigateTo("/stats")}
                      sx={{ color: "#17054B" }}
                    >
                      <QueryStatsOutlinedIcon sx={{ mr: 1 }} />
                      Stats
                    </MenuItem>

                    <MenuItem
                      onClick={() => navigateTo("/blocks")}
                      sx={{ color: "#17054B" }}
                    >
                      <ViewInArOutlinedIcon sx={{ mr: 1 }} />
                      Blocks
                    </MenuItem>

                    <MenuItem
                      onClick={() => navigateTo("/rewards-calc")}
                      sx={{ color: "#17054B" }}
                    >
                      <CalculateOutlinedIcon sx={{ mr: 1 }} />
                      Reward Calc
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
};

export default MobileMenu;
