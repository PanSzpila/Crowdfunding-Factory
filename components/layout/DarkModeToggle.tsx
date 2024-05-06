import React, { useState } from "react";
import { Switch, IconButton } from "@mui/material";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const DarkModeToggle: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      {/*TODO:  move ThemeProvider and CssBaseline to _app.tsx to wrap the whole App and pass the value darkMode by context, or state manager*/}
      <CssBaseline />
      <div>
        <IconButton edge="end" color="inherit" onClick={handleThemeChange}>
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <Switch checked={darkMode} onChange={handleThemeChange} />
      </div>
    </ThemeProvider>
  );
};

export default DarkModeToggle;
