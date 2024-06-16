import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
// import { useTheme } from "@mui/system";

const whiteLogosPath = "media/techLogosWhite/";
// const darkLogosPath = "media/techLogosDark/";

const whiteLogos = [
  "solidityWhite.png",
  "ethereum-eth-logo-full-horizontal.svg",
  "Metamask-logo.svg",
  "webdotjs_logo_icon_249217.svg",
  "TypeScript_Logo.svg",
  "Nextjs-logo.svg",
  "react-logo-programming-svgrepo-com.svg",
  "material-ui-svgrepo-com.svg",
  // "chatgpt-3.svg",
];

// const darkLogos = [
//   "solidity.png",
//   "ethereum-eth-logo-full-horizontal.svg",
//   "Metamask-logo.svg",
//   "webdotjs_logo_icon_249217.svg",
//   "TypeScript_Logo.svg",
//   "Nextjs-logo.svg",
//   "react-logo-programming-svgrepo-com.svg",
//   "material-ui-svgrepo-com.svg",
//   // "chatgpt-3.svg",
// ];

const logoStyle = {
  width: "100px",
  height: "80px",
  margin: "0 32px",
  opacity: 0.7,
};

export default function LogoCollection() {
  // const theme = useTheme();

  // const logos = theme.palette.mode === "light" ? darkLogos : whiteLogos;
  // const logosPath =
  //   theme.palette.mode === "light" ? darkLogosPath : whiteLogosPath;

  const logos = whiteLogos; // delete this if you want back to theme styles
  const logosPath = whiteLogosPath; // delete this if you want back to theme styles

  return (
    <Box id="logoCollection">
      <Typography
        component="p"
        variant="subtitle2"
        align="center"
        color="text.secondary"
        style={{ marginBottom: "32px", marginTop: "64px", color: "#757575" }} // delete the color if you want back to theme styles
      >
        Technologies used in this project
      </Typography>
      <Grid container justifyContent="center" sx={{ mt: 0.5, opacity: 0.6 }}>
        {logos.map((logo, index) => (
          <Grid item key={index}>
            <img
              src={logosPath + logo}
              alt={`Technology number ${index + 1}`}
              style={logoStyle}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
