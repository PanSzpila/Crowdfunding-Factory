import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { AddBox } from "@mui/icons-material";
// import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1, marginTop: 2 }}>
      <AppBar position="static" style={{ marginBottom: "2rem" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Crowdfunding Gecko
          </Typography>
          {/* <DarkModeToggle /> */}
          <Button color="inherit">Crowdfundings</Button>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ ml: 1 }}
          >
            <AddBox />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
