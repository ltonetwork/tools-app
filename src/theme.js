// import { createContext, useState, useMemo } from "react";
// import { createTheme } from "@mui/material/styles";
// import { Palette } from "@mui/icons-material";

// //Color Design Tokens
// //ctr+k ctr+g for tailwind shades

// export const tokens = (mode) => ({
//   ...(mode === "dark"
//     ? {
//         grey: {
//           100: "#e0e0e0",
//           200: "#c2c2c2",
//           300: "#a3a3a3",
//           400: "#858585",
//           500: "#666666",
//           600: "#525252",
//           700: "#3d3d3d",
//           800: "#292929",
//           900: "#141414",
//         },
//         primary: {
//           100: "#d0d1d5",
//           200: "#a1a4ab",
//           300: "#727681",
//           400: "#434957",
//           500: "#141b2d",
//           600: "#101624",
//           700: "#0c101b",
//           800: "#080b12",
//           900: "#040509",
//         },
//         blueAccent: {
//           100: "#17054b",
//           200: "#150544",
//           300: "#12043c",
//           400: "#100435",
//           500: "#0e032d",
//           600: "#0c0326",
//           700: "#09021e",
//           800: "#070116",
//           900: "#05010f",
//         },
//       }
//     : {
//         grey: {
//           100: "#141414",
//           200: "#292929",
//           300: "#3d3d3d",
//           400: "#525252",
//           500: "#666666",
//           600: "#858585",
//           700: "#a3a3a3",
//           800: "#c2c2c2",
//           900: "#e0e0e0",
//         },
//         primary: {
//           100: "#040509",
//           200: "#080b12",
//           300: "#0c101b",
//           400: "#f2f0f0",
//           500: "#141b2d",
//           600: "#434957",
//           700: "#727681",
//           800: "#a1a4ab",
//           900: "#d0d1d5",
//         },
//         blueAccent: {
//           100: "#17054b",
//           200: "#2e1e5d",
//           300: "#45376f",
//           400: "#5d5081",
//           500: "#746993",
//           600: "#8b82a5",
//           700: "#a29bb7",
//           800: "#b9b4c9",
//           900: "#d1cddb",
//         },
//       }),
// });

// //MUI Theme settings
// export const themeSettings = (mode) => {
//   const colors = tokens(mode);

//   return {
//     palette: {
//       mode: mode,
//       ...(mode === "dark"
//         ? {
//             // palette values for dark mode
//             primary: {
//               main: colors.primary[500],
//             },
//             secondary: {
//               main: colors.greenAccent[500],
//             },
//             neutral: {
//               dark: colors.grey[700],
//               main: colors.grey[500],
//               light: colors.grey[100],
//             },
//             background: {
//               default: colors.primary[500],
//             },
//           }
//         : {
//             // palette values for light mode
//             primary: {
//               main: colors.primary[100],
//             },
//             secondary: {
//               main: colors.greenAccent[500],
//             },
//             neutral: {
//               dark: colors.grey[700],
//               main: colors.grey[500],
//               light: colors.grey[100],
//             },
//             background: {
//               default: "#fcfcfc",
//             },
//           }),
//     },
//     typography: {
//       fontFamily: ["IBM Plex Sans", "sans-serif"].join(","),
//       fontSize: 12,
//       h1: {
//         fontFamily: ["IBM Plex Sans", "sans-serif"].join(","),
//         fontSize: 40,
//       },
//       h2: {
//         fontFamily: ["IBM Plex Sans", "sans-serif"].join(","),
//         fontSize: 32,
//       },
//       h3: {
//         fontFamily: ["IBM Plex Sans", "sans-serif"].join(","),
//         fontSize: 24,
//       },
//       h4: {
//         fontFamily: ["IBM Plex Sans", "sans-serif"].join(","),
//         fontSize: 20,
//       },
//       h5: {
//         fontFamily: ["IBM Plex Sans", "sans-serif"].join(","),
//         fontSize: 16,
//       },
//       h6: {
//         fontFamily: ["IBM Plex Sans", "sans-serif"].join(","),
//         fontSize: 14,
//       },
//     },
//   };
// };

// // context for color mode
// export const ColorModeContext = createContext({
//   toggleColorMode: () => {},
// });

// export const useMode = () => {
//   const [mode, setMode] = useState("dark");

//   const colorMode = useMemo(
//     () => ({
//       toggleColorMode: () =>
//         setMode((prev) => (prev === "light" ? "dark" : "light")),
//     }),
//     []
//   );

//   const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
//   return [theme, colorMode];
// };

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#17054B",
      sec: "#43506d",
    },
  },
  typography: {
    fontFamily: '"Montserrat", sans-serif',
  },
});

export { theme };
