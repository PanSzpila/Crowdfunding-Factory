import * as React from "react";
import {
  AppBar,
  Typography,
  Button,
  IconButton,
  Toolbar,
  Box,
} from "@mui/material";
import { AddBox } from "@mui/icons-material";
import Link from "next/link";
// import DarkModeToggle from "./DarkModeToggle";
import DarkModeSwitch from "./DarkModeSwitch";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1, marginTop: 2 }}>
      <AppBar position="static" style={{ marginBottom: "2rem" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/">Crowdfunding Gecko</Link>
          </Typography>
          <DarkModeSwitch />
          {/* <DarkModeToggle /> */}
          <Button color="inherit">
            <Link href="/">Crowdfundings</Link>
          </Button>
          <Link href="/crowdfundings/new">
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
        </Toolbar>
      </AppBar>
    </Box>
  );
}
