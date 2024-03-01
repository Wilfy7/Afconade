import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import SportsIcon from "@mui/icons-material/Sports";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Navbar = () => {
   const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
   );

   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
     setAnchorElNav(event.currentTarget);
   };

   const handleCloseNavMenu = () => {
    setAnchorElNav(null);
   };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            <SportsIcon
              fontSize="large"
              sx={{
                display:{ xs: "none", md: "flex" },
                mr: 1
              }} 
            />
            <Box
               sx={{
                 mr: 2,
                 display: { xs: "none", md: "flex" },
                 fontFamily: "monospace",
                 fontWeight: 700,
                 letterSpacing: ".3rem",
                 color: "inherit",
                 textDecoration: "none"
               }}
            >
            <NavLink 
               style={{
                 fontFamily: "monospace",
                 fontWeight: 700,
                 letterSpacing: ".3rem",
                 color: "inherit",
                 textDecoration: "none"
               }}
            to={"/"} 
            >
             AFCONADE
            </NavLink>
            </Box>

            <SportsIcon sx={{ display: {xs: "flex", md: "none"}, mr: 1 }} />
            <NavLink
              to={"/"}
              style={{
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
             <Box sx={{display: {xs: "flex", md: "none"} }}>AFCONADE</Box>
            </NavLink>

            <Box sx={{flexGrow: 0, display: {xs: "flex", md: "none"} }}>
                <IconButton
                   size="large"
                   aria-controls="menu-appbar"
                   aria-haspopup="true"
                   onClick={handleOpenNavMenu}
                   color="inherit" 
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left"
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none"},
                  }}
                >
                  <MenuItem>
                    <NavLink
                      style={{
                        color: "black",
                        display: "block",
                        textDecoration: "none",
                      }}
                      to="/"
                    >
                     Matches
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                  <NavLink
                      style={{
                        color: "black",
                        display: "block",
                        textDecoration: "none",
                      }}
                      to="/create-group"
                    >
                     Create Group
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                  <NavLink
                      style={{
                        color: "black",
                        display: "block",
                        textDecoration: "none",
                      }}
                      to="/leaderboard"
                    >
                    Leaderboard
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                  <NavLink
                      style={{
                        color: "black",
                        display: "block",
                        textDecoration: "none",
                      }}
                      to="/matches/predictions"
                    >
                     Predictions
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                  <NavLink
                      style={{
                        color: "black",
                        display: "block",
                        textDecoration: "none",
                      }}
                      to="/groups"
                    >
                     Groups
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                  <NavLink
                      style={{
                        color: "black",
                        display: "block",
                        textDecoration: "none",
                      }}
                      to="/game-rules"
                    >
                      Rules
                    </NavLink>
                  </MenuItem>
                </Menu>
            </Box>

            <Box sx={{flexGrow: 1, display: {xs: "none", md: "flex"} }}></Box>

            <Box className="gap-2 d-flex" sx={{ flexGrow: 0}}>
              <Box 
                 sx={{ flexGrow: 1, display: {xs: "none", md: "flex", gap: 10} }}
              >
                <NavLink
                   style={{
                     color: "white",
                     display: "block",
                     textDecoration: "none"
                   }} 
                   to="/create-group"
                >
                  Create Group
                </NavLink>
                <NavLink
                  style={{
                    color: "white",
                    display: "block",
                    textDecoration: "none"
                  }}
                  to="/"
                >
                  Matches
                </NavLink>
                <NavLink
                  style={{
                    color: "white",
                    display: "block",
                    textDecoration: "none"
                  }}
                  to="/leaderboard"
                >
                  Leaderboard
                </NavLink>
                <NavLink
                  style={{
                    color: "white",
                    display: "block",
                    textDecoration: "none"
                  }}
                  to="/groups"
                >
                  Groups
                </NavLink>
                <NavLink
                  style={{
                    color: "white",
                    display: "block",
                    textDecoration: "none"
                  }}
                  to="/matches/predictions"
                >
                  Predictions
                </NavLink>
                <NavLink
                  style={{
                    color: "white",
                    display: "block",
                    textDecoration: "none"
                  }}
                  to="/game-rules"
                >
                  Rules
                </NavLink>
              </Box>
            </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;