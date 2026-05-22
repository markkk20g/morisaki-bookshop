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
      <Container>
        
      </Container>
    </div>
  );
}