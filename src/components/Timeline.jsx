import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { theme } from "../styles/theme";

const Timeline = ({ steps }) => {
  const muiTheme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "4xl",
        mx: "auto",
        p: 4,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          height: "2px",
          backgroundColor: muiTheme.palette.grey[200],
          zIndex: 0,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: 4, sm: 2 },
          position: "relative",
          zIndex: 1,
        }}
      >
        {steps.map((step, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              position: "relative",
            }}
          >
            {/* Circle with Text under */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: { xs: 40, sm: 48 },
                  height: { xs: 40, sm: 48 },
                  borderRadius: "50%",
                  border: "2px solid",
                  borderColor: step.completed ? "secondary.main" : "grey.300",
                  backgroundColor: step.completed
                    ? "secondary.main"
                    : "grey.100",
                  color: step.completed
                    ? "secondary.contrast"
                    : "text.secondary",
                  transition: theme.transitions.default,
                  boxShadow: step.completed ? theme.shadows.md : "none",
                }}
              >
                {step.completed ? (
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      color: step.completed
                        ? "secondary.contrast"
                        : "text.secondary",
                    }}
                  >
                    {index + 1}
                  </Typography>
                )}
              </Box>
              <Typography
                variant="body2"
                sx={{
                  mt: 2,
                  textAlign: "center",
                  maxWidth: { xs: 120, sm: 150 },
                  color: step.completed ? "secondary.main" : "text.secondary",
                  fontWeight: step.completed ? 600 : 500,
                  transition: theme.transitions.default,
                }}
              >
                {step.label}
              </Typography>
            </Box>

            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <Box
                sx={{
                  height: "2px",
                  width: { xs: 32, sm: 64 },
                  backgroundColor: steps[index + 1].completed
                    ? "secondary.main"
                    : "grey.200",
                  transition: theme.transitions.default,
                  mx: { xs: 0, sm: 2 },
                  my: { xs: 2, sm: 0 },
                }}
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Timeline;
