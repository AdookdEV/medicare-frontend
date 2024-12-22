import { createTheme } from "@mui/material";


const theme = createTheme({
  palette: {
    primary: {
      main: '#0070f3', // Primary Blue
    },
    secondary: {
      main: '#ff4081', // Accent Red
    },
    background: {
      default: '#f5f5f5', // Neutral Gray
    },
    text: {
      primary: '#333333', // Dark Gray
      secondary: '#ffffff', // White
    },
  },
});

export default theme;