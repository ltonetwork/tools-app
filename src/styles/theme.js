export const theme = {
  colors: {
    primary: {
      main: "#18054B",
      light: "#1a0b5e",
      dark: "#0f0332",
      contrast: "#ffffff",
    },
    secondary: {
      main: "#9A1DB1",
      light: "#b42cc9",
      dark: "#7a1a8f",
      contrast: "#ffffff",
    },
    background: {
      default: "#f5f5f5",
      paper: "rgba(255, 255, 255, 0.9)",
    },
    text: {
      primary: "#18054B",
      secondary: "#666666",
      disabled: "#999999",
    },
    error: {
      main: "#d32f2f",
      light: "#ef5350",
      dark: "#c62828",
    },
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
  },
  shadows: {
    sm: "0 2px 4px rgba(0,0,0,0.1)",
    md: "0 4px 8px rgba(0,0,0,0.1)",
    lg: "0 8px 16px rgba(0,0,0,0.1)",
  },
  transitions: {
    default: "all 0.3s ease",
    fast: "all 0.2s ease",
    slow: "all 0.4s ease",
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          padding: "8px 16px",
          transition: "all 0.3s ease",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            "&:hover fieldset": {
              borderColor: "#9A1DB1",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#9A1DB1",
            },
          },
        },
      },
    },
  },
};
