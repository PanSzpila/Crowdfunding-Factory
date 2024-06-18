import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import AddBox from "@mui/icons-material/AddBox";
import Image from "next/image";
import Link from "next/link";
import DarkModeSwitch from "./DarkModeSwitch";
import { useTheme } from "@mui/system";

function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(169, 169, 169, 0.1), 1px 1.5px 2px -1px rgba(169, 169, 169, 0.15), 4px 4px 12px -2.5px rgba(169, 169, 169, 0.15)`
                  : "0 0 1px rgba(30, 30, 30, 0.7), 1px 1.5px 2px -1px rgba(30, 30, 30, 0.65), 4px 4px 12px -2.5px rgba(30, 30, 30, 0.65)",
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 0,
              }}
            >
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link
                  href="/"
                  passHref
                  style={{
                    textDecoration: "none",
                    color: theme.palette.text.primary,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src="/media/cglogoGreen.svg"
                    alt="logo of Crowdfunding Gecko"
                    width={40}
                    height={40}
                    style={{ marginRight: "1rem", marginLeft: "5px" }}
                  />
                  Crowdfunding Gecko
                </Link>
              </Typography>
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  gap: 0.5,
                  alignItems: "center",
                }}
              >
                <DarkModeSwitch />
                <Button color="inherit">
                  <Link
                    style={{
                      textDecoration: "none",
                      color: theme.palette.text.primary,
                    }}
                    href="/#crowdfundings"
                  >
                    Crowdfundings
                  </Link>
                </Button>
                <Link
                  style={{
                    textDecoration: "none",
                    color: theme.palette.text.primary,
                  }}
                  href="/crowdfundings/new"
                >
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ ml: 1 }}
                  >
                    <AddBox />
                  </IconButton>
                </Link>
              </Box>
            </Box>
            <Box sx={{ display: { sm: "", md: "none" } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: "30px", p: "4px" }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: "60dvw",
                    p: 2,
                    backgroundColor: "background.paper",
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "end",
                      flexGrow: 1,
                    }}
                  >
                    <DarkModeSwitch />
                    <Button color="inherit">
                      <Link
                        style={{
                          textDecoration: "none",
                          color: theme.palette.text.primary,
                        }}
                        href="/#crowdfundings"
                      >
                        Crowdfundings
                      </Link>
                    </Button>
                    <Link
                      style={{
                        textDecoration: "none",
                        color: theme.palette.text.primary,
                      }}
                      href="/crowdfundings/new"
                    >
                      <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ ml: 1 }}
                      >
                        <AddBox />
                      </IconButton>
                    </Link>
                  </Box>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default AppAppBar;
