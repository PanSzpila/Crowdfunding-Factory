import { ThemeProvider } from "../themeContext";
import type { AppProps } from "next/app";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, ThemeProvider as MUIThemeProvider } from "@mui/material";
import dynamic from "next/dynamic";
import { useMyTheme } from "../theme";
// import "../styles/main.scss";

const DarkModeSwitch = dynamic(
  () => import("../components/layout/DarkModeSwitch"),
  {
    ssr: false,
  }
);

const ThemedApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const theme = useMyTheme();

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </MUIThemeProvider>
  );
};

function MyApp(props: AppProps) {
  return (
    <ThemeProvider>
      <ThemedApp {...props} />
    </ThemeProvider>
  );
}

export default MyApp;
