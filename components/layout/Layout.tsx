import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Container } from "@mui/system";
import { useTheme } from "../../themeContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Container maxWidth="xl">
        <Header />
        <Container
          maxWidth="xl"
          style={{ flex: 1, overflow: "auto", marginTop: "100px" }}
        >
          {children}
        </Container>
        <Footer />
      </Container>
    </div>
  );
};

export default Layout;
