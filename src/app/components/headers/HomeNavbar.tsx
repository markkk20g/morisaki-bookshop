import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Topbar from "./Topbar";
import { useGlobals } from "../../hooks/useGlobals";

interface HomeNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void; 
  onRemove: (item: CartItem) => void; 
  onDelete: (item: CartItem) => void; 
  onDeleteAll: () => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}

export default function HomeNavbar(props: HomeNavbarProps) {
  const { 
    cartItems, 
    onAdd, 
    onRemove, 
    onDelete, 
    onDeleteAll, 
    setSignupOpen, 
    setLoginOpen,
    handleLogoutClick,
    anchorEl, 
    handleCloseLogout,
    handleLogoutRequest,
  } = props;

  const {authMember} = useGlobals();

  return (
    <div className="home-navbar">
      {/* <div className="navbar-menu-frame">
        <Container className="navbar-container">
          <Stack className="menu-items">
            <Box sx={{ bgcolor: "#ff8b8b" }}>
              <NavLink to="/">
                <img className="brand-logo" src="/icons/white1.png" />
              </NavLink>
            </Box>

            <Stack className="menu-links">
              <Box className="hover-box">
                <NavLink to="/" activeClassName="underline">
                  HOME
                </NavLink>
              </Box>
              <Box className="hover-box">
                <NavLink to="/" activeClassName="underline">
                  BOOKS
                </NavLink>
              </Box>
              <Box className="hover-box">
                <NavLink to="/" activeClassName="underline">
                  EVENTS
                </NavLink>
              </Box>
              {authMember ? (
                <Box className="hover-box">
                  <NavLink to="/" activeClassName="underline">
                    ORDERS
                  </NavLink>
                </Box>
              ) : null}
              {authMember ? (
                <Box className="hover-box">
                  <NavLink to="/" activeClassName="underline">
                    MY PAGE
                  </NavLink>
                </Box>
              ) : null}
              <Box className="hover-box">
                <NavLink to="/" activeClassName="underline">
                  HELP
                </NavLink>
              </Box>
            </Stack>

            <Box className="menu-search">
              <input type="text" placeholder="Seach..." className="input-area" />
              <Box>
                <Button
                  variant="contained"
                  sx={{ height: "50px", color: "#d1d5db" }}
                >
                  I
                </Button>
              </Box>
            </Box>

            <Box className="menu-shorts">
              <AccountBoxIcon />
              <ShoppingCartIcon />
            </Box>
          </Stack>
        </Container>
      </div> */}
      <Topbar 
        cartItems={cartItems}
        onAdd={onAdd}
        onRemove={onRemove}
        onDelete={onDelete}
        onDeleteAll={onDeleteAll}
        setSignupOpen={setSignupOpen}
        setLoginOpen={setLoginOpen}
        anchorEl={anchorEl}
        handleLogoutClick={handleLogoutClick}
        handleCloseLogout={handleCloseLogout}
        handleLogoutRequest={handleLogoutRequest}
      />

      {/* LANDING PAGE BANNER aka Main Content */}
      <div className="header-frame">
        <div className="header-frame-gradient" />
        <Container className="header-frame-container">
          {/* <div className="header-frame-gradient" /> */}
          <Stack className="header-detail">
            <Box className="header-heading">
              <h1>Discover your next read</h1>
            </Box>
            <Box className="header-parag">
              <p>Elevated literature for the modern mind. Explore our
                curated selection of contemporary masterpieces and timeless classics.</p>
            </Box>
            <Stack className="header-btns">
              {/* <a className="header-explore-btn">EXPLORE BOOKS</a> */}
              {/* <a className="header-signup-btn">SIGN UP</a> */}
              <Button className="header-explore-btn">
                EXPLORE BOOKS
              </Button>
              {!authMember ? (
                <Button 
                  className="header-signup-btn"
                  onClick={() => setSignupOpen(true)}
                >
                  SIGN UP
                </Button>
              ) : (null)}
            </Stack>

            {/* <Stack className="header-info">
              <Box className="slogan">
                <img className="slogan-img" src="/img/slogan.png" />
              </Box>
              <Box className="lead-in">Find Your Next Great Read Today</Box>
              <Box className="shop-button-box">
                <Button
                  variant="contained"
                  color="primary"
                  className="shop-button"
                >
                  SHOP NOW
                </Button>
              </Box>
            </Stack> */}

            {/* <Box className="header-img">
              <img className="img-item" src="/img/navbar-img.png" />
            </Box> */}
          </Stack>
        </Container>
      </div>
    </div>
  );
}
