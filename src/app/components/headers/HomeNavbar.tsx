import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import { useHistory } from "react-router-dom";
import Topbar from "./Topbar";
import { useGlobals } from "../../hooks/useGlobals";
import { CartItem } from "../../../libs/types/search";

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
  const history = useHistory();

  return (
    <div className="home-navbar">
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
          <Stack className="header-detail">
            <Box className="header-heading">
              <h1>Discover your next read</h1>
            </Box>
            <Box className="header-parag">
              <p>Elevated literature for the modern mind. Explore our
                curated selection of contemporary masterpieces and timeless classics.</p>
            </Box>
            <Stack className="header-btns">
              <Button 
                className="header-explore-btn"
                onClick={() => history.push('/products')}
              >
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
          </Stack>
        </Container>
      </div>
    </div>
  );
}
