import React, { ReactNode } from "react";
import Header from "./Header";
import { Container } from "@mui/system";
import { useTheme } from "../../themeContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Container maxWidth="xl">
        <Header />
        <Container maxWidth="xl">{children}</Container>
        <h1>here's footer</h1>
      </Container>
    </div>
  );
};

export default Layout;
