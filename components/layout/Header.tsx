import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { AddBox } from "@mui/icons-material";
import Link from "next/link";
// import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1, marginTop: 2 }}>
      <AppBar position="static" style={{ marginBottom: "2rem" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/">Crowdfunding Gecko</Link>
          </Typography>
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
