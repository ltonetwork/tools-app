import React from "react";
import PropTypes from "prop-types";
import { Alert, Box } from "@mui/material";

const ErrorDisplay = ({ message }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "200px",
      padding: 2,
    }}
  >
    <Alert severity="error" sx={{ width: "100%" }}>
      {message}
    </Alert>
  </Box>
);

ErrorDisplay.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorDisplay;
