import { createTheme, Theme } from "@mui/material/styles";
import { useTheme } from "./themeContext";
import React from "react";

export function useMyTheme(): Theme {
  const { state } = useTheme();
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: state.darkMode ? "dark" : "light",
          primary: {
            main: "#618833", // Ustaw główny kolor na zielony
          },
          // ...other values
        },
        // ...other values
      }),
    [state.darkMode]
  );

  return theme;
}
