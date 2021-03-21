import { red, amber, grey } from "@material-ui/core/colors";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const fontFamilyPoppins = {
  fontFamily: [
    "Poppins",
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"'
  ].join(",")
};

const fontFamilyMetropolis = {
  fontFamily: [
    "Poppins",
    "Metropolis",
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"'
  ].join(","),
  letterSpacing: "0.015rem"
};

// A custom theme for this app
const lightMuiTheme = createMuiTheme({
  type: "light",
  palette: {
    primary: {
      main: "#a484e4"
    },
    secondary: {
      main: amber[500],
      light: "#feefc3"
    },
    error: {
      main: red.A400
    },
    background: {
      default: "#151515",
      highlight: "#fff"
    }
  },
  custom: {
    fontFamily: {
      Poppins: fontFamilyPoppins,
      metropolis: fontFamilyMetropolis
    },
    palette: {
      iconColor: "#5f6368",
      btn: "#975ddd"
    }
  }
});

const darkMuiTheme = createMuiTheme({
  type: "dark",
  palette: {
    primary: {
      main: "#a484e4"
    },
    secondary: {
      main: amber[500],
      light: "#41331C"
    },
    error: {
      main: red.A400
    },
    background: {
      default: "#33313b",
      highlight: "#535456"
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#FFFFFFDE"
    }
  },
  custom: {
    fontFamily: {
      Poppins: fontFamilyPoppins,
      metropolis: fontFamilyMetropolis
    },
    palette: {
      iconColor: "#949596",
      btn: "#975ddd"
    }
  }
});

export const lightTheme = responsiveFontSizes(lightMuiTheme);
export const darkTheme = responsiveFontSizes(darkMuiTheme);