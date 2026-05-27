import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Topbar from "./Topbar";

interface OtherNavbarProps {
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

export default function OtherNavbar(props: OtherNavbarProps) {
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

  const authMember = null;

  return (
    <div className="other-navbar">
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
        <img id="background-img" src="/icons/logo/books.jpg" alt=""/>
      <div className="other-frame">
        <div className="other-frame-gradient" />
        <Container className="other-frame-container">
          <Stack className="other-detail" style={{opacity: 1}}>
            <Box className="other-parag">
              <p>Thoughts, Words, Meaning</p>
            </Box>
            <Box className="other-heading">
              <h1 style={{opacity: 1}}>Discover books that inspire curiosity and imagination</h1>
            </Box>
          </Stack>
          <Box className="big-icon">
            <img src="/icons/logo/book-icon.png" alt="" />
          </Box>
        </Container>
      </div>
    </div>
  );
}